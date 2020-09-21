<template>
  <q-page
    padding
    v-touch-swipe.mouse.right.left="accountSwipe"
  >
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <!-- <div class="col-12">
          Entrar ou se Inscrever
      </div>-->
      <div class="q-pa-sm col-md-4 col-12">
        <div class="col-12 text-center q-mb-xl">
          <q-btn
            v-if="!imageUrl"
            round
            size="40px"
            @click="processFile()"
            role="button"
            lang="pt-PT"
            aria-label="carregar foto de perfil"
          >
            <q-icon
              :color="darkModeConf.iconVar"
              name="person_add"
            />
            <q-badge
              floating
              :color="darkModeConf.iconVar"
            >
              <q-icon
                color="white"
                name="insert_photo"
              />
            </q-badge>
          </q-btn>
          <q-btn
            v-else
            round
            @click="processFile()"
            role="button"
            lang="pt-PT"
            aria-label="carregar outra foto de perfil"
          >
            <q-avatar size="120px">
              <q-img
                :src="imageUrl"
                role="img"
              />
            </q-avatar>
            <q-badge
              floating
              :color="darkModeConf.iconVar"
            >
              <q-icon
                color="white"
                name="insert_photo"
              />
            </q-badge>
          </q-btn>
        </div>

        <q-form
          ref="loginForm"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-y-md"
          role="form"
          lang="pt-PT"
          aria-label="Formulário de criação de conta"
        >
          <input
            id="fileInput"
            type="file"
            hidden
            ref="fileImg"
            accept="image/*"
            @change="onChangeImg"
          />
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="authObject.displayName"
            ref="name"
            type="text"
            label="Nome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, introduza o nome da instituição ou pessoa']"
          />
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            ref="number"
            type="number"
            v-model="authObject.phoneNumber"
            label="Numero de telefone"
            mask="#########"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
          />

          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            ref="email"
            type="email"
            v-model="authObject.email"
            label="Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu numero de telefone']"
          />

          <!-- <q-input
            :color="darkModeConf.iconVar"
            rounded
            outlined
            v-model="authObject.date"
            label="Data de nascimento"
            mask="##/##/####"
            :rules="[ val => val && val.length > 0 || 'Introduza a sua data de nascimento']"
          >
            <template v-slot:append>
              <q-icon :color="darkModeConf.iconVar" name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    :color="darkModeConf.iconVar"
                    v-model="authObject.date"
                    @input="() => $refs.qDateProxy.hide()"
                    mask="DD/MM/YYYY"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> -->

          <q-input
            rounded
            outlined
            @keyup.enter="login_account"
            :color="darkModeConf.iconVar"
            placeholder="password"
            ref="password"
            v-model="authObject.password"
            label="password"
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, insira uma senha válida']"
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
          <div class="q-gutter-y-md">
            <q-btn
              rounded
              label="Registar"
              type="submit"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
            />
          </div>
          <div>
            <q-btn
              class="full-width"
              :color="darkModeConf.iconVar"
              rounded
              outline
              label="Entrar na conta existente"
              icon="arrow_back"
              to="/account/login"
              role="button"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "RegisterFormComponent",
  data () {
    return {
      authObject: {
        displayName: "",
        phoneNumber: "",
        email: "",
        password: "",
        img: "",
        address: "",
        profession: "",
        education: "",
        date: ""
      },
      imageUrl: "",
      isPwd: true
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    ...mapActions("auth", ["loginUser", "registerUser"]),

    isEmailValid (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    onReset () {
      alert("must reset form.");
    },
    onSubmit () {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        // this.$emit("registerUser", {email: this.authObject.email, password: this.authObject.password});
        this.registerUser(this.authObject);
      }
      // this.$emit("registerUser", {email: this.authObject.email, password: this.authObject.password})
    },
    accountSwipe (val) {
      if (val.direction === "right") {
        this.$router.go(-1);
      }

      // if (val.direction === "up") {
      //   this.$router.push("/");
      // }
    },

    processFile () {
      this.$refs.fileImg.click();
    },
    onChangeImg (event) {
      const files = event.target.files;
      let filename = files[0].name;
      let file = files[0];
      if (!(file && file["type"].split("/")[0] === "image")) {
        return (this.errorFileDialog = true);
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.authObject.img = files[0];
    }
  },

  mounted () {
    this.$root.$emit("textToSpeechRouter", "Criar conta");
  },

  filters: {
    captalizeFirstLetter (val) {
      return val.charAt(0).toUpperCase() + "" + val.slice(1);
    }
  }
};
</script>

<style lang="sass">
</style>
