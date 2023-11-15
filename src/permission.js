import router from './router'
import { getToken } from '@/utils/auth'

import NProgress from 'nprogress' //导入进度条
import 'nprogress/nprogress.css' //导入进度样式

//访问白名单
const whiteList = ['/login', '/404', '/401', '/test']
// const whiteList = ['/login', '/404', '/401', '/test', '/main/dataSource', '/main/preview', '/main/dashBoard', '/main/settings', '/show']

router.beforeEach((to, from, next) => {
  NProgress.start()
  //先检查有没有Token
  const hastoken = getToken()

  if (hastoken) {
    //如果有Token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    //如果没有Token
    if (whiteList.indexOf(to.path) !== -1) {
      next() //如果在白名单上就放行
    } else {
      next('/login?redirect=${to.path}') //没有在白名单上就重定向到登录界面
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
