import { LocalStorage } from 'quasar'

const state = {
    isConected: false, //verifica se está conectado á internet,
    settings: {
        mode: '',
        isNarratorActive: false,
    }
}

const mutations = {
    setIsConected (state, val) {
        state.isConected = val
    },
    setSettings (state, val) {
        state.settings = val
    }

}

const getters = {

    getSettings (state) {
        return state.settings
    }

}

const actions = {

    setIsConected ({commit}, val) {
        commit('setIsConected', val)
    },
    setSettings ({commit, dispatch}, val) {
        commit('setSettings', val)
        dispatch('cacheSettings', val)
        console.log('Action setSettings called good.')
    },


    // ===== Cache actions

    cacheSettings ({}, val) {
        LocalStorage.set('stgs', val) //stgs - settings key
        console.log('Settings saved in LocalStorage. From pages/settings/PageSettings.vue')
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}