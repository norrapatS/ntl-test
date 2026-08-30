import axios from 'axios'
import { ApiErrorCode } from '@/types/error'

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'เกิดข้อผิดพลาด'
): string => {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  const code = error.response?.data?.code

  switch (code) {
    case ApiErrorCode.INVALID_CREDENTIALS:
      return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'

    case ApiErrorCode.EMAIL_ALREADY_EXISTS:
      return 'อีเมลนี้ถูกใช้งานแล้ว'

    case ApiErrorCode.UNAUTHORIZED:
      return 'กรุณาเข้าสู่ระบบ'

    case ApiErrorCode.FORBIDDEN:
      return 'คุณไม่มีสิทธิ์ดำเนินการนี้'

    case ApiErrorCode.NOT_FOUND:
      return 'ไม่พบข้อมูล'

    case ApiErrorCode.VALIDATION_ERROR:
      return 'ข้อมูลไม่ถูกต้อง'

    default:
      return fallback
  }
}