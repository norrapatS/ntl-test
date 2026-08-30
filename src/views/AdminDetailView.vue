<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

import { applicationService } from '@/services/application.service'
import { getApiErrorMessage } from '@/utils/error'
import type { IApplication } from '@/types/application.interface'
import { formatCitizenId, formatDate, formatMoney } from '@/utils/format'
import { getStatusClass, getStatusLabel } from '@/utils/admin'

const route = useRoute()
const router = useRouter()

const application = ref<IApplication | null>(null)
const loading = ref(false)
const error = ref('')

const loadApplication = async () => {
  error.value = ''

  try {
    loading.value = true

    const transactionNo = route.params.transactionNo as string

    application.value = await applicationService.getByTransactionNo(transactionNo)
  } catch (err: unknown) {
    error.value = getApiErrorMessage(err, 'ไม่สามารถโหลดข้อมูลคำขอได้')
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/admin')
}

onMounted(loadApplication)
</script>

<template>
  <main class="min-h-screen bg-background px-5 py-10 text-foreground">
    <div class="mx-auto max-w-5xl">
      <button
        type="button"
        class="mb-6 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        @click="goBack"
      >
        <ArrowLeft class="size-4" />
        กลับรายการคำขอ
      </button>

      <div
        v-if="loading && !application"
        class="surface-card p-10 text-center text-sm text-muted-foreground"
      >
        กำลังโหลดข้อมูล...
      </div>

      <div
        v-else-if="error && !application"
        class="rounded-lg bg-destructive/10 p-4 text-sm text-destructive"
      >
        {{ error }}
      </div>

      <template v-else-if="application">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-bold">รายละเอียดคำขอ</h1>

            <p class="mt-1 text-sm text-muted-foreground">
              เลขที่คำขอ {{ application.transactionNo }}
            </p>
          </div>

          <span
            class="inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-semibold"
            :class="getStatusClass(application.status)"
          >
            {{ getStatusLabel(application.status) }}
          </span>
        </div>

        <section class="surface-card mt-6 p-6">
          <h2 class="text-lg font-bold">ข้อมูลส่วนตัว</h2>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p class="text-xs text-muted-foreground">ชื่อ-สกุล</p>

              <p class="mt-1 font-medium">
                {{ application.prefix }}
                {{ application.firstName }}
                {{ application.lastName }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">เลขบัตรประชาชน</p>

              <p class="mt-1 font-medium">
                {{ formatCitizenId(application.nationalId) }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">วันเกิด</p>

              <p class="mt-1 font-medium">
                {{ formatDate(application.birthDate) }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">เพศ</p>

              <p class="mt-1 font-medium">
                {{ application.gender || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">สถานภาพ</p>

              <p class="mt-1 font-medium">
                {{ application.maritalStatus || '-' }}
              </p>
            </div>
          </div>
        </section>

        <section class="surface-card mt-5 p-6">
          <h2 class="text-lg font-bold">ที่อยู่</h2>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p class="text-xs text-muted-foreground">บ้านเลขที่</p>

              <p class="mt-1 font-medium">
                {{ application.houseNo || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">หมู่ที่</p>

              <p class="mt-1 font-medium">
                {{ application.moo || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">ถนน</p>

              <p class="mt-1 font-medium">
                {{ application.road || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">ตำบล/แขวง</p>

              <p class="mt-1 font-medium">
                {{ application.subDistrict || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">อำเภอ/เขต</p>

              <p class="mt-1 font-medium">
                {{ application.district || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">จังหวัด</p>

              <p class="mt-1 font-medium">
                {{ application.province || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">รหัสไปรษณีย์</p>

              <p class="mt-1 font-medium">
                {{ application.zipcode || '-' }}
              </p>
            </div>
          </div>
        </section>

        <section class="surface-card mt-5 p-6">
          <h2 class="text-lg font-bold">ข้อมูลรายได้</h2>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p class="text-xs text-muted-foreground">อาชีพ</p>

              <p class="mt-1 font-medium">
                {{ application.occupation || '-' }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">รายได้ต่อเดือน</p>

              <p class="mt-1 font-medium">
                {{ formatMoney(application.monthlyIncome) }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">รายได้ต่อปี</p>

              <p class="mt-1 font-medium">
                {{ formatMoney(application.yearlyIncome) }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">จำนวนสมาชิกในครัวเรือน</p>

              <p class="mt-1 font-medium">{{ application.householdSize }} คน</p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">หนี้สินคงค้าง</p>

              <p class="mt-1 font-medium">
                {{ formatMoney(application.debt) }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">การถือครองที่ดิน</p>

              <p class="mt-1 font-medium">
                {{ application.landOwned || '-' }}
              </p>
            </div>
          </div>
        </section>

        <section class="surface-card mt-5 p-6">
          <h2 class="text-lg font-bold">ข้อมูลระบบ</h2>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p class="text-xs text-muted-foreground">วันที่ยื่นคำขอ</p>

              <p class="mt-1 font-medium">
                {{ formatDate(application.createdAt) }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">แก้ไขล่าสุด</p>

              <p class="mt-1 font-medium">
                {{ formatDate(application.updatedAt) }}
              </p>
            </div>

            <div>
              <p class="text-xs text-muted-foreground">ผู้ยื่นคำขอ</p>

              <p class="mt-1 font-medium">
                {{ application.firstName }}
                {{ application.lastName }}
              </p>
            </div>
          </div>
        </section>

        <p v-if="error" class="mt-5 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {{ error }}
        </p>

        <div v-if="application.status === 'pending'" class="mt-5 flex justify-center gap-3">
          <button
            type="button"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-lg border border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
            @click="goBack"
          >
            ไม่อนุมัติ
          </button>

          <button
            type="button"
            :disabled="loading"
            class="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:text-primary-foreground/75 disabled:cursor-not-allowed disabled:opacity-50"
            @click="goBack"
          >
            อนุมัติ
          </button>
        </div>
      </template>
    </div>
  </main>
</template>
