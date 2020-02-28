import { Dialog, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
    Loading.hide()
    Dialog.create({
        class: "text-h6",
        title:      'Error',
        message:    errorMessage
    })

} 