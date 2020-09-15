import { LocalStorage } from 'quasar'
export default {
  isUserAuth: LocalStorage.getItem('isUserAuth') ? LocalStorage.getItem('isUserAuth') : false,
  authUser: LocalStorage.getItem('authUser') ? LocalStorage.getItem('authUser') : null,
  userData: LocalStorage.getItem('userData') ? LocalStorage.getItem('userData') : {
    displayName: "",
    email: "",
    photoURL: "",
    access: "",
    association: "",
    phoneNumber: "",
    address: "",
    profession: "",
    education: "",
    profileType: "",
    description: "",
    date: ""
  },
}
