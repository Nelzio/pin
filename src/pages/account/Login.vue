<template>
  <q-page
    v-touch-swipe.mouse.right="accountSwipe"
    v-touch-hold:600.mouse="handleHold"
    class="flex flex-center"
  >
    <!-- content -->
    <!-- <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon :color="darkModeConf.iconVar" size="100px" name="account_circle" />
      </div>
      <div class="q-pa-lg col-md-4 col-12">
        <q-form ref="loginForm" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            rounded
            outlined
            dense
            :color="darkModeConf.color"
            ref="email"
            v-model="authObject.email"
            label="Email do usuario"
            placeholder="Email do usuario"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
          />

          <q-input
            rounded
            outlined
            @keyup.enter="login_account"
            dense
            :color="darkModeConf.color"
            ref="password"
            label="Senha"
            placeholder="Senha"
            v-model="authObject.password"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza a sua senha']"
          >
            <template v-slot:append>
              <q-icon :color="darkModeConf.iconVar"
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div>
            <q-btn
              rounded
              label="Entrar"
              type="submit"
              :color="darkModeConf.color"
              class="full-width"
              :class="darkModeConf.textBtn" />
          </div>

					<div>
						<q-btn
							color="grey"
							rounded
							outline
							label="Recuperar senha"
							to="/account/resetpwd"
						/>
					</div>
        </q-form>

         <q-btn color="white" text-color="black" label="Standard" @click="googleSignIn()" />
        
      </div>
    </div>-->

    <div class="row q-gutter-y-lg q-pa-md">
      <q-btn
        align="between"
        rounded
        size="lg"
        class="full-width btn-fixed-width"
        label="Google"
        icon="img:https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png"
        @click="login('google')"
      />
      <q-btn
        align="between"
        rounded
        size="lg"
        class="full-width btn-fixed-width"
        left-icon
        @click="login('facebook')"
      >
        <q-icon color="blue" name="ion-logo-facebook" />
        <div>Facebook</div>
      </q-btn>

      <q-btn
        align="between"
        rounded
        size="lg"
        class="full-width btn-fixed-width"
        label="Email"
        icon="email"
        to="/account/login"
      />
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
import { Loading } from "quasar";
import { mapState, mapActions } from "vuex";
import {
  firebaseAuth,
  firestoreDb,
  fireStorage,
  firebase
} from "../../boot/firebase";
export default {
  name: "LoginFormsComponent",
  data() {
    return {
      authObject: {
        name: "",
        email: "",
        password: ""
      },
      isPwd: true
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"])
  },
  methods: {
    ...mapActions("auth", [
      "loginUser",
      "registerUser",
      "googleSignIn",
      "googleSignInCordova",
      "facebookSignIn",
      "facebookSignInCordova"
    ]),

    loginTest() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      firebase.auth().languageCode = "pt";
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },

    login(method) {
      if (window.hasOwnProperty("cordova")) {
        if (method == "google") {
          this.googleSignInCordova();
        } else if (method == "facebook") {
          this.facebookSignInCordova();
        }
      } else {
        if (method == "google") {
          this.googleSignIn();
        } else if (method == "facebook") {
          this.facebookSignIn();
        }
      }
    },

    isPasswordValid(email) {
      var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    onReset() {
      alert("must reset form.");
    },
    onSubmit() {
      this.$refs.email.validate();
      this.$refs.password.validate();

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.loginUser(this.authObject);
      }
    },

    handleHold({ evt, ...info }) {
      if (this.vibrateState) {
        if (window.hasOwnProperty("cordova")) {
          navigator.vibrate(200);
        } else {
          window.navigator.vibrate(200);
        }
        this.login("google");
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
        this.$router.go(-1);
      }
      // if (val.direction === "up") {
      //   this.$router.push("/");
      // }
    }
  },

  mounted() {
    Loading.hide();
    this.$root.$emit(
      "textToSpeechRouter",
      "Página de login. Pode se autenticar com conta Google, Facebook ou por email.\n Pressione a tela para entrar com a conta Google."
    );
  },

  filters: {
    captalizeFirstLetter(val) {
      return val.charAt(0).toUpperCase() + "" + val.slice(1);
    }
  }
};
</script>

<style lang="sass">
</style>