import { firestoreDB, firebase } from "boot/firebase";

export function deleteCV (user) {
  var storageRef = firebase.storage();
  const ref = firestoreDB.collection('curriculum').doc(user);
  ref.get().then((doc) => {
    if (doc.exists) {
      vm.curriculumDownload = {
        key: doc.id,
        docUrl: doc.data().docUrl,
        user: doc.data().user,
      }

      var refDoc = storageRef.child('curriculum/' + user.split('@')[0] + '.pdf');
      refDoc.delete().catch((error) => {
        console.log("curriculum delete Error")
        console.log(error)
      });
      ref.delete().catch((error) => {
        console.log("curriculum delete Error")
        console.log(error)
      });

    } else {
      console.log("No such document!")
      // Loading.hide()
    }
  });
}