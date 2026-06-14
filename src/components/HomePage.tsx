import React, { useState } from 'react'
// ลบบรรทัดที่ 2 เดิมออก แล้วแทนที่ด้วยบรรทัดนี้ครับ
import { type Character, DiceService } from '../services/diceService'

const HomePage: React.FC = () => {
  const [character] = useState<Character>({
    id: 'char_001',
    name: 'Squall Leonhart',
    baseStats: {
      hp: 45,
      str: 14,
      mag: 12,
      vit: 16,
      spr: 13,
      spd: 15,
      lck: 11,
    },
    currentStats: {
      hp: 45,
      str: 17,
      mag: 15,
      vit: 18,
      spr: 16,
      spd: 17,
      lck: 14,
    },
    junctionedGF: {
      id: 'gf_ifrit',
      name: 'Ifrit',
      element: 'fire',
      bonuses: {
        str: 3,
        mag: -1,
        spr: 1,
      },
      drawableSpells: ['Fire', 'Fira'],
    },
    equipment: {
      weaponName: 'Gunblade',
      weaponModifier: 2,
      armorName: 'SeeD Uniform',
      armorModifier: 1,
    },
  })

  const [rollResult, setRollResult] = useState<string>('')

  const handleTestRoll = () => {
    const result = DiceService.rollD20({
      character,
      attribute: 'mag',
      dc: 12,
      rollName: 'Cast Bolt',
    })

    setRollResult(DiceService.formatRollResult(result))
  }

  return (
    <div className="min-h-screen bg-ff8-dark p-6">
      <div className="max-w-2xl mx-auto">
        <div className="ff8-card mb-6 text-center">
          <h1 className="ff8-title mb-2">SEED Daily Dispatch</h1>
          <p className="text-ff8-cyan text-sm">Final Fantasy VIII D&D RPG</p>
        </div>

        <div className="ff8-card mb-6">
          <h2 className="ff8-title mb-4">Character Sheet</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-ff8-cyan text-sm">NAME</p>
              <p className="text-white text-lg font-bold">{character.name}</p>
            </div>
            <div>
              <p className="text-ff8-cyan text-sm">G.F. JUNCTION</p>
              <p className="text-white text-lg font-bold">
                {character.junctionedGF?.name || 'None'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {(['str', 'mag', 'vit', 'spr', 'spd', 'lck'] as const).map(
              (stat) => (
                <div key={stat} className="bg-ff8-dark p-2 border border-ff8-cyan">
                  <p className="text-ff8-cyan text-xs uppercase">{stat}</p>
                  <p className="text-white text-xl font-bold">
                    {character.currentStats[stat]}
                  </p>
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-ff8-dark p-2 border border-ff8-cyan">
              <p className="text-ff8-cyan text-xs">WEAPON</p>
              <p className="text-white text-sm">{character.equipment.weaponName}</p>
            </div>
            <div className="bg-ff8-dark p-2 border border-ff8-cyan">
              <p className="text-ff8-cyan text-xs">ARMOR</p>
              <p className="text-white text-sm">{character.equipment.armorName}</p>
            </div>
          </div>
        </div>

        <div className="ff8-card mb-6">
          <h2 className="ff8-title mb-4">Test Dice Roll</h2>
          <p className="text-gray-300 mb-4">
            คลิกปุ่มเพื่อทดลองโยน D20 (Magic Check, DC 12)
          </p>
          <button onClick={handleTestRoll} className="ff8-button w-full">
            🎲 Roll D20
          </button>
        </div>

        {rollResult && (
          <div className="ff8-card">
            <pre className="text-ff8-cyan text-xs overflow-auto whitespace-pre-wrap font-mono">
              {rollResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage