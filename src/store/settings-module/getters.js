export function getFont (state) {
    if (state.fontConfig == 3) {
        return state.fonts.font3
    } else if (state.fontConfig == 1) {
        return state.fonts.font1
    }
    return state.fonts.font2
}
export function getFontMode (state) {
    return state.fontConfig
}
export function getMode (state) {
    return state.appMode
}
export function getStart (state) {
    return state.homeSpeak
}
export function getVibrate (state) {
    if (state.vibrateState == 1) {
        return true
    } else {
        return false
    }
}
