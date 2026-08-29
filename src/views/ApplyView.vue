<script setup lang="ts">
import { ref } from 'vue'

import ApplicationStepper from '@/components/applications/ApplicationStepper.vue'
import PersonalStep from '@/components/applications/steps/PersonalStep.vue'
import AddressStep from '@/components/applications/steps/AddressStep.vue'
import IncomeStep from '@/components/applications/steps/IncomeStep.vue'
import DocumentsStep from '@/components/applications/steps/DocumentStep.vue'

const step = ref(0)

const STEPS = [
  'ข้อมูลส่วนตัว',
  'ที่อยู่',
  'รายได้',
  'เอกสาร',
  'ตรวจสอบ',
]

const next = () => {
  if (step.value < STEPS.length - 1) {
    step.value++
  }
}

const previous = () => {
  if (step.value > 0) {
    step.value--
  }
}
</script>

<template>
  <main class="min-h-screen bg-background px-5 py-12 text-foreground">
    <div class="mx-auto max-w-2xl">
      <ApplicationStepper
        :step="step"
        :steps="STEPS"
      />

      <div class="surface-card mt-8 p-6 sm:p-8">
        <h1 class="text-2xl font-bold">
          {{ STEPS[step] }}
        </h1>

        <p class="mt-1 text-sm text-muted-foreground">
          ขั้นที่ {{ step + 2 }} จาก 7 ของกระบวนการลงทะเบียน
        </p>

        <div class="mt-7">
          <PersonalStep v-if="step === 0" />

          <AddressStep v-else-if="step === 1" />

          <IncomeStep v-else-if="step === 2" />

          <DocumentsStep v-else-if="step === 3" />

          <ApplicationReview v-else />
        </div>

        <div class="mt-8 flex justify-between border-t border-border pt-6">
          <button
            type="button"
            :disabled="step === 0"
            class="rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-40"
            @click="previous"
          >
            ย้อนกลับ
          </button>

          <button
            v-if="step < STEPS.length - 1"
            type="button"
            class="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            @click="next"
          >
            ถัดไป
          </button>

          <button
            v-else
            type="button"
            class="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            ยื่นคำขอ
          </button>
        </div>
      </div>
    </div>
  </main>
</template>