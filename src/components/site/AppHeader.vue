<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <header class="border-b border-border bg-white">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
      <RouterLink
        to="/"
        class="flex items-center gap-3"
      >
        <div
          class="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground"
        >
          <span class="text-sm font-bold">บส</span>
        </div>

        <div>
          <p class="text-sm font-bold text-navy">
            บัตรสวัสดิการแห่งรัฐ
          </p>

          <p class="text-xs text-muted-foreground">
            ระบบลงทะเบียนออนไลน์
          </p>
        </div>
      </RouterLink>

      <nav class="flex items-center gap-2">
        <RouterLink
          to="/status"
          class="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
        >
          ตรวจสอบสถานะ
        </RouterLink>

        <div
          v-if="authStore.user"
          class="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-foreground"
        >
          {{ authStore.user.firstName }}
          {{ authStore.user.lastName }}
        </div>

        <RouterLink
          v-else
          to="/login"
          class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-navy-soft"
        >
          เข้าสู่ระบบ
        </RouterLink>
      </nav>
    </div>
  </header>
</template>