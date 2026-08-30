import type { IPersonalData, IAddressData, IIncomeData, IDocumentData } from '@/types/application.interface'
import { defineStore } from 'pinia'
import { reactive } from 'vue'



export const useApplicationStore = defineStore('application', () => {
  const personal = reactive<IPersonalData>({
    nationalId: '',
    prefix: 'นาย',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: 'ชาย',
    maritalStatus: 'โสด',
  })

  const address = reactive<IAddressData>({
    houseNo: '',
    moo: '',
    road: '',
    subDistrict: '',
    district: '',
    province: '',
    zipcode: '',
  })

  const income = reactive<IIncomeData>({
    occupation: '',
    monthlyIncome: '',
    yearlyIncome: '',
    householdSize: '',
    debt: '',
    landOwned: 'ไม่มี',
  })

  const documents = reactive<IDocumentData[]>([])

  return {
    personal,
    address,
    income,
    documents,
  }
})