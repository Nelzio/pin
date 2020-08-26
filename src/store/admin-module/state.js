import { LocalStorage } from 'quasar'
export default {
  vacancyId: LocalStorage.getItem('vacancyId') ? LocalStorage.getItem('vacancyId') : "",
}
