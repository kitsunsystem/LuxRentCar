/**
 * LuxRentCar - Composant Calendrier Sombre & Épuré
 * Design "Soft, Sombre & Propre"
 * Support de la sélection de dates, calcul de prix intelligent et mode Admin
 */

class DarkCalendar {
  constructor(containerId, options = {}) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.carId = options.carId || 'rs6';
    this.mode = options.mode || 'booking'; // 'booking' | 'admin'
    this.onSelectionChange = options.onSelectionChange || null;
    this.onAdminDateClick = options.onAdminDateClick || null;

    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth(); // 0-indexed

    this.startDate = null; // 'YYYY-MM-DD'
    this.endDate = null;   // 'YYYY-MM-DD'

    this.monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    this.dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    this.render();
  }

  setCar(carId) {
    this.carId = carId;
    this.startDate = null;
    this.endDate = null;
    this.render();
    if (this.onSelectionChange) {
      this.onSelectionChange(this.getCalculation());
    }
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.render();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.render();
  }

  formatDate(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  parseDate(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  handleDayClick(dateStr, isBooked, isPast) {
    if (this.mode === 'admin') {
      if (this.onAdminDateClick) {
        this.onAdminDateClick(dateStr, isBooked);
      }
      return;
    }

    // Mode réservation client
    if (isPast || isBooked) return;

    if (!this.startDate || (this.startDate && this.endDate)) {
      // Nouveau départ
      this.startDate = dateStr;
      this.endDate = null;
    } else if (this.startDate && !this.endDate) {
      if (dateStr < this.startDate) {
        this.startDate = dateStr;
      } else if (dateStr === this.startDate) {
        // 1 jour unique
        this.endDate = dateStr;
      } else {
        // Vérifier si une date réservée se trouve entre startDate et dateStr
        const s = this.parseDate(this.startDate);
        const e = this.parseDate(dateStr);
        let hasConflict = false;
        let curr = new Date(s);
        curr.setDate(curr.getDate() + 1);

        while (curr <= e) {
          const checkStr = this.formatDate(curr.getFullYear(), curr.getMonth(), curr.getDate());
          if (FleetStore.isDateBooked(this.carId, checkStr)) {
            hasConflict = true;
            break;
          }
          curr.setDate(curr.getDate() + 1);
        }

        if (hasConflict) {
          alert("Attention : Un ou plusieurs jours de cette plage sont déjà réservés. Veuillez choisir une autre période.");
          return;
        }

        this.endDate = dateStr;
      }
    }

    this.render();
    if (this.onSelectionChange) {
      this.onSelectionChange(this.getCalculation());
    }
  }

  getCalculation(youngDriver = false) {
    const car = FleetStore.getCarById(this.carId);
    if (!car) return null;

    if (!this.startDate) {
      return {
        car,
        daysCount: 0,
        startDate: null,
        endDate: null,
        totalPrice: 0,
        deposit: youngDriver ? car.prices.depositYoung : car.prices.deposit,
        kmTotal: 0,
        breakdownText: 'Sélectionnez vos dates sur le calendrier'
      };
    }

    const start = this.parseDate(this.startDate);
    const end = this.endDate ? this.parseDate(this.endDate) : start;
    
    // Calcul de la durée en jours (inclusif)
    const diffTime = Math.abs(end - start);
    const daysCount = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let totalPrice = 0;
    let breakdownText = '';

    // Détection des formules spéciales
    const startDay = start.getDay(); // 0 = Dim, 1 = Lun, 5 = Ven, etc.
    const endDay = end.getDay();

    if (daysCount === 1) {
      // 1 jour standard
      totalPrice = car.prices.dailyWeek;
      breakdownText = `1 journée (${totalPrice} €)`;
    } else if (daysCount === 5 && startDay === 1 && endDay === 5) {
      // Pack Lun-Ven
      totalPrice = car.prices.packWeek;
      breakdownText = `Formule Lundi à Vendredi (5j) : ${totalPrice} €`;
    } else if (daysCount === 3 && startDay === 5 && endDay === 0) {
      // Week-end standard Ven-Dim
      totalPrice = car.prices.weekend;
      breakdownText = `Formule Week-end (Ven-Dim) : ${totalPrice} €`;
    } else if (daysCount === 4 && startDay === 5 && endDay === 1) {
      // Week-end complet Ven-Lun
      totalPrice = car.prices.weekendFull;
      breakdownText = `Formule Week-end complet (Ven-Lun) : ${totalPrice} €`;
    } else {
      // Calcul proportionnel ajusté
      totalPrice = daysCount * car.prices.dailyWeek;
      breakdownText = `${daysCount} jours à ${car.prices.dailyWeek} €/j`;
    }

    const kmTotal = daysCount * (car.prices.kmPerDay || 250);
    const deposit = youngDriver ? car.prices.depositYoung : car.prices.deposit;

    return {
      car,
      daysCount,
      startDate: this.startDate,
      endDate: this.endDate || this.startDate,
      totalPrice,
      deposit,
      kmTotal,
      breakdownText
    };
  }

  render() {
    if (!this.container) return;

    const today = new Date();
    const todayStr = this.formatDate(today.getFullYear(), today.getMonth(), today.getDate());

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Ajustement jour de départ (Lundi = 0 dans notre grille)
    let startDayIndex = firstDay.getDay() - 1;
    if (startDayIndex === -1) startDayIndex = 6; // Dimanche devient 6

    const totalDays = lastDay.getDate();

    const car = FleetStore.getCarById(this.carId);
    const reservations = car ? (car.reservations || []) : [];

    let html = `
      <div class="lux-calendar-card select-none">
        <!-- Header Mois & Navigation -->
        <div class="flex items-center justify-between px-3 py-3 border-b border-zinc-800/80 bg-zinc-900/40 rounded-t-xl">
          <div class="flex items-center space-x-2">
            <span class="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
            <h4 class="text-sm font-semibold tracking-wider text-zinc-100 uppercase">
              ${this.monthNames[this.currentMonth]} <span class="text-red-500 font-mono">${this.currentYear}</span>
            </h4>
          </div>
          <div class="flex items-center space-x-1">
            <button type="button" class="cal-prev p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition" title="Mois précédent">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button type="button" class="cal-next p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition" title="Mois suivant">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <!-- Jours de la semaine -->
        <div class="grid grid-cols-7 gap-1 p-2 bg-zinc-950/60 text-center text-xs font-semibold text-zinc-400">
          ${this.dayNames.map(d => `<div class="py-1">${d}</div>`).join('')}
        </div>

        <!-- Grille des Jours -->
        <div class="grid grid-cols-7 gap-1 p-2 bg-zinc-900/20">
    `;

    // Cases vides précédant le premier jour
    for (let i = 0; i < startDayIndex; i++) {
      html += `<div class="h-9 md:h-10 rounded-lg opacity-10"></div>`;
    }

    // Jours du mois
    for (let day = 1; day <= totalDays; day++) {
      const dateStr = this.formatDate(this.currentYear, this.currentMonth, day);
      const isPast = dateStr < todayStr;
      const reservation = reservations.find(r => r.date === dateStr);
      const isBooked = !!reservation;

      let isSelected = false;
      let isStart = false;
      let isEnd = false;
      let inRange = false;

      if (this.startDate) {
        if (dateStr === this.startDate) {
          isStart = true;
          isSelected = true;
        }
        if (this.endDate && dateStr === this.endDate) {
          isEnd = true;
          isSelected = true;
        }
        if (this.startDate && this.endDate && dateStr > this.startDate && dateStr < this.endDate) {
          inRange = true;
        }
      }

      // Classes CSS selon le statut
      let dayClasses = "relative flex flex-col items-center justify-center h-9 md:h-10 text-xs font-medium rounded-lg transition duration-150 cursor-pointer ";
      let badgeHtml = "";

      if (isPast) {
        dayClasses += "text-zinc-600 bg-zinc-950/30 cursor-not-allowed opacity-40 ";
      } else if (isBooked) {
        dayClasses += "text-zinc-500 bg-red-950/20 border border-red-900/30 line-through cursor-not-allowed ";
        badgeHtml = `<span class="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_6px_#ef4444]" title="${reservation ? reservation.client : 'Réservé'}"></span>`;
      } else if (isStart || isEnd) {
        dayClasses += "text-white bg-red-600 font-bold shadow-[0_0_12px_rgba(239,68,68,0.7)] scale-105 z-10 ";
        badgeHtml = `<span class="absolute -top-1 -right-1 flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span></span>`;
      } else if (inRange) {
        dayClasses += "text-red-200 bg-red-950/40 border border-red-800/40 ";
      } else {
        dayClasses += "text-zinc-300 bg-zinc-800/40 hover:bg-zinc-700/80 hover:text-white border border-zinc-700/30 hover:border-red-500/50 ";
        badgeHtml = `<span class="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-500/70"></span>`;
      }

      // Mode Admin spécifique
      if (this.mode === 'admin') {
        if (isBooked) {
          dayClasses = "relative flex flex-col items-center justify-center h-9 md:h-10 text-xs font-bold rounded-lg bg-red-900/60 text-white border border-red-600 cursor-pointer hover:bg-red-800 transition ";
        } else {
          dayClasses = "relative flex flex-col items-center justify-center h-9 md:h-10 text-xs font-medium rounded-lg bg-zinc-800/60 text-zinc-200 border border-zinc-700 hover:border-emerald-500 cursor-pointer hover:bg-emerald-950/30 transition ";
        }
      }

      html += `
        <div class="${dayClasses}" data-date="${dateStr}" data-booked="${isBooked}" data-past="${isPast}">
          <span>${day}</span>
          ${badgeHtml}
        </div>
      `;
    }

    html += `
        </div>

        <!-- Légende épurée -->
        <div class="flex items-center justify-around px-3 py-2 bg-zinc-950/80 border-t border-zinc-800/60 text-[11px] text-zinc-400 rounded-b-xl">
          <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Disponible</span>
          </div>
          <div class="flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-red-600"></span>
            <span>Réservé</span>
          </div>
          <div class="flex items-center space-x-1.5">
            <span class="w-2.5 h-2.5 rounded-sm bg-red-600 border border-white"></span>
            <span>Sélection</span>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;

    // Événements boutons mois
    const prevBtn = this.container.querySelector('.cal-prev');
    const nextBtn = this.container.querySelector('.cal-next');

    if (prevBtn) prevBtn.addEventListener('click', () => this.prevMonth());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextMonth());

    // Événements clics sur les jours
    const dayElements = this.container.querySelectorAll('[data-date]');
    dayElements.forEach(el => {
      el.addEventListener('click', () => {
        const dateStr = el.getAttribute('data-date');
        const isBooked = el.getAttribute('data-booked') === 'true';
        const isPast = el.getAttribute('data-past') === 'true';
        this.handleDayClick(dateStr, isBooked, isPast);
      });
    });
  }
}

if (typeof window !== 'undefined') {
  window.DarkCalendar = DarkCalendar;
}
