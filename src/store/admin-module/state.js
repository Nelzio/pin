import { LocalStorage } from 'quasar'
export default {
  vacancy: LocalStorage.getItem('vacancy') ? LocalStorage.getItem('vacancy') : {},
}
