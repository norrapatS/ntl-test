<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'

import TextInputFormField from '@/components/TextInputFormField.vue'
import { useApplicationStore } from '@/stores/application'
import { addressSchema } from '@/validations/application/address.schema'
import { watch } from 'vue'

const store = useApplicationStore()
const { address } = storeToRefs(store)

const { errors, defineField, validate, values } = useForm({
  validationSchema: toTypedSchema(addressSchema),

  initialValues: {
    ...address.value,
  },
})

const [houseNo] = defineField('houseNo')
const [moo] = defineField('moo')
const [road] = defineField('road')
const [subDistrict] = defineField('subDistrict')
const [district] = defineField('district')
const [province] = defineField('province')
const [zipcode] = defineField('zipcode')

const saveToStore = () => {
  Object.assign(address.value, values)
}

const validateStep = async () => {
  const result = await validate()

  if (!result.valid) {
    return false
  }

  saveToStore()

  return true
}

watch(
  values,
  (newValues) => {
    Object.assign(address.value, newValues)
  },
  { deep: true },
)

defineExpose({
  validateStep,
})
</script>

<template>
  <div class="space-y-5">
    <div class="grid gap-5 sm:grid-cols-3">
      <TextInputFormField
        id="houseNo"
        v-model="houseNo"
        label="บ้านเลขที่"
        placeholder="บ้านเลขที่"
        :error="errors.houseNo"
      />

      <TextInputFormField
        id="moo"
        v-model="moo"
        label="หมู่ที่"
        placeholder="หมู่ที่"
        :error="errors.moo"
      />

      <TextInputFormField
        id="road"
        v-model="road"
        label="ถนน"
        placeholder="ถนน"
        :error="errors.road"
      />
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <TextInputFormField
        id="subDistrict"
        v-model="subDistrict"
        label="ตำบล/แขวง"
        placeholder="ตำบล/แขวง"
        :error="errors.subDistrict"
      />

      <TextInputFormField
        id="district"
        v-model="district"
        label="อำเภอ/เขต"
        placeholder="อำเภอ/เขต"
        :error="errors.district"
      />

      <TextInputFormField
        id="province"
        v-model="province"
        label="จังหวัด"
        placeholder="จังหวัด"
        :error="errors.province"
      />

      <TextInputFormField
        id="zipcode"
        v-model="zipcode"
        label="รหัสไปรษณีย์"
        placeholder="50000"
        inputmode="numeric"
        numeric-only
        :max-length="5"
        :error="errors.zipcode"
      />
    </div>
  </div>
</template>
