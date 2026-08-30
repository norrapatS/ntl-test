<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Eye, Search, RefreshCw } from 'lucide-vue-next'

import { applicationService } from '@/services/application.service'
import { getApiErrorMessage } from '@/utils/error'
import type { IApplication } from '@/types/application.interface'
import { formatCitizenId, formatDate } from '@/utils/format'
import { getStatusClass, getStatusLabel } from '@/utils/admin'

const applications = ref<IApplication[]>([])
const loading = ref(false)
const error = ref('')

const search = ref('')
const status = ref('ALL')

const filteredApplications = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  return applications.value.filter((application) => {
    const matchesSearch =
      !keyword ||
      application.nationalId.toLowerCase().includes(keyword) ||
      application.firstName.toLowerCase().includes(keyword) ||
      application.lastName.toLowerCase().includes(keyword)

    const matchesStatus = status.value === 'ALL' || application.status === status.value

    return matchesSearch && matchesStatus
  })
})

const loadApplications = async () => {
  error.value = ''

  try {
    loading.value = true

    applications.value = await applicationService.getAll()
  } catch (err: unknown) {
    error.value = getApiErrorMessage(err, 'ไม่สามารถโหลดข้อมูลคำขอได้')
  } finally {
    loading.value = false
  }
}

onMounted(loadApplications)
</script>

<template>
  <main class="min-h-screen bg-background px-5 py-10 text-foreground">
    <div class="mx-auto max-w-5xl">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold">รายการคำขอลงทะเบียน</h1>

          <p class="mt-1 text-sm text-muted-foreground">
            จัดการและตรวจสอบคำขอลงทะเบียนบัตรสวัสดิการแห่งรัฐ
          </p>
        </div>

        <button
          type="button"
          :disabled="loading"
          class="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-secondary disabled:opacity-50"
          @click="loadApplications"
        >
          <RefreshCw class="size-4" :class="{ 'animate-spin': loading }" />

          รีเฟรช
        </button>
      </div>

      <div class="surface-card mt-8 p-5">
        <div class="flex flex-col gap-3 sm:flex-row">
          <div class="relative flex-1">
            <Search class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              v-model="search"
              type="text"
              placeholder="ค้นหาเลขบัตรประชาชน หรือชื่อ"
              class="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <select
            v-model="status"
            class="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="ALL">ทุกสถานะ</option>

            <option value="PENDING">รอตรวจสอบ</option>

            <option value="APPROVED">อนุมัติ</option>

            <option value="REJECTED">ไม่อนุมัติ</option>
          </select>
        </div>
      </div>

      <p v-if="error" class="mt-5 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
        {{ error }}
      </p>

      <div class="surface-card mt-5 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[900px] text-sm">
            <thead class="border-b border-border bg-secondary/50">
              <tr>
                <th class="px-5 py-4 text-left font-semibold">เลขบัตรประชาชน</th>

                <th class="px-5 py-4 text-left font-semibold">ชื่อ-สกุล</th>

                <th class="px-5 py-4 text-left font-semibold">วันเกิด</th>

                <th class="px-5 py-4 text-left font-semibold">วันที่ยื่น</th>

                <th class="px-5 py-4 text-left font-semibold">สถานะ</th>

                <th class="px-5 py-4 text-right font-semibold">จัดการ</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="application in filteredApplications"
                :key="application.id"
                class="border-b border-border last:border-0 hover:bg-secondary/30"
              >
                <td class="px-5 py-4">
                  {{ formatCitizenId(application.nationalId) }}
                </td>

                <td class="px-5 py-4">
                  {{ application.prefix }}
                  {{ application.firstName }}
                  {{ application.lastName }}
                </td>

                <td class="px-5 py-4">
                  {{ formatDate(application.birthDate) }}
                </td>

                <td class="px-5 py-4">
                  {{ formatDate(application.createdAt) }}
                </td>

                <td class="px-5 py-4">
                  <span
                    class="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="getStatusClass(application.status)"
                  >
                    {{ getStatusLabel(application.status) }}
                  </span>
                </td>

                <td class="px-5 py-4 text-right">
                  <RouterLink
                    :to="`/admin/applications/${application.transactionNo}`"
                    class="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:bg-secondary"
                  >
                    <Eye class="size-4" />
                    ดูรายละเอียด
                  </RouterLink>
                </td>
              </tr>

              <tr v-if="!loading && filteredApplications.length === 0">
                <td colspan="7" class="px-5 py-12 text-center text-sm text-muted-foreground">
                  ไม่พบข้อมูลคำขอ
                </td>
              </tr>

              <tr v-if="loading">
                <td colspan="7" class="px-5 py-12 text-center text-sm text-muted-foreground">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-4 text-sm text-muted-foreground">
        แสดง {{ filteredApplications.length }} รายการ
      </div>
    </div>
  </main>
</template>
