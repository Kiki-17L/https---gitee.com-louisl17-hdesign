import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken(),
  username: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.username = name
  },
  RM_TOKEN: (state) => {
    state.token = ''
  },
  RM_NAME: (state) => {
    state.username = ''
  },
}

const getters = {
  getUserName(state) {
    return state.username
  },
}

const actions = {
  //登录action
  //登录之后保存token到全局，和Cookie.
  login({ commit }, userinfo) {
    return new Promise((resolve, reject) => {
      login(userinfo)
        .then((response) => {
          if (response.code == 200) {
            let { data } = response
            const result = data.split('|')
            commit('SET_TOKEN', result[1])
            commit('SET_NAME', result[0])
            setToken(result[1])
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('RM_TOKEN')
      commit('RM_NAME')
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
