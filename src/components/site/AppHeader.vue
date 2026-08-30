<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { LogOut, ChevronDown } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

const showMenu = ref(false)

const logout = () => {
  authStore.logout()
  showMenu.value = false
  router.push('/')
}
</script>

<template>
  <header class="border-b border-border bg-white">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
          <span class="text-sm font-bold">บส</span>
        </div>

        <div>
          <p class="text-sm font-bold text-navy">บัตรสวัสดิการแห่งรัฐ</p>

          <p class="text-xs text-muted-foreground">ระบบลงทะเบียนออนไลน์</p>
        </div>
      </RouterLink>

      <nav class="flex items-center gap-2">
        <div v-if="authStore.user" class="relative">
          <button
            type="button"
            class="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary/80"
            @click="showMenu = !showMenu"
          >
            <span>
              {{ authStore.user.firstName }}
              {{ authStore.user.lastName }}
            </span>

            <ChevronDown class="size-4 transition-transform" :class="{ 'rotate-180': showMenu }" />
          </button>

          <div
            v-if="showMenu"
            class="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-lg border border-border bg-white shadow-lg"
          >
            <button
              type="button"
              class="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-destructive transition hover:bg-destructive/10"
              @click="logout"
            >
              <LogOut class="size-4" />
              ออกจากระบบ
            </button>
          </div>
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
