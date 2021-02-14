import { createRouter, createWebHistory } from 'vue-router';
import UnitTrusts from '@/views/UnitTrusts.vue';

const routes = [
  {
    path: '/',
    name: 'UnitTrusts',
    component: UnitTrusts,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
