<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  type?: string
  placeholder?: string
  modelValue?: string
  error?: string
  maxLength?: number
  numericOnly?: boolean // เพิ่ม prop รองรับ numeric-only
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  if (props.maxLength && value.length > props.maxLength) {
    value = value.slice(0, props.maxLength)
  }

  target.value = value

  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label :for="id" class="text-sm font-semibold text-gray-700 select-none">
      {{ label }}
    </label>

    <div class="relative w-full">
      <input
        :id="id"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :value="modelValue ?? ''"
        :maxlength="maxLength"
        :class="[
          'w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50 placeholder:text-gray-400',
          error
            ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
            : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
        ]"
        @input="handleInput"
      />
    </div>

    <p v-if="error" class="text-xs font-medium text-red-600">
      {{ error }}
    </p>
  </div>
</template>