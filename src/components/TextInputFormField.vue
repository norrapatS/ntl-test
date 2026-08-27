<script setup lang="ts">
defineProps<{
  id: string
  label: string
  type?: string
  placeholder?: string
  modelValue?: string
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement

  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="text-sm font-medium">
      {{ label }}
    </label>

    <input
      :id="id"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :value="modelValue ?? ''"
      :class="[
        'w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition',
        error
          ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20'
          : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/20',
      ]"
      @input="handleInput"
    />

    <p v-if="error" class="text-sm text-destructive">
      {{ error }}
    </p>
  </div>
</template>
