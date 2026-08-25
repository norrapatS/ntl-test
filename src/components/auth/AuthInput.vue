<script setup lang="ts">
defineProps<{
  id: string
  label: string
  type?: string
  placeholder?: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="space-y-2">
    <label
      :for="id"
      class="text-sm font-medium"
    >
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      class="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      @input="
        emit(
          'update:modelValue',
          ($event.target as HTMLInputElement).value,
        )
      "
    />
  </div>
</template>