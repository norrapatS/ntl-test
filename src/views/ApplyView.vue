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
import { getApiErrorMessage } from '@/utils/error'
import router from '@/router'
import { toCreateApplicationRequest } from '@/mapper/application.mapper'
import { STEPS } from '@/utils/application'

const step = ref(0)
const error = ref('')
const loading = ref(false)

const invalidSteps = ref<boolean[]>(STEPS.map(() => false))

const applicationStore = useApplicationStore()

const stepRefs = ref<any[]>([])

const setStepRef = (el: any, index: number) => {
  if (el) {
    stepRefs.value[index] = el
  }
}

const next = async () => {
  const currentStep = stepRefs.value[step.value]

  if (currentStep?.validateStep) {
    const valid = await currentStep.validateStep()

    invalidSteps.value[step.value] = !valid

    if (!valid) {
      return
    }
  }

  invalidSteps.value[step.value] = false

  if (step.value < STEPS.length - 1) {
    step.value++
  }
}

const previous = () => {
  if (step.value > 0) {
    step.value--
  }
}

const editStep = (stepIndex: number) => {
  step.value = stepIndex
}

const submitApplication = async () => {
  error.value = ''

  try {
    loading.value = true

    const application = {
      personal: applicationStore.personal,
      address: applicationStore.address,
      income: applicationStore.income,
      documents: applicationStore.documents,
    }

    const payload = toCreateApplicationRequest(application)

    await applicationService.create(payload)

    await router.replace('/')
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
      <ApplicationStepper :step="step" :invalid-steps="invalidSteps" />

      <div class="surface-card mt-8 p-6 sm:p-8">
        <h1 class="text-2xl font-bold">
          {{ STEPS[step] }}
        </h1>

        <p class="mt-1 text-sm text-muted-foreground">
          ขั้นที่ {{ step + 1 }} จาก {{ STEPS.length }}
        </p>

        <div class="mt-7">
          <PersonalStep v-if="step === 0" :ref="(el) => setStepRef(el, 0)" />

          <AddressStep v-else-if="step === 1" :ref="(el) => setStepRef(el, 1)" />

          <IncomeStep v-else-if="step === 2" :ref="(el) => setStepRef(el, 2)" />

          <DocumentsStep v-else-if="step === 3" :ref="(el) => setStepRef(el, 3)" />

          <ApplicationReviewStep
            v-else-if="step === 4"
            :ref="(el) => setStepRef(el, 4)"
            :on-edit="editStep"
          />
        </div>

        <p v-if="error" class="mt-5 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {{ error }}
        </p>

        <div class="mt-8 flex justify-between border-t border-border pt-6">
          <button
            type="button"
            :disabled="step === 0 || loading"
            class="rounded-lg px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-40"
            @click="previous"
          >
            ย้อนกลับ
          </button>

          <button
            v-if="step < STEPS.length - 1"
            type="button"
            :disabled="loading"
            class="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            @click="next"
          >
            ถัดไป
          </button>

          <button
            v-else
            type="button"
            :disabled="loading"
            class="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            @click="submitApplication"
          >
            {{ loading ? 'กำลังยื่นคำขอ...' : 'ยื่นคำขอ' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
