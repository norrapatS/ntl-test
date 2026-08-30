<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'

import TextInputFormField from '@/components/TextInputFormField.vue'
import ApplicationPicker from '@/components/applications/ApplicationPicker.vue'
import { useApplicationStore } from '@/stores/application'
import { incomeSchema } from '@/validations/application/income.schema'
import { watch } from 'vue'
import TextNumberInputFormField from '@/components/TextNumberInputFormField.vue'

const store = useApplicationStore()
const { income } = storeToRefs(store)

const { errors, defineField, validate, values } = useForm({
  validationSchema: toTypedSchema(incomeSchema),

  initialValues: {
    ...income.value,
  },
})

const [occupation] = defineField('occupation')
const [monthlyIncome] = defineField('monthlyIncome')
const [yearlyIncome] = defineField('yearlyIncome')
const [householdSize] = defineField('householdSize')
const [debt] = defineField('debt')
const [landOwned] = defineField('landOwned')

const validateStep = async () => {
  const result = await validate()

  if (!result.valid) {
    return false
  }

  Object.assign(income.value, values)

  return true
}

watch(
  values,
  (newValues) => {
    Object.assign(income.value, newValues)
  },
  { deep: true },
)

defineExpose({
  validateStep,
})
</script>

<template>
  <div class="space-y-5">
    <TextInputFormField
      id="occupation"
      v-model="occupation"
      label="อาชีพ"
      placeholder="เช่น พนักงานบริษัท"
      :error="errors.occupation"
    />

    <div class="grid gap-5 sm:grid-cols-2">
      <TextNumberInputFormField
        id="monthlyIncome"
        v-model="monthlyIncome"
        label="รายได้ต่อเดือน (บาท)"
        placeholder="0.00"
        :decimal-places="2"
        numeric-only
        :error="errors.monthlyIncome"
      />

      <TextNumberInputFormField
        id="yearlyIncome"
        v-model="yearlyIncome"
        label="รายได้ต่อปี (บาท)"
        placeholder="0.00"
        :decimal-places="2"
        decimal
        :error="errors.yearlyIncome"
      />

      <TextNumberInputFormField
        id="householdSize"
        v-model="householdSize"
        label="จำนวนสมาชิกในครัวเรือน"
        placeholder="0"
        :error="errors.householdSize"
      />

      <TextNumberInputFormField
        id="debt"
        v-model="debt"
        label="หนี้สินคงค้าง (บาท)"
        placeholder="0.00"
        :decimal-places="2"
        decimal
        :error="errors.debt"
      />
    </div>

    <ApplicationPicker
      v-model="landOwned"
      label="การถือครองที่ดิน"
      :options="['ไม่มี', 'น้อยกว่า 1 ไร่', '1-5 ไร่', 'มากกว่า 5 ไร่']"
      :error="errors.landOwned"
    />
  </div>
</template>
