import { FileText, MapPin, Wallet, Upload, CheckCircle2, Send } from "lucide-vue-next"

export const STEPS = [
  'ข้อมูลส่วนตัว',
  'ที่อยู่',
  'รายได้',
  'เอกสาร',
  'ตรวจสอบ',
]

export const HOME_STEPS = [
  {
    icon: FileText,
    title: 'ข้อมูลส่วนตัว',
    desc: 'เลขบัตรประชาชน ชื่อ-สกุล วันเกิด',
  },
  {
    icon: MapPin,
    title: 'ที่อยู่',
    desc: 'ที่อยู่ตามทะเบียนบ้านปัจจุบัน',
  },
  {
    icon: Wallet,
    title: 'รายได้',
    desc: 'อาชีพ รายได้ต่อเดือน/ปี หนี้สิน',
  },
  {
    icon: Upload,
    title: 'อัปโหลดเอกสาร',
    desc: 'บัตรประชาชน ทะเบียนบ้าน หลักฐานรายได้',
  },
  {
    icon: CheckCircle2,
    title: 'ตรวจสอบข้อมูล',
    desc: 'ทบทวนความถูกต้องก่อนยื่น',
  },
  {
    icon: Send,
    title: 'ยื่นคำขอ',
    desc: 'รอเจ้าหน้าที่พิจารณาผล',
  },
]

export const REQUIREMENTS = [
  {
    label: 'รายได้ไม่เกิน',
    value: '100,000 บาท/ปี',
  },
  {
    label: 'อายุ',
    value: '18 ปีบริบูรณ์ขึ้นไป',
  },
  {
    label: 'ระยะเวลาพิจารณา',
    value: 'ภายใน 30 วันทำการ',
  },
]