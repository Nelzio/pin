<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="q-gutter-y-md col-12 col-md-8">
        <div>
          <q-card class="my-card col-12" style="padding: 0;">
            <!-- <q-video style="padding: 0;height: 300px" src="https://www.youtube.com/embed/Raa0vBXA8OQ" /> -->
            <q-img :src="getVacancy.img" spinner-color="white" style="min-height: 200px;" />
            <q-card-section>
              <div class="text-h5">{{ getVacancy.title }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col text-center">
                <q-icon name="place" size="lg" />
              </div>
              <div class="col-10 text-body1">{{ getVacancy.place }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col text-center">
                <q-icon name="filter_list" size="lg" />
              </div>
              <div class="col-10 text-body1">{{ getVacancy.category }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col-12 text-body1">{{ getVacancy.description }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="row justify-end q-gutter-x-md">
          <q-btn
            v-if="!vacancyDone"
            rounded
            :color="darkModeConf.color"
            :class="darkModeConf.textBtn"
            label="Candidatar-se"
            icon="done_all"
            @click="apply = true"
          />
          <q-btn v-else rounded color="red" label="Cancelar" icon="close" @click="apply = true" />
          <!-- <q-btn round outline color="teal" icon="share" /> -->
        </div>
      </div>
    </div>

    <div>
      <q-dialog v-model="apply">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h5">Confirmar</div>
          </q-card-section>

          <q-card-section v-if="!vacancyDone" class="q-pt-none text-h6">Candidatar-se a vaga?</q-card-section>
          <q-card-section v-else class="q-pt-none text-h6">Retirar candidatura?</q-card-section>

          <q-card-actions align="right" class="bg-white">
            <q-btn
              v-if="!vacancyDone"
              rounded
              outline
              color="green"
              label="Candidatar"
              @click="aply()"
            />
            <q-btn
              v-else
              rounded
              outline
              color="red"
              label="Retirar"
              @click="deleteCandidate()"
            />
            <q-btn
              rounded
              outline
              label="Cancelar"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>


<script>
import { Loading, Notify } from "quasar"
import { mapState, mapActions, mapGetters } from "vuex"
import { firestoreDb } from "boot/firebase"
import offline from "v-offline"
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "details",
      socialNet: false,
      apply: false,
      vacancyDone: false
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancies", "vacancyDtl"]),
    ...mapGetters("vacancy", ["getVacancies", "getVacancy"]),
    ...mapGetters("auth", ["user", "userData"])
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "detailVacancy"]),

    getAply() {
      const ref = firestoreDb
        .collection("vacancies")
        .doc(this.$route.params.id)
        .collection("candidates")
        .doc(this.user.email)
      ref.get().then(doc => {
        if (doc.exists) {
          this.vacancyDone = true
        } else {
          this.vacancyDone = false
          console.log("No such document!")
        }
      })
    },
    aply() {
      const data = {
        photoURL: this.user.photoURL,
        displayName: this.user.displayName,
        telephone: this.userData.telephone,
        email: this.user.email,
        adress: this.userData.adress,
        profission: this.userData.profission,
        education: this.userData.education,
        date: this.userData.date
      }
      this.aplyVacancyMethod({ id: this.$route.params.id, data: data })
    },

    aplyVacancyMethod(payload) {
      if (!offline.data().isOnline) {
        return alert("Está sem internet")
      }
      Loading.show()
      const ref = firestoreDb
        .collection("vacancies")
        .doc(payload.id)
        .collection("candidates")
        .doc(payload.data.email) // email is the key
      ref
        .set(payload.data)
        .then(docRef => {
          console.log("aply success" + docRef)
          this.apply = false
          this.getAply()
          Loading.hide()
        })
        .catch(error => {
          Loading.hide()
          alert("Error aplying document: ", error)
        })
    },

    deleteCandidate() {
      if (!offline.data().isOnline) {
        return alert("Está sem internet")
      }
      Loading.show()
      firestoreDb
        .collection("vacancies")
        .doc(this.$route.params.id)
        .collection("candidates")
        .doc(this.user.email)
        .delete()
        .then(() => {
          this.apply = false
          this.getAply()
          console.log("Deleted candidate")
          Loading.hide()
        })
        .catch(error => {
          Loading.hide()
          alert("Error removing document: ", error)
        })
    }
  },
  created() {
    // this.listVacancy()
    this.detailVacancy(this.$route.params.id)
  },
  mounted() {
    this.getAply()
  }
}
</script>
