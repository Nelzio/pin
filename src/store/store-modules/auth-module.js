import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firestoreDb, fireStorage, firebase } from "../../boot/firebase"
import { showErrorMessage } from "../../functions/handle-error-messages"
import offline from 'v-offline'

const state = {
    isUserAuth: LocalStorage.getItem('isUserAuth') ? LocalStorage.getItem('isUserAuth') : false,
    authUser: LocalStorage.getItem('authUser') ? LocalStorage.getItem('authUser') : null,
    userData: LocalStorage.getItem('userData') ? LocalStorage.getItem('userData') : null,
}

const mutations = {

    SET_AUTH_USER(state, val) {
        LocalStorage.set('isUserAuth', val)
        state.isUserAuth = LocalStorage.getItem('isUserAuth')
    },
    AUTH_USER(state, val) {
        LocalStorage.set('authUser', val)
        state.authUser = LocalStorage.getItem('authUser')
    },
    SET_USER_DATA(state, val) {
        LocalStorage.set('userData', val)
        state.userData = LocalStorage.getItem('userData')
    }
}

const getters = {
    user(state) {
        return state.authUser
    },
    userData(state) {
        return state.userData
    },
    isUserAuth(state) {
        return state.isUserAuth
    }
}

const actions = {

    uploadAuxFunc: ({ commit }, payload) => {
        // Upload file and metadata to the object
        var storageRef = fireStorage.ref();
        var uploadTask = storageRef.child('users/' + payload.email).put(payload.img);
        const vm = this

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
                        const ref = firestoreDb.collection('users').doc(payload.email) // email is the key

                        // adicionar outros dados do usuario em sua conta
                        var user = firebase.auth().currentUser;
                        const loginUser = {
                            displayName: payload.displayName,
                            email: payload.email,
                            photoURL: downloadURL,
                            phoneNumber: payload.phoneNumber,
                            date: payload.date
                        }

                        user.updateProfile(loginUser).then(function () {
                            // Update successful.
                            // despois de atualizar o user deve add a tabela users da db
                            ref.get().then((doc) => {
                                if (doc.exists) {
                                    payload.$router.push('/')
                                    Loading.hide()
                                } else {
                                    // If user desen't exist
                                    const dataUser = {
                                        displayName: payload.displayName,
                                        email: payload.email,
                                        photoURL: downloadURL,
                                        phoneNumber: payload.phoneNumber,
                                        adress: "",
                                        profission: "",
                                        education: "",
                                        date: payload.date
                                    }

                                    ref.set(dataUser).then((docRef) => {
                                        console.log("Updated")
                                        Notify.create('A sua conta foi criada com sucesso!')
                                        commit('SET_AUTH_USER', true)
                                        commit('AUTH_USER', dataUser)
                                        payload.vm.$router.push('/')
                                        Loading.hide()
                                    })
                                        .catch((error) => {
                                            Loading.hide()
                                            console.log(error)
                                            showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                                        })
                                }
                            })
                        }).catch(function (error) {
                            // An error happened.
                        });



                    });
                });
            });
    },

    registerUser({ commit, dispatch }, payload) {
        Loading.show()
        const vm = this
        payload.vm = this
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(user => {
                const ref = firestoreDb.collection('users').doc(payload.email) // email is the key

                // fazer upload da imagem caso exista
                if (payload.img) {
                    dispatch('uploadAuxFunc', payload)
                } else {
                    // adicionar outros dados do usuario em sua conta
                    var user = firebase.auth().currentUser;
                    const loginUser = {
                        displayName: payload.displayName,
                        email: payload.email,
                        photoURL: "",
                        phoneNumber: payload.phoneNumber,
                        date: payload.date
                    }

                    user.updateProfile(loginUser).then(function () {
                        // Update successful.
                        // despois de atualizar o user deve add a tabela users da db
                        ref.get().then((doc) => {
                            if (doc.exists) {
                                if (LocalStorage.getItem("routeBack")) {
                                    this.$router.push(LocalStorage.getItem("routeBack"))
                                    LocalStorage.set("routeBack", "")
                                    Loading.hide()
                                } else {
                                    this.$router.push('/')
                                    Loading.hide()
                                }
                            } else {
                                // If user desen't exist
                                const dataUser = {
                                    displayName: payload.displayName,
                                    email: payload.email,
                                    photoURL: "",
                                    phoneNumber: payload.phoneNumber,
                                    adress: "",
                                    profission: "",
                                    education: "",
                                    date: payload.date
                                }

                                ref.set(dataUser).then((docRef) => {
                                    console.log("Updated")
                                    commit('SET_AUTH_USER', true)
                                    commit('AUTH_USER', dataUser)
                                    Notify.create('A sua conta foi criada com sucesso!')
                                    if (LocalStorage.getItem("routeBack")) {
                                        vm.$router.push(LocalStorage.getItem("routeBack"))
                                        Loading.hide()
                                    } else {
                                        vm.$router.push('/')
                                        Loading.hide()
                                    }
                                })
                                    .catch((error) => {
                                        Loading.hide()
                                        showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                                    })
                            }
                        })
                    }).catch(function (error) {
                        // An error happened.
                    });

                }
            })
            .catch(error => {
                commit("AUTH_USER", null)
                Loading.hide()
                // showErrorMessage(error.message)
                showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
            })
    },


    googleSignInCordova({ commit }) {
        Loading.show();
        const vm = this;
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithRedirect(provider).then(function () {
            firebase.auth().getRedirectResult().then(function (result) {
                if (result.credential) {
                    // This gives you a Google Access Token.
                    // You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;

                    const ref = firestoreDb.collection('users').doc(result.user.email) // email is the key
                    //   this.user = result.user
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
                    // this.$router.push("/")
                    Loading.hide()

                    ref.get().then((doc) => {
                        alert("1Problem here");
                        if (doc.exists) {
                            const data = {
                                id: doc.id,
                                displayName: doc.data().displayName,
                                email: doc.data().email,
                                photoURL: doc.data().photoURL,
                                phoneNumber: doc.data().phoneNumber,
                                adress: doc.data().adress,
                                profission: doc.data().profission,
                                education: doc.data().education,
                                date: doc.data().date
                            }
                            commit('SET_USER_DATA', data)
                            alert("2Problem here");
                            if (LocalStorage.getItem("routeBack")) {
                                alert("Problem here");
                                vm.$router.push(LocalStorage.getItem("routeBack"))
                                LocalStorage.set("routeBack", "")
                                Loading.hide()
                            } else {
                                alert("2.2Problem here");
                                vm.$router.push("/")
                                Loading.hide()
                            }
                        } else {
                            // If user desen't exist
                            const dataUser = {
                                displayName: result.user.displayName,
                                email: result.user.email,
                                photoURL: result.user.photoURL,
                                phoneNumber: "",
                                adress: "",
                                profission: "",
                                education: "",
                                date: ""
                            }

                            ref.set(dataUser).then((docRef) => {
                                console.log("Updated")
                                alert("3Problem here");
                                if (LocalStorage.getItem("routeBack")) {
                                    alert("4Problem here");
                                    vm.$router.push(LocalStorage.getItem("routeBack"))
                                    LocalStorage.set("routeBack", "")
                                    Loading.hide()
                                } else {
                                    vm.$router.push("/")
                                    Loading.hide()
                                }
                            })
                                .catch((error) => {
                                    Loading.hide()
                                    showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                                })
                        }
                        alert("5Problem here");
                    })
                    // ...
                    alert("6Problem here");
                }
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("7Problem here");
                alert(error.message);
            });
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("8Problem here");
            alert(error.message);
        });
    },


    googleSignIn({ commit }) {
        Loading.show()
        const provider = new firebase.auth.GoogleAuthProvider()
        // if(window.hasOwnProperty("cordova")){
        //     var signInMethod = firebase.auth().signInWithRedirect
        // } else {
        //     var signInMethod = firebase.auth().signInWithPopup
        // }
        firebase.auth().signInWithPopup(provider).then((result) => {
            const ref = firestoreDb.collection('users').doc(result.user.email) // email is the key
            //   this.user = result.user
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
            // this.$router.push("/")
            // Loading.hide()

            ref.get().then((doc) => {
                if (doc.exists) {
                    const data = {
                        id: doc.id,
                        displayName: doc.data().displayName,
                        email: doc.data().email,
                        photoURL: doc.data().photoURL,
                        phoneNumber: doc.data().phoneNumber,
                        adress: doc.data().adress,
                        profission: doc.data().profission,
                        education: doc.data().education,
                        date: doc.data().date
                    }
                    commit('SET_USER_DATA', data)
                    if (LocalStorage.getItem("routeBack")) {
                        this.$router.push(LocalStorage.getItem("routeBack"))
                        LocalStorage.set("routeBack", "")
                        Loading.hide()
                    } else {
                        this.$router.push("/")
                        Loading.hide()
                    }
                } else {
                    // If user desen't exist
                    const dataUser = {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        phoneNumber: "",
                        adress: "",
                        profission: "",
                        education: "",
                        date: ""
                    }

                    ref.set(dataUser).then((docRef) => {
                        console.log("Updated")
                        if (LocalStorage.getItem("routeBack")) {
                            this.$router.push(LocalStorage.getItem("routeBack"))
                            LocalStorage.set("routeBack", "")
                            Loading.hide()
                        } else {
                            this.$router.push("/")
                            Loading.hide()
                        }
                    })
                        .catch((error) => {
                            Loading.hide()
                            showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                        })
                }
            })










        }).catch(err => {
            console.log(err)
            Loading.hide()
        })
    },

    facebookSignIn({ commit }) {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result)


            const ref = firestoreDb.collection('users').doc(result.user.uid) // email is the key
            //   this.user = result.user
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
            // this.$router.push("/")
            // Loading.hide()

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
                        date: doc.data().date
                    }
                    commit('SET_USER_DATA', data)
                    if (LocalStorage.getItem("routeBack")) {
                        this.$router.push(LocalStorage.getItem("routeBack"))
                        LocalStorage.set("routeBack", "")
                        Loading.hide()
                    } else {
                        this.$router.push("/")
                        Loading.hide()
                    }
                } else {
                    // If user desen't exist
                    const dataUser = {
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        phoneNumber: "",
                        adress: "",
                        profission: "",
                        education: "",
                        date: ""
                    }

                    ref.set(dataUser).then((docRef) => {
                        console.log("Updated")
                        if (LocalStorage.getItem("routeBack")) {
                            this.$router.push(LocalStorage.getItem("routeBack"))
                            LocalStorage.set("routeBack", "")
                            Loading.hide()
                        } else {
                            this.$router.push("/")
                            Loading.hide()
                        }
                    })
                        .catch((error) => {
                            Loading.hide()
                            showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                        })
                }
            })



            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = "Ops! Ocorreu um erro durante o processamento.";
            console.log(errorMessage)
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    },

    editUser({ commit }, payload) {
        // Edit or add a user
        Loading.show()
        const ref = firestoreDb.collection('users').doc(payload.id) // email is the key
        ref.set(payload.data).then((docRef) => {
            console.log("Updated")
            this.$router.go(-1)
            Loading.hide()
        })
            .catch((error) => {
                Loading.hide()
                showErrorMessage("Error adding document: ", error)
            })
    },

    detailUser({ commit }, id) {
        // Details of a user
        const ref = firestoreDb.collection('users').doc(id)
        let data = {}
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
                    date: doc.data().date
                }
                commit('SET_USER_DATA', data)
            } else {
                // If user desen't exist
                data = {
                    id: null,
                    displayName: "",
                    email: "",
                    photoURL: "",
                    phoneNumber: "",
                    adress: "",
                    profission: "",
                    education: "",
                    date: ""
                }
                commit('SET_USER_DATA', data)
            }
        })
    },

    loginUser({ commit }, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                commit('AUTH_USER', user.user);
                commit('SET_AUTH_USER', true);

                const ref = firestoreDb.collection('users').doc(user.user.email)
                ref.get().then((doc) => {
                    if (doc.exists) {
                        var data = {
                            id: doc.id,
                            displayName: doc.data().displayName,
                            email: doc.data().email,
                            photoURL: doc.data().photoURL,
                            phoneNumber: doc.data().phoneNumber,
                            adress: doc.data().adress,
                            profission: doc.data().profission,
                            education: doc.data().education,
                            date: doc.data().date
                        }
                        commit('SET_USER_DATA', data);
                        Loading.hide()
                        Notify.create('Sessão iniciada com sucesso!')
                        this.$router.push("/")
                    } else {
                        // Loading.hide()
                        Notify.create('Sessão iniciada com sucesso!')
                        if (LocalStorage.getItem("routeBack")) {
                            this.$router.push(LocalStorage.getItem("routeBack"))
                            LocalStorage.set("routeBack", "")
                            Loading.hide()
                        } else {
                            this.$router.push("/")
                            Loading.hide()
                        }
                    }
                })
            })
            .catch(error => {
                showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
            })
    },

    // login () {
    //     Auth.signInWithEmailAndPassword(this.email, this.password)
    //         .then(() => this.$router.push('/dashboard'))
    //         .catch(err => this.errors.push(err.message))
    // },

    checkAuthUser({ commit }) {
        if (!offline.data().isOnline) {
            // this.$router.go(-1)
            return showErrorMessage("Está sem internet")
        }
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
                commit('SET_AUTH_USER', true)
            } else {
                commit('SET_AUTH_USER', false)
                commit('AUTH_USER', null)
                commit('SET_USER_DATA', null)
                this.$router.push('/account')
            }
        })
    },

    // logoutUser({ commit }) {
    //     firebaseAuth.signOut()
    //     commit('SET_AUTH_USER', false)
    //     commit('AUTH_USER', null)
    //     this.$router.push('/')
    // },

    signOut({ commit }) {
        Loading.show()
        firebaseAuth.signOut()
            .then(() => {
                commit('SET_AUTH_USER', false)
                commit('AUTH_USER', null)
                commit('SET_USER_DATA', null)
                this.$router.push('/')
                Loading.hide()
            })
    },

    deleteUser({ commit }, id) {
        // Loading.show()
        var user
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
            user = firebaseAuth.currentUser
            firestoreDb.collection('users').doc(id).delete().then(() => {
                user.delete().then(function () {
                    // User deleted.
                    commit('SET_AUTH_USER', false)
                    commit('AUTH_USER', null)
                    commit('SET_USER_DATA', null)
                    Notify.create('Usuario Excluido')
                    this.$router.push('/')
                    Loading.hide()
                }).catch(function (error) {
                    // An error happened.
                    Notify.create('Erro ao Remover')
                    Loading.hide()
                })
            }).catch((error) => {
                Loading.hide()
                showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
            });
        }).catch(err => console.log(err))



    }

}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}