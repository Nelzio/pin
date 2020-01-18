import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firebase } from "../../boot/firebase";
import { showErrorMessage } from "../../functions/handle-error-messages";

const state = {
    isUserAuth: LocalStorage.getItem('isUserAuth'),
    authUser: LocalStorage.getItem('authUser'),
}

const mutations = {

    SET_AUTH_USER(state, val) {
        state.isUserAuth = val
        LocalStorage.set('isUserAuth', val)
    },
    AUTH_USER(state, val) {
        state.authUser = val // isto é desnecessario, but...
        LocalStorage.set('authUser', state.authUser)
    }
}

const getters = {
    user(state){
        return state.authUser
    }
}

const actions = {

    registerUser({ commit }, payload) {
        Loading.show()
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('SET_AUTH_USER', true)
                commit('AUTH_USER', user)
                this.$router.push('/profile')
                Notify.create('A sua conta foi criada com sucesso!')
                Loading.hide()
            })
            .catch(error => {
                commit("AUTH_USER", null)
                Loading.hide()
                showErrorMessage(error.message)
            })
    },

    googleSingIn() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
            //   this.user = result.user
            console.log(result.user)
            const userData = {
                displayName: result.user.displayName,
                email: result.user.email,
                emailVerified: result.user.emailVerified,
                phoneNumber: result.user.phoneNumber,
                photoURL: result.user.photoURL,
                refreshToken: result.user.refreshToken,
                uid: result.user.uid
            }
            commit('AUTH_USER', userData)
            commit('SET_AUTH_USER', true)
            Notify.create('Sessão iniciada com sucesso!')
            this.$router.push('/profile')
        }).catch(err => console.log(err))
    },

    loginUser({ commit }, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('SET_AUTH_USER', true)
                commit('AUTH_USER', user)
                Notify.create('Sessão iniciada com sucesso!')
                this.$router.push('/profile')
                Loading.hide()
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },

    // login () {
    //     Auth.signInWithEmailAndPassword(this.email, this.password)
    //         .then(() => this.$router.push('/dashboard'))
    //         .catch(err => this.errors.push(err.message));
    // },

    handleAuthStateChange({ commit, dispatch }) {
        // commit('SET_AUTH_USER', LocalStorage.getItem('isUserAuth'))
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                commit('SET_AUTH_USER', true)
                //Calling the action 'firebaseReadTasks' in module 'task'
                //This action listen to diferent events
                // dispatch('task/firebaseReadTasks', null, {root: true})
                // this.$router.push('/')
                // // console.log("Autenticado")
            } else {
                // commit('task/clearTasks', null, { root: true })
                // commit('task/setTasksDownloaded', false, { root: true })
                commit('SET_AUTH_USER', false)
                // this.$router.push('/account')
                // // console.log("Nao autenticado")
            }
        })
    },

    logoutUser({ commit }) {
        firebaseAuth.signOut();
        commit('SET_AUTH_USER', false)
        commit('AUTH_USER', null)
        this.$router.push('/')
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}