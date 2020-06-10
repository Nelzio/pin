<template>
  <div v-if="haveMessage">
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
      <q-badge v-if="numMessage" color="primary" text-color="white" floating>{{ numMessage }}</q-badge>
    </q-btn>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
export default {
  data() {
    return {
      numMessage: 0,
      haveMessage: false
    };
  },
  computed: {
    ...mapGetters("auth", ["isUserAuth", "user"]),
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
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
            vm.countVal(element);
          });
        }
      });
    },
    countVal(val) {
      const vm = this;
      var arrayToCountMessage = [];
      var countNumTemp = 0;
      vm.numMessage = 0;
      var countNumTemp = 0;
      // console.log(vm.numMessage);
      // console.log(countNumTemp);
      // arrayToCountMessage.length;
      // console.log("---------------------------");
      var refToCount = firestoreDb
        .collection("chat")
        .doc(vm.user.email.split("@")[0])
        .collection(val);
      refToCount.where("readed", "==", false).onSnapshot(function(querySnap) {
        // vm.numMessage = 0;
        // countNumTemp = 0;
        arrayToCountMessage = [];
        querySnap.forEach(function(doc) {
          if (!doc.data().readed && doc.data().sender !== vm.user.email) {
            // vm.numMessage += 1;
            countNumTemp++;
            arrayToCountMessage.push("num");
          }
        });
        if (countNumTemp) vm.numMessage = countNumTemp;
        if (arrayToCountMessage.length)
          vm.numMessage = arrayToCountMessage.length;
        // console.log(vm.numMessage);
        // console.log(arrayToCountMessage.length);
        // console.log(arrayToCountMessage);
      });
    }
  },
  mounted() {
    this.getChat();
  }
};
</script>

<style>
</style>