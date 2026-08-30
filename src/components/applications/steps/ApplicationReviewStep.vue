<script setup lang="ts">
import { storeToRefs } from 'pinia'

import ApplicationReview from './ApplicationReview.vue'
import { useApplicationStore } from '@/stores/application'

const props = defineProps<{
  onEdit?: (step: number) => void
}>()

const store = useApplicationStore()

const { personal, address, income, documents } = storeToRefs(store)

const thb = (value: string) => {
  if (!value) return '-'

  return `${Number(value).toLocaleString('th-TH')} บาท`
}
</script>

<template>
  <div class="space-y-5">
    <ApplicationReview
      title="ข้อมูลส่วนตัว"
      :rows="[
        [
          'ชื่อ-สกุล',
          `${personal.prefix}${personal.firstName} ${personal.lastName}`,
        ],
        ['เลขบัตรประชาชน', personal.nationalId || '-'],
        ['วันเกิด', personal.birthDate || '-'],
        ['สถานภาพ', personal.maritalStatus || '-'],
      ]"
      @edit="props.onEdit?.(0)"
    />

    <ApplicationReview
      title="ที่อยู่"
      :rows="[
        [
          'ที่อยู่',
          `${address.houseNo} หมู่ ${address.moo || '-'} ${address.road}`,
        ],
        [
          'ตำบล/อำเภอ',
          `${address.subDistrict} / ${address.district}`,
        ],
        [
          'จังหวัด',
          `${address.province} ${address.zipcode}`,
        ],
      ]"
      @edit="props.onEdit?.(1)"
    />

    <ApplicationReview
      title="รายได้"
      :rows="[
        ['อาชีพ', income.occupation || '-'],
        ['รายได้ต่อเดือน', thb(income.monthlyIncome)],
        ['รายได้ต่อปี', thb(income.yearlyIncome)],
        [
          'สมาชิกในครัวเรือน',
          `${income.householdSize || '-'} คน`,
        ],
      ]"
      @edit="props.onEdit?.(2)"
    />

    <ApplicationReview
      title="เอกสารแนบ"
      :rows="
        documents.length
          ? documents.map((document) => [
              document.kind,
              document.name,
            ])
          : [['เอกสาร', 'ยังไม่มีไฟล์แนบ']]
      "
      @edit="props.onEdit?.(3)"
    />

    <div class="rounded-lg bg-secondary/60 p-4">
      <p class="text-xs text-muted-foreground">
        ข้าพเจ้าขอรับรองว่าข้อมูลข้างต้นเป็นความจริงทุกประการ
        หากตรวจพบว่าเป็นเท็จยินยอมให้ยกเลิกสิทธิ
      </p>
    </div>

  </div>
</template>
