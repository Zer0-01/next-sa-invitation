type ScheduleItem = {
  title: string;
  time: string;
  note?: string;
};

export type GiftRecipient = {
  /** Short name shown on the recipient tab. */
  name: string;
  /** Full account holder name, as the bank shows it before a transfer. */
  holderName: string;
  bank: string;
  /** Digits only; formatted for display. `null` hides the copy row. */
  account: string | null;
  /** Cropped, unaltered DuitNow QR code. */
  qr: string;
};

export type ContactPerson = {
  name: string;
  role: string;
  /** How the WhatsApp greeting addresses them, e.g. "Puan Hanita". */
  salutation: string;
  /** International format, e.g. "+60 12-237 1756". */
  phoneNumber: string;
};

export const invitationContent = {
  couple: {
    groom: {
      shortName: "Amirul",
      fullName: "Muhammad Amirul Hazeq bin Azizan",
    },
    bride: {
      shortName: "Nurin",
      fullName: "Nurin Qasdina binti Nazaruddin",
    },
  },
  event: {
    label: "Walimatulurus",
    date: "Sabtu, 2 Januari 2027",
    shortDate: "2 Januari 2027",
    compactDate: "02.01.2027",
    time: "11:00 pagi - 4:30 petang",
    venueName: "Dewan Adam Hawa",
    venueArea: "Bangi",
    venueAddress:
      "Lot 16050A, Jalan Rahmat, Kampung Teras Jernang, 43000 Bandar Baru Bangi, Selangor",
    countdownTarget: "2027-01-02T11:00:00+08:00",
    googleCalendarDates: "20270102T033000Z/20270102T080000Z",
    icsStart: "20270102T033000Z",
    icsEnd: "20270102T080000Z",
    rsvpDeadline: "28 Disember 2026",
  },
  dressCode: "Nuansa lembut, pastel, atau earth tone amat dialu-alukan.",
  intro:
    "Dengan penuh kesyukuran, kami menjemput Dato', Datin, Tuan, Puan, Encik, Cik serta seisi keluarga untuk meraikan hari bahagia kami dalam suasana taman yang tenang, romantik, dan penuh kasih.",
  heroText:
    "An invitation to witness a day of love, prayer, and a beginning written with grace.",
  weddingHashtag: "#NurInAmirulsHeart",
  invitationScenes: {
    greeting: {
      openingLine: "Dengan izin Allah dan rahmat-Nya, kami",
      hosts: ["Azizan bin Mahmood", "Hanita binti Jaffar"],
      hostSeparator: "dan",
      invitationLead: "Dengan segala rasa syukur mempersilakan",
      honorifics: "Dato' / Datin / Tuan / Puan / Encik / Cik",
      invitationClose: "seisi keluarga hadir ke Majlis Perkahwinan Putera kami",
      coupleSeparator: "dengan",
      arabicFallback: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
      backgroundSrc: "/images/bg-14.png",
      bismillahSrc: "/images/assalam.png",
      coupleImages: {
        groom: "/images/groom.png",
        bride: "/images/bride.png",
      },
    },
    dateVenue: {
      backgroundSrc: "/images/bg-13.png",
      title: "Sabtu, 2 Januari 2027",
      venueLines: [
        "Lot 16050A, Jalan Rahmat,",
        "Kampung Teras Jernang,",
        "43000 Bandar Baru Bangi, Selangor",
      ],
      schedule: [
        {
          title: "Akad Nikah",
          note: "Keluarga terdekat",
          time: "9.00 AM",
        },
        {
          title: "Resepsi",
          time: "11.30 AM - 4.00 PM",
        },
        {
          title: "Ketibaan Pengantin",
          time: "12.30 PM",
        },
      ] satisfies readonly ScheduleItem[],
    },
    countdown: {
      backgroundSrc: "/images/bg-12.png",
      title: "Menuju Hari Bahagia",
      expiredMessage: "Hari bahagia kami telah tiba. Terima kasih atas doa dan kasih sayang anda.",
    },
  },
  story: [
    {
      title: "Pertemuan yang sederhana",
      description:
        "Sebuah perkenalan yang bermula dengan tenang, lalu tumbuh menjadi keyakinan yang saling menguatkan.",
    },
    {
      title: "Doa dan restu keluarga",
      description:
        "Setiap langkah kami dipenuhi doa, nasihat, dan kasih sayang daripada insan tersayang.",
    },
    {
      title: "Menuju hari bahagia",
      description:
        "Kini kami melangkah ke sebuah ikatan suci, dan besar harapan kami untuk berkongsi momen ini bersama anda.",
    },
  ],
  programme: [
    {
      time: "9:00 pagi",
      event: "Akad Nikah",
      note: "Bersama keluarga terdekat",
    },
    {
      time: "11:00 pagi",
      event: "Ketibaan para tetamu",
      note: "Sesi sambutan dan jamuan bermula",
    },
    {
      time: "12:30 tengah hari",
      event: "Ketibaan pengantin",
      note: "Doa restu dan sesi bergambar",
    },
    {
      time: "4:30 petang",
      event: "Majlis bersurai",
      note: "Terima kasih atas kehadiran dan doa anda",
    },
  ],
  galleryImages: [
    {
      src: "/ustad/ustad-gallery-1.jpeg",
      alt: "Potret Amirul dan Nurin",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-2.jpeg",
      alt: "Momen indah Amirul dan Nurin bersama",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-3.jpeg",
      alt: "Senyuman Amirul dan Nurin",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-4.jpeg",
      alt: "Kenangan manis Amirul dan Nurin",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-5.jpeg",
      alt: "Detik kebersamaan Amirul dan Nurin",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-6.jpeg",
      alt: "Amirul dan Nurin dalam busana sedondon",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-7.jpeg",
      alt: "Saat bahagia Amirul dan Nurin",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-8.jpeg",
      alt: "Langkah bersama Amirul dan Nurin",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
    {
      src: "/ustad/ustad-gallery-9.jpeg",
      alt: "Cerita cinta Amirul dan Nurin",
      sizes: "(min-width: 768px) 320px, (min-width: 640px) 56vw, 76vw",
    },
  ],
  gifts: [
    {
      name: "Amirul",
      // Bank-side name is truncated on the QR ("Muhammad Amirul Hazeq bin");
      // completed from the father's name in the greeting. Confirm before launch.
      holderName: "Muhammad Amirul Hazeq bin Azizan",
      bank: "Maybank",
      account: "014598203532",
      qr: "/ustad/qr-amirul.png",
    },
    {
      name: "Nurin",
      holderName: "Nurin Qasdina binti Nazaruddin",
      bank: "Bank Muamalat",
      account: "12010040358722",
      qr: "/ustad/qr-nurin.png",
    },
  ] satisfies readonly GiftRecipient[],
  contactScene: {
    title: "Hubungi",
  },
  contacts: [
    {
      name: "Hanita",
      role: "Ibu Pengantin",
      salutation: "Puan Hanita",
      phoneNumber: "+60 12-237 1756",
    },
    {
      name: "Fitri",
      role: "Adik Pengantin",
      salutation: "Fitri",
      phoneNumber: "+60 10-900 4851",
    },
    {
      name: "Amida",
      role: "Kakak Pengantin",
      salutation: "Kak Amida",
      phoneNumber: "+60 11-5725 1938",
    },
  ] satisfies readonly ContactPerson[],
} as const;

export type InvitationContent = typeof invitationContent;
