// src/components/DatingHub.tsx
import React, { useState } from 'react';
import type { WaifuCharacter, GiftItem } from '../types/mission';
import { mockGifts } from '../data/waifuData';
import { buyAndGiveGift, triggerDateEvent } from '../utils/relationshipManager';

interface DatingHubProps {
  gil: number;
  characters: WaifuCharacter[];
  onUpdateState: (nextGil: number, updatedCharacters: WaifuCharacter[]) => void;
  onBack: () => void;
}

export const DatingHub: React.FC<DatingHubProps> = ({ gil, characters, onUpdateState, onBack }) => {
  const [selectedChar, setSelectedChar] = useState<WaifuCharacter>(characters[0]);
  const [logMessage, setLogMessage] = useState<string>('ยินดีต้อนรับสู่ห้องนั่งเล่น SeeD... วันนี้จะชวนใครคุยดี?');

  const handleGiveGift = (gift: GiftItem) => {
    const result = buyAndGiveGift(gil, selectedChar, gift);
    
    setLogMessage(result.message);

    if (result.success) {
      // อัปเดตข้อมูลสาวคนปัจจุบันใน List ตัวละครทั้งหมด
      const updatedChars = characters.map(c => 
        c.id === selectedChar.id ? { ...c, affinity: result.nextAffinity } : c
      );
      // อัปเดต State กลับไปที่จุดควบคุมหลัก (Parent)
      onUpdateState(result.nextGil, updatedChars);
      // อัปเดตหน้าจอตัวที่กำลังเลือกอยู่ด้วย
      setSelectedChar({ ...selectedChar, affinity: result.nextAffinity });
    }
  };

  const handleGoOnDate = () => {
    const dateResult = triggerDateEvent(selectedChar);
    setLogMessage(dateResult.narrative);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2>💖 SeeD Hearts: โหมดสานสัมพันธ์</h2>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffd700' }}>💰 เงินคงเหลือ: {gil} Gil</div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        
        {/* ฝั่งซ้าย: รายชื่อสาว ๆ */}
        <div style={{ borderRight: '1px solid #ddd', paddingRight: '15px' }}>
          <h3>รายชื่อตัวละคร</h3>
          {characters.map(char => (
            <button
              key={char.id}
              onClick={() => {
                setSelectedChar(char);
                setLogMessage(`คุณเดินเข้าไปทักทาย ${char.name}`);
              }}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px',
                marginBottom: '10px',
                backgroundColor: selectedChar.id === char.id ? '#4a90e2' : '#f5f5f5',
                color: selectedChar.id === char.id ? 'white' : 'black',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: selectedChar.id === char.id ? 'bold' : 'normal'
              }}
            >
              {char.name} (💕 {char.affinity}/{char.maxAffinity})
            </button>
          ))}
          
          <button 
            onClick={onBack}
            style={{ width: '100%', marginTop: '30px', padding: '10px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ⬅️ กลับไปหน้าภารกิจ
          </button>
        </div>

        {/* ฝั่งขวา: โปรไฟล์, ร้านค้าของขวัญ และระบบเดท */}
        <div>
          {/* ข้อมูลโปรไฟล์แอป */}
          <div style={{ display: 'flex', gap: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <img 
              src={selectedChar.avatar} 
              alt={selectedChar.name} 
              style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4a90e2' }}
              onError={(e) => {
                // กันเหนียวฟอลแบ็กถ้ารูปแตก
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=SeeD';
              }}
            />
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{selectedChar.name}</h3>
              <p style={{ margin: '0 0 10px 0', color: '#666', fontStyle: 'italic' }}>{selectedChar.title}</p>
              <p style={{ margin: '0', fontSize: '14px', color: '#444' }}>{selectedChar.description}</p>
            </div>
          </div>

          {/* แถบระดับความสัมพันธ์ */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
              <span>ระดับความสนิทสนม</span>
              <span>{selectedChar.affinity} / {selectedChar.maxAffinity} แต้ม</span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#eee', height: '15px', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${(selectedChar.affinity / selectedChar.maxAffinity) * 100}%`, backgroundColor: '#ff4d6d', height: '100%', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          {/* กล่องข้อความตอบกลับ (Dialogue/Log Log) */}
          <blockquote style={{ margin: '0 0 20px 0', padding: '15px', backgroundColor: '#eef5fc', borderLeft: '5px solid #4a90e2', borderRadius: '4px', fontStyle: 'italic' }}>
            {logMessage}
          </blockquote>

          {/* โซนที่ 1: ร้านค้าและเปย์ของขวัญ */}
          <div style={{ marginBottom: '25px' }}>
            <h4>🎁 ซื้อของขวัญให้เธอ</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {mockGifts.map(gift => {
                const isFavorite = selectedChar.favoriteGifts.includes(gift.id);
                return (
                  <div key={gift.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '6px', textAlign: 'center', backgroundColor: '#fff' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{gift.name}</div>
                    <div style={{ fontSize: '12px', color: '#777', minHeight: '32px', margin: '5px 0' }}>{gift.description}</div>
                    <div style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>💰 {gift.price} Gil</div>
                    <button
                      onClick={() => handleGiveGift(gift)}
                      style={{
                        width: '100%',
                        padding: '6px',
                        backgroundColor: isFavorite ? '#ff4d6d' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      {isFavorite ? '💝 ชิ้นโปรด (x2)' : '🎁 มอบให้'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* โซนที่ 2: ปุ่มชวนเดท */}
          <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <h4>🌹 ปฏิบัติการชวนเดท</h4>
            <button
              onClick={handleGoOnDate}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: selectedChar.affinity >= 50 ? '#ff4d6d' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: selectedChar.affinity >= 50 ? 'pointer' : 'not-allowed',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              {selectedChar.affinity >= 50 ? '✨ ไปออกเดทด้วยกันที่หอคอยชมวิว ✨' : '🔒 ต้องมีค่าความสัมพันธ์ 50 แต้มขึ้นไปเพื่อปลดล็อกเดท'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};