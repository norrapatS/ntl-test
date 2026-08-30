<script setup lang="ts">
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

import TextInputFormField from '@/components/TextInputFormField.vue'
import ApplicationPicker from '@/components/applications/ApplicationPicker.vue'
import { useApplicationStore } from '@/stores/application'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { personalSchema } from '@/validations/application/personal.schema'

const store = useApplicationStore()

const { personal } = storeToRefs(store)

const { values, errors, defineField, validate } = useForm({
  validationSchema: toTypedSchema(personalSchema),
  initialValues: {
    ...personal.value,
  },
})

const [nationalId] = defineField('nationalId')
const [prefix] = defineField('prefix')
const [firstName] = defineField('firstName')
const [lastName] = defineField('lastName')
const [birthDate] = defineField('birthDate')
const [gender] = defineField('gender')
const [maritalStatus] = defineField('maritalStatus')

watch(
  values,
  (value) => {
    Object.assign(personal.value, value)
  },
  { deep: true },
)

const validateStep = async () => {
  const result = await validate()

  return result.valid
}

defineExpose({
  validateStep,
})
</script>

<template>
  <div class="space-y-5">
    <TextInputFormField
      id="nationalId"
      v-model="nationalId"
      label="เลขประจำตัวประชาชน"
      placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
      inputmode="numeric"
      numeric-only
      :max-length="13"
      :error="errors.nationalId"
    />

    <div class="grid gap-5 sm:grid-cols-3">
      <ApplicationPicker v-model="prefix" label="คำนำหน้า" :options="['นาย', 'นาง', 'นางสาว']" />

      <TextInputFormField
        id="firstName"
        v-model="firstName"
        label="ชื่อ"
        placeholder="ชื่อ"
        :error="errors.firstName"
      />

      <TextInputFormField
        id="lastName"
        v-model="lastName"
        label="นามสกุล"
        placeholder="นามสกุล"
        :error="errors.lastName"
      />
    </div>

    <div class="grid gap-5 sm:grid-cols-3">
      <TextInputFormField
        id="birthDate"
        v-model="birthDate"
        label="วันเกิด"
        type="date"
        :error="errors.birthDate"
      />

      <ApplicationPicker v-model="gender" label="เพศ" :options="['ชาย', 'หญิง']" />

      <ApplicationPicker
        v-model="maritalStatus"
        label="สถานภาพ"
        :options="['โสด', 'สมรส', 'หย่าร้าง', 'หม้าย']"
      />
    </div>
  </div>
</template>
