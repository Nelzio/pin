import { firestoreDb } from "boot/firebase";

function deleteFunc(ref) {
    ref.delete().then(() => {
      console.log("candidature delete")
    }).catch((error) => {
      console.log("candidature delete Error")
      console.log(error)
  })
};



export function deleteCandidature(user) {
    // done
    const ref = firestoreDb.collection("vacancies");
    var vacanciesAply = [];
    ref
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var refCandidatur = firestoreDb.collection("vacancies").doc(doc.id).collection("candidates").doc(user)
          
            refCandidatur.get()
            .then(doc2 => {
              if (doc2.exists) {
                deleteFunc(refCandidatur)
              }
            });
        });
      });
  }