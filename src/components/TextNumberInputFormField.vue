<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  placeholder?: string
  modelValue?: string
  error?: string
  maxLength?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement

  let value = target.value.replace(/\D/g, '')

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

  if (!/^\d$/.test(event.key)) {
    event.preventDefault()
  }
}
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
      type="tel"
      inputmode="numeric"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :value="modelValue ?? ''"
      :class="[
        'w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition',
        error
          ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
          : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20',
      ]"
      @keydown="handleKeydown"
      @input="handleInput"
    />

    <p
      v-if="error"
      class="text-sm text-destructive"
    >
      {{ error }}
    </p>
  </div>
</template>