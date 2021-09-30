import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    flash: {
      show: false,
      message: ''
    }
  },
  mutations: {
    showFlash(state, payload) {
      state.flash.show = true
      state.flash.message = payload
    },
    hideFlash(state) {
      state.flash.show = false
    }
  },
  actions: {
  },
  modules: {
  }
})
