import { LocalStorage } from 'quasar'

export function SET_AUTH_USER (state, val) {
    LocalStorage.set('isUserAuth', val)
    state.isUserAuth = LocalStorage.getItem('isUserAuth')
}
export function AUTH_USER (state, val) {
    LocalStorage.set('authUser', val)
    state.authUser = LocalStorage.getItem('authUser')
}
export function SET_USER_DATA (state, val) {
    LocalStorage.set('userData', val)
    state.userData = LocalStorage.getItem('userData')
}