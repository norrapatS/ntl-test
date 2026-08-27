<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import TextNumberInputFormField from '@/components/TextNumberInputFormField.vue'
import TextInputFormField from '@/components/TextInputFormField.vue'
import { registerSchema } from '@/validations/auth/register.schema'

const router = useRouter()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: toTypedSchema(registerSchema),
  initialValues: {
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agree: false,
  },
})

const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [password, passwordAttrs] = defineField('password')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

const [agree, agreeAttrs] = defineField('agree')

const onSubmit = handleSubmit((values) => {
  router.push({
    path: '/apply',
    query: {
      email: values.email,
      phone: values.phone,
    },
  })
})
</script>

<template>
  <main class="min-h-screen bg-background px-5 py-14 text-foreground">
    <div class="mx-auto max-w-lg">
      <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">ขั้นที่ 1</p>

      <h1 class="mt-2 text-3xl font-bold">สมัครสมาชิก</h1>

      <p class="mt-2 text-sm text-muted-foreground">
        ใช้อีเมลและเบอร์โทรศัพท์เพื่อรับการแจ้งผลการพิจารณา
      </p>

      <form class="surface-card mt-8 space-y-5 p-6" @submit.prevent="onSubmit">
        <TextInputFormField
          id="email"
          v-model="email"
          label="อีเมล"
          type="email"
          placeholder="you@example.com"
          :error="errors.email"
        />

        <TextNumberInputFormField
          id="phone"
          v-model="phone"
          label="เบอร์โทรศัพท์"
          placeholder="0812345678"
          :max-length="10"
          :error="errors.phone"
        />

        <div class="grid gap-5 sm:grid-cols-2">
          <TextInputFormField
            id="password"
            v-model="password"
            label="รหัสผ่าน"
            type="password"
            :error="errors.password"
          />

          <TextInputFormField
            id="confirm"
            v-model="confirmPassword"
            label="ยืนยันรหัสผ่าน"
            type="password"
            :error="errors.confirmPassword"
          />
        </div>

        <div>
          <label
            class="flex cursor-pointer items-start gap-3 rounded-lg bg-secondary/60 p-3 text-sm"
          >
            <input v-model="agree" type="checkbox" class="mt-1 h-4 w-4 accent-primary" />

            <span class="text-muted-foreground">
              ข้าพเจ้ายินยอมให้หน่วยงานตรวจสอบข้อมูลรายได้และทรัพย์สินเพื่อประกอบการพิจารณา
            </span>
          </label>

          <p v-if="errors.agree" class="mt-1 text-sm text-destructive">
            {{ errors.agree }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-navy-soft"
        >
          สมัครสมาชิกและไปต่อ
        </button>

        <p class="text-center text-xs text-muted-foreground">
          มีบัญชีอยู่แล้ว?

          <RouterLink to="/login" class="font-semibold text-accent hover:underline">
            เข้าสู่ระบบ
          </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
