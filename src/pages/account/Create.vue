<template>
  <q-page padding v-touch-swipe.mouse.right.left.up="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon size="100px" name="person_add" />
      </div>
      <!-- <div class="col-12">
          Entrar ou se Inscrever
      </div>-->
      <div class="q-pa-lg col-md-4 col-12">
        <q-form ref="loginForm" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            rounded
            outlined
            dense
            :color="darkModeConf.color"
            v-model="authObject.name"
            ref="name"
            label="Nome completo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, indique o su nome']"
          />
          <q-input
            rounded
            outlined
            dense
            :color="darkModeConf.color"
            ref="number"
            v-model="authObject.number"
            label="Numero de telefone"
            mask="#########"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
          />

          <q-input
            rounded
            outlined
            dense
            :color="darkModeConf.color"
            ref="email"
            v-model="authObject.email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
          />

          <q-input
            rounded
            outlined
            @keyup.enter="login_account"
            dense
            :color="darkModeConf.color"
            placeholder="password"
            ref="password"
            v-model="authObject.password"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, insira uma senha válida']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="q-gutter-y-md">
            <q-btn
              rounded
              label="Registar"
              type="submit"
              :color="darkModeConf.color"
              :class="darkModeConf.textBtn"
              class="full-width" />
            
          </div>
        </q-form>
      </div>
    </div>

    <div class="row justify-center">
      <div class="col-12 q-pa-lg">
         <q-btn
           class="full-width"
           rounded
           outline
           label="Entrar na conta"
           icon="arrow_back"
           to="/account" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex"
export default {
  name: "RegisterFormComponent",
  data() {
    return {
      authObject: {
        name: "",
        number: null,
        email: "",
        password: ""
      },
      isPwd: true
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),

    isEmailValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    onReset() {
      alert("must reset form.");
    },
    onSubmit() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      console.log("Ola")
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        // this.$emit("registerUser", {email: this.authObject.email, password: this.authObject.password});
        this.registerUser({email: this.authObject.email, password: this.authObject.password})
      }
      // this.$emit("registerUser", {email: this.authObject.email, password: this.authObject.password})
    },
    accountSwipe (val) {
        if (val.direction === 'right') {
          this.$router.push('/account')
        }

        // if (val.direction === 'left') {
        //   this.$router.push('/account/reset')
        // }

        if (val.direction === 'up') {
          this.$router.push('/')
        }
      }
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
