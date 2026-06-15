// src/utils/relationshipManager.ts
import type{ WaifuCharacter, GiftItem } from '../types/mission';

// 1. ฟังก์ชันซื้อของขวัญและคำนวณแต้ม
export const buyAndGiveGift = (
  currentGil: number,
  character: WaifuCharacter,
  gift: GiftItem
): { success: boolean; nextGil: number; nextAffinity: number; message: string } => {
  
  // กรณีเงินไม่พอ
  if (currentGil < gift.price) {
    return {
      success: false,
      nextGil: currentGil,
      nextAffinity: character.affinity,
      message: 'เงิน Gil ไม่เพียงพอ! ไปทำภารกิจเพิ่มก่อนนะ SeeD!'
    };
  }

  // คำนวณแต้มโบนัสกรณีเป็นของที่ชอบ (คูณ 2)
  const isFavorite = character.favoriteGifts.includes(gift.id);
  const finalBonus = isFavorite ? gift.affinityBonus * 2 : gift.affinityBonus;
  
  // อัปเดตค่าความสัมพันธ์ไม่ให้เกิน Max
  let nextAffinity = character.affinity + finalBonus;
  if (nextAffinity > character.maxAffinity) nextAffinity = character.maxAffinity;

  const nextGil = currentGil - gift.price;
  const thxMessage = isFavorite 
    ? `${character.name}: "ว้าว! นี่มันของโปรดฉันเลยนี่นา! ขอบคุณมากนะ!" (+${finalBonus} แต้ม)`
    : `${character.name}: "ขอบคุณสำหรับของขวัญชิ้นนี้ ชื่นใจจังนะ" (+${finalBonus} แต้ม)`;

  return {
    success: true,
    nextGil,
    nextAffinity,
    message: thxMessage
  };
};

// 2. ฟังก์ชันระบบออกเดท (Date Event System)
export const triggerDateEvent = (
  character: WaifuCharacter
): { canDate: boolean; requiredAffinity: number; narrative: string } => {
  if (character.affinity >= 50) {
    return {
      canDate: true,
      requiredAffinity: 50,
      narrative: `คุณชวน ${character.name} ไปเดินเล่นที่สะพานลอยฟ้าของ Balamb Garden ในยามเย็น ลมโชยมาเบาๆ เธอหันมายิ้มและเล่าเรื่องในใจให้คุณฟัง บรรยากาศโรแมนติกมาก...`
    };
  }
  
  return {
    canDate: false,
    requiredAffinity: 50,
    narrative: `ค่าความสัมพันธ์กับ ${character.name} ยังไม่ถึง 50 คะแนน เธอจึงขอปฏิเสธนัดหมายเดทในตอนนี้ ยืดอกทำภารกิจและเทคแคร์เธอต่ออีกหน่อย!`
  };
};