<script setup lang="ts">
import { storeToRefs } from 'pinia'

import TextInputFormField from '@/components/TextInputFormField.vue'
import ApplicationPicker from '@/components/applications/ApplicationPicker.vue'
import { useApplicationStore } from '@/stores/application'

const store = useApplicationStore()

const { income } = storeToRefs(store)
</script>

<template>
  <div class="space-y-5">
    <TextInputFormField
      id="occupation"
      v-model="income.occupation"
      label="อาชีพ"
      placeholder="เช่น พนักงานบริษัท"
    />

    <div class="grid gap-5 sm:grid-cols-2">
      <TextInputFormField
        id="monthlyIncome"
        v-model="income.monthlyIncome"
        label="รายได้ต่อเดือน (บาท)"
        placeholder="0"
        inputmode="numeric"
        numeric-only
      />

      <TextInputFormField
        id="yearlyIncome"
        v-model="income.yearlyIncome"
        label="รายได้ต่อปี (บาท)"
        placeholder="0"
        inputmode="numeric"
        numeric-only
      />

      <TextInputFormField
        id="householdSize"
        v-model="income.householdSize"
        label="จำนวนสมาชิกในครัวเรือน"
        placeholder="0"
        inputmode="numeric"
        numeric-only
      />

      <TextInputFormField
        id="debt"
        v-model="income.debt"
        label="หนี้สินคงค้าง (บาท)"
        placeholder="0"
        inputmode="numeric"
        numeric-only
      />
    </div>

    <ApplicationPicker
      v-model="income.landOwned"
      label="การถือครองที่ดิน"
      :options="[
        'ไม่มี',
        'น้อยกว่า 1 ไร่',
        '1-5 ไร่',
        'มากกว่า 5 ไร่',
      ]"
    />
  </div>
</template>