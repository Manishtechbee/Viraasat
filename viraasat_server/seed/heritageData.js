import mongoose from "mongoose";
import dotenv from "dotenv";
import Heritage from "../src/models/Heritage.js";

dotenv.config();

const heritageData = [
  {
    name: "Golden Temple",
    slug: "golden-temple",
    description:
      "The Golden Temple, also known as Sri Harmandir Sahib, is one of India's most revered spiritual and cultural landmarks.",
    shortDescription:
      "A magnificent spiritual and cultural landmark in Amritsar.",
    category: "Gurudwara",
    state: "Punjab",
    city: "Amritsar",
    country: "India",
    era: "Medieval",
    builtYear: "1589",
    image:
      "https://images.unsplash.com/photo-1588096344356-3a3a4f4c5c3b",
    images: [],
    rating: 4.9,
    reviewCount: 1240,
    location: {
      latitude: 31.6200,
      longitude: 74.8765,
    },
    tags: ["Punjab", "Sikhism", "Spiritual", "Amritsar"],
    featured: true,
    isActive: true,
  },

  {
    name: "Red Fort",
    slug: "red-fort",
    description:
      "The Red Fort is a historic Mughal fort in Old Delhi and a UNESCO World Heritage Site.",
    shortDescription:
      "An iconic Mughal-era fort and symbol of India's history.",
    category: "Fort",
    state: "Delhi",
    city: "New Delhi",
    country: "India",
    era: "Mughal",
    builtYear: "1639",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    images: [],
    rating: 4.7,
    reviewCount: 980,
    location: {
      latitude: 28.6562,
      longitude: 77.2410,
    },
    tags: ["Delhi", "Mughal", "Fort", "UNESCO"],
    featured: true,
    isActive: true,
  },

  {
    name: "Taj Mahal",
    slug: "taj-mahal",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum built by Mughal emperor Shah Jahan in memory of Mumtaz Mahal.",
    shortDescription:
      "A world-famous monument of Mughal architecture and love.",
    category: "Monument",
    state: "Uttar Pradesh",
    city: "Agra",
    country: "India",
    era: "Mughal",
    builtYear: "1653",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    images: [],
    rating: 4.9,
    reviewCount: 2450,
    location: {
      latitude: 27.1751,
      longitude: 78.0421,
    },
    tags: ["Agra", "Mughal", "UNESCO", "Monument"],
    featured: true,
    isActive: true,
  },

  {
    name: "Amer Fort",
    slug: "amer-fort",
    description:
      "Amer Fort is a magnificent hilltop fort known for its artistic Rajput architecture and grand palaces.",
    shortDescription:
      "A majestic Rajput fort overlooking Maota Lake.",
    category: "Fort",
    state: "Rajasthan",
    city: "Jaipur",
    country: "India",
    era: "Medieval",
    builtYear: "1592",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    images: [],
    rating: 4.8,
    reviewCount: 1100,
    location: {
      latitude: 26.9855,
      longitude: 75.8513,
    },
    tags: ["Jaipur", "Rajasthan", "Rajput", "Fort"],
    featured: true,
    isActive: true,
  },

  {
    name: "Hawa Mahal",
    slug: "hawa-mahal",
    description:
      "Hawa Mahal is an iconic five-story palace in Jaipur built with distinctive pink sandstone architecture.",
    shortDescription:
      "Jaipur's iconic Palace of Winds.",
    category: "Palace",
    state: "Rajasthan",
    city: "Jaipur",
    country: "India",
    era: "Medieval",
    builtYear: "1799",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c4d6b3",
    images: [],
    rating: 4.6,
    reviewCount: 870,
    location: {
      latitude: 26.9239,
      longitude: 75.8267,
    },
    tags: ["Jaipur", "Rajasthan", "Palace", "Rajput"],
    featured: false,
    isActive: true,
  },

  {
    name: "Qutub Minar",
    slug: "qutub-minar",
    description:
      "Qutub Minar is a historic minaret and UNESCO World Heritage Site located in Delhi.",
    shortDescription:
      "A remarkable medieval monument in Delhi.",
    category: "Monument",
    state: "Delhi",
    city: "New Delhi",
    country: "India",
    era: "Medieval",
    builtYear: "1199",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
    images: [],
    rating: 4.7,
    reviewCount: 920,
    location: {
      latitude: 28.5245,
      longitude: 77.1855,
    },
    tags: ["Delhi", "Monument", "UNESCO", "Medieval"],
    featured: false,
    isActive: true,
  },

  {
    name: "Mysore Palace",
    slug: "mysore-palace",
    description:
      "Mysore Palace is a grand royal residence known for its Indo-Saracenic architecture and ornate interiors.",
    shortDescription:
      "A spectacular royal palace in the heart of Mysore.",
    category: "Palace",
    state: "Karnataka",
    city: "Mysore",
    country: "India",
    era: "Colonial",
    builtYear: "1912",
    image:
      "https://images.unsplash.com/photo-1600100397608-f010f9f8a9a9",
    images: [],
    rating: 4.8,
    reviewCount: 760,
    location: {
      latitude: 12.3052,
      longitude: 76.6552,
    },
    tags: ["Mysore", "Karnataka", "Palace", "Royal"],
    featured: true,
    isActive: true,
  },

  {
    name: "Konark Sun Temple",
    slug: "konark-sun-temple",
    description:
      "The Konark Sun Temple is a 13th-century temple designed as a monumental chariot dedicated to the Sun God.",
    shortDescription:
      "A magnificent temple celebrated for its stone carvings.",
    category: "Temple",
    state: "Odisha",
    city: "Konark",
    country: "India",
    era: "Medieval",
    builtYear: "1250",
    image:
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8",
    images: [],
    rating: 4.8,
    reviewCount: 680,
    location: {
      latitude: 19.8876,
      longitude: 86.0945,
    },
    tags: ["Odisha", "Temple", "UNESCO", "Sun Temple"],
    featured: true,
    isActive: true,
  },

  {
    name: "Sanchi Stupa",
    slug: "sanchi-stupa",
    description:
      "Sanchi Stupa is one of India's oldest stone structures and an important Buddhist heritage site.",
    shortDescription:
      "An ancient Buddhist monument with remarkable gateways.",
    category: "Monument",
    state: "Madhya Pradesh",
    city: "Sanchi",
    country: "India",
    era: "Ancient",
    builtYear: "300 BCE",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16",
    images: [],
    rating: 4.6,
    reviewCount: 420,
    location: {
      latitude: 23.4793,
      longitude: 77.7397,
    },
    tags: ["Buddhist", "Madhya Pradesh", "Ancient", "UNESCO"],
    featured: false,
    isActive: true,
  },

  {
    name: "Charminar",
    slug: "charminar",
    description:
      "Charminar is a historic monument in Hyderabad known for its four grand minarets and Indo-Islamic architecture.",
    shortDescription:
      "Hyderabad's iconic four-minaret monument.",
    category: "Monument",
    state: "Telangana",
    city: "Hyderabad",
    country: "India",
    era: "Medieval",
    builtYear: "1591",
    image:
      "https://images.unsplash.com/photo-1609786946678-6f2d5f2e5b4a",
    images: [],
    rating: 4.5,
    reviewCount: 590,
    location: {
      latitude: 17.3616,
      longitude: 78.4747,
    },
    tags: ["Hyderabad", "Telangana", "Islamic", "Monument"],
    featured: false,
    isActive: true,
  },

  {
    name: "Gateway of India",
    slug: "gateway-of-india",
    description:
      "The Gateway of India is a monumental arch built during the British colonial period overlooking Mumbai Harbour.",
    shortDescription:
      "An iconic colonial-era landmark on Mumbai's waterfront.",
    category: "Monument",
    state: "Maharashtra",
    city: "Mumbai",
    country: "India",
    era: "Colonial",
    builtYear: "1924",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
    images: [],
    rating: 4.5,
    reviewCount: 830,
    location: {
      latitude: 18.9220,
      longitude: 72.8347,
    },
    tags: ["Mumbai", "Maharashtra", "Colonial", "Monument"],
    featured: false,
    isActive: true,
  },

  {
    name: "Victoria Memorial",
    slug: "victoria-memorial",
    description:
      "Victoria Memorial is a grand marble monument and museum built in Kolkata during the British colonial era.",
    shortDescription:
      "A magnificent marble landmark in Kolkata.",
    category: "Museum",
    state: "West Bengal",
    city: "Kolkata",
    country: "India",
    era: "Colonial",
    builtYear: "1921",
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255",
    images: [],
    rating: 4.6,
    reviewCount: 510,
    location: {
      latitude: 22.5448,
      longitude: 88.3426,
    },
    tags: ["Kolkata", "West Bengal", "Colonial", "Museum"],
    featured: false,
    isActive: true,
  },

  // 13
  {
    name: "Meenakshi Amman Temple",
    slug: "meenakshi-amman-temple",
    description:
      "Meenakshi Amman Temple is a historic Hindu temple complex famous for its towering gopurams and intricate sculptures.",
    shortDescription:
      "A spectacular Dravidian temple complex in Madurai.",
    category: "Temple",
    state: "Tamil Nadu",
    city: "Madurai",
    country: "India",
    era: "Medieval",
    builtYear: "1623",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220",
    images: [],
    rating: 4.8,
    reviewCount: 1120,
    location: {
      latitude: 9.9195,
      longitude: 78.1193,
    },
    tags: ["Tamil Nadu", "Temple", "Dravidian", "Madurai"],
    featured: true,
    isActive: true,
  },

  // 14
  {
    name: "Brihadeeswarar Temple",
    slug: "brihadeeswarar-temple",
    description:
      "Brihadeeswarar Temple is a magnificent Chola-era temple dedicated to Lord Shiva and celebrated for its monumental architecture.",
    shortDescription:
      "A grand Chola temple and architectural masterpiece.",
    category: "Temple",
    state: "Tamil Nadu",
    city: "Thanjavur",
    country: "India",
    era: "Medieval",
    builtYear: "1010",
    image:
      "https://images.unsplash.com/photo-1600100397608-f010f9f8a9a9",
    images: [],
    rating: 4.9,
    reviewCount: 890,
    location: {
      latitude: 10.7828,
      longitude: 79.1318,
    },
    tags: ["Tamil Nadu", "Chola", "Temple", "UNESCO"],
    featured: true,
    isActive: true,
  },

  // 15
  {
    name: "Mahabalipuram Shore Temple",
    slug: "mahabalipuram-shore-temple",
    description:
      "The Shore Temple is an ancient structural temple complex overlooking the Bay of Bengal and built during the Pallava period.",
    shortDescription:
      "An ancient stone temple beside the Bay of Bengal.",
    category: "Temple",
    state: "Tamil Nadu",
    city: "Mahabalipuram",
    country: "India",
    era: "Ancient",
    builtYear: "725",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
    images: [],
    rating: 4.7,
    reviewCount: 630,
    location: {
      latitude: 12.6161,
      longitude: 80.1996,
    },
    tags: ["Tamil Nadu", "Pallava", "Temple", "UNESCO"],
    featured: true,
    isActive: true,
  },

  // 16
  {
    name: "Ajanta Caves",
    slug: "ajanta-caves",
    description:
      "The Ajanta Caves are ancient Buddhist rock-cut caves famous for their murals, sculptures, and religious art.",
    shortDescription:
      "Ancient Buddhist caves filled with remarkable artwork.",
    category: "Temple",
    state: "Maharashtra",
    city: "Aurangabad",
    country: "India",
    era: "Ancient",
    builtYear: "200 BCE",
    image:
      "https://images.unsplash.com/photo-1625826673198-8d0b5b6b6e0d",
    images: [],
    rating: 4.8,
    reviewCount: 720,
    location: {
      latitude: 20.5519,
      longitude: 75.7033,
    },
    tags: ["Maharashtra", "Buddhist", "Caves", "UNESCO"],
    featured: true,
    isActive: true,
  },

  // 17
  {
    name: "Ellora Caves",
    slug: "ellora-caves",
    description:
      "Ellora Caves are a remarkable complex of rock-cut temples and monasteries representing Buddhist, Hindu, and Jain traditions.",
    shortDescription:
      "A remarkable blend of Buddhist, Hindu, and Jain heritage.",
    category: "Temple",
    state: "Maharashtra",
    city: "Aurangabad",
    country: "India",
    era: "Ancient",
    builtYear: "600",
    image:
      "https://images.unsplash.com/photo-1623050414877-7e7c6d7e4d2a",
    images: [],
    rating: 4.9,
    reviewCount: 940,
    location: {
      latitude: 20.0268,
      longitude: 75.1790,
    },
    tags: ["Maharashtra", "Caves", "Hindu", "Jain", "UNESCO"],
    featured: true,
    isActive: true,
  },

  // 18
  {
    name: "Golconda Fort",
    slug: "golconda-fort",
    description:
      "Golconda Fort is a historic fortress complex known for its impressive walls, gates, palaces, and acoustic architecture.",
    shortDescription:
      "A legendary fortress overlooking Hyderabad.",
    category: "Fort",
    state: "Telangana",
    city: "Hyderabad",
    country: "India",
    era: "Medieval",
    builtYear: "1143",
    image:
      "https://images.unsplash.com/photo-1623596681230-7e4f0f7f7d50",
    images: [],
    rating: 4.6,
    reviewCount: 740,
    location: {
      latitude: 17.3833,
      longitude: 78.4011,
    },
    tags: ["Hyderabad", "Telangana", "Fort", "Qutb Shahi"],
    featured: false,
    isActive: true,
  },

  // 19
  {
    name: "Fatehpur Sikri",
    slug: "fatehpur-sikri",
    description:
      "Fatehpur Sikri is a historic Mughal city built by Emperor Akbar and known for its grand sandstone architecture.",
    shortDescription:
      "A magnificent abandoned Mughal imperial city.",
    category: "Temple",
    state: "Uttar Pradesh",
    city: "Fatehpur Sikri",
    country: "India",
    era: "Mughal",
    builtYear: "1571",
    image:
      "https://images.unsplash.com/photo-1592639296346-560c37a0f711",
    images: [],
    rating: 4.7,
    reviewCount: 610,
    location: {
      latitude: 27.0945,
      longitude: 77.6679,
    },
    tags: ["Mughal", "Uttar Pradesh", "UNESCO", "Architecture"],
    featured: true,
    isActive: true,
  },

  // 20
  {
    name: "Agra Fort",
    slug: "agra-fort",
    description:
      "Agra Fort is a massive red sandstone fortress that served as an important residence of Mughal emperors.",
    shortDescription:
      "A grand Mughal fortress overlooking the Yamuna.",
    category: "Fort",
    state: "Uttar Pradesh",
    city: "Agra",
    country: "India",
    era: "Mughal",
    builtYear: "1565",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523",
    images: [],
    rating: 4.7,
    reviewCount: 850,
    location: {
      latitude: 27.1795,
      longitude: 78.0211,
    },
    tags: ["Agra", "Mughal", "Fort", "UNESCO"],
    featured: true,
    isActive: true,
  },

  // 21
  {
    name: "Jaisalmer Fort",
    slug: "jaisalmer-fort",
    description:
      "Jaisalmer Fort is a spectacular living fort built from golden sandstone and rising dramatically from the Thar Desert.",
    shortDescription:
      "A golden sandstone fort rising from the Thar Desert.",
    category: "Fort",
    state: "Rajasthan",
    city: "Jaisalmer",
    country: "India",
    era: "Medieval",
    builtYear: "1156",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    images: [],
    rating: 4.8,
    reviewCount: 790,
    location: {
      latitude: 26.9124,
      longitude: 70.9125,
    },
    tags: ["Rajasthan", "Jaisalmer", "Rajput", "Fort", "UNESCO"],
    featured: true,
    isActive: true,
  },

  // 22
  {
    name: "Mehrangarh Fort",
    slug: "mehrangarh-fort",
    description:
      "Mehrangarh Fort is one of India's most impressive hill forts, featuring massive walls, palaces, and historical collections.",
    shortDescription:
      "A mighty hill fort overlooking the Blue City.",
    category: "Fort",
    state: "Rajasthan",
    city: "Jodhpur",
    country: "India",
    era: "Medieval",
    builtYear: "1459",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    images: [],
    rating: 4.9,
    reviewCount: 1020,
    location: {
      latitude: 26.2971,
      longitude: 73.0180,
    },
    tags: ["Jodhpur", "Rajasthan", "Rajput", "Fort"],
    featured: true,
    isActive: true,
  },

  // 23
  {
    name: "Chittorgarh Fort",
    slug: "chittorgarh-fort",
    description:
      "Chittorgarh Fort is a vast historic fortress associated with Rajput history, heroic traditions, and magnificent monuments.",
    shortDescription:
      "A legendary Rajput fortress rich in history.",
    category: "Fort",
    state: "Rajasthan",
    city: "Chittorgarh",
    country: "India",
    era: "Medieval",
    builtYear: "734",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33",
    images: [],
    rating: 4.7,
    reviewCount: 570,
    location: {
      latitude: 24.8887,
      longitude: 74.6451,
    },
    tags: ["Rajasthan", "Rajput", "Fort", "UNESCO"],
    featured: false,
    isActive: true,
  },

  // 24
  {
    name: "Rani ki Vav",
    slug: "rani-ki-vav",
    description:
      "Rani ki Vav is an elaborately constructed stepwell famous for its detailed sculptures and Solanki-era architecture.",
    shortDescription:
      "An extraordinary stepwell filled with intricate carvings.",
    category: "Stepwell",
    state: "Gujarat",
    city: "Patan",
    country: "India",
    era: "Medieval",
    builtYear: "1063",
    image:
      "https://images.unsplash.com/photo-1609766857041-ed402ea8069a",
    images: [],
    rating: 4.8,
    reviewCount: 460,
    location: {
      latitude: 23.8589,
      longitude: 72.1016,
    },
    tags: ["Gujarat", "Stepwell", "Solanki", "UNESCO"],
    featured: true,
    isActive: true,
  },

  // 25
  {
    name: "Dholavira",
    slug: "dholavira",
    description:
      "Dholavira is an ancient archaeological site representing one of the major urban settlements of the Indus Valley Civilization.",
    shortDescription:
      "An ancient Harappan city in the Great Rann of Kutch.",
    category: "Temple",
    state: "Gujarat",
    city: "Dholavira",
    country: "India",
    era: "Ancient",
    builtYear: "2500 BCE",
    image:
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d",
    images: [],
    rating: 4.6,
    reviewCount: 310,
    location: {
      latitude: 23.8847,
      longitude: 68.6767,
    },
    tags: ["Gujarat", "Harappan", "Ancient", "UNESCO"],
    featured: false,
    isActive: true,
  },

  // 26
  {
    name: "Nalanda Mahavihara",
    slug: "nalanda-mahavihara",
    description:
      "Nalanda Mahavihara was one of the ancient world's great centers of Buddhist learning and scholarship.",
    shortDescription:
      "An ancient center of learning and Buddhist scholarship.",
    category: "Temple",
    state: "Bihar",
    city: "Nalanda",
    country: "India",
    era: "Ancient",
    builtYear: "450",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16",
    images: [],
    rating: 4.7,
    reviewCount: 390,
    location: {
      latitude: 25.1368,
      longitude: 85.4431,
    },
    tags: ["Bihar", "Buddhist", "Ancient", "UNESCO"],
    featured: false,
    isActive: true,
  },

  // 27
  {
    name: "Basilica of Bom Jesus",
    slug: "basilica-of-bom-jesus",
    description:
      "The Basilica of Bom Jesus is a historic Baroque church in Old Goa and an important example of Portuguese colonial architecture.",
    shortDescription:
      "A historic Baroque church in the heart of Old Goa.",
    category: "Temple",
    state: "Goa",
    city: "Old Goa",
    country: "India",
    era: "Colonial",
    builtYear: "1605",
    image:
      "https://images.unsplash.com/photo-1565514020179-026b92b2d70b",
    images: [],
    rating: 4.6,
    reviewCount: 520,
    location: {
      latitude: 15.5009,
      longitude: 73.9118,
    },
    tags: ["Goa", "Portuguese", "Church", "UNESCO"],
    featured: false,
    isActive: true,
  },

  // 28
  {
    name: "Victoria Terminus",
    slug: "victoria-terminus",
    description:
      "Chhatrapati Shivaji Maharaj Terminus is a grand railway station blending Victorian Gothic and traditional Indian architectural styles.",
    shortDescription:
      "A magnificent fusion of Gothic and Indian architecture.",
    category: "Temple",
    state: "Maharashtra",
    city: "Mumbai",
    country: "India",
    era: "Colonial",
    builtYear: "1888",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
    images: [],
    rating: 4.7,
    reviewCount: 680,
    location: {
      latitude: 18.9402,
      longitude: 72.8356,
    },
    tags: ["Mumbai", "Maharashtra", "Colonial", "UNESCO"],
    featured: false,
    isActive: true,
  },

  // 29
  {
    name: "Howrah Bridge",
    slug: "howrah-bridge",
    description:
      "Howrah Bridge is an iconic cantilever bridge spanning the Hooghly River and representing Kolkata's historic urban landscape.",
    shortDescription:
      "An iconic engineering landmark over the Hooghly River.",
    category: "Temple",
    state: "West Bengal",
    city: "Kolkata",
    country: "India",
    era: "Colonial",
    builtYear: "1943",
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255",
    images: [],
    rating: 4.5,
    reviewCount: 470,
    location: {
      latitude: 22.5851,
      longitude: 88.3468,
    },
    tags: ["Kolkata", "Bridge", "Colonial", "Engineering"],
    featured: false,
    isActive: true,
  },

  // 30
  {
    name: "Rashtrapati Bhavan",
    slug: "rashtrapati-bhavan",
    description:
      "Rashtrapati Bhavan is a monumental presidential residence in New Delhi combining classical European and Indian architectural elements.",
    shortDescription:
      "A grand architectural landmark at the heart of New Delhi.",
    category: "Temple",
    state: "Delhi",
    city: "New Delhi",
    country: "India",
    era: "Colonial",
    builtYear: "1929",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5",
    images: [],
    rating: 4.7,
    reviewCount: 610,
    location: {
      latitude: 28.6143,
      longitude: 77.1994,
    },
    tags: ["Delhi", "Architecture", "Colonial", "New Delhi"],
    featured: true,
    isActive: true,
  },
];


const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Heritage.deleteMany({});

    await Heritage.insertMany(heritageData);

    console.log(
      `Successfully inserted ${heritageData.length} heritage places`
    );

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

export default seedDatabase;