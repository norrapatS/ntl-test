<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  placeholder?: string
  modelValue?: string
  error?: string
  maxLength?: number
  decimal?: boolean
  decimalPlaces?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement

  let value = target.value

  if (props.decimal) {
    value = value.replace(/[^\d.]/g, '')

    const firstDot = value.indexOf('.')

    if (firstDot !== -1) {
      const integerPart = value.slice(0, firstDot)
      let decimalPart = value.slice(firstDot + 1)

      // มี . ได้แค่ตัวเดียว
      decimalPart = decimalPart.replace(/\./g, '')

      // จำกัดทศนิยม
      if (props.decimalPlaces !== undefined) {
        decimalPart = decimalPart.slice(0, props.decimalPlaces)
      }

      value = `${integerPart}.${decimalPart}`
    }
  } else {
    value = value.replace(/\D/g, '')
  }

  if (props.maxLength) {
    value = value.slice(0, props.maxLength)
  }

  emit('update:modelValue', value)
}

const handleKeydown = (event: KeyboardEvent) => {
  const allowedKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Tab',
    'Home',
    'End',
  ]

  if (allowedKeys.includes(event.key)) {
    return
  }

  const target = event.target as HTMLInputElement
  const value = target.value

  if (props.decimal) {
    // กด .
    if (event.key === '.') {
      if (value.includes('.')) {
        event.preventDefault()
      }

      return
    }

    if (!/^\d$/.test(event.key)) {
      event.preventDefault()
      return
    }

    if (value.includes('.')) {
      const decimalPart = value.split('.')[1] ?? ''

      const cursorPosition = target.selectionStart ?? value.length

      if (
        cursorPosition > value.indexOf('.') &&
        props.decimalPlaces !== undefined &&
        decimalPart.length >= props.decimalPlaces
      ) {
        event.preventDefault()
      }
    }

    return
  }
  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="text-sm font-medium">
      {{ label }}
    </label>

    <input
      :id="id"
      type="tel"
      inputmode="decimal"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :value="modelValue ?? ''"
      :class="[
        'w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50 placeholder:text-gray-400',
        error
          ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
          : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
      ]"
      @keydown="handleKeydown"
      @input="handleInput"
    />

    <p v-if="error" class="text-sm text-destructive">
      {{ error }}
    </p>
  </div>
</template>
