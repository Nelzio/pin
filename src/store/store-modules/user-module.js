import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firestoreDb, firebase } from "../../boot/firebase"
import { showErrorMessage } from "../../functions/handle-error-messages"

const state = {
    userDetails: {},
}

const mutations = {
    SET_USER_DETAILS(state, val) {
        state.userDetails = val
    },
}

const getters = {
    getUser(state) {
        return state.userDetails
    },
}

const actions = {
    detailUser({ commit }, payload) {
        // Details of a user
        commit('SET_USER_DETAILS', payload)
        this.$router.push("/user/" + payload.email)
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}