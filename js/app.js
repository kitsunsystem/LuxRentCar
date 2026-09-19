/**
 * LuxRentCar - Expérience Minimaliste & Soft
 * French Riviera 06
 */

let activeModalCalendar = null;
let currentSelectedCar = null;

document.addEventListener('DOMContentLoaded', () => {
  initIntroSplash();
  initBackgroundCanvas();
  renderMinimalFleet();
  initDetailModalEvents();
});

/* ==========================================================================
   1. Animation d'Entrée Cinématique Automatique (< 2s)
   ========================================================================== */
function initIntroSplash() {
  const splash = document.getElementById('intro-splash');
  const laserBeam = document.getElementById('race-laser-beam');
  const speedEl = document.getElementById('telemetry-speed');

  if (!splash) return;

  // 2. Animation laser et accélération
  if (laserBeam) laserBeam.classList.add('active');

  let speed = 0;
  const accelTimer = setInterval(() => {
    speed += 35;
    if (speed > 320) speed = 320;
    if (speedEl) speedEl.textContent = speed;
    if (speed >= 320) clearInterval(accelTimer);
  }, 40);

  // 3. Déverrouillage automatique garanti en ~1.5s (durée totale < 2s avec le fade)
  setTimeout(() => {
    clearInterval(accelTimer);
    splash.classList.add('unlocked');
    setTimeout(() => {
      splash.style.display = 'none';
      checkAndShowVipModal();
    }, 550);
  }, 1400);
}

/* ==========================================================================
   Modale Invitation Club Privé (Lead Capture à l'Entrée)
   ========================================================================== */
function checkAndShowVipModal() {
  if (sessionStorage.getItem('lux_vip_prompted') === 'true') return;

  const modal = document.getElementById('vip-club-modal');
  const closeBtn = document.getElementById('close-vip-modal-btn');
  const skipBtn = document.getElementById('skip-vip-modal-btn');
  const form = document.getElementById('vip-club-form');
  const errorMsg = document.getElementById('vip-error-msg');
  const successBox = document.getElementById('vip-success-box');

  if (!modal) return;

  setTimeout(() => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }, 1200);

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    sessionStorage.setItem('lux_vip_prompted', 'true');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (skipBtn) skipBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('vip-input-email').value.trim();
      const phone = document.getElementById('vip-input-phone').value.trim();

      if (!email && !phone) {
        if (errorMsg) errorMsg.classList.remove('hidden');
        return;
      }

      if (errorMsg) errorMsg.classList.add('hidden');

      try {
        NetworkStore.addLead({
          email,
          phone,
          source: 'Entrée Site (Club Privé)'
        });
        form.classList.add('hidden');
        if (successBox) successBox.classList.remove('hidden');

        setTimeout(() => {
          closeModal();
        }, 1800);
      } catch (err) {
        alert(err.message || 'Erreur lors de l\'enregistrement.');
      }
    });
  }
}

/* ==========================================================================
   2. Canvas Particules Lumineuses (Lignes de Vitesse Subtiles)
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
  const count = 45;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: 0.6 + Math.random() * 1.8,
      length: 20 + Math.random() * 35,
      opacity: 0.1 + Math.random() * 0.4,
      isRed: Math.random() > 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.y += p.speedY;
      if (p.y > height) {
        p.y = -p.length;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y + p.length);
      ctx.strokeStyle = p.isRed
        ? `rgba(239, 68, 68, ${p.opacity})`
        : `rgba(255, 255, 255, ${p.opacity * 0.35})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ==========================================================================
   4. Rendu de la Collection Minimaliste (Cartes Épurées)
   ========================================================================== */
function renderMinimalFleet() {
  const container = document.getElementById('fleet-minimal-grid');
  if (!container) return;

  const cars = FleetStore.getCars();
  container.innerHTML = '';

  cars.forEach(car => {
    const card = document.createElement('div');
    const isAvail = car.isAvailable !== false;
    card.className = `car-card-minimal group flex flex-col justify-between ${!isAvail ? 'opacity-90' : ''}`;
    card.setAttribute('data-car-id', car.id);

    const mainPhoto = car.images && car.images.length > 0 ? car.images[0] : 'assets/logo/Logo.jpg';

    card.innerHTML = `
      <!-- Visuel avec Effet Zoom Doux -->
      <div class="relative aspect-[16/11] w-full overflow-hidden bg-zinc-950">
        <img src="${mainPhoto}" alt="${car.name}" class="car-img-cover w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-black/20 pointer-events-none"></div>

        <!-- Pastille Disponibilité -->
        <div class="absolute top-3.5 left-3.5 z-10">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${isAvail ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-600/60 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-black/90 text-red-400 border border-red-800/80'} flex items-center gap-1 backdrop-blur-md">
            <span class="w-1.5 h-1.5 rounded-full ${isAvail ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}"></span>
            ${isAvail ? 'DISPONIBLE' : 'INDISPONIBLE'}
          </span>
        </div>

        <!-- Pastille Tarif Clé Flottante -->
        <div class="absolute top-3.5 right-3.5 z-10">
          <span class="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/10 shadow-lg">
            Dès <span class="text-red-500 font-mono">${car.prices.dailyWeek} €</span> / j
          </span>
        </div>

        <!-- Badge Performance Discret -->
        <div class="absolute bottom-3 left-3.5 z-10">
          <span class="px-2.5 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-red-600/90 text-white">
            ${car.badge}
          </span>
        </div>
      </div>

      <!-- Informations Minimales -->
      <div class="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 class="text-base sm:text-lg font-black tracking-tight text-white uppercase group-hover:text-red-500 transition duration-300">
            ${car.name}
          </h3>
          <p class="text-[11px] text-zinc-400 font-medium mb-3">${car.subtitle}</p>

          <!-- 3 Micro Stats -->
          <div class="flex items-center space-x-3 text-[11px] font-mono text-zinc-400 pb-3 border-b border-zinc-900">
            <span class="text-white font-bold">${car.power}</span>
            <span class="text-zinc-700">•</span>
            <span>${car.acceleration}</span>
            <span class="text-zinc-700">•</span>
            <span>${car.topSpeed}</span>
          </div>
        </div>

        <!-- Call to Action Élégant -->
        <div class="pt-4 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-white transition">
          <span class="tracking-wider uppercase text-[10px]">${isAvail ? 'Voir détails & disponibilités' : 'Voir fiche & alerte disponibilité'}</span>
          <span class="text-red-500 transform group-hover:translate-x-1 transition duration-300">→</span>
        </div>
      </div>
    `;

    // Clic sur toute la carte ouvre les détails complets
    card.addEventListener('click', () => {
      openCarDetailModal(car.id);
    });

    container.appendChild(card);
  });
}

/* ==========================================================================
   5. Modal / Tiroir de Détails Complets du Véhicule
   ========================================================================== */
function initDetailModalEvents() {
  const modal = document.getElementById('car-detail-modal');
  const closeBtn = document.getElementById('close-detail-modal');
  const youngCheckbox = document.getElementById('modal-young-checkbox');
  const waBtn = document.getElementById('modal-whatsapp-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  // Fermeture touche Échap
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  });

  if (youngCheckbox) {
    youngCheckbox.addEventListener('change', () => {
      if (currentSelectedCar && activeModalCalendar) {
        updateModalQuote(activeModalCalendar.getCalculation(youngCheckbox.checked));
      }
    });
  }

  if (waBtn) {
    waBtn.addEventListener('click', () => {
      executeModalWhatsApp();
    });
  }
}

function openCarDetailModal(carId) {
  const car = FleetStore.getCarById(carId);
  if (!car) return;
  currentSelectedCar = car;

  const modal = document.getElementById('car-detail-modal');
  if (!modal) return;

  // Remplissage infos
  document.getElementById('modal-car-title').textContent = car.name;
  document.getElementById('modal-car-sub').textContent = car.subtitle;
  document.getElementById('detail-desc-text').textContent = car.description;
  document.getElementById('detail-sound-text').textContent = car.sound;

  // Specs
  document.getElementById('detail-spec-power').textContent = car.power;
  document.getElementById('detail-spec-accel').textContent = car.acceleration;
  document.getElementById('detail-spec-speed').textContent = car.topSpeed;
  document.getElementById('detail-badge-pill').textContent = car.badge;

  // Grille Tarifs
  document.getElementById('price-val-daily').textContent = `${car.prices.dailyWeek} € / j`;
  document.getElementById('price-val-packWeek').textContent = `${car.prices.packWeek} €`;
  document.getElementById('price-val-weekend').textContent = `${car.prices.weekend} €`;
  document.getElementById('price-val-weekendFull').textContent = `${car.prices.weekendFull} €`;
  document.getElementById('price-val-deposit').textContent = `${car.prices.deposit.toLocaleString()} €`;
  document.getElementById('price-val-depositYoung').textContent = `${car.prices.depositYoung.toLocaleString()} €`;

  // Galerie photo
  const mainImg = document.getElementById('detail-main-img');
  mainImg.src = car.images[0] || 'assets/logo/Logo.jpg';

  const thumbsContainer = document.getElementById('detail-thumbnails-list');
  thumbsContainer.innerHTML = '';

  car.images.forEach((img, idx) => {
    const thumbBtn = document.createElement('button');
    thumbBtn.type = 'button';
    thumbBtn.className = `flex-shrink-0 w-12 h-9 rounded-lg overflow-hidden border ${idx === 0 ? 'border-red-500 scale-105' : 'border-zinc-800 opacity-60'} hover:opacity-100 transition`;
    thumbBtn.innerHTML = `<img src="${img}" alt="Miniature" class="w-full h-full object-cover">`;

    thumbBtn.addEventListener('click', () => {
      mainImg.src = img;
      thumbsContainer.querySelectorAll('button').forEach(b => {
        b.classList.remove('border-red-500', 'scale-105');
        b.classList.add('border-zinc-800', 'opacity-60');
      });
      thumbBtn.classList.add('border-red-500', 'scale-105');
      thumbBtn.classList.remove('border-zinc-800', 'opacity-60');
    });

    thumbsContainer.appendChild(thumbBtn);
  });

  // Initialisation du Calendrier pour cette voiture dans la modal
  const calContainer = document.getElementById('modal-calendar-container');
  calContainer.innerHTML = '';

  activeModalCalendar = new DarkCalendar('modal-calendar-container', {
    carId: car.id,
    mode: 'booking',
    onSelectionChange: (quote) => {
      const isYoung = document.getElementById('modal-young-checkbox')?.checked || false;
      updateModalQuote(activeModalCalendar.getCalculation(isYoung));
    }
  });

  // Réinitialisation devis
  updateModalQuote(activeModalCalendar.getCalculation(false));

  modal.classList.remove('hidden');
}

function updateModalQuote(quote) {
  const periodEl = document.getElementById('modal-calc-period');
  const breakdownEl = document.getElementById('modal-calc-breakdown');
  const priceEl = document.getElementById('modal-calc-price');

  if (!quote || !quote.startDate) {
    if (periodEl) periodEl.textContent = 'Sélectionnez une période';
    if (breakdownEl) breakdownEl.textContent = 'Cliquez sur le calendrier ci-dessus';
    if (priceEl) priceEl.textContent = '-- €';
    return;
  }

  if (quote.daysCount === 1) {
    if (periodEl) periodEl.textContent = `Date : ${formatDateDisplay(quote.startDate)}`;
  } else {
    if (periodEl) periodEl.textContent = `Du ${formatDateDisplay(quote.startDate)} au ${formatDateDisplay(quote.endDate)} (${quote.daysCount} jours)`;
  }

  if (breakdownEl) breakdownEl.textContent = `${quote.breakdownText} • Caution: ${quote.deposit.toLocaleString()} € • ${quote.kmTotal} km inclus`;
  if (priceEl) priceEl.textContent = `${quote.totalPrice.toLocaleString()} €`;
}

function formatDateDisplay(dStr) {
  if (!dStr) return '';
  const [y, m, d] = dStr.split('-');
  return `${d}/${m}/${y}`;
}

function executeModalWhatsApp() {
  if (!currentSelectedCar) return;

  const isYoung = document.getElementById('modal-young-checkbox')?.checked || false;
  const quote = activeModalCalendar ? activeModalCalendar.getCalculation(isYoung) : null;

  let msg = `🏎️ *RÉSERVATION LUXRENTCAR (06)* 🏎️\n\n`;
  msg += `*Bolide :* ${currentSelectedCar.name}\n`;
  msg += `*Motorisation :* ${currentSelectedCar.power} • ${currentSelectedCar.sound}\n`;

  if (quote && quote.startDate) {
    msg += `*Dates :* Du ${formatDateDisplay(quote.startDate)} au ${formatDateDisplay(quote.endDate)} (${quote.daysCount}j)\n`;
    msg += `*Formule :* ${quote.breakdownText}\n`;
    msg += `*Total estimé :* ${quote.totalPrice.toLocaleString()} €\n`;
  } else {
    msg += `*Dates :* À convenir ensemble\n`;
  }

  msg += `*Caution :* ${(isYoung ? currentSelectedCar.prices.depositYoung : currentSelectedCar.prices.deposit).toLocaleString()} € (${isYoung ? '-25 ans' : 'Standard'})\n`;
  msg += `*Secteur :* Nice / Cannes / Monaco / St-Tropez\n\n`;

  const isAvail = currentSelectedCar.isAvailable !== false;
  if (isAvail) {
    msg += `Bonjour, merci de me confirmer la disponibilité pour ce véhicule !`;
  } else {
    msg += `Bonjour, ce véhicule étant noté non disponible, pouvez-vous me prévenir dès qu'il se libère ou me proposer un bolide équivalent ?`;
  }

  const waUrl = `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}
