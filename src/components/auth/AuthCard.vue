<script setup lang="ts">
defineProps<{
  title: string
  description: string
  step?: string
}>()
</script>

<template>
  <main class="min-h-screen bg-background px-5 py-14 text-foreground">
    <div class="mx-auto max-w-lg">
      <p
        v-if="step"
        class="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {{ step }}
      </p>

      <h1 class="mt-2 text-3xl font-bold">
        {{ title }}
      </h1>

      <p class="mt-2 text-sm text-muted-foreground">
        {{ description }}
      </p>

      <div class="surface-card mt-8 p-6">
        <slot />
      </div>
    </div>
  </main>
</template>