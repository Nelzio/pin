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
            role="button"
            lang="pt-PT"
            aria-label="Trocar foto de perfil"
          >
            <q-icon :color="darkModeConf.iconVar" name="person_add" />
            <q-badge floating :color="darkModeConf.iconVar">
              <q-icon color="white" name="insert_photo" />
            </q-badge>
          </q-btn>
          <q-btn
            v-else
            round
            @click="processFile()"
            role="button"
            lang="pt-PT"
            aria-label="Trocar foto de perfil"
          >
            <q-avatar size="120px">
              <q-img :src="imageUrl" />
            </q-avatar>
            <q-badge floating :color="darkModeConf.iconVar">
              <q-icon :class="darkModeConf.textBtn" name="edit" />
            </q-badge>
          </q-btn>
        </div>
        <q-form
          v-if="
            this.profileType == 'person' || userEdit.profileType == 'person'
          "
          ref="loginForm"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-gutter-md"
          role="form"
          lang="pt-PT"
          aria-label="Atualizar dados"
        >
          <div>
            <input
              id="fileInput"
              type="file"
              hidden
              ref="fileImg"
              accept="image/*"
              @change="onChangeImg"
            />
          </div>
          <div>
            <q-input
              rounded
              outlined
              :color="darkModeConf.iconVar"
              v-model="userEdit.displayName"
              ref="name"
              label="Nome"
              type="text"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Por favor, introduza o nome da instituição ou pessoa',
              ]"
            />
          </div>
          <div>
            <q-select
              rounded
              outlined
              v-model="gender"
              :options="genderOptions"
              label="Selecionar sexo"
              role="combobox"
            />
          </div>
          <div>
            <q-select
              rounded
              outlined
              v-model="userEdit.association"
              :options="associations"
              label="Selecionar associação"
              role="combobox"
            />
          </div>
          <div v-if="userEdit.association.value == 'other'">
            <q-input
              rounded
              outlined
              v-model="userAssociation"
              type="text"
              label="Associação"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Introduza a sua associação',
              ]"
            />
          </div>
          <div>
            <q-input
              rounded
              outlined
              v-model="userEdit.deficiency"
              type="text"
              label="Deficiência"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Introduza a sua deficiência',
              ]"
            />
          </div>
          <div>
            <q-input
              rounded
              outlined
              :color="darkModeConf.iconVar"
              v-model="userEdit.phoneNumber"
              label="Número de Telefone"
              icon="phone"
              type="tel"
              role="number"
              mask="#########"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length == 9) ||
                  'Introduza o seu número de telefone',
              ]"
            />
          </div>
          <div>
            <q-input
              rounded
              outlined
              :color="darkModeConf.iconVar"
              v-model="userEdit.address"
              label="Endereço"
              type="text"
              icon="place"
              placeholeder="Cidade de xai-xai, bairro exemplo"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Introduza o seu bairro',
              ]"
            />
          </div>
          <div>
            <q-input
              :color="darkModeConf.iconVar"
              rounded
              outlined
              v-model="userEdit.date"
              label="Data de nascimento"
              mask="##/##/####"
              :rules="[
                (val) =>
                  (val && val.length > 0) ||
                  'Introduza a sua data de nascimento',
              ]"
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
          </div>
          <div>
            <q-input
              rounded
              outlined
              :color="darkModeConf.iconVar"
              v-model="userEdit.profession"
              label="Profissão"
              type="text"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Introduza a sua profissão',
              ]"
            />
          </div>
          <div class="q-gutter-y-md">
            <q-btn
              rounded
              label="Enviar"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
              role="button"
              type="submit"
            />
          </div>
        </q-form>
        <q-form
          v-else
          ref="loginForm"
          @submit.prevent.stop="onSubmit"
          @reset.prevent.stop="onReset"
          class="q-gutter-md"
          role="form"
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
            type="text"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Por favor, introduza o nome da instituição ou pessoa',
            ]"
          />
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="userEdit.phoneNumber"
            label="Número de Telefone"
            icon="phone"
            type="tel"
            mask="#########"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0 && val.length == 9) ||
                'Introduza o seu número de telefone',
            ]"
          />
          <q-input
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="userEdit.address"
            label="Endereço"
            icon="place"
            type="text"
            placeholeder="Cidade de xai-xai, bairro exemplo"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Introduza o seu bairro',
            ]"
          />
          <div>Descreva a sua instituição.</div>
          <q-editor
            :color="darkModeConf.iconVar"
            v-model="userEdit.description"
            min-height="8rem"
            role="textbox"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                'Introduza uma descrição da instituição',
            ]"
          />
          <div class="q-gutter-y-md">
            <q-btn
              rounded
              label="Enviar"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
              type="submit"
              role="button"
            />
          </div>
        </q-form>
      </div>
    </div>
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="primary"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { LocalStorage, Loading } from "quasar"
import { firestoreDB } from "boot/firebase"
export default {
  name: "RegisterFormComponent",
  data() {
    return {
      text: "asd",
      tab: "contact",
      prof: "Pedreiro",
      gender: "",
      profession: "Pedreiro",
      userAssociation: "",
      userEdit: {
        displayName: "",
        email: "",
        access: "",
        gender: "",
        association: "",
        registrationDate: "",
        deficiency: "",
        photoURL: "",
        phoneNumber: "",
        address: "",
        place: "",
        profession: "",
        education: "",
        profileType: "",
        description: "",
        date: "01/01/2000",
      },
      genderOptions: [
        {
          label: "Masculino",
          value: true,
        },
        {
          label: "Feminino",
          value: false,
        },
      ],
      imageUrl: "",
      imageProfile: null,
      profileType: "",
      isPwd: true,
      associations: [],
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("settings", ["getVibrate"]),
    ...mapGetters("auth", ["user", "userData"]),
  },

  methods: {
    ...mapActions("auth", ["editUser", "detailUser"]),
    getAssociations() {
      const vm = this
      this.$refs.bar.start()
      const ref = firestoreDB.collection("associations")
      let associations = []
      associations.push({ label: "Nenhuma", value: "neither" })
      ref.get().then((docs) => {
        docs.forEach((doc) => {
          associations.push({ label: doc.data().name, value: doc.id })
        })
        associations.push({ label: "Outra", value: "other" })
        vm.associations = associations
        vm.$refs.bar.stop()
      })
    },
    getUser() {
      // first get user
      // this.userEdit.profession = this.userData.profession
      // this.userEdit.displayName = this.userData.displayName
      // this.userEdit.email = this.userData.email
      // this.userEdit.access = this.userData.access
      // this.userEdit.gender = this.userData.gender
      // this.userEdit.association = this.userData.association
      // this.userEdit.registrationDate = this.userData.registrationDate
      // this.userEdit.deficiency = this.userData.deficiency
      // this.userEdit.photoURL = this.userData.photoURL
      // this.userEdit.phoneNumber = this.userData.phoneNumber
      // this.userEdit.address = this.userData.address
      // this.userEdit.place = this.userData.place
      // this.userEdit.education = this.userData.education
      // this.userEdit.profileType = this.userData.profileType
      // this.userEdit.description = this.userData.description
      // this.userEdit.date = this.userData.date

      this.userEdit.access = this.userData.access
      this.userEdit.status = this.userData.status
      this.userEdit.association = this.userData.association
      this.userEdit.registrationDate = this.userData.registrationDate
      this.userEdit.deficiency = this.userData.deficiency
      this.userEdit.displayName = this.userData.displayName
      this.userEdit.gender = this.userData.gender
      this.userEdit.email = this.userData.email
      this.userEdit.photoURL = this.userData.photoURL
      this.userEdit.phoneNumber = this.userData.phoneNumber
      this.userEdit.address = this.userData.address
      this.userEdit.place = this.userData.place
      this.userEdit.profession = this.userData.profession
      this.userEdit.education = this.userData.education
      this.userEdit.profileType = this.userData.profileType
      this.userEdit.description = this.userData.description
      this.userEdit.education = this.userData.education
      this.userEdit.date = this.userData.date

      this.userAssociation = this.userData.association.label

      // this.prof = this.userData.profession
      // alert(this.userEdit.profession)
      this.gender = this.userEdit.gender
        ? {
            label: "Masculino",
            value: true,
          }
        : {
            label: "Feminino",
            value: false,
          }
    },

    isEmailValid(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email))
    },

    onReset() {
      this.userEdit.displayName = null
      this.userEdit.email = null
      this.userEdit.access = null
      this.userEdit.gender = null
      this.userEdit.association = null
      this.userEdit.registrationDate = null
      this.userEdit.deficiency = null
      this.userEdit.photoURL = null
      this.userEdit.phoneNumber = null
      this.userEdit.address = null
      this.userEdit.place = null
      this.userEdit.profession = null
      this.userEdit.education = null
      this.userEdit.profileType = null
      this.userEdit.description = null
      this.userEdit.date = null

      this.$refs.loginForm.resetValidation()
    },
    onSubmit() {
      this.$refs.loginForm.validate()
      if (this.$refs.loginForm.hasError) {
        this.formHasError = true
      } else {
        // this.userEdit.displayName = this.userEdit.displayName;
        if (!this.userEdit.description) {
          this.userEdit.description = ""
        }
        this.userEdit.email = this.user.email
        this.userEdit.photoURL = this.user.photoURL
        if (this.userData.profileType) {
          this.userEdit.profileType = this.userData.profileType
        } else {
          this.userEdit.profileType = this.profileType
          LocalStorage.set("profileType", "")
        }

        if (this.userEdit.association.value == "other") {
          this.userEdit.association.label = this.userAssociation
        }

        this.editUser({
          id: this.user.email,
          data: this.userEdit,
          img: this.imageProfile,
        })
      }
    },
    accountSwipe(val) {
      if (val.direction === "right") {
        this.$router.push("/account")
      }

      // if (val.direction === 'left') {
      //   this.$router.push('/account/reset')
      // }

      if (val.direction === "down") {
        this.$router.push("/")
      }
    },
    processFile() {
      this.$refs.fileImg.click()
    },
    onChangeImg(event) {
      const files = event.target.files
      let filename = files[0].name
      let file = files[0]
      if (!(file && file["type"].split("/")[0] === "image")) {
        return (this.errorFileDialog = true)
      }
      const fileReader = new FileReader()
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.imageProfile = files[0]
    },
  },

  mounted() {
    this.getAssociations()
    this.getUser()
    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit("textToSpeechRouter", "Editar perfil")
    if (LocalStorage.getItem("profileType"))
      this.profileType = LocalStorage.getItem("profileType")
    this.imageUrl = this.user.photoURL
  },

  filters: {
    captalizeFirstLetter(val) {
      return val.charAt(0).toUpperCase() + "" + val.slice(1)
    },
  },
  watch: {
    gender(val) {
      this.userEdit.gender = val.value
    },
  },
}
</script>

<style lang="sass">
</style>
