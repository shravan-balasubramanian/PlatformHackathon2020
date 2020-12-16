import Vue from 'vue';
import VueRouter from 'vue-router';

const MainSection = () => import('../views/MainSection');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainSection,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
});

export default router;
