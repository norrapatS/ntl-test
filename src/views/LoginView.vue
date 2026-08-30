<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import AuthCard from '@/components/auth/AuthCard.vue'
import TextInputFormField from '@/components/TextInputFormField.vue'
import { authService } from '@/services/auth.service'
import { getApiErrorMessage } from '@/utils/error'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: typeof route.query.email === 'string'
    ? route.query.email
    : '',
  password: '',
})

const error = ref('')
const loading = ref(false)

const onSubmit = async () => {
  error.value = ''

  if (!form.email || !form.password) {
    error.value = 'กรุณากรอกอีเมลและรหัสผ่าน'
    return
  }

  try {
    loading.value = true

    await authService.login({
      email: form.email,
      password: form.password,
    })

    await authStore.fetchProfile()

    await router.push('/')
  } catch (err: unknown) {
    error.value = getApiErrorMessage(
      err,
      'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthCard
    title="เข้าสู่ระบบ"
    description="เข้าสู่ระบบเพื่อยื่นคำขอและติดตามสถานะการลงทะเบียน"
  >
    <form
      class="space-y-5"
      @submit.prevent="onSubmit"
    >
      <TextInputFormField
        id="email"
        v-model="form.email"
        label="อีเมล"
        type="email"
        placeholder="you@example.com"
      />

      <TextInputFormField
        id="password"
        v-model="form.password"
        label="รหัสผ่าน"
        type="password"
        placeholder="กรอกรหัสผ่าน"
      />

      <div class="flex justify-end">
        <RouterLink
          to="/forgot-password"
          class="text-sm font-medium text-accent hover:underline"
        >
          ลืมรหัสผ่าน?
        </RouterLink>
      </div>

      <p
        v-if="error"
        class="text-sm text-destructive"
      >
        {{ error }}
      </p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-navy-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
      </button>

      <p class="text-center text-xs text-muted-foreground">
        ยังไม่มีบัญชี?

        <RouterLink
          to="/register"
          class="font-semibold text-accent hover:underline"
        >
          สมัครสมาชิก
        </RouterLink>
      </p>
    </form>
  </AuthCard>
</template>