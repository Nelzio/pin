import { firestoreDb, fireStorage } from "boot/firebase";

function deleteAudio(name) {
        var storageRef = fireStorage.ref()
    
        var desertRef = storageRef.child('chat/' + name);
        desertRef.delete()
}

export function deleteChat(user) {
    const refDoc = firestoreDb.collection("chat").doc(user.split('@')[0]);
    refDoc.get().then((doc) => {
        if (doc.exists) {
            if(doc.data().peopleChat) {
                doc.data().peopleChat.forEach(element => {
                    var refSender = firestoreDb.collection("chat").doc(user.split('@')[0]).collection(element);
                    refSender.get().then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // chatData.push({
                            // key: doc.id,
                            // receptorUser: doc.data().email,
                            // email: doc.data().receptorUser,
                            // sender: doc.data().sender,
                            // displayName: doc.data().displayName,
                            // audio: doc.data().audio ? doc.data().audio : "",
                            // imgUserUrl: doc.data().imgUserUrl,
                            // timeSend: new Date(doc.data().timeSend),
                            // message: doc.data().message,
                            // readed: doc.data().readed
                            // });
                            if(doc.data().audio) {
                                deleteAudio(doc.data().audio.name)
                            }
                            refSender.doc(doc.id).delete()
                            refDoc.delete()
                        });
                    });
                });
            }
        }
    });
  }