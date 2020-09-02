<template>
  <q-page v-touch-swipe.mouse.right.left="accountSwipe">
    <!-- content -->
    <div class="row login justify-center q-gutter-y-lg">
      <!-- <div class="col-12">
          Entrar ou se Inscrever
      </div>-->
      <div class="q-pa-md col-md-8 col-12">
        <div class="col-12 text-center q-mb-xl">
          <q-btn
            v-if="!imageUrl"
            round
            size="40px"
            @click="processFile()"
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
          >
            <q-avatar size="120px">
              <q-img :src="imageUrl" />
            </q-avatar>
            <q-badge
              floating
              :color="darkModeConf.iconVar"
            >
              <q-icon
                :class="darkModeConf.textBtn"
                name="edit"
              />
            </q-badge>
          </q-btn>
        </div>
        <q-form
          v-if="this.profileType == 'person' || userEdit.profileType == 'person'"
          ref="loginForm"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-gutter-md"
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
            v-model="userEdit.displayName"
            ref="name"
            label="Nome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, introduza o nome da instituição ou pessoa']"
          />
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
            v-model="userEdit.address"
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
              <q-icon
                :color="darkModeConf.iconVar"
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
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
            v-model="userEdit.profession"
            label="Profissão"
            placeholeder="Canalizador"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza a sua profissão']"
          />
          <!-- <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="userEdit.education"
            label="Educação"
            placeholeder="Licenciatura em Gestão, curso de informática"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza a sua formação']"
          /> -->
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
        <q-form
          v-else
          ref="loginForm"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-gutter-md"
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
            v-model="userEdit.displayName"
            ref="name"
            label="Nome"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor, introduza o nome da instituição ou pessoa']"
          />
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
            v-model="userEdit.address"
            label="Endereço"
            icon="place"
            placeholeder="Cidade de xai-xai, bairro exemplo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza o seu bairro']"
          />
          <div>Descreva a sua instituição.</div>
          <q-editor
            :color="darkModeConf.iconVar"
            v-model="userEdit.description"
            min-height="8rem"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza uma descrição da instituição']"
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
import { LocalStorage, Loading } from 'quasar'
export default {
  name: "RegisterFormComponent",
  data () {
    return {
      tab: "contact",
      userEdit: {
        displayName: "",
        phoneNumber: "",
        address: "",
        profession: "",
        education: "",
        description: "",
        date: "01/01/2000"
      },
      authObject: {
        displayName: "",
        phoneNumber: "",
        email: "",
        img: "",
        address: "",
        profession: "",
        education: "",
        date: ""
      },
      imageUrl: "",
      imageProfile: null,
      profileType: "",
      isPwd: true
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("auth", ["user", "userData"])
  },

  methods: {
    ...mapActions("auth", ["editUser", "detailUser"]),

    getUser () {
      // first get user
      this.detailUser(this.user.email).then(() => {
        this.userEdit.displayName = this.userData.displayName;
        this.userEdit.phoneNumber = this.userData.phoneNumber;
        this.userEdit.address = this.userData.address;
        this.userEdit.profession = this.userData.profession;
        this.userEdit.education = this.userData.education;
        this.userEdit.profileType = this.userData.profileType;
        this.userEdit.description = this.userData.description;
        this.userEdit.date = this.userData.date;
      });
    },

    isEmailValid (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    onReset () {
      this.userEdit.phoneNumber = null;
      this.userEdit.address = null;
      this.userEdit.profession = null;
      this.userEdit.education = null;

      this.$refs.loginForm.resetValidation();
    },
    onSubmit () {
      this.$refs.loginForm.validate();
      if (this.$refs.loginForm.hasError) {
        this.formHasError = true;
      } else {
        // this.userEdit.displayName = this.userEdit.displayName;
        if (!this.userEdit.description) {
          this.userEdit.description = "";
        }
        this.userEdit.email = this.user.email;
        this.userEdit.photoURL = this.user.photoURL;
        if (this.userData.profileType) {
          this.userEdit.profileType = this.userData.profileType;
        } else {
          this.userEdit.profileType = this.profileType;
          LocalStorage.set("profileType", "")
        }

        this.editUser({ id: this.user.email, data: this.userEdit, img: this.imageProfile });
      }
    },
    accountSwipe (val) {
      if (val.direction === "right") {
        this.$router.push("/account");
      }

      // if (val.direction === 'left') {
      //   this.$router.push('/account/reset')
      // }

      if (val.direction === "down") {
        this.$router.push("/");
      }
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
      this.imageProfile = files[0];
    }
  },

  mounted () {
    this.getUser();
    this.$root.$emit("textToSpeechRouter", "Editar perfil");
    if (LocalStorage.getItem("profileType")) this.profileType = LocalStorage.getItem("profileType");
    this.imageUrl = this.user.photoURL;
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
