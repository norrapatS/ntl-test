import { z } from 'zod'

export const addressSchema = z.object({
  houseNo: z
    .string()
    .min(1, 'กรุณากรอกบ้านเลขที่'),

  moo: z
    .string()
    .min(1, 'กรุณากรอกหมู่'),

  road: z
    .string()
    .min(1, 'กรุณากรอกถนน'),

  subDistrict: z
    .string()
    .min(1, 'กรุณากรอกตำบล'),

  district: z
    .string()
    .min(1, 'กรุณากรอกอำเภอ'),

  province: z
    .string()
    .min(1, 'กรุณากรอกจังหวัด'),

  zipcode: z
    .string()
    .regex(/^\d{5}$/, 'รหัสไปรษณีย์ต้องเป็นตัวเลข 5 หลัก')
})