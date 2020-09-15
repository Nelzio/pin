import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import settings from './settings-module'
import auth from './auth-module'
import vacancy from './vacancy-module'
import user from './user-module'
import store from './store-module'
import admin from './admin-module'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      settings,
      auth,
      vacancy,
      user,
      store,
      admin
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
