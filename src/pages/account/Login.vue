<template>
  <q-page v-touch-swipe.mouse.right.up="accountSwipe" class="flex flex-center">
    <!-- content -->
    <!-- <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon size="100px" name="account_circle" />
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
              <q-icon
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

         <q-btn color="white" text-color="black" label="Standard" @click="googleSingIn()" />
        
      </div>
    </div> -->

    <div class="row q-gutter-y-lg q-pa-md">
        <q-btn
          align="between"
          rounded
          size="lg"
          class="full-width btn-fixed-width"
          label="Entrar com google"
          icon="img:https://imagepng.org/wp-content/uploads/2019/08/google-icon-1.png"
          @click="googleSingIn()" />
        <q-btn
          align="between"
          rounded
          size="lg"
          class="full-width btn-fixed-width"
          left-icon
          @click="facebookSingIn()">
          <q-icon color="blue" name="ion-logo-facebook" />
          <div>Entrar com facebook</div>
          </q-btn>
          
        <q-btn
          align="between"
          rounded
          size="lg"
          class="full-width btn-fixed-width"
          label="Entrar com email"
          icon="email"
          to="/account/login" />

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
    </div> -->
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex"
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
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser", "googleSingIn", "facebookSingIn"]),

    isPasswordValid(email) {
      var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
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
    }
  },

  mounted () {
    this.$root.$emit("textToSpeechRouter", "Pagina de login. Pode se autenticar com conta google, facebook ou por email")
  },

  filters: {
    captalizeFirstLetter(val) {
      return val.charAt(0).toUpperCase() + "" + val.slice(1)
    }
  }
}
</script>

<style lang="sass">
</style>