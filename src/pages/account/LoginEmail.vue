<template>
  <q-page v-touch-swipe.mouse.left.right="accountSwipe">
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
          @submit.prevent="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
          role="form"
          lang="pt-PT"
          aria-label="Formulário de login"
        >
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            ref="email"
            type="email"
            v-model="authObject.email"
            label="Email do usuário"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0 && isEmailValid(val)) ||
                'Introduza o seu número de telefone',
            ]"
          />

          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            ref="password"
            label="Senha"
            v-model="authObject.password"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Introduza a sua senha',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :color="darkModeConf.iconVar"
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
              @click.prevent="onSubmit()"
              type="submit"
              :color="darkModeConf.iconVar"
              class="full-width"
              :class="darkModeConf.textBtn"
              role="button"
            />
          </div>

          <div>
            <q-btn
              rounded
              outline
              label="Recuperar senha"
              to="/account/resetpwd"
              role="button"
            />
          </div>
          <div>
            <q-btn
              class="full-width animated infinite bounce"
              rounded
              :color="darkModeConf.iconVar"
              outline
              label="Criar conta com email"
              icon-right="arrow_forward"
              to="/account/create"
              role="button"
            />
          </div>
        </q-form>
      </div>
    </div>

    <!-- <div class="row justify-center">
      <div class="col-12 q-pa-lg">
        <q-btn
          class="animated infinite bounce"
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
import { mapState, mapActions, mapGetters } from "vuex"
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
    ...mapActions("auth", ["loginUser"]),

    isEmailValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // return re.test(String(email).toLowerCase())
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
      if (val.direction === "right") {
        this.$router.go(-1)
      }

      if (val.direction === "left") {
        this.$router.push("/account/create")
      }
      // if (val.direction === "up") {
      //   this.$router.push("/");
      // }
    },
  },

  mounted() {
    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit("textToSpeechRouter", "Entrar com email")
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