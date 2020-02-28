<template>
  <q-page v-touch-swipe.mouse.right.left="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon :color="darkModeConf.iconVar" size="100px" name="edit" />
      </div>
      <!-- <div class="col-12">
          Entrar ou se Inscrever
      </div>-->
      <div class="q-pa-lg col-md-8 col-12">
        <q-form
          ref="loginForm"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-gutter-md"
        >
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="userEdit.phoneNumber"
            label="Telefone"
            icon="phone"
            placeholeder="800000000"
            mask="#########"
            lazy-rules
            :rules="[ val => val && val.length > 0 && val.length == 9 || 'Introduza o seu numero de telefone']"
          />
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="userEdit.adress"
            label="Endereço"
            icon="place"
            placeholeder="Cidade de xai-xai, bairro exemplo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu bairro']"
          />
          <q-input
            :color="darkModeConf.iconVar"
            rounded
            outlined
            v-model="userEdit.date"
            mask="##/##/####"
            :rules="[ val => val && val.length > 0 || 'Introduza a sua data de nascimento']"
          >
            <template v-slot:append>
              <q-icon :color="darkModeConf.iconVar" name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    :color="darkModeConf.iconVar"
                    v-model="userEdit.date"
                    @input="() => $refs.qDateProxy.hide()"
                    mask="DD/MM/YYYY"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="userEdit.profission"
            label="Profissão"
            placeholeder="Canalizador"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza a sua profissão']"
          />
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="userEdit.education"
            label="Educação"
            placeholeder="Licenciatura em Gestão, curso de informática"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza a sua formação']"
          />
          <div class="q-gutter-y-md">
            <q-btn
              rounded
              label="Enviar"
              type="login"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "RegisterFormComponent",
  data() {
    return {
      tab: "contact",
      authObject: {
        name: "",
        email: "",
        password: ""
      },
      userEdit: {
        phoneNumber: "",
        adress: "",
        profission: "",
        education: "",
        date: "01/01/2000"
      },
      isPwd: true
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("auth", ["user", "userData"])
  },

  methods: {
    ...mapActions("auth", ["editUser", "detailUser"]),

    getUser() {
      // first get user
      this.detailUser(this.user.email).then(() => {
        this.userEdit.phoneNumber = this.userData.phoneNumber;
        this.userEdit.adress = this.userData.adress;
        this.userEdit.profission = this.userData.profission;
        this.userEdit.education = this.userData.education;
        this.userEdit.date = this.userData.date;
      });
    },

    isEmailValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    onReset() {
      this.userEdit.phoneNumber = null;
      this.userEdit.adress = null;
      this.userEdit.profission = null;
      this.userEdit.education = null;

      this.$refs.loginForm.resetValidation();
    },
    onSubmit() {
      this.$refs.loginForm.validate();
      if (this.$refs.loginForm.hasError) {
        this.formHasError = true;
      } else {
        this.userEdit.displayName = this.user.displayName;
        this.userEdit.email = this.user.email;
        this.userEdit.photoURL = this.user.photoURL;
        this.editUser({ id: this.user.email, data: this.userEdit });
      }
    },
    accountSwipe(val) {
      if (val.direction === "right") {
        this.$router.push("/account");
      }

      // if (val.direction === 'left') {
      //   this.$router.push('/account/reset')
      // }

      if (val.direction === "down") {
        this.$router.push("/");
      }
    }
  },

  mounted() {
    this.getUser();
    this.$root.$emit("textToSpeechRouter", "Editar perfil");
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
