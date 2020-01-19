<template>
  <q-page v-touch-swipe.mouse.right.left.down="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <div class="col-12 text-center">
        <q-icon color="primary" size="100px" name="edit" />
      </div>
      <!-- <div class="col-12">
          Entrar ou se Inscrever
      </div>-->
      <div class="q-pa-lg col-md-4 col-12">
        <q-form ref="loginForm" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input rounded outlined v-model="userEdit.telephone" label="Telefone" icon="phone" />
              <q-input rounded outlined v-model="userEdit.adress" label="Endereço" icon="place" />
              <q-input rounded outlined v-model="userEdit.profission" label="Profissão" />
              <q-input rounded outlined v-model="userEdit.education" label="Ensino Primario" />
          <div class="q-gutter-y-md">
            <q-btn rounded label="Enviar" type="login" color="primary" class="full-width" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
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
        telephone: "",
        adress: "",
        profission: "",
        education: "",
      },
      isPwd: true
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters('auth', [
        'user', 'userData'])
  },

  methods: {
    ...mapActions("auth", ["editUser", "detailUser"]),

    getUser () {
      // first get user
      this.detailUser(this.user.email)
      if(this.userData) {
        this.userEdit.telephone = this.userData.telephone
        this.userEdit.adress = this.userData.adress
        this.userEdit.profission = this.userData.profission
        this.userEdit.education = this.userData.education
      }
    },

    isEmailValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    onReset() {
      alert("must reset form.");
    },
    onSubmit() {
      this.editUser({id: this.user.email, data: this.userEdit})
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

  mounted () {
    this.getUser()
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
