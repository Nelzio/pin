import { firestoreDb } from "boot/firebase";

export function deleteCV(user) {
    var storageRef = firebase.storage();
    const ref = firestoreDb.collection('curriculum').doc(user);
    ref.get().then((doc) => {
      if (doc.exists) {
        vm.curriculumDownload = {
          key: doc.id,
          docUrl: doc.data().docUrl,
          user: doc.data().user,
        }

        var refDoc = storageRef.child('curriculum/' + user.split('@')[0] + '.pdf');
        refDoc.delete()
        ref.delete()

      } else {
        console.log("No such document!")
        // Loading.hide()
      }
    });
  }