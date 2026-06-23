type ScheduleItem = {
  title: string;
  time: string;
  note?: string;
};

export const invitationContent = {
  couple: {
    groom: {
      shortName: "Danial",
      fullName: "Khairil Danial",
      parents: [
        "Anakanda kepada Khairil Azreen Bin Jamian",
        "dan Kartini Binti Yusof",
      ],
    },
    bride: {
      shortName: "Ain",
      fullName: "Siti Nurdanyizatul Ain",
      parents: [
        "Anakanda kepada Sahrizat Azam Bin Saidin",
        "dan Hasniza Binti Ismail",
      ],
    },
  },
  event: {
    label: "Walimatulurus",
    date: "Ahad, 20 Disember 2026",
    shortDate: "20 Disember 2026",
    compactDate: "20.12.2026",
    time: "11:00 pagi - 4:30 petang",
    venueName: "RIQ Glass Hall",
    venueAddress:
      "Pandan Kapital, Ground Floor, Jalan Pandan Utama, Pandan Indah, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur",
    mapUrl: "https://maps.app.goo.gl/oKhhmjWQJPmHLbu86",
    countdownTarget: "2026-12-20T11:00:00+08:00",
    googleCalendarDates: "20261220T030000Z/20261220T083000Z",
    icsStart: "20261220T030000Z",
    icsEnd: "20261220T083000Z",
  },
  dressCode: "Nuansa lembut, pastel, atau earth tone amat dialu-alukan.",
  intro:
    "Dengan penuh kesyukuran, kami menjemput Dato', Datin, Tuan, Puan, Encik, Cik serta seisi keluarga untuk meraikan hari bahagia kami dalam suasana taman yang tenang, romantik, dan penuh kasih.",
  greetingText:
    "Dengan penuh kesyukuran ke hadrat Ilahi, kami menjemput Tuan / Puan / Encik / Cik seisi keluarga ke majlis perkahwinan kami",
  heroText:
    "An invitation to witness a day of love, prayer, and a beginning written with grace.",
  invitationScenes: {
    greeting: {
      title: "Majlis Perkahwinan Kami",
      arabicFallback: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
      backgroundSrc: "/images/bg-14.png",
      bismillahSrc: "/images/assalam.png",
      coupleImages: {
        groom: "/images/groom.png",
        bride: "/images/bride.png",
      },
      separator: "dan",
    },
    dateVenue: {
      backgroundSrc: "/images/bg-13.png",
      title: "Ahad, 20 Disember 2026",
      venueLines: [
        "Riq Glass Hall, Pandan Kapital",
        "Ground Floor, Jalan Pandan Utama,",
        "Pandan Indah, 55100 Kuala Lumpur,",
        "Wilayah Persekutuan Kuala Lumpur",
      ],
      schedule: [
        {
          title: "Akad Nikah",
          note: "Keluarga terdekat",
          time: "9.00 AM",
        },
        {
          title: "Resepsi",
          time: "11.00 AM - 4.00 PM",
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
      src: "/images/bg-4.png",
      alt: "Floral artwork detail",
      className: "md:translate-y-12",
    },
    {
      src: "/images/bg-5.png",
      alt: "Soft pastel garden painting",
      className: "md:-translate-y-4",
    },
    {
      src: "/images/bg-8.png",
      alt: "Romantic seascape painting",
      className: "md:translate-y-8",
    },
    {
      src: "/images/bg-9.png",
      alt: "Dreamy garden landscape",
      className: "md:-translate-y-10",
    },
  ],
  gifts: [
    {
      name: "Ain",
      bank: "CIMB",
      account: "7633771742",
      qr: "/qr-image.jpeg",
    },
    {
      name: "Danial",
      bank: "CIMB",
      account: "7627870603",
      qr: "/qr-image-danial.jpeg",
    },
  ],
} as const;

export type InvitationContent = typeof invitationContent;
