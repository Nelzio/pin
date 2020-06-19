<template>
  <div v-if="haveMessage">
    <!-- to="/chat" -->
    <q-btn
      v-if="isUserAuth"
      round
      dense
      flat
      icon="message"
      :color="darkModeConf.iconVar"
      size="lg"
      to="/chat"
    >
      <!-- <q-badge v-if="numMessage" color="primary" text-color="white" floating>{{ numMessage }}</q-badge> -->
      <q-badge class="notification" v-if="notification" color="red" text-color="white" floating></q-badge>
    </q-btn>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
export default {
  // props: ["readed"],
  data() {
    return {
      numMessage: 0,
      haveMessage: false,
      notification: false,
      readed: false
    };
  },
  computed: {
    ...mapGetters("auth", ["isUserAuth", "user"]),
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"])
  },
  methods: {
    getChat() {
      const vm = this;
      const ref = firestoreDb
        .collection("chat")
        .doc(vm.user.email.split("@")[0]);
      var chatDataObj = {};
      var arrayToCountMessage = [];

      ref.onSnapshot(function(doc) {
        if (doc.exists) {
          vm.haveMessage = true;
          doc.data().peopleChat.forEach(element => {
            // console.log(element);
            vm.countVal(element);
          });
        }
      });
    },
    getChatRead() {
      const vm = this;
      const ref = firestoreDb
        .collection("chat")
        .doc(vm.user.email.split("@")[0]);
      var chatDataObj = {};
      var arrayToCountMessage = [];

      ref.get().then(function(doc) {
        if (doc.exists) {
          vm.haveMessage = true;
          doc.data().peopleChat.forEach(element => {
            console.log(element);
            vm.countVal(element);
          });
        }
      });
    },

    countValToRead(val) {
      const vm = this;
      let time = 1000;
      var refToCount = firestoreDb
        .collection("chat")
        .doc(vm.user.email.split("@")[0])
        .collection(val);
      refToCount
        .where("readed", "==", false)
        .get()
        .then(function(querySnap) {
          vm.numMessage = querySnap.length;
          vm.notification = false;
          // console.log(querySnap.length)
          querySnap.forEach(doc => {
            if (!doc.data().readed && doc.data().sender !== vm.user.email) {
              setTimeout(() => {
                vm.notification = true;
                console.log(doc.data());
                console.log(vm.notification);
              }, time);
              console.log("Antes");
              return;
              console.log("Depois");
            }
            time += 100;
          });
        });
    },

    countVal(val) {
      const vm = this;
      let time = 1000;
      let notification = false;
      var refToCount = firestoreDb
        .collection("chat")
        .doc(vm.user.email.split("@")[0])
        .collection(val);
        refToCount.where("readed", "==", false).onSnapshot(function(querySnap) {
          vm.numMessage = querySnap.length;
          vm.notification = false;
          notification = false;
          // console.log(querySnap.length)
          querySnap.forEach(doc => {
            if (!doc.data().readed && doc.data().sender !== vm.user.email) {
              vm.notification = true;
              notification = true;
              // console.log(doc.data());
              // console.log(vm.notification);
              // console.log("Antes");
              return;
              // console.log("Depois");
            }
            time += 100;
          });
          setTimeout(() => {
            // console.log(vm.notification)
            // console.log(notification)
            if (notification) {
              vm.notification = true;
              notification = false;
              return
            }
            // console.log(vm.notification)
          }, 5000);
        });
    }

    // countValOnRead(val) {
    //   const vm = this;
    //   var arrayToCountMessage = [];
    //   var countNumTemp = 0;
    //   vm.numMessage = 0;
    //   var countNumTemp = 0;
    //   var load = false;
    //   var refToCount = firestoreDb
    //     .collection("chat")
    //     .doc(vm.user.email.split("@")[0])
    //     .collection(val);
    //   refToCount
    //     .where("readed", "==", false)
    //     .get()
    //     .then(function(querySnap) {
    //       vm.numMessage = 0;
    //       // countNumTemp = 0;
    //       arrayToCountMessage = [];
    //       load = true;
    //       if (load) {
    //         setTimeout(() => {
    //           querySnap.forEach(function(doc) {
    //             console.log(doc.data().sender);
    //             console.log(vm.user.email);
    //             console.log(doc.data().readed);
    //             if (!doc.data().readed && doc.data().sender !== vm.user.email) {
    //               // vm.numMessage += 1;
    //               countNumTemp++;
    //               arrayToCountMessage.push("num");
    //             }
    //           });
    //           if (countNumTemp) vm.numMessage = countNumTemp;
    //           if (arrayToCountMessage.length) {
    //             vm.numMessage = arrayToCountMessage.length;
    //           }
    //         }, 3000);
    //         load = false;
    //       }
    //       // vm.numMessage = arrayToCountMessage.length;
    //     });
    // }
  },
  mounted() {
    let vm = this;
    if (this.isUserAuth) this.getChat();
    this.$root.$on("countMessages", val => {
      this.readed = true;
      // console.log("heyyyyy");
    });
  },
  watch: {
    readed(val) {
      if (val) {
        // this.getChat()
        this.getChatRead();
        this.readed = false;
      }
    }
  }
};
</script>

<style lang="stylus">
.notification {
  height: 15px;
  width: 15px;
  border-radius: 100%;
}
</style>