import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import settings from './store-modules/settings-module'
import auth from './store-modules/auth-module'
import vacancy from './store-modules/vacancy-module'
import user from './store-modules/user-module'
import store from './store-modules/store-module'

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
      store
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
