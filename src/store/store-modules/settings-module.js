import { LocalStorage } from 'quasar'

const state = {
    isConected: false, //verifica se está conectado á internet,
    fonts: {
        font1: {
            title: "text-h6",
            text: "text-caption",
        },
        font2: {
            title: "text-h5",
            text: "text-body1",
        },
        font3: {
            title: "text-h4",
            text: "text-h5",
        }
    },
    fontConfig: LocalStorage.getItem("fontSize") ? LocalStorage.getItem("fontSize") : 2,
    appMode: 1,
    darkModeConf: {
        bgColor: "bg-white",
        textColor: "text-black",
        color: "black",
        textBtn: "text-white",
        icon: "primary",
        iconVar: "primary",
    },
    vibrateState: 1,
}

const mutations = {
    setIsConected(state, val) {
        state.isConected = val
    },
    SET_FONT_SIZE(state, val) {
        state.fontConfig = val
        LocalStorage.set('fontSize', val)
    },
    setAppMode(state, val) {
        state.appMode = val
    },
    appModeSave(state, val) {
        state.darkModeConf = val
    },
    SET_VIBRATE(state, val) {
        state.vibrateState = val
    }

}

const getters = {

    getFont(state) {
        if (state.fontConfig == 3) {
            return state.fonts.font3
        } else if (state.fontConfig == 1) {
            return state.fonts.font1
        }
        return state.fonts.font2
    },

    getFontMode(state) {
        return state.fontConfig
    },

    getMode(state) {
        return state.appMode
    }

}

const actions = {

    setFont({ commit }, val) {
        commit('SET_FONT_SIZE', val)
    },
    setAppMode({ commit, dispatch }, val) {
        commit('setAppMode', val)
        let payload
        if (val) {
            payload = {
                bgColor: "bg-white",
                textColor: "text-black",
                color: "black",
                textBtn: "text-white",
                icon: "primary",
                iconVar: "primary",
            }
            commit('appModeSave', payload)
        } else {
            payload = {
                bgColor: "bg-black",
                textColor: "text-white",
                color: "white",
                textBtn: "text-black",
                icon: "primary",
                iconVar: "white",
            }
            commit('appModeSave', payload)
        }
        // dispatch('appModeSave', val)
    },

    setVibrate({ commit }, val) {
        commit('SET_VIBRATE', val)
    },


    // ===== Cache actions
    // appModeSave ({state}, val) {
    //     if(val) {
    //         state.darkModeConf.bgColor = "bg-white"
    //         state.darkModeConf.textColor = "text-black"
    //         state.darkModeConf.color = "black"
    //         state.darkModeConf.textBtn = "text-white"
    //         } else {
    //         state.darkModeConf.bgColor = "bg-black"
    //         state.darkModeConf.textColor = "text-white"
    //         state.darkModeConf.color = "white"
    //         state.darkModeConf.textBtn = "text-black"
    //     }
    //     LocalStorage.set('appMode', state.appMode)
    // },
    // cacheSettings ({state}, val) {

    //     if (val.mode === 'dark') {
    //         state.appMode.modeName  = 'dark'
    //         state.appMode.modeColor = '#212121'
    //         state.appMode.bgColor    = 'bg-grey-10'
    //         state.appMode.textColor = 'text-white'
    //         state.appMode.textColorOptional = 'text-white'
    //     } else {
    //         state.appMode.modeName  = 'light'
    //         state.appMode.modeColor = '#075e54'
    //         state.appMode.bgColor    = 'bg-white'
    //         state.appMode.textColor =  'text-teal'
    //         state.appMode.textColorOptional =  'text-black'
    //     }

    //     LocalStorage.set('stgs', val) //stgs - settings key
    //     LocalStorage.set('appMode', state.appMode) //stgs - settings key
    // },

    // ===== Audio options
    playSound({ }, audioPath) {
        // if(audioPath) {
        //     var audio = new Audio(audioPath);
        //     audio.play();
        // }
    },

    // ===== Vibration options
    // vibrate ({}, audioPath = null) {
    //     console.log('Vibration triggered in: /store/modules/settings-module')
    //     window.navigator.vibrate(100);
    // },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}