<template>
  <q-page v-touch-swipe.mouse.right.left="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon size="100px" name="account_circle" />
      </div>
      <div class="q-pa-lg col-md-4 col-12">
        <q-form ref="loginForm" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            rounded
            outlined
            :color="darkModeConf.color"
            dense
            ref="email"
            v-model="email"
            label="Email do usuário"
            placeholder="exemplo@dominio.com"
            lazy-rules
            :rules="[ val => val && val.length > 0 && isPasswordValid || 'Introduza o seu email']"
          />

          <div>
            <q-btn
              rounded
              label="Enviar"
              :color="darkModeConf.color"
              :class="darkModeConf.textBtn"
              class="full-width"
              type="submit"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { firebaseAuth } from "../../boot/firebase";
export default {
  name: "LoginFormsComponent",
  data() {
    return {
      authObject: {
        name: "",
        email: "",
        password: ""
      },
      email: "",
      isPwd: true
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),

    isPasswordValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    sendEmaiPassReset() {
      var auth = firebaseAuth;

      auth
        .sendPasswordResetEmail(this.email)
        .then(function() {
          // Email sent.
          console.log("email enviado");
        })
        .catch(function(error) {
          // An error happened.
          console.log("Erro");
          console.log(error);
        });
    },

    onReset() {
      alert("must reset form.");
    },
    onSubmit() {
      this.$refs.email.validate();

      if (!this.$refs.email.hasError) {
        this.sendEmaiPassReset();
      }
    },
    accountSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/account/create");
      }

      if (val.direction === "right") {
        this.$router.push("/");
      }
      if (val.direction === "down") {
        this.$router.push("/");
      }
    }
  },

  mounted() {
    this.$root.$emit("textToSpeechRouter", "Editar senha do usuário");
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