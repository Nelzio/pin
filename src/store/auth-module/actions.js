import { LocalStorage, Loading, Notify } from 'quasar'
import { firebaseAuth, firestoreDB, fireStorage, firebase } from "../../boot/firebase"
import { showErrorMessage, loginErrorMessage } from "../../functions/handle-error-messages"
import { alertMessage } from '../../functions/alertdialog.js'

import { deleteCandidature } from "../../functions/usermanager/deleteCandidature"
import { deleteChat } from "../../functions/usermanager/deleteChat"
import { deleteCV } from "../../functions/usermanager/deleteCV"
import { deleteStore } from "../../functions/usermanager/deleteStore"
import { deleteVacancies } from "../../functions/usermanager/deleteVacancies"
import { deleteVideo } from "../../functions/usermanager/deleteVideo"

import offline from 'v-offline'

export function uploadAuxFunc ({ commit }, payload) {
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
                const ref = firestoreDB.collection('users').doc(payload.email) // email is the key
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
                    user = firebase.auth().currentUser;
                    const userData = {
                        displayName: user.displayName,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        phoneNumber: user.phoneNumber,
                        photoURL: user.photoURL,
                        refreshToken: user.refreshToken,
                        uid: user.uid
                    }

                    commit('SET_AUTH_USER', true)
                    commit('AUTH_USER', userData)

                    ref.get().then((doc) => {
                        if (doc.exists) {
                            const dataUser = {
                                displayName: doc.data().displayName,
                                email: doc.data().email,
                                access: doc.data().access,
                                gender: doc.data().gender,
                                association: doc.data().association,
                                registrationDate: doc.data().registrationDate,
                                deficiency: doc.data().deficiency,
                                photoURL: downloadURL,
                                phoneNumber: doc.data().phoneNumber,
                                address: doc.data().address,
                                place: doc.data().place,
                                profession: doc.data().profession,
                                education: doc.data().education,
                                profileType: doc.data().profileType,
                                description: doc.data().description,
                                date: doc.data().date
                            }

                            ref.set(dataUser).then((docRef) => {
                                // console.log("Updated")
                                commit('SET_USER_DATA', dataUser)
                                if (payload.older) {
                                    // Notify.create('A sua conta foi editada com sucesso!')
                                    // payload.vm.$router.go(-1)
                                    alertMessage("Perfil atualizado com sucesso!", payload.vm)
                                } else {
                                    Notify.create('A sua conta foi criada com sucesso!')
                                    payload.vm.$router.push('/')
                                }
                                Loading.hide()
                            })
                                .catch((error) => {
                                    Loading.hide()
                                    console.log(error)
                                    showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                                })
                        } else {
                            // If user desen't exist
                            var today = new Date();
                            const dataUser = {
                                displayName: payload.displayName,
                                email: payload.email,
                                photoURL: downloadURL,
                                gender: "",
                                access: "",
                                association: "",
                                deficiency: "",
                                phoneNumber: payload.phoneNumber,
                                address: "",
                                place: "",
                                profession: "",
                                education: "",
                                profileType: "",
                                description: "",
                                date: "",
                                registrationDate: String(today)
                            }

                            ref.set(dataUser).then((docRef) => {
                                // console.log("Updated")
                                if (LocalStorage.getItem("routeBack")) {
                                    payload.vm.$router.push("/")
                                    payload.vm.$router.push(LocalStorage.getItem("routeBack"))
                                    Loading.hide()
                                } else {
                                    payload.vm.$router.push('/')
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



            });
        });
}


export function registerUser ({ commit, dispatch }, payload) {
    Loading.show()
    const vm = this
    payload.vm = this
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
            const ref = firestoreDB.collection('users').doc(payload.email) // email is the key

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
                                vm.$router.push("/")
                                vm.$router.push(LocalStorage.getItem("routeBack"))
                                LocalStorage.set("routeBack", "")
                                Loading.hide()
                            } else {
                                vm.$router.push('/')
                                Loading.hide()
                            }
                        } else {
                            // If user desen't exist
                            var today = new Date();
                            const dataUser = {
                                displayName: payload.displayName,
                                email: payload.email,
                                gender: payload.gender,
                                deficiency: payload.deficiency,
                                access: "",
                                association: payload.association,
                                photoURL: "",
                                phoneNumber: payload.phoneNumber,
                                address: "",
                                place: "",
                                profession: "",
                                education: "",
                                profileType: "",
                                description: "",
                                date: "",
                                registrationDate: String(today)
                            }

                            ref.set(dataUser).then((docRef) => {
                                // console.log("Updated")
                                commit('SET_AUTH_USER', true)
                                commit('AUTH_USER', dataUser)
                                Notify.create('A sua conta foi criada com sucesso!')
                                if (LocalStorage.getItem("routeBack")) {
                                    vm.$router.push("/")
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
                    showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                });

            }
        })
        .catch(error => {
            commit("AUTH_USER", null)
            Loading.hide()
            // showErrorMessage(error.message)
            loginErrorMessage("Ops! Ocorreu um erro durante o processamento.")
        })
}


export function googleSignInCordova ({ commit }) {
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

                const ref = firestoreDB.collection('users').doc(result.user.email) // email is the key
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
                    // // alert("1Problem here");
                    if (doc.exists) {
                        const data = {
                            id: doc.id,
                            access: doc.data().access,
                            association: doc.data().association,
                            registrationDate: doc.data().registrationDate,
                            deficiency: doc.data().deficiency,
                            displayName: doc.data().displayName,
                            gender: doc.data().gender,
                            email: doc.data().email,
                            photoURL: doc.data().photoURL,
                            phoneNumber: doc.data().phoneNumber,
                            address: doc.data().address,
                            place: doc.data().place,
                            profession: doc.data().profession,
                            education: doc.data().education,
                            profileType: doc.data().profileType,
                            description: doc.data().description,
                            date: doc.data().date
                        }
                        commit('SET_USER_DATA', data)
                        // // alert("2Problem here");
                        if (LocalStorage.getItem("routeBack")) {
                            // // alert("Problem here");
                            vm.$router.go(-1);
                            // vm.$router.push("/")
                            // vm.$router.push(LocalStorage.getItem("routeBack"))
                            LocalStorage.set("routeBack", "")
                            Loading.hide()
                        } else {
                            // // alert("2.2Problem here");
                            vm.$router.push("/")
                            Loading.hide()
                        }
                    } else {
                        // If user desen't exist
                        var today = new Date();
                        const dataUser = {
                            displayName: result.user.displayName,
                            email: result.user.email,
                            photoURL: result.user.photoURL,
                            gender: "",
                            access: "",
                            association: "",
                            deficiency: "",
                            phoneNumber: "",
                            address: "",
                            place: "",
                            profession: "",
                            education: "",
                            profileType: "",
                            description: "",
                            date: "",
                            registrationDate: String(today)
                        }

                        ref.set(dataUser).then((docRef) => {
                            // console.log("Updated")
                            // // alert("3Problem here");
                            if (LocalStorage.getItem("routeBack")) {
                                // // alert("4Problem here");
                                vm.$router.go(-1);
                                // vm.$router.push("/")
                                // vm.$router.push(LocalStorage.getItem("routeBack"))
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
                    // // alert("5Problem here");
                })
                // ...
                // // alert("6Problem here");
            }
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // alert(error.message);
        showErrorMessage("Ops! Ocorreu um erro durante o processamento. \nVerifica a sua conexão")
    });
}


export function googleSignIn ({ commit }) {
    Loading.show()
    const provider = new firebase.auth.GoogleAuthProvider()
    // if(window.hasOwnProperty("cordova")){
    //     var signInMethod = firebase.auth().signInWithRedirect
    // } else {
    //     var signInMethod = firebase.auth().signInWithPopup
    // }
    firebase.auth().signInWithPopup(provider).then((result) => {
        const ref = firestoreDB.collection('users').doc(result.user.email) // email is the key
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
                    access: doc.data().access,
                    association: doc.data().association,
                    registrationDate: doc.data().registrationDate,
                    deficiency: doc.data().deficiency,
                    displayName: doc.data().displayName,
                    gender: doc.data().gender,
                    email: doc.data().email,
                    photoURL: doc.data().photoURL,
                    phoneNumber: doc.data().phoneNumber,
                    address: doc.data().address,
                    place: doc.data().place,
                    profession: doc.data().profession,
                    education: doc.data().education,
                    profileType: doc.data().profileType,
                    description: doc.data().description,
                    education: doc.data().education,
                    date: doc.data().date
                }
                commit('SET_USER_DATA', data)
                if (LocalStorage.getItem("routeBack")) {
                    this.$router.go(-1);
                    // this.$router.push("/")
                    // this.$router.push(LocalStorage.getItem("routeBack"))
                    LocalStorage.set("routeBack", "")
                    Loading.hide()
                } else {
                    this.$router.push("/")
                    Loading.hide()
                }
            } else {
                // If user desen't exist
                var today = new Date();
                const dataUser = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    gender: "",
                    access: "",
                    association: "",
                    deficiency: "",
                    phoneNumber: "",
                    address: "",
                    place: "",
                    profession: "",
                    education: "",
                    profileType: "",
                    description: "",
                    date: "",
                    registrationDate: String(today)
                }

                ref.set(dataUser).then((docRef) => {
                    console.log("Updated")
                    if (LocalStorage.getItem("routeBack")) {
                        this.$router.go(-1);
                        // this.$router.push("/")
                        // this.$router.push(LocalStorage.getItem("routeBack"))
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
        showErrorMessage("Ops! Ocorreu um erro durante o processamento. \nVerifica a sua conexão")
    })
}


export function facebookSignInCordova ({ commit }) {
    Loading.show();
    const vm = this;
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function () {
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;


                var data = {};


                const ref = firestoreDB.collection('users').doc(result.user.uid + "@superactive.com") // email is the key
                //   this.user = result.user
                const userData = {
                    displayName: result.user.displayName,
                    // email: result.user.email,
                    email: result.user.uid + "@superactive.com",
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
                            access: doc.data().access,
                            association: doc.data().association,
                            registrationDate: doc.data().registrationDate,
                            deficiency: doc.data().deficiency,
                            displayName: doc.data().displayName,
                            gender: doc.data().gender,
                            email: result.user.uid + "@superactive.com",
                            photoURL: doc.data().photoURL,
                            phoneNumber: doc.data().phoneNumber,
                            address: doc.data().address,
                            place: doc.data().place,
                            profession: doc.data().profession,
                            education: doc.data().education,
                            profileType: doc.data().profileType,
                            description: doc.data().description,
                            date: doc.data().date
                        }
                        commit('SET_USER_DATA', data)
                        if (LocalStorage.getItem("routeBack")) {
                            vm.$router.push("/")
                            vm.$router.push(LocalStorage.getItem("routeBack"))
                            LocalStorage.set("routeBack", "")
                            Loading.hide()
                        } else {
                            vm.$router.push("/")
                            Loading.hide()
                        }
                    } else {
                        // If user desen't exist
                        var today = new Date();
                        const dataUser = {
                            displayName: result.user.displayName,
                            email: result.user.uid + "@superactive.com",
                            gender: "",
                            photoURL: result.user.photoURL,
                            access: "",
                            association: "",
                            deficiency: "",
                            phoneNumber: "",
                            address: "",
                            place: "",
                            profession: "",
                            education: "",
                            profileType: "",
                            description: "",
                            date: "",
                            registrationDate: String(today)
                        }

                        ref.set(dataUser).then((docRef) => {
                            // console.log("Updated")
                            commit('SET_USER_DATA', dataUser);
                            if (LocalStorage.getItem("routeBack")) {
                                vm.$router.push("/")
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
                })
            }
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error.message);
        });
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // alert(error.message);
        showErrorMessage("Ops! Ocorreu um erro durante o processamento. \nVerifica a sua conexão")
    });
}


export function facebookSignIn ({ commit }) {
    Loading.show()
    var provider = new firebase.auth.FacebookAuthProvider();
    const vm = this;
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        var data = {};


        const ref = firestoreDB.collection('users').doc(result.user.uid + "@superactive.com") // email is the key
        //   this.user = result.user
        const userData = {
            displayName: result.user.displayName,
            // email: result.user.email,
            email: result.user.uid + "@superactive.com",
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
                    access: doc.data().access,
                    association: doc.data().association,
                    registrationDate: doc.data().registrationDate,
                    deficiency: doc.data().deficiency,
                    displayName: doc.data().displayName,
                    gender: doc.data().gender,
                    email: result.user.uid + "@superactive.com",
                    photoURL: doc.data().photoURL,
                    phoneNumber: doc.data().phoneNumber,
                    address: doc.data().address,
                    place: doc.data().place,
                    profession: doc.data().profession,
                    education: doc.data().education,
                    profileType: doc.data().profileType,
                    description: doc.data().description,
                    date: doc.data().date
                }
                commit('SET_USER_DATA', data)
                if (LocalStorage.getItem("routeBack")) {
                    vm.$router.push("/")
                    vm.$router.push(LocalStorage.getItem("routeBack"))
                    LocalStorage.set("routeBack", "")
                    Loading.hide()
                } else {
                    vm.$router.push("/")
                    Loading.hide()
                }
            } else {
                // If user desen't exist
                var today = new Date();
                const dataUser = {
                    displayName: result.user.displayName,
                    email: result.user.uid + "@superactive.com",
                    photoURL: result.user.photoURL,
                    gender: "",
                    access: "",
                    association: "",
                    deficiency: "",
                    phoneNumber: "",
                    address: "",
                    place: "",
                    profession: "",
                    education: "",
                    profileType: "",
                    description: "",
                    date: "",
                    registrationDate: String(today)
                }

                ref.set(dataUser).then((docRef) => {
                    // console.log("Updated")
                    commit('SET_USER_DATA', dataUser);
                    if (LocalStorage.getItem("routeBack")) {
                        vm.$router.push("/")
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
        })



        // ...
    }).catch(function (error) {
        // Handle Errors here.
        Loading.hide()
        var errorCode = error.code;
        var errorMessage = "Ops! Ocorreu um erro durante o processamento.";
        console.log(errorMessage)
        showErrorMessage("Ops! Ocorreu um erro durante o processamento. \nVerifica a sua conexão")
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

// export function getUser() {

//     ref.get().then((doc) => {
//         if (doc.exists) {
//             const data = {
//                 id: doc.id,
//                 displayName: doc.data().displayName,
//                 email: doc.data().email,
//                 photoURL: doc.data().photoURL,
//                 phoneNumber: doc.data().phoneNumber,
//                 address: doc.data().address,
//                 profession: doc.data().profession,
//                 education: doc.data().education,
//                 profileType: doc.data().profileType,
//                 description: doc.data().description,
//                 education: doc.data().education,
//                 date: doc.data().date
//             }
//             commit('SET_USER_DATA', data)
//             if (LocalStorage.getItem("routeBack")) {
//                 this.$router.go(-1);
//                 // this.$router.push("/")
//                 // this.$router.push(LocalStorage.getItem("routeBack"))
//                 LocalStorage.set("routeBack", "")
//                 Loading.hide()
//             } else {
//                 this.$router.push("/")
//                 Loading.hide()
//             }
//         }
//     })

// }

export function editUser ({ commit, dispatch }, payload) {
    // Edit or add a user
    Loading.show()
    const ref = firestoreDB.collection('users').doc(payload.id) // email is the key
    ref.set(payload.data).then((docRef) => {
        const data = {
            id: payload.data.id,
            access: payload.data.access,
            association: payload.data.association,
            registrationDate: payload.data.registrationDate,
            deficiency: payload.data.deficiency,
            gender: payload.data.gender,
            displayName: payload.data.displayName,
            email: payload.data.email,
            photoURL: payload.data.photoURL,
            phoneNumber: payload.data.phoneNumber,
            address: payload.data.address,
            place: payload.data.place,
            profession: payload.data.profession,
            education: payload.data.education,
            profileType: payload.data.profileType,
            description: payload.data.description,
            education: payload.data.education,
            date: payload.data.date
        }
        commit('SET_USER_DATA', data)


        var dataUpload = {
            data: {
                displayName: payload.data.displayName,
                photoURL: payload.data.photoURL,
                phoneNumber: payload.data.phoneNumber,
                date: payload.data.date,
                email: payload.data.email
            },
            img: payload.img
        }

        dispatch('updateUser', dataUpload)
    })
        .catch((error) => {
            Loading.hide()
            showErrorMessage("Error adding document: ", error)
        })
}

export function updateUser ({ commit, dispatch }, payload) {
    const vm = this;
    if (payload.img) {
        const data = {
            displayName: payload.data.displayName,
            photoURL: payload.data.photoURL,
            phoneNumber: payload.data.phoneNumber,
            date: payload.data.date,
            email: payload.data.email,
            img: payload.img,
            older: true,
            vm: this
        };
        dispatch('uploadAuxFunc', data);
    } else {
        var user = firebase.auth().currentUser;
        user.updateProfile(payload.data).then(function () {
            // Update successful.
            user = firebase.auth().currentUser;
            const userData = {
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                refreshToken: user.refreshToken,
                uid: user.uid
            }

            commit('AUTH_USER', userData)

            // vm.$router.go(-1)
            alertMessage("Perfil atualizado com sucesso!", vm)
            Loading.hide()
        }).catch(function (error) {
            // An error happened.
            Loading.hide()
            showErrorMessage("Erro ao editar usuário: ", error)
        });
    }
}

export function detailUser ({ commit }, id) {
    // Details of a user
    const ref = firestoreDB.collection('users').doc(id)
    let data = {}
    ref.get().then((doc) => {
        if (doc.exists) {
            data = {
                id: doc.id,
                access: doc.data().access,
                association: doc.data().association,
                registrationDate: doc.data().registrationDate,
                deficiency: doc.data().deficiency,
                displayName: doc.data().displayName,
                gender: doc.data().gender,
                email: doc.data().email,
                photoURL: doc.data().photoURL,
                phoneNumber: doc.data().phoneNumber,
                address: doc.data().address,
                place: doc.data().place,
                profession: doc.data().profession,
                education: doc.data().education,
                profileType: doc.data().profileType,
                description: doc.data().description,
                date: doc.data().date
            }
            commit('SET_USER_DATA', data)
        } else {
            // If user desen't exist
            data = {
                id: null,
                access: "",
                association: "",
                registrationDate: "",
                gender: "",
                deficiency: "",
                displayName: "",
                email: "",
                photoURL: "",
                phoneNumber: "",
                address: "",
                place: "",
                profession: "",
                education: "",
                profileType: "",
                description: "",
                date: ""
            }
            commit('SET_USER_DATA', data)
        }
    })
}

export function loginUser ({ commit }, payload) {
    let vm = this;
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
            commit('AUTH_USER', user.user);
            commit('SET_AUTH_USER', true);
            firestoreDB.collection('users').doc(user.user.email).get().then((doc) => {
                if (doc.exists) {
                    var data = {
                        id: doc.id,
                        access: doc.data().access,
                        association: doc.data().association,
                        deficiency: doc.data().deficiency,
                        displayName: doc.data().displayName,
                        gender: doc.data().gender,
                        email: doc.data().email,
                        photoURL: doc.data().photoURL,
                        phoneNumber: doc.data().phoneNumber,
                        address: doc.data().address,
                        place: doc.data().place,
                        profession: doc.data().profession,
                        education: doc.data().education,
                        profileType: doc.data().profileType,
                        description: doc.data().description,
                        date: doc.data().date
                    }
                    commit('SET_USER_DATA', data);
                    Loading.hide()
                    Notify.create('Sessão iniciada com sucesso!')
                    vm.$router.push("/")
                } else {
                    // Loading.hide()
                    Notify.create('Sessão iniciada com sucesso!')
                    if (LocalStorage.getItem("routeBack")) {
                        vm.$router.push("/")
                        vm.$router.push(LocalStorage.getItem("routeBack"))
                        LocalStorage.set("routeBack", "")
                        Loading.hide()
                    } else {
                        this.$router.push("/")
                        Loading.hide()
                    }
                }
            }).catch(error => {
                console.log(error)
                Loading.hide()
                showErrorMessage("Ops! Ocorreu um erro durante o processamento.", true)
            })
        })
        .catch(error => {
            Loading.hide()
            console.log(error)
            loginErrorMessage("Email ou senha incorrecto! Crie uma conta se não tiver.")
        })
}

export function loginUserr ({ commit }, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
            console.log(user)
            commit('AUTH_USER', user.user);
            commit('SET_AUTH_USER', true);

            const ref = firestoreDB.collection('users').doc(user.user.email)
            ref.get().then((doc) => {
                if (doc.exists) {
                    var data = {
                        id: doc.id,
                        displayName: doc.data().displayName,
                        email: doc.data().email,
                        photoURL: doc.data().photoURL,
                        phoneNumber: doc.data().phoneNumber,
                        address: doc.data().address,
                        place: doc.data().place,
                        profession: doc.data().profession,
                        education: doc.data().education,
                        profileType: doc.data().profileType,
                        description: doc.data().description,
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
                        this.$router.push("/")
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
            Loading.hide()
            showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
        })
}

export function checkAuthUser ({ commit }, route) {
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
            if (route && route == "back") {
                this.$router.go(-1)
            } else {
                this.$router.push('/account')
            }
        }
    })
}

export function signOut ({ commit }) {
    Loading.show()
    const vm = this;
    firebaseAuth.signOut()
        .then(() => {
            commit('SET_AUTH_USER', false)
            commit('AUTH_USER', null)
            commit('SET_USER_DATA', null)
            vm.$router.push('/')
            Loading.hide()
        })
}

// export function deleteUser({ commit }, payload) {
//     deleteCandidature(payload.id)
//     deleteChat(payload.id)
//     deleteCV(payload.id)
//     deleteStore(payload.id)
//     console.log("Continua")
//     deleteVacancies(payload.id)
//     deleteVideo(payload.id)
// }



export function deleteUserr ({ commit }, payload) {
    Loading.show()
    var docRef = firestoreDB.collection("users").doc("nelziositoe@gmail.com");

    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        Loading.hide()
    }).catch(function (error) {
        Loading.hide()
        console.log("Error getting document:", error);
    });
}

export function deleteUser ({ commit }, payload) {
    Loading.show()
    const vm = this;
    var user = firebase.auth().currentUser;


    // console.log(user)
    // console.log(user.providerData[0].providerId)


    if (user.providerData[0].providerId == "password") {
        var credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            payload.password
        );

        console.log(credential)
        user.reauthenticateWithCredential(credential).then(function () {
            // User re-authenticated.
            user = firebase.auth().currentUser;
            const ref = firestoreDB.collection('users').doc(payload.id)
            ref.get().then((doc) => {
                if (doc.exists) {
                    deleteCandidature(payload.id)
                    deleteChat(payload.id)
                    deleteCV(payload.id)
                    deleteStore(payload.id)
                    deleteVacancies(payload.id)
                    deleteVideo(payload.id)
                    setTimeout(() => {
                        user.delete().then(function () {
                            // User deleted.
                            commit('SET_AUTH_USER', false)
                            commit('AUTH_USER', null)
                            commit('SET_USER_DATA', null)


                            Notify.create('Usuario Excluido')
                            vm.$router.push('/')
                            Loading.hide()
                        }).catch(function (error) {
                            // An error happened.
                            Notify.create('Erro ao Remover1')
                            Loading.hide()
                        })
                    }, 15000);
                } else {
                    // If user desen't exist

                    deleteCandidature(payload.id)
                    deleteChat(payload.id)
                    deleteCV(payload.id)
                    deleteStore(payload.id)
                    deleteVacancies(payload.id)
                    deleteVideo(payload.id)
                    setTimeout(() => {
                        user.delete().then(function () {
                            // User deleted.
                            commit('SET_AUTH_USER', false)
                            commit('AUTH_USER', null)
                            commit('SET_USER_DATA', null)


                            setTimeout(() => {
                                Notify.create('Usuario Excluido')
                                vm.$router.push('/')
                                Loading.hide()
                            }, 15000);
                        }).catch(function (error) {
                            // An error happened.
                            Notify.create('Erro ao Remover2')
                            Loading.hide()
                        })
                    }, 15000);
                }
            }).catch((error) => {
                Loading.hide()
                showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
            });

        }).catch(function (error) {
            // An error happened.
            Loading.hide()
            console.log("Done't")
        });
    } else {
        if (user.providerData[0].providerId == "facebook.com") {
            var provider = new firebase.auth.FacebookAuthProvider();
        } else {
            var provider = new firebase.auth.GoogleAuthProvider();
        }
        if (window.hasOwnProperty("cordova")) {
            firebase.auth().signInWithRedirect(provider).then(function () {
                firebase.auth().getRedirectResult().then(function (result) {
                    if (result.credential) {
                        user = firebase.auth().currentUser;
                        const ref = firestoreDB.collection('users').doc(payload.id)
                        ref.get().then((doc) => {
                            if (doc.exists) {
                                deleteCandidature(payload.id)
                                deleteChat(payload.id)
                                deleteCV(payload.id)
                                deleteStore(payload.id)
                                deleteVacancies(payload.id)
                                deleteVideo(payload.id)
                                setTimeout(() => {
                                    user.delete().then(function () {
                                        // User deleted.
                                        commit('SET_AUTH_USER', false)
                                        commit('AUTH_USER', null)
                                        commit('SET_USER_DATA', null)

                                        Notify.create('Usuario Excluido')
                                        vm.$router.push('/')
                                        Loading.hide()

                                    }).catch(function (error) {
                                        // An error happened.
                                        Notify.create('Erro ao Remover1')
                                        Loading.hide()
                                    })
                                }, 15000);
                            } else {
                                // If user desen't exist
                                deleteCandidature(payload.id)
                                deleteChat(payload.id)
                                deleteCV(payload.id)
                                deleteStore(payload.id)
                                deleteVacancies(payload.id)
                                deleteVideo(payload.id)
                                setTimeout(() => {
                                    user.delete().then(function () {
                                        // User deleted.
                                        commit('SET_AUTH_USER', false)
                                        commit('AUTH_USER', null)
                                        commit('SET_USER_DATA', null)

                                        Notify.create('Usuario Excluido')
                                        vm.$router.push('/')
                                        Loading.hide()
                                    }).catch(function (error) {
                                        // An error happened.
                                        Notify.create('Erro ao Remover2')
                                        Loading.hide()
                                    })
                                }, 15000);
                            }
                        }).catch((error) => {
                            Loading.hide()
                            showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                        });
                    }
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(error.message);
                });
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(error.message);
            });
        } else {
            firebase.auth().signInWithPopup(provider).then((result) => {
                //   this.user = result.user
                user = firebase.auth().currentUser;
                const ref = firestoreDB.collection('users').doc(user.email);
                setTimeout(function () {
                    console.log("Hello");
                    ref.get().then((doc) => {
                        console.log("BD User")
                        if (doc.exists) {
                            deleteCandidature(payload.id)
                            deleteChat(payload.id)
                            deleteCV(payload.id)
                            deleteStore(payload.id)
                            deleteVacancies(payload.id)
                            deleteVideo(payload.id)
                            setTimeout(() => {
                                user.delete().then(function () {
                                    // User deleted.
                                    commit('SET_AUTH_USER', false)
                                    commit('AUTH_USER', null)
                                    commit('SET_USER_DATA', null)

                                    Notify.create('Usuario Excluido')
                                    vm.$router.push('/')
                                    Loading.hide()
                                }).catch(function (error) {
                                    // An error happened.
                                    Notify.create('Erro ao Remover1')
                                    Loading.hide()
                                })
                            }, 15000);
                        } else {
                            // If user desen't exist
                            deleteCandidature(payload.id)
                            deleteChat(payload.id)
                            deleteCV(payload.id)
                            deleteStore(payload.id)
                            deleteVacancies(payload.id)
                            deleteVideo(payload.id)
                            setTimeout(() => {
                                user.delete().then(function () {
                                    // User deleted.
                                    commit('SET_AUTH_USER', false)
                                    commit('AUTH_USER', null)
                                    commit('SET_USER_DATA', null)

                                    Notify.create('Usuario Excluido')
                                    vm.$router.push('/')
                                    Loading.hide()
                                }).catch(function (error) {
                                    // An error happened.
                                    Notify.create('Erro ao Remover2')
                                    Loading.hide()
                                })
                            }, 15000);
                        }
                    }).catch((error) => {
                        Loading.hide()
                        showErrorMessage("Ops! Ocorreu um erro durante o processamento.")
                    });
                }, 1000);
            }).catch(err => {
                console.log("Erro")
                console.log(err)
                Loading.hide()
            })
        }
    }
}

export function deleteVideoUser (id) {
    deleteVideo(id, true)
}
