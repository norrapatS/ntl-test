<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import AuthInput from '@/components/auth/AuthInput.vue'

const router = useRouter()

const form = reactive({
  email: '',
  phone: '',
  password: '',
  confirm: '',
})

const agree = ref(false)
const error = ref('')
const success = ref('')

const onSubmit = () => {
  error.value = ''
  success.value = ''

  if (!form.email || !form.phone || !form.password) {
    error.value = 'กรุณากรอกข้อมูลให้ครบถ้วน'
    return
  }

  if (form.password !== form.confirm) {
    error.value = 'รหัสผ่านไม่ตรงกัน'
    return
  }

  if (!agree.value) {
    error.value = 'กรุณายอมรับเงื่อนไขการให้ข้อมูล'
    return
  }

  success.value = 'สมัครสมาชิกสำเร็จ เริ่มกรอกแบบฟอร์มได้เลย'

  router.push({
    path: '/apply',
    query: {
      email: form.email,
      phone: form.phone,
    },
  })
}
</script>

<template>
  <main class="min-h-screen bg-background px-5 py-14 text-foreground">
    <div class="mx-auto max-w-lg">
      <p
        class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        ขั้นที่ 1
      </p>

      <h1 class="mt-2 text-3xl font-bold">
        สมัครสมาชิก
      </h1>

      <p class="mt-2 text-sm text-muted-foreground">
        ใช้อีเมลและเบอร์โทรศัพท์เพื่อรับการแจ้งผลการพิจารณา
      </p>

      <form
        class="surface-card mt-8 space-y-5 p-6"
        @submit.prevent="onSubmit"
      >
        <AuthInput
          id="email"
          v-model="form.email"
          label="อีเมล"
          type="email"
          placeholder="you@example.com"
        />

        <AuthInput
          id="phone"
          v-model="form.phone"
          label="เบอร์โทรศัพท์"
          placeholder="08X-XXX-XXXX"
        />

        <div class="grid gap-5 sm:grid-cols-2">
          <AuthInput
            id="password"
            v-model="form.password"
            label="รหัสผ่าน"
            type="password"
          />

          <AuthInput
            id="confirm"
            v-model="form.confirm"
            label="ยืนยันรหัสผ่าน"
            type="password"
          />
        </div>

        <label
          class="flex cursor-pointer items-start gap-3 rounded-lg bg-secondary/60 p-3 text-sm"
        >
          <input
            v-model="agree"
            type="checkbox"
            class="mt-1 h-4 w-4 accent-primary"
          />

          <span class="text-muted-foreground">
            ข้าพเจ้ายินยอมให้หน่วยงานตรวจสอบข้อมูลรายได้และทรัพย์สินเพื่อประกอบการพิจารณา
          </span>
        </label>

        <p
          v-if="error"
          class="text-sm text-destructive"
        >
          {{ error }}
        </p>

        <p
          v-if="success"
          class="text-sm text-success"
        >
          {{ success }}
        </p>

        <button
          type="submit"
          class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-navy-soft"
        >
          สมัครสมาชิกและไปต่อ
        </button>

        <p class="text-center text-xs text-muted-foreground">
          มีบัญชีอยู่แล้ว?

          <RouterLink
            to="/login"
            class="font-semibold text-accent hover:underline"
          >
            เข้าสู่ระบบ
          </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>