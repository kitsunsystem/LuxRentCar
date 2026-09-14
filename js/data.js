/**
 * LuxRentCar - Données du catalogue, tarifs et réservations
 * Sauvegarde locale & synchronisation dynamique
 */

const DEFAULT_CARS_DATA = [
  {
    id: 'rs6',
    name: 'Audi RS6 Avant',
    subtitle: '4.0L V8 BiTurbo • 600 CH • Ligne Miltek Sport',
    badge: 'V8 BITURBO • LIGNE MILTEK',
    category: 'Super Break Prestige',
    power: '600 CH',
    acceleration: '3.6s (0-100)',
    topSpeed: '305 km/h',
    transmission: 'Tiptronic 8 • Quattro',
    sound: 'Ligne Sport Miltek Active',
    color: 'Noir Mythic Métallisé',
    description: "Le monstre d'Ingolstadt dans sa version la plus rageuse. Équipée d'une ligne Miltek sur mesure, cette RS6 combine le confort d'un palace roulant et la sonorité assourdissante d'un V8 BiTurbo déchaîné sur la Croisette ou l'autoroute de Monaco.",
    prices: {
      dailyWeek: 600,       // Semaine / jour
      packWeek: 1800,       // Lundi à Vendredi (5 jours)
      weekend: 1500,        // Week-end standard (Ven 18h - Dim 20h)
      weekendFull: 2000,    // Week-end complet (Ven 18h - Lun 10h)
      deposit: 12000,       // Caution standard
      depositYoung: 15000,  // Caution conducteur -25 ans
      kmPerDay: 250         // Kilométrage inclus par jour
    },
    images: [
      'assets/cars/rs6/1-front.jpg',
      'assets/cars/rs6/2-rear.jpg',
      'assets/cars/rs6/3-doorsill.jpg',
      'assets/cars/rs6/4-front-angle.jpg',
      'assets/cars/rs6/5-interior.jpg',
      'assets/cars/rs6/6-night-rear.jpg'
    ],
    features: [
      'Échappement sport Miltek déconnectable (sonorité dantesque)',
      'Pack Dynamique RS & Freins Haute Performance',
      'Bang & Olufsen 3D Advanced Sound System',
      'Toit panoramique ouvrant & Ciel de pavillon noir',
      'Pack Carbone extérieur & Jantes forgées 22"',
      'Livraison VIP offerte Cannes, Monaco, Nice, St Tropez'
    ],
    reservations: [
      { date: '2026-09-18', client: 'Réservé Monaco VIP', status: 'booked' },
      { date: '2026-09-19', client: 'Réservé Monaco VIP', status: 'booked' },
      { date: '2026-09-20', client: 'Réservé Monaco VIP', status: 'booked' },
      { date: '2026-09-26', client: 'Réservé Cannes Croisette', status: 'booked' },
      { date: '2026-09-27', client: 'Réservé Cannes Croisette', status: 'booked' }
    ]
  },
  {
    id: 'rs3',
    name: 'Audi RS3 Sportback (2025)',
    subtitle: '2.5L TFSI 5 Cylindres • 400 CH • Kyalami Green',
    badge: 'NOUVEAU MODÈLE 2025 • TEINTE UNIQUE',
    category: 'Sportive Compacte',
    power: '400 CH',
    acceleration: '3.8s (0-100)',
    topSpeed: '290 km/h',
    transmission: 'S-Tronic 7 • Quattro RS',
    sound: '5 Cylindres Typique Audi Sport',
    color: 'Vert Kyalami Exclusive',
    description: "Le tout dernier millésime 2025 de l'iconique RS3 dans sa teinte la plus exclusive : Vert Kyalami. Dotée du différentiel RS Torque Splitter avec mode drift, elle offre une agilité démoniaque sur les routes sinueuses de l'arrière-pays niçois et un son 5 cylindres inimitable.",
    prices: {
      dailyWeek: 400,       // Semaine / jour
      packWeek: 1200,       // Lundi à Vendredi
      weekend: 900,         // Week-end standard
      weekendFull: 1200,    // Week-end complet
      deposit: 7000,        // Caution standard
      depositYoung: 8000,   // Caution -25 ans
      kmPerDay: 250         // Kilométrage inclus
    },
    images: [
      'assets/cars/rs3/1-front.jpg',
      'assets/cars/rs3/2-rear.jpg',
      'assets/cars/rs3/3-cockpit.jpg',
      'assets/cars/rs3/4-seats.jpg',
      'assets/cars/rs3/5-profile.jpg',
      'assets/cars/rs3/6-detail.jpg'
    ],
    features: [
      'Dernière génération restylée 2025',
      'RS Torque Splitter avec mode Drift & RS Performance',
      'Sièges sport RS Nappa avec surpiqûres contrastées Vertes',
      'Échappement sport RS avec clapets actifs dynamiques',
      'Phares Matrix LED numériques avec signature damier RS',
      'Livraison immédiate partout dans le 06'
    ],
    reservations: [
      { date: '2026-09-15', client: 'Réservé Nice Centre', status: 'booked' },
      { date: '2026-09-16', client: 'Réservé Nice Centre', status: 'booked' },
      { date: '2026-09-22', client: 'Réservé St Tropez', status: 'booked' }
    ]
  },
  {
    id: 'golf8r',
    name: 'Volkswagen Golf 8 R-Performance',
    subtitle: '2.0L TSI 4Motion • 320 CH • Pack R-Performance',
    badge: 'PACK R-PERFORMANCE • DRIFT MODE',
    category: 'Compacte Ultra Sport',
    power: '320 CH',
    acceleration: '4.7s (0-100)',
    topSpeed: '270 km/h',
    transmission: 'DSG 7 • 4Motion R-Performance',
    sound: 'Ligne Sport R avec Pop & Bang',
    color: 'Blanc Pur & Pack Black Style',
    description: "L'arme absolue du quotidien revisitée par la division R de Volkswagen. Dotée du Pack R-Performance exclusif, de modes de conduite Drift et Special Nürburgring, c'est le bolide polyvalent parfait pour arpenter la Riviera avec style et efficacité.",
    prices: {
      dailyWeek: 250,       // Semaine / jour
      packWeek: 800,        // Lundi à Vendredi
      weekend: 600,         // Week-end standard
      weekendFull: 700,     // Week-end complet
      deposit: 5000,        // Caution standard
      depositYoung: 6000,   // Caution -25 ans
      kmPerDay: 250         // Kilométrage inclus
    },
    images: [
      'assets/cars/golf8r/1-front.jpg',
      'assets/cars/golf8r/2-rear.jpg',
      'assets/cars/golf8r/3-wheels.jpg',
      'assets/cars/golf8r/4-cockpit.jpg',
      'assets/cars/golf8r/5-profile.jpg',
      'assets/cars/golf8r/6-front-light.jpg'
    ],
    features: [
      'Pack R-Performance (V-max 270 km/h, modes Drift et Special)',
      'Aileron arrière surélevé Motorsport & Diffuseur sport R',
      'Volant sport tactile avec bouton R bleu d\'accès direct',
      'Éclairage d\'ambiance intérieur 30 teintes dynamiques',
      'Système audio Harman Kardon Surround 480W',
      'Mise à disposition 7j/7 aéroport ou villa'
    ],
    reservations: [
      { date: '2026-09-17', client: 'Réservé Antibes', status: 'booked' },
      { date: '2026-09-18', client: 'Réservé Antibes', status: 'booked' }
    ]
  }
];

const CONTACT_INFO = {
  phone: '07 69 01 67 03',
  phoneFormatted: '+33 7 69 01 67 03',
  phoneRaw: '33769016703',
  snapchat: 'luxrentcar',
  snapchatUrl: 'https://www.snapchat.com/add/luxrentcar',
  instagram: 'luxrentcar06',
  instagramUrl: 'https://www.instagram.com/luxrentcar06/',
  locations: 'Nice • Cannes • Monaco • Saint-Tropez & tout le 06',
  coverageText: 'Livraison VIP dans tout le département des Alpes-Maritimes (06) & Principauté de Monaco',
  spots: [
    'Aéroport Nice Côte d\'Azur (Terminal 1 & 2)',
    'Monaco Port Hercule / Place du Casino',
    'Cannes Boulevard de la Croisette',
    'Nice Promenade des Anglais / Centre-ville',
    'Saint-Tropez & Presqu\'île',
    'Cap d\'Antibes / Juan-les-Pins',
    'Livraison privée en Villa ou Hôtel de prestige'
  ]
};

// Gestionnaire du LocalStorage pour l'administration en direct
const STORAGE_KEY = 'luxrentcar_fleet_v1';

class FleetStore {
  static getCars() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erreur lecture LocalStorage:', e);
    }
    this.saveCars(DEFAULT_CARS_DATA);
    return DEFAULT_CARS_DATA;
  }

  static getCarById(id) {
    const cars = this.getCars();
    return cars.find(c => c.id === id) || null;
  }

  static saveCars(cars) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
    } catch (e) {
      console.error('Erreur sauvegarde LocalStorage:', e);
    }
  }

  static updateCar(id, updatedFields) {
    const cars = this.getCars();
    const index = cars.findIndex(c => c.id === id);
    if (index !== -1) {
      cars[index] = { ...cars[index], ...updatedFields };
      this.saveCars(cars);
      return cars[index];
    }
    return null;
  }

  static toggleDateReservation(carId, dateStr, clientName = 'Réservé Client VIP') {
    const cars = this.getCars();
    const car = cars.find(c => c.id === carId);
    if (!car) return false;

    if (!car.reservations) car.reservations = [];
    const existingIndex = car.reservations.findIndex(r => r.date === dateStr);

    if (existingIndex !== -1) {
      // Annule la réservation
      car.reservations.splice(existingIndex, 1);
    } else {
      // Ajoute la réservation
      car.reservations.push({
        date: dateStr,
        client: clientName,
        status: 'booked'
      });
    }

    this.saveCars(cars);
    return true;
  }

  static isDateBooked(carId, dateStr) {
    const car = this.getCarById(carId);
    if (!car || !car.reservations) return false;
    return car.reservations.some(r => r.date === dateStr);
  }

  static resetToDefault() {
    localStorage.removeItem(STORAGE_KEY);
    this.saveCars(DEFAULT_CARS_DATA);
    return DEFAULT_CARS_DATA;
  }
}

// Expose globalement
if (typeof window !== 'undefined') {
  window.DEFAULT_CARS_DATA = DEFAULT_CARS_DATA;
  window.CONTACT_INFO = CONTACT_INFO;
  window.FleetStore = FleetStore;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_CARS_DATA, CONTACT_INFO, FleetStore };
}
