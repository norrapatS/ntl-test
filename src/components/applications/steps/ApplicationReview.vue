<script setup lang="ts">
defineProps<{
  title: string
  rows: string[][]
}>()

const emit = defineEmits<{
  edit: []
}>()
</script>

<template>
  <section class="surface-card p-6">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold">
        {{ title }}
      </h3>

      <button
        type="button"
        class="text-sm font-medium text-accent hover:underline"
        @click="emit('edit')"
      >
        แก้ไข
      </button>
    </div>

    <div class="mt-5 space-y-3">
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="grid grid-cols-2 gap-4"
      >
        <span class="text-sm text-muted-foreground">
          {{ row[0] }}
        </span>

        <span class="text-right text-sm font-medium">
          {{ row[1] }}
        </span>
      </div>
    </div>
  </section>
</template>