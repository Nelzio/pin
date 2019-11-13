import { LocalStorage } from 'quasar'

export default ({ router }) => {

    router.beforeEach ((to, from, next) => {

        let loggedIn = LocalStorage.getItem('isUserAuth') //Buscando o estado se o user está ou não auth

        if (!loggedIn && to.path !== '/auth') {

            next ('/auth')

        } else {

            next ()

        }

    })


}
