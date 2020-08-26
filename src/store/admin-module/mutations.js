import { LocalStorage } from 'quasar'
export function SET_VACANCY_ID ( state, val ) {
    LocalStorage.set("vacancyId", val)
    state.vacancyId = val
}
