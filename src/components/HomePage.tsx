import React, { useState } from 'react'
import { type Character, DiceService } from '../services/diceService'

// 1. รวม Props ทั้งหมดที่มิติตัวละครเดิมใช้ และระบบเงินใหม่เข้าด้วยกัน
interface HomePageProps {
  character: Character;
  onStartMission: () => void;
  walletGil: number;
  onAddReward: (amount: number) => void;
}

// 2. ดึง Props ทุกตัวออกมากระจายใช้งานภายในคอมโพเนนต์
const HomePage: React.FC<HomePageProps> = ({ character, onStartMission, walletGil, onAddReward }) => {
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
        
        {/* แถบแสดงทุนทรัพย์ที่รับมาจากระบบกระเป๋ากลาง */}
        <div className="ff8-card mb-6 text-center bg-gray-900 border border-ff8-cyan/50 py-3">
          <p className="text-ff8-cyan text-xs uppercase tracking-wider">SEED WALLET BALANCE</p>
          <p className="text-yellow-400 text-2xl font-bold font-mono">💰 {walletGil.toLocaleString()} GIL</p>
        </div>

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
            {(['str', 'mag', 'vit', 'spr', 'spd', 'lck'] as const).map((stat) => (
              <div key={stat} className="bg-ff8-dark p-2 border border-ff8-cyan">
                <p className="text-ff8-cyan text-xs uppercase">{stat}</p>
                <p className="text-white text-xl font-bold">
                  {character.currentStats[stat]}
                </p>
              </div>
            ))}
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
          <h2 className="ff8-title mb-4">Today's Mission</h2>
          <p className="text-gray-300 mb-4">
            A new mission awaits. Are you ready to take on the challenge?
          </p>
          <button
            onClick={onStartMission}
            className="ff8-button w-full bg-ff8-accent text-black mb-3 font-bold"
          >
            ⚔️ START MISSION
          </button>
        </div>

        <div className="ff8-card mb-6">
          <h2 className="ff8-title mb-4">Test Dice Roll</h2>
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