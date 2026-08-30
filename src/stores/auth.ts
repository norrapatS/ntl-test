import { defineStore } from 'pinia'
import { ref } from 'vue'

import { authService } from '@/services/auth.service'
import type { IUserProfileResponse } from '@/types/auth.interface'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<IUserProfileResponse['data'] | null>(null)
  const loading = ref(false)
  const initialized = ref(false)
  const sessionExpired = ref(false)

  const fetchProfile = async () => {
    try {
      loading.value = true

      const response = await authService.userProfile()

      user.value = response.data.data
      sessionExpired.value = false
    } catch {
      user.value = null
    } finally {
      loading.value = false
      initialized.value = true
    }
  }

  const checkAuth = async () => {
    try {
      const response = await authService.userProfile()

      user.value = response.data.data
      sessionExpired.value = false

      return true
    } catch {
      if (user.value) {
        sessionExpired.value = true
      }

      user.value = null

      return false
    }
  }

  return {
    user,
    loading,
    initialized,
    sessionExpired,
    fetchProfile,
    checkAuth,
  }
})