import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import HomeView from '@/views/HomeView.vue';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      layout: 'main',
      requireAuth: true,
    },
  },
  {
    path: '/auth',
    component: () => import('@/views/AuthView.vue'),
    meta: {
      layout: 'auth',
      requireAuth: false,
    },
  },
  {
    path: '/search',
    component: () => import('@/views/SearchView.vue'),
    meta: {
      layout: 'main',
      requireAuth: true,
    },
  },
  {
    path: '/movie/:id',
    component: () => import('@/views/MovieView.vue'),
    props: true,
    meta: {
      layout: 'main',
      requireAuth: true,
    },
  },
  {
    path: '/:notFound(.*)',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      layout: 'main',
      requireAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requireAuth && !authStore.isAuthenticated) {
    next('/auth?type=signin&message=auth');
  } else {
    next();
  }
});

export default router;
