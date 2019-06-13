import Vue from 'vue';
import Router from 'vue-router';
import LoupanList from './views/loupan-list/LoupanList.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'loupanList',
      component: LoupanList
    },
    {
      path: '/detail',
      name: 'loupanDetail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "about" */ './views/loupan-detail/LoupanDetail.vue'
        )
    }
  ]
});
