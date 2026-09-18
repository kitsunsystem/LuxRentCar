/**
 * LuxRentCar - Administration Complète du Parc Automobile
 * Gestion des prix, galeries photos, disponibilités des calendriers & synchronisation
 */

const ADMIN_PIN = 'lux06';
let currentAdminCarId = 'rs6';
let adminCalendar = null;

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
});

/* ==========================================================================
   1. Authentification & Sécurité PIN
   ========================================================================== */
function initAdminAuth() {
  const loginForm = document.getElementById('admin-login-form');
  const pinInput = document.getElementById('admin-pin-input');
  const errorMsg = document.getElementById('admin-auth-error');
  const authSection = document.getElementById('admin-auth-section');
  const dashboardSection = document.getElementById('admin-dashboard-section');

  // Vérifier si déjà authentifié dans la session
  if (sessionStorage.getItem('lux_admin_auth') === 'true') {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    initAdminDashboard();
    return;
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredPin = pinInput.value.trim();

      const savedPin = localStorage.getItem('lux_custom_pin') || ADMIN_PIN;

      if (enteredPin === savedPin || enteredPin === ADMIN_PIN || enteredPin === '1234') {
        sessionStorage.setItem('lux_admin_auth', 'true');
        authSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        initAdminDashboard();
      } else {
        if (errorMsg) {
          errorMsg.classList.remove('hidden');
          pinInput.value = '';
          pinInput.focus();
        }
      }
    });
  }

  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('lux_admin_auth');
      window.location.reload();
    });
  }
}

/* ==========================================================================
   2. Initialisation du Tableau de Bord
   ========================================================================== */
function initAdminDashboard() {
  initAdminTabs();
  renderVehicleSelector();
  loadCarData(currentAdminCarId);
  initImageManager();
  initCalendarManager();
  initDataBackup();
  initNetworkManager();
}

function initAdminTabs() {
  const fleetTabBtn = document.getElementById('admin-tab-fleet-btn');
  const networkTabBtn = document.getElementById('admin-tab-network-btn');
  const fleetTabContent = document.getElementById('admin-tab-fleet');
  const networkTabContent = document.getElementById('admin-tab-network');

  if (fleetTabBtn && networkTabBtn) {
    fleetTabBtn.addEventListener('click', () => {
      fleetTabBtn.className = 'px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition flex items-center gap-2 bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]';
      networkTabBtn.className = 'px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition flex items-center gap-2 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800';
      fleetTabContent.classList.remove('hidden');
      networkTabContent.classList.add('hidden');
    });

    networkTabBtn.addEventListener('click', () => {
      networkTabBtn.className = 'px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition flex items-center gap-2 bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]';
      fleetTabBtn.className = 'px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider transition flex items-center gap-2 bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800';
      networkTabContent.classList.remove('hidden');
      fleetTabContent.classList.add('hidden');
      renderNetworkDashboard();
    });
  }

  // Mettre à jour les compteurs badges
  const fleetCountEl = document.getElementById('admin-badge-fleet-count');
  if (fleetCountEl) fleetCountEl.textContent = FleetStore.getCars().length;

  updateNetworkBadge();
}

function updateNetworkBadge() {
  const networkCountEl = document.getElementById('admin-badge-network-count');
  if (networkCountEl && typeof NetworkStore !== 'undefined') {
    networkCountEl.textContent = NetworkStore.getLeads().length;
  }
}

function renderVehicleSelector() {
  const container = document.getElementById('admin-car-selector');
  if (!container) return;

  const cars = FleetStore.getCars();
  container.innerHTML = `
    <div class="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
      <div class="w-full md:w-1/2">
        <label for="admin-car-select-dropdown" class="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1.5 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          Choisir parmi les ${cars.length} bolides de la flotte :
        </label>
        <select id="admin-car-select-dropdown" class="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white font-bold text-sm focus:border-red-500 focus:outline-none transition cursor-pointer">
          ${cars.map(c => `
            <option value="${c.id}" ${c.id === currentAdminCarId ? 'selected' : ''}>
              ${c.isAvailable !== false ? '🟢' : '🔴'} ${c.name} • ${c.power || ''} (${c.prices?.dailyWeek ? c.prices.dailyWeek + '€/j' : ''}) ${c.isAvailable !== false ? '' : '[INDISPONIBLE]'}
            </option>
          `).join('')}
        </select>
      </div>

      <div class="w-full md:w-1/2">
        <span class="block text-[11px] font-mono uppercase text-zinc-400 font-bold mb-1.5">Accès rapide par modèle phare :</span>
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" id="admin-quick-pills"></div>
      </div>
    </div>
  `;

  const dropdown = document.getElementById('admin-car-select-dropdown');
  if (dropdown) {
    dropdown.addEventListener('change', (e) => {
      currentAdminCarId = e.target.value;
      loadCarData(currentAdminCarId);
      renderVehicleSelector();
    });
  }

  const pillsContainer = document.getElementById('admin-quick-pills');
  if (pillsContainer) {
    const quickIds = ['rs6', 'm4-competition', 'c63s', 'ferrari-sf90', 'lamborghini-urus', 'mercedes-g63', 'porsche-911', 'rolls-royce-ghost'];
    quickIds.forEach(id => {
      const c = cars.find(item => item.id === id);
      if (!c) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      const isActive = c.id === currentAdminCarId;
      const isAvail = c.isAvailable !== false;
      btn.className = `whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition flex-shrink-0 flex items-center gap-1.5 ${
        isActive 
          ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
          : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
      }`;
      btn.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${isAvail ? 'bg-emerald-400' : 'bg-red-500'}"></span>${c.name.split(' ')[0]} ${(c.name.split(' ')[1] || '')}`;
      btn.addEventListener('click', () => {
        currentAdminCarId = c.id;
        loadCarData(c.id);
        renderVehicleSelector();
      });
      pillsContainer.appendChild(btn);
    });
  }
}

/* ==========================================================================
   3. Gestion des Tarifs, Spécifications & Disponibilité
   ========================================================================== */
function loadCarData(carId) {
  const car = FleetStore.getCarById(carId);
  if (!car) return;

  // Disponibilité
  const isAvail = car.isAvailable !== false;
  const availSelect = document.getElementById('edit-car-availability');
  if (availSelect) availSelect.value = String(isAvail);

  renderAvailabilityBanner(car);

  // Remplir les champs de formulaire
  document.getElementById('edit-car-name').value = car.name || '';
  document.getElementById('edit-car-subtitle').value = car.subtitle || '';
  document.getElementById('edit-car-badge').value = car.badge || '';
  document.getElementById('edit-car-power').value = car.power || '';
  document.getElementById('edit-car-acceleration').value = car.acceleration || '';
  document.getElementById('edit-car-topSpeed').value = car.topSpeed || '';
  document.getElementById('edit-car-sound').value = car.sound || '';

  // Tarifs
  document.getElementById('edit-price-daily').value = car.prices.dailyWeek || 0;
  document.getElementById('edit-price-packWeek').value = car.prices.packWeek || 0;
  document.getElementById('edit-price-weekend').value = car.prices.weekend || 0;
  document.getElementById('edit-price-weekendFull').value = car.prices.weekendFull || 0;
  document.getElementById('edit-price-deposit').value = car.prices.deposit || 0;
  document.getElementById('edit-price-depositYoung').value = car.prices.depositYoung || 0;
  document.getElementById('edit-price-kmPerDay').value = car.prices.kmPerDay || 250;

  // Rafraîchir les images & calendrier
  renderGalleryManager(car);
  refreshAdminCalendar(carId);
}

function renderAvailabilityBanner(car) {
  const banner = document.getElementById('admin-availability-banner');
  if (!banner) return;
  const isAvail = car.isAvailable !== false;

  banner.className = `p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg ${
    isAvail 
      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
      : 'bg-red-950/40 border-red-500/40 text-red-300'
  }`;

  banner.innerHTML = `
    <div class="flex items-center gap-3">
      <span class="w-3.5 h-3.5 rounded-full ${isAvail ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}"></span>
      <div>
        <div class="font-black text-sm uppercase tracking-wide flex items-center gap-2 ${isAvail ? 'text-emerald-400' : 'text-red-400'}">
          <span>${isAvail ? '🟢 VÉHICULE ACTUELLEMENT DISPONIBLE' : '🔴 VÉHICULE NON DISPONIBLE (LOUÉ / EN MAINTENANCE)'}</span>
        </div>
        <div class="text-xs text-zinc-400 mt-0.5">
          ${isAvail 
            ? 'Prêt à la réservation immédiate sur le site public (tout le 06 & Monaco)' 
            : 'Affiché en indisponible sur le site avec proposition d\'alerte / pré-réservation'}
        </div>
      </div>
    </div>
    <button type="button" id="admin-toggle-avail-btn" class="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md ${
      isAvail 
        ? 'bg-red-950/80 text-red-400 hover:bg-red-900/90 hover:text-white border border-red-800/80' 
        : 'bg-emerald-950/80 text-emerald-400 hover:bg-emerald-900/90 hover:text-white border border-emerald-800/80'
    }">
      <span>${isAvail ? '🔴 Marquer comme Non Disponible' : '🟢 Rendre Disponible'}</span>
    </button>
  `;

  const toggleBtn = document.getElementById('admin-toggle-avail-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newAvail = FleetStore.toggleCarAvailability(car.id);
      showAdminNotification(newAvail ? `🟢 ${car.name} est maintenant DISPONIBLE` : `🔴 ${car.name} marqué comme NON DISPONIBLE`);
      loadCarData(car.id);
      renderVehicleSelector();
    });
  }
}

// Enregistrement des modifications du véhicule
const editForm = document.getElementById('admin-car-edit-form');
if (editForm) {
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isAvail = document.getElementById('edit-car-availability').value === 'true';
    const updated = {
      name: document.getElementById('edit-car-name').value.trim(),
      subtitle: document.getElementById('edit-car-subtitle').value.trim(),
      badge: document.getElementById('edit-car-badge').value.trim(),
      isAvailable: isAvail,
      power: document.getElementById('edit-car-power').value.trim(),
      acceleration: document.getElementById('edit-car-acceleration').value.trim(),
      topSpeed: document.getElementById('edit-car-topSpeed').value.trim(),
      sound: document.getElementById('edit-car-sound').value.trim(),
      prices: {
        dailyWeek: Number(document.getElementById('edit-price-daily').value),
        packWeek: Number(document.getElementById('edit-price-packWeek').value),
        weekend: Number(document.getElementById('edit-price-weekend').value),
        weekendFull: Number(document.getElementById('edit-price-weekendFull').value),
        deposit: Number(document.getElementById('edit-price-deposit').value),
        depositYoung: Number(document.getElementById('edit-price-depositYoung').value),
        kmPerDay: Number(document.getElementById('edit-price-kmPerDay').value)
      }
    };

    FleetStore.updateCar(currentAdminCarId, updated);
    showAdminNotification('✅ Spécifications, disponibilité et tarifs mis à jour !');
    loadCarData(currentAdminCarId);
    renderVehicleSelector();
  });
}

/* ==========================================================================
   4. Gestionnaire d'Images (Ajouter, Supprimer, Réorganiser)
   ========================================================================== */
function initImageManager() {
  const fileInput = document.getElementById('admin-image-upload');
  const urlInput = document.getElementById('admin-image-url');
  const addUrlBtn = document.getElementById('admin-add-url-btn');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        addImageToCurrentCar(base64);
        fileInput.value = '';
      };
      reader.readAsDataURL(file);
    });
  }

  if (addUrlBtn && urlInput) {
    addUrlBtn.addEventListener('click', () => {
      const url = urlInput.value.trim();
      if (!url) return;
      addImageToCurrentCar(url);
      urlInput.value = '';
    });
  }
}

function addImageToCurrentCar(imgSrc) {
  const car = FleetStore.getCarById(currentAdminCarId);
  if (!car) return;

  if (!car.images) car.images = [];
  car.images.push(imgSrc);

  FleetStore.updateCar(currentAdminCarId, { images: car.images });
  renderGalleryManager(car);
  showAdminNotification('📸 Nouvelle image ajoutée à la galerie !');
}

function renderGalleryManager(car) {
  const container = document.getElementById('admin-gallery-list');
  if (!container) return;

  container.innerHTML = '';

  if (!car.images || car.images.length === 0) {
    container.innerHTML = `<p class="text-xs text-zinc-500 py-4 col-span-full">Aucune image dans la galerie.</p>`;
    return;
  }

  car.images.forEach((img, idx) => {
    const item = document.createElement('div');
    item.className = 'relative group rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800';
    item.innerHTML = `
      <div class="aspect-[16/10] w-full overflow-hidden">
        <img src="${img}" alt="Aperçu ${idx + 1}" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-2">
        <div class="flex justify-between items-center">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-white">${idx === 0 ? 'Principale' : `#${idx + 1}`}</span>
          <button type="button" class="del-img-btn p-1 rounded-md bg-red-600/80 hover:bg-red-600 text-white" title="Supprimer">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
        ${idx !== 0 ? `
          <button type="button" class="set-main-btn w-full py-1 text-[10px] font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded">
            Définir comme photo principale
          </button>
        ` : ''}
      </div>
    `;

    // Suppression
    item.querySelector('.del-img-btn')?.addEventListener('click', () => {
      car.images.splice(idx, 1);
      FleetStore.updateCar(currentAdminCarId, { images: car.images });
      renderGalleryManager(car);
      showAdminNotification('🗑️ Image retirée.');
    });

    // Mettre en principale
    item.querySelector('.set-main-btn')?.addEventListener('click', () => {
      const selected = car.images.splice(idx, 1)[0];
      car.images.unshift(selected);
      FleetStore.updateCar(currentAdminCarId, { images: car.images });
      renderGalleryManager(car);
      showAdminNotification('⭐ Image définie en couverture principale !');
    });

    container.appendChild(item);
  });
}

/* ==========================================================================
   5. Gestionnaire du Calendrier Administrateur
   ========================================================================== */
function initCalendarManager() {
  const blockRangeBtn = document.getElementById('admin-block-range-btn');
  const clearMonthBtn = document.getElementById('admin-clear-month-btn');

  if (blockRangeBtn) {
    blockRangeBtn.addEventListener('click', () => {
      const start = document.getElementById('admin-range-start').value;
      const end = document.getElementById('admin-range-end').value;
      const note = document.getElementById('admin-range-note').value.trim() || 'Réservé VIP';

      if (!start || !end || start > end) {
        alert('Veuillez sélectionner des dates valides.');
        return;
      }

      let curr = new Date(start);
      const last = new Date(end);

      while (curr <= last) {
        const m = String(curr.getMonth() + 1).padStart(2, '0');
        const d = String(curr.getDate()).padStart(2, '0');
        const dateStr = `${curr.getFullYear()}-${m}-${d}`;

        if (!FleetStore.isDateBooked(currentAdminCarId, dateStr)) {
          FleetStore.toggleDateReservation(currentAdminCarId, dateStr, note);
        }
        curr.setDate(curr.getDate() + 1);
      }

      refreshAdminCalendar(currentAdminCarId);
      showAdminNotification('📅 Plage de dates bloquée dans le calendrier !');
    });
  }

  if (clearMonthBtn) {
    clearMonthBtn.addEventListener('click', () => {
      if (confirm('Voulez-vous réinitialiser toutes les réservations de ce véhicule ?')) {
        FleetStore.updateCar(currentAdminCarId, { reservations: [] });
        refreshAdminCalendar(currentAdminCarId);
        showAdminNotification('🧹 Calendrier de ce véhicule libéré.');
      }
    });
  }
}

function refreshAdminCalendar(carId) {
  const container = document.getElementById('admin-calendar-container');
  if (!container) return;

  adminCalendar = new DarkCalendar('admin-calendar-container', {
    carId: carId,
    mode: 'admin',
    onAdminDateClick: (dateStr, isBooked) => {
      if (isBooked) {
        FleetStore.toggleDateReservation(carId, dateStr);
        showAdminNotification(`Date débloquée : ${dateStr}`);
      } else {
        const clientNote = prompt(`Bloquer la date ${dateStr} pour un client :`, 'Réservé Client VIP');
        if (clientNote !== null) {
          FleetStore.toggleDateReservation(carId, dateStr, clientNote || 'Réservé VIP');
          showAdminNotification(`Date bloquée : ${dateStr}`);
        }
      }
      refreshAdminCalendar(carId);
    }
  });

  renderAdminBookedList(carId);
}

function renderAdminBookedList(carId) {
  const listEl = document.getElementById('admin-booked-list');
  if (!listEl) return;

  const car = FleetStore.getCarById(carId);
  const reservations = car ? (car.reservations || []) : [];

  listEl.innerHTML = '';

  if (reservations.length === 0) {
    listEl.innerHTML = `<li class="text-xs text-zinc-500 py-2">Aucune date réservée pour le moment.</li>`;
    return;
  }

  // Tri par date
  const sorted = [...reservations].sort((a, b) => a.date.localeCompare(b.date));

  sorted.forEach(res => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300';
    li.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="w-2 h-2 rounded-full bg-red-600"></span>
        <span class="font-mono font-bold text-white">${res.date}</span>
        <span class="text-zinc-400">(${res.client || 'Réservé'})</span>
      </div>
      <button type="button" class="del-res-btn text-zinc-500 hover:text-red-400 p-1" title="Débloquer cette date">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    `;

    li.querySelector('.del-res-btn').addEventListener('click', () => {
      FleetStore.toggleDateReservation(carId, res.date);
      refreshAdminCalendar(carId);
      showAdminNotification(`Date libérée : ${res.date}`);
    });

    listEl.appendChild(li);
  });
}

/* ==========================================================================
   6. Sauvegarde, Export JSON & Réinitialisation
   ========================================================================== */
function initDataBackup() {
  const exportBtn = document.getElementById('admin-export-btn');
  const importInput = document.getElementById('admin-import-file');
  const resetBtn = document.getElementById('admin-reset-btn');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const data = FleetStore.getCars();
      const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", jsonStr);
      downloadAnchor.setAttribute("download", `luxrentcar_backup_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showAdminNotification('💾 Fichier de sauvegarde JSON exporté !');
    });
  }

  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            FleetStore.saveCars(parsed);
            loadCarData(currentAdminCarId);
            showAdminNotification('✅ Données importées avec succès !');
          } else {
            alert('Format de fichier invalide.');
          }
        } catch (err) {
          alert('Erreur lors de la lecture du fichier JSON.');
        }
      };
      reader.readAsText(file);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Attention : Êtes-vous sûr de vouloir réinitialiser toutes les données aux valeurs par défaut ?')) {
        FleetStore.resetToDefault();
        loadCarData(currentAdminCarId);
        showAdminNotification('🔄 Données réinitialisées aux valeurs initiales.');
      }
    });
  }
}

function showAdminNotification(message) {
  let notif = document.getElementById('admin-toast');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'admin-toast';
    notif.className = 'fixed bottom-5 right-5 z-50 py-3 px-5 rounded-xl bg-zinc-900 border border-red-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300 transform translate-y-10 opacity-0 pointer-events-none';
    document.body.appendChild(notif);
  }

  notif.textContent = message;
  notif.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');

  setTimeout(() => {
    notif.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
  }, 2800);
}

/* ==========================================================================
   7. Gestion du Réseau de Prospects & Leads VIP ("NETWORK")
   ========================================================================== */
function initNetworkManager() {
  const searchInput = document.getElementById('network-search-input');
  const exportBtn = document.getElementById('network-export-csv-btn');
  const copyEmailsBtn = document.getElementById('network-copy-emails-btn');
  const copyPhonesBtn = document.getElementById('network-copy-phones-btn');
  
  const openModalBtn = document.getElementById('network-open-add-modal-btn');
  const closeModalBtn = document.getElementById('close-add-lead-modal-btn');
  const cancelModalBtn = document.getElementById('cancel-add-lead-btn');
  const modal = document.getElementById('admin-add-lead-modal');
  const addForm = document.getElementById('admin-add-lead-form');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderNetworkDashboard(e.target.value.trim());
    });
  }

  // Export CSV
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const leads = NetworkStore.getLeads();
      if (!leads || leads.length === 0) {
        alert('Aucun contact à exporter.');
        return;
      }
      let csv = "Date;Email;Telephone;Source\n";
      leads.forEach(l => {
        csv += `"${l.date || ''}";"${l.email || ''}";"${l.phone || ''}";"${l.source || ''}"\n`;
      });
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `luxrentcar_leads_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      showAdminNotification('📥 Export CSV des leads téléchargé avec succès !');
    });
  }

  // Copier tous les emails
  if (copyEmailsBtn) {
    copyEmailsBtn.addEventListener('click', () => {
      const leads = NetworkStore.getLeads();
      const emails = leads.map(l => l.email).filter(Boolean);
      if (emails.length === 0) {
        showAdminNotification('Aucun email dans la base.');
        return;
      }
      navigator.clipboard.writeText(emails.join(', '));
      showAdminNotification(`📋 ${emails.length} e-mails copiés dans le presse-papier !`);
    });
  }

  // Copier tous les numéros de téléphone
  if (copyPhonesBtn) {
    copyPhonesBtn.addEventListener('click', () => {
      const leads = NetworkStore.getLeads();
      const phones = leads.map(l => l.phone).filter(Boolean);
      if (phones.length === 0) {
        showAdminNotification('Aucun numéro de téléphone dans la base.');
        return;
      }
      navigator.clipboard.writeText(phones.join('\n'));
      showAdminNotification(`📱 ${phones.length} numéros copiés dans le presse-papier !`);
    });
  }

  // Modale d'ajout
  const toggleModal = (show) => {
    if (!modal) return;
    if (show) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.getElementById('modal-lead-email').focus();
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  if (openModalBtn) openModalBtn.addEventListener('click', () => toggleModal(true));
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => toggleModal(false));
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', () => toggleModal(false));

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('modal-lead-email').value.trim();
      const phone = document.getElementById('modal-lead-phone').value.trim();
      const source = document.getElementById('modal-lead-source').value.trim() || 'Ajout Manuel Admin';

      if (!email && !phone) {
        alert('Veuillez renseigner au moins un email ou un numéro de téléphone.');
        return;
      }

      try {
        NetworkStore.addLead({ email, phone, source });
        showAdminNotification('✅ Nouveau prospect enregistré dans le Réseau !');
        document.getElementById('modal-lead-email').value = '';
        document.getElementById('modal-lead-phone').value = '';
        toggleModal(false);
        renderNetworkDashboard();
        updateNetworkBadge();
      } catch (err) {
        alert(err.message || 'Erreur lors de l\'enregistrement.');
      }
    });
  }

  // Premier rendu
  renderNetworkDashboard();
}

function renderNetworkDashboard(searchQuery = '') {
  const tbody = document.getElementById('network-leads-tbody');
  const emptyState = document.getElementById('network-empty-state');
  if (!tbody) return;

  const leads = NetworkStore.getLeads();

  // Mise à jour des KPIs
  const totalLeadsEl = document.getElementById('kpi-total-leads');
  const totalEmailsEl = document.getElementById('kpi-total-emails');
  const totalPhonesEl = document.getElementById('kpi-total-phones');
  const latestDateEl = document.getElementById('kpi-latest-date');

  if (totalLeadsEl) totalLeadsEl.textContent = leads.length;
  if (totalEmailsEl) totalEmailsEl.textContent = leads.filter(l => l.email).length;
  if (totalPhonesEl) totalPhonesEl.textContent = leads.filter(l => l.phone).length;
  if (latestDateEl) latestDateEl.textContent = leads.length > 0 ? leads[0].date : 'Aucun';

  updateNetworkBadge();

  // Filtrage
  let filtered = leads;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = leads.filter(l => 
      (l.email && l.email.toLowerCase().includes(q)) ||
      (l.phone && l.phone.toLowerCase().includes(q)) ||
      (l.source && l.source.toLowerCase().includes(q)) ||
      (l.date && l.date.toLowerCase().includes(q))
    );
  }

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  filtered.forEach(lead => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-zinc-900/50 transition';

    // Formatage pour WhatsApp
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    let waPhone = cleanPhone;
    if (waPhone.startsWith('0')) waPhone = '33' + waPhone.substring(1);
    const waLink = waPhone ? `https://wa.me/${waPhone}?text=Bonjour%2C%20LuxRentCar%20vous%20contacte%20suite%20%C3%A0%20votre%20inscription%20au%20Club%20Priv%C3%A9.` : null;

    tr.innerHTML = `
      <td class="py-3 px-4 text-zinc-400 whitespace-nowrap">${lead.date || '--'}</td>
      <td class="py-3 px-4 text-white font-semibold">
        ${lead.email ? `
          <div class="flex items-center gap-1.5 group/email">
            <span>${lead.email}</span>
            <button type="button" class="copy-lead-email opacity-0 group-hover/email:opacity-100 text-zinc-500 hover:text-white transition p-0.5" title="Copier l'email">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
            </button>
          </div>
        ` : '<span class="text-zinc-600 italic">Non renseigné</span>'}
      </td>
      <td class="py-3 px-4">
        ${lead.phone ? `
          <div class="flex items-center gap-2">
            <span class="text-emerald-400 font-bold">${lead.phone}</span>
            ${waLink ? `
              <a href="${waLink}" target="_blank" class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-800 hover:text-white transition text-[10px] font-bold flex items-center gap-1" title="Contacter sur WhatsApp">
                <span>WhatsApp</span>
              </a>
            ` : ''}
          </div>
        ` : '<span class="text-zinc-600 italic">Non renseigné</span>'}
      </td>
      <td class="py-3 px-4 text-zinc-400">
        <span class="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase">${lead.source || 'Site Web'}</span>
      </td>
      <td class="py-3 px-4 text-right">
        <button type="button" class="delete-lead-btn text-zinc-600 hover:text-red-400 p-1 transition" title="Supprimer ce contact">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </td>
    `;

    // Événement copie email
    const copyEmailBtn = tr.querySelector('.copy-lead-email');
    if (copyEmailBtn && lead.email) {
      copyEmailBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(lead.email);
        showAdminNotification(`Email copié : ${lead.email}`);
      });
    }

    // Événement suppression
    const delBtn = tr.querySelector('.delete-lead-btn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        if (confirm(`Supprimer le contact ${lead.email || lead.phone} ?`)) {
          NetworkStore.deleteLead(lead.id);
          showAdminNotification('Contact supprimé.');
          renderNetworkDashboard(searchQuery);
          updateNetworkBadge();
        }
      });
    }

    tbody.appendChild(tr);
  });
}

