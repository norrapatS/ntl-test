import type { IApplicationData, ICreateApplicationRequest } from "@/types/application.interface"

export const toCreateApplicationRequest = (
  application: IApplicationData,
): ICreateApplicationRequest => {
  const {
    personal,
    address,
    income,
    documents,
  } = application

  return {
    nationalId: personal.nationalId,
    prefix: personal.prefix,
    firstName: personal.firstName,
    lastName: personal.lastName,
    gender: personal.gender,
    birthDate: personal.birthDate,
    maritalStatus: personal.maritalStatus,

    houseNo: address.houseNo,
    moo: address.moo,
    road: address.road,
    subDistrict: address.subDistrict,
    district: address.district,
    province: address.province,
    zipcode: address.zipcode,

    occupation: income.occupation,
    monthlyIncome: Number(income.monthlyIncome),
    yearlyIncome: Number(income.yearlyIncome),
    householdSize: Number(income.householdSize),
    landOwned: income.landOwned,

    documents: documents.map((document) => ({
      kind: document.kind,
      name: document.name,
    })),
  }
}