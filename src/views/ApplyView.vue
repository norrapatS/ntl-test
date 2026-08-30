<script setup lang="ts">
import { ref } from 'vue'

import ApplicationStepper from '@/components/applications/ApplicationStepper.vue'
import PersonalStep from '@/components/applications/steps/PersonalStep.vue'
import AddressStep from '@/components/applications/steps/AddressStep.vue'
import IncomeStep from '@/components/applications/steps/IncomeStep.vue'
import DocumentsStep from '@/components/applications/steps/DocumentStep.vue'
import ApplicationReviewStep from '@/components/applications/steps/ApplicationReviewStep.vue'
import { applicationService } from '@/services/application.service'
import { useApplicationStore } from '@/stores/application'
import { storeToRefs } from 'pinia'
import { getApiErrorMessage } from '@/utils/error'
import router from '@/router'
const step = ref(0)

const STEPS = ['ข้อมูลส่วนตัว', 'ที่อยู่', 'รายได้', 'เอกสาร', 'ตรวจสอบ']

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

const applicationStore = useApplicationStore()

const { personal, address, income, documents } = storeToRefs(applicationStore)

const error = ref('')
const loading = ref(false)

const submitApplication = async () => {
  error.value = ''

  try {
    loading.value = true

    await applicationService.create({
      nationalId: personal.value.nationalId,
      prefix: personal.value.prefix,
      firstName: personal.value.firstName,
      lastName: personal.value.lastName,
      gender:personal.value.gender,
      birthDate: personal.value.birthDate,
      maritalStatus: personal.value.maritalStatus,
      houseNo: address.value.houseNo,
      moo: address.value.moo,
      road: address.value.road,
      subDistrict: address.value.subDistrict,
      district: address.value.district,
      province: address.value.province,
      zipcode: address.value.zipcode,

      occupation: income.value.occupation,
      monthlyIncome: Number(income.value.monthlyIncome),
      yearlyIncome: Number(income.value.yearlyIncome),
      householdSize: Number(income.value.householdSize),
      landOwned: income.value.landOwned,
      documents: documents.value.map((document) => ({
        kind: document.kind,
        name: document.name,
      })),
    })

    await router.push('/status')
  } catch (err: unknown) {
    error.value = getApiErrorMessage(err, 'ไม่สามารถยื่นคำขอได้')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-background px-5 py-12 text-foreground">
    <div class="mx-auto max-w-2xl">
      <ApplicationStepper :step="step" :steps="STEPS" />

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

          <ApplicationReviewStep v-if="step === 4" :on-edit="(step) => (step = step)" />
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
            @click="submitApplication"
          >
            ยื่นคำขอ
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
