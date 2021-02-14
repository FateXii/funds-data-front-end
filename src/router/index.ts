import { createRouter, createWebHistory } from 'vue-router';
import UnitTrusts from '@/views/UnitTrusts.vue';
import Authentication from '@/views/Authentication.vue';

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Authentication,
  },
  {
    path: '/unit_trust_list',
    name: 'UnitTrusts',
    component: UnitTrusts,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
