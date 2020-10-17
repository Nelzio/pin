<template>
  <div v-touch-hold:600.mouse="handleHold">
    <!-- content -->
    <q-card class="my-card">
      <q-img
        v-ripple
        v-if="vacancy.img"
        :src="vacancy.img"
        style="min-height: 200px"
        @click="$router.push('/profile/vacancy/details/' + vacancy.key)"
        role="img"
        lang="pt-PT"
        aria-label="Imagem da vaga"
      />
      <q-img
        v-ripple
        v-else
        src="statics/img/nophoto.png"
        style="min-height: 200px"
        @click="$router.push('/profile/vacancy/details/' + vacancy.key)"
        role="img"
        lang="pt-PT"
        aria-label="Imagem da vaga"
      />
      <q-card-section :class="getFont.title">
        {{ vacancy.title }}
        <q-icon name="verified" :color="vacancy.approved ? 'blue' : 'grey'" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          label="Detalhes"
          icon="details"
          :to="'/profile/vacancy/details/' + vacancy.key"
        />
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          icon="edit"
          :to="'/profile/vacancy/edit/' + vacancy.key"
        />
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          icon="delete"
          @click="confirDelete = true"
          role="button"
        />
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          :icon="vacancyStatus ? 'visibility' : 'visibility_off'"
          lang="pt-PT"
          :aria-label="vacancyStatus ? 'Ocultar' : 'Desocultar'"
          @click="makePublic(vacancy.key, vacancy, vacancyStatus)"
          role="button"
        />
      </q-card-actions>
    </q-card>

    <div>
      <q-dialog
        v-model="confirDelete"
        role="dialog"
        lang="pt-PT"
        aria-label="Alerta de confirmação"
      >
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div :class="getFont.title">Confirmar</div>
          </q-card-section>

          <q-card-section class="q-pt-none" :class="getFont.text"
            >Remover vaga de {{ vacancy.title }}?</q-card-section
          >

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn
              rounded
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              label="Remover"
              role="button"
              @click="deleteVacancyThis(vacancy.key)"
            />
            <q-btn
              rounded
              outline
              :color="darkModeConf.iconVar"
              label="Cancelar"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="confirDeleteSuccess"
        role="alertdialog"
        lang="pt-PT"
        aria-label="Alerta de sucesso"
      >
        <q-card>
          <q-card-section class="text-green" :class="getFont.title"
            >Vaga deletada com sucesso</q-card-section
          >

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="primary"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { Loading } from "quasar"
import { firebaseAuth, firestoreDB, fireStorage } from "boot/firebase"
import offline from "v-offline"
export default {
  // name: 'PageName',
  props: ["vacancy"],
  data() {
    return {
      tab: "bio",
      confirDeleteSuccess: false,
      confirDelete: false,
      confirDeleteAux: false,
      isPublic: true,
      vacancyDel: {
        title: "",
        key: null,
      },
      vacanciesAply: [],
      myVacancies: [],
      vacancyStatus: false,
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont", "getVibrate"]),
    ...mapGetters("auth", ["user", "userData"]),
  },
  methods: {
    ...mapActions("auth", ["detailUser", "checkAuthUser"]),

    handleHold({ ...info }) {
      if (window.hasOwnProperty("cordova")) {
        navigator.vibrate(200)
      } else {
        window.navigator.vibrate(200)
      }
      this.$root.$emit(
        "textToSpeechRouter",
        "Você adicionou" + this.vacancy.title + ".\n Clique para detalhes."
      )
    },

    deleteVacancyThis(id) {
      const vm = this

      Loading.show()
      var storageRef = fireStorage.ref()

      var desertRef = storageRef.child("vacancies/" + id)

      firestoreDB
        .collection("vacancies")
        .doc(id)
        .delete()
        .then(() => {
          // Delete the file
          desertRef
            .delete()
            .then(function () {
              // File deleted successfully
              vm.confirDeleteSuccess = true
              Loading.hide()
            })
            .catch(function (error) {
              // Uh-oh, an error occurred!
              vm.confirDeleteSuccess = true
              console.log("Erro ao Remover imagem")
              Loading.hide()
            })
        })
        .catch((error) => {
          Loading.hide()
          alert("Error removing document: ", error)
        })
    },

    getVacancyStatus(id) {
      const vm = this
      const ref = firestoreDB.collection("vacancies").doc(id)

      ref.onSnapshot((doc) => {
        if (doc.exists) {
          vm.vacancyStatus = doc.data().public
        } else {
          console.log("No such document!")
          // Loading.hide()
        }
      })
    },

    updateVacancyHere(payload) {
      Loading.show()
      const updateRef = firestoreDB.collection("vacancies").doc(payload.id)
      updateRef
        .set(payload.data)
        .then(() => {
          Loading.hide()
        })
        .catch((error) => {
          Loading.hide()
          alert("Error update document: ", error)
        })
    },

    makePublic(id, data, val) {
      let dataAux = {
        approved: data.approved,
        numVacancies: data.numVacancies,
        title: data.title,
        user: data.user,
        description: data.description,
        img: data.img,
        public: !val,
        place: data.place,
        validate: data.validate,
        category: data.category,
        timeSend: data.timeSend,
      }

      this.updateVacancyHere({
        id: id,
        data: dataAux,
      })
    },
  },
  created() {
    this.checkAuthUser()
  },
  mounted() {
    this.getVacancyStatus(this.vacancy.key)
    // this.listVacancyMy(this.user.email)
    // this.listVacancyMyHere(this.user.email);
  },
}
</script>
