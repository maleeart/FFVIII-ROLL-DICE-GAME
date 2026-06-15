// src/components/MissionPage.tsx
import React, { useState } from 'react';
import { trainingCenterMission } from '../data/missions';
import type { MissionChoice, StatType } from '../types/mission';

interface MissionPageProps {
  character: {
    name: string;
    currentStats: Record<StatType, number>;
  };
  // เพิ่มการส่งข้อมูลสาว ๆ เข้ามาอัปเดตค่าความรักเมื่อเกิด Reaction
  onComplete: (result: { success: boolean; gil: number; affectionUpdates?: Record<string, number> }) => void;
  onBack: () => void;
}

export const MissionPage: React.FC<MissionPageProps> = ({ character, onComplete, onBack }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('m1');
  const [rollingChoice, setRollingChoice] = useState<MissionChoice | null>(null);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [rollStatus, setRollStatus] = useState<'idle' | 'rolling' | 'success' | 'fail'>('idle');
  const [reactionLog, setReactionLog] = useState<string[]>([]);
  const [accumulatedAffection, setAccumulatedAffection] = useState<Record<string, number>>({ quistis: 0, selphie: 0, rinoa: 0 });

  const currentNode = trainingCenterMission.find(node => node.id === currentNodeId) || trainingCenterMission[0];

  const handleSelectChoice = (choice: MissionChoice) => {
    // 1. ถ้าเป็นช้อยส์ปกติที่ไม่มีระบบทอยเต๋าตรวจสเตตัส (Skill Check) ให้ข้ามหน้าได้เลย
    if (!choice.requiredStat || !choice.difficultyClass) {
      if (choice.targetNodeId === 'success_end') {
        onComplete({ success: true, gil: 2500, affectionUpdates: accumulatedAffection });
      } else {
        setCurrentNodeId(choice.targetNodeId);
      }
      return;
    }

    // 2. เข้าสู่โหมดทอยเต๋าสไตล์ BG3
    setRollingChoice(choice);
    setRollStatus('rolling');
    setDiceResult(null);
    setTotalScore(null);

    // จำลองอนิเมชันการเขย่าเต๋า D20
    setTimeout(() => {
      const d20 = Math.floor(Math.random() * 20) + 1; // ทอยเต๋า 1-20
      const statBonus = character.currentStats[choice.requiredStat!]; // ดึงโบนัสสเตตัส Squall
      const finalSum = d20 + statBonus;

      setDiceResult(d20);
      setTotalScore(finalSum);

      const isPass = finalSum >= choice.difficultyClass!;
      setRollStatus(isPass ? 'success' : 'fail');

      // 💖 ประมวลผลปฏิกิริยาของสาว ๆ (Companion Reaction)
      if (choice.reactions) {
        const logs: string[] = [];
        const newAffection = { ...accumulatedAffection };

        Object.entries(choice.reactions).forEach(([girl, data]) => {
          newAffection[girl] += data.affectionChange;
          logs.push(`${data.text} (Affection ${data.affectionChange > 0 ? '+' : ''}${data.affectionChange})`);
        });

        setReactionLog(logs);
        setAccumulatedAffection(newAffection);
      }
    }, 1200);
  };

  const handleApplyRollResult = () => {
    if (!rollingChoice) return;

    if (rollStatus === 'success') {
      setCurrentNodeId(rollingChoice.targetNodeId);
    } else {
      // ทอยตก! ส่งไปหน้าล้มเหลว (ม็อกหน้าดีฟอลต์หรือหน้าเจ็บตัว)
      alert('🎲 [CRITICAL FAIL] แต้มทอยไม่ถึงเป้า! คุณพลาดท่าโดน T-Rexaur ฟาดกระเด็น เสียเลือดเนื้อ!');
      onComplete({ success: false, gil: 500, affectionUpdates: accumulatedAffection });
    }

    // ล้างหน้าจอทอยเต๋า
    setRollingChoice(null);
    setRollStatus('idle');
    setReactionLog([]);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'monospace' }}>
      
      {/* หน้าจอหลักบรรยายเนื้อเรื่อง */}
      {rollStatus === 'idle' && (
        <div style={{ backgroundColor: '#1c2630', border: '2px solid #38bdf8', padding: '20px', borderRadius: '8px' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#e2e8f0' }}>{currentNode.text}</p>
          <hr style={{ borderColor: '#374151', margin: '20px 0' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentNode.choices.map(choice => (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice)}
                style={{
                  textAlign: 'left',
                  padding: '14px',
                  backgroundColor: '#0f172a',
                  border: '1px solid #475569',
                  borderRadius: '6px',
                  color: '#f8fafc',
                  cursor: 'pointer',
                  transition: '0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#38bdf8'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#475569'}
              >
                {choice.text}
                {choice.difficultyClass && (
                  <span style={{ float: 'right', color: '#f59e0b', fontWeight: 'bold' }}>
                    [DC: {choice.difficultyClass}]
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🎲 BG3 Dice Roll Screen (เลเยอร์ทอยเต๋าครอบทับเมื่อเลือกความสามารถ) */}
      {rollStatus !== 'idle' && rollingChoice && (
        <div style={{ textAlign: 'center', backgroundColor: '#090d16', padding: '40px', borderRadius: '12px', border: '3px solid #f59e0b' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '8px' }}>🎲 SKILL CHECK IN PROGRESS 🎲</h2>
          <p style={{ color: '#94a3b8' }}>พึ่งพาความสามารถสาย: <strong>{rollingChoice.requiredStat?.toUpperCase()}</strong></p>
          
          <div style={{ margin: '30px auto', width: '120px', height: '120px', lineHeight: '120px', backgroundColor: '#1e293b', border: '4px dashed #f59e0b', borderRadius: '50%', fontSize: '32px', fontWeight: 'bold', color: '#fff' }}>
            {rollStatus === 'rolling' ? '⏳' : diceResult}
          </div>

          <div style={{ fontSize: '18px', color: '#cbd5e1', marginBottom: '20px' }}>
            แต้มเต๋าได้: {diceResult || '?'} + โบนัสสเตตัสของคุณ ({character.currentStats[rollingChoice.requiredStat!]}):{' '}
            <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>{totalScore ?? '?'}</span> 
            <p style={{ fontSize: '14px', color: '#a1a1aa' }}> (แต้มเป้าหมายที่ต้องการบวกผ่านคือ DC: {rollingChoice.difficultyClass})</p>
          </div>

          {/* สรุปผลลัพธ์ความเป็นความตาย */}
          {rollStatus === 'success' && <h3 style={{ color: '#22c55e', fontSize: '24px' }}>🎉 CRITICAL SUCCESS (ผ่าน!)</h3>}
          {rollStatus === 'fail' && <h3 style={{ color: '#ef4444', fontSize: '24px' }}>❌ FAILURE (ล้มเหลว!)</h3>}

          {/* 💖 กล่องบันทึกรีแอคชั่นเพื่อนร่วมปาร์ตี้ (Companion Logs) */}
          {reactionLog.length > 0 && (
            <div style={{ margin: '20px auto', maxWidth: '500px', backgroundColor: '#111c24', borderLeft: '4px solid #ec4899', padding: '12px', textAlign: 'left', borderRadius: '4px' }}>
              <h5 style={{ color: '#ec4899', margin: '0 0 8px 0' }}>💬 ปฏิกิริยาของปาร์ตี้สาว ๆ SeeD:</h5>
              {reactionLog.map((log, index) => (
                <p key={index} style={{ margin: '4px 0', fontSize: '14px', color: '#e2e8f0' }}>{log}</p>
              ))}
            </div>
          )}

          {rollStatus !== 'rolling' && (
            <button
              onClick={handleApplyRollResult}
              style={{ marginTop: '20px', padding: '12px 30px', backgroundColor: '#f59e0b', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
            >
              ดำเนินการต่อ ➡️
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MissionPage;