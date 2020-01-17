import { LocalStorage, Loading, Notify } from 'quasar'
import { firestoreDb } from "../../boot/firebase"
import { showErrorMessage } from "../../functions/handle-error-messages"
import offline from 'v-offline'


const state = {
  vacancies: LocalStorage.getItem("vacanciens"),
  vacancyDtl: LocalStorage.getItem("vacancyDtl"),
}

const mutations = {

    vacancies (state, val) {
      state.vacancies = val
      LocalStorage.set('vacancies', state.vacancies)
    },
    vacancy (state, val) {
      state.vacancyDtl = val
      LocalStorage.set('vacancyDtl', state.vacancyDtl)
    },

}

const getters = {
  getVacancies (state) {
    return state.vacancies
  },
  getVacancy (state) {
    return state.vacancyDtl
  }
}

const actions = {

    // loginUser ({ commit }, payload) {
    //     Loading.show()
    //     firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
    //         .then(user => {
    //             commit('setIsUserAuth', true)
    //             commit('authUser', user)
    //             Notify.create('Sessão iniciada com sucesso!')
    //             this.$router.push('/profile')
    //             Loading.hide()
    //         })
    //         .catch(error => {
    //             showErrorMessage(error.message)
    //         })
    // },

    createVacancy ({ commit }, val) { // done
      Loading.show()
      const ref = firestoreDb.collection('vagas')
      ref.add(val).then((docRef) => {
          console.log("Inserido")
          console.log(docRef)
          Loading.hide()
        })
        .catch((error) => {
          Loading.hide()
          alert("Error adding document: ", error)
        })
    },

    updateVacancy ({ commit }, payload) { // test
      Loading.show()
      const updateRef = firestoreDb.collection('vagas').doc(payload.id);
      updateRef.set(payload.data).then((docRef) => {
        console.log("Updated")
        Loading.hide()
      })
      .catch((error) => {
        Loading.hide()
        alert("Error adding document: ", error);
      });
    },

    listVacancy ({ commit }) { // done
      if(offline.data().isOnline) {
      const ref = firestoreDb.collection('vagas')
      var vacancies = []
      ref.onSnapshot((querySnapshot) => {
        vacancies = []
          querySnapshot.forEach((doc) => {
            vacancies.push({
              key: doc.id,
              title: doc.data().title,
              user: doc.data().user,
              description: doc.data().description,
              img: doc.data().img
            })
          })
          console.log("Nelzio Vagas")
          commit('vacancies', vacancies)
          console.log(vacancies)
        })
      } else {
        alert("Sem internet")
      }
    },

    detailVacancy ({ commit }, val) { // test
      Loading.show()
      const ref = firestoreDb.collection('vagas').doc(val);
      let data = {}
      ref.get().then((doc) => {
        if (doc.exists) {
          data = {
            key: doc.id,
            title: doc.data().title,
            user: doc.data().user,
            description: doc.data().description,
            img: doc.data().img
          }
          console.log(data)
          commit('vacancy', data)
          Loading.hide()
        } else {
          Loading.hide()
          console.log("No such document!")
        }
      });
    },

    

    deleteVacancy ({ commit }, id) { // test
      Loading.show()
      firestoreDb.collection('vagas').doc(id).delete().then(() => {
        console.log("Deleted")
        Loading.hide()
      }).catch((error) => {
        Loading.hide()
        alert("Error removing document: ", error);
      });
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}