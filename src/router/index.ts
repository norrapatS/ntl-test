import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
import { UserRole } from '@/types/user.enum'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },

    {
      path: '/apply',
      name: 'apply',
      component: () => import('@/views/ApplyView.vue'),
      meta: {
        requiresAuth: true,
        role: UserRole.USER,
      },
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: {
        requiresAuth: true,
        role: UserRole.ADMIN,
      },
    },

    {
      path: '/admin/applications/:transactionNo',
      name: 'admin-application-detail',
      component: () => import('@/views/AdminDetailView.vue'),
      meta: {
        requiresAuth: true,
        role: UserRole.ADMIN,
      },
    },

    {
      path: '/unauthorize',
      name: 'unauthorize',
      component: () => import('@/views/UnauthorizedView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.initialized) {
    await authStore.fetchProfile()
  }

  if (to.meta.requiresAuth && !authStore.user) {
    return {
      name: 'login',
    }
  }

  if (
    to.meta.role &&
    authStore.user?.role !== to.meta.role
  ) {
    return {
      name: 'unauthorize',
    }
  }

  return true
})

export default router