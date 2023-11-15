import Vue from 'vue'
import App from './App.vue'

//导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router' //路由
import store from './store' //状态管理

import * as echarts from 'echarts' //导入echarts

import './assets/main.css' //导入tailwind样式
import './permission' //权限控制

import '@/assets/icons/iconfont.css' //导入图标样式

// import dataV from '@jiaminghi/data-view' //导入dataV
import '@/components/register-cpt' //注册所有组件
import '@/components/register-config' //注册组件配置
import { v1 } from 'uuid'

Vue.prototype.$v1 = v1
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
