import { LocalStorage } from 'quasar'

export default {
  vacancies: LocalStorage.getItem("vacanciens") ? LocalStorage.getItem("vacanciens") : [],
  vacancyDtl: {
    key: "",
    title: "",
    user: "",
    description: "",
    img: "",
    public: false,
    place: "",
    category: "",
  },
  vacancyUploaded: false,
  vacancyDetail: false,
  vacancyDeleted: false
}
