/* =====================================================================
   SITE CONTENT  —  edit this file to change text, photos, prices, dates
   =====================================================================

   HOW TO EDIT
   - Every piece of text has an English (en) and Spanish (es) version.
   - Text marked  todo: true  is placeholder text. It shows a small dashed
     amber underline while  showPlaceholderMarkers  (below) is true.
     When you replace the text, delete  todo: true  for that line.
     Before going live, set  showPlaceholderMarkers  to false.
   - Photos are listed once in  PHOTOS  and used by their short name
     (for example "macawFlight"). To change a photo, change its file here.
     Every photo has a large ("-l") and a small ("-s") version in assets/img.
   - Tours are a list. To add a tour later, copy the whole tour block,
     give it a new id and change the content. (See README.md.)
   - Save the file and reload the page in the browser. That's all.
   ===================================================================== */

window.SITE = {

  showPlaceholderMarkers: true,
  defaultLanguage: "en",           // "en" or "es"

  /* ---------------- Organization & contact (footer, booking) -------- */
  contact: {
    organization: "Fundación Work with Nature",
    email: "maarten@adoptrainforest.com",       // booking requests go here
    emailAlt: null,                             // a second address shown in the footer (set to null to hide)
    phone: "6082-6565",
    phoneInternational: "+50660826565",   // used for WhatsApp + tap-to-call
    whatsapp: true,                        // show WhatsApp button?
    website: "https://www.adoptrainforest.com/",                 // English site of Stichting Adopteer Regenwoud ("www." matters: without it you land on the Dutch site)
    adoptUrl: "https://www.adoptrainforest.com/adopt-rainforest/"  // where the "Adopt rainforest" button goes
  },

  /* ---------------- Visitor statistics (GoatCounter) ---------------
     Privacy-friendly: no cookies, no personal data, no cookie banner needed.
     Create a free account at goatcounter.com, pick a site code (for example
     "visitbarbilla"), and put it here between the quotes. null = off.
     Your statistics are then at https://<code>.goatcounter.com (only you can log in). */
  analytics: {
    goatcounterCode: null
  },

  /* ---------------- Where booking requests go ----------------------
     method "email":    the Send button opens the visitor's email app with
                        the request filled in, addressed to contact.email.
     method "endpoint": the request is POSTed as JSON to endpointUrl
                        (for a form service, booking system or Google
                        Sheet script later). Falls back to email if it fails. */
  bookingDelivery: {
    method: "email",
    endpointUrl: null
  },

  /* ---------------- Hero background ---------------------------------
     The hero is photo Barbilla1 (assets/img/hero-barbilla1-l/-s.jpg).
     On a computer it moves and tilts slightly with the mouse.
     photo:      short name from PHOTOS (used for the description text).
     depth:      how much it moves (0 = still, 1 = normal, 1.5 = more).
     autoMove:   true = also pan slowly by itself (and on phones).        */
  heroScene: {
    photo: "barbilla1",
    depth: 1,
    autoMove: false
  },

  /* ---------------- Photos (short name -> file) -------------------- */
  PHOTOS: {
    barbilla1:       { file: "hero-barbilla1", alt: { en: "Rainforest canopy with mist in the valleys of Barbilla", es: "Dosel del bosque lluvioso con neblina en los valles de Barbilla" } },
    parkLandscape:   { file: "img-6978",  alt: { en: "Forested hills of the Talamanca foothills", es: "Colinas boscosas al pie de la Talamanca" } },
    mistCanopy:      { file: "reserve-3", alt: { en: "Morning mist over the rainforest canopy", es: "Neblina matutina sobre el dosel del bosque" } },
    mistTall:        { file: "reserve-6", alt: { en: "Mist rising between forested ridges", es: "Neblina entre las crestas del bosque" } },
    riverTall:       { file: "reserve-7", alt: { en: "Rainforest stream with boulders", es: "Quebrada del bosque con rocas" } },
    riverGorge:      { file: "reserve-8", alt: { en: "River gorge in the Work with Nature reserve", es: "Cañón del río en la reserva Work with Nature" } },
    sapling:         { file: "img-8814",  alt: { en: "Young native tree planted in a reforestation plot", es: "Árbol nativo joven en un área de reforestación" } },
    guide:           { file: "2t3a7687",  alt: { en: "Smiling local guide in the forest", es: "Guía local sonriente en el bosque" } },
    tallTree:        { file: "barbilla4", alt: { en: "Keel-billed Toucan in a bare treetop", es: "Tucán Pico Iris en la copa de un árbol seco" } },
    leafShadow:      { file: "2t3a6020",  alt: { en: "Large rainforest leaves", es: "Grandes hojas del bosque lluvioso" } },
    macawFlight:     { file: "z9a6235",   alt: { en: "Two Great Green Macaws in flight", es: "Dos Lapas Verdes en vuelo" } },
    macawPortrait:   { file: "z9a6317",   alt: { en: "Great Green Macaw in a tree", es: "Lapa Verde en un árbol" } },
    macawCanopy:     { file: "z9a6295",   alt: { en: "Great Green Macaw among leaves", es: "Lapa Verde entre las hojas" } },
    parrots:         { file: "watchtower3",   alt: { en: "Pair of Mealy Parrots on a branch", es: "Pareja de Loras Verdes en una rama" } },
    redEyedFrogs:    { file: "img-5520",  alt: { en: "Red-eyed Tree Frogs on a leaf", es: "Ranas Calzonudas sobre una hoja" } },
    leafFrog:        { file: "z9a5938",   alt: { en: "Splendid Leaf Frog at night", es: "Rana de Hoja Espléndida de noche" } },
    glassFrog:       { file: "img-6808",  alt: { en: "Glass Frog on a leaf", es: "Rana de Vidrio sobre una hoja" } },
    glassFrog2:      { file: "img-6922",  alt: { en: "Glass Frog at night", es: "Rana de Vidrio de noche" } },
    glassFrogDiane:  { file: "diane-s-bare-hearted-glass-frog2", alt: { en: "Diane's Bare-hearted Glass Frog", es: "Rana de Vidrio de Diane" } },
    frogEggs:        { file: "z9a5800",   alt: { en: "Tree Frog guarding its eggs", es: "Rana Arborícola cuidando sus huevos" } },
    loquaciousFrogs: { file: "loquadious-tree-frog-1-of-1", alt: { en: "Loquacious Tree Frogs", es: "Ranas Arborícolas Locuaces" } },
    poisonFrog:      { file: "img-7274",  alt: { en: "Green-and-black Poison Dart Frog", es: "Rana Dardo Verde y Negra" } },
    strawberryFrog:  { file: "img-7180",  alt: { en: "Strawberry Poison Dart Frog", es: "Rana Roja Venenosa" } },
    hummingbird:     { file: "img-0761",  alt: { en: "Hummingbird feeding on a purple flower", es: "Colibrí alimentándose de una flor morada" } },
    beetle:          { file: "2t3a7156",  alt: { en: "Rhinoceros Beetle on a branch", es: "Escarabajo Rinoceronte sobre una rama" } },
    eyelashViper:    { file: "img-6391",  alt: { en: "Golden Eyelash Viper", es: "Bocaracá Dorada" } },
    aracari:         { file: "img-7744",  alt: { en: "Collared Aracari", es: "Cusingo" } },
    basilisk:        { file: "img-7370",  alt: { en: "Green Basilisk", es: "Basilisco Verde" } },
    glasswing:       { file: "2t3a5819",  alt: { en: "Glasswing Butterfly", es: "Mariposa de Alas de Cristal" } },
    honeycreeper:    { file: "img-2224",  alt: { en: "Shining Honeycreeper on a branch", es: "Mielero Luciente en una rama" } },
    broadBilledMotmot: { file: "2t3a5717", alt: { en: "Broad-billed Motmot in the forest", es: "Momoto Piquiancho en el bosque" } },
    hermit:          { file: "img-8083",  alt: { en: "Hermit Hummingbird on a twig", es: "Colibrí Ermitaño en una ramita" } },
    motmot:          { file: "img-1844",  alt: { en: "Motmot on a branch", es: "Momoto en una rama" } },
    owl:             { file: "img-6683",  alt: { en: "Owl perched on a branch", es: "Búho posado en una rama" } },
    tortoiseBeetle:  { file: "img-8366",  alt: { en: "Iridescent Tortoise Beetle", es: "Escarabajo Tortuga iridiscente" } },
    butterfly:       { file: "2t3a5691",  alt: { en: "Butterfly on a leaf", es: "Mariposa sobre una hoja" } },
    boa:             { file: "2t3a5773",  alt: { en: "Boa Constrictor", es: "Boa" } },
    iguanaHelmet:    { file: "z9a5863",   alt: { en: "Helmeted Iguana", es: "Iguana de Casco" } },
    malachite:       { file: "img-7420",  alt: { en: "Malachite Butterfly", es: "Mariposa Malaquita" } },
    vineSnake:       { file: "img-8672",  alt: { en: "Vine Snake with open mouth", es: "Bejuquilla con la boca abierta" } },
    saplingStop:     { file: "reforestation1", alt: { en: "Young native tree planted in a reforestation plot", es: "Árbol nativo joven en un área de reforestación" } },
    redEyedPair:     { file: "treefrog1", alt: { en: "Pair of Red-eyed Tree Frogs mating on a leaf", es: "Pareja de Ranas Calzonudas apareándose sobre una hoja" } },
    honeycreeperStop: { file: "birding1", alt: { en: "Shining Honeycreeper on a branch", es: "Mielero Luciente en una rama" } },
    motmotStop:      { file: "birding2", alt: { en: "Broad-billed Motmot on a branch", es: "Momoto Piquiancho en una rama" } },
    macawFlightStop: { file: "macaw1", alt: { en: "Two Great Green Macaws in flight", es: "Dos Lapas Verdes en vuelo" } },
    riverPool:       { file: "barbilla2", alt: { en: "Mossy river pool in the Barbilla rainforest", es: "Poza de río con musgo en el bosque de Barbilla" } },
    watchtowerView:  { file: "watchtower1", alt: { en: "Visitor with binoculars on the watchtower at sunset", es: "Visitante con binoculares en la torre al atardecer" } },
    watchtower:      { file: "watchtower2", alt: { en: "The watchtower rising above the trees", es: "La torre de observación sobre los árboles" } },
    regrowth:        { file: "reforestation2", alt: { en: "Young forest growing back on former pasture", es: "Bosque joven creciendo en un antiguo potrero" } },
    planting:        { file: "reforestation3", alt: { en: "Volunteers planting native trees", es: "Voluntarios plantando árboles nativos" } },
    yellowTreeFrog:  { file: "frog-conservation1", alt: { en: "Tree Frog on a branch at night", es: "Rana Arborícola en una rama de noche" } },
    frogEggsLeaf:    { file: "tree-frog2", alt: { en: "Frog eggs developing on a leaf", es: "Huevos de rana desarrollándose sobre una hoja" } },
    trogon:          { file: "birding3", alt: { en: "Slaty-tailed Trogon on a branch", es: "Trogón Coliplomizo en una rama" } },
    macawNestBox:    { file: "macaw3", alt: { en: "Climber installing a nest box for Great Green Macaws high in a tree", es: "Escalador instalando un nido artificial para Lapas Verdes en lo alto de un árbol" } },
    arboretumTree:   { file: "arboretum1", alt: { en: "Young native tree in the arboretum", es: "Árbol nativo joven en el arboreto" } },
    arboretumLeaf:   { file: "arboretum3", alt: { en: "Hand turning over a large leaf to identify the tree", es: "Mano volteando una hoja grande para identificar el árbol" } },
    arboretumLeaves: { file: "arboretum4", alt: { en: "Hands examining the leaves of a native tree", es: "Manos examinando las hojas de un árbol nativo" } },
    moth:            { file: "rusted-fiestamark2", alt: { en: "Colorful moth on a leaf", es: "Polilla colorida sobre una hoja" } }
  },

  /* ---------------- Logos (footer + partners) ---------------------- */
  LOGOS: {
    adoptRainforest: { file: "assets/logos/adopt-rainforest.png", name: "Adopt Rainforest" },
    workWithNature:  { file: "assets/logos/work-with-nature.png", name: "Fundación Work with Nature" },
    sinac:           { file: "assets/logos/sinac.png",            name: "SINAC" },
    barbilla:        { file: "assets/logos/barbilla.png",         name: "Parque Nacional Barbilla" },
    tapaTours:       { file: "assets/logos/tapa-tours.png",       name: "Tapa Tours" }
  },

  /* ---------------- Section background photos (names from PHOTOS) --- */
  backgrounds: {
    partners: "riverGorge",    // faint, behind "Who organizes the tour"
    logistics: "mistCanopy",   // behind "Everything you need to know"
    booking: "mistTall"        // faint, behind the booking form
  },

  /* ---------------- Moving photo ribbon (under the hero) ----------- */
  ribbon: ["redEyedFrogs", "macawFlight", "hummingbird", "mistCanopy", "eyelashViper", "glasswing",
           "leafFrog", "aracari", "sapling", "basilisk", "glassFrog", "riverGorge", "beetle", "motmot"],

  /* =================================================================
     TOURS  —  one block per tour. Only the first tour is shown on the
     page for now; the structure is ready for more.
     ================================================================= */
  tours: [
    {
      id: "barbilla-matina",
      name: { en: "Barbilla Rainforest Discovery", es: "Descubre el Bosque de Barbilla", todo: true },
      place: { en: "National Park Barbilla · Sector Matina", es: "Parque Nacional Barbilla · Sector Matina" },

      /* Quick facts shown in the hero and booking summary */
      durationHours: { en: "5–6 hours", es: "5–6 horas" },
      difficulty: 2,                 // 1 = easy, 2 = moderate, 3 = challenging
      groupMin: 1,
      groupMax: 12,                  // largest group the calendar accepts
      pricePerPerson: 100,            // number only, used to estimate total
      childPricePerPerson: null,     // null = same price for everyone
      currency: "USD",
      priceIsPlaceholder: false,

      /* Which days can be booked */
      availability: {
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],   // 0 = Sunday … 6 = Saturday (every day)
        minDaysAhead: 2,                  // earliest booking: 2 days from today
        maxMonthsAhead: 12,
        closedDates: [ ]   // add days you're closed, like "2026-12-25"
      },

      /* The 9 stops of the tour, in order */
      stops: [
        {
          key: "park",
          tag: { en: "Protected area", es: "Área protegida" },
          title: { en: "National Park Barbilla", es: "Parque Nacional Barbilla" },
          text: { en: "Step into one of Costa Rica's least-visited national parks, where the Caribbean lowlands rise into the foothills of the Talamanca range. Sector Matina protects rivers, primary forest and an extraordinary diversity of life.",
                  es: "Entra en uno de los parques nacionales menos visitados de Costa Rica, donde las tierras bajas del Caribe se elevan hacia las faldas de la cordillera de Talamanca. El sector Matina protege ríos, bosque primario y una diversidad de vida extraordinaria.", todo: true },
          photos: ["riverPool", "parkLandscape", "parrots"]
        },
        {
          key: "watchtower",
          tag: { en: "Viewpoint", es: "Mirador" },
          title: { en: "The watchtower", es: "La torre de observación" },
          text: { en: "Climb above the trees and look out over the canopy. Look for Toucans singing from the treetops and King Vultures rising up in the sky.",
                  es: "Sube por encima de los árboles y contempla el dosel. Busca Tucanes cantando desde las copas de los árboles y Zopilotes Reyes elevándose en el cielo." },
          photos: ["watchtowerView", "watchtower", "tallTree"],
        },
        {
          key: "reforestation",
          tag: { en: "Hands-on", es: "Participativo" },
          title: { en: "Reforestation", es: "Reforestación" },
          text: { en: "See how former pasture is turning back into forest. Learn about the experimental scientific setup used to uncover the best restoration practices.",
                  es: "Descubre cómo antiguos potreros vuelven a ser bosque. Conoce el diseño científico experimental que se usa para descubrir las mejores prácticas de restauración." },
          photos: ["saplingStop", "regrowth", "planting"],
          impact: [
            { value: 40535, unit: "", label: { en: "native trees planted", es: "árboles nativos sembrados" } },
            { value: 43, unit: "ha", label: { en: "hectares restored", es: "hectáreas restauradas" } }
          ]
        },
        {
          key: "biodiversity",
          tag: { en: "Wildlife", es: "Vida silvestre" },
          title: { en: "Biodiversity", es: "Biodiversidad" },
          text: { en: "We have registered over 1,000 animal species in this area, including Jaguars, Tapirs, Eyelash Pitvipers, Motmots and Basilisks. Your guide knows where to look, and what you are looking at.",
                  es: "Hemos registrado más de 1.000 especies de animales en esta zona, entre ellas el Jaguar, la Danta, la Bocaracá, los Momotos y los Basiliscos. Tu guía sabe dónde mirar y qué estás viendo." },
          photos: ["hummingbird", "eyelashViper", "basilisk", "glasswing", "aracari", "owl", "yellowTreeFrog", "beetle"],
          layout: "mosaic"
        },
        {
          key: "frogs",
          tag: { en: "Conservation", es: "Conservación" },
          title: { en: "Tree frog conservation", es: "Conservación de ranas arborícolas" },
          text: { en: "Learn how we protect and monitor more than a dozen species of tree frog by installing breeding ponds. Try to find eggs and tadpoles of the Gliding Tree Frog and the Splendid Leaf Frog, some of the most threatened animals in the forest.",
                  es: "Aprende cómo protegemos y monitoreamos más de una docena de especies de ranas arborícolas instalando estanques de reproducción. Intenta encontrar huevos y renacuajos de la Rana Planeadora y la Rana de Hoja Espléndida, algunos de los animales más amenazados del bosque." },
          photos: ["leafFrog", "redEyedPair", "frogEggsLeaf"]
        },
        {
          key: "birding",
          tag: { en: "Birding", es: "Aves" },
          title: { en: "Birding hotspot", es: "Paraíso para observar aves" },
          text: { en: "This area gives birders the chance to encounter some spectacular species, like the Black-crowned Antpitta, Ocellated Antbird, Semiplumbeous Hawk, Song Wren and Black Hawk-Eagle. More than 360 species have been observed in the area.",
                  es: "Esta zona ofrece a los observadores de aves la oportunidad de encontrar especies espectaculares, como el Tororoí Pechiescamoso, el Hormiguero Ocelado, el Gavilán Dorsiplomizo, el Soterrey Canoro y el Águila Tirana. Se han observado más de 360 especies en la zona." },
          photos: ["motmotStop", "honeycreeperStop", "trogon"]
        },
        {
          key: "arboretum",
          tag: { en: "Native trees", es: "Árboles nativos" },
          title: { en: "The arboretum", es: "El arboreto" },
          text: { en: "Walk among more than 100 native tree species in our living tree museum. Your guide explains which trees have medicinal properties, which are ecologically important and which have spiritual value.",
                  es: "Camina entre más de 100 especies de árboles nativos en nuestro museo vivo de árboles. Tu guía te explica qué árboles tienen propiedades medicinales, cuáles son importantes para el ecosistema y cuáles tienen un valor espiritual." },
          photos: ["arboretumTree", "arboretumLeaf", "arboretumLeaves"],
        },
        {
          key: "macaws",
          tag: { en: "Endangered", es: "En peligro" },
          title: { en: "Great Green Macaws", es: "Lapas Verdes" },
          text: { en: "The Great Green Macaw is critically endangered, with only one thousand individuals left worldwide. We provide them with trees for their specialized diet and for breeding. With luck, you'll hear them before you see them.",
                  es: "La Lapa Verde está en peligro crítico de extinción y quedan solo mil individuos en todo el mundo. Les ofrecemos árboles para su dieta especializada y para anidar. Con suerte, las oirás antes de verlas." },
          photos: ["macawFlightStop", "macawPortrait", "macawNestBox"]
        },
        {
          key: "reserve",
          tag: { en: "Private reserve", es: "Reserva privada" },
          title: { en: "The Work with Nature reserve", es: "La reserva Work with Nature" },
          text: { en: "End the day by returning to our own reserve on the edge of the park: clear streams that provide drinking water for several communities, the starting point of the Madre de Dios Biological Corridor, and forest that is protected for good.",
                  es: "Termina el día regresando a nuestra propia reserva en el borde del parque: quebradas cristalinas que dan agua potable a varias comunidades, el punto de partida del Corredor Biológico Madre de Dios y bosque protegido para siempre." },
          photos: ["riverGorge", "riverTall", "mistTall"]
        }
      ],

      /* Logistics cards */
      logistics: {
        reserve: {
          title: { en: "How to book", es: "Cómo reservar" },
          text: { en: "Choose a date and group size below and send your request by email or WhatsApp (6082-6565). Book at least 2 days ahead. We'll get back to you to check availability and agree on a start time. Your booking is final once you receive our confirmation.",
                  es: "Elige una fecha y el tamaño del grupo abajo y envía tu solicitud por correo o WhatsApp (6082-6565). Reserva con al menos 2 días de anticipación. Te contactaremos para revisar la disponibilidad y acordar la hora de inicio. Tu reserva queda firme cuando recibas nuestra confirmación." }
        },
        pricing: {
          title: { en: "Pricing", es: "Precio" },
          text: { en: "Includes your certified guide and the entrance fees for the national park and the nature reserve. Part of every ticket goes to conservation and reforestation projects.",
                  es: "Incluye tu guía certificado y las entradas al parque nacional y a la reserva natural. Parte de cada entrada se destina a proyectos de conservación y reforestación." }
        },
        duration: {
          title: { en: "Duration", es: "Duración" },
          text: { en: "The tour takes 5 to 6 hours, with moderate walking on forest trails. There is no fixed start time: we agree on it with you when we confirm your booking.",
                  es: "El tour dura de 5 a 6 horas, con caminata moderada por senderos del bosque. No hay hora fija de inicio: la acordamos contigo al confirmar tu reserva." }
        },
        included: {
          title: { en: "What's included", es: "Qué incluye" },
          items: [
            { en: "Certified nature guide for your group", es: "Guía de naturaleza certificado para tu grupo" },
            { en: "Entrance fee for National Park Barbilla (SINAC)", es: "Entrada al Parque Nacional Barbilla (SINAC)" },
            { en: "Entrance fee for the nature reserve (Fundación Work with Nature)", es: "Entrada a la reserva natural (Fundación Work with Nature)" },
            { en: "Fruits and a snack", es: "Frutas y una merienda" },
            { en: "Part of your ticket goes to conservation and reforestation", es: "Parte de tu entrada apoya la conservación y la reforestación" }
          ]
        },
        getThere: {
          title: { en: "How to get there", es: "Cómo llegar" },
          text: { en: "You need your own 4x4 vehicle to reach the starting point. Your guide meets you there at the agreed time. There is parking on the property.",
                  es: "Necesitas tu propio vehículo 4x4 para llegar al punto de inicio. Tu guía te espera allí a la hora acordada. Hay parqueo dentro de la propiedad." },
          mapButton: { en: "Open in Google Maps", es: "Abrir en Google Maps" },
          // starting point (latitude, longitude); the map pin and the button use these
          lat: 9.994860418201526,
          lng: -83.36365245973658
        },
        bring: {
          title: { en: "What to bring", es: "Qué traer" },
          items: [
            { en: "Closed shoes or rubber boots", es: "Zapatos cerrados o botas de hule" },
            { en: "Rain jacket or poncho", es: "Capa o poncho para la lluvia" },
            { en: "Reusable water bottle", es: "Botella de agua reutilizable" },
            { en: "Insect repellent and sunscreen", es: "Repelente y bloqueador solar" },
            { en: "Binoculars and camera", es: "Binoculares y cámara" },
            { en: "ID or passport", es: "Cédula o pasaporte" }
          ]
        }
      }
    }
  ],

  /* =================================================================
     PAGE TEXT  (headings, buttons, labels)
     ================================================================= */
  text: {
    nav: {
      tour: { en: "The tour", es: "El tour" },
      partners: { en: "Who we are", es: "Quiénes somos" },
      logistics: { en: "Practical info", es: "Información práctica" },
      book: { en: "Book a date", es: "Reservar fecha" },
      reservations: { en: "Reservations", es: "Reservas" },
      menu: { en: "Menu", es: "Menú" }
    },
    hero: {
      eyebrow: { en: "Costa Rica · Caribbean lowland rainforest", es: "Costa Rica · Bosque lluvioso del Caribe" },
      titleLine1: { en: "Visit National Park", es: "Visita el Parque Nacional" },
      titleLine2: { en: "Barbilla", es: "Barbilla" },
      subtitle: { en: "A day in wild, little-known rainforest with a local guide, from reforestation to the pristine rainforest.",
                  es: "Un día en un bosque lluvioso salvaje y poco conocido con un guía local, desde la reforestación hasta el bosque virgen." },
      cta: { en: "Book your date", es: "Reserva tu fecha" },
      secondary: { en: "Explore the tour", es: "Conoce el tour" },
      scroll: { en: "Scroll", es: "Desliza" },
      pause: { en: "Pause motion", es: "Pausar movimiento" },
      play: { en: "Play motion", es: "Reanudar movimiento" }
    },
    facts: {
      duration: { en: "Duration", es: "Duración" },
      difficulty: { en: "Difficulty", es: "Dificultad" },
      group: { en: "Group size", es: "Grupo" },
      price: { en: "From", es: "Desde" },
      perPerson: { en: "per person", es: "por persona" },
      upTo: { en: "up to", es: "hasta" },
      people: { en: "people", es: "personas" },
      levels: [
        { en: "Easy", es: "Fácil" },
        { en: "Moderate", es: "Moderada" },
        { en: "Challenging", es: "Exigente" }
      ]
    },
    tour: {
      eyebrow: { en: "The tour", es: "El tour" },
      title: { en: "Nine stops, one day in the forest", es: "Nueve paradas, un día en el bosque" },
      intro: { en: "Follow the trail from the Work with Nature reserve to the National Park Barbilla. Every stop tells part of the story of how this forest is protected and restored.",
               es: "Sigue el sendero desde la reserva Work with Nature hasta el Parque Nacional Barbilla. Cada parada cuenta una parte de la historia de cómo se protege y restaura este bosque." },
      stop: { en: "Stop", es: "Parada" }
    },
    partners: {
      eyebrow: { en: "Who organizes the tour", es: "Quién organiza el tour" },
      title: { en: "Organized by Fundación Work with Nature", es: "Organizado por la Fundación Work with Nature" },
      intro: { en: "We run this tour together with the people who protect and know this forest best. Your visit directly supports the National Park, local guides and the community.",
               es: "Organizamos este tour junto con quienes mejor protegen y conocen este bosque. Tu visita apoya directamente al Parque Nacional, a los guías locales y a la comunidad." },
      items: [
        { logo: "barbilla", title: { en: "National Park Barbilla", es: "Parque Nacional Barbilla" },
          text: { en: "Covers 11,943 ha and is surrounded by protected wilderness areas such as the Río Pacuare Forest Reserve and two Indigenous territories.", es: "Tiene una extensión de 11.943 ha rodeado de Áreas Silvestres Protegidas como la Reserva Forestal Río Pacuare y dos Territorios Indígenas." } },
        { logo: "workWithNature", title: { en: "Fundación Work with Nature", es: "Fundación Work with Nature" },
          text: { en: "Organizer. A Costa Rican foundation restoring rainforest and protecting wildlife on the edge of National Park Barbilla.", es: "Organizador. Una fundación costarricense que restaura el bosque y protege la vida silvestre en el borde del Parque Nacional Barbilla." } },
        { logo: "sinac", title: { en: "SINAC", es: "SINAC" },
          text: { en: "Government partner. Costa Rica's National System of Conservation Areas, which manages National Park Barbilla.", es: "Socio gubernamental. El Sistema Nacional de Áreas de Conservación, que administra el Parque Nacional Barbilla." } },
        { logo: "tapaTours", title: { en: "Licensed local guides", es: "Guías locales con licencia" },
          text: { en: "Certified naturalist guides from the communities around the park.", es: "Guías naturalistas certificados de las comunidades alrededor del parque.", todo: true } },
      ],
      /* Other partners, shown as a list under the cards */
      /* Impact numbers shown under the intro */
      stats: [
        { value: { en: "310 ha", es: "310 ha" }, label: { en: "of rainforest protected", es: "de bosque lluvioso protegidas" } },
        { value: { en: "40,535", es: "40.535" }, label: { en: "native trees planted", es: "árboles nativos sembrados" } },
        { value: { en: "1,000+", es: "1.000+" }, label: { en: "species recorded", es: "especies registradas" } }
      ],
      othersTitle: { en: "Also in cooperation with", es: "También en cooperación con" },
      others: [
        { name: "Stichting Adopteer Regenwoud", note: { en: "Netherlands", es: "Países Bajos" } },
        { name: "Finca Integral Jardín Mandala", note: { en: "Local farm", es: "Finca local" } },
        { name: "Corredor Biológico Madre de Dios", note: { en: "Biological corridor", es: "Corredor biológico" } },
        { name: "UNESCO World Heritage Site", note: { en: "Talamanca Range–La Amistad Reserves", es: "Reservas de la Cordillera de Talamanca–La Amistad" } }
      ]
    },
    logistics: {
      eyebrow: { en: "Practical info", es: "Información práctica" },
      title: { en: "Everything you need to know", es: "Todo lo que necesitas saber" }
    },
    booking: {
      eyebrow: { en: "Reservations", es: "Reservas" },
      title: { en: "Pick your day in Barbilla", es: "Elige tu día en Barbilla" },
      intro: { en: "Choose a date and tell us who's coming. This is a request: we'll confirm by email or WhatsApp and agree the start time with you. No payment yet.",
               es: "Elige una fecha y cuéntanos quién viene. Esto es una solicitud: confirmamos por correo o WhatsApp y acordamos contigo la hora de inicio. Sin pago por ahora." },
      date: { en: "Date", es: "Fecha" },
      pickDate: { en: "Pick a date in the calendar", es: "Elige una fecha en el calendario" },
      prevMonth: { en: "Previous month", es: "Mes anterior" },
      nextMonth: { en: "Next month", es: "Mes siguiente" },
      unavailable: { en: "Unavailable", es: "No disponible" },
      available: { en: "Available", es: "Disponible" },
      selected: { en: "Your date", es: "Tu fecha" },
      adults: { en: "Adults", es: "Adultos" },
      children: { en: "Children", es: "Niños" },
      decrease: { en: "Fewer", es: "Menos" },
      increase: { en: "More", es: "Más" },
      name: { en: "Full name", es: "Nombre completo" },
      email: { en: "Email", es: "Correo electrónico" },
      phone: { en: "Phone / WhatsApp", es: "Teléfono / WhatsApp" },
      phoneHint: { en: "Optional, with country code", es: "Opcional, con código de país" },
      language: { en: "Guide language", es: "Idioma del guía" },
      languages: [ { en: "English", es: "Inglés" }, { en: "Spanish", es: "Español" } ],
      notes: { en: "Anything we should know?", es: "¿Algo que debamos saber?" },
      notesHint: { en: "Dietary needs, mobility, questions", es: "Alimentación, movilidad, preguntas" },
      summary: { en: "Your request", es: "Tu solicitud" },
      reference: { en: "Request ref.", es: "Ref. de solicitud" },
      noDate: { en: "No date chosen yet", es: "Aún no hay fecha" },
      total: { en: "Total", es: "Total" },
      priceNote: { en: "Final price confirmed by us.", es: "Precio final confirmado por nosotros." },
      submit: { en: "Send booking request", es: "Enviar solicitud" },
      whatsapp: { en: "Send via WhatsApp", es: "Enviar por WhatsApp" },
      sentTitle: { en: "Almost done", es: "Casi listo" },
      sentText: { en: "Your email app opened with the request filled in. Press send there and we'll get back to you soon. Nothing opened? Email us at", es: "Se abrió tu aplicación de correo con la solicitud. Presiona enviar allí y te responderemos pronto. ¿No se abrió nada? Escríbenos a" },
      errors: {
        date: { en: "Choose a date in the calendar.", es: "Elige una fecha en el calendario." },
        name: { en: "Add your name so we know who's coming.", es: "Agrega tu nombre para saber quién viene." },
        email: { en: "Add an email address like name@example.com.", es: "Agrega un correo como nombre@ejemplo.com." },
        group: { en: "Groups can be up to {max} people. For larger groups, email us.", es: "Los grupos pueden ser de hasta {max} personas. Para grupos más grandes, escríbenos." }
      },
      emailSubject: { en: "Booking request", es: "Solicitud de reserva" }
    },
    adopt: {
      eyebrow: { en: "Adopt rainforest", es: "Adopta bosque lluvioso" },
      title: { en: "Make a direct contribution to nature conservation", es: "Contribuye directamente a la conservación de la naturaleza" },
      text: { en: "Adopt Rainforest and Fundación Work with Nature work together to conserve rainforest in Costa Rica. For every €2.50 you donate, we buy and protect one square meter of rainforest, and you receive a personalized certificate.",
              es: "Adopt Rainforest y la Fundación Work with Nature trabajan juntas por la conservación del bosque lluvioso en Costa Rica. Por cada €2,50 que donas, compramos y protegemos un metro cuadrado de bosque lluvioso, y recibes un certificado personalizado." },
      price: { en: "€2.50", es: "€2,50" },
      priceLabel: { en: "buys and protects 1 m² of rainforest", es: "compra y protege 1 m² de bosque lluvioso" },
      certificate: { en: "a personalized certificate for every donor", es: "un certificado personalizado para cada donante" },
      button: { en: "Adopt Rainforest", es: "Adopta bosque lluvioso" },
      more: { en: "More information at", es: "Más información en" }
    },
    footer: {
      contact: { en: "Contact", es: "Contacto" },
      partnersTitle: { en: "In cooperation with", es: "En cooperación con" },
      rights: { en: "All rights reserved.", es: "Todos los derechos reservados." },
      privacy: { en: "Privacy statement", es: "Declaración de privacidad" }
    },
    placeholderBadge: { en: "Placeholder text", es: "Texto provisional" },
    langToggle: { en: "Español", es: "English" }
  }
};
