import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 默认跳转
  { path: '/', redirect: '/main' },

  //用户主页面
  {
    path: '/main',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/',
        redirect: 'dataSource',
      },

      // 创建数据源页面
      {
        path: 'dataSource',
        component: () => import('@/views/datasource/index.vue'),
        children: [
          { path: '/', name:'dshome', component: () => import('@/views/datasource/components/AppMain.vue') },
          { path: 'sql', name: 'sql', component: () => import('@/views/datasource/components/RunSql.vue') },
        ],
      },

      // 创建仪表盘界面
      {
        path: 'dashBoard',
        component: () => import('@/views/designer/index.vue'),
      },

      // 预览界面
      {
        path: 'preview',
        component: () => import('@/views/preview/SetUp.vue'),
        children: [
          {
            path: 'Index',
            name: 'Index',
            component: () => import('@/views/preview/components/Index.vue'),
            children: [
              {
                path: 'NBIComponents',
                name: 'NBIComponents',
                component: () => import('@/views/preview/components/NBIComponents.vue'),
              },
              {
                path: 'NBIFeatures',
                name: 'NBIFeatures',
                component: () => import('@/views/preview/components/NBIFeatures.vue'),
              },
              {
                path: 'Others',
                name: 'Others',
                component: () => import('@/views/preview/components/Others.vue'),
              },
            ],
          },
        ],
      },

      // 设置界面
      {
        path: 'settings',
        component: () => import('@/views/datasource/index.vue'),
      },

      // 数据流界面
      {
        path: 'realtime',
        component: () => import('@/views/realtime/index.vue'),
      },
    ],
  },

  // 登录页面
  { path: '/login', component: () => import('@/views/login/index.vue') },

  // 测试用界面
  { path: '/test', component: () => import('@/test/index.vue') },

  // 大屏展示界面
  { path: '/show', component: () => import('@/views/show/index.vue') },
]

const router = new VueRouter({
  // mode: 'history',
  routes,
})

export default router
