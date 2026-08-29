<script setup lang="ts">
import { storeToRefs } from 'pinia'

import TextInputFormField from '@/components/TextInputFormField.vue'
import { useApplicationStore } from '@/stores/application'

const store = useApplicationStore()

const { address } = storeToRefs(store)
</script>

<template>
  <div class="space-y-5">
    <div class="grid gap-5 sm:grid-cols-3">
      <TextInputFormField
        id="houseNo"
        v-model="address.houseNo"
        label="บ้านเลขที่"
        placeholder="บ้านเลขที่"
      />

      <TextInputFormField
        id="moo"
        v-model="address.moo"
        label="หมู่ที่"
        placeholder="หมู่ที่"
      />

      <TextInputFormField
        id="road"
        v-model="address.road"
        label="ถนน"
        placeholder="ถนน"
      />
    </div>

    <div class="grid gap-5 sm:grid-cols-2">
      <TextInputFormField
        id="subDistrict"
        v-model="address.subDistrict"
        label="ตำบล/แขวง"
        placeholder="ตำบล/แขวง"
      />

      <TextInputFormField
        id="district"
        v-model="address.district"
        label="อำเภอ/เขต"
        placeholder="อำเภอ/เขต"
      />

      <TextInputFormField
        id="province"
        v-model="address.province"
        label="จังหวัด"
        placeholder="จังหวัด"
      />

      <TextInputFormField
        id="zipcode"
        v-model="address.zipcode"
        label="รหัสไปรษณีย์"
        placeholder="50000"
        inputmode="numeric"
        numeric-only
        :max-length="5"
      />
    </div>
  </div>
</template>