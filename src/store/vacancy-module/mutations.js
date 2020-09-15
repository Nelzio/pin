import { LocalStorage } from 'quasar'

export function SET_VACANCIES (state, val) {
    state.vacancies = val
    LocalStorage.set('vacancies', state.vacancies)
}
export function SET_VACANCY (state, val) {
    state.vacancyDtl = val
}
export function SET_VACANCY_CHANGE (state, val) {
    state.vacancyUploaded = val
}
export function SET_VACANCY_DTL_CHANGE (state, val) {
    state.vacancyDetail = val
}
export function SET_VACANCY_DELETED (state, val) {
    state.vacancyDeleted = val
}