import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from "../../boot/firebase";
import { showErrorMessage } from "../../functions/handle-error-messages";

const state = {
    isUserAuth: false,
}

const mutations = {

    setIsUserAuth (state, val) {
        state.isUserAuth = val
        LocalStorage.set('isUserAuth', val)
        console.log('User Status set: ', val)
    }

}

const getters = {

}

const actions = {

    registerUser ({ commit }, payload) {
        Loading.show()
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('setIsUserAuth', true)
                Loading.hide()
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },
    loginUser ({ commit }, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('setIsUserAuth', true)
                Loading.hide()
            })
            .catch(error => {
                showErrorMessage(error.message)
            })
    },
    handleAuthStateChange ({ commit, dispatch }) {
        commit('setIsUserAuth', LocalStorage.getItem('isUserAuth'))

        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                commit('setIsUserAuth', true)

                //Calling the action 'firebaseReadTasks' in module 'task'
                //This action listen to diferent events
                dispatch('task/firebaseReadTasks', null, {root: true})

                this.$router.push('/')
            } else {
                commit('task/clearTasks', null, { root: true })
                commit('task/setTasksDownloaded', false, { root: true })
                commit('setIsUserAuth', false)
                this.$router.push('/auth')
            }
        })
    },
    logoutUser ({ commit }) {
        firebaseAuth.signOut();
        commit('setIsUserAuth', false)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}