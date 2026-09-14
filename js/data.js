/**
 * LuxRentCar - Données du catalogue, tarifs et réservations
 * Sauvegarde locale & synchronisation dynamique
 */

const DEFAULT_CARS_DATA = [
  {
    "id": "rs6",
    "name": "Audi RS6 Avant",
    "subtitle": "4.0L V8 BiTurbo • 600 CH • Ligne Miltek Sport",
    "badge": "V8 BITURBO • LIGNE MILTEK",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "600 CH",
    "acceleration": "3.6s (0-100)",
    "topSpeed": "305 km/h",
    "transmission": "Tiptronic 8 • Quattro",
    "sound": "Ligne Sport Miltek Active",
    "color": "Noir Mythic Métallisé",
    "description": "Le monstre d'Ingolstadt dans sa version la plus rageuse. Équipée d'une ligne Miltek sur mesure, cette RS6 combine le confort d'un palace roulant et la sonorité assourdissante d'un V8 BiTurbo déchaîné sur la Croisette ou l'autoroute de Monaco.",
    "prices": {
      "dailyWeek": 600,
      "packWeek": 1800,
      "weekend": 1500,
      "weekendFull": 2000,
      "deposit": 12000,
      "depositYoung": 15000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/rs6/1-front.jpg",
      "assets/cars/rs6/2-rear.jpg",
      "assets/cars/rs6/3-doorsill.jpg",
      "assets/cars/rs6/4-front-angle.jpg",
      "assets/cars/rs6/5-interior.jpg",
      "assets/cars/rs6/6-night-rear.jpg"
    ],
    "features": [
      "Échappement sport Miltek déconnectable (sonorité dantesque)",
      "Pack Dynamique RS & Freins Haute Performance",
      "Bang & Olufsen 3D Advanced Sound System",
      "Toit panoramique ouvrant & Ciel de pavillon noir",
      "Pack Carbone extérieur & Jantes forgées 22\"",
      "Livraison VIP offerte Cannes, Monaco, Nice, St Tropez"
    ],
    "reservations": [
      {
        "date": "2026-09-18",
        "client": "Réservé Monaco VIP",
        "status": "booked"
      },
      {
        "date": "2026-09-19",
        "client": "Réservé Monaco VIP",
        "status": "booked"
      },
      {
        "date": "2026-09-20",
        "client": "Réservé Monaco VIP",
        "status": "booked"
      },
      {
        "date": "2026-09-26",
        "client": "Réservé Cannes Croisette",
        "status": "booked"
      },
      {
        "date": "2026-09-27",
        "client": "Réservé Cannes Croisette",
        "status": "booked"
      }
    ]
  },
  {
    "id": "rs3",
    "name": "Audi RS3 Sportback (2025)",
    "subtitle": "2.5L TFSI 5 Cylindres • 400 CH • Vert Kyalami",
    "badge": "NOUVEAU MODÈLE 2025 • VERT KYALAMI",
    "category": "compactes",
    "categoryName": "Compactes & GT",
    "power": "400 CH",
    "acceleration": "3.8s (0-100)",
    "topSpeed": "290 km/h",
    "transmission": "S-Tronic 7 • Quattro RS",
    "sound": "5 Cylindres Typique Audi Sport",
    "color": "Vert Kyalami Exclusive",
    "description": "Le tout dernier millésime 2025 de l'iconique RS3 dans sa teinte la plus exclusive : Vert Kyalami. Dotée du différentiel RS Torque Splitter avec mode drift, elle offre une agilité démoniaque sur les routes sinueuses de l'arrière-pays niçois et un son 5 cylindres inimitable.",
    "prices": {
      "dailyWeek": 400,
      "packWeek": 1200,
      "weekend": 900,
      "weekendFull": 1200,
      "deposit": 7000,
      "depositYoung": 8000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/rs3/1-front.jpg",
      "assets/cars/rs3/2-rear.jpg",
      "assets/cars/rs3/3-cockpit.jpg",
      "assets/cars/rs3/4-seats.jpg",
      "assets/cars/rs3/5-profile.jpg",
      "assets/cars/rs3/6-detail.jpg"
    ],
    "features": [
      "Dernière génération restylée 2025",
      "RS Torque Splitter avec mode Drift & RS Performance",
      "Sièges sport RS Nappa avec surpiqûres contrastées Vertes",
      "Échappement sport RS avec clapets actifs dynamiques",
      "Phares Matrix LED numériques avec signature damier RS",
      "Livraison immédiate partout dans le 06"
    ],
    "reservations": [
      {
        "date": "2026-09-15",
        "client": "Réservé Nice Centre",
        "status": "booked"
      },
      {
        "date": "2026-09-16",
        "client": "Réservé Nice Centre",
        "status": "booked"
      },
      {
        "date": "2026-09-22",
        "client": "Réservé St Tropez",
        "status": "booked"
      }
    ]
  },
  {
    "id": "golf8r",
    "name": "Volkswagen Golf 8 R-Performance",
    "subtitle": "2.0L TSI 4Motion • 320 CH • Pack R-Performance",
    "badge": "PACK R-PERFORMANCE • DRIFT MODE",
    "category": "compactes",
    "categoryName": "Compactes & GT",
    "power": "320 CH",
    "acceleration": "4.7s (0-100)",
    "topSpeed": "270 km/h",
    "transmission": "DSG 7 • 4Motion R-Performance",
    "sound": "Ligne Sport R avec Pop & Bang",
    "color": "Blanc Pur & Pack Black Style",
    "description": "L'arme absolue du quotidien revisitée par la division R de Volkswagen. Dotée du Pack R-Performance exclusif, de modes de conduite Drift et Special Nürburgring, c'est le bolide polyvalent parfait pour arpenter la Riviera avec style et efficacité.",
    "prices": {
      "dailyWeek": 250,
      "packWeek": 800,
      "weekend": 600,
      "weekendFull": 700,
      "deposit": 5000,
      "depositYoung": 6000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/golf8r/1-front.jpg",
      "assets/cars/golf8r/2-rear.jpg",
      "assets/cars/golf8r/3-wheels.jpg",
      "assets/cars/golf8r/4-cockpit.jpg",
      "assets/cars/golf8r/5-profile.jpg",
      "assets/cars/golf8r/6-front-light.jpg"
    ],
    "features": [
      "Pack R-Performance (V-max 270 km/h, modes Drift et Special)",
      "Aileron arrière surélevé Motorsport & Diffuseur sport R",
      "Volant sport tactile avec bouton R bleu d'accès direct",
      "Éclairage d'ambiance intérieur 30 teintes dynamiques",
      "Système audio Harman Kardon Surround 480W",
      "Mise à disposition 7j/7 aéroport ou villa"
    ],
    "reservations": [
      {
        "date": "2026-09-17",
        "client": "Réservé Antibes",
        "status": "booked"
      },
      {
        "date": "2026-09-18",
        "client": "Réservé Antibes",
        "status": "booked"
      }
    ]
  },
  {
    "id": "ferrari-sf90",
    "name": "Ferrari SF90 Spyder",
    "subtitle": "4.0L V8 BiTurbo PHEV • 1 000 CH • Hypercar Hybride",
    "badge": "1 000 CH • HYPERCAR SPYDER",
    "category": "supercars",
    "categoryName": "Supercars & V12",
    "power": "1 000 CH",
    "acceleration": "2.5s (0-100)",
    "topSpeed": "340 km/h",
    "transmission": "F1 Double Embrayage 8 rapports",
    "sound": "V8 Hybride Déchaîné Maranello",
    "color": "Nero Daytona & Étriers Jaunes Giallo",
    "description": "Le summum absolu de la technologie Maranello. Avec ses 1 000 chevaux combinés issus de son V8 BiTurbo et de ses 3 moteurs électriques, la SF90 Spyder pulvérise le 0 à 100 en 2.5s tout en offrant le plaisir de rouler cheveux au vent sur le bord de mer de Monaco.",
    "prices": {
      "dailyWeek": 2400,
      "packWeek": 7500,
      "weekend": 5800,
      "weekendFull": 7000,
      "deposit": 25000,
      "depositYoung": 30000,
      "kmPerDay": 150
    },
    "images": [
      "assets/cars/others/ferrari-sf90.jpg"
    ],
    "features": [
      "Puissance phénoménale de 1 000 CH (V8 BiTurbo + 3 moteurs électriques)",
      "Toit rigide escamotable ultra-rapide en 14 secondes",
      "Freins Carbone-Céramique Brembo dernière génération",
      "Cockpit F1 tout numérique avec volant tactile eManettino",
      "Étriers de freins jaunes Giallo Modena & Jantes forgées",
      "Livraison VIP sur plateau fermé possible"
    ],
    "reservations": []
  },
  {
    "id": "ferrari-purosangue",
    "name": "Ferrari Purosangue",
    "subtitle": "6.5L V12 Atmosphérique • 725 CH • Le Premier SUV Maranello",
    "badge": "V12 ATMOSPHÉRIQUE • 725 CH",
    "category": "supercars",
    "categoryName": "Supercars & V12",
    "power": "725 CH",
    "acceleration": "3.3s (0-100)",
    "topSpeed": "310 km/h",
    "transmission": "F1 Double Embrayage 8 rapports",
    "sound": "V12 Atmosphérique Mythique",
    "color": "Nero Daytona Métallisé",
    "description": "Un pur chef-d'œuvre mécanique : le premier 4 portes 4 places de Ferrari animé par le mythique V12 atmosphérique de 725 chevaux. Portes antagonistes motorisées, sonorité d'opéra italien et raffinement extrême pour votre séjour sur la Côte d'Azur.",
    "prices": {
      "dailyWeek": 2800,
      "packWeek": 7900,
      "weekend": 5800,
      "weekendFull": 8400,
      "deposit": 25000,
      "depositYoung": 30000,
      "kmPerDay": 200
    },
    "images": [
      "assets/cars/others/ferrari-purosangue.jpg"
    ],
    "features": [
      "Moteur V12 6.5L atmosphérique (725 CH à 7 750 tr/min)",
      "Portes arrière antagonistes « Welcome Doors » motorisées",
      "Suspension active révolutionnaire Ferrari FAST",
      "4 véritables sièges baquets grand confort massants et ventilés",
      "Transmission intégrale 4RM-S EVO avec 4 roues directrices",
      "Service conciergerie VIP dédié"
    ],
    "reservations": []
  },
  {
    "id": "lamborghini-urus",
    "name": "Lamborghini Urus",
    "subtitle": "4.0L V8 BiTurbo • 650 CH • Super SUV Sant'Agata",
    "badge": "SUPER SUV • 650 CH • V8 BITURBO",
    "category": "supercars",
    "categoryName": "Supercars & V12",
    "power": "650 CH",
    "acceleration": "3.6s (0-100)",
    "topSpeed": "305 km/h",
    "transmission": "Automatique 8 rapports • Transmission 4x4",
    "sound": "V8 BiTurbo Échappement Sport Lamborghini",
    "color": "Nero Noctis & Finition Carbone",
    "description": "Le Super SUV italien par excellence. L'Urus réunit l'ADN extrême de Lamborghini et la polyvalence absolue d'un SUV de grand luxe. Parfait pour vos transferts aéroport avec bagages sans sacrifier la prestance d'une supercar.",
    "prices": {
      "dailyWeek": 1500,
      "packWeek": 4400,
      "weekend": 3000,
      "weekendFull": 4000,
      "deposit": 15000,
      "depositYoung": 25000,
      "kmPerDay": 150
    },
    "images": [
      "assets/cars/others/lamborghini-urus.jpg"
    ],
    "features": [
      "Moteur V8 BiTurbo 650 chevaux Lamborghini",
      "Sélecteur de modes ANIMA (Strada, Sport, Corsa, Neve)",
      "Jantes 23 pouces forgées Taigete diamantées",
      "Intérieur cuir bicolore avec surpiqûres sport",
      "Système audio Bang & Olufsen 3D Sound",
      "Mise à disposition VIP dans tout le 06"
    ],
    "reservations": []
  },
  {
    "id": "rolls-royce-ghost",
    "name": "Rolls-Royce Ghost",
    "subtitle": "6.75L V12 BiTurbo • 571 CH • Prestige & Chauffeur VIP",
    "badge": "PRESTIGE ABSOLU • V12 BITURBO",
    "category": "supercars",
    "categoryName": "Supercars & V12",
    "power": "571 CH",
    "acceleration": "4.8s (0-100)",
    "topSpeed": "250 km/h",
    "transmission": "ZF 8 rapports guidée par satellite",
    "sound": "Silence Olympien & V12 Velouté",
    "color": "Blanc Pur & Capot Noir Satiné Bicolore",
    "description": "L'incarnation suprême du luxe automobile mondial. La Rolls-Royce Ghost flotte littéralement sur la chaussée grâce à sa suspension Planar. Disponible en conduite libre ou avec service de chauffeur de maître sur devis.",
    "prices": {
      "dailyWeek": 1800,
      "packWeek": 5000,
      "weekend": 4000,
      "weekendFull": 5000,
      "deposit": 15000,
      "depositYoung": 20000,
      "kmPerDay": 200
    },
    "images": [
      "assets/cars/others/rolls-royce-ghost.jpg"
    ],
    "features": [
      "Moteur V12 6.75 litres bi-turbo d'une douceur inégalée",
      "Ciel étoilé Shooting Star Starlight Headliner",
      "Portes antagonistes électriques avec fermeture automatique",
      "Option chauffeur de maître bilingue sur devis",
      "Bespoke Audio System haute fidélité",
      "Accueil VIP champagne et service d'exception"
    ],
    "reservations": []
  },
  {
    "id": "porsche-911",
    "name": "Porsche 911 Carrera (Stage 2)",
    "subtitle": "3.0L Flat-6 BiTurbo • Stage 2 600 CH • Noir Satiné",
    "badge": "STAGE 2 • 600 CH • FLAT-6",
    "category": "supercars",
    "categoryName": "Supercars & V12",
    "power": "600 CH",
    "acceleration": "3.0s (0-100)",
    "topSpeed": "325 km/h",
    "transmission": "PDK 8 rapports ultra-rapide",
    "sound": "Flat-6 Préparé avec Clapets Actifs",
    "color": "Noir Satiné Deep Matte",
    "description": "L'iconique 911 poussée dans ses derniers retranchements avec une préparation Stage 2 développant 600 chevaux réels. Précision chirurgicale du train avant, motricité légendaire et accélérations fulgurantes.",
    "prices": {
      "dailyWeek": 600,
      "packWeek": 1700,
      "weekend": 1400,
      "weekendFull": 1900,
      "deposit": 8000,
      "depositYoung": 10000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/porsche-911.jpg"
    ],
    "features": [
      "Préparation Stage 2 certifiée 600 chevaux réels",
      "Boîte PDK 8 rapports à double embrayage ultra-rapide",
      "Pack Sport Chrono avec Launch Control",
      "Échappement sport actif à clapets sur mesure",
      "Teinte exclusive Noir Satiné Mat",
      "Phares Matrix LED PDLS Plus"
    ],
    "reservations": []
  },
  {
    "id": "mercedes-g63",
    "name": "Mercedes-AMG Classe G 63",
    "subtitle": "4.0L V8 BiTurbo AMG • 585 CH • L'Icône de la Côte d'Azur",
    "badge": "V8 BITURBO AMG • ÉCHAPPEMENT LATÉRAL",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "585 CH",
    "acceleration": "4.5s (0-100)",
    "topSpeed": "240 km/h",
    "transmission": "AMG SPEEDSHIFT TCT 9G",
    "sound": "V8 AMG Échappements Latéraux Sidepipes",
    "color": "Noir Obsidienne Métallisé & Pack Nuit AMG",
    "description": "Le roi incontesté de Monaco et de la Croisette. Le G63 AMG offre une présence scénique incomparable avec ses légendaires sorties d'échappement latérales crépitant à chaque accélération.",
    "prices": {
      "dailyWeek": 900,
      "packWeek": 2600,
      "weekend": 2300,
      "weekendFull": 3000,
      "deposit": 10000,
      "depositYoung": 15000,
      "kmPerDay": 150
    },
    "images": [
      "assets/cars/others/mercedes-g63.jpg"
    ],
    "features": [
      "Moteur V8 BiTurbo 4.0L 585 chevaux assemblé à la main",
      "Double sortie d'échappement latérale chromée sous les marchepieds",
      "Pack Nuit AMG avec vitres teintées et optiques assombries",
      "Intérieur cuir Nappa étendu Designo avec sièges dynamiques massants",
      "Système audio Burmester Surround Sound",
      "Livraison VIP offerte Cannes, Monaco, Nice"
    ],
    "reservations": []
  },
  {
    "id": "bmw-m8",
    "name": "BMW M8 Competition (2025)",
    "subtitle": "4.4L V8 M TwinPower • 625 CH • Teinte Bronze Métallisée",
    "badge": "MILLÉSIME 2025 • 625 CH • V8 M POWER",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "625 CH",
    "acceleration": "3.2s (0-100)",
    "topSpeed": "305 km/h",
    "transmission": "M Steptronic 8 rapports • M xDrive",
    "sound": "V8 M Sport avec Clapets Déconnectables",
    "color": "Bronze Caramel Métallisé & Toit Carbone",
    "description": "Le vaisseau amiral de la branche Motorsport. Avec sa configuration unique couleur bronze et son V8 de 625 chevaux, la M8 Competition allie l'élégance d'un grand coupé et les performances d'une bête de circuit.",
    "prices": {
      "dailyWeek": 700,
      "packWeek": 1950,
      "weekend": 1700,
      "weekendFull": 2100,
      "deposit": 10000,
      "depositYoung": 15000,
      "kmPerDay": 200
    },
    "images": [
      "assets/cars/others/bmw-m8.jpg"
    ],
    "features": [
      "Dernier millésime 2025 625 chevaux",
      "Transmission intégrale M xDrive commutable en pure propulsion (2WD)",
      "Toit en fibre de carbone apparent ultra-léger",
      "Sièges baquets M Carbone ventilés et chauffants",
      "Freins M Carbone-Céramique étriers or",
      "Système audio Bowers & Wilkins Diamond Surround"
    ],
    "reservations": []
  },
  {
    "id": "bmw-x6m",
    "name": "BMW X6M Competition",
    "subtitle": "4.4L V8 M TwinPower • 625 CH • Brooklyn Grey",
    "badge": "V8 M POWER • 625 CH • COUPE SUV",
    "category": "suv",
    "categoryName": "SUV & Aventure",
    "power": "625 CH",
    "acceleration": "3.8s (0-100)",
    "topSpeed": "290 km/h",
    "transmission": "M Steptronic 8 rapports • M xDrive",
    "sound": "V8 M Sport Rémunérateur",
    "color": "Brooklyn Grey & Intérieur Cuir Rouge",
    "description": "Le SUV Coupé hautes performances par excellence. Le X6M Competition domine la route par son gabarit musclé, sa calandre illuminée Iconic Glow et son V8 M TwinPower catapultant.",
    "prices": {
      "dailyWeek": 700,
      "packWeek": 2400,
      "weekend": 1600,
      "weekendFull": 2200,
      "deposit": 10000,
      "depositYoung": 15000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/bmw-x6m.jpg"
    ],
    "features": [
      "Moteur V8 4.4L BiTurbo 625 CH",
      "Calandre avant BMW Iconic Glow illuminée",
      "Pack Carbone M et aileron de malle arrière sport",
      "Intérieur tout cuir Merino étendu bicolore",
      "Éclairage Laser BMW à portée 500m",
      "Grand coffre pour tous vos bagages"
    ],
    "reservations": []
  },
  {
    "id": "bmw-m5",
    "name": "BMW M5 (2026)",
    "subtitle": "4.4L V8 M Hybrid • 727 CH • La Berline Ultime G90",
    "badge": "NOUVEAU MODÈLE 2026 • 727 CH",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "727 CH",
    "acceleration": "3.5s (0-100)",
    "topSpeed": "305 km/h",
    "transmission": "M Steptronic 8 rapports • M xDrive Hybrid",
    "sound": "V8 Hybride M Sport",
    "color": "Noir Saphir Métallisé",
    "description": "La toute nouvelle BMW M5 génération 2026 inaugure l'hybridation M avec 727 chevaux combinés et plus de 1 000 Nm de couple. Le summum de la berline sportive ultra-technologique.",
    "prices": {
      "dailyWeek": 700,
      "packWeek": 1900,
      "weekend": 1500,
      "weekendFull": 2100,
      "deposit": 12000,
      "depositYoung": 15000,
      "kmPerDay": 200
    },
    "images": [
      "assets/cars/others/bmw-m5.jpg"
    ],
    "features": [
      "Génération 2026 inédite développant 727 chevaux",
      "Motorisation M Hybrid rechargeable avec mode 100% électrique",
      "BMW Curved Display panoramique avec OS 8.5",
      "Roues arrière directrices Active Steering de série",
      "Système audio Harman Kardon Surround",
      "Mise à disposition immédiate"
    ],
    "reservations": []
  },
  {
    "id": "bmw-m4",
    "name": "BMW M4 Competition Cabriolet",
    "subtitle": "3.0L 6 Cylindres M TwinPower • 510 CH • Cuir Orange",
    "badge": "CABRIOLET SPORT • CUIR ORANGE",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "510 CH",
    "acceleration": "3.7s (0-100)",
    "topSpeed": "290 km/h",
    "transmission": "M Steptronic 8 rapports • M xDrive",
    "sound": "Ligne M Sport Décapotée",
    "color": "Noir Saphir & Cuir Orange Hermès",
    "description": "Profitez du soleil de la Côte d'Azur décapoté dans ce cabriolet d'élite. 510 chevaux sous le capot, intérieur cuir étendu orange flamboyant et sonorité métallique enivrante à chaque passage de rapport.",
    "prices": {
      "dailyWeek": 600,
      "packWeek": 1900,
      "weekend": 1400,
      "weekendFull": 2000,
      "deposit": 8000,
      "depositYoung": 10000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/bmw-m4.jpg"
    ],
    "features": [
      "Capote souple noire insonorisée repliable en roulant jusqu'à 50 km/h",
      "Chauffe-nuque intégré dans les appuie-têtes avant",
      "Transmission M xDrive 4RM / 2RM propulsion pure",
      "Pack extérieur Shadow Line brillant étendu",
      "Jantes forgées style 826M bicolores",
      "Livraison express Monaco / Cannes"
    ],
    "reservations": []
  },
  {
    "id": "bmw-m3",
    "name": "BMW M3 Competition",
    "subtitle": "3.0L BiTurbo M TwinPower • 510 CH • Noir Profond",
    "badge": "BERLINE ULTRA SPORT • 510 CH",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "510 CH",
    "acceleration": "3.9s (0-100)",
    "topSpeed": "290 km/h",
    "transmission": "M Steptronic 8 rapports • M xDrive",
    "sound": "6 Cylindres en Ligne M TwinPower",
    "color": "Noir Saphir Métallisé",
    "description": "L'étalon des berlines ultra-sportives. Précision de pilotage légendaire, calandre béante et châssis affûté pour avaler les virages du col de Turini ou parader devant le Casino de Monte-Carlo.",
    "prices": {
      "dailyWeek": 500,
      "packWeek": 1400,
      "weekend": 1200,
      "weekendFull": 1500,
      "deposit": 8000,
      "depositYoung": 10000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/bmw-m3.jpg"
    ],
    "features": [
      "Moteur 6 cylindres en ligne S58 BiTurbo 510 chevaux",
      "Différentiel actif M Sport à glissement limité",
      "Toit en fibre de carbone apparent",
      "Sièges sport M avec logo M3 illuminé",
      "Écran incurvé BMW Live Cockpit Navigation Pro",
      "Livraison 7j/7 aéroport de Nice"
    ],
    "reservations": []
  },
  {
    "id": "ferrari-gtc4",
    "name": "Ferrari GTC4 Lusso T",
    "subtitle": "3.9L V8 BiTurbo • 610 CH • 4 Vraies Places GT Maranello",
    "badge": "V8 BITURBO • 4 PLACES MARANELLO",
    "category": "supercars",
    "categoryName": "Supercars & V12",
    "power": "610 CH",
    "acceleration": "3.5s (0-100)",
    "topSpeed": "320 km/h",
    "transmission": "F1 Double Embrayage 7 rapports",
    "sound": "V8 BiTurbo Ferrari Envoûtant",
    "color": "Grigio Silverstone & Cuir Camel",
    "description": "Partager les sensations inouïes d'une Ferrari à 4 personnes dans un confort somptueux. Son V8 BiTurbo offre des reprises foudroyantes et un espace généreux pour vos week-ends à Saint-Tropez.",
    "prices": {
      "dailyWeek": 1200,
      "packWeek": 3600,
      "weekend": 2600,
      "weekendFull": 3100,
      "deposit": 20000,
      "depositYoung": 25000,
      "kmPerDay": 200
    },
    "images": [
      "assets/cars/others/ferrari-gtc4.jpg"
    ],
    "features": [
      "V8 BiTurbo 3.9L délivrant 610 chevaux et 760 Nm",
      "4 vraies places individuelles avec grand coffre",
      "Écran tactile passager dédié Passenger Display",
      "Système à 4 roues directrices 4WS ultra-agile",
      "Sellerie cuir pleine fleur confectionnée main",
      "Livraison VIP sur mesure"
    ],
    "reservations": []
  },
  {
    "id": "mercedes-gls",
    "name": "Mercedes-Benz GLS",
    "subtitle": "V6 BiTurbo • 330 CH • 7 Vraies Places VIP Première Classe",
    "badge": "7 PLACES VIP • PRESTIGE FAMILIAL",
    "category": "suv",
    "categoryName": "SUV & Aventure",
    "power": "330 CH",
    "acceleration": "6.3s (0-100)",
    "topSpeed": "240 km/h",
    "transmission": "9G-Tronic • 4Matic",
    "sound": "Insonorisation Double Vitrage Acoustique",
    "color": "Noir Obsidienne & Chrome",
    "description": "La Classe S des SUV. Le Mercedes GLS offre 7 véritables places de première classe avec écrans arrières et sellerie cuir Nappa moelleuse. Le choix privilégié des familles et délégations VIP à Cannes et Monaco.",
    "prices": {
      "dailyWeek": 400,
      "packWeek": 1400,
      "weekend": 1000,
      "weekendFull": 1400,
      "deposit": 8000,
      "depositYoung": 10000,
      "kmPerDay": 200
    },
    "images": [
      "assets/cars/others/mercedes-gls.jpg"
    ],
    "features": [
      "7 véritables places adultes avec rabattement électrique des sièges",
      "Suspension pneumatique AIRMATIC grand confort",
      "Toit panoramique double vitrage vitré",
      "Écrans tactiles arrières et tablettes de travail",
      "Portes à fermeture assistée Soft-Close",
      "Idéal avec chauffeur ou pour séjour en famille"
    ],
    "reservations": []
  },
  {
    "id": "mercedes-a45s",
    "name": "Mercedes-AMG A45-S (2026)",
    "subtitle": "2.0L Turbo 421 CH • 4Matic+ Drift Mode • Pack Aéro",
    "badge": "MODÈLE 2026 • 421 CH • AMG",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "421 CH",
    "acceleration": "3.9s (0-100)",
    "topSpeed": "270 km/h",
    "transmission": "AMG SPEEDSHIFT DCT 8G • 4Matic+",
    "sound": "Ligne AMG Performance Déconnectable",
    "color": "Noir Cosmos Métallisé & Pack Aéro AMG",
    "description": "Le 4 cylindres de série le plus puissant au monde : 421 chevaux sous le capot d'une berline compacte agressive. Dotée du mode Drift AMG et d'un aileron arrière imposant, elle offre des sensations brutes incomparables.",
    "prices": {
      "dailyWeek": 400,
      "packWeek": 1000,
      "weekend": 900,
      "weekendFull": 1100,
      "deposit": 7000,
      "depositYoung": 8000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/mercedes-a45s.jpg"
    ],
    "features": [
      "Moteur M139 2.0L Turbo développant 421 chevaux",
      "Transmission AMG Torque Control avec Drift Mode",
      "Pack Aérodynamique AMG avec ailettes et grand aileron",
      "Sièges Performance AMG enveloppants à réglages électriques",
      "Volant Performance AMG avec boutons rotatifs OLED",
      "Livraison rapide sur la Côte d'Azur"
    ],
    "reservations": []
  },
  {
    "id": "mercedes-cla45s",
    "name": "Mercedes-AMG CLA 45 S (Edition One)",
    "subtitle": "2.0L Turbo AMG 421 CH • Série Limitée Edition One",
    "badge": "EDITION ONE • 421 CH • RACING",
    "category": "sport",
    "categoryName": "Sportives M & AMG",
    "power": "421 CH",
    "acceleration": "4.0s (0-100)",
    "topSpeed": "270 km/h",
    "transmission": "AMG SPEEDSHIFT DCT 8G",
    "sound": "Échappement AMG Performance Sport",
    "color": "Blanc Polaire avec Stripping Noir Edition One",
    "description": "Une série limitée ultra-exclusive : la CLA 45 S Edition One arbore des stickers latéraux racing, un habitacle bardé de surpiqûres jaune fluo et un tempérament de feu pour séduire les puristes.",
    "prices": {
      "dailyWeek": 350,
      "packWeek": 950,
      "weekend": 800,
      "weekendFull": 900,
      "deposit": 6000,
      "depositYoung": 7000,
      "kmPerDay": 200
    },
    "images": [
      "assets/cars/others/mercedes-cla45s.jpg"
    ],
    "features": [
      "Série spéciale Edition One avec stripping extérieur complet",
      "421 chevaux et 500 Nm de couple",
      "Ligne de toit de coupé 4 portes profilé sans encadrement de vitres",
      "Sièges baquets AMG bicolores avec surpiqûres contrastées",
      "Freins surdimensionnés AMG étriers rouges",
      "Assurance tous risques et assistance 24/7"
    ],
    "reservations": []
  },
  {
    "id": "audi-rsq3",
    "name": "Audi RSQ3 Sportback",
    "subtitle": "2.5L TFSI 5 Cylindres • 400 CH • Teinte Vert Kyalami",
    "badge": "5 CYLINDRES RS • VERT KYALAMI",
    "category": "suv",
    "categoryName": "SUV & Aventure",
    "power": "400 CH",
    "acceleration": "4.5s (0-100)",
    "topSpeed": "280 km/h",
    "transmission": "S-Tronic 7 • Quattro",
    "sound": "Légendaire 5 Cylindres Audi Sport",
    "color": "Vert Kyalami Exclusive",
    "description": "La sonorité rauque et mythique du 5 cylindres Audi Sport dans un SUV Coupé au style affûté. Sa position de conduite surélevée et sa motricité Quattro sans faille en font le compagnon idéal pour explorer la région.",
    "prices": {
      "dailyWeek": 400,
      "packWeek": 1200,
      "weekend": 900,
      "weekendFull": 1200,
      "deposit": 7000,
      "depositYoung": 8000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/audi-rsq3.jpg"
    ],
    "features": [
      "Moteur 2.5 TFSI 400 chevaux élu moteur de l'année",
      "Teinte exclusive Vert Kyalami qui ne passe pas inaperçue",
      "Ligne d'échappement Sport RS avec embouts ovales noirs",
      "Cockpit virtuel Audi Sport avec indicateur de changement de rapport",
      "Coffre spacieux et banquette arrière modulable",
      "Livraison 7j/7 dans tout le 06"
    ],
    "reservations": []
  },
  {
    "id": "golf-85-r-blue",
    "name": "Volkswagen Golf 8.5-R Performance",
    "subtitle": "2.0L TSI 333 CH • Nouvelle Phase 8.5 • Bleu Lapiz Métallisé",
    "badge": "NOUVELLE 8.5-R • 333 CH • BLEU LAPIZ",
    "category": "compactes",
    "categoryName": "Compactes & GT",
    "power": "333 CH",
    "acceleration": "4.6s (0-100)",
    "topSpeed": "270 km/h",
    "transmission": "DSG 7 • 4Motion R-Performance",
    "sound": "Ligne R avec Pop & Bang détonants",
    "color": "Bleu Lapiz Métallisé Iconique R",
    "description": "La version restylée 8.5 de la Golf R avec 333 chevaux et le nouveau système multimédia élargi. Dans son bleu Lapiz emblématique, c'est l'incarnation de la performance allemande moderne.",
    "prices": {
      "dailyWeek": 300,
      "packWeek": 800,
      "weekend": 700,
      "weekendFull": 800,
      "deposit": 6000,
      "depositYoung": 6000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/golf-85-r-blue.jpg"
    ],
    "features": [
      "Puissance portée à 333 chevaux sur cette version 8.5",
      "Nouvel écran tactile central géant 12.9 pouces intuitif",
      "Bandeau lumineux calandre avant LED traversant",
      "Modes de conduite Drift et Special Nürburgring",
      "Jantes Warmenau forgées ultra-légères",
      "Mise à disposition VIP"
    ],
    "reservations": []
  },
  {
    "id": "golf-85-gte",
    "name": "Volkswagen Golf 8.5 GTE",
    "subtitle": "1.5L TSI eHybrid • 272 CH • Électrifiée & Sportive",
    "badge": "NOUVELLE 8.5 • HYBRIDE SPORT • 272 CH",
    "category": "compactes",
    "categoryName": "Compactes & GT",
    "power": "272 CH",
    "acceleration": "6.2s (0-100)",
    "topSpeed": "230 km/h",
    "transmission": "DSG 6 e-Hybrid",
    "sound": "Silencieux en Ville, Rageur en Mode GTE",
    "color": "Gris Dauphin Métallisé & Signature Bleue",
    "description": "Le compromis parfait pour arpenter la Côte d'Azur : roulez en 100% électrique à Monaco et libérez les 272 chevaux cumulés dès que la route s'ouvre. Économique, stylée et très performante.",
    "prices": {
      "dailyWeek": 200,
      "packWeek": 500,
      "weekend": 400,
      "weekendFull": 500,
      "deposit": 3000,
      "depositYoung": 3000,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/golf-85-gte.jpg"
    ],
    "features": [
      "Nouvelle motorisation hybride 2025/2026 de 272 chevaux",
      "Autonomie électrique jusqu'à 100 km sans consommer une goutte d'essence",
      "Phares IQ.Light Matrix LED avec calandre lumineuse",
      "Sièges sport à carreaux traditionnels GTE avec détails bleus",
      "Navigation connectée et Apple CarPlay sans fil",
      "Accessible avec caution allégée"
    ],
    "reservations": []
  },
  {
    "id": "bmw-serie1",
    "name": "BMW Série 1 (Pack M Sport)",
    "subtitle": "TwinPower Turbo • Pack M Sport & Calandre Noire",
    "badge": "PACK M SPORT • ÉLÉGANCE SPORTIVE",
    "category": "compactes",
    "categoryName": "Compactes & GT",
    "power": "178 CH",
    "acceleration": "7.1s (0-100)",
    "topSpeed": "230 km/h",
    "transmission": "Automatique 7 rapports Steptronic",
    "sound": "Échappement Double Sortie Sport",
    "color": "Noir Saphir & Pack Shadow Line",
    "description": "L'élégance bavaroise au format compact. Idéale pour se garer facilement dans le Vieux-Nice ou les ruelles de Saint-Tropez tout en profitant du dynamisme et du prestige de la marque à l'hélice.",
    "prices": {
      "dailyWeek": 150,
      "packWeek": 400,
      "weekend": 300,
      "weekendFull": 400,
      "deposit": 2500,
      "depositYoung": 2500,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/bmw-serie1.jpg"
    ],
    "features": [
      "Pack complet M Sport extérieur et intérieur",
      "Jantes alliage M bicolores 18 pouces",
      "Volant cuir sport M multifonctions",
      "Système d'infodivertissement iDrive tactile avec GPS pro",
      "Caméra de recul et radars de stationnement 360°",
      "Disponible dès 150 € / jour"
    ],
    "reservations": []
  },
  {
    "id": "mini-cooper",
    "name": "Mini Cooper S (2026)",
    "subtitle": "TwinPower Turbo • Nouvelle Génération 2026 • Design Chic",
    "badge": "NOUVEAU MODÈLE 2026 • STYLE CHIC",
    "category": "compactes",
    "categoryName": "Compactes & GT",
    "power": "178 CH",
    "acceleration": "6.7s (0-100)",
    "topSpeed": "235 km/h",
    "transmission": "Boîte Automatique Double Embrayage",
    "sound": "Go-Kart Feeling avec Échappement Sport",
    "color": "Noir Profond & Toit Contrasté",
    "description": "La toute dernière réinvention de l'icône britannique. Intérieur ultra-épuré avec son superbe écran tactile circulaire central OLED, esprit karting inimitable et agilité parfaite pour la Côte.",
    "prices": {
      "dailyWeek": 150,
      "packWeek": 400,
      "weekend": 300,
      "weekendFull": 400,
      "deposit": 2500,
      "depositYoung": 2500,
      "kmPerDay": 250
    },
    "images": [
      "assets/cars/others/mini-cooper.jpg"
    ],
    "features": [
      "Nouveau modèle génération 2026",
      "Écran circulaire central OLED haute résolution exclusif",
      "Modes de conduite Mini Experience avec sons personnalisés",
      "Feux arrière Union Jack à signature LED sélectionnable",
      "Agilité et maniabilité exceptionnelle en ville",
      "Caution accessible et réservation rapide"
    ],
    "reservations": []
  },
  {
    "id": "buggy-segway",
    "name": "Buggy Segway Villain SX10",
    "subtitle": "1000cc 105 CH • 4x4 Déco Martini Racing & Rampe LED",
    "badge": "MARTINI RACING • SENSATIONS PURES",
    "category": "suv",
    "categoryName": "SUV & Aventure",
    "power": "105 CH",
    "acceleration": "4.9s (0-100)",
    "topSpeed": "120 km/h",
    "transmission": "Automatique CVT avec rapports courts et longs",
    "sound": "Bicylindre Rugissant & Échappement Ouvert",
    "color": "Livrée Martini Racing Blanc / Bleu / Rouge",
    "description": "Vivez une expérience hors du commun au volant de cette monture tout-terrain habillée aux couleurs mythiques de Martini Racing. Châssis tubulaire compétition, rampe LED puissante et franchissement tout-terrain garanti.",
    "prices": {
      "dailyWeek": 350,
      "packWeek": 1000,
      "weekend": 800,
      "weekendFull": 1200,
      "deposit": 5000,
      "depositYoung": 7000,
      "kmPerDay": 150
    },
    "images": [
      "assets/cars/others/buggy-segway.jpg"
    ],
    "features": [
      "Livrée historique Martini Racing avec arceau tubulaire renforcé",
      "Rampe de phares LED ultra-haute intensité pour sorties nocturnes",
      "Suspensions à gaz réglables grand débattement compétition",
      "Passage 4x2 / 4x4 avec blocage de différentiel avant",
      "Direction assistée électrique EPS réglable",
      "Idéal virées côtières ou sentiers panoramiques"
    ],
    "reservations": []
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

// Gestionnaire du LocalStorage pour l'administration en direct (v2 pour actualiser la flotte complète)
const STORAGE_KEY = 'luxrentcar_fleet_v2';

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
