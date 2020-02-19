<template>
  <q-page v-touch-swipe.mouse.right="handleSwipe" v-touch-hold:800.mouse="handleHold">
    <!-- content -->
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <q-list separator>
          <q-item
            clickable
            v-ripple
            v-for="chat in chatData"
            :key="chat.key"
            :to="'/chat/' + chat.email"
          >
            <q-item-section avatar>
              <q-avatar size="60px">
                <q-img :src="chat.imgUserUrl" alt />
              </q-avatar>
            </q-item-section>
            <q-item-section v-if="user.displayName == chat.displayName">
              <div :class="getFont.title">Você</div>
              <div v-if="chat.message" :class="getFont.text">{{ chat.message.slice(0, 20) }}</div>
              <div v-else :class="getFont.text">Mensagem de voz</div>
            </q-item-section>
            <q-item-section v-else>
              <div :class="getFont.title">{{ chat.displayName }}</div>
              <div v-if="chat.message" :class="getFont.text">{{ chat.message.slice(0, 20) }}...</div>
              <div v-else :class="getFont.text">Mensagem de voz</div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { firestoreDb, fireStorage, firebase } from "boot/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  // name: 'PageName',
  data() {
    return {
      chatData: []
    };
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

    getChat() {
      const vm = this;
      const ref = firestoreDb.collection("chat");
			var chatData = [];
			var chatData2 = [];
      var chatDataAux = [{ email: "", receptorUser: "" }];
      var chatReceptor = [""];
      var checkObj = false;
      // const
      ref.onSnapshot(function(querySnapshot) {
				chatData = [];
				chatData2 = [];
				chatDataAux = [];
				chatReceptor = [""]
        querySnapshot.forEach(function(doc) {
          if (
            doc.data().receptorUser == vm.user.email ||
            doc.data().email == vm.user.email
          ) {
						chatData.push({
							key: doc.id,
							email: doc.data().email,
							displayName: doc.data().displayName,
							audio: doc.data().audio,
							imgUserUrl: doc.data().imgUserUrl,
							timeSend: new Date(doc.data().timeSend),
							message: doc.data().message,
							receptorUser: doc.data().receptorUser
						});
          }
        });
        chatData.sort(function(a, b) {
          return  b.timeSend - a.timeSend;
				});
				
				chatData.forEach(element => {
					if (
              !vm.objectPropInArray(
                chatDataAux,
                "email",
                element.email,
                "receptorUser",
                element.receptorUser
              )
            ) {
              if (element.email === vm.user.email) {
                if (!chatReceptor.includes(element.receptorUser)) {
                  chatData2.push({
                     key: element.key,
                    email: element.receptorUser,
                    displayName: element.displayName,
                    audio: element.audio,
                    imgUserUrl: element.imgUserUrl,
                    timeSend: new Date(element.timeSend),
                    message: element.message,
                    receptorUser: element.email
                  });
                  chatReceptor.push(element.receptorUser);
                }
              } else {
                if (!chatReceptor.includes(element.email)) {
                  chatData2.push({
                    key: element.key,
                    email: element.email,
                    displayName: element.displayName,
                    audio: element.audio,
                    imgUserUrl: element.imgUserUrl,
                    timeSend: new Date(element.timeSend),
                    message: element.message,
                    receptorUser: element.receptorUser
                  });
                  chatReceptor.push(element.email);
                }
              }
						}
						chatDataAux.push({
              email: element.email,
              receptorUser: element.receptorUser
            });
				});
        vm.chatData = chatData2;
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
    }
  },
  created() {},
  mounted() {
    this.getChat();
    this.$root.$emit("textToSpeechRouter", "Pagina de lista de conversas com.");
  }
};
</script>

<style lang="sass">
</style>
