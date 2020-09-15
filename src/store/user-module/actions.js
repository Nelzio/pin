import { firestoreDB } from "../../boot/firebase"
import offline from 'v-offline'

export function detailUser ({ commit }, payload) {
    // Details of a user
    commit('SET_USER_DETAILS', payload)
    this.$router.push("/user/" + payload.email)
}

export function detailUserStore ({ commit }, user) {
    // Details of a user
    const ref = firestoreDB.collection('users').doc(user)
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
                    address: doc.data().address,
                    profession: doc.data().profession,
                    education: doc.data().education,
                    profileType: doc.data().profileType,
                    description: doc.data().description,
                    date: doc.data().date
                }
            } else {
                // If user desen't exist
                data = {
                    id: null,
                    displayName: "",
                    email: "",
                    photoURL: "",
                    phoneNumber: "",
                    address: "",
                    profession: "",
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