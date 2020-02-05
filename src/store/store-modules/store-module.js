import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firestoreDb, fireStorage, firebase } from "boot/firebase"
import { showErrorMessage } from "../../functions/handle-error-messages"
import offline from 'v-offline'


const state = {
  stories: LocalStorage.getItem("stories") ? LocalStorage.getItem("stories") : [],
  storeDtl: {
    key: "",
    title: "",
    user: "",
    description: "",
    img: "",
    public: false,
    category: "",
    place: "",
    subCategory: "",
    price: "",
    priceVariable: false,
  },
  storeUploaded: false,
  storeDetail: false,
  storeDeleted: false
}

const mutations = {

  SET_STORIES(state, val) {
    state.stories = val
    LocalStorage.set('stories', state.stories)
  },
  SET_STORE(state, val) {
    state.storeDtl = val
  },
  SET_STORE_CHANGE(state, val) {
    state.storeUploaded = val
  },
  SET_STORE_DTL_CHANGE(state, val) {
    state.storeDetail = val
  },
  SET_STORE_DELETED(state, val) {
    state.storeDeleted = val
  },
}

const getters = {
  getStories(state) {
    return state.stories
  },
  getStore(state) {
    return state.storeDtl
  }
}

const actions = {

  uploadAuxFunc: ({ commit }, payload) => {
    // Upload file and metadata to the object
    var storageRef = fireStorage.ref();
    var uploadTask = storageRef.child('stories/' + payload.id).put(payload.img);

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
            const updateRef = firestoreDb.collection('stories').doc(payload.id);
            payload.data.img = downloadURL
            updateRef.set(payload.data).then(() => {
              commit("SET_STORE_CHANGE", true)
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


  createStore({ commit }, payload) { // done
    if (!offline.data().isOnline) {
      return alert("Está sem internet")
    }
    Loading.show()
    const ref = firestoreDb.collection('stories')
    // Create a root reference
    var storageRef = fireStorage.ref();
    // Create the file metadata
    var metadata = {
      contentType: 'image/*'
    };
    var storeData
    var img = payload.img
    payload.img = ""
    ref.add(payload).then((docRef) => {
      console.log("Inserido")
      console.log(docRef)
      storeData = docRef

      if (!img) {
        let data = {
          key: "",
          title: "",
          user: "",
          description: "",
          img: "",
          public: false,
          category: "",
          place: "",
          subCategory: "",
          price: "",
          priceVariable: false,
        }
        commit('SET_STORE', data)
        console.log("Updated")
        Loading.hide()
      } else {
        //inserindo imagem
        // Upload file and metadata to the object 'images/mountains.jpg'
        var fileExt = img.name.split(".")[img.name.split(".").length - 1]
        console.log("Formato do file " + fileExt)
        var uploadTask = storageRef.child('stories/' + docRef.id).put(img);

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
              console.log(storeData.id)
              const updateRef = firestoreDb.collection('stories').doc(storeData.id);
              payload.img = downloadURL
              updateRef.set(payload).then(() => {
                let data = {
                  key: "",
                  title: "",
                  user: "",
                  description: "",
                  img: "",
                  public: false,
                  category: "",
                  place: "",
                  subCategory: "",
                  price: "",
                  priceVariable: false,
                }
                commit('SET_STORE', data)
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


  updateStore({ commit, dispatch }, payload) {
    Loading.show()
    commit("SET_STORE_CHANGE", false)
    var storageRef = fireStorage.ref();

    if (!payload.img) {
      const updateRef = firestoreDb.collection('stories').doc(payload.id);
      updateRef.set(payload.data).then(() => {
        commit("SET_STORE_CHANGE", true)
        Loading.hide()
      })
        .catch((error) => {
          Loading.hide()
          alert("Error update document: ", error);
        });

    } else {


      // Delete the file
      var desertRef = storageRef.child('stories/' + payload.id)
      desertRef.delete().then(function () {
        // File deleted successfully
        dispatch('uploadAuxFunc', payload)
        // this.uploadAuxFunc(payload)

      }).catch(function (error) {
        console.log("Erro ao deletar o file")
        dispatch('uploadAuxFunc', payload)
        // Uh-oh, an error occurred!
      });
    }
  },


  listStore({ commit }) { // done
    var storageRef = fireStorage.ref()
    if (!offline.data().isOnline) {
      return alert("Sem internet")
    }
    const ref = firestoreDb.collection('stories')
    var storiesData = []
    ref.where("public", "==", true)
      .onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          storiesData.push({
            key: doc.id,
            title: doc.data().title,
            user: doc.data().user,
            description: doc.data().description,
            img: doc.data().img,
            public: doc.data().public,
            category: doc.data().category,
            place: doc.data().place,
            subCategory: doc.data().subCategory,
            price: doc.data().price,
            priceVariable: doc.data().priceVariable,
          })
        });
        commit('SET_STORIES', storiesData)
      });
  },


  listStoreMy({ commit }, user) { // done
    var storageRef = fireStorage.ref()
    if (!offline.data().isOnline) {
      return alert("Sem internet")
    }
    const ref = firestoreDb.collection('stories')
    var stories = []
    ref.where("user", "==", user).where("public", "==", true)
      .onSnapshot(function (querySnapshot) {
        // stories = []
        querySnapshot.forEach(function (doc) {
          stories.push({
            key: doc.id,
            title: doc.data().title,
            user: doc.data().user,
            description: doc.data().description,
            img: doc.data().img,
            public: doc.data().public,
            category: doc.data().category,
            place: doc.data().place,
            subCategory: doc.data().subCategory,
            price: doc.data().price,
            priceVariable: doc.data().priceVariable,
          })
        });
        commit('SET_STORIES', stories)
      });
  },


  detailStore({ commit }, id) { // test
    // Loading.show()
    const ref = firestoreDb.collection('stories').doc(id);
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
    }
    commit('SET_STORE', data)
    commit('SET_STORE_DTL_CHANGE', false)
    ref.get().then((doc) => {
      if (doc.exists) {
        data = {
          key: doc.id,
          title: doc.data().title,
          user: doc.data().user,
          description: doc.data().description,
          img: doc.data().img,
          public: doc.data().public,
          category: doc.data().category,
          place: doc.data().place,
          subCategory: doc.data().subCategory,
          price: doc.data().price,
          priceVariable: doc.data().priceVariable,
        }
        commit('SET_STORE', data)
        commit('SET_STORE_DTL_CHANGE', true)
        // Loading.hide()
      } else {
        console.log("No such document!")
        // Loading.hide()
      }
    });
  },


  deleteStore({ commit }, id) {
    Loading.show()
    commit("SET_STORE_DELETED", false)
    var storageRef = fireStorage.ref()

    var desertRef = storageRef.child('stories/' + id);

    firestoreDb.collection('stories').doc(id).delete().then(() => {

      // Delete the file
      desertRef.delete().then(function () {
        // File deleted successfully
        commit("SET_STORE_DELETED", true)
        Loading.hide()
      }).catch(function (error) {
        // Uh-oh, an error occurred!
        commit("SET_STORE_DELETED", true)
        console.log("Erro ao deletar imagem")
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