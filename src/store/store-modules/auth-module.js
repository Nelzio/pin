import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firestoreDb, firebase } from "../../boot/firebase"
import { showErrorMessage } from "../../functions/handle-error-messages"

const state = {
    isUserAuth: LocalStorage.getItem('isUserAuth'),
    authUser: LocalStorage.getItem('authUser'),
    userData: LocalStorage.getItem('userData'),
}

const mutations = {

    SET_AUTH_USER(state, val) {
        state.isUserAuth = val
        LocalStorage.set('isUserAuth', val)
    },
    AUTH_USER(state, val) {
        state.authUser = val // isto é desnecessario, but...
        LocalStorage.set('authUser', state.authUser)
    },
    SET_USER_DATA(state, val) {
        state.userData = val // isto é desnecessario, but...
        LocalStorage.set('userData', state.userData)
    }
}

const getters = {
    user(state) {
        return state.authUser
    },
    userData(state) {
        return state.userData
    },
    isUserAuth(state) {
        return state.isUserAuth
    }
}

const actions = {

    // registerUser({ commit }, payload) {
    //     Loading.show()
    //     firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    //         .then(user => {
    //             commit('SET_AUTH_USER', true)
    //             commit('AUTH_USER', user)
    //             this.$router.push('/profile')
    //             Notify.create('A sua conta foi criada com sucesso!')
    //             Loading.hide()
    //         })
    //         .catch(error => {
    //             commit("AUTH_USER", null)
    //             Loading.hide()
    //             showErrorMessage(error.message)
    //         })
    // },


    googleSingIn({ commit }) {
        Loading.show()
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
            //   this.user = result.user
            const userData = {
                displayName: result.user.displayName,
                email: result.user.email,
                emailVerified: result.user.emailVerified,
                phoneNumber: result.user.phoneNumber,
                photoURL: result.user.photoURL,
                refreshToken: result.user.refreshToken,
                uid: result.user.uid
            }
            console.log(userData)
            commit('AUTH_USER', userData)
            commit('SET_AUTH_USER', true)
            Notify.create('Sessão iniciada com sucesso!')
            this.$router.go(-1)
            Loading.hide()
        }).catch(err => {
            console.log(err)
            Loading.hide()
        })
    },

    editUser({ commit }, payload) {
        // Edit or add a user
        Loading.show()
        const ref = firestoreDb.collection('users').doc(payload.id) // email is the key
        ref.set(payload.data).then((docRef) => {
            console.log("Updated")
            this.$router.go(-1)
            Loading.hide()
        })
            .catch((error) => {
                Loading.hide()
                alert("Error adding document: ", error)
            })
    },

    detailUser({ commit }, id) {
        // Details of a user
        const ref = firestoreDb.collection('users').doc(id)
        let data = {}
        ref.get().then((doc) => {
            if (doc.exists) {
                data = {
                    id: doc.id,
                    telephone: doc.data().telephone,
                    adress: doc.data().adress,
                    profission: doc.data().profission,
                    education: doc.data().education,
                    date: doc.data().date
                }
                commit('SET_USER_DATA', data)
            } else {
                // If user desen't exist
                data = {
                    id: null,
                    telephone: "Não definido",
                    adress: "Não definido",
                    profission: "Não definido",
                    education: "Não definido",
                    date: "01/01/2000",
                }
                commit('SET_USER_DATA', data)
            }
        })
    },

    // loginUser({ commit }, payload) {
    //     Loading.show()
    //     firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    //         .then(user => {
    //             commit('SET_AUTH_USER', true)
    //             commit('AUTH_USER', user)
    //             Notify.create('Sessão iniciada com sucesso!')
    //             this.$router.push('/profile')
    //             Loading.hide()
    //         })
    //         .catch(error => {
    //             showErrorMessage(error.message)
    //         })
    // },

    // login () {
    //     Auth.signInWithEmailAndPassword(this.email, this.password)
    //         .then(() => this.$router.push('/dashboard'))
    //         .catch(err => this.errors.push(err.message))
    // },

    checkAuthUser({ commit }) {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                commit('SET_AUTH_USER', true)
            } else {
                commit('SET_AUTH_USER', false)
                commit('AUTH_USER', null)
                this.$router.push('/account')
            }
        })
    },

    // logoutUser({ commit }) {
    //     firebaseAuth.signOut()
    //     commit('SET_AUTH_USER', false)
    //     commit('AUTH_USER', null)
    //     this.$router.push('/')
    // },

    signOut({ commit }) {
        Loading.show()
        firebaseAuth.signOut()
            .then(() => {
                commit('SET_AUTH_USER', false)
                commit('AUTH_USER', null)
                this.$router.push('/')
                Loading.hide()
            })
    },

    deleteUser({ commit }, id) {
        // Loading.show()
        var user
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
            user = firebaseAuth.currentUser
            firestoreDb.collection('users').doc(id).delete().then(() => {
                user.delete().then(function () {
                    // User deleted.
                    commit('SET_AUTH_USER', false)
                    commit('AUTH_USER', null)
                    commit('SET_USER_DATA', null)
                    Notify.create('Usuario Excluido')
                    this.$router.push('/')
                    Loading.hide()
                }).catch(function (error) {
                    // An error happened.
                    Notify.create('Erro ao deletar')
                    Loading.hide()
                })
            }).catch((error) => {
                Loading.hide()
                alert("Error removing document: ", error);
            });
        }).catch(err => console.log(err))
        

        
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}