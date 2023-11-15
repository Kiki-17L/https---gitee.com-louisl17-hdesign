import { data } from 'autoprefixer'
import httpUtil from '../utils/HttpUtil'

//登录接口
export const login = (data) => {
  return httpUtil({
    url: '/login',
    method: 'get',
    params: {
      name: data.username,
      password: data.pw,
    },
  })
}

//注册接口
export function singup(data) {
  return httpUtil({
    url: '/enroll',
    method: 'get',
    params: {
      name: data.username,
      password: data.pw,
    },
  })
}

//修改密码
export function changePw(data) {
  return httpUtil({
    url: '/changePassword',
    method: 'post',
    params: {
      name: data.username,
      password: data.pw,
      newpassword: data.newpassword,
    },
  })
}
