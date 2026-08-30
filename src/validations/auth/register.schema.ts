import { z } from 'zod'

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, 'กรุณากรอกชื่อ'),
    lastName: z
      .string()
      .min(1, 'กรุณากรอกนามสกุล'),
    email: z
      .string()
      .min(1, 'กรุณากรอกอีเมล')
      .email('รูปแบบอีเมลไม่ถูกต้อง'),

    phone: z
      .string()
      .min(1, 'กรุณากรอกเบอร์โทรศัพท์')
      .regex(/^[0-9]{10}$/, 'เบอร์โทรศัพท์ต้องมี 10 หลัก'),

    password: z
      .string()
      .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),

    confirmPassword: z
      .string()
      .min(1, 'กรุณายืนยันรหัสผ่าน'),

    agree: z
      .boolean()
      .refine((value) => value, {
        message: 'กรุณายอมรับเงื่อนไขการให้ข้อมูล',
      }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'รหัสผ่านไม่ตรงกัน',
      path: ['confirmPassword'],
    },
  )

export type RegisterForm = z.infer<typeof registerSchema>