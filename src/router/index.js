import Vue from 'vue'
import Router from 'vue-router'
import RouterLink from '@/components/RouterLink'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: RouterLink,
    },
    {
      path: '/1',
      name: 'State 1',
      meta: { color: "red" },
      component: RouterLink
    },
    {
      path: '/2',
      name: 'State 2',
      meta: { color: "yellow" },
      component: RouterLink
    },
    {
      path: '/3',
      name: 'State 3',
      meta: { color: "green" },
      component: RouterLink
    }
  ]
})
