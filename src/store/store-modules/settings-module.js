import { LocalStorage } from 'quasar'

const state = {
    isConected: false, //verifica se está conectado á internet,
    settings: {
        mode: '',
        isNarratorActive: false,
        isVibrationActive: true,
        fontSize: '10pt',
    },
    appMode: {
        modeName:   'light',
        bgColor:     'bg-white',
        textColor:   'text-teal',
        textColorOptional:   'text-black',
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
    },


    // ===== Cache actions

    cacheSettings ({state}, val) {

        if (val.mode === 'dark') {
            state.appMode.modeName  = 'dark'
            state.appMode.bgColor    = 'bg-grey-10'
            state.appMode.textColor = 'text-white'
            state.appMode.textColorOptional = 'text-white'
        } else {
            state.appMode.modeName  = 'light'
            state.appMode.bgColor    = 'bg-white'
            state.appMode.textColor =  'text-teal'
            state.appMode.textColorOptional =  'text-black'
        }

        LocalStorage.set('stgs', val) //stgs - settings key
        LocalStorage.set('appMode', state.appMode) //stgs - settings key
    },

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
        window.navigator.vibrate([100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100]);
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}