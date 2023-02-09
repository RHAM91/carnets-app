import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { ipcRenderer } from 'electron'
import { minix } from '@/components/functions/alertas'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'kat',
  storage: window.localStorage,
  reducer: state => ({
    
  }) 
})

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async guardarDatos({commit, state, dispatch}, data){
      let r = await ipcRenderer.invoke('informacion', data)
      minix({icon: 'success', mensaje: r.message, tiempo: 3000})
      
    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
