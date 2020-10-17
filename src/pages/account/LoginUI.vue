<template>
  <q-page v-touch-swipe.mouse.right="accountSwipe" class="flex flex-center">
    <!-- content -->
    <div id="firebaseui-auth-container" class="row q-gutter-y-lg q-pa-md"></div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex"
import firebase from "firebase"
import * as firebaseui from "firebaseui"
import "firebaseui/dist/firebaseui.css"
export default {
  name: "LoginFormsComponent",
  data() {
    return {
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
      "facebookSignIn",
    ]),

    SignInUI() {
      var ui = new firebaseui.auth.AuthUI(firebase.auth())
      ui.start("#firebaseui-auth-container", {
        signInOptions: [
          {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: ["https://www.googleapis.com/auth/contacts.readonly"],
            customParameters: {
              // Forces account selection even when one account
              // is available.
              prompt: "select_account",
            },
          },
          {
            provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            scopes: ["public_profile", "email", "user_likes", "user_friends"],
            customParameters: {
              // Forces password re-entry.
              auth_type: "reauthenticate",
            },
          },
          firebase.auth.TwitterAuthProvider.PROVIDER_ID, // Twitter does not support scopes.
          firebase.auth.EmailAuthProvider.PROVIDER_ID, // Other providers don't need to be given as object.
        ],
      })
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
    accountSwipe(val) {
      // if (val.direction === "left") {
      //   this.$router.push("/account/create")
      // }

      if (val.direction === "right") {
        this.$router.push("/")
      }
      if (val.direction === "up") {
        this.$router.push("/")
      }
    },
  },

  mounted() {
    this.SignInUI()
    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit(
        "textToSpeechRouter",
        "Página de login. Pode se autenticar com conta google, facebook ou por email"
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