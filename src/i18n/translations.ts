export const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "lo", label: "ລາວ", short: "ລາວ" },
  { code: "th", label: "ไทย", short: "ไทย" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

const en = {
  nav: {
    pricing: "Pricing",
    virtualTour: "Virtual Tour",
    location: "Location",
    reviews: "Reviews",
    getDayPass: "Get a Day Pass",
    language: "Language",
  },
  hero: {
    taglineStrong: "TRAIN HARD.",
    taglineAccent: "PAY LESS.",
    subtitle:
      "Vientiane's most affordable full-equipment gym. Day passes from ₭20,000.",
    cta: "Take the Virtual Tour",
    scroll: "SCROLL TO EXPLORE",
  },
  pricing: {
    eyebrow: "MEMBERSHIP",
    heading: "Simple, Honest Pricing",
    subtitle:
      "One gym, full access. Pick a day pass with zero commitment, or save more the longer you train with us.",
    included: [
      "Full free-weights floor",
      "Cardio + strength machines",
      "Open 6 days a week, 15:00–20:30",
      "Locker room access",
    ],
    bestValue: "BEST VALUE",
    perMonth: "/ month",
    save: "Save {percent}% vs. monthly",
    noCommitment: "No commitment",
    getStarted: "Get Started",
    footnote:
      "Prices in Lao Kip (₭). Visit us in person to purchase or renew a membership.",
    plans: {
      day: { name: "Day Pass", unit: "/ day" },
      "1m": { name: "1 Month", unit: "/ month" },
      "3m": { name: "3 Months", unit: "/ 3 months" },
      "6m": { name: "6 Months", unit: "/ 6 months" },
      "1y": { name: "1 Year", unit: "/ year" },
    } as Record<string, { name: string; unit: string }>,
  },
  tour: {
    eyebrow: "SEE IT FOR YOURSELF",
    heading: "Take the Virtual Tour",
    subtitle:
      "Real 360° photos from inside the gym. Drag the photo below to look around, and tap a stop to jump to a different spot on the floor.",
    stopOf: "Stop {index} of {total}",
  },
  hours: {
    eyebrow: "HOURS",
    heading: "Find Us & Visit",
    openNow: "Open now",
    closedNow: "Closed now",
    timezone: "Vientiane time",
    closed: "Closed",
    getDirections: "Get Directions",
    days: {
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Sunday: "Sunday",
    } as Record<string, string>,
  },
  reviews: {
    eyebrow: "GOOGLE REVIEWS",
    heading: "What Our Members Say",
    readMore: "Read more reviews on Google Maps",
  },
  footer: {
    tagline: "Vientiane's most affordable full-equipment gym. Train hard, pay less.",
    quickLinks: "QUICK LINKS",
    visitUs: "VISIT US",
    hoursLine: "Mon–Sat: 15:00–20:30",
    sundayClosed: "Sunday: Closed",
    getDirections: "Get Directions",
    rights: "All rights reserved.",
  },
};

export type Translation = typeof en;

const lo: Translation = {
  nav: {
    pricing: "ລາຄາ",
    virtualTour: "ທ່ຽວຊົມແບບເສມືອນ",
    location: "ທີ່ຕັ້ງ",
    reviews: "ຄຳຕິຊົມ",
    getDayPass: "ຮັບບັດລາຍວັນ",
    language: "ພາສາ",
  },
  hero: {
    taglineStrong: "ອອກກຳລັງໜັກ.",
    taglineAccent: "ຈ່າຍໜ້ອຍ.",
    subtitle:
      "ຫ້ອງອອກກຳລັງກາຍທີ່ຄົບຄັນ ແລະ ລາຄາຖືກທີ່ສຸດໃນວຽງຈັນ. ບັດລາຍວັນເລີ່ມຕົ້ນ ₭20,000.",
    cta: "ເລີ່ມທ່ຽວຊົມແບບເສມືອນ",
    scroll: "ເລື່ອນລົງເພື່ອເບິ່ງເພີ່ມ",
  },
  pricing: {
    eyebrow: "ສະມາຊິກ",
    heading: "ລາຄາງ່າຍໆ ແລະ ຊື່ສັດ",
    subtitle:
      "ຫ້ອງອອກກຳລັງກາຍດຽວ ໃຊ້ໄດ້ຄົບຖ້ວນ. ເລືອກບັດລາຍວັນໂດຍບໍ່ຕ້ອງຜູກມັດ ຫຼື ປະຢັດຫຼາຍຂຶ້ນເມື່ອຝຶກກັບພວກເຮົາດົນຂຶ້ນ.",
    included: [
      "ພື້ນທີ່ຍົກນ້ຳໜັກຄົບຄັນ",
      "ເຄື່ອງຄາດິໂອ + ເຄື່ອງສ້າງກ້າມ",
      "ເປີດ 6 ວັນຕໍ່ອາທິດ, 15:00–20:30",
      "ໃຊ້ຫ້ອງລັອກເກີໄດ້",
    ],
    bestValue: "ຄຸ້ມຄ່າທີ່ສຸດ",
    perMonth: "/ ເດືອນ",
    save: "ປະຢັດ {percent}% ທຽບກັບລາຍເດືອນ",
    noCommitment: "ບໍ່ຕ້ອງຜູກມັດ",
    getStarted: "ເລີ່ມເລີຍ",
    footnote:
      "ລາຄາເປັນເງິນກີບລາວ (₭). ກະລຸນາເຂົ້າມາທີ່ຫ້ອງອອກກຳລັງກາຍເພື່ອຊື້ ຫຼື ຕໍ່ອາຍຸສະມາຊິກ.",
    plans: {
      day: { name: "ບັດລາຍວັນ", unit: "/ ວັນ" },
      "1m": { name: "1 ເດືອນ", unit: "/ ເດືອນ" },
      "3m": { name: "3 ເດືອນ", unit: "/ 3 ເດືອນ" },
      "6m": { name: "6 ເດືອນ", unit: "/ 6 ເດືອນ" },
      "1y": { name: "1 ປີ", unit: "/ ປີ" },
    },
  },
  tour: {
    eyebrow: "ເບິ່ງດ້ວຍຕົນເອງ",
    heading: "ທ່ຽວຊົມແບບເສມືອນ",
    subtitle:
      "ຮູບ 360° ຈິງຈາກພາຍໃນຫ້ອງອອກກຳລັງກາຍ. ລາກຮູບຂ້າງລຸ່ມເພື່ອເບິ່ງອ້ອມຮອບ ແລະ ແຕະຈຸດໃດໜຶ່ງເພື່ອຍ້າຍໄປບ່ອນອື່ນ.",
    stopOf: "ຈຸດທີ {index} ຈາກ {total}",
  },
  hours: {
    eyebrow: "ເວລາເປີດ",
    heading: "ຊອກຫາ ແລະ ແວ່ຫາພວກເຮົາ",
    openNow: "ເປີດຢູ່",
    closedNow: "ປິດຢູ່",
    timezone: "ເວລາວຽງຈັນ",
    closed: "ປິດ",
    getDirections: "ຂໍເສັ້ນທາງ",
    days: {
      Monday: "ວັນຈັນ",
      Tuesday: "ວັນອັງຄານ",
      Wednesday: "ວັນພຸດ",
      Thursday: "ວັນພະຫັດ",
      Friday: "ວັນສຸກ",
      Saturday: "ວັນເສົາ",
      Sunday: "ວັນອາທິດ",
    },
  },
  reviews: {
    eyebrow: "ຄຳຕິຊົມ GOOGLE",
    heading: "ສະມາຊິກຂອງພວກເຮົາເວົ້າແນວໃດ",
    readMore: "ອ່ານຄຳຕິຊົມເພີ່ມເຕີມໃນ Google Maps",
  },
  footer: {
    tagline:
      "ຫ້ອງອອກກຳລັງກາຍທີ່ຄົບຄັນ ແລະ ລາຄາຖືກທີ່ສຸດໃນວຽງຈັນ. ອອກກຳລັງໜັກ, ຈ່າຍໜ້ອຍ.",
    quickLinks: "ລິ້ງດ່ວນ",
    visitUs: "ແວ່ຫາພວກເຮົາ",
    hoursLine: "ຈັນ–ເສົາ: 15:00–20:30",
    sundayClosed: "ວັນອາທິດ: ປິດ",
    getDirections: "ຂໍເສັ້ນທາງ",
    rights: "ສະຫງວນລິຂະສິດ.",
  },
};

const th: Translation = {
  nav: {
    pricing: "ราคา",
    virtualTour: "ทัวร์เสมือนจริง",
    location: "ที่ตั้ง",
    reviews: "รีวิว",
    getDayPass: "รับบัตรรายวัน",
    language: "ภาษา",
  },
  hero: {
    taglineStrong: "ฝึกหนัก.",
    taglineAccent: "จ่ายน้อย.",
    subtitle:
      "ฟิตเนสอุปกรณ์ครบครันราคาถูกที่สุดในเวียงจันทน์ บัตรรายวันเริ่มต้น ₭20,000",
    cta: "เริ่มทัวร์เสมือนจริง",
    scroll: "เลื่อนลงเพื่อดูเพิ่ม",
  },
  pricing: {
    eyebrow: "สมาชิก",
    heading: "ราคาเรียบง่าย ตรงไปตรงมา",
    subtitle:
      "ฟิตเนสเดียว เข้าใช้ได้เต็มที่ เลือกบัตรรายวันแบบไม่ผูกมัด หรือประหยัดมากขึ้นเมื่อฝึกกับเรานานขึ้น",
    included: [
      "โซนยกน้ำหนักครบครัน",
      "เครื่องคาร์ดิโอ + เครื่องสร้างกล้าม",
      "เปิด 6 วันต่อสัปดาห์ 15:00–20:30",
      "ใช้ห้องล็อกเกอร์ได้",
    ],
    bestValue: "คุ้มที่สุด",
    perMonth: "/ เดือน",
    save: "ประหยัด {percent}% เทียบรายเดือน",
    noCommitment: "ไม่ผูกมัด",
    getStarted: "เริ่มเลย",
    footnote:
      "ราคาเป็นเงินกีบลาว (₭) กรุณามาที่ฟิตเนสเพื่อซื้อหรือต่ออายุสมาชิก",
    plans: {
      day: { name: "บัตรรายวัน", unit: "/ วัน" },
      "1m": { name: "1 เดือน", unit: "/ เดือน" },
      "3m": { name: "3 เดือน", unit: "/ 3 เดือน" },
      "6m": { name: "6 เดือน", unit: "/ 6 เดือน" },
      "1y": { name: "1 ปี", unit: "/ ปี" },
    },
  },
  tour: {
    eyebrow: "ดูด้วยตาคุณเอง",
    heading: "ทัวร์เสมือนจริง",
    subtitle:
      "ภาพ 360° จริงจากภายในฟิตเนส ลากภาพด้านล่างเพื่อมองรอบๆ และแตะจุดใดจุดหนึ่งเพื่อย้ายไปยังตำแหน่งอื่น",
    stopOf: "จุดที่ {index} จาก {total}",
  },
  hours: {
    eyebrow: "เวลาเปิด",
    heading: "หาเราและแวะมา",
    openNow: "เปิดอยู่",
    closedNow: "ปิดอยู่",
    timezone: "เวลาเวียงจันทน์",
    closed: "ปิด",
    getDirections: "ขอเส้นทาง",
    days: {
      Monday: "วันจันทร์",
      Tuesday: "วันอังคาร",
      Wednesday: "วันพุธ",
      Thursday: "วันพฤหัสบดี",
      Friday: "วันศุกร์",
      Saturday: "วันเสาร์",
      Sunday: "วันอาทิตย์",
    },
  },
  reviews: {
    eyebrow: "รีวิว GOOGLE",
    heading: "สมาชิกของเราว่าอย่างไร",
    readMore: "อ่านรีวิวเพิ่มเติมบน Google Maps",
  },
  footer: {
    tagline: "ฟิตเนสอุปกรณ์ครบครันราคาถูกที่สุดในเวียงจันทน์ ฝึกหนัก จ่ายน้อย",
    quickLinks: "ลิงก์ด่วน",
    visitUs: "แวะมาหาเรา",
    hoursLine: "จ.–ส.: 15:00–20:30",
    sundayClosed: "วันอาทิตย์: ปิด",
    getDirections: "ขอเส้นทาง",
    rights: "สงวนลิขสิทธิ์",
  },
};

export const translations: Record<LanguageCode, Translation> = { en, lo, th };

/** Fill `{token}` placeholders in a translated string. */
export function interpolate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}
