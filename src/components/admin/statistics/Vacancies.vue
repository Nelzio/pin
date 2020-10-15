<template>
  <div>
    <div>
      <q-toolbar class="text-primary q-pa-md">
        <q-toolbar-title class="text-h5"> Vagas de emprego </q-toolbar-title>
        <div style="width: 200px">
          <q-select
            outlined
            rounded
            v-model="modelSelect"
            :options="optionsSelect"
            label="Selecionar província"
          />
        </div>
      </q-toolbar>
    </div>
    <div class="row q-pa-sm">
      <div class="col-3">
        <q-card class="my-card">
          <q-card-section class="text-h5"> Resumo </q-card-section>
          <q-card-section class="q-pa-none">
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de anúncios vagas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="numAnnouncement"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de anúncios vagas válidas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="announcementValid"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de anúncios vagas expiradas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="announcementExpired"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de vagas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="vacanciesPerUser"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de vagas disponíveis
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="approvedNum"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de vagas não disponíveis
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="reprovedNum"
                />
              </q-item-section>
            </q-item>
            <q-separator />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-9 q-pa-sm">
        <div class="row">
          <div class="col-12">
            <TimeLineCandidatures :vacancies="vacanciesToProps" />
          </div>
        </div>
        <q-separator size="2px" />
        <div class="row">
          <div class="col-5 shadow-2">
            <Evaluation :vacancies="vacanciesToProps" />
          </div>
          <div class="col-7 shadow-2">
            <DisabilityEmployees :vacancies="vacanciesToProps" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLineCandidatures from "./graphs/vacancies/TimeLineCandidatures"
import DisabilityEmployees from "./graphs/vacancies/DisabilityEmployees"
import Evaluation from "./graphs/vacancies/Evaluation"
import { firestoreDB } from "boot/firebase"
export default {
  data() {
    return {
      modelSelect: "",
      optionsSelect: [
        "Todas províncias",
        "Cabo Delgado",
        "Gaza",
        "Inhambane",
        "Manica",
        "Maputo",
        "Matola",
        "Nampula",
        "Niassa",
        "Sofala",
        "Tete",
        "Zambézia",
      ],
      numAnnouncement: 0,
      announcementValid: 0,
      announcementExpired: 0,
      vacanciesPerUser: 0,
      vacancies: [],
      vacanciesToProps: [],
      approvedNum: 0,
      reprovedNum: 0,
    }
  },
  components: { TimeLineCandidatures, DisabilityEmployees, Evaluation },
  methods: {
    getVacancies() {
      const vm = this
      const todayDate = new Date()
      const today =
        todayDate.getMonth() +
        "/" +
        todayDate.getDate() +
        "/" +
        todayDate.getFullYear()

      this.$root.$on("vacanciesToStatistic", (vacancies) => {
        // console.log(vacancies)
        vm.announcementValid = 0
        vm.announcementExpired = 0
        vm.vacanciesPerUser = 0
        vm.vacancies = vacancies
        vm.vacanciesToProps = vacancies
        vm.numAnnouncement = vm.vacancies.length
        vm.vacancies.forEach((vacancy) => {
          let vacancyDateList = vacancy.validate.split("/")
          let vacancyDate =
            vacancyDateList[1] +
            "/" +
            vacancyDateList[0] +
            "/" +
            vacancyDateList[2]
          if (new Date(vacancyDate) >= new Date(today)) {
            vm.announcementValid += 1
          } else {
            vm.announcementExpired += 1
          }
          // count vacancies Per User
          console.log(vacancy.numVacancies)
          console.log(vacancy)
          if (vacancy.numVacancies)
            vm.vacanciesPerUser += parseInt(vacancy.numVacancies)
        })
      })
    },

    filterVacancies() {
      const todayDate = new Date()
      const today =
        todayDate.getMonth() +
        "/" +
        todayDate.getDate() +
        "/" +
        todayDate.getFullYear()
      this.announcementValid = 0
      this.announcementExpired = 0
      this.vacanciesPerUser = 0
      this.numAnnouncement = 0
      this.vacanciesToProps = []
      for (let index = 0; index < this.vacancies.length; index++) {
        const vacancy = this.vacancies[index]
        if (
          vacancy.place == this.modelSelect &&
          this.modelSelect != this.optionsSelect[0]
        ) {
          this.vacanciesToProps.push(vacancy)
          this.numAnnouncement += 1
          let vacancyDateList = vacancy.validate.split("/")
          let vacancyDate =
            vacancyDateList[1] +
            "/" +
            vacancyDateList[0] +
            "/" +
            vacancyDateList[2]
          if (new Date(vacancyDate) >= new Date(today)) {
            this.announcementValid += 1
          } else {
            this.announcementExpired += 1
          }
          // count vacancies Per User
          if (vacancy.numVacancies)
            this.vacanciesPerUser += vacancy.numVacancies
        } else if (
          !this.modelSelect ||
          this.modelSelect == this.optionsSelect[0]
        ) {
          if (!this.vacanciesToProps.length)
            this.vacanciesToProps = this.vacancies
          if (!this.numAnnouncement)
            this.numAnnouncement = this.vacancies.length
          let vacancyDateList = vacancy.validate.split("/")
          let vacancyDate =
            vacancyDateList[1] +
            "/" +
            vacancyDateList[0] +
            "/" +
            vacancyDateList[2]
          if (new Date(vacancyDate) >= new Date(today)) {
            this.announcementValid += 1
          } else {
            this.announcementExpired += 1
          }
          // count vacancies Per User
          if (vacancy.numVacancies)
            this.vacanciesPerUser += vacancy.numVacancies
        }
      }
    },

    requestData() {
      const vm = this
      setTimeout(() => {
        if (!vm.vacancies.length) {
          vm.$root.$emit("pleaseVacanciesStatisticData")
        }
      }, 1000)
    },

    getAvailableNumVacancies() {
      let approvedNum = 0
      let reprovedNum = 0
      let pendingNum = 0
      for (let index = 0; index < this.vacancies.length; index++) {
        const vacancy = this.vacancies[index]
        if (vacancy.numVacancies) {
          approvedNum +=
            vacancy.numVacancies - vacancy.approvedCandidates.length
          reprovedNum +=
            vacancy.numVacancies -
            (vacancy.numVacancies - vacancy.approvedCandidates.length)
        }
      }
      this.approvedNum = approvedNum
      this.reprovedNum = reprovedNum
    },

    getAvailableNumVacanciesFiltered() {
      let approvedNum = 0
      let reprovedNum = 0
      let pendingNum = 0
      for (let index = 0; index < this.vacancies.length; index++) {
        const vacancy = this.vacancies[index]
        if (
          vacancy.place == this.modelSelect &&
          this.modelSelect != this.optionsSelect[0]
        ) {
          if (vacancy.numVacancies) {
            approvedNum +=
              vacancy.numVacancies - vacancy.approvedCandidates.length
            reprovedNum +=
              vacancy.numVacancies -
              (vacancy.numVacancies - vacancy.approvedCandidates.length)
          }
        } else if (
          !this.modelSelect ||
          this.modelSelect == this.optionsSelect[0]
        ) {
          if (vacancy.numVacancies) {
            approvedNum +=
              vacancy.numVacancies - vacancy.approvedCandidates.length
            reprovedNum +=
              vacancy.numVacancies -
              (vacancy.numVacancies - vacancy.approvedCandidates.length)
          }
        }
      }
      this.approvedNum = approvedNum
      this.reprovedNum = reprovedNum
    },
  },
  mounted() {
    this.getVacancies()
    this.requestData()
  },
  watch: {
    vacancies(vacancies) {
      if (vacancies.length) {
        this.getAvailableNumVacancies()
      }
    },
    modelSelect() {
      this.filterVacancies()
      this.getAvailableNumVacanciesFiltered()
    },
  },
}
</script>

<style>
</style>