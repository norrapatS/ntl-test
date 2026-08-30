export interface ILoginRequest {
  email: string
  password: string
}

export interface IRegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface ILoginResponse {
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}

export interface IUserProfileResponse {
  message: string
  data: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
}