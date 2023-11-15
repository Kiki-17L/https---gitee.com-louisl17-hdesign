//功能：存储、获取Token工具

import Cookies from 'js-cookie'
//Cookie的键
const TokenKey = 'token'

/**
 *
 * @returns 当前网站所存储的Token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 *  TODO:将token存储到Cookie里面
 *
 * @param {String} token 需要存储的token
 * @returns
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 *  TODO:从Cookie里面移除token
 * @returns
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
