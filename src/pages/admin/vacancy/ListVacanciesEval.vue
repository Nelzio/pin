<template>
  <q-page padding>
    <div class="row flex flex-center">
      <div class="col-6">
        <q-btn-toggle
          v-model="buttonsModel"
          spread
          class="my-custom-toggle"
          no-caps
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
          {label: 'Vagas por aprova', value: 'notApproved'},
          {label: 'Vagas aprovadas', value: 'approved'}
        ]"
        />

      </div>

    </div>
    <div class="row">
      <div
        class="q-pa-sm"
        :class="detailDrawer ? 'col-6': 'col-4'"
        v-for="vacancy in vacancies"
        :key="vacancy.id"
      >
        <vacancy-component
          :vacancy="vacancy"
          :selected="selectedId"
        />
      </div>
    </div>
    <div>
      <vacancy-dtl-drawer
        :openDrawer="detailDrawer"
        :vacancy="vacancy"
        @close="closeDrawer()"
      />
    </div>
  </q-page>
</template>

<script>
import VacancyComponent from "components/admin/vacancy/VacancyComponent.vue"
import VacancyDtlDrawer from "components/admin/vacancy/VacancyDtlDrawer"
import { firestoreDB } from "boot/firebase";
export default {
  data () {
    return {
      buttonsModel: "notApproved",
      selectedId: "",
      detailDrawer: false,
      vacancies: [],
      vacancy: "",
      filter: [false, true]
    }
  },
  components: { VacancyComponent, VacancyDtlDrawer },
  methods: {
    getVacancies (filter) {
      const ref = firestoreDB.collection("vacancies")
      const vm = this
      let vacancies = []
      ref.where("approved", "==", filter).onSnapshot(vacanciesDocs => {
        vacancies = []
        vacanciesDocs.forEach(vacancyDoc => {
          let vacancy = vacancyDoc.data()
          vacancy["id"] = vacancyDoc.id
          vacancies.push(vacancy)
        });
        vm.vacancies = vacancies
      })
    },
    closeDrawer () {
      this.detailDrawer = false
      this.vacancy = {}
      this.selectedId = ""
    },
    getVacancyDtl () {
      const vm = this
      this.$root.$on("vacancyDetailsDrawer", vacancy => {
        if (vacancy && vm.vacancy.id == vacancy.id) {
          vm.detailDrawer = false
          vm.selectedId = ""
          vm.vacancy = {}
          return
        }
        vm.vacancy = vacancy
        vm.selectedId = vacancy.id
        vm.detailDrawer = true
      })
    }
  },
  mounted () {
    this.getVacancies(this.filter[0]),
      this.getVacancyDtl()
  },
  watch: {
    buttonsModel (val) {
      if (val == 'approved') {
        this.getVacancies(this.filter[1])
      } else {
        this.getVacancies(this.filter[0])
      }
    }
  }

}
</script>

<style>
</style>