<template>
  <q-item
    @click="listenClick(chat.email, userDTL.displayName)"
    clickable
    v-ripple
  >
    <q-item-section avatar>
      <q-avatar size="60px">
        <q-img
          :src="userDTL.photoURL"
          alt
        />
      </q-avatar>
    </q-item-section>
    <q-item-section v-if="chat.sender == user.email">
      <div :class="getFont.title">{{ userDTL.displayName }}</div>
      <div
        v-if="chat.message"
        :class="getFont.text"
      >Eu: {{ chat.message.slice(0, 20) }}...</div>
      <div
        v-else
        :class="getFont.text"
      >Eu: Mensagem de voz</div>
    </q-item-section>
    <q-item-section v-else>
      <div :class="getFont.title">{{ userDTL.displayName }}</div>
      <div
        v-if="chat.message"
        :class="getFont.text"
      >{{ chat.message.slice(0, 20) }}...</div>
      <div
        v-else
        :class="getFont.text"
      >Mensagem de voz</div>
    </q-item-section>
  </q-item>
</template>

<script>
import { firestoreDB } from "boot/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: ["chat"],
  data () {
    return {
      userDTL: {
        displayName: "",
        email: "",
        photoURL: "",
        phoneNumber: "",
        address: "",
        profession: "",
        education: "",
        profileType: "",
        description: "",
        date: ""
      },
      touchNums: 0,
    }
  },

  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("auth", ["user", "userData"]),
    ...mapGetters("settings", ["getFont"])
  },

  methods: {
    // ...mapActions("user", ["detailUser"]),

    detailUser (id) {
      // Details of a user
      const ref = firestoreDB.collection("users").doc(id);
      let data = {};
      ref.get().then(doc => {
        if (doc.exists) {
          this.userDTL = {
            id: doc.id,
            displayName: doc.data().displayName,
            email: doc.data().email,
            photoURL: doc.data().photoURL,
            phoneNumber: doc.data().phoneNumber,
            address: doc.data().address,
            profession: doc.data().profession,
            education: doc.data().education,
            profileType: doc.data().profileType,
            description: doc.data().description,
            date: doc.data().date
          };
        } else {
          // If user desen't exist
          data = {
            id: null,
            displayName: "",
            email: "",
            photoURL: "",
            phoneNumber: "",
            address: "",
            profession: "",
            education: "",
            profileType: "",
            description: "",
            date: ""
          };
        }
      });
    },

    listenClick (email, name) {
      if (this.vibrateState) {
        if (window.hasOwnProperty("cordova")) {
          navigator.vibrate(200);
        } else {
          window.navigator.vibrate(200);
        }
        var vm = this;
        this.$root.$emit("textToSpeechRouter", name)

        this.touchNums += 1;

        if (this.touchNums >= 2) {
          this.touchNums = -80;
          this.$router.push('/chat/' + email)
        }

        setTimeout(() => {
          vm.touchNums = 0;
        }, 2000);
      } else {
        this.$router.push('/chat/' + email)
      }
    }
  },

  mounted () {
    this.detailUser(this.chat.email);
  },
}
</script>