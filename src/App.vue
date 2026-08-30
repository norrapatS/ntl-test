<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/site/AppHeader.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.fetchProfile()
})
</script>

<template>
  <AppHeader />
  <RouterView />
</template>
