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

export interface ICreateApplicationResponse {
  message: string
  data: {
    id: string
    status: string
  }
}