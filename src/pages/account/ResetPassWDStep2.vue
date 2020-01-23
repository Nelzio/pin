<template>
  <q-page v-touch-swipe.mouse.right.left.down="accountSwipe">
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
            :color="darkModeConf.color"
            @keyup.enter="login_account"
            dense
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

          <q-input
            rounded
            outlined
            :color="darkModeConf.color"
            @keyup.enter="login_account"
            dense
            placeholder="Confirmar senha"
            ref="password"
            v-model="authObject.password2"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[ val => val && val.length > 0 && val == authObject.password || 'Senha diferente']"
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
              label="Enviar"
              type="login"
              :color="darkModeConf.color"
              :class="darkModeConf.textBtn"
              class="full-width"
              @click="$emit('tab', 'login')"
            />
          </div>
        </q-form>
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

      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.$emit("loginUser", this.authObject);
      }
    },
    accountSwipe (val) {
        if (val.direction === 'right') {
          this.$router.push('/account')
        }

        // if (val.direction === 'left') {
        //   this.$router.push('/account/reset')
        // }

        if (val.direction === 'down') {
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
