// src/components/DatingHub.tsx

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EnhancedWaifuCharacter, GiftItem } from '../types/mission'
import { allGifts } from '../data/waifuData'
import { buyAndGiveGift, triggerDateEvent, calculateRelationshipTier } from '../utils/relationshipManager'

interface DatingHubProps {
  gil: number
  characters: EnhancedWaifuCharacter[]
  onUpdateState: (nextGil: number, updatedCharacters: EnhancedWaifuCharacter[]) => void
  onBack: () => void
}

export const DatingHub: React.FC<DatingHubProps> = ({ gil, characters, onUpdateState, onBack }) => {
  const [selectedChar, setSelectedChar] = useState<EnhancedWaifuCharacter>(characters[0])
  const [logMessage, setLogMessage] = useState<string>('💖 ยินดีต้อนรับสู่ห้องสานสัมพันธ์ SeeD...')
  const [showHeartParticles, setShowHeartParticles] = useState(false)
  const [particleKey, setParticleKey] = useState(0)

  const handleGiveGift = (gift: GiftItem) => {
    const result = buyAndGiveGift(gil, selectedChar, gift)

    setLogMessage(result.message)

    if (result.success) {
      // Trigger heart animation
      setShowHeartParticles(true)
      setParticleKey(prev => prev + 1)
      setTimeout(() => setShowHeartParticles(false), 2000)

      // Update characters
      const updatedChars = characters.map(c =>
        c.id === selectedChar.id
          ? {
              ...c,
              affinity: result.nextAffinity,
              relationshipTier: calculateRelationshipTier(result.nextAffinity),
            }
          : c
      )

      onUpdateState(result.nextGil, updatedChars)
      setSelectedChar({
        ...selectedChar,
        affinity: result.nextAffinity,
        relationshipTier: calculateRelationshipTier(result.nextAffinity),
      })
    }
  }

  const handleGoOnDate = () => {
    const dateResult = triggerDateEvent(selectedChar)
    if (dateResult.canDate) {
      setShowHeartParticles(true)
      setParticleKey(prev => prev + 1)
    }
    setLogMessage(dateResult.narrative)
  }

  const getTierColor = (tier: string) => {
    const colors: { [key: string]: string } = {
      stranger: '#999',
      acquaintance: '#4a90e2',
      friend: '#28a745',
      close_friend: '#ff9800',
      romantic_interest: '#f44336',
      in_love: '#e91e63',
      married: '#c2185b',
    }
    return colors[tier] || '#999'
  }

  const getTierLabel = (tier: string) => {
    const labels: { [key: string]: string } = {
      stranger: '👤 คนแปลกหน้า',
      acquaintance: '😊 คุ้นเคย',
      friend: '💚 เพื่อน',
      close_friend: '💛 เพื่อนสนิท',
      romantic_interest: '💓 มีความหมายพิเศษ',
      in_love: '💖 รักเข้าแล้ว',
      married: '💕 สมรส',
    }
    return labels[tier] || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-ff8-dark p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        // Enhanced character profile section
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="ff8-card mb-6 overflow-hidden"
>
  <div className="relative mb-4">
    {/* Character Portrait */}
    
<motion.img
  src={selectedChar.avatar}
  alt={selectedChar.name}
  className="w-24 h-24 rounded border-2 border-ff8-cyan object-cover"
  whileHover={{ scale: 1.1 }}
  onError={e => {
    console.error('Image failed to load:', selectedChar.avatar);
    (e.target as HTMLImageElement).src =
      'https://via.placeholder.com/400x500?text=' + selectedChar.name
  }}
/>

    {/* Overlay with character info */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded flex flex-col justify-end p-4">
      <h2 className="ff8-title text-2xl">{selectedChar.name}</h2>
      <p className="text-ff8-cyan">{selectedChar.title}</p>
    </div>
  </div>

  {/* Character Stats */}
  <div className="grid grid-cols-2 gap-3 mb-4">
    <div className="bg-ff8-dark p-3 rounded border border-ff8-cyan">
      <div className="text-ff8-cyan text-xs">ความสัมพันธ์</div>
      <div className="text-white font-bold text-lg">
        {getTierLabel(selectedChar.relationshipTier)}
      </div>
    </div>
    <div className="bg-ff8-dark p-3 rounded border border-ff8-cyan">
      <div className="text-ff8-cyan text-xs">ความสนิทสนม</div>
      <div className="text-white font-bold text-lg">
        {selectedChar.affinity}%
      </div>
    </div>
  </div>

  {/* Description */}
  <p className="text-white text-sm leading-relaxed mb-3">
    {selectedChar.description}
  </p>

  {/* Personality Tags */}
  <div className="flex flex-wrap gap-2">
    {selectedChar.personality.map(trait => (
      <span
        key={trait}
        className="px-2 py-1 bg-ff8-blue border border-ff8-cyan text-ff8-cyan text-xs rounded"
      >
        {trait}
      </span>
    ))}
  </div>
</motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="ff8-card"
          >
            <h3 className="ff8-title mb-4 text-lg">💕 ตัวละคร</h3>
            {characters.map(char => (
              <motion.button
                key={char.id}
                onClick={() => setSelectedChar(char)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-3 mb-2 rounded text-left transition ${
                  selectedChar.id === char.id
                    ? 'bg-ff8-cyan text-ff8-dark'
                    : 'bg-ff8-blue text-white border border-ff8-cyan'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold">{char.name}</span>
                  <span className="text-sm">{char.affinity}%</span>
                </div>
              </motion.button>
            ))}

            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              className="w-full mt-6 ff8-button border-ff8-red"
            >
              ⬅️ กลับภารกิจ
            </motion.button>
          </motion.div>

          {/* Main Content */}
          <motion.div
            key={selectedChar.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {/* Profile */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="ff8-card mb-6"
            >
              <div className="flex gap-4 mb-4">
                <motion.img
                  src={selectedChar.avatar}
                  alt={selectedChar.name}
                  className="w-24 h-24 rounded border-2 border-ff8-cyan object-cover"
                  whileHover={{ scale: 1.1 }}
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/150?text=SeeD'
                  }}
                />
                <div className="flex-1">
                  <h2 className="ff8-title mb-1">{selectedChar.name}</h2>
                  <p className="text-ff8-cyan text-sm">{selectedChar.title}</p>
                  <p className="text-white text-sm mt-2">{selectedChar.description}</p>
                </div>
              </div>

              {/* Relationship Tier Badge */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block px-3 py-1 rounded text-white font-bold text-sm"
                style={{ backgroundColor: getTierColor(selectedChar.relationshipTier) }}
              >
                {getTierLabel(selectedChar.relationshipTier)}
              </motion.div>
            </motion.div>

            {/* Affinity Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ff8-card mb-6"
            >
              <div className="flex justify-between mb-2 text-sm font-bold">
                <span>ระดับความสัมพันธ์</span>
                <span>{selectedChar.affinity} / {selectedChar.maxAffinity}</span>
              </div>
              <div className="w-full bg-ff8-dark h-4 rounded overflow-hidden border border-ff8-cyan">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(selectedChar.affinity / selectedChar.maxAffinity) * 100}%` }}
                  transition={{ duration: 0.8 }}
                  style={{ background: 'linear-gradient(90deg, #ff4d6d, #ff006e)' }}
                  className="h-full"
                />
              </div>
            </motion.div>

            {/* Message Log */}
            <motion.blockquote
              key={logMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="ff8-card mb-6 border-l-4 border-ff8-cyan p-4 bg-ff8-blue text-white italic"
            >
              {logMessage}
            </motion.blockquote>

            {/* Gift Shop */}
            <motion.div className="ff8-card mb-6">
              <h4 className="ff8-title mb-4 text-lg">🎁 ร้านค้าของขวัญ</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {allGifts.map(gift => {
                  const isFavorite = selectedChar.favoriteGifts.includes(gift.id)
                  const isBF = selectedChar.bfGifts?.includes(gift.id)
                  const isLove = selectedChar.loveGifts?.includes(gift.id)

                  let borderColor = 'border-ff8-cyan'
                  if (isLove) borderColor = 'border-pink-500'
                  else if (isBF) borderColor = 'border-orange-500'
                  else if (isFavorite) borderColor = 'border-red-500'

                  return (
                    <motion.div
                      key={gift.id}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className={`ff8-card border-2 ${borderColor} text-center`}
                    >
                      <div className="text-sm font-bold mb-1">{gift.name}</div>
                      <div className="text-xs text-gray-300 mb-2">{gift.description}</div>
                      <div className="text-yellow-400 font-bold text-sm mb-2">
                        💰 {gift.price}
                      </div>
                      <motion.button
                        onClick={() => handleGiveGift(gift)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-full py-1 px-2 text-xs font-bold rounded transition ${
                          isLove
                            ? 'bg-pink-600 text-white'
                            : isBF
                              ? 'bg-orange-500 text-white'
                              : isFavorite
                                ? 'bg-red-500 text-white'
                                : 'bg-ff8-cyan text-ff8-dark'
                        }`}
                      >
                        {isLove ? '💝 Love' : isBF ? '💝 BF' : isFavorite ? '💝 Fav' : '🎁 Give'}
                      </motion.button>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Date Button */}
            <motion.button
              onClick={handleGoOnDate}
              whileHover={selectedChar.affinity >= 50 ? { scale: 1.05 } : {}}
              whileTap={selectedChar.affinity >= 50 ? { scale: 0.95 } : {}}
              disabled={selectedChar.affinity < 50}
              className={`w-full py-4 ff8-title rounded text-lg transition ${
                selectedChar.affinity >= 50
                  ? 'bg-ff8-accent text-ff8-dark cursor-pointer hover:brightness-110'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {selectedChar.affinity >= 50
                ? '✨ ไปออกเดทด้วยกัน ✨'
                : `🔒 ต้องมี ${50 - Math.floor(selectedChar.affinity)}% เพิ่มเติม`}
            </motion.button>
          </motion.div>
        </div>

        {/* Heart Particles Animation */}
        <AnimatePresence>
          {showHeartParticles &&
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`heart-${particleKey}-${i}`}
                initial={{
                  x: window.innerWidth / 2,
                  y: window.innerHeight / 2,
                  opacity: 1,
                  scale: 1,
                }}
                animate={{
                  x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                  y: window.innerHeight / 2 - Math.random() * 300,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                className="fixed pointer-events-none text-3xl"
                style={{ zIndex: 9999 }}
              >
                💖
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DatingHub