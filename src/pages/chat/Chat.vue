<template>
  <q-page
    padding
    class="q-pt-xl q-pb-xl"
    v-touch-swipe.mouse.right="handleSwipe"
    v-touch-hold:650.mouse="handleHold"
  >
    <!-- content -->
    <div class="row justify-center q-pt-md">
      <div class="col-12 col-md-7">
        <div v-for="message in chatData" :key="message.key">
          <chat :message="message" />
        </div>
      </div>
    </div>
    <!-- <div style="width: 100%; max-width: 400px" class="q-pt-xl">
    </div>-->
    <!-- <div>
      <q-card class="q-pt-none q-pb-none">
        <q-card-section class="q-pb-none q-pt-none">
          <div class="text-weight-bold">Nélzio Sitoe</div>
        </q-card-section>
        <q-card-section class="row items-center no-wrap q-pt-none q-pl-none q-pb-none">
          <q-btn flat round :icon="playing ? 'pause' : 'play_arrow'" size="lg" @click="playing ? pauseRecord() : playRecord()" />
          <q-linear-progress :value="progress" color="primary" />
        </q-card-section>
      </q-card>
    </div>-->

    <q-footer v-if="!$q.screen.gt.sm">
      <q-toolbar class="row" :class="[darkModeConf.bgColor, darkModeConf.textColor]">
        <!-- <q-btn round flat icon="insert_emoticon" class="q-mr-sm" /> -->
        <q-form @submit="sendMessage" class="col-12" :class="[darkModeConf.bgColor, darkModeConf.textColor]">
          <div class="row" :class="[darkModeConf.bgColor, darkModeConf.textColor, getFont.text]">
            <q-input
              v-if="recording"
              v-model="fullTimer"
              rounded
              outlined
              dense
              class="WAL__field col-grow q-mr-sm"
              disable
            />
            <q-input
              v-else
              rounded
              outlined
              dense
              class="col-grow q-mr-sm"
              v-model="message.message"
              placeholder="Escreva a sua mensagem"
            />
            <q-btn v-if="message.message" round flat icon="send" type="submit" />
            <q-btn v-else-if="!recording" round flat icon="mic" @click="recordAudio()" />
            <q-btn v-else round flat :class="darkModeConf.textBtn" icon="stop" color="red" @click="stopRecord()" />
          </div>
        </q-form>
      </q-toolbar>
    </q-footer>

    <q-page-sticky position="bottom" v-if="$q.screen.gt.sm">
      <q-toolbar class="bg-grey-3 row" :class="[darkModeConf.bgColor, darkModeConf.textColor]" style="width: 50vw;">
        <q-form @submit="sendMessage" class="col-12">
          <div class="row" :class="[darkModeConf.bgColor, darkModeConf.textColor]">
            <q-input
              v-if="recording"
              v-model="fullTimer"
              rounded
              outlined
              dense
              :class="getFont.text"
              class="WAL__field col-grow q-mr-sm"
              bg-color="white"
              disable
            />
            <q-input
              v-else
              rounded
              outlined
              dense
              :class="getFont.text"
              class="WAL__field col-grow q-mr-sm"
              bg-color="white"
              v-model="message.message"
              placeholder="Escreva a sua mensagem"
            />
            <q-btn :color="darkModeConf.iconVar" v-if="message.message" round flat icon="send" type="submit" />
            <q-btn :color="darkModeConf.iconVar" v-else-if="!recording" round flat icon="mic" @click="recordAudio()" />
            <q-btn v-else round flat icon="stop" color="red" @click="stopRecord()" />
          </div>
        </q-form>
      </q-toolbar>
    </q-page-sticky>

    <q-page-sticky expand position="top" v-if="!$q.screen.gt.sm">
      <q-toolbar :class="[darkModeConf.bgColor, darkModeConf.textColor]" class="shadow-3">
        <q-avatar>
          <q-img :src="getUser.photoURL" />
        </q-avatar>
        <q-toolbar-title :class="getFont.title">{{ getUser.displayName }}</q-toolbar-title>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { firestoreDb, fireStorage, firebase } from "boot/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
import Chat from "components/chat/Chat.vue";
export default {
  // name: 'PageName',
  components: {
    Chat
  },
  data() {
    return {
      mediaRecorder: null,
      audioChunks: [],
      audioUrl: {},
      timer: {
        mm: 0,
        ss: 0
      },
      fullTimer: "00min : 00sec",
      recording: false,
      refreshInterval: null,
      timeslice: null,
      chatData: [],
      message: {
        audio: "",
        message: ""
      },
      setChatId: false,
    };
  },

  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("auth", ["user", "userData"]),
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("settings", ["getFont"])
  },

  methods: {
    ...mapActions("user", ["detailUserStore"]),
    ...mapActions("auth", ["checkAuthUser"]),

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      // gravar audio
      if(window.hasOwnProperty("cordova")){
        navigator.vibrate(200);
      } else {
        window.navigator.vibrate(200);
      }
      if (this.recording) {
        this.stopRecord();
      } else {
        this.recordAudio();
      }
      // console.log(this.vacancy)
    },

    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1);
      }
    },

    recordAudio() {
      const vm = this;
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(stream => {
          // Record Audio
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.counter();
          this.recording = true;

          // Save recorded data Chunks in a list
          this.audioChunks = [];
          this.mediaRecorder.addEventListener("dataavailable", event => {
            this.audioChunks.push(event.data);
          });
        });
    },

    stopRecord() {
      const vm = this;
      this.recording = false;
      this.mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioChunks);
        // this.audioUrl = {audio: URL.createObjectURL(audioBlob), time: vm.timer.ss}
        // // this.audioUrl = {audio: audioBlob, time: vm.timer.ss}
        console.log(this.audioUrl);
        // this.sendMessageVoice(this.audioUrl)
        this.uploadFile(audioBlob);
      });
      this.mediaRecorder.stream.getAudioTracks().forEach(function(track) {
        track.stop();
      });
      this.mediaRecorder.stop();
      clearInterval(this.refreshInterval);
    },

    counter() {
      const vm = this;
      var totalSeconds = 0;
      this.refreshInterval = setInterval(setTime, 1000);

      function setTime() {
        ++totalSeconds;
        vm.timer.ss = totalSeconds % 60;
        vm.timer.mm = totalSeconds / 60;
        vm.fullTimer =
          pad(parseInt(totalSeconds / 60)) +
          "min : " +
          pad(totalSeconds % 60) +
          "sec";
      }

      function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      }
    },

    getChat() {
      // var storageRef = fireStorage.ref()
      // if (!offline.data().isOnline) {
      //   return alert("Sem internet")
      // }
      const vm = this;
      const ref = firestoreDb.collection("chat").doc(this.$route.params.idReceptor.split('@')[0]).collection(this.user.email.split('@')[0]);
      var chatData = [];
      var chatDataObj = {};
      // const
      ref.onSnapshot(function(querySnapshot) {
        chatData = [];
        chatDataObj = {};
        querySnapshot.forEach(function(doc) {
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
        });
        chatData.sort(function(a, b) {
          return a.timeSend - b.timeSend;
        });
        vm.chatData = chatData;
        window.scroll(0, window.innerHeight + 200);
      });
    },
    getChatToRead() {
      const vm = this;
      const ref = firestoreDb.collection("chat").doc(this.user.email.split('@')[0]).collection(this.$route.params.idReceptor.split('@')[0]);
      var chatDataObj = {};
      
      ref.onSnapshot(function(querySnapshot) {
        chatDataObj = {};
        querySnapshot.forEach(function(doc) {
          if (!doc.data().readed && doc.data().sender !== vm.user.email) {
            chatDataObj = {
              key: doc.id,
              email: doc.data().email,
              sender: doc.data().sender,
              displayName: doc.data().displayName,
              audio: doc.data().audio ? doc.data().audio : "",
              imgUserUrl: doc.data().imgUserUrl,
              timeSend: doc.data().timeSend,
              message: doc.data().message,
              receptorUser: doc.data().receptorUser,
              readed: true
            };
            vm.updateMessage(chatDataObj);
          }
        });
      });
    },

    updateMessage(payload) {
        var ref = firestoreDb.collection("chat").doc(this.user.email.split('@')[0]).collection(this.$route.params.idReceptor.split('@')[0]).doc(payload.key);
        ref.set(payload).then(docRef => {
          this.$root.$emit("countMessages", "Count Messages")
        }).catch((error) => {
          alert("Error update document: ", error);
        });
    },

    sendMessage() {
      const vm = this;

      var today = new Date();
      // var dd = String(today.getDate()).padStart(2, '0');
      // var mm = String(today.getMonth() + 1).padStart(2, '0');
      // var yyyy = today.getFullYear();
      // today = mm + '/' + dd + '/' + yyyy;

      this.message.receptorUser = this.$route.params.idReceptor;
      this.message.email = this.user.email;
      this.message.sender = this.user.email;
      this.message.displayName = this.user.displayName;
      this.message.timeSend = String(today);
      this.message.imgUserUrl = this.user.photoURL;
      this.message.readed = false;

      const ref = firestoreDb.collection("chat").doc(this.user.email.split('@')[0]).collection(this.$route.params.idReceptor.split('@')[0]);
      const refReceptor = firestoreDb.collection("chat").doc(this.$route.params.idReceptor.split('@')[0]).collection(this.user.email.split('@')[0]);
      ref.add(this.message).then(docRef => {
        this.message.receptorUser = this.user.email;
        this.message.email = this.$route.params.idReceptor;
        refReceptor.add(this.message).then(docRef => {
          this.message = {
            message: ""
          };
          if(!this.setChatId) {
            this.setChatId = true;
            const refDoc = firestoreDb.collection("chat").doc(vm.user.email.split('@')[0]);
            refDoc.get().then((doc) => {
              if (doc.exists) {
                if(!doc.data().peopleChat) {
                  var chatId = {peopleChat: ["nobody"]}
                } else {
                  var chatId = {peopleChat: doc.data().peopleChat};
                }
              } else {
                var chatId = {peopleChat: ["nobody"]}
              }
              if(!chatId.peopleChat.includes(vm.$route.params.idReceptor)) {
                chatId.peopleChat.push(vm.$route.params.idReceptor);
                refDoc.set(chatId);
              }


              const refDocRecep = firestoreDb.collection("chat").doc(vm.$route.params.idReceptor.split('@')[0]);
              refDocRecep.get().then((docRecep) => {
                if (docRecep.exists) {
                  if(!docRecep.data().peopleChat) {
                    var chatId = {peopleChat: ["nobody"]}
                  } else {
                    var chatId = {peopleChat: docRecep.data().peopleChat};
                  }
                } else {
                  var chatId = {peopleChat: ["nobody"]}
                }
                if(!chatId.peopleChat.includes(vm.user.email.split('@')[0])) {
                  chatId.peopleChat.push(vm.user.email.split('@')[0]);
                  refDocRecep.set(chatId);
                }
              });
            });
          }
        });
      });
    },

    sendMessageVoice(voice) {
      const vm = this;

      var today = new Date();
      this.message.receptorUser = this.$route.params.idReceptor;
      this.message.email = this.user.email;
      this.message.sender = this.user.email;
      this.message.displayName = this.user.displayName;
      this.message.timeSend = String(today);
      this.message.imgUserUrl = this.user.photoURL;
      this.message.readed = false;
      this.message.audio = voice;

      const ref = firestoreDb.collection("chat").doc(this.user.email.split('@')[0]).collection(this.$route.params.idReceptor.split('@')[0]);
      const refReceptor = firestoreDb.collection("chat").doc(this.$route.params.idReceptor.split('@')[0]).collection(this.user.email.split('@')[0]);
      ref.add(this.message).then(docRef => {
        this.message.receptorUser = this.user.email;
        this.message.email = this.$route.params.idReceptor;
        refReceptor.add(this.message).then(docRef => {
          this.message = {
            message: ""
          };
          if(!this.setChatId) {
            this.setChatId = true;
            const refDoc = firestoreDb.collection("chat").doc(vm.user.email.split('@')[0]);
            refDoc.get().then((doc) => {
              if (doc.exists) {
                if(!doc.data().peopleChat) {
                  var chatId = {peopleChat: ["nobody"]}
                } else {
                  var chatId = {peopleChat: doc.data().peopleChat};
                }
              } else {
                var chatId = {peopleChat: ["nobody"]}
              }
              if(!chatId.peopleChat.includes(vm.$route.params.idReceptor)) {
                chatId.peopleChat.push(vm.$route.params.idReceptor);
                refDoc.set(chatId);
              }


              const refDocRecep = firestoreDb.collection("chat").doc(vm.$route.params.idReceptor);
              refDocRecep.get().then((docRecep) => {
                if (docRecep.exists) {
                  if(!docRecep.data().peopleChat) {
                    var chatId = {peopleChat: ["nobody"]}
                  } else {
                    var chatId = {peopleChat: docRecep.data().peopleChat};
                  }
                } else {
                  var chatId = {peopleChat: ["nobody"]}
                }
                if(!chatId.peopleChat.includes(vm.user.email.split('@')[0])) {
                  chatId.peopleChat.push(vm.user.email.split('@')[0]);
                  refDocRecep.set(chatId);
                }
              });
            });
          }
        });
      });
      
    },

    uploadFile(file) {
      const vm = this;
      var storageRef = fireStorage.ref();
      // Upload file and metadata to the object 'images/mountains.jpg'
      
      
      var resultAudioName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);;
      var audioName = vm.user.displayName.split(' ')[0] + resultAudioName + '.mp3'
      var uploadTask = storageRef.child('chat/' + audioName).put(file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          // // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // // console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // // // console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // // // console.log('Upload is running');
              break;
          }
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            vm.sendMessageVoice({ audioUrl: downloadURL, time: vm.timer.ss,  name: audioName});
          });
        }
      );
    }
  },
  created() {
    this.detailUserStore(this.$route.params.idReceptor);
  },
  mounted() {
    this.checkAuthUser();
    this.getChat();
    this.getChatToRead()
    window.scroll(0, window.innerHeight + 200);
    
  }, 
  watch: {
    getUser () {
      if(this.getUser.displayName) {
        this.$root.$emit(
          "textToSpeechRouter",
          "Página de conversa com" +
            this.getUser.displayName +
            ".\n Pressione a tela até vibrar para poder falar.\n Para parar a gravação pressione a tela novamente."
        );
      }
    }
  }
};
</script>

<style lang="sass">
// .voice
//   width: 50vw
//   // padding: 0
</style>
