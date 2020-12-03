export function someAction(/* context */) {
}

export function setStart({ commit }, val) {
    commit('IS_START', val)
}
export function setFont({ commit }, val) {
    commit('SET_FONT_SIZE', val)
}
export function setAppMode({ commit, dispatch }, val) {
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
}

export function setVibrate({ commit }, val) {
    commit('SET_VIBRATE', val)
}


    // ===== Cache actions
    // export function appModeSave ({state}, val) {
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
    //         state.appMode.modeColor = '#001f28'
    //         state.appMode.bgColor    = 'bg-white'
    //         state.appMode.textColor =  'text-teal'
    //         state.appMode.textColorOptional =  'text-black'
    //     }

    //     LocalStorage.set('stgs', val) //stgs - settings key
    //     LocalStorage.set('appMode', state.appMode) //stgs - settings key
    // },


    // ===== Vibration options
    // vibrate ({}, audioPath = null) {
    //     console.log('Vibration triggered in: /store/modules/settings-module')
    //     window.navigator.vibrate(100);
    // }
