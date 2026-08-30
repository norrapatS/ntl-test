import { api } from '@/libs/axios'
import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IUserProfileResponse,
} from '@/types/auth.interface'

export const authService = {
  login(data: ILoginRequest) {
    return api.post<ILoginResponse>('/auth/login', data)
  },

  register(data: IRegisterRequest) {
    return api.post('/auth/register', data)
  },

  userProfile() {
    return api.get<IUserProfileResponse>('/auth/user-profile')
  },
}