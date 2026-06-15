// src/data/waifuData.ts

import type { EnhancedWaifuCharacter, GiftItem, DialogueTree, LoveStoryScene, EnhancedGiftItem } from '../types/mission'

// ============================================================
// 🎁 GIFT ITEMS (12 gifts with rarity & category)
// ============================================================

export const allGifts: any[] = [
  // Common (1-10 points)
  {
    id: 'gift_flower',
    name: '🌹 ดอกไม้สดใจแจ่ม',
    description: 'ดอกไม้บานสดใจ ดมแล้วอ่อนใจ',
    price: 500,
    affinityBonus: 10,
    rarity: 'common',
    category: 'flower',
  },
  {
    id: 'gift_chocolate',
    name: '🍫 ช็อกโกแลตสวีท',
    description: 'ช็อกโกแลตกลิ่นหอม หวานเนิ่นนาน',
    price: 800,
    affinityBonus: 12,
    rarity: 'common',
    category: 'food',
  },
  {
    id: 'gift_card',
    name: '💌 จดหมายรักแท้',
    description: 'จดหมายเขียนมือด้วยใจจริง',
    price: 600,
    affinityBonus: 15,
    rarity: 'common',
    category: 'special',
  },

  // Uncommon (10-25 points)
  {
    id: 'gift_book',
    name: '📚 หนังสือปกแสนสวย',
    description: 'หนังสืองานเขียนดีเด่นที่สุด',
    price: 1500,
    affinityBonus: 20,
    rarity: 'uncommon',
    category: 'book',
  },
  {
    id: 'gift_pendant',
    name: '⭐ จี้ดาวแห่งความรัก',
    description: 'จี้เนื้อทองแท้แวว',
    price: 2500,
    affinityBonus: 25,
    rarity: 'uncommon',
    category: 'jewelry',
  },
  {
    id: 'gift_perfume',
    name: '🌸 น้ำหอมกลิ่นลึกลับ',
    description: 'น้ำหอมนำเข้าจากวิลการ์ด',
    price: 2000,
    affinityBonus: 22,
    rarity: 'uncommon',
    category: 'special',
  },

  // Rare (25-50 points)
  {
    id: 'gift_ring',
    name: '💍 แหวนเงินสลักชื่อ',
    description: 'แหวนมงกุฎสะสม สลักชื่อได้',
    price: 4000,
    affinityBonus: 40,
    rarity: 'rare',
    category: 'jewelry',
  },
  {
    id: 'gift_necklace',
    name: '✨ สร้อยคอทองคำสูง',
    description: 'สร้อยคออายุ 1000 ปี จากอารียดา',
    price: 5000,
    affinityBonus: 45,
    rarity: 'rare',
    category: 'jewelry',
  },
  {
    id: 'gift_weapon',
    name: '⚔️ ดาบคมชัดมหัศจรรย์',
    description: 'ดาบประสบการณ์ความรัก',
    price: 6000,
    affinityBonus: 50,
    rarity: 'rare',
    category: 'weapon',
  },

  // Epic (50-100 points)
  {
    id: 'gift_diamond',
    name: '💎 เพชรแดงชาติพันธุ์',
    description: 'เพชรแดงหายากที่สุดในโลก',
    price: 8000,
    affinityBonus: 70,
    rarity: 'epic',
    category: 'jewelry',
  },
  {
    id: 'gift_tiara',
    name: '👑 มงกุฎราชินีแห่งหัวใจ',
    description: 'มงกุฎสัญลักษณ์ของความรัก',
    price: 9000,
    affinityBonus: 80,
    rarity: 'epic',
    category: 'jewelry',
  },

  // Legendary (100+ points)
  {
    id: 'gift_love_potion',
    name: '🧪 น้ำยาความรักแท้',
    description: 'น้ำยาตำนานจากสตรีซอร์เสส',
    price: 15000,
    affinityBonus: 150,
    rarity: 'legendary',
    category: 'special',
  },
]

// ============================================================
// 👩 CHARACTER DATA (7 Characters)
// ============================================================

export const initialCharacters: EnhancedWaifuCharacter[] = [
  {
    id: 'quistis',
    name: 'Quistis Trepe',
    title: '👨‍🏫 อาจารย์ผู้เข้มงวด',
    avatar: '/assets/characters/quistis.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'อาจารย์ผู้อ่อนไหวแต่แฝงใจรัก',
    personality: ['intelligent', 'caring', 'reserved'],
    likes: ['books', 'knowledge', 'responsibility'],
    dislikes: ['chaos', 'laziness', 'disrespect'],
    favoriteGifts: ['gift_book', 'gift_pendant'],
    bfGifts: ['gift_ring'],
    loveGifts: ['gift_diamond'],
    relationshipTier: 'stranger',
    unlockedScenes: [],
    companionStats: {
      dateCount: 0,
      missionsJoined: 0,
      missionsWon: 0,
    },
  },
  {
    id: 'selphie',
    name: 'Selphie Tilmitt',
    title: '🎉 สาวน้อยผู้ร่าเริง',
    avatar:'/assets/characters/selphie.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'สาวผู้เต็มไปด้วยความสุข',
    personality: ['cheerful', 'optimistic', 'social'],
    likes: ['parties', 'flowers', 'happiness'],
    dislikes: ['sadness', 'boredom', 'fighting'],
    favoriteGifts: ['gift_flower', 'gift_chocolate'],
    bfGifts: ['gift_perfume'],
    loveGifts: ['gift_tiara'],
    relationshipTier: 'stranger',
    unlockedScenes: [],
    companionStats: {
      dateCount: 0,
      missionsJoined: 0,
      missionsWon: 0,
    },
  },
  {
    id: 'rinoa',
    name: 'Rinoa Heartilly',
    title: '🌙 ผู้นำกลุ่มต่อต้าน',
    avatar:'/assets/characters/rinoa.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'สาวผู้รักอิสระและมีจิตสำนึก',
    personality: ['passionate', 'brave', 'kind'],
    likes: ['freedom', 'adventure', 'music'],
    dislikes: ['oppression', 'loneliness', 'betrayal'],
    favoriteGifts: ['gift_ring', 'gift_necklace'],
    bfGifts: ['gift_weapon'],
    loveGifts: ['gift_love_potion'],
    relationshipTier: 'stranger',
    unlockedScenes: [],
    companionStats: {
      dateCount: 0,
      missionsJoined: 0,
      missionsWon: 0,
    },
  },
  {
    id: 'irvine',
    name: 'Irvine Kinneas',
    title: '🎯 นายทหารมนต์ขลัง',
    avatar:'/assets/characters/irvine.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'นายทหารพูดจาหวาน ใจโสดา',
    personality: ['charming', 'confident', 'flirty'],
    likes: ['adventure', 'jokes', 'stories'],
    dislikes: ['cowardice', 'betrayal', 'boredom'],
    favoriteGifts: ['gift_weapon', 'gift_card'],
    bfGifts: ['gift_book'],
    loveGifts: ['gift_diamond'],
    relationshipTier: 'stranger',
    unlockedScenes: [],
    companionStats: {
      dateCount: 0,
      missionsJoined: 0,
      missionsWon: 0,
    },
  },
  {
    id: 'edea',
    name: 'Edea Kramer',
    title: '🔮 เสียดสตรีซอร์เสส',
    avatar:'/assets/characters/edea.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'สตรีสูงวัยผู้เต็มไปด้วยปัญญา',
    personality: ['wise', 'mysterious', 'powerful'],
    likes: ['magic', 'knowledge', 'peace'],
    dislikes: ['violence', 'ignorance', 'corruption'],
    favoriteGifts: ['gift_pendant', 'gift_tiara'],
    bfGifts: ['gift_necklace'],
    loveGifts: ['gift_love_potion'],
    relationshipTier: 'stranger',
    unlockedScenes: [],
    companionStats: {
      dateCount: 0,
      missionsJoined: 0,
      missionsWon: 0,
    },
  },
  {
    id: 'laguna',
    name: 'Laguna Loire',
    title: '👑 ประมุขแห่งเอสทาร์',
    avatar:'/assets/characters/laguna.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'ผู้นำประเทศผู้มีน้ำใจด',
    personality: ['diplomatic', 'kind', 'strategic'],
    likes: ['peace', 'family', 'honor'],
    dislikes: ['war', 'betrayal', 'cruelty'],
    favoriteGifts: ['gift_book', 'gift_card'],
    bfGifts: ['gift_ring'],
    loveGifts: ['gift_tiara'],
    relationshipTier: 'stranger',
    unlockedScenes: [],
    companionStats: {
      dateCount: 0,
      missionsJoined: 0,
      missionsWon: 0,
    },
  },
  {
    id: 'ellone',
    name: 'Ellone',
    title: '⏰ นางสาวเวลาปริศนา',
    avatar:'/assets/characters/ellone.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'สาวผู้เก็บเวลาและความลับ',
    personality: ['mysterious', 'caring', 'timid'],
    likes: ['time', 'solitude', 'helping others'],
    dislikes: ['danger', 'loud noise', 'deception'],
    favoriteGifts: ['gift_pendant', 'gift_card'],
    bfGifts: ['gift_perfume'],
    loveGifts: ['gift_diamond'],
    relationshipTier: 'stranger',
    unlockedScenes: [],
    companionStats: {
      dateCount: 0,
      missionsJoined: 0,
      missionsWon: 0,
    },
  },
]

// ============================================================
// 💬 DIALOGUE TREES
// ============================================================

export const dialogueTrees: DialogueTree[] = [
  {
    characterId: 'quistis',
    minAffinity: 0,
    topic: 'เรื่องการศึกษา',
    options: [
      {
        id: 'q_dial_1',
        text: 'คุณอาจารย์เป็นคนเก่งจังเลย',
        difficultyClass: 12,
        requiredStat: 'mag',
        outcomes: {
          success: { affectionGain: 5, text: 'Quistis: ขอบคุณนะ... อืม จริง ๆ' },
          failure: { affectionGain: -2, text: 'Quistis: ...(มองลิบตา)' },
        },
      },
    ],
  },
]

// ============================================================
// 🎬 LOVE STORY SCENES
// ============================================================

export const loveStoryScenes: LoveStoryScene[] = [
  {
    id: 'scene_first_date',
    characterId: 'quistis',
    requiredAffinity: 30,
    location: 'ลานลักษณ์หอคอย',
    title: 'วันแรกของความรัก',
    narrative: 'คุณชวน Quistis ไปเดินเล่นที่หอคอยชมวิว บรรยากาศสวยงาม เธอยิ้มมากขึ้น...',
    unlocked: false,
    viewed: false,
    rewards: { gil: 500 },
  },
  {
    id: 'scene_confession',
    characterId: 'quistis',
    requiredAffinity: 70,
    location: 'ลานลักษณ์หอคอยกลางคืน',
    title: 'คำสารภาพหัวใจ',
    narrative: 'Quistis หันมามองคุณ ดวงตาระยิบระยับ... "ฉันต้องการบอกอะไรกับคุณมานาน"',
    unlocked: false,
    viewed: false,
    rewards: { gil: 1000 },
  },
]