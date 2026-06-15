// src/types/mission.ts

export interface Choice {
  id: string
  text: string
  attribute: 'str' | 'mag' | 'vit' | 'spr' | 'spd' | 'lck'
  dc: number
}

export interface EventNode {
  id: string
  narrative: string
  choices: Choice[]
  isEnd: boolean
  endOutcome?: 'success' | 'failure' | 'partial'
}
// src/types/mission.ts

export type StatType = 'str' | 'mag' | 'vit' | 'spr' | 'spd' | 'lck';

export interface MissionChoice {
  id: string;
  text: string;
  targetNodeId: string;
  // 🎲 BG3 Mechanics
  requiredStat?: StatType;    // ค่าสเตตัสที่ต้องใช้ตรวจ (เช่น 'str')
  difficultyClass?: number;   // ค่า DC ที่ต้องทอยเต๋าให้ผ่าน (เช่น 12)
  
  // 💖 Companion Reactions
  reactions?: {
    quistis?: { affectionChange: number; text: string };
    selphie?: { affectionChange: number; text: string };
    rinoa?: { affectionChange: number; text: string };
  };
}

export interface MissionNode {
  id: string;
  text: string;
  choices: MissionChoice[];
  isEvent?: boolean;
}
export interface Mission {
  id: string
  title: string
  briefing: string
  difficulty: 'easy' | 'normal' | 'hard'
  rootNodeId: string
  nodes: EventNode[]
  rewards: {
    gil: number
    seedRankPoints: number
  }
}

export interface MissionState {
  mission: Mission
  currentNodeId: string
  completed: boolean
  outcome?: 'success' | 'failure' | 'partial'
}
// เพิ่มข้อมูลส่วนนี้ในไฟล์ src/types/mission.ts หรือ types หลักของคุณ

export interface WaifuCharacter {
  id: string;
  name: string;
  title: string;
  avatar: string; // URL หรือ Path รูปภาพ
  affinity: number; // ค่าความสัมพันธ์ (0 - 100)
  maxAffinity: number;
  description: string;
  favoriteGifts: string[]; // ไอเทมที่ชอบเป็นพิเศษ (ถ้าให้จะได้แต้ม x2)
}
export interface GiftItem {
  id: string;
  name: string;
  description: string;
  price: number;
  affinityBonus: number; // แต้มที่จะได้เมื่อให้ของขวัญชิ้นนี้
}

// อัปเดต GameState เดิมของคุณให้มี wallet และสาวๆ
export interface EnhancedGameState {
  wallet: {
    gil: number;
  };
  characters: WaifuCharacter[];
}
// =============== DATING SYSTEM TYPES ===============

// Relationship Tier Names
export type RelationshipTier = 
  | 'stranger' 
  | 'acquaintance' 
  | 'friend' 
  | 'close_friend' 
  | 'romantic_interest' 
  | 'in_love' 
  | 'married'

// Love Story Scene/Milestone
export interface LoveStoryScene {
  id: string
  characterId: string
  requiredAffinity: number // Unlock at this affinity %
  location: string
  title: string
  narrative: string
  rewards: {
    gil?: number
    item?: string
  }
  unlocked: boolean
  viewed: boolean
}

// Enhanced WaifuCharacter with more fields
export interface EnhancedWaifuCharacter extends WaifuCharacter {
  relationshipTier: RelationshipTier
  firstMetDate?: string
  personality: string[]
  likes: string[]
  dislikes: string[]
  favoriteGifts: string[] // Multiple favorites possible
  bfGifts: string[] // Best Friend gifts (x3 bonus)
  loveGifts: string[] // Love gifts (x4 bonus)
  unlockedScenes: string[] // Scene IDs viewed
  companionStats?: {
    dateCount: number
    lastDateDate?: string
    missionsJoined: number
    missionsWon: number
  }
}

// Date Event/Scenario
export interface DateScenario {
  id: string
  characterId: string
  location: string
  minAffinity: number // Unlock at X% affinity
  maxAffinity?: number // Some scenes only at specific tier
  narrative: string
  choices?: {
    text: string
    successCheck?: { stat: StatType; dc: number }
    outcomes: {
      success: string
      failure: string
    }
  }[]
  outcomes: {
    success: { affectionGain: number; narrative: string }
    failure: { affectionGain: number; narrative: string }
  }
}

// Gift with enhanced data
export interface EnhancedGiftItem extends GiftItem {
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  category: 'flower' | 'book' | 'jewelry' | 'weapon' | 'food' | 'special'
  favorableCharacters: string[] // Character IDs that like this gift
  specialEffect?: string // Special lore/effect
}

// Dialogue Option (for conversation system)
export interface DialogueOption {
  id: string
  text: string
  requiredStat?: StatType
  difficultyClass?: number
  outcomes: {
    success: { affectionGain: number; text: string }
    failure: { affectionGain: number; text: string }
  }
}

// Dialogue Tree (for each character)
export interface DialogueTree {
  characterId: string
  minAffinity: number // Only show when affinity > this
  topic: string
  options: DialogueOption[]
}

// Relationship Achievement/Milestone
export interface RelationshipAchievement {
  id: string
  characterId: string
  requiredAffinity: number
  title: string
  description: string
  rewards: {
    gil: number
    item?: string
    title?: string // "Lover of [Character]"
  }
  unlocked: boolean
  unlockedDate?: string
}
// เพิ่มตัวนี้เข้าไปเพื่อเป็นต้นแบบให้ GameState เรียกใช้ครับ
export interface CharacterStats {
  str: number;
  mag: number;
  vit: number;
  spr: number;
  spd: number;
  lck: number;
}
// Enhanced Game State combining both systems
export interface GameState {
  character: {
    stats: CharacterStats
    currentHP: number
  }
  wallet: {
    gil: number
  }
  characters: EnhancedWaifuCharacter[]
  currentDate?: {
    characterId: string
    location: string
    startTime: string
  }
  achievements: {
    relationships: RelationshipAchievement[]
    scenes: LoveStoryScene[]
  }
}

// =============== EXISTING TYPES (Keep as-is) ===============
// Choice, EventNode, Mission, MissionState, WaifuCharacter, GiftItem...