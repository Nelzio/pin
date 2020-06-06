<template>
  <q-page v-touch-swipe.mouse.left.right="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon :color="darkModeConf.iconVar" size="100px" name="account_circle" />
      </div>
      <div class="q-pa-lg col-md-4 col-12">
        <q-form ref="loginForm" @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
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
            :color="darkModeConf.iconVar"
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
              @click.prevent="onSubmit()"
              type="submit"
              :color="darkModeConf.iconVar"
              class="full-width"
              :class="darkModeConf.textBtn"
            />
          </div>

          <div>
            <q-btn rounded outline label="Recuperar senha" to="/account/resetpwd" />
          </div>
          <div>
            <q-btn
              class="full-width animated infinite bounce"
              rounded
              :color="darkModeConf.iconVar"
              outline
              label="Criar conta"
              icon-right="arrow_forward"
              to="/account/create"
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
import { mapState, mapActions } from "vuex";
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
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    ...mapActions("auth", ["loginUser"]),

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

    accountSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1)
      }

      if (val.direction === "left") {
        this.$router.push("/account/create");
      }
      // if (val.direction === "up") {
      //   this.$router.push("/");
      // }
    }
  },

  mounted() {
    this.$root.$emit("textToSpeechRouter", "Entrar com email");
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