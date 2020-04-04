import { firestoreDb, fireStorage } from "boot/firebase";

function deleteVideoFile(id) {
    var storageRef = fireStorage.ref()

    var desertRef = storageRef.child('videos/' + id);

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
            ref.delete().catch((error) => {
                console.log("video delete Error")
                console.log(error)
            });
            deleteVideoFile(id)
        } else {
            console.log("No such document!")
            // Loading.hide()
        }
    });
}