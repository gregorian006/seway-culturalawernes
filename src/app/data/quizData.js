// Quiz Data - Sumatran Culture
// Theme: Cultural Awareness Challenge

export const quizQuestions = [
  {
    id: 1,
    question: "What is the traditional Batak Toba house shaped like an upside-down boat called?",
    options: [
      "Rumah Gadang",
      "Rumah Bolon",
      "Krong Bade",
      "Limas"
    ],
    correctAnswer: 1,
    explanation: "Rumah Bolon is the traditional Batak Toba house with a roof shaped like an upside-down boat, symbolizing life and safety.",
    difficulty: "medium",
    region: "batak"
  },
  {
    id: 2,
    question: "The Saman Dance from Aceh is typically performed at?",
    options: [
      "Weddings only",
      "Guest welcoming and religious celebrations",
      "Funerals",
      "Regular traditional ceremonies"
    ],
    correctAnswer: 1,
    explanation: "Saman Dance is a traditional Acehnese dance often performed to welcome important guests and during religious celebrations like Maulid Nabi.",
    difficulty: "easy",
    region: "aceh"
  },
  {
    id: 3,
    question: "The famous spicy Minangkabau dish known worldwide is?",
    options: [
      "Soto Medan",
      "Rendang",
      "Pempek",
      "Gudeg"
    ],
    correctAnswer: 1,
    explanation: "Rendang is a traditional Minangkabau meat dish cooked with coconut milk and spices, famous internationally.",
    difficulty: "easy",
    region: "padang"
  },
  {
    id: 4,
    question: "What does the Ulos cloth from Batak symbolize?",
    options: [
      "Home decoration",
      "Warmth, love, and affection",
      "Regular ceremonial tool",
      "Daily clothing"
    ],
    correctAnswer: 1,
    explanation: "In Batak culture, Ulos symbolizes warmth, love, and affection. Giving Ulos means giving blessings and protection.",
    difficulty: "medium",
    region: "batak"
  },
  {
    id: 5,
    question: "The Rumah Gadang in Minangkabau features a roof that resembles?",
    options: [
      "Buffalo horns",
      "Sailing boat",
      "Mountain",
      "Umbrella"
    ],
    correctAnswer: 0,
    explanation: "The Rumah Gadang roof is shaped like buffalo horns (gonjong), symbolizing Minangkabau's victory in a buffalo fight against Majapahit.",
    difficulty: "easy",
    region: "padang"
  },
  {
    id: 6,
    question: "What is the traditional Acehnese percussion instrument called?",
    options: [
      "Angklung",
      "Rapai",
      "Sasando",
      "Kolintang"
    ],
    correctAnswer: 1,
    explanation: "Rapai is a traditional Acehnese percussion instrument often used in various traditional and religious ceremonies.",
    difficulty: "medium",
    region: "aceh"
  },
  {
    id: 7,
    question: "Which society practices the matrilineal kinship system?",
    options: [
      "Batak",
      "Aceh",
      "Minangkabau",
      "Lampung"
    ],
    correctAnswer: 2,
    explanation: "Minangkabau follows a matrilineal system, where lineage is traced through the mother and ancestral property is inherited through the female line.",
    difficulty: "hard",
    region: "padang"
  },
  {
    id: 8,
    question: "Bika Ambon is a traditional cake from which region?",
    options: [
      "Aceh",
      "Medan",
      "Palembang",
      "Padang"
    ],
    correctAnswer: 1,
    explanation: "Bika Ambon is a traditional cake from Medan with a soft, honeycomb-like texture and sweet taste.",
    difficulty: "easy",
    region: "medan"
  },
  {
    id: 9,
    question: "In Batak tradition, a grand wedding celebration is called?",
    options: [
      "Horja",
      "Kenduri",
      "Reception",
      "Traditional Party"
    ],
    correctAnswer: 0,
    explanation: "Horja is the Batak term for a large party or celebration, including weddings that are celebrated very grandly.",
    difficulty: "hard",
    region: "batak"
  },
  {
    id: 10,
    question: "The traditional Acehnese women's dress that covers the entire body except face and hands is?",
    options: [
      "Kebaya",
      "Ulee Balang",
      "Daro Baro",
      "Meukasah"
    ],
    correctAnswer: 1,
    explanation: "Ulee Balang is the traditional Acehnese women's dress that reflects Islamic values by completely covering the body.",
    difficulty: "hard",
    region: "aceh"
  },
  {
    id: 11,
    question: "The philosophy 'Adat Basandi Syarak, Syarak Basandi Kitabullah' originates from?",
    options: [
      "Aceh",
      "Minangkabau",
      "Batak",
      "Lampung"
    ],
    correctAnswer: 1,
    explanation: "This philosophy is from Minangkabau, meaning customs are based on Islamic law, and Islamic law is based on the Quran, showing harmonization of customs and religion.",
    difficulty: "hard",
    region: "padang"
  },
  {
    id: 12,
    question: "Lake Toba was formed by a volcanic eruption approximately?",
    options: [
      "10,000 years ago",
      "74,000 years ago",
      "1,000 years ago",
      "100,000 years ago"
    ],
    correctAnswer: 1,
    explanation: "Lake Toba was formed from a supervolcanic eruption about 74,000 years ago, one of the largest eruptions in Earth's history.",
    difficulty: "hard",
    region: "batak"
  }
];

// Quiz Configuration
export const quizConfig = {
  totalQuestions: 10, // Berapa pertanyaan yang akan ditampilkan dari pool
  passingScore: 70, // Persentase untuk lulus
  timePerQuestion: 30, // Detik per pertanyaan (0 = unlimited)
  showExplanation: true,
  shuffleQuestions: true,
  shuffleOptions: true
};

// Achievement Badges
export const achievementBadges = [
  {
    id: "beginner",
    name: "Cultural Novice",
    description: "Complete your first quiz",
    icon: "🌱",
    requirement: { type: "attempts", value: 1 }
  },
  {
    id: "passing",
    name: "Knowledge Seeker",
    description: "Pass a quiz with 70% or higher",
    icon: "📚",
    requirement: { type: "score", value: 70 }
  },
  {
    id: "expert",
    name: "Cultural Expert",
    description: "Score 90% or higher",
    icon: "🎓",
    requirement: { type: "score", value: 90 }
  },
  {
    id: "perfect",
    name: "Master of Culture",
    description: "Get a perfect score!",
    icon: "👑",
    requirement: { type: "score", value: 100 }
  },
  {
    id: "persistent",
    name: "Persistent Learner",
    description: "Attempt 5 quizzes",
    icon: "💪",
    requirement: { type: "attempts", value: 5 }
  },
  {
    id: "speed",
    name: "Quick Thinker",
    description: "Complete quiz in under 3 minutes",
    icon: "⚡",
    requirement: { type: "time", value: 180 }
  }
];
