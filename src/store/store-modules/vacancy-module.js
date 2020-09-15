import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firestoreDB, fireStorage, firebase } from "boot/firebase"
import { showErrorMessage } from "../../functions/handle-error-messages"
import offline from 'v-offline'


const state = {
  // vacancies: LocalStorage.getItem("vacanciens"),
  vacancies: LocalStorage.getItem("vacanciens") ? LocalStorage.getItem("vacanciens") : [],
  vacancyDtl: {
    key: "",
    title: "",
    user: "",
    description: "",
    img: "",
    public: false,
    place: "",
    category: "",
  },
  vacancyUploaded: false,
  vacancyDetail: false,
  vacancyDeleted: false
}

const mutations = {

  SET_VACANCIES (state, val) {
    state.vacancies = val
    LocalStorage.set('vacancies', state.vacancies)
  },
  SET_VACANCY (state, val) {
    state.vacancyDtl = val
  },
  SET_VACANCY_CHANGE (state, val) {
    state.vacancyUploaded = val
  },
  SET_VACANCY_DTL_CHANGE (state, val) {
    state.vacancyDetail = val
  },
  SET_VACANCY_DELETED (state, val) {
    state.vacancyDeleted = val
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

  uploadAuxFunc: ({ commit }, payload) => {
    // Upload file and metadata to the object
    var storageRef = fireStorage.ref();
    var uploadTask = storageRef.child('vacancies/' + payload.id).put(payload.img);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            const updateRef = firestoreDB.collection('vacancies').doc(payload.id);
            payload.data.img = downloadURL
            updateRef.set(payload.data).then(() => {
              commit("SET_VACANCY_CHANGE", true)
              Loading.hide()
            })
              .catch((error) => {
                Loading.hide()
                alert("Error update document: ", error);
              });
          });
        });
      });
  },


  createVacancy ({ commit }, payload) { // done
    if (!offline.data().isOnline) {
      return alert("Está sem internet")
    }
    Loading.show()
    const ref = firestoreDB.collection('vacancies')
    // Create a root reference
    var storageRef = fireStorage.ref();
    // Create the file metadata
    var metadata = {
      contentType: 'image/*'
    };
    var vacancyData
    var img = payload.img
    payload.img = ""
    ref.add(payload).then((docRef) => {

      vacancyData = docRef

      if (!img) {
        let data = {
          key: "",
          title: "",
          user: "",
          description: "",
          img: "",
          public: false
        }
        commit('SET_VACANCY', data)
        console.log("Updated")
        Loading.hide()
      } else {
        //inserindo imagem
        // Upload file and metadata to the object 'images/mountains.jpg'
        var fileExt = img.name.split(".")[img.name.split(".").length - 1]
        console.log("Formato do file " + fileExt)
        var uploadTask = storageRef.child('vacancies/' + docRef.id).put(img);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
          }, function (error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log('storage/unauthorized')
                break;

              case 'storage/canceled':
                // User canceled the upload
                console.log('storage/canceled')
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                console.log('storage/unknown')
                break;
            }
          }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
              console.log(vacancyData.id)
              const updateRef = firestoreDB.collection('vacancies').doc(vacancyData.id);
              payload.img = downloadURL
              updateRef.set(payload).then(() => {
                let data = {
                  key: "",
                  title: "",
                  user: "",
                  description: "",
                  img: "",
                  public: false
                }
                commit('SET_VACANCY', data)
                console.log("Updated")
                Loading.hide()
              })
                .catch((error) => {
                  Loading.hide()
                  alert("Error update document: ", error);
                });
            });
          });
      }
    })
      .catch((error) => {
        Loading.hide()
        alert("Error adding document: ", error)
      })

  },


  updateVacancy ({ commit, dispatch }, payload) {
    Loading.show()
    commit("SET_VACANCY_CHANGE", false)
    var storageRef = fireStorage.ref();

    if (!payload.img) {
      const updateRef = firestoreDB.collection('vacancies').doc(payload.id);
      updateRef.set(payload.data).then(() => {
        commit("SET_VACANCY_CHANGE", true)
        Loading.hide()
      })
        .catch((error) => {
          Loading.hide()
          alert("Error update document: ", error);
        });

    } else {


      // Delete the file
      var desertRef = storageRef.child('vacancies/' + payload.id)
      desertRef.delete().then(function () {
        // File deleted successfully
        dispatch('uploadAuxFunc', payload)
        // this.uploadAuxFunc(payload)

      }).catch(function (error) {
        console.log("Erro ao Remover o file")
        dispatch('uploadAuxFunc', payload)
        // Uh-oh, an error occurred!
      });
    }
  },


  listVacancy ({ commit }) { // done
    var storageRef = fireStorage.ref()
    if (!offline.data().isOnline) {
      showErrorMessage("Está sem internet.")
    }
    const ref = firestoreDB.collection('vacancies')
    var vacanciesData = [];
    var itemsReady = [""];
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    ref.where("public", "==", true)
      .onSnapshot(function (querySnapshot) {
        if (offline.data().isOnline && querySnapshot.length !== vacanciesData.length) {
          querySnapshot.forEach(function (doc) {
            var date = doc.data().validate.split("/")
            if ((date[1] + "/" + date[0] + "/" + date[2] >= today) && !itemsReady.includes(doc.id)) {
              itemsReady.push(doc.id)
              vacanciesData.push({
                key: doc.id,
                title: doc.data().title,
                user: doc.data().user,
                description: doc.data().description,
                img: doc.data().img,
                public: doc.data().public,
                place: doc.data().place,
                validate: doc.data().validate,
                category: doc.data().category,
                timeSend: new Date(doc.data().timeSend)
              })
            }
          });

          vacanciesData.sort(function (a, b) {
            return b.timeSend - a.timeSend;
          });
          commit('SET_VACANCIES', vacanciesData)
        }
      });
  },


  listVacancyMy ({ commit }, user) { // done
    var storageRef = fireStorage.ref()
    if (!offline.data().isOnline) {
      return showErrorMessage("Está sem internet.")
    }
    const ref = firestoreDB.collection('vacancies')
    var vacancies = []
    ref.where("user", "==", user)
      .get().then(function (querySnapshot) {
        // vacancies = []
        querySnapshot.forEach(function (doc) {
          vacancies.push({
            key: doc.id,
            title: doc.data().title,
            user: doc.data().user,
            description: doc.data().description,
            img: doc.data().img,
            public: doc.data().public,
            place: doc.data().place,
            validate: doc.data().validate,
            category: doc.data().category,
            timeSend: new Date(doc.data().timeSend)
          })
        });
        vacancies.sort(function (a, b) {
          return b.timeSend - a.timeSend;
        });
        commit('SET_VACANCIES', vacancies)
      });
  },


  detailVacancy ({ commit }, id) { // test
    // Loading.show()
    if (!offline.data().isOnline) {
      return showErrorMessage("Está sem internet.")
    }
    const ref = firestoreDB.collection('vacancies').doc(id);
    let data = {
      key: "",
      title: "",
      user: "",
      description: "",
      img: "",
      public: false,
      palce: "",
      validate: "",
      category: "",
      timeSend: ""
    }
    commit('SET_VACANCY', data)
    commit('SET_VACANCY_DTL_CHANGE', false)
    ref.get().then((doc) => {
      if (doc.exists) {
        data = {
          key: doc.id,
          title: doc.data().title,
          user: doc.data().user,
          description: doc.data().description,
          img: doc.data().img,
          public: doc.data().public,
          place: doc.data().place,
          validate: doc.data().validate,
          category: doc.data().category,
          timeSend: new Date(doc.data().timeSend)
        }
        commit('SET_VACANCY', data)
        commit('SET_VACANCY_DTL_CHANGE', true)
        // Loading.hide()
      } else {
        console.log("No such document!")
        // Loading.hide()
      }
    });
  },


  deleteVacancy ({ commit }, id) {
    if (!offline.data().isOnline) {
      return showErrorMessage("Está sem internet.")
    }
    Loading.show()
    commit("SET_VACANCY_DELETED", false)
    var storageRef = fireStorage.ref()

    var desertRef = storageRef.child('vacancies/' + id);

    firestoreDB.collection('vacancies').doc(id).delete().then(() => {

      // Delete the file
      desertRef.delete().then(function () {
        // File deleted successfully
        commit("SET_VACANCY_DELETED", true)
        Loading.hide()
      }).catch(function (error) {
        // Uh-oh, an error occurred!
        commit("SET_VACANCY_DELETED", true)
        console.log("Erro ao Remover imagem")
        Loading.hide()
      });

    }).catch((error) => {
      Loading.hide()
      alert("Error removing document: ", error);
    });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}