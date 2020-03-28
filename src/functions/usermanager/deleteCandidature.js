import { firestoreDb } from "boot/firebase";

function deleteFunc(ref) {
    Loading.show();
    ref.delete()
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