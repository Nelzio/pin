import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firestoreDb, firebase } from "../../boot/firebase"
import { showErrorMessage } from "../../functions/handle-error-messages"
import offline from 'v-offline'

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

    detailUserStore({ commit }, user) {
        // Details of a user
        const ref = firestoreDb.collection('users').doc(user)
        let data = {}
        if (offline.data().isOnline) {
            ref.get().then((doc) => {
                if (doc.exists) {
                    data = {
                        id: doc.id,
                        displayName: doc.data().displayName,
                        email: doc.data().email,
                        photoURL: doc.data().photoURL,
                        phoneNumber: doc.data().phoneNumber,
                        adress: doc.data().adress,
                        profission: doc.data().profission,
                        education: doc.data().education,
                        profileType: doc.data().profileType,
                        description: doc.data().description,
                        date: doc.data().date
                    }
                } else {
                    // If user desen't exist
                    data = {
                        id: null,
                        displayName:"",
                        email: "",
                        photoURL: "",
                        phoneNumber: "",
                        adress: "",
                        profission: "",
                        education: "",
                        profileType: "",
                        description: "",
                        date: ""
                    }
                }
                commit('SET_USER_DETAILS', data)
            })
        }
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}