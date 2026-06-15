// src/App.tsx
import React, { useState } from 'react';
import { initialCharacters } from './data/waifuData';
import type { EnhancedWaifuCharacter } from './types/mission';
import { DatingHub } from './components/DatingHub';
import HomePage from './components/HomePage'; 
import MissionPage from './components/MissionPage';

// 🎯 แกะพิมพ์เขียวประเภทข้อมูลตัวละครจาก HomePage มาใช้งานตรง ๆ
type EmbeddedCharacter = React.ComponentProps<typeof HomePage>['character'];

export const App: React.FC = () => {
  // --- 1. State ระบบเงินและจีบสาว ---
  const [gil, setGil] = useState<number>(1000); 
  const [characters, setCharacters] = useState<EnhancedWaifuCharacter[]>(initialCharacters);
  
  // โหมดหน้าจอ: 'mission' (หน้าแรก), 'dating' (จีบสาว), 'active_mission' (ตอนทำภารกิจ)
  const [currentView, setCurrentView] = useState<'mission' | 'dating' | 'active_mission'>('mission');

  // --- 2. ข้อมูลสเตตัสตัวละครเต็มพิกัด (ใช้ Type Assertion การันตีความถูกต้องให้กับสเตตัสเริ่มต้น) ---
  const [character, setCharacter] = useState<EmbeddedCharacter>({
    name: 'Squall Leonhart', 
    currentStats: { 
      hp: 450,
      str: 15, 
      mag: 12, 
      vit: 10, 
      spr: 8, 
      spd: 14, 
      lck: 11 
    },
    equipment: { 
      weaponName: 'Gunblade', 
      weaponModifier: 4,
      armorName: 'SeeD Uniform',
      armorModifier: 2
    },
    junctionedGF: {
      id: 'gf_quezacotl',
      name: 'Quezacotl',
      element: 'thunder',
      bonuses: { str: 0, mag: 2, vit: 0 },
      drawableSpells: ['Thunder', 'Cure', 'Scan']
    }
  } as EmbeddedCharacter); // ใช้ Type Assertion เคลียร์ปัญหาความเข้ากันไม่ได้ของ Object ตัวม็อก

  // --- 3. ฟังก์ชันและอีเวนต์ควบคุมระบบ ---
  const handleStartMission = () => {
    setCurrentView('active_mission'); 
  };

  const handleUpdateDatingState = (nextGil: number, updatedCharacters: EnhancedWaifuCharacter[]) => {
    setGil(nextGil);
    setCharacters(updatedCharacters);
  };

  const handleAddRewardGil = (rewardAmount: number) => {
    setGil(prev => prev + rewardAmount);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#111827', color: '#fff' }}>
      {/* แถบเมนูบนสุด Navbar สไตล์ SeeD */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        padding: '12px', 
        backgroundColor: '#111c24', 
        borderBottom: '2px solid #00f0ff' 
      }}>
        <button 
          onClick={() => setCurrentView('mission')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: currentView === 'mission' ? '#005580' : '#1f2937', 
            color: '#fff', 
            border: currentView === 'mission' ? '1px solid #00f0ff' : '1px solid #374151', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontWeight: 'bold' 
          }}
        >
          ⚔️ หน้าแรก & ภารกิจ SeeD
        </button>
        <button 
          onClick={() => setCurrentView('dating')}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: currentView === 'dating' ? '#991b1b' : '#1f2937', 
            color: '#fff', 
            border: currentView === 'dating' ? '1px solid #f43f5e' : '1px solid #374151', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontWeight: 'bold' 
          }}
        >
          💖 สโมสรจีบสาว (มี {gil} Gil)
        </button>
      </nav>

      {/* สวิตช์สลับเลเยอร์การแสดงผลหน้าจอตามวิวล่าสุด */}
      {currentView === 'mission' && (
        <HomePage 
          character={character}              // ตัวแปรเดิมของคุณ
          onStartMission={handleStartMission} // ฟังก์ชันเดิมของคุณ
          walletGil={gil}                    // กระเป๋าเงินกลาง
          onAddReward={handleAddRewardGil}   // ฟังก์ชันกดบวกเงิน
        />
      )}

      {/* 💖 เชื่อมต่อหน้าจอห้องสานสัมพันธ์ตามที่คุณ Marinn ปรับปรุง */}
      {currentView === 'dating' && (
        <DatingHub 
          gil={gil} 
          characters={characters} 
          onUpdateState={handleUpdateDatingState} 
          onBack={() => setCurrentView('mission')} // กดกลับย้อนมาหน้าแรก SeeD
        />
      )}

      {/* ซ่อมแซมและเปลี่ยนจากกล่องจำลอง ให้ดึง MissionPage ตัวจริงมาทำงาน */}
      {currentView === 'active_mission' && (
        <MissionPage 
          character={character as any} 
          onComplete={(result) => {
            // 1. เพิ่มเงินรางวัล
            handleAddRewardGil(result.success ? 2500 : 500);
            
            // 2. 💖 บันทึกแต้มความรักจากทางเลือกในภารกิจ เข้าสู่ State หลักของสาวๆ
            if (result.affectionUpdates) {
              setCharacters(prevChars => 
                prevChars.map(char => {
                  const key = char.name.toLowerCase() as 'quistis' | 'selphie' | 'rinoa';
                  const bonus = result.affectionUpdates?.[key] || 0;
                  // สลับมาใช้ฟิลด์ affinity ให้ตรงตามโครงสร้างดั้งเดิมของโปรเจกต์คุณ Marinn
                  return { ...char, affinity: Math.max(0, (char.affinity || 0) + bonus) };
                })
              );
            }
            
            setCurrentView('mission');
          }}
          onBack={() => setCurrentView('mission')}
        />
      )}
    </div>
  );
};

export default App;