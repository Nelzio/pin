import { firestoreDb, fireStorage } from "boot/firebase";
import { LocalStorage, Loading, Notify } from 'quasar'

function deleteVideoFile(id) {
    var storageRef = fireStorage.ref()

    var desertRef = storageRef.child('videos/' + id)

    desertRef.delete().then(function () {
        // File deleted successfully
    }).catch(function (error) {
        // Uh-oh, an error occurred!
        console.log("Erro ao Remover video")
    });
}

export function deleteVideo(id) {
    const ref = firestoreDb.collection('videos').doc(id);
    ref.onSnapshot((doc) => {
        if (doc.exists) {
            if (doc.data().from == "storange") {
                deleteVideoFile(id)
            }
            ref.delete().then(function () {
                // File deleted successfully
            }).catch((error) => {
                console.log("video delete Error firestore")
                console.log(error)
            });

        } else {
            console.log("No such document!")
            // Loading.hide()
        }
    });





    
}