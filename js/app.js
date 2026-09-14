/**
 * LuxRentCar - Application Principale
 * Vitrine de prestige, animations, galeries, audio moteur & réservation VIP
 */

document.addEventListener('DOMContentLoaded', () => {
  initIntroSplash();
  initBackgroundCanvas();
  initEngineSound();
  renderFleet();
  initContactModals();
  initMobileNav();
});

/* ==========================================================================
   1. Animation d'Entrée & Logo Splash
   ========================================================================== */
function initIntroSplash() {
  const splash = document.getElementById('intro-splash');
  const skipBtn = document.getElementById('skip-intro-btn');
  const replayBtn = document.getElementById('replay-intro-btn');

  const closeSplash = () => {
    if (!splash) return;
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 800);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', closeSplash);
  }

  // Auto fermeture après l'animation (3.2 secondes)
  const timer = setTimeout(closeSplash, 3200);

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!splash) return;
      splash.style.display = 'flex';
      splash.classList.remove('fade-out');
      // Re-trigger laser animation
      const path = splash.querySelector('.laser-path');
      if (path) {
        path.style.animation = 'none';
        void path.offsetWidth;
        path.style.animation = 'laserDraw 2.4s cubic-bezier(0.25, 1, 0.5, 1) forwards';
      }
      setTimeout(closeSplash, 3200);
    });
  }
}

/* ==========================================================================
   2. Canvas Cinématique Arrière-plan (Night Highway Speed Particles)
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 75;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: 0.8 + Math.random() * 2.2,
      length: 15 + Math.random() * 45,
      opacity: 0.15 + Math.random() * 0.5,
      isRed: Math.random() > 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Lignes de vitesse fuyantes vers l'avant (ambiance autoroute de nuit)
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y > height) {
        p.y = -p.length;
        p.x = Math.random() * width;
      }

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.speedX * 5, p.y + p.length);
      ctx.strokeStyle = p.isRed
        ? `rgba(239, 68, 68, ${p.opacity})`
        : `rgba(255, 255, 255, ${p.opacity * 0.4})`;
      ctx.lineWidth = p.isRed ? 1.5 : 1;
      ctx.stroke();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Générateur Sonore V8 (Web Audio API)
   ========================================================================== */
let audioCtx = null;
let isSoundPlaying = false;
let engineOsc1 = null;
let engineOsc2 = null;
let gainNode = null;

function initEngineSound() {
  const toggleBtn = document.getElementById('sound-toggle-btn');
  const bars = document.querySelectorAll('.sound-wave-bar');
  const textEl = document.getElementById('sound-status-text');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isSoundPlaying) {
      startV8Sound();
      isSoundPlaying = true;
      bars.forEach(b => b.classList.remove('muted'));
      if (textEl) textEl.textContent = 'V8 ACTIF';
      toggleBtn.classList.add('border-red-500');
    } else {
      stopV8Sound();
      isSoundPlaying = false;
      bars.forEach(b => b.classList.add('muted'));
      if (textEl) textEl.textContent = 'MUTE';
      toggleBtn.classList.remove('border-red-500');
    }
  });
}

function startV8Sound() {
  if (!audioCtx) return;

  gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 1.2);

  // Osc 1 : grondement sourd V8
  engineOsc1 = audioCtx.createOscillator();
  engineOsc1.type = 'sawtooth';
  engineOsc1.frequency.setValueAtTime(55, audioCtx.currentTime); // ~55Hz ralenti V8

  // Osc 2 : harmonique
  engineOsc2 = audioCtx.createOscillator();
  engineOsc2.type = 'triangle';
  engineOsc2.frequency.setValueAtTime(110, audioCtx.currentTime);

  // Filtre passe-bas pour sonner lourd et profond
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(260, audioCtx.currentTime);

  engineOsc1.connect(filter);
  engineOsc2.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  engineOsc1.start();
  engineOsc2.start();
}

function stopV8Sound() {
  if (gainNode && audioCtx) {
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
    setTimeout(() => {
      try {
        if (engineOsc1) engineOsc1.stop();
        if (engineOsc2) engineOsc2.stop();
      } catch (e) {}
    }, 600);
  }
}

/* ==========================================================================
   4. Rendu de la Flotte & Calendriers
   ========================================================================== */
const activeCalendars = {};

function renderFleet() {
  const container = document.getElementById('fleet-container');
  if (!container) return;

  const cars = FleetStore.getCars();
  container.innerHTML = '';

  cars.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'car-card glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col transition-all duration-300';
    card.id = `car-section-${car.id}`;

    // Images de la galerie
    const mainImg = car.images && car.images.length > 0 ? car.images[0] : 'assets/logo/Logo.jpg';
    const thumbnailsHtml = car.images
      .map(
        (img, i) => `
        <button type="button" class="thumb-btn flex-shrink-0 w-14 h-11 md:w-16 md:h-12 rounded-lg overflow-hidden border ${i === 0 ? 'border-red-500 scale-105' : 'border-zinc-800 opacity-60'} hover:opacity-100 transition" data-car="${car.id}" data-img="${img}">
          <img src="${img}" alt="${car.name} miniature ${i+1}" class="w-full h-full object-cover">
        </button>
      `
      )
      .join('');

    card.innerHTML = `
      <!-- En-tête Visuel & Carrousel -->
      <div class="relative bg-zinc-950 overflow-hidden group">
        <div class="aspect-[16/10] w-full overflow-hidden">
          <img src="${mainImg}" id="main-img-${car.id}" alt="${car.name}" class="car-gallery-image w-full h-full object-cover">
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40 pointer-events-none"></div>

        <!-- Badges Flottants -->
        <div class="absolute top-3 left-3 flex flex-wrap gap-2">
          <span class="badge-prestige shadow-lg">${car.badge}</span>
          <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700/50">${car.power}</span>
        </div>

        <div class="absolute top-3 right-3">
          <span class="px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            Dès ${car.prices.dailyWeek} € / j
          </span>
        </div>

        <!-- Miniatures interactives -->
        <div class="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 overflow-x-auto pb-1 z-10 scrollbar-none">
          ${thumbnailsHtml}
        </div>
      </div>

      <!-- Corps de la Fiche Véhicule -->
      <div class="p-5 md:p-6 flex flex-col flex-grow">
        <div class="flex items-baseline justify-between mb-1">
          <h3 class="text-xl md:text-2xl font-black tracking-tight text-white uppercase">${car.name}</h3>
          <span class="text-xs font-mono uppercase text-red-400 font-semibold">${car.category}</span>
        </div>
        <p class="text-xs text-zinc-400 mb-4 font-medium">${car.subtitle}</p>

        <!-- Spécifications Clés -->
        <div class="grid grid-cols-3 gap-2 py-3 px-3.5 mb-5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 text-center">
          <div>
            <span class="block text-[11px] text-zinc-500 uppercase tracking-wider">0 - 100 KM/H</span>
            <span class="text-sm font-bold text-white font-mono">${car.acceleration}</span>
          </div>
          <div class="border-x border-zinc-800">
            <span class="block text-[11px] text-zinc-500 uppercase tracking-wider">PUISSANCE</span>
            <span class="text-sm font-bold text-red-400 font-mono">${car.power}</span>
          </div>
          <div>
            <span class="block text-[11px] text-zinc-500 uppercase tracking-wider">V-MAX</span>
            <span class="text-sm font-bold text-white font-mono">${car.topSpeed}</span>
          </div>
        </div>

        <p class="text-xs text-zinc-300 line-clamp-3 mb-5 leading-relaxed">${car.description}</p>

        <!-- Grille Tarifaire Officielle -->
        <div class="mb-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 overflow-hidden">
          <div class="px-3.5 py-2 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-between">
            <span class="text-xs font-bold text-zinc-200 uppercase tracking-wider">Grille Tarifaire Exclusivité</span>
            <span class="text-[11px] text-zinc-400">250 km / jour inclus</span>
          </div>
          <div class="p-3 space-y-2 text-xs">
            <div class="flex justify-between items-center text-zinc-300">
              <span>Journée Semaine (Lun-Jeu)</span>
              <span class="font-bold text-white font-mono">${car.prices.dailyWeek} € / j</span>
            </div>
            <div class="flex justify-between items-center text-zinc-300">
              <span>Pack Semaine (Lun-Ven • 5j)</span>
              <span class="font-bold text-emerald-400 font-mono">${car.prices.packWeek} €</span>
            </div>
            <div class="flex justify-between items-center text-zinc-300">
              <span>Week-end (Ven 18h - Dim 20h)</span>
              <span class="font-bold text-white font-mono">${car.prices.weekend} €</span>
            </div>
            <div class="flex justify-between items-center text-zinc-300">
              <span>Week-end Complet (Ven 18h - Lun 10h)</span>
              <span class="font-bold text-amber-400 font-mono">${car.prices.weekendFull} €</span>
            </div>
            <div class="pt-2 border-t border-zinc-800/80 flex justify-between items-center text-[11px] text-zinc-400">
              <span>Caution standard</span>
              <span class="font-semibold text-zinc-200 font-mono">${car.prices.deposit.toLocaleString()} €</span>
            </div>
            <div class="flex justify-between items-center text-[11px] text-zinc-500">
              <span>Caution moins de 25 ans</span>
              <span class="font-mono">${car.prices.depositYoung.toLocaleString()} €</span>
            </div>
          </div>
        </div>

        <!-- Section Calendrier Dédiée -->
        <div class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              Disponibilités & Réservation
            </label>
            <span class="text-[11px] text-zinc-400">Cliquez pour choisir vos dates</span>
          </div>

          <!-- Conteneur Calendrier -->
          <div id="calendar-${car.id}" class="w-full"></div>

          <!-- Récapitulatif Devis Dynamique -->
          <div id="quote-${car.id}" class="mt-3 p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/80 text-xs text-zinc-300 flex items-center justify-between">
            <div>
              <span class="block font-medium text-zinc-400" id="quote-desc-${car.id}">Sélectionnez une plage de dates</span>
              <span class="text-[11px] text-zinc-500" id="quote-dates-${car.id}">Cliquez sur le calendrier ci-dessus</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-zinc-500 uppercase block">Total Estimé</span>
              <span class="text-base font-black text-red-500 font-mono" id="quote-price-${car.id}">-- €</span>
            </div>
          </div>
        </div>

        <!-- Bouton d'Action Réservation VIP -->
        <div class="mt-auto pt-2">
          <button type="button" class="book-now-btn w-full py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_28px_rgba(239,68,68,0.65)] transition duration-200 flex items-center justify-center gap-2" data-car="${car.id}">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Réserver ce véhicule VIP
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);

    // Initialisation du calendrier pour cette voiture
    const cal = new DarkCalendar(`calendar-${car.id}`, {
      carId: car.id,
      mode: 'booking',
      onSelectionChange: (quote) => {
        updateQuoteDisplay(car.id, quote);
      }
    });
    activeCalendars[car.id] = cal;
  });

  // Gestion des clics sur miniatures
  container.querySelectorAll('.thumb-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const carId = btn.getAttribute('data-car');
      const imgUrl = btn.getAttribute('data-img');
      const mainImg = document.getElementById(`main-img-${carId}`);
      if (mainImg) {
        mainImg.src = imgUrl;
      }
      // Met à jour la bordure active
      btn.parentElement.querySelectorAll('.thumb-btn').forEach(b => {
        b.classList.remove('border-red-500', 'scale-105');
        b.classList.add('border-zinc-800', 'opacity-60');
      });
      btn.classList.add('border-red-500', 'scale-105');
      btn.classList.remove('border-zinc-800', 'opacity-60');
    });
  });

  // Gestion du bouton Réserver
  container.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const carId = btn.getAttribute('data-car');
      openReservationModal(carId);
    });
  });
}

function updateQuoteDisplay(carId, quote) {
  const descEl = document.getElementById(`quote-desc-${carId}`);
  const datesEl = document.getElementById(`quote-dates-${carId}`);
  const priceEl = document.getElementById(`quote-price-${carId}`);

  if (!quote || !quote.startDate) {
    if (descEl) descEl.textContent = 'Sélectionnez une plage de dates';
    if (datesEl) datesEl.textContent = 'Cliquez sur le calendrier ci-dessus';
    if (priceEl) priceEl.textContent = '-- €';
    return;
  }

  if (descEl) descEl.textContent = quote.breakdownText;
  if (datesEl) {
    if (quote.daysCount === 1) {
      datesEl.textContent = `Date : ${formatDisplayDate(quote.startDate)}`;
    } else {
      datesEl.textContent = `Du ${formatDisplayDate(quote.startDate)} au ${formatDisplayDate(quote.endDate)} (${quote.daysCount} jours)`;
    }
  }
  if (priceEl) priceEl.textContent = `${quote.totalPrice.toLocaleString()} €`;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

/* ==========================================================================
   5. Modal de Réservation VIP & Connexion Contact (WhatsApp, Tel, Snap, Insta)
   ========================================================================== */
let currentBookingCar = null;

function initContactModals() {
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('close-booking-modal');
  const youngDriverCheckbox = document.getElementById('young-driver-checkbox');
  const sendWhatsAppBtn = document.getElementById('send-whatsapp-btn');
  const directCallBtn = document.getElementById('direct-call-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  if (youngDriverCheckbox) {
    youngDriverCheckbox.addEventListener('change', () => {
      if (currentBookingCar) {
        refreshModalQuote();
      }
    });
  }

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      executeWhatsAppBooking();
    });
  }

  if (directCallBtn) {
    directCallBtn.href = `tel:${CONTACT_INFO.phoneRaw}`;
  }
}

function openReservationModal(carId) {
  const car = FleetStore.getCarById(carId);
  if (!car) return;
  currentBookingCar = car;

  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  // Remplir les données du véhicule
  document.getElementById('modal-car-name').textContent = car.name;
  document.getElementById('modal-car-subtitle').textContent = car.subtitle;
  document.getElementById('modal-car-img').src = car.images[0] || 'assets/logo/Logo.jpg';

  // Remplir la sélection du lieu
  const locationSelect = document.getElementById('modal-location-select');
  if (locationSelect && locationSelect.options.length === 0) {
    CONTACT_INFO.spots.forEach(spot => {
      const opt = document.createElement('option');
      opt.value = spot;
      opt.textContent = spot;
      locationSelect.appendChild(opt);
    });
  }

  refreshModalQuote();
  modal.classList.remove('hidden');
}

function refreshModalQuote() {
  if (!currentBookingCar) return;
  const cal = activeCalendars[currentBookingCar.id];
  const isYoung = document.getElementById('young-driver-checkbox')?.checked || false;
  const quote = cal ? cal.getCalculation(isYoung) : null;

  const datesTextEl = document.getElementById('modal-dates-text');
  const priceEl = document.getElementById('modal-price-val');
  const depositEl = document.getElementById('modal-deposit-val');
  const kmEl = document.getElementById('modal-km-val');

  if (quote && quote.startDate) {
    datesTextEl.textContent = quote.daysCount === 1
      ? `Le ${formatDisplayDate(quote.startDate)} (1 journée)`
      : `Du ${formatDisplayDate(quote.startDate)} au ${formatDisplayDate(quote.endDate)} (${quote.daysCount} jours)`;
    priceEl.textContent = `${quote.totalPrice.toLocaleString()} €`;
    depositEl.textContent = `${quote.deposit.toLocaleString()} €`;
    kmEl.textContent = `${quote.kmTotal} km inclus`;
  } else {
    datesTextEl.textContent = 'Aucune date sélectionnée (Sélection libre avec le conseiller)';
    priceEl.textContent = `${currentBookingCar.prices.dailyWeek} € / j`;
    depositEl.textContent = `${(isYoung ? currentBookingCar.prices.depositYoung : currentBookingCar.prices.deposit).toLocaleString()} €`;
    kmEl.textContent = '250 km / jour inclus';
  }
}

function executeWhatsAppBooking() {
  if (!currentBookingCar) return;
  const cal = activeCalendars[currentBookingCar.id];
  const isYoung = document.getElementById('young-driver-checkbox')?.checked || false;
  const quote = cal ? cal.getCalculation(isYoung) : null;

  const clientName = document.getElementById('modal-client-name')?.value.trim() || 'Client VIP';
  const location = document.getElementById('modal-location-select')?.value || 'Nice / Cannes / Monaco';
  const notes = document.getElementById('modal-notes')?.value.trim() || '';

  let message = `🏎️ *DEMANDE DE RÉSERVATION LUXRENTCAR* 🏎️\n\n`;
  message += `*Véhicule :* ${currentBookingCar.name}\n`;
  message += `*Motorisation :* ${currentBookingCar.power} (${currentBookingCar.sound})\n`;

  if (quote && quote.startDate) {
    message += `*Période :* Du ${formatDisplayDate(quote.startDate)} au ${formatDisplayDate(quote.endDate)} (${quote.daysCount} jours)\n`;
    message += `*Formule :* ${quote.breakdownText}\n`;
    message += `*Montant estimé :* ${quote.totalPrice.toLocaleString()} €\n`;
  } else {
    message += `*Période :* Dates à définir avec vous\n`;
  }

  message += `*Caution :* ${(isYoung ? currentBookingCar.prices.depositYoung : currentBookingCar.prices.deposit).toLocaleString()} € (${isYoung ? 'Moins de 25 ans' : 'Standard'})\n`;
  message += `*Lieu de prise en charge :* ${location}\n`;
  message += `*Nom du client :* ${clientName}\n`;
  if (notes) {
    message += `*Précisions :* ${notes}\n`;
  }
  message += `\nMerci de me confirmer la disponibilité et les modalités de livraison !`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encoded}`;
  window.open(waUrl, '_blank');
}

/* ==========================================================================
   6. Navigation Mobile & Menu
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (toggleBtn && menu) {
    toggleBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
      });
    });
  }
}
