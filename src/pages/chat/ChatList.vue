<template>
  <q-page v-touch-swipe.mouse.right="handleSwipe" v-touch-hold:800.mouse="handleHold">
    <!-- content -->
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <q-list separator>
          <chat-list 
            v-for="chat in chatList"
            :key="chat.key"
            :chat="chat"
          />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { firestoreDb, fireStorage, firebase } from "boot/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
import ChatList from "components/chat/ChatList.vue"
export default {
  // name: 'PageName',
  data() {
    return {
      chatData: [],
      chatList: [],
      touchNums: 0,
    };
  },
  components: {
    ChatList
  },

  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("auth", ["user", "userData"]),
    ...mapGetters("settings", ["getFont"])
  },

  methods: {
    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1);
      }
    },

    handleHold({ evt, ...info }) {
      // console.log(info)
    },

    getChat2() {
      const vm = this;

      var chatData = [];
      var chatIDs = [""]
      const refDoc = firestoreDb.collection("chat").doc(this.user.email.split('@')[0]);
      refDoc.onSnapshot((doc) => {
        if (doc.exists) {
          if(doc.data().peopleChat) {
            doc.data().peopleChat.forEach(element => {
              if (element !== "nobody") {
                var refSender = firestoreDb.collection("chat").doc(this.user.email.split('@')[0]).collection(element);
                refSender.onSnapshot(function(querySnapshot) {
                  chatData = [];
                  querySnapshot.forEach(function(doc) {
                    if (!chatIDs.includes(chatIDs)) {
                      chatData.push({
                        key: doc.id,
                        receptorUser: doc.data().email,
                        email: doc.data().receptorUser,
                        sender: doc.data().sender,
                        displayName: doc.data().displayName,
                        audio: doc.data().audio ? doc.data().audio : "",
                        imgUserUrl: doc.data().imgUserUrl,
                        timeSend: new Date(doc.data().timeSend),
                        message: doc.data().message,
                        readed: doc.data().readed
                      });
                      chatIDs.push(doc.id)
                    }
                  });
                  chatData.sort(function(a, b) {
                    return a.timeSend - b.timeSend;
                  });
                  if (chatData[chatData.length - 1]) {
                    vm.chatList.push(chatData[chatData.length - 1]);
                    vm.chatList.sort(function(a, b) {
                      return b.timeSend - a.timeSend;
                    });
                  } 
                    
                });
              }
            });
          }
        }
      });
    },

    objectPropInArray(list, prop1, val1, prop2, val2) {
      var i;
      if (list.length > 0) {
        for (i in list) {
          if (list[i][prop1] === val1 && list[i][prop2] === val2) {
            return true;
          }
        }
      }
      return false;
    },
  },
  created() {},
  mounted() {
    // this.getChat();
    this.getChat2();
    this.$root.$emit("textToSpeechRouter", "Página de lista de conversas.\n Clique uma vez pra ouvir o que está clicando e clique duas vezes para entrar na conversa.");
  }
};
</script>

<style lang="sass">
</style>
