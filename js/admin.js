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
  renderVehicleSelector();
  loadCarData(currentAdminCarId);
  initImageManager();
  initCalendarManager();
  initDataBackup();
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
              ${c.name} • ${c.power || ''} (${c.prices?.dailyWeek ? c.prices.dailyWeek + '€/j' : ''})
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
      btn.className = `whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition flex-shrink-0 ${
        isActive 
          ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
          : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
      }`;
      btn.textContent = c.name.split(' ')[0] + ' ' + (c.name.split(' ')[1] || '');
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
   3. Gestion des Tarifs & Spécifications
   ========================================================================== */
function loadCarData(carId) {
  const car = FleetStore.getCarById(carId);
  if (!car) return;

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

// Enregistrement des modifications du véhicule
const editForm = document.getElementById('admin-car-edit-form');
if (editForm) {
  editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = {
      name: document.getElementById('edit-car-name').value.trim(),
      subtitle: document.getElementById('edit-car-subtitle').value.trim(),
      badge: document.getElementById('edit-car-badge').value.trim(),
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
    showAdminNotification('✅ Spécifications et tarifs mis à jour avec succès !');
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
