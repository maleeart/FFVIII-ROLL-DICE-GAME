// src/data/waifuData.ts
import type { WaifuCharacter, GiftItem } from '../types/mission';

export const mockGifts: GiftItem[] = [
  { id: 'gift_flower', name: 'ดอกไม้เมืองทิมเบอร์', description: 'ดอกไม้สดกลิ่นหอมชวนฝัน ทหารกัลบาดิยายังต้องสยบ', price: 500, affinityBonus: 10 },
  { id: 'gift_book', name: 'นิตยสารอาวุธฉบับพิเศษ', description: 'รวมข้อมูลกลไก Gunblade และกระสุนเวทมนตร์ล้ำสมัย', price: 1500, affinityBonus: 25 },
  { id: 'gift_ring', name: 'แหวนเงินสลักลายกริฟฟอน', description: 'เครื่องประดับแฟชั่นยอดฮิตในหมู่ SeeD ชั้นแนวหน้า', price: 4000, affinityBonus: 60 }
];

export const initialCharacters: WaifuCharacter[] = [
  {
    id: 'quistis',
    name: 'Quistis Trepe',
    title: 'อาจารย์ผู้เข้มงวดแต่ใจดี',
    avatar: 'https://images.uncyc.org/thailand/thumb/e/e0/Quistis_Trepe.JPG/300px-Quistis_Trepe.JPG', // สามารถเปลี่ยนพาทรูปได้ตามใจชอบ
    affinity: 0,
    maxAffinity: 100,
    description: 'อาจารย์ฝึกสอนที่อายุน้อยที่สุดในประวัติศาสตร์ของ Balamb Garden ดูภายนอกสุขุมเยือกเย็น แต่ความจริงห่วงใยลูกศิษย์มาก',
    favoriteGifts: ['gift_book'] // ชอบหนังสือเป็นพิเศษ
  },
  {
    id: 'selphie',
    name: 'Selphie Tilmitt',
    title: 'สาวน้อยผู้ร่าเริงจากสถาบันทราเบีย',
    avatar: 'https://static.wikia.nocookie.net/finalfantasy/images/6/69/FFVIII_Selphie_Tilmitt_Art.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'ประธานคณะกรรมการจัดงานเทศกาลสถาบัน เต็มไปด้วยพลังงานบวกและชอบฮัมเพลงแปลก ๆ เวลาว่าง',
    favoriteGifts: ['gift_flower'] // ชอบดอกไม้
  },
  {
    id: 'rinoa',
    name: 'Rinoa Heartilly',
    title: 'ผู้นำกลุ่มต่อต้าน Forest Owls',
    avatar: 'https://static.wikia.nocookie.net/finalfantasy/images/8/82/FFVIII_Rinoa_Heartilly_Art.png',
    affinity: 0,
    maxAffinity: 100,
    description: 'หญิงสาวผู้รักอิสระและมีความมุ่งมั่นเด็ดเดี่ยว มีสุนัขคู่ใจชื่อแองเจโล่ และเธอกำลังตามหา SeeD ไปช่วยกู้ชาติ',
    favoriteGifts: ['gift_ring'] // ชอบเครื่องประดับ
  }
];