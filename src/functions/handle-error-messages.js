import { LocalStorage, Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
    Loading.hide()
    if(LocalStorage.getItem("vibrate") == 0) {
            Dialog.create({
            class: "text-h6",
            title:      'Error',
            message:    errorMessage
        })
    }

} 