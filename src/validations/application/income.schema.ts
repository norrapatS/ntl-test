import { z } from 'zod'

export const incomeSchema = z.object({
  occupation: z
    .string()
    .min(1, 'กรุณากรอกอาชีพ'),

  monthlyIncome: z
    .string()
    .min(1, 'กรุณากรอกรายได้ต่อเดือน')
    .refine(
      (value) => !Number.isNaN(Number(value)),
      'รายได้ต้องเป็นตัวเลข',
    )
    .refine(
      (value) => Number(value) >= 0,
      'รายได้ต้องไม่น้อยกว่า 0',
    ),

  yearlyIncome: z
    .string()
    .min(1, 'กรุณากรอกรายได้ต่อปี')
    .refine(
      (value) => !Number.isNaN(Number(value)),
      'รายได้ต้องเป็นตัวเลข',
    )
    .refine(
      (value) => Number(value) >= 0,
      'รายได้ต้องไม่น้อยกว่า 0',
    ),

  householdSize: z
    .string()
    .min(1, 'กรุณากรอกจำนวนสมาชิกในครัวเรือน')
    .refine(
      (value) => Number.isInteger(Number(value)),
      'จำนวนสมาชิกต้องเป็นจำนวนเต็ม',
    )
    .refine(
      (value) => Number(value) >= 1,
      'ต้องมีสมาชิกอย่างน้อย 1 คน',
    ),

  debt: z
    .string()
    .optional(),

  landOwned: z
    .string()
    .min(1, 'กรุณาระบุข้อมูลการถือครองที่ดิน'),
})