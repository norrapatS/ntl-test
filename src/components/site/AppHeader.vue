<script setup lang="ts">
import { RouterLink } from 'vue-router'
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

        <RouterLink
          to="/login"
          class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-navy-soft"
        >
          เข้าสู่ระบบ
        </RouterLink>
      </nav>
    </div>
  </header>
</template>