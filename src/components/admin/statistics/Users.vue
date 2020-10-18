<template>
  <div>
    <div>
      <q-toolbar class="text-primary q-pa-md">
        <q-toolbar-title class="text-h5"> Usuários </q-toolbar-title>
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
    <div class="row q-pa-sm" role="group">
      <div class="col-3">
        <q-card class="my-card">
          <q-card-section class="text-h5"> Resumo </q-card-section>
          <q-card-section class="q-pa-none">
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de usuários
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="users.length"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de usuários do sexo feminino
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="genderCount.womans"
                />
              </q-item-section>
            </q-item>
            <q-item v-if="genderCount.null" clickable v-ripple>
              <q-item-section class="text-body1">
                Género não definido
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="genderCount.null"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Número de usuários do sexo masculino
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="genderCount.mans"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Usuários candidatos
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="approvedNum + reprovedNum + pendingNum"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Usuários aprovados a vagas
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
                Usuários por avaliar
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="pendingNum"
                />
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section class="text-body1">
                Usuários auto emprego
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  :label="businessUsersLen"
                />
              </q-item-section>
            </q-item>
            <q-separator />
          </q-card-section>
        </q-card>
      </div>
      <div v-if="users.length" class="col-9 q-pa-sm">
        <div class="row">
          <div class="col-12">
            <UsersPerDeficiency :data="users" />
          </div>
          <div class="col-8">
            <TimeLine :data="users" />
          </div>
          <div class="col-4">
            <Gender :data="genderCount" />
          </div>
        </div>
        <q-separator size="2px" />
        <div class="row">
          <div class="col-6">
            <Vacancies
              :modelSelect="modelSelect"
              :optionsSelect="optionsSelect"
            />
          </div>
          <div class="col-6">
            <Business
              :modelSelect="modelSelect"
              :optionsSelect="optionsSelect"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLine from "./graphs/users/TimeLine"
import Gender from "./graphs/users/Gender"
import Business from "./graphs/users/Business"
import Vacancies from "./graphs/users/Vacancies"
import UsersPerDeficiency from "./graphs/users/UsersPerDeficiency.vue"
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
      users: [],
      genderCount: {
        womans: 0,
        mans: 0,
        null: 0,
      },
      vacancies: [],
      vacanciesToEmit: [],
      vacanciesLength: 0, // to get len of vacancies
      approvedNum: 0,
      reprovedNum: 0,
      pendingNum: 0,
      businessUsersLen: 0,
    }
  },
  components: { TimeLine, Gender, Business, Vacancies, UsersPerDeficiency },
  methods: {
    getUsers() {
      const vm = this
      const ref = firestoreDB.collection("users")
      let users = []
      let genderCount = {
        womans: 0,
        mans: 0,
      }
      ref
        .where("profileType", "==", "person")
        .get()
        .then(function (docs) {
          docs.forEach((doc) => {
            if (
              doc.data().place == vm.modelSelect &&
              vm.modelSelect != vm.optionsSelect[0]
            ) {
              users.push(doc.data())
              if (doc.data().gender) {
                genderCount.mans += 1
              } else if (
                doc.data().gender === "" ||
                doc.data().gender == undefined
              ) {
                genderCount.null += 1
              } else {
                genderCount.womans += 1
              }
            } else if (
              !vm.modelSelect ||
              vm.modelSelect == vm.optionsSelect[0]
            ) {
              users.push(doc.data())
              if (doc.data().gender) {
                genderCount.mans += 1
              } else if (
                doc.data().gender === "" ||
                doc.data().gender == undefined
              ) {
                genderCount.null += 1
              } else {
                genderCount.womans += 1
              }
            }
          })
          vm.users = users
          vm.genderCount = genderCount
          vm.getVacancies() // get vacancies if users are get done
          // console.log(users)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // ====================================
    // ====================================
    // ========== Other section ===========
    // ====================================
    // ====================================
    isApproved(candidate, approvedCandidates) {
      for (let index = 0; index < approvedCandidates.length; index++) {
        const element = approvedCandidates[index]
        if (element.id == candidate.id) {
          return true
        }
      }
      return false
    },
    candidatesEvaluateByCompany(candidates, numVacancies) {
      const vm = this
      let lastNumEvaluate = 0
      let listPunctuation = []
      var candidatesApproved = []
      var candidatesReproved = []
      let pendingCandidates = []
      // make foreach in candidates list
      candidates.forEach((candidate) => {
        // verify if candidate it is in approved list
        if (!candidate.evaluators.length) {
          pendingCandidates.push(candidate)
        }
        if (
          !vm.isApproved(candidate, candidatesApproved) &&
          candidate.evaluators.length
        ) {
          // calculate punctuation
          var numEvaluate = 0
          candidate.evaluators.forEach((val) => {
            numEvaluate += val.punctuation
          })
          // make push elements if have vacancies
          if (numVacancies > candidatesApproved.length) {
            candidatesApproved.push(candidate)
            listPunctuation.push(numEvaluate)
          } else {
            // change users approved by punctuation
            var auxIndex = 0
            var iterate = true // to allow get in IF bloc of iterator of list punctuation.
            var makeChange = false // not allow change
            for (let index = 0; index < listPunctuation.length; index++) {
              const punctuation = listPunctuation[index]
              if (numEvaluate > punctuation && iterate) {
                auxIndex = index // store index of listPunctuation and candidatesApproved
                iterate = false // to block get in IF bloc of iterator of list punctuation.
                makeChange = true // allow change
              }
            }
            // change users and punctuation
            if (makeChange) {
              candidatesReproved.push(candidatesApproved[auxIndex])
              listPunctuation[auxIndex] = numEvaluate
              candidatesApproved[auxIndex] = candidate
            }
          }
        }
      })
      // console.log(candidatesApproved)
      return {
        approvedCandidates: candidatesApproved,
        reprovedCandidates: candidatesReproved,
        pendingCandidates: pendingCandidates,
      }
    },
    getVacancies() {
      const vm = this
      let tempObject = {}
      let candidates = []
      let ref = firestoreDB.collection("vacancies")
      var numVacancies = 0
      let isSelect = this.modelSelect ? true : false

      // get all vacancies candidatures
      ref.get().then(function (querySnapshotVacancy) {
        vm.vacanciesLength = querySnapshotVacancy.docs.length
        querySnapshotVacancy.forEach(function (docVacancy) {
          var vacancy = docVacancy.data()
          vacancy["candidates"] = []
          ref
            .doc(docVacancy.id)
            .collection("candidates")
            .get()
            .then(function (querySnapshotCandidates) {
              querySnapshotCandidates.forEach(function (docCandidate) {
                var candidate = docCandidate.data()
                if (
                  candidate.place == vm.modelSelect &&
                  vm.modelSelect != vm.optionsSelect[0]
                ) {
                  vacancy["candidates"].push(candidate)
                } else if (
                  !vm.modelSelect ||
                  vm.modelSelect == vm.optionsSelect[0]
                ) {
                  vacancy["candidates"].push(candidate)
                }
              })
              let candidatesEvaluateByCompanyList = vm.candidatesEvaluateByCompany(
                vacancy.candidates,
                vacancy.numVacancies
              )
              vacancy["approvedCandidates"] =
                candidatesEvaluateByCompanyList.approvedCandidates
              vacancy["reprovedCandidates"] =
                candidatesEvaluateByCompanyList.reprovedCandidates
              vacancy["pendingCandidates"] =
                candidatesEvaluateByCompanyList.pendingCandidates
              vm.vacancies.push(vacancy)
              if (!isSelect) vm.vacanciesToEmit.push(vacancy)
              // console.log(vm.vacancies)
            })
        })
      })
    },
    filterValues() {
      console.log()
    },
  },
  mounted() {
    const vm = this
    this.getUsers()
    this.$root.$on("businessUsers", function (users) {
      vm.businessUsersLen = users.length
    })
  },
  watch: {
    vacancies(vacancies) {
      if (vacancies.length == this.vacanciesLength) {
        const vm = this
        let approvedNum = 0
        let reprovedNum = 0
        let pendingNum = 0
        for (let index = 0; index < vacancies.length; index++) {
          const vacancy = vacancies[index]
          approvedNum += vacancy.approvedCandidates.length
          reprovedNum += vacancy.reprovedCandidates.length
          pendingNum += vacancy.pendingCandidates.length
        }
        this.approvedNum = approvedNum
        this.reprovedNum = reprovedNum
        this.pendingNum = pendingNum
      }
    },
    vacanciesToEmit(vacancies) {
      if (vacancies.length == this.vacanciesLength) {
        const vm = this
        // emit vacancies processed with users for other components
        this.$root.$emit("vacanciesToStatistic", vacancies)
        this.$root.$on("pleaseVacanciesStatisticData", function () {
          vm.$root.$emit("vacanciesToStatistic", vm.vacanciesToEmit)
        })
      }
    },
    modelSelect() {
      this.getUsers()
    },
  },
}
</script>

<style>
</style>