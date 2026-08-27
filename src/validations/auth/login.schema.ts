import { z } from 'zod'

export const loginSchema = z.object({
  citizenId: z
    .string()
    .min(1, 'กรุณากรอกเลขบัตรประชาชน')
    .regex(/^[0-9]{13}$/, 'เลขบัตรประชาชนต้องมี 13 หลัก'),

  password: z
    .string()
    .min(1, 'กรุณากรอกรหัสผ่าน'),
})

export type LoginForm = z.infer<typeof loginSchema>