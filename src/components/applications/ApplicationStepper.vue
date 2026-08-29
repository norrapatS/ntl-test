<script setup lang="ts">
defineProps<{
  step: number
}>()

const steps = [
  'ข้อมูลส่วนตัว',
  'ที่อยู่',
  'รายได้',
  'เอกสาร',
  'ตรวจสอบ',
]
</script>

<template>
  <ol class="flex w-full items-start">
    <li
      v-for="(title, index) in steps"
      :key="title"
      class="relative flex flex-1 flex-col items-center"
    >
      <div
        v-if="index < steps.length - 1"
        class="absolute left-1/2 top-4 h-0.5 w-full"
        :class="
          index < step
            ? 'bg-success'
            : 'bg-border'
        "
      />

      <div
        class="
          relative z-10
          flex size-8 items-center justify-center
          rounded-full
          border-2
          text-xs font-semibold
          transition-colors
        "
        :class="
          index < step
            ? 'border-success bg-success text-white'
            : index === step
              ? 'border-primary bg-background text-primary'
              : 'border-border bg-background text-navy-soft'
        "
      >
        <span v-if="index < step">
          ✓
        </span>

        <span v-else>
          {{ index + 1 }}
        </span>
      </div>

      <span
        class="mt-2 text-center text-xs font-medium"
        :class="
          index <= step
            ? 'text-foreground'
            : 'text-navy-soft'
        "
      >
        {{ title }}
      </span>
    </li>
  </ol>
</template>