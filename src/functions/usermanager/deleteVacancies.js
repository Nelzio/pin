import { firestoreDb, fireStorage } from "boot/firebase"

function deleteVacancy(id) {
    var storageRef = fireStorage.ref()

    var desertRef = storageRef.child('vacancies/' + id);

    firestoreDb.collection('vacancies').doc(id).delete().then(() => {
        // Delete the file
        desertRef.delete()
    }).catch((error) => {
        alert("Error removing document: ", error);
    });
};

export function deleteVacancies(user) {
    const ref = firestoreDb.collection('vacancies')
    ref.where("user", "==", user).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            deleteVacancy(doc.id)
        });
    })
};