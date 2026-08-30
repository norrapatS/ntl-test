export const formatCitizenId = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 13)

  if (digits.length <= 1) {
    return digits
  }

  if (digits.length <= 5) {
    return `${digits.slice(0, 1)}-${digits.slice(1)}`
  }

  if (digits.length <= 10) {
    return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5)}`
  }

  if (digits.length <= 12) {
    return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10)}`
  }

  return `${digits.slice(0, 1)}-${digits.slice(1, 5)}-${digits.slice(5, 10)}-${digits.slice(10, 12)}-${digits.slice(12)}`
}
