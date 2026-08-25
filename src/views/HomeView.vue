<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  ArrowRight,
  FileText,
  MapPin,
  Wallet,
  Upload,
  CheckCircle2,
  Send,
  ShieldCheck,
} from 'lucide-vue-next'

const steps = [
  {
    icon: FileText,
    title: 'ข้อมูลส่วนตัว',
    desc: 'เลขบัตรประชาชน ชื่อ-สกุล วันเกิด',
  },
  {
    icon: MapPin,
    title: 'ที่อยู่',
    desc: 'ที่อยู่ตามทะเบียนบ้านปัจจุบัน',
  },
  {
    icon: Wallet,
    title: 'รายได้',
    desc: 'อาชีพ รายได้ต่อเดือน/ปี หนี้สิน',
  },
  {
    icon: Upload,
    title: 'อัปโหลดเอกสาร',
    desc: 'บัตรประชาชน ทะเบียนบ้าน หลักฐานรายได้',
  },
  {
    icon: CheckCircle2,
    title: 'ตรวจสอบข้อมูล',
    desc: 'ทบทวนความถูกต้องก่อนยื่น',
  },
  {
    icon: Send,
    title: 'ยื่นคำขอ',
    desc: 'รอเจ้าหน้าที่พิจารณาผล',
  },
]

const requirements = [
  {
    label: 'รายได้ไม่เกิน',
    value: '100,000 บาท/ปี',
  },
  {
    label: 'อายุ',
    value: '18 ปีบริบูรณ์ขึ้นไป',
  },
  {
    label: 'ระยะเวลาพิจารณา',
    value: 'ภายใน 30 วันทำการ',
  },
]
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    
    <section class="bg-gradient-navy text-primary-foreground">
      <div class="mx-auto max-w-5xl px-5 py-20">
        <span
          class="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-semibold"
        >
          <ShieldCheck class="size-3.5" />

          เปิดลงทะเบียนรอบปี 2569
        </span>
        <h1
          class="mt-6 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl"
        >
          ลงทะเบียนบัตรสวัสดิการแห่งรัฐ
          ทำได้เองจากที่บ้าน
        </h1>

        <p
          class="mt-4 max-w-xl text-base text-primary-foreground/75"
        >
          ยื่นคำขอออนไลน์ครบทุกขั้นตอน
          ใช้เวลาประมาณ 10 นาที
          ระบบจะบันทึกข้อมูลให้อัตโนมัติ
          และแจ้งผลการพิจารณาผ่านหน้าติดตามสถานะ
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <RouterLink
            to="/register"
            class="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
          >
            เริ่มลงทะเบียน

            <ArrowRight class="size-4" />
          </RouterLink>

          <RouterLink
            to="/status"
            class="inline-flex items-center rounded-lg border border-primary-foreground/30 px-5 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
          >
            ตรวจสอบสถานะคำขอ
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-5xl px-5 py-16">
      <h2 class="text-2xl font-semibold">
        ขั้นตอนการยื่นคำขอ
      </h2>

      <p class="mt-2 text-sm text-muted-foreground">
        ทำตามลำดับ ระบบจะพาไปทีละหน้า
      </p>

      <ol
        class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          class="surface-card p-5"
        >
          <div class="flex items-center gap-3">
            <span
              class="grid size-10 place-items-center rounded-lg bg-secondary text-secondary-foreground"
            >
              <component
                :is="step.icon"
                class="size-5"
              />
            </span>

            <span
              class="text-xs font-semibold text-muted-foreground"
            >
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
      <div
        class="surface-card grid gap-6 p-7 sm:grid-cols-3"
      >
        <div
          v-for="item in requirements"
          :key="item.label"
        >
          <p
            class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
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