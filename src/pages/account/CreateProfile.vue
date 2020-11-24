<template>
  <q-page
    v-touch-swipe.mouse.right="accountSwipe"
    class="flex flex-center"
    lang="pt-PT"
    aria-label="Página de autenticação"
  >
    <!-- content -->

    <div
      class="row q-gutter-y-lg q-pa-md"
      lang="pt-PT"
      aria-label="Escolher método de autenticação"
    >
      <div v-if="profileType == 'person'" class="text-center col-12">
        <q-icon
          name="account_circle"
          :color="darkModeConf.iconVar"
          size="150px"
        />
        <div class="text-h5">Criar conta normal</div>
      </div>
      <div v-else class="text-center col-12">
        <q-icon name="business" :color="darkModeConf.iconVar" size="150px" />
        <div class="text-h5">Criar conta empresarial</div>
      </div>
      <q-btn
        align="between"
        rounded
        size="lg"
        class="full-width btn-fixed-width"
        label="Google"
        icon="img:https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png"
        @click="login('google')"
        role="button"
        lang="pt-PT"
        aria-label="Entrar com conta Google"
      />
      <q-btn
        align="between"
        rounded
        size="lg"
        class="full-width btn-fixed-width"
        left-icon
        @click="login('facebook')"
        role="button"
        lang="pt-PT"
        aria-label="Entrar com conta Facebook"
      >
        <q-icon color="blue" name="ion-logo-facebook" />
        <div>Facebook</div>
      </q-btn>

      <q-btn
        align="between"
        rounded
        size="lg"
        class="full-width btn-fixed-width"
        to="/account/create"
        role="button"
        lang="pt-PT"
        aria-label="Entrar com Email"
      >
        <q-icon :color="darkModeConf.iconVar" name="email" />
        <div>Email</div>
      </q-btn>
    </div>
    <!-- <div class="row justify-center">
      <div class="col-12 q-pa-lg">
        <q-btn
          class="full-width animated infinite bounce"
          rounded
          outline
          label="Criar conta"
          icon-right="arrow_forward"
					to="/account/create"
        />
      </div>
    </div>-->
  </q-page>
</template>

<script>
import { Loading, LocalStorage } from "quasar"
import { mapState, mapActions, mapGetters } from "vuex"
import {
  firebaseAuth,
  firestoreDB,
  fireStorage,
  firebase,
} from "../../boot/firebase"
export default {
  name: "LoginFormsComponent",
  data() {
    return {
      profileType: "",
      authObject: {
        name: "",
        email: "",
        password: "",
      },
      isPwd: true,
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("settings", ["getVibrate"]),
  },
  methods: {
    ...mapActions("auth", [
      "loginUser",
      "registerUser",
      "googleSignIn",
      "googleSignInCordova",
      "facebookSignIn",
      "facebookSignInCordova",
    ]),

    loginTest() {
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly")
      firebase.auth().languageCode = "pt"
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken
          // The signed-in user info.
          var user = result.user
          // ...
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          // ...
        })
    },

    login(method) {
      if (window.hasOwnProperty("cordova")) {
        if (method == "google") {
          this.googleSignInCordova()
        } else if (method == "facebook") {
          this.facebookSignInCordova()
        }
      } else {
        if (method == "google") {
          this.googleSignIn()
        } else if (method == "facebook") {
          this.facebookSignIn()
        }
      }
    },

    isPasswordValid(email) {
      var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email))
    },

    onReset() {
      alert("must reset form.")
    },
    onSubmit() {
      this.$refs.email.validate()
      this.$refs.password.validate()

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.loginUser(this.authObject)
      }
    },

    handleHold({ evt, ...info }) {
      if (this.vibrateState) {
        if (window.hasOwnProperty("cordova")) {
          navigator.vibrate(200)
        } else {
          window.navigator.vibrate(200)
        }
        this.login("google")
      }
    },

    accountSwipe(val) {
      // if (val.direction === "left") {
      //   this.$router.push("/account/create")
      // }

      // if (val.direction === "right") {
      //   this.$router.push("/");
      // }
      if (val.direction === "right") {
        this.$router.go(-1)
      }
      // if (val.direction === "up") {
      //   this.$router.push("/");
      // }
    },
  },

  mounted() {
    this.profileType = LocalStorage.getItem("profileType")
    Loading.hide()
    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit(
        "textToSpeechRouter",
        "Página de login. Pode se autenticar com conta Google, Facebook ou por email."
      )
  },

  filters: {
    captalizeFirstLetter(val) {
      return val.charAt(0).toUpperCase() + "" + val.slice(1)
    },
  },
}
</script>

<style lang="sass">
</style>