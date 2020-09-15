import { LocalStorage } from 'quasar'

export function IS_START (state, val) {
    state.homeSpeak = val
}
export function setIsConected (state, val) {
    state.isConected = val
}
export function SET_FONT_SIZE (state, val) {
    state.fontConfig = val
    LocalStorage.set('fontSize', val)
}
export function setAppMode (state, val) {
    state.appMode = val
    LocalStorage.set('lightMode', val)
}
export function appModeSave (state, val) {
    state.darkModeConf = val
}
export function SET_VIBRATE (state, val) {
    state.vibrateState = val
    LocalStorage.set("vibrate", val)
}