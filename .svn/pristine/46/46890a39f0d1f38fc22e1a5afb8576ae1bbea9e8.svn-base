import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const login = resolve => require(['@/page/login/login'], resolve)
const main = resolve => require(['@/page/main/main'], resolve)
const notFount = resolve => require(['@/page/notFount/notFount'], resolve)
const router = new Router({
  mode: 'hash',
  base: '../',
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: login
    },
    {
      path: '/main',
      redirect: '/info',
      name: 'main.vue',
      component: main,
      meta: { requireAuth: false },
      children: [
        {
          path: '/info',
          name: '账户信息',
          component: () => import('@/components/UserInfo/UserInfo'),
          meta: {
            title: '账户信息',
            hideclose: true
          }
        },
        {
          path: '/visitis',
          name: '在线问诊',
          component: () => import('@/components/OnlineVisits/OnlineVisits'),
          meta: {
            title: '在线问诊',
            hideclose: true
          }
        },
        {
          path: '/earnings',
          name: '线上收益',
          component: () => import('@/components/Earnings/Earnings'),
          meta: {
            title: '线上收益',
            hideclose: true
          }
        }
      ],
    },
    {
      path: '*',
      name: '没有该页面',
      component: notFount
    }
  ]
})
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token')
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (token) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: '没有登录哦' } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
