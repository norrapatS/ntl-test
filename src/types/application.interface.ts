export interface ICreateApplicationRequest {
  nationalId: string
  prefix: string
  firstName: string
  lastName: string
  gender: string;
  birthDate: string
  maritalStatus: string
  houseNo: string
  moo: string
  road: string
  subDistrict: string
  district: string
  province: string
  zipcode: string

  occupation: string
  monthlyIncome: number
  yearlyIncome: number
  householdSize: number
  landOwned: string
  documents: {
    kind: string
    name: string
  }[]
}

export interface IPersonalData {
  nationalId: string
  prefix: string
  firstName: string
  lastName: string
  birthDate: string
  gender: string
  maritalStatus: string
}

export interface IAddressData {
  houseNo: string
  moo: string
  road: string
  subDistrict: string
  district: string
  province: string
  zipcode: string
}

export interface IIncomeData {
  occupation: string
  monthlyIncome: string
  yearlyIncome: string
  householdSize: string
  debt: string
  landOwned: string
}

export interface IDocumentData {
  id: string
  name: string
  size: number
  kind: string
}

export interface IApplicationData {
  personal: IPersonalData
  address: IAddressData
  income: IIncomeData
  documents: IDocumentData[]
}

export interface ICreateApplicationResponse {
  message: string
  data: {
    id: string
    status: string
  }
}