import axios from 'axios'
import { getToken } from '@/utils/auth.js'

const fileHttp = axios.create({
  baseURL: '/api', //上线地址
  // baseURL: 'http://localhost:5173/test',
  // baseURL: 'http://localhost:5173/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})

// 请求拦截器
fileHttp.interceptors.request.use(
  (config) => {
    const token = getToken()
    // 如果本地由token,则在每次请求时加上Token头
    if (token) {
      config.headers['token'] = token
    }
    return config
  },

  (error) => {
    console.log('error')
    return Promise.reject(error)
  }
)

// 响应拦截器
fileHttp.interceptors.response.use(
  // 将服务器数据从 axios 返回对象里面抽离出来
  (response) => {
    let res = response.data
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 *上传一个文件
 * @param {文件对象} file
 * @returns axio实例
 */
export function uploadFile(file) {
  return fileHttp({
    url: '/file/uploadFile',
    method: 'post',
    data: file,
  })
}
