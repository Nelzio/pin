<template>
  <q-page v-touch-swipe.mouse.right.left="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon
          :color="darkModeConf.iconVar"
          size="100px"
          name="account_circle"
        />
      </div>
      <div class="q-pa-lg col-md-4 col-12">
        <q-form
          ref="loginForm"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          role="form"
          lang="pt-PT"
          aria-label="Formulário de recuperação de senha."
        >
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            dense
            ref="email"
            v-model="email"
            label="Email do usuário"
            type="email"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0 && isEmailValid(val)) ||
                'Introduza o seu email',
            ]"
          />

          <div>
            <q-btn
              rounded
              label="Enviar"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
              type="submit"
            />
          </div>
        </q-form>
      </div>
    </div>

    <div>
      <q-dialog
        v-model="doneDialog"
        role="dialog"
        lang="pt-PT"
        aria-label="Confirmação de alteração de senha."
      >
        <q-card style="width: 90vw">
          <q-card-section>
            <div :class="getFont.title">Alterar senha</div>
          </q-card-section>
          <q-card-section :class="getFont.text">{{ message }}</q-card-section>
          <q-card-actions align="right">
            <q-btn
              v-if="error"
              rounded
              label="Ok"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              @click="closeDialog()"
              role="button"
            />
            <q-btn
              v-else
              rounded
              label="Ok"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              @click="$router.push('/')"
              role="button"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { Loading } from "quasar"
import { firebaseAuth } from "../../boot/firebase"
export default {
  name: "LoginFormsComponent",
  data() {
    return {
      authObject: {
        name: "",
        email: "",
        password: "",
      },
      email: "",
      isPwd: true,
      message: "",
      error: false,
      doneDialog: false,
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("settings", ["getMode", "getFont", "getVibrate"]),
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),

    isEmailValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email))
    },

    closeDialog() {
      this.error = false
      this.doneDialog = false
    },

    sendEmaiPassReset() {
      Loading.show()
      let vm = this
      var auth = firebaseAuth

      auth
        .sendPasswordResetEmail(this.email)
        .then(function () {
          // Email sent.
          // console.log("email enviado");
          Loading.hide()
          vm.message = "Verifique a sua caixa de email!"
          vm.doneDialog = true
        })
        .catch(function (error) {
          // An error happened.

          vm.message = "Email incorrecto"
          Loading.hide()
          vm.error = true
          vm.doneDialog = true
          console.log(error)
        })
    },

    onReset() {
      alert("must reset form.")
    },
    onSubmit() {
      this.$refs.email.validate()

      if (!this.$refs.email.hasError) {
        this.sendEmaiPassReset()
      }
    },
    accountSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/account/create")
      }

      if (val.direction === "right") {
        this.$router.push("/")
      }
      // if (val.direction === "down") {
      //   this.$router.push("/");
      // }
    },
  },

  mounted() {
    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit("textToSpeechRouter", "Editar senha do usuário")
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