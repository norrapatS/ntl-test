<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ArrowRight, ShieldCheck } from 'lucide-vue-next'
import { HOME_STEPS, REQUIREMENTS } from '@/utils/application'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const startRegistration = () => {
  if (authStore.user) {
    router.push('/apply')
    return
  }

  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <section class="bg-primary text-primary-foreground">
      <div class="mx-auto max-w-5xl px-5 py-20">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-semibold"
        >
          <ShieldCheck class="size-3.5" />
          เปิดลงทะเบียนรอบปี 2569
        </span>

        <h1 class="mt-6 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          ลงทะเบียนบัตรสวัสดิการแห่งรัฐ ทำได้เองจากที่บ้าน
        </h1>

        <p class="mt-4 max-w-xl text-base text-primary-foreground/75">
          ยื่นคำขอออนไลน์ครบทุกขั้นตอน ใช้เวลาประมาณ 10 นาที ระบบจะบันทึกข้อมูลให้อัตโนมัติ
          และแจ้งผลการพิจารณาผ่านหน้าติดตามสถานะ
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
            @click="startRegistration"
          >
            เริ่มลงทะเบียน
            <ArrowRight class="size-4" />
          </button>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl px-5 py-16">
      <h2 class="text-2xl font-semibold">ขั้นตอนการยื่นคำขอ</h2>

      <p class="mt-2 text-sm text-muted-foreground">ทำตามลำดับ ระบบจะพาไปทีละหน้า</p>

      <ol class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(step, index) in HOME_STEPS" :key="step.title" class="surface-card p-5">
          <div class="flex items-center gap-3">
            <span
              class="grid size-10 place-items-center rounded-lg bg-secondary text-secondary-foreground"
            >
              <component :is="step.icon" class="size-5" />
            </span>

            <span class="text-xs font-semibold text-muted-foreground">
              ขั้นที่ {{ index + 1 }}
            </span>
          </div>

          <h3 class="mt-4 text-base font-semibold">
            {{ step.title }}
          </h3>

          <p class="mt-1 text-sm text-muted-foreground">
            {{ step.desc }}
          </p>
        </li>
      </ol>
    </section>

    <section class="mx-auto max-w-5xl px-5 pb-20">
      <div class="surface-card grid gap-6 p-7 sm:grid-cols-3">
        <div v-for="item in REQUIREMENTS" :key="item.label">
          <p class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {{ item.label }}
          </p>

          <p class="mt-1 text-lg font-semibold">
            {{ item.value }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
