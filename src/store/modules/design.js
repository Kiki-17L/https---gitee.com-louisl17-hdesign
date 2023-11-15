// 设计模块

import { getAllDataSource } from '@/api/datasource.js'

// 状态
const state = {
  //数据源列表
  sourceList: [],
  //标记是否刷新数据源列表
  flag: 0,
  currentProject: -1,
}
const mutations = {
  //设置数据源列表
  SET_SOURCELIST: (state, list) => {
    state.sourceList.children = list
  },

  SET_Project: (state, id) => {
    state.currentProject = id
  },
  RESET_Project: (state) => {
    state.currentProject = -1
  },
}

const getters = {
  getList(state) {
    return state.sourceList
  },
  getCurrentProj(state) {
    return state.currentProject
  },
}

// 活动
const actions = {
  // 获取所有数据源
  fetchAllDS({ commit }, username) {
    return new Promise((resolve, reject) => {
      getAllDataSource(username)
        .then((response) => {
          let { data } = response
          commit('SET_SOURCELIST', data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
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
