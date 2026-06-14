// 1. นิยามโครงสร้างข้อมูล (Interfaces)
export interface Character {
  id: string
  name: string
  baseStats: {
    hp: number
    str: number
    mag: number
    vit: number
    spr: number
    spd: number
    lck: number
  }
  currentStats: {
    hp: number
    str: number
    mag: number
    vit: number
    spr: number
    spd: number
    lck: number
  }
  junctionedGF?: {
    id: string
    name: string
    element: string
    bonuses: {
      str?: number
      mag?: number
      vit?: number
      spr?: number
      spd?: number
      lck?: number
    }
    drawableSpells: string[]
  }
  equipment: {
    weaponName: string
    weaponModifier: number
    armorName: string
    armorModifier: number
  }
}

export interface RollInput {
  character: Character
  attribute: 'str' | 'mag' | 'vit' | 'spr' | 'spd' | 'lck'
  dc: number
  rollName: string
}

export interface RollResult {
  rollName: string
  characterName: string
  attributeUsed: string
  baseStatValue: number
  diceRoll: number
  modifier: number
  total: number
  dc: number
  isSuccess: boolean
}

// 2. ตัวระบบคำนวณลูกเต๋า (DiceService)
export const DiceService = {
  rollD20(input: RollInput): RollResult {
    const { character, attribute, dc, rollName } = input
    
    // ทอยเต๋า d20 (1-20)
    const diceRoll = Math.floor(Math.random() * 20) + 1
    
    // ดึงค่าสเตตัสปัจจุบัน
    const baseStatValue = character.currentStats[attribute]
    
    // คำนวณ Modifier ตามกฎ (Stat - 10) / 2
    let modifier = Math.floor((baseStatValue - 10) / 2)
    
    // คำนวณแต้มรวม
    const total = diceRoll + modifier
    const isSuccess = total >= dc

    return {
      rollName,
      characterName: character.name,
      attributeUsed: attribute.toUpperCase(),
      baseStatValue,
      diceRoll,
      modifier,
      total,
      dc,
      isSuccess
    }
  },

  formatRollResult(result: RollResult): string {
    return `
=== SEED DISPATCH: ACTION LOG ===
Action: ${result.rollName}
Operator: ${result.characterName}
Check: ${result.attributeUsed} (Stat: ${result.baseStatValue}, Mod: ${result.modifier >= 0 ? '+' : ''}${result.modifier})
---------------------------------
D20 Roll: ${result.diceRoll}
Modifier: ${result.modifier >= 0 ? '+' : ''}${result.modifier}
TOTAL   : ${result.total} vs DC ${result.dc}
RESULT  : ${result.isSuccess ? 'CRITICAL SUCCESS / PASSED' : 'ACTION FAILED'}
=================================
`.trim()
  }
}