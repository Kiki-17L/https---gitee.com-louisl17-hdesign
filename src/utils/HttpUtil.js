//功能：网络请求工具
import axios from 'axios'

import { getToken } from '@/utils/auth.js'

//通过基本配置，创建并导出一个axios实例
const httpUtil = axios.create({
  timeout: 0,
  baseURL: '/api', //上线端口
  //下面都是开发时用
  // baseURL: 'http://10.16.59.147:5173/api', //node转远程
  // baseURL: 'http://localhost:5173/api', // 同上
  // baseURL: 'http://101.42.19.16:6511/', // CORS 跨域
  // baseURL: 'http://localhost:8080', // 本地CORS 跨域
  withCredentials: true,
})

// 请求拦截器
httpUtil.interceptors.request.use(
  (config) => {
    const token = getToken()
    // 如果本地由token,则在每次请求时加上Token头
    if (token) {
      config.headers['Token'] = token
    }
    return config
  },

  (error) => {
    console.log('error')
    return Promise.reject(error)
  }
)

// 响应拦截器
httpUtil.interceptors.response.use(
  // 将服务器数据从 axios 返回对象里面抽离出来
  (response) => {
    let res = response.data
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpUtil
