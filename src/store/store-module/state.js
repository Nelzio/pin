import { LocalStorage } from 'quasar'

export default {
  stories: LocalStorage.getItem("stories") ? LocalStorage.getItem("stories") : [],
  storeDtl: {
    key: "",
    title: "",
    user: "",
    description: "",
    img: "",
    public: false,
    category: "",
    place: "",
    subCategory: "",
    timeSend: "",
    price: "",
    priceVariable: false,
  },
  storeUploaded: false,
  storeDetail: false,
  storeDeleted: false
}
