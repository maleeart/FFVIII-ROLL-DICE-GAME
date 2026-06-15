// src/utils/relationshipManager.ts

import type { EnhancedWaifuCharacter, GiftItem, RelationshipTier } from '../types/mission'

// ============================================================
// 1. BUY & GIVE GIFT WITH EFFECTS
// ============================================================

export interface GiftResult {
  success: boolean
  nextGil: number
  nextAffinity: number
  message: string
  affinityGain: number
  effectType: 'normal' | 'favorite' | 'bestfriend' | 'love'
  triggerAnimation: boolean
}

export const buyAndGiveGift = (
  currentGil: number,
  character: EnhancedWaifuCharacter,
  gift: GiftItem
): GiftResult => {
  // Check Gil
  if (currentGil < gift.price) {
    return {
      success: false,
      nextGil: currentGil,
      nextAffinity: character.affinity,
      message: `❌ เงิน Gil ไม่เพียงพอ! ต้องการ ${gift.price} แต่เมื่อเดือนนี้มี ${currentGil} แต้ม`,
      affinityGain: 0,
      effectType: 'normal',
      triggerAnimation: false,
    }
  }

  // Calculate bonus based on gift preference
  let bonus = gift.affinityBonus
  let effectType: GiftResult['effectType'] = 'normal'
  let message = ''

  if (character.loveGifts?.includes(gift.id)) {
    // Love gift = x4 bonus
    bonus = gift.affinityBonus * 4
    effectType = 'love'
    message = `💖💖💖 ${character.name}: "นี่มันของฝันของฉันเลยนี่!! เธอจำลาดไว้ในใจฉันจริง ๆ เหรอ!"`
  } else if (character.bfGifts?.includes(gift.id)) {
    // BF gift = x3 bonus
    bonus = gift.affinityBonus * 3
    effectType = 'bestfriend'
    message = `💕💕 ${character.name}: "ว้าว! นี่มันสิ่งที่ฉันอยากได้มากที่สุดเลย! ขอบคุณจริง ๆ"`
  } else if (character.favoriteGifts.includes(gift.id)) {
    // Favorite = x2 bonus
    bonus = gift.affinityBonus * 2
    effectType = 'favorite'
    message = `💗 ${character.name}: "ของขวัญชิ้นนี้... ถูกใจฉันมากเลยนะ!"`
  } else {
    message = `😊 ${character.name}: "ขอบคุณสำหรับของขวัญนะ"`
  }

  // Update affinity (cap at maxAffinity)
  let nextAffinity = character.affinity + bonus
  if (nextAffinity > character.maxAffinity) {
    nextAffinity = character.maxAffinity
  }

  const nextGil = currentGil - gift.price

  return {
    success: true,
    nextGil,
    nextAffinity,
    message,
    affinityGain: bonus,
    effectType,
    triggerAnimation: true,
  }
}

// ============================================================
// 2. CALCULATE RELATIONSHIP TIER
// ============================================================

export const calculateRelationshipTier = (affinity: number): RelationshipTier => {
  if (affinity >= 95) return 'married'
  if (affinity >= 85) return 'in_love'
  if (affinity >= 70) return 'romantic_interest'
  if (affinity >= 50) return 'close_friend'
  if (affinity >= 30) return 'friend'
  if (affinity >= 10) return 'acquaintance'
  return 'stranger'
}

// ============================================================
// 3. TRIGGER DATE EVENT
// ============================================================

export interface DateResult {
  canDate: boolean
  requiredAffinity: number
  narrative: string
  location: string
}

export const triggerDateEvent = (character: EnhancedWaifuCharacter): DateResult => {
  const minAffinity = 50

  if (character.affinity < minAffinity) {
    return {
      canDate: false,
      requiredAffinity: minAffinity,
      narrative: `${character.name}: "ขอโทษนะ... ฉันยังไม่พร้อม ให้เราสานสัมพันธ์กันต่อไปก่อนね"`,
      location: '',
    }
  }

  return {
    canDate: true,
    requiredAffinity: minAffinity,
    narrative: `🌹 คุณชวน ${character.name} ไปเดินเล่นที่สะพานลอยฟ้า ลมโชยมาเบาๆ เธอเชยยิ้มและเล่าเรื่องในใจให้คุณฟัง... 💫`,
    location: 'สะพานลอยฟ้า Balamb',
  }
}

// ============================================================
// 4. UNLOCK LOVE STORY SCENE
// ============================================================

export const checkSceneUnlock = (character: EnhancedWaifuCharacter, sceneId: string): boolean => {
  return character.unlockedScenes.includes(sceneId)
}

// ============================================================
// 5. GET COMPANION BONUS (For missions)
// ============================================================

export interface CompanionBonus {
  statBonus: { [key: string]: number }
  affinityOnWin: number
  narrative: string
}

export const getCompanionBonus = (character: EnhancedWaifuCharacter): CompanionBonus => {
  const tier = calculateRelationshipTier(character.affinity)

  const bonusByTier: { [key in RelationshipTier]: CompanionBonus } = {
    stranger: {
      statBonus: {},
      affinityOnWin: 2,
      narrative: `${character.name} มาช่วยเหลือแต่ยังระวัง`,
    },
    acquaintance: {
      statBonus: { spd: 1 },
      affinityOnWin: 3,
      narrative: `${character.name} เข้าร่วมและยิ้มเล็กน้อย`,
    },
    friend: {
      statBonus: { str: 1, spd: 1 },
      affinityOnWin: 5,
      narrative: `${character.name} ทำงานร่วมกับคุณอย่างสมบูรณ์แบบ`,
    },
    close_friend: {
      statBonus: { str: 2, spd: 1, spr: 1 },
      affinityOnWin: 8,
      narrative: `${character.name} ช่วยเหลือคุณอย่างเต็มที่ ด้วยความรู้สึกเป็นห่วง`,
    },
    romantic_interest: {
      statBonus: { str: 2, mag: 1, spd: 2 },
      affinityOnWin: 12,
      narrative: `${character.name} ต่อสู้เพื่อคุณด้วยความรักและความกล้าหาญ`,
    },
    in_love: {
      statBonus: { str: 3, mag: 1, spd: 2, spr: 1 },
      affinityOnWin: 15,
      narrative: `${character.name} ต่อสู้พร้อมใจด้วยความรักที่ลึกซึ้ง`,
    },
    married: {
      statBonus: { str: 4, mag: 2, spd: 3, spr: 2 },
      affinityOnWin: 20,
      narrative: `${character.name} ต่อสู้ด้วยความสามัคคีของคู่รักที่แท้จริง`,
    },
  }

  return bonusByTier[tier]
}

// ============================================================
// 6. SAVE RELATIONSHIP DATA
// ============================================================

export const saveRelationshipData = (character: EnhancedWaifuCharacter): string => {
  return JSON.stringify(character, null, 2)
}