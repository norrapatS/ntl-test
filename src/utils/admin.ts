import { ApplicationStatus } from "@/types/status.enum"

export const getStatusLabel = (status: string) => {
  switch (status) {
    case ApplicationStatus.PENDING:
      return 'รอตรวจสอบ'
    case ApplicationStatus.APPROVED:
      return 'อนุมัติ'
    case ApplicationStatus.REJECTED:
      return 'ไม่อนุมัติ'
    default:
      return status
  }
}

export const getStatusClass = (status: string) => {
  switch (status) {
    case ApplicationStatus.PENDING:
      return 'bg-yellow-100 text-yellow-700'
    case ApplicationStatus.APPROVED:
      return 'bg-green-100 text-green-700'
    case ApplicationStatus.REJECTED:
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}