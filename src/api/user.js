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
