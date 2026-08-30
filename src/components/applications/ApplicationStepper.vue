<script setup lang="ts">
import { STEPS } from '@/utils/application'

defineProps<{
  step: number
  invalidSteps?: boolean[]
}>()
</script>

<template>
  <ol class="flex w-full items-start">
    <li
      v-for="(title, index) in STEPS"
      :key="title"
      class="relative flex flex-1 flex-col items-center"
    >
      <div
        v-if="index < STEPS.length - 1"
        class="absolute left-1/2 top-4 h-0.5 w-full"
        :class="
          invalidSteps?.[index]
            ? 'bg-yellow-400'
            : index < step
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
          invalidSteps?.[index]
            ? 'border-yellow-400 bg-yellow-50 text-yellow-600'
            : index < step
              ? 'border-success bg-success text-white'
              : index === step
                ? 'border-primary bg-background text-primary'
                : 'border-border bg-background text-navy-soft'
        "
      >
        <span v-if="invalidSteps?.[index]">
          !
        </span>

        <span v-else-if="index < step">
          ✓
        </span>

        <span v-else>
          {{ index + 1 }}
        </span>
      </div>

      <span
        class="mt-2 text-center text-xs font-medium"
        :class="
          invalidSteps?.[index]
            ? 'text-yellow-600'
            : index <= step
              ? 'text-foreground'
              : 'text-navy-soft'
        "
      >
        {{ title }}
      </span>
    </li>
  </ol>
</template>