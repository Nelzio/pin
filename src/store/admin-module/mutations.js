import { LocalStorage } from 'quasar'
export function SET_VACANCY ( state, val ) {
    LocalStorage.set("vacancy", val)
    state.vacancy = val
}
