<script setup lang="ts">
import { storeToRefs } from 'pinia'

import TextInputFormField from '@/components/TextInputFormField.vue'
import ApplicationPicker from '@/components/applications/ApplicationPicker.vue'
import { useApplicationStore } from '@/stores/application'

const store = useApplicationStore()

const { personal } = storeToRefs(store)
</script>

<template>
  <div class="space-y-5">
    <TextInputFormField
      id="nationalId"
      v-model="personal.nationalId"
      label="เลขประจำตัวประชาชน"
      placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
      inputmode="numeric"
      numeric-only
      :max-length="13"
    />

    <div class="grid gap-5 sm:grid-cols-3">
      <ApplicationPicker
        v-model="personal.prefix"
        label="คำนำหน้า"
        :options="['นาย', 'นาง', 'นางสาว']"
      />

      <TextInputFormField
        id="firstName"
        v-model="personal.firstName"
        label="ชื่อ"
        placeholder="ชื่อ"
      />

      <TextInputFormField
        id="lastName"
        v-model="personal.lastName"
        label="นามสกุล"
        placeholder="นามสกุล"
      />
    </div>

    <div class="grid gap-5 sm:grid-cols-3">
      <TextInputFormField
        id="birthDate"
        v-model="personal.birthDate"
        label="วันเกิด"
        type="date"
      />

      <ApplicationPicker
        v-model="personal.gender"
        label="เพศ"
        :options="['ชาย', 'หญิง']"
      />

      <ApplicationPicker
        v-model="personal.maritalStatus"
        label="สถานภาพ"
        :options="['โสด', 'สมรส', 'หย่าร้าง', 'หม้าย']"
      />
    </div>
  </div>
</template>