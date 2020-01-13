import { LocalStorage } from 'quasar'

const state = {
    isConected: false, //verifica se está conectado á internet,
    settings: {
        appMode: 1,
        isNarratorActive: false,
        isVibrationActive: true,
        fontSize: '10pt',
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
    },
    setAppMode (state, val) {
        state.appMode = val
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
        // if (val) {
        //     dispatch('playSound', state.soundHome)
        // } else {
        //     dispatch('playSound', state.soundError)
        // }
    },
    setSettings ({commit, dispatch}, val) {
        commit('setSettings', val)
        dispatch('cacheSettings', val)
    },
    setAppMode ({commit, dispatch}, val) {
        commit('setAppMode', val)
    },


    // ===== Cache actions

    // cacheSettings ({state}, val) {

    // },

    // ===== Audio options
    playSound ({}, audioPath) {
        if(audioPath) {
            var audio = new Audio(audioPath);
            audio.play();
        }
    },

    // ===== Vibration options
    vibrate ({}, audioPath = null) {
        console.log('Vibration triggered in: /store/modules/settings-module')
        window.navigator.vibrate(200);
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}