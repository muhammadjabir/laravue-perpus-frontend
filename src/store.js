import Vue from 'vue'
import Vuex from 'vuex'
import alert from './stores/alert'
import data from './stores/data'
import dialog from './stores/dialog'
import auth from './stores/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	sideBar:true,
  },
  mutations: {
  	setSidebar: (state,status) => {
  		state.sideBar=status
  	}
  },
  actions: {
  	setSidebar: ({commit},status)=>{
  		commit('setSidebar',status)
  	}
  },
  getters: {
  	sideBar: state => state.sideBar,
  },
  modules:{
    alert,
    dialog,
    data,
    auth
  }
})
