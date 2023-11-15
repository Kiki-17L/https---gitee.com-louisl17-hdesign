import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import design from './modules/design'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    design,
  },
})

export default store
