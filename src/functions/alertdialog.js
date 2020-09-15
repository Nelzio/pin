import { LocalStorage, Dialog } from 'quasar'

export function alertMessage (message, vm) {
    Dialog.create({
        dark: LocalStorage.getItem("lightMode") ? false : true,
        title: 'Confirmação',
        message: message
    }).onOk(() => {
        // console.log('OK')
        vm.$router.go(-1)
    }).onCancel(() => {
        // console.log('Cancel')
    }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
    })
}