<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import AuthCard from '@/components/auth/AuthCard.vue'
import TextInputFormField from '@/components/TextInputFormField.vue'

const router = useRouter()

const form = reactive({
  email: '',
  password: '',
})

const error = ref('')

const onSubmit = () => {
  error.value = ''

  if (!form.email || !form.password) {
    error.value = 'กรุณากรอกอีเมลและรหัสผ่าน'
    return
  }

  router.push('/status')
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
        class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-navy-soft"
      >
        เข้าสู่ระบบ
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