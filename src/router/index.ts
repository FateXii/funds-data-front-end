import { createRouter, createWebHistory } from 'vue-router';
import UnitTrusts from '@/views/UnitTrusts.vue';
import Authentication from '@/views/Authentication.vue';
import InvestmentGoal from '@/views/InvestmentGoal.vue';
import Dashboard from '@/views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/create-investment-goal',
    name: 'InvestmentGoal',
    component: InvestmentGoal,
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
