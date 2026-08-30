import { z } from 'zod'

export const personalSchema = z.object({
  nationalId: z
    .string()
    .min(13, 'กรุณากรอกเลขบัตรประชาชน')
    .max(13, 'เลขบัตรประชาชนต้องมี 13 หลัก'),

  prefix: z
    .string()
    .min(1, 'กรุณาเลือกคำนำหน้า'),

  firstName: z
    .string()
    .min(1, 'กรุณากรอกชื่อ'),

  lastName: z
    .string()
    .min(1, 'กรุณากรอกนามสกุล'),

  birthDate: z
    .string()
    .min(1, 'กรุณากรอกวันเกิด'),

  gender: z
    .string()
    .min(1, 'กรุณาเลือกเพศ'),

  maritalStatus: z
    .string()
    .min(1, 'กรุณาเลือกสถานภาพ'),
})