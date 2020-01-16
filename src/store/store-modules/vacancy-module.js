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
      // let vaga = {
      //   title: "Tecnico de informatica",
      //   user: "nelziositoe@gmail.com",
      //   description: "Vaga para um bom tecnico de informatica",
      //   img: ""
      // }
      // commit('addVacancies', val)
      const ref = firestoreDb.collection('vagas')
      ref.add(val).then((docRef) => {
          console.log("Inserido")
          console.log(docRef)
        })
        .catch((error) => {
          alert("Error adding document: ", error)
        })
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
        } else {
          console.log("No such document!")
        }
      });
    },

    updateVacancy ({ commit }, id, data) { // test
      // let data = {
      //   title: "Tecnicos de informaticas",
      //   user: "nelziositoe@gmail.com",
      //   description: "Vaga para um bom tecnico de informatica",
      //   img: ""
      // }
      const updateRef = firestoreDb.collection('vagas').doc(id);
      updateRef.set(data).then((docRef) => {
        console.log("Updated")
        console.log(docRef)
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    },

    deleteVacancy (id) { // test
      firestoreDb.collection('vagas').doc(id).delete().then(() => {
        console.log("Deleted")
      }).catch((error) => {
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