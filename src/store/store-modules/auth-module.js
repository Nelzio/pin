import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth } from "../../boot/firebase";
import { showErrorMessage } from "../../functions/handle-error-messages";

const state = {
    isUserAuth: LocalStorage.getItem('isUserAuth'),
    authUser: LocalStorage.getItem('authUser'),
}

const mutations = {

    setIsUserAuth (state, val) {
        state.isUserAuth = val
        LocalStorage.set('isUserAuth', val)
        console.log('User Status set: ', val)
    },
    authUser (state, val) {
        state.authUser = val // isto é desnecessario, but...
        LocalStorage.set('authUser', state.authUser)
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
                commit('authUser', user)
                this.$router.push('/profile')
                Notify.create('A sua conta foi criada com sucesso!')
                Loading.hide()
            })
            .catch(error => {
                Loading.hide()
                showErrorMessage(error.message)
            })
    },


    // createUser () {
    //     Auth.createUserWithEmailAndPassword(this.email, this.password)
    //       .then((created) => {
    //         created.user.sendEmailVerification().then(() => {
    //           this.$router.push('/user/profile');
    //         });
    //       }).catch((error) => {
    //         this.errors.push(error.message);
    //       });
    // },


    loginUser ({ commit }, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                commit('setIsUserAuth', true)
                commit('authUser', user)
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

    handleAuthStateChange ({ commit, dispatch }) {
        // commit('setIsUserAuth', LocalStorage.getItem('isUserAuth'))
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                commit('setIsUserAuth', true)
                //Calling the action 'firebaseReadTasks' in module 'task'
                //This action listen to diferent events
                // dispatch('task/firebaseReadTasks', null, {root: true})
                // this.$router.push('/')
                // // console.log("Autenticado")
            } else {
                // commit('task/clearTasks', null, { root: true })
                // commit('task/setTasksDownloaded', false, { root: true })
                commit('setIsUserAuth', false)
                // this.$router.push('/account')
                // // console.log("Nao autenticado")
            }
        })
    },

    logoutUser ({ commit }) {
        firebaseAuth.signOut();
        commit('setIsUserAuth', false)
        commit('authUser', null)
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