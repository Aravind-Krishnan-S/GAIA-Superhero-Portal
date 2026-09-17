export interface HeroStat {
  subject: string;
  score: number;
  fullMark: number;
  description: string;
  displayScore?: string;
}

export interface HeroSkill {
  name: string;
  type?: string;
  description: string;
}

export interface HeroAchievement {
  name: string;
  description: string;
  date?: string;
}

export interface Hero {
  id: string;
  name: string;
  role: string;
  image: string;
  imagePosition?: string;
  gallery?: string[];
  isClassified?: boolean;
  backstory: string;
  powerSystem: string;
  skills: HeroSkill[];
  achievements?: HeroAchievement[];
  threatLevel: string;
  rank: string;
  stats: HeroStat[];
}

export const heroes: Hero[] = [
  {
    id: "spectre",
    name: "Spectre",
    role: "Omega Clearance / World-Ender Shard",
    image: "/Moonlit_Immortal_of_Misty_Peaks.png",
    gallery: ["/Spectre.jpg", "/Moonlit_Immortal_of_Misty_Peaks.png"],
    backstory: "Eons ago, the late guardian god of Earth, GAIA, formed a desperate pact with a supreme, immortal entity—a pragmatic and utterly ruthless emperor of the cosmos who seeks only absolute eternity and benefit. To fulfill a transactional vow, this emperor left behind a single \"shard\" of his existence on Earth before departing the universe. Kept in a sealed, top-secret subterranean vault known only to the 0.01% of global authorities, Spectre remains in a perpetual trance. He possesses no memory of his main body’s grand conquests and feels no human emotion. He is the ultimate failsafe, only to be awakened when a cosmic invasion or world-ending anomaly occurs.",
    powerSystem: "Cosmic Severance. Spectre does not manipulate elements; he manipulates the fundamental laws of reality.",
    skills: [
      { name: "Obliteration Flick", type: "OFFENSIVE", description: "A casual physical motion that can shatter space-time within a targeted radius, neutralizing virtually any threat." },
      { name: "Absolute Apathy", type: "DEFENSIVE", description: "Complete immunity to all psychic, emotional, and soul-based attacks." },
      { name: "Chrono-Stasis Nullification", type: "PASSIVE", description: "His existence is independent of time, rendering him completely immune to temporal manipulation, loops, or timeline alterations." },
      { name: "Reality Sunder", type: "OFFENSIVE", description: "Tears the fabric of reality apart to banish cosmic entities or massive energy surges directly into the void." },
      { name: "Absolute Presence", type: "CONTROL", description: "Emits an oppressive existential weight that forces all lesser entities into immediate, unresisting submission." },
      { name: "Dimensional Severance", type: "UTILITY", description: "Cuts through spatial dimensions to instantaneously travel anywhere or cleanly redirect catastrophic planetary attacks." },
      { name: "Matter Annihilation", type: "OFFENSIVE", description: "A mere physical touch can conceptually erase an object or entity from existence at the atomic and informational level." },
      { name: "Unbreakable Vow", type: "PASSIVE", description: "Strictly bound by the ancient pact with GAIA, ensuring his programmed loyalty cannot be compromised or subverted by any cosmic force." },
      { name: "[DATA EXPUNGED]", type: "UNKNOWN", description: "The vast majority of his abilities and true potential remain completely unknown to G.A.I.A. systems." }
    ],
    achievements: [
      { name: "The First Pact", description: "Formed the eternal pact with GAIA, becoming Earth's ultimate failsafe against extinction-level events.", date: "Pre-History" },
      { name: "The Centauri Nullification", description: "Erased an invading Alpha Centauri armada simply by awakening and glaring at the upper atmosphere.", date: "[REDACTED]" },
      { name: "The Void Banishment", description: "Banished a Class-9 Interdimensional Parasite before it could consume the planet's core.", date: "1984" },
      { name: "Subterranean Sealing", description: "Willingly entered a state of perpetual trance within the Omega Vault to prevent ambient reality decay.", date: "1985" }
    ],
    threatLevel: "Omega (Planetary/Universal)",
    rank: "EX-Rank",
    stats: [
      { subject: "Power", score: 10, fullMark: 10, description: "Unmatched cosmic destruction capabilities." },
      { subject: "Melee", score: 10, fullMark: 10, description: "Devastating physical force, though rarely needed." },
      { subject: "Ranged", score: 10, fullMark: 10, description: "Can target reality from across the globe." },
      { subject: "Intelligence", score: 10, fullMark: 10, description: "Operates on primal, vow-based instinct." },
      { subject: "Leadership", score: 10, fullMark: 10, description: "Completely solitary and detached." },
      { subject: "Diplomacy", score: 10, fullMark: 10, description: "Does not negotiate; only executes the vow." }
    ]
  },
  {
    id: "dream-princess",
    name: "Nymeria",
    role: "S-Class / Chaos Sorceress",
    image: "/dream_princess_v2.jpg",
    imagePosition: "top",
    gallery: ["/dream_princess_crimson.jpg", "/dream_princess_v2.jpg"],
    backstory: "Born in a forgotten era, this young woman nearly fell victim to the brutal customs of her time. In her final moments of despair, her latent magical potential erupted, binding her to the fundamental forces of chaotic magic. Encased in a mystical hibernation, she awakened in the modern era. Now navigating a chaotic world with the eternal appearance of a woman in her 20s, she wields ancient, reality-bending crimson magic.",
    powerSystem: "Chaos Resonance. Her abilities are rooted in ancient chaotic energy, allowing her to manipulate reality, heal the wounded, and summon devastating crimson constructs.",
    skills: [
      { name: "Crimson Hex Summoning", type: "OFFENSIVE", description: "Can manifest localized, highly unstable red energy spheres for devastating, precise ranged strikes." },
      { name: "Reality Trance", type: "CONTROL", description: "Emits a frequency that alters the perception of adversaries, placing them into a deeply disoriented, non-violent stupor." },
      { name: "Crimson Blessing", type: "SUPPORT", description: "Large-scale area-of-effect magical restoration and reality-mending magic." }
    ],
    achievements: [
      { name: "Awakening of the Crimson", description: "First eruption of latent chaos magic, surviving the brutal customs of a forgotten era and achieving immortality.", date: "Antiquity" },
      { name: "The London Incident", description: "Contained a Level-5 temporal tear in modern London using localized Crimson Hexes, saving millions.", date: "2012" },
      { name: "Restoration of Sector 4", description: "Used Crimson Blessing to completely mend physical reality after a devastating dimensional incursion left the area shattered.", date: "2023" },
      { name: "The Chaos Treaty", description: "Negotiated a ceasefire with the rogue coven of the Silver Circle by demonstrating overwhelming arcane supremacy.", date: "2024" }
    ],
    threatLevel: "Alpha (National)",
    rank: "S-Rank",
    stats: [
      { subject: "Power", score: 9, fullMark: 10, description: "Highly potent reality-warping capabilities, though sometimes unstable." },
      { subject: "Melee", score: 4, fullMark: 10, description: "Prefers to avoid close-quarters combat." },
      { subject: "Ranged", score: 9, fullMark: 10, description: "Lethal precision with chaotic energy constructs." },
      { subject: "Intelligence", score: 8, fullMark: 10, description: "Carries centuries of mystical wisdom." },
      { subject: "Leadership", score: 7, fullMark: 10, description: "Inspires through raw power and mysterious presence." },
      { subject: "Diplomacy", score: 8, fullMark: 10, description: "Can alter perspectives, though it can be morally ambiguous." }
    ]
  },
  {
    id: "angel",
    name: "Angel",
    role: "A-Class / Umbral Operative",
    image: "/angel.png",
    gallery: ["/angel.png"],
    backstory: "In her early 30s, Angel was already a top-tier espionage agent. During a black-site infiltration, she accidentally absorbed the essence of a bound Shadow Demon. She retained her humanity but gained monstrous abilities. Because manipulating shadows drains her physical stamina at an alarming rate, she requires an immense caloric intake to function, turning this lethal assassin into a massive foodie who knows all the best late-night diners in the city.",
    powerSystem: "Shadow Forging. Complete mastery over darkness, using it for both traversal and lethal combat.",
    skills: [
      { name: "Umbral Armory", type: "CONSTRUCT", description: "Solidifying shadows into razor-sharp blades, chains, or projectiles." },
      { name: "Shadow Step", type: "MOBILITY", description: "Merging perfectly into the shadows to become entirely invisible and intangible, moving silently across walls and floors." }
    ],
    achievements: [
      { name: "The Black Site Infiltration", description: "Successfully infiltrated the impenetrable Omega Black Site, acquiring key intel and inadvertently binding a Shadow Demon.", date: "2018" },
      { name: "Operation Silent Night", description: "Neutralized an entire syndicate of rogue metahumans across three cities without triggering a single alarm or leaving physical evidence.", date: "2021" },
      { name: "The Midnight Feast", description: "Broke the state record for the most caloric intake at 'Joe's Diner' after a grueling 72-hour continuous shadow-op.", date: "2024" },
      { name: "Eclipse Protocol", description: "Successfully evacuated 400 civilians from a collapsing subterranean base by temporarily expanding her shadow to swallow the entire facility.", date: "2025" }
    ],
    threatLevel: "Beta (City/National Assassination)",
    rank: "A-Rank",
    stats: [
      { subject: "Power", score: 7, fullMark: 10, description: "Lethal, but strictly limited by her stamina." },
      { subject: "Melee", score: 8, fullMark: 10, description: "Deadly assassin skills amplified by shadow weapons." },
      { subject: "Ranged", score: 6, fullMark: 10, description: "Can throw shadow-daggers, but prefers close-range." },
      { subject: "Stealth", score: 10, fullMark: 10, description: "Impossible to detect in the dark." },
      { subject: "Leadership", score: 5, fullMark: 10, description: "A lone wolf who prefers solo infiltrations." },
      { subject: "Diplomacy", score: 6, fullMark: 10, description: "Charming, but heavily reliant on spy-craft deceit." }
    ]
  },
  {
    id: "android",
    name: "Android",
    role: "B-Class / Remote Sentinel",
    image: "/android.png",
    gallery: ["/android.png"],
    backstory: "A reclusive, brilliant tech-savvy geek who rarely leaves her heavily fortified server room. Tinkering with advanced localized neural networks and high-performance processing units, she built a highly advanced humanoid robot purely for fun and to run errands outside. When her robot inadvertently interrupted a bank robbery and systematically dismantled the criminals using predictive combat algorithms, she realized she could make a difference. She now fights crime from the comfort of her ergonomic chair.",
    powerSystem: "Algorithmic Dominance. Bypassing biological limitations through raw computing power, distributed data networks, and mechanical force.",
    skills: [
      { name: "Predictive Evasion", type: "DEFENSIVE", description: "Real-time AI processing calculates enemy trajectories instantly, allowing the robot to dodge perfectly." },
      { name: "Modular Arsenal", type: "OFFENSIVE", description: "The robot’s limbs can be swapped out for energy blasters, grappling hooks, or crowd-control sonic emitters." }
    ],
    achievements: [
      { name: "The First Errand", description: "Accidentally thwarted a highly organized bank robbery during the remote robot's first autonomous grocery run.", date: "2022" },
      { name: "Algorithm Upgrade v2.4", description: "Successfully mapped and predicted the crime patterns of the entire metropolitan area, reducing response time by 84%.", date: "2023" },
      { name: "Operation Firestorm", description: "Deployed customized cryo-arsenal limbs to single-handedly contain a chemical factory fire, saving over 300 trapped workers.", date: "2025" },
      { name: "The Zero-Day Patch", description: "Defended the G.A.I.A. mainframe from a coordinated global cyberattack while simultaneously directing 12 remote sentinels in field combat.", date: "2026" }
    ],
    threatLevel: "Beta (City)",
    rank: "B-Rank",
    stats: [
      { subject: "Power", score: 7, fullMark: 10, description: "Strong mechanical output, easily upgradeable." },
      { subject: "Melee", score: 6, fullMark: 10, description: "Algorithmic defense, but lacks human instinct." },
      { subject: "Ranged", score: 8, fullMark: 10, description: "Pinpoint targeting systems." },
      { subject: "Intelligence", score: 10, fullMark: 10, description: "Backed by a genius creator and vast databases." },
      { subject: "Leadership", score: 4, fullMark: 10, description: "Socially awkward creator struggles to command." },
      { subject: "Diplomacy", score: 3, fullMark: 10, description: "The robot’s synthesized voice can be unnerving." }
    ]
  }
];
