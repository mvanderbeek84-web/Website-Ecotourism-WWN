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

  /* ---------------- Organisation & contact (footer, booking) -------- */
  contact: {
    organisation: "Fundación Work with Nature",
    email: "maarten@adoptrainforest.com",
    phone: "6082-6565",
    phoneInternational: "+50660826565",   // used for WhatsApp + tap-to-call
    whatsapp: true,                        // show WhatsApp button?
    website: "https://adoptrainforest.com"
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

  /* ---------------- Hero video --------------------------------------
     src:   path to the video, relative to index.html.
            Right now it points to the full RainforestDeepDive film in the
            folder above "site". The page plays only the part between
            start and end (in seconds) and loops it.
            For the live website, cut a short clip (10–20 s, no sound,
            under ~8 MB) and save it as site/assets/video/hero.mp4,
            then set src to "assets/video/hero.mp4", start 0, end null.
            README.md explains how to cut it.
     poster: photo shown while the video loads (and on phones with
            data saver / reduced motion).                             */
  heroVideo: {
    src: "../RainforestDeepDive02_ReturnOfTheClimbers_English_FHD_AR.mp4",
    start: 0,      // TODO: second where the drone shot starts
    end: 14,       // TODO: second where it ends
    poster: "parkLandscape"
  },

  /* ---------------- Photos (short name -> file) -------------------- */
  PHOTOS: {
    parkLandscape:   { file: "img-6978",  alt: { en: "Forested hills of the Talamanca foothills", es: "Colinas boscosas al pie de la Talamanca" } },
    mistCanopy:      { file: "reserve-3", alt: { en: "Morning mist over the rainforest canopy", es: "Neblina matutina sobre el dosel del bosque" } },
    mistTall:        { file: "reserve-6", alt: { en: "Mist rising between forested ridges", es: "Neblina entre las crestas del bosque" } },
    riverTall:       { file: "reserve-7", alt: { en: "Rainforest stream with boulders", es: "Quebrada del bosque con rocas" } },
    riverGorge:      { file: "reserve-8", alt: { en: "River gorge in the Work with Nature reserve", es: "Cañón del río en la reserva Work with Nature" } },
    sapling:         { file: "img-8814",  alt: { en: "Young native tree planted in a reforestation plot", es: "Árbol nativo joven en un área de reforestación" } },
    guide:           { file: "2t3a7687",  alt: { en: "Smiling local guide in the forest", es: "Guía local sonriente en el bosque" } },
    tallTree:        { file: "z9a6072",   alt: { en: "Tall emergent tree above the canopy", es: "Árbol emergente sobre el dosel" } },
    leafShadow:      { file: "2t3a6020",  alt: { en: "Large rainforest leaves", es: "Grandes hojas del bosque lluvioso" } },
    macawFlight:     { file: "z9a6235",   alt: { en: "Two great green macaws in flight", es: "Dos lapas verdes en vuelo" } },
    macawPortrait:   { file: "z9a6317",   alt: { en: "Great green macaw in a tree", es: "Lapa verde en un árbol" } },
    macawCanopy:     { file: "z9a6295",   alt: { en: "Great green macaw among leaves", es: "Lapa verde entre las hojas" } },
    parrots:         { file: "z9a6067",   alt: { en: "Pair of parrots on a branch", es: "Pareja de loros en una rama" } },
    redEyedFrogs:    { file: "img-5520",  alt: { en: "Red-eyed tree frogs on a leaf", es: "Ranas calzonudas sobre una hoja" } },
    leafFrog:        { file: "z9a5938",   alt: { en: "Splendid leaf frog at night", es: "Rana de hoja de noche" } },
    glassFrog:       { file: "img-6808",  alt: { en: "Glass frog on a leaf", es: "Rana de vidrio sobre una hoja" } },
    glassFrog2:      { file: "img-6922",  alt: { en: "Glass frog at night", es: "Rana de vidrio de noche" } },
    glassFrogDiane:  { file: "diane-s-bare-hearted-glass-frog2", alt: { en: "Diane's bare-hearted glass frog", es: "Rana de vidrio de Diane" } },
    frogEggs:        { file: "z9a5800",   alt: { en: "Tree frog guarding its eggs", es: "Rana arborícola cuidando sus huevos" } },
    loquaciousFrogs: { file: "loquadious-tree-frog-1-of-1", alt: { en: "Loquacious tree frogs", es: "Ranas arborícolas locuaces" } },
    poisonFrog:      { file: "img-7274",  alt: { en: "Green and black poison dart frog", es: "Rana dardo verde y negra" } },
    strawberryFrog:  { file: "img-7180",  alt: { en: "Strawberry poison dart frog", es: "Rana roja venenosa" } },
    hummingbird:     { file: "img-0761",  alt: { en: "Hummingbird feeding on a purple flower", es: "Colibrí alimentándose de una flor morada" } },
    beetle:          { file: "2t3a7156",  alt: { en: "Horned beetle on a branch", es: "Escarabajo con cuernos sobre una rama" } },
    eyelashViper:    { file: "img-6391",  alt: { en: "Golden eyelash viper", es: "Bocaracá dorada" } },
    aracari:         { file: "img-7744",  alt: { en: "Collared aracari", es: "Cusingo" } },
    basilisk:        { file: "img-7370",  alt: { en: "Green basilisk lizard", es: "Basilisco verde" } },
    glasswing:       { file: "2t3a5819",  alt: { en: "Glasswing butterfly", es: "Mariposa de alas de cristal" } },
    motmot:          { file: "img-1844",  alt: { en: "Motmot on a branch", es: "Momoto en una rama" } },
    owl:             { file: "img-6683",  alt: { en: "Owl perched on a branch", es: "Búho posado en una rama" } },
    tortoiseBeetle:  { file: "img-8366",  alt: { en: "Iridescent tortoise beetle", es: "Escarabajo tortuga iridiscente" } },
    butterfly:       { file: "2t3a5691",  alt: { en: "Butterfly on a leaf", es: "Mariposa sobre una hoja" } },
    boa:             { file: "2t3a5773",  alt: { en: "Boa constrictor", es: "Boa" } },
    iguanaHelmet:    { file: "z9a5863",   alt: { en: "Helmeted iguana", es: "Iguana de casco" } },
    malachite:       { file: "img-7420",  alt: { en: "Malachite butterfly", es: "Mariposa malaquita" } },
    vineSnake:       { file: "img-8672",  alt: { en: "Vine snake with open mouth", es: "Bejuquilla con la boca abierta" } },
    moth:            { file: "rusted-fiestamark2", alt: { en: "Colourful moth on a leaf", es: "Polilla colorida sobre una hoja" } }
  },

  /* ---------------- Logos (footer + partners) ---------------------- */
  LOGOS: {
    adoptRainforest: { file: "assets/logos/adopt-rainforest.png", name: "Adopt Rainforest" },
    workWithNature:  { file: "assets/logos/work-with-nature.png", name: "Fundación Work with Nature" },
    sinac:           { file: "assets/logos/sinac.png",            name: "SINAC" },
    barbilla:        { file: "assets/logos/barbilla.png",         name: "Parque Nacional Barbilla" }
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
      durationHours: { en: "± 6 hours", es: "± 6 horas", todo: true },
      difficulty: 2,                 // 1 = easy, 2 = moderate, 3 = challenging
      groupMin: 1,
      groupMax: 12,                  // largest group the calendar accepts
      pricePerPerson: 65,            // number only, used to estimate total
      childPricePerPerson: null,     // set a number to offer a child rate
      currency: "USD",
      priceIsPlaceholder: true,

      /* Which days can be booked */
      availability: {
        daysOfWeek: [1, 2, 3, 4, 5, 6],   // 0 = Sunday … 6 = Saturday
        minDaysAhead: 2,                  // earliest booking: 2 days from today
        maxMonthsAhead: 12,
        closedDates: [ "2026-12-24", "2026-12-25", "2027-01-01" ]   // YYYY-MM-DD
      },

      /* The 8 stops of the tour, in order */
      stops: [
        {
          key: "park",
          tag: { en: "Protected area", es: "Área protegida" },
          title: { en: "National Park Barbilla", es: "Parque Nacional Barbilla" },
          text: { en: "Step into one of Costa Rica's least-visited national parks, where the Caribbean lowlands rise into the foothills of the Talamanca range. Sector Matina protects rivers, primary forest and an extraordinary diversity of life.",
                  es: "Entra en uno de los parques nacionales menos visitados de Costa Rica, donde las tierras bajas del Caribe se elevan hacia las faldas de la cordillera de Talamanca. El sector Matina protege ríos, bosque primario y una diversidad de vida extraordinaria.", todo: true },
          photos: ["parkLandscape", "riverTall", "tallTree"]
        },
        {
          key: "watchtower",
          tag: { en: "Viewpoint", es: "Mirador" },
          title: { en: "The watchtower", es: "La torre de observación" },
          text: { en: "Climb above the trees and look out over the canopy. At dawn, mist drifts over the ridges and toucans and parrots cross the valley.",
                  es: "Sube por encima de los árboles y contempla el dosel. Al amanecer, la neblina cubre las crestas y los tucanes y loros cruzan el valle.", todo: true },
          photos: ["mistCanopy", "mistTall", "parrots"],
          photoNote: { en: "Photo of the watchtower itself still to come", es: "Falta una foto de la torre", todo: true }
        },
        {
          key: "reforestation",
          tag: { en: "Hands-on", es: "Participativo" },
          title: { en: "Reforestation", es: "Reforestación" },
          text: { en: "See how former pasture is turning back into forest. Meet the people who grow and plant native trees, and plant one yourself.",
                  es: "Descubre cómo antiguos potreros vuelven a ser bosque. Conoce a quienes cultivan y siembran árboles nativos, y siembra uno tú mismo.", todo: true },
          photos: ["sapling", "guide", "leafShadow"],
          impact: { value: 278, total: 2000, unit: "ha",
                    label: { en: "hectares restored of our 2,000 ha goal", es: "hectáreas restauradas de nuestra meta de 2.000 ha", todo: true } }
        },
        {
          key: "biodiversity",
          tag: { en: "Wildlife", es: "Vida silvestre" },
          title: { en: "Biodiversity", es: "Biodiversidad" },
          text: { en: "Hummingbirds, vipers, basilisks, glasswing butterflies, motmots and owls. Your guide knows where to look, and what you are looking at.",
                  es: "Colibríes, víboras, basiliscos, mariposas de alas de cristal, momotos y búhos. Tu guía sabe dónde mirar y qué estás viendo.", todo: true },
          photos: ["hummingbird", "eyelashViper", "basilisk", "glasswing", "aracari", "beetle", "motmot", "owl"],
          layout: "mosaic"
        },
        {
          key: "frogs",
          tag: { en: "Conservation", es: "Conservación" },
          title: { en: "Tree frog conservation", es: "Conservación de ranas arborícolas" },
          text: { en: "Learn how we protect breeding ponds and monitor glass frogs, leaf frogs and red-eyed tree frogs, some of the most threatened animals in the forest.",
                  es: "Aprende cómo protegemos los estanques de reproducción y monitoreamos ranas de vidrio, ranas de hoja y ranas calzonudas, algunos de los animales más amenazados del bosque.", todo: true },
          photos: ["redEyedFrogs", "leafFrog", "glassFrogDiane", "frogEggs", "loquaciousFrogs"]
        },
        {
          key: "arboretum",
          tag: { en: "Native trees", es: "Árboles nativos" },
          title: { en: "The arboretum", es: "El arboreto" },
          text: { en: "Walk among native tree species of the Caribbean lowlands, from giant almendro to medicinal plants, and learn why each one matters to wildlife.",
                  es: "Camina entre especies de árboles nativos de las tierras bajas del Caribe, desde el gran almendro hasta plantas medicinales, y aprende por qué cada una es importante para la fauna.", todo: true },
          photos: ["tallTree", "leafShadow", "tortoiseBeetle"],
          photoNote: { en: "Arboretum photos still to come", es: "Faltan fotos del arboreto", todo: true }
        },
        {
          key: "macaws",
          tag: { en: "Birding", es: "Aves" },
          title: { en: "Great green macaws", es: "Lapas verdes" },
          text: { en: "The great green macaw is endangered, with only a few hundred left in Costa Rica. It depends on the almendro tree. With luck, you'll hear them before you see them.",
                  es: "La lapa verde está en peligro de extinción y quedan solo unos cientos en Costa Rica. Depende del árbol de almendro. Con suerte, las oirás antes de verlas.", todo: true },
          photos: ["macawFlight", "macawPortrait", "macawCanopy"]
        },
        {
          key: "reserve",
          tag: { en: "Private reserve", es: "Reserva privada" },
          title: { en: "The Work with Nature reserve", es: "La reserva Work with Nature" },
          text: { en: "End the day in our own reserve on the edge of the park: clear streams, rocky gorges and forest that is protected for good.",
                  es: "Termina el día en nuestra propia reserva en el borde del parque: quebradas cristalinas, cañones rocosos y bosque protegido para siempre.", todo: true },
          photos: ["riverGorge", "riverTall", "mistTall"]
        }
      ],

      /* Logistics cards */
      logistics: {
        reserve: {
          title: { en: "How to book", es: "Cómo reservar" },
          text: { en: "Choose a date and group size below and send your request. We confirm availability by email or WhatsApp within 24 hours. Your booking is final once we confirm.",
                  es: "Elige una fecha y el tamaño del grupo abajo y envía tu solicitud. Confirmamos disponibilidad por correo o WhatsApp en menos de 24 horas. La reserva queda firme cuando la confirmamos.", todo: true }
        },
        pricing: {
          title: { en: "Pricing", es: "Precio" },
          text: { en: "Per person, including park entrance fee and guide. Children under 12 at a reduced rate. Part of every ticket goes to reforestation.",
                  es: "Por persona, incluye la entrada al parque y el guía. Niños menores de 12 años con tarifa reducida. Parte de cada entrada se destina a la reforestación.", todo: true }
        },
        duration: {
          title: { en: "Duration", es: "Duración" },
          text: { en: "About 6 hours, starting at 7:00 in the morning. Moderate walking on forest trails, about 5 km in total.",
                  es: "Aproximadamente 6 horas, con salida a las 7:00 de la mañana. Caminata moderada por senderos, unos 5 km en total.", todo: true }
        },
        included: {
          title: { en: "What's included", es: "Qué incluye" },
          items: [
            { en: "Licensed local nature guide", es: "Guía local de naturaleza con licencia" },
            { en: "SINAC park entrance fee", es: "Entrada al parque (SINAC)" },
            { en: "Typical Costa Rican lunch", es: "Almuerzo típico costarricense", todo: true },
            { en: "Fresh fruit and drinking water", es: "Fruta fresca y agua", todo: true },
            { en: "Plant your own native tree", es: "Siembra tu propio árbol nativo", todo: true }
          ]
        },
        bring: {
          title: { en: "What to bring", es: "Qué traer" },
          items: [
            { en: "Closed shoes or rubber boots", es: "Zapatos cerrados o botas de hule" },
            { en: "Rain jacket or poncho", es: "Capa o poncho para la lluvia" },
            { en: "Reusable water bottle", es: "Botella de agua reutilizable" },
            { en: "Insect repellent and sunscreen", es: "Repelente y bloqueador solar" },
            { en: "Binoculars and camera", es: "Binoculares y cámara" },
            { en: "ID or passport", es: "Cédula o pasaporte", todo: true }
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
      menu: { en: "Menu", es: "Menú" }
    },
    hero: {
      eyebrow: { en: "Costa Rica · Caribbean lowland rainforest", es: "Costa Rica · Bosque lluvioso del Caribe" },
      titleLine1: { en: "Visit National Park", es: "Visita el Parque Nacional" },
      titleLine2: { en: "Barbilla", es: "Barbilla" },
      subtitle: { en: "A day in wild, little-known rainforest with a local guide, from the watchtower to the macaws.",
                  es: "Un día en un bosque lluvioso salvaje y poco conocido con un guía local, desde la torre de observación hasta las lapas.", todo: true },
      cta: { en: "Book your date", es: "Reserva tu fecha" },
      secondary: { en: "Explore the tour", es: "Conoce el tour" },
      scroll: { en: "Scroll", es: "Desliza" },
      pause: { en: "Pause video", es: "Pausar video" },
      play: { en: "Play video", es: "Reproducir video" }
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
      title: { en: "Eight stops, one day in the forest", es: "Ocho paradas, un día en el bosque" },
      intro: { en: "Follow the trail from the park entrance to our own reserve. Every stop tells part of the story of how this forest is protected and restored.",
               es: "Sigue el sendero desde la entrada del parque hasta nuestra propia reserva. Cada parada cuenta una parte de la historia de cómo se protege y restaura este bosque.", todo: true },
      stop: { en: "Stop", es: "Parada" }
    },
    partners: {
      eyebrow: { en: "Who organises the tour", es: "Quién organiza el tour" },
      title: { en: "Organised by Fundación Work with Nature", es: "Organizado por la Fundación Work with Nature" },
      intro: { en: "We run this tour together with the people who protect and know this forest best. Your visit directly supports the park, local guides and the community.",
               es: "Organizamos este tour junto con quienes mejor protegen y conocen este bosque. Tu visita apoya directamente al parque, a los guías locales y a la comunidad.", todo: true },
      items: [
        { logo: "workWithNature", title: { en: "Fundación Work with Nature", es: "Fundación Work with Nature" },
          text: { en: "Organiser. A Costa Rican foundation restoring rainforest and protecting wildlife on the edge of Barbilla.", es: "Organizador. Una fundación costarricense que restaura el bosque y protege la vida silvestre en el borde de Barbilla.", todo: true } },
        { logo: "sinac", title: { en: "SINAC", es: "SINAC" },
          text: { en: "Costa Rica's National System of Conservation Areas, which manages National Park Barbilla.", es: "El Sistema Nacional de Áreas de Conservación, que administra el Parque Nacional Barbilla." } },
        { icon: "guide", title: { en: "Licensed local guides", es: "Guías locales con licencia" },
          text: { en: "Certified naturalist guides from the communities around the park.", es: "Guías naturalistas certificados de las comunidades alrededor del parque.", todo: true } },
        { icon: "town", title: { en: "Local government", es: "Gobierno local" },
          text: { en: "In cooperation with the Municipality of Matina.", es: "En cooperación con la Municipalidad de Matina.", todo: true } }
      ]
    },
    logistics: {
      eyebrow: { en: "Practical info", es: "Información práctica" },
      title: { en: "Everything you need to know", es: "Todo lo que necesitas saber" }
    },
    booking: {
      eyebrow: { en: "Reservations", es: "Reservas" },
      title: { en: "Pick your day in the forest", es: "Elige tu día en el bosque" },
      intro: { en: "Choose a date and tell us who's coming. This is a request: we'll confirm by email or WhatsApp within 24 hours. No payment yet.",
               es: "Elige una fecha y cuéntanos quién viene. Esto es una solicitud: confirmamos por correo o WhatsApp en menos de 24 horas. Sin pago por ahora.", todo: true },
      date: { en: "Date", es: "Fecha" },
      pickDate: { en: "Pick a date in the calendar", es: "Elige una fecha en el calendario" },
      prevMonth: { en: "Previous month", es: "Mes anterior" },
      nextMonth: { en: "Next month", es: "Mes siguiente" },
      unavailable: { en: "Unavailable", es: "No disponible" },
      available: { en: "Available", es: "Disponible" },
      selected: { en: "Your date", es: "Tu fecha" },
      adults: { en: "Adults", es: "Adultos" },
      children: { en: "Children (under 12)", es: "Niños (menores de 12)" },
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
      total: { en: "Estimated total", es: "Total estimado" },
      priceNote: { en: "Final price confirmed by us.", es: "Precio final confirmado por nosotros." },
      submit: { en: "Send booking request", es: "Enviar solicitud" },
      whatsapp: { en: "Send via WhatsApp", es: "Enviar por WhatsApp" },
      sentTitle: { en: "Almost done", es: "Casi listo" },
      sentText: { en: "Your email app opened with the request filled in. Press send there, and we'll reply within 24 hours. Nothing opened? Email us at", es: "Se abrió tu aplicación de correo con la solicitud. Presiona enviar allí y responderemos en menos de 24 horas. ¿No se abrió nada? Escríbenos a" },
      errors: {
        date: { en: "Choose a date in the calendar.", es: "Elige una fecha en el calendario." },
        name: { en: "Add your name so we know who's coming.", es: "Agrega tu nombre para saber quién viene." },
        email: { en: "Add an email address like name@example.com.", es: "Agrega un correo como nombre@ejemplo.com." },
        group: { en: "Groups can be up to {max} people. For larger groups, email us.", es: "Los grupos pueden ser de hasta {max} personas. Para grupos más grandes, escríbenos." }
      },
      emailSubject: { en: "Booking request", es: "Solicitud de reserva" }
    },
    footer: {
      tagline: { en: "Let nature be the light.", es: "Que la naturaleza sea la luz." },
      contact: { en: "Contact", es: "Contacto" },
      partnersTitle: { en: "In cooperation with", es: "En cooperación con" },
      adopt: { en: "Adopt rainforest", es: "Adopta bosque" },
      rights: { en: "All rights reserved.", es: "Todos los derechos reservados." }
    },
    placeholderBadge: { en: "Placeholder text", es: "Texto provisional" },
    langToggle: { en: "Español", es: "English" }
  }
};
