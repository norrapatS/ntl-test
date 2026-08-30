<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-background px-5">
    <div class="text-center">
      <div
        class="mx-auto grid size-16 place-items-center rounded-full bg-red-100 text-2xl"
      >
        🔒
      </div>

      <h1 class="mt-5 text-2xl font-bold">
        ไม่มีสิทธิ์เข้าถึง
      </h1>

      <p class="mt-2 text-sm text-muted-foreground">
        คุณไม่มีสิทธิ์เข้าถึงหน้านี้
      </p>

      <RouterLink
        to="/"
        class="mt-6 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        กลับหน้าหลัก
      </RouterLink>
    </div>
  </main>
</template>