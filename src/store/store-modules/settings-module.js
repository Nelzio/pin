import { LocalStorage } from 'quasar'

const state = {
    isConected: false, //verifica se está conectado á internet,
    settings: {
        mode: '',
        isNarratorActive: false,
    },
    soundHome: '/statics/audios/home.wav',
    soundError: '/statics/audios/error.wav'
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

    setIsConected ({state, commit, dispatch}, val) {
        commit('setIsConected', val)
        if (val) {
            dispatch('playSound', state.soundHome)
        } else {
            dispatch('playSound', state.soundError)
        }
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
    },

    // ===== Audio options

    playSound ({}, audioPath) {
        if(audioPath) {
            var audio = new Audio(audioPath);
            audio.play();
        }
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}