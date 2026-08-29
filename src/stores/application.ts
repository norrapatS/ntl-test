// src/stores/application.ts

import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useApplicationStore = defineStore('application', () => {
  const personal = reactive({
    nationalId: '',
    prefix: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
  })

  const address = reactive({
    houseNo: '',
    moo: '',
    road: '',
    subDistrict: '',
    district: '',
    province: '',
    zipcode: '',
  })

  const income = reactive({
    occupation: '',
    monthlyIncome: '',
    yearlyIncome: '',
    householdSize: '',
    debt: '',
    landOwned: '',
  })

  const documents = reactive<
    {
      id: string
      name: string
      size: number
      kind: string
    }[]
  >([])

  return {
    personal,
    address,
    income,
    documents,
  }
})