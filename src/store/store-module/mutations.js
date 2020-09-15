import { LocalStorage } from 'quasar'

export function SET_STORIES (state, val) {
    state.stories = val
    LocalStorage.set('stories', state.stories)
}
export function SET_STORE (state, val) {
    state.storeDtl = val
}
export function SET_STORE_CHANGE (state, val) {
    state.storeUploaded = val
}
export function SET_STORE_DTL_CHANGE (state, val) {
    state.storeDetail = val
}
export function SET_STORE_DELETED (state, val) {
    state.storeDeleted = val
}
