import { firestoreDB, fireStorage } from "boot/firebase"

function deleteStories (id) {
    var storageRef = fireStorage.ref()

    var desertRef = storageRef.child('stories/' + id);

    firestoreDB.collection('stories').doc(id).delete().then(() => {
        // Delete the file
        desertRef.delete().catch((error) => {
            console.log("store delete Error")
            console.log(error)
        });
    }).catch((error) => {
        alert("Error removing document: ", error);
    });
};

export function deleteStore (user) {
    const ref = firestoreDB.collection('stories')
    ref.where("user", "==", user).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            deleteStories(doc.id)
        });
    })
};