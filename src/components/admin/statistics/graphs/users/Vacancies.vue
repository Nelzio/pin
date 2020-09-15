<template>
  <div v-if="chartData.length">
    <div class="q-pl-xl">
      Usuários empregados
    </div>
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import {
  firestoreDB,
} from "boot/firebase";
export default {
  props: ["modelSelect", "optionsSelect"],
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      data: [],
      users: [],
      chartOptions: {},
      vacancies: [],
      controlVacancies: [] // to check len
    }
  },
  components: {
    GChart
  },
  methods: {
    isApproved (candidate, approvedCandidates) {
      for (let index = 0; index < approvedCandidates.length; index++) {
        const element = approvedCandidates[index];
        if (element.id == candidate.id) {
          return true;
        }
      }
      return false;
    },
    candidatesApprovedByCompany (candidates, numVacancies) {
      const vm = this;
      let lastNumEvaluate = 0;
      let listPunctuation = []
      var candidatesApproved = [];
      // make foreach in candidates list
      candidates.forEach((candidate) => {
        // verify if candidate it is in approved list
        if (!vm.isApproved(candidate, candidatesApproved) && candidate.evaluators.length) {
          // calculate punctuation
          var numEvaluate = 0;
          candidate.evaluators.forEach((val) => {
            numEvaluate += val.punctuation;
          });
          // make push elements if have vacancies
          if (numVacancies > candidatesApproved.length) {
            candidatesApproved.push(candidate);
            listPunctuation.push(numEvaluate)
          } else {
            // change users approved by punctuation
            var auxIndex = 0;
            var iterate = true; // to allow get in IF bloc of iterator of list punctuation.
            var makeChange = false; // not allow change
            for (let index = 0; index < listPunctuation.length; index++) {
              const punctuation = listPunctuation[index];
              if (numEvaluate > punctuation && iterate) {
                auxIndex = index; // store index of listPunctuation and candidatesApproved
                iterate = false; // to block get in IF bloc of iterator of list punctuation.
                makeChange = true; // allow change
              }
            }
            // change users and punctuation
            if (makeChange) {
              listPunctuation[auxIndex] = numEvaluate
              candidatesApproved[auxIndex] = candidate
            }
          }
        }
      });
      // console.log(candidatesApproved)
      return candidatesApproved
    },
    getVacancies () {
      const vm = this;
      let tempObject = {};
      let candidates = [];
      let refUser = firestoreDB.collection("users");
      let ref = firestoreDB.collection("vacancies");
      var numVacancies = 0;
      this.vacancies = []
      this.controlVacancies = []

      //first get all users
      refUser.get().then(function (querySnapshotUser) {
        querySnapshotUser.forEach(function (doc) {
          vm.users.push(doc.data());
        });

        // get all vacancies candidatures
        ref.get().then(function (querySnapshotVacancy) {
          querySnapshotVacancy.forEach(function (docVacancy) {
            vm.controlVacancies.push(docVacancy.data())
            var vacancy = docVacancy.data()
            vacancy["candidates"] = []
            ref
              .doc(docVacancy.id)
              .collection("candidates")
              .get()
              .then(function (querySnapshotCandidates) {
                querySnapshotCandidates.forEach(function (docCandidate) {
                  var candidate = docCandidate.data()
                  // vacancy["candidates"].push(candidate);
                  if (candidate.place == vm.modelSelect && vm.modelSelect != vm.optionsSelect[0]) {
                    vacancy["candidates"].push(candidate);
                  } else if (!vm.modelSelect || vm.modelSelect == vm.optionsSelect[0]) {
                    vacancy["candidates"].push(candidate);
                  }
                });
                vacancy["approvedCandidates"] = vm.candidatesApprovedByCompany(vacancy.candidates, vacancy.numVacancies)
                vm.vacancies.push(vacancy)
              });
          });
        });
      });
    },
    getGenders (vacancies) {
      // verify if vacancies.length and this.controlVacancies.length are equal
      if (vacancies.length == this.controlVacancies.length) {
        // console.log(vacancies)
        let genders = [
          ["Man", 0],
          ["Woman", 0],
          ["Undefined", 0]
        ]
        vacancies.forEach(vacancy => {
          if (vacancy.approvedCandidates.length) {
            vacancy.approvedCandidates.forEach(function (candidate) {
              // console.log(candidate.email)
              // console.log(candidate.gender)
              if (candidate.gender) {
                genders[0] = [genders[0][0], genders[0][1] + 1]
              } else if (candidate.gender === "" || candidate.gender == undefined) {
                genders[2] = [genders[2][0], genders[2][1] + 1]
              } else {
                genders[1] = [genders[1][0], genders[1][1] + 1]
              }
            })
          }
        });
        this.chartData = [
          ['Género', 'Comparação de géneros'],
          ['Masculino', genders[0][1]],
          ['Feminino', genders[1][1]],
          ['Não definido', genders[2][1]],
        ]
        // console.log(this.chartData)
      }
    }
  },
  mounted () {
    this.getVacancies()
  },
  watch: {
    vacancies (vacancies) {
      this.getGenders(vacancies)
    },
    modelSelect () {
      this.getVacancies()
    }
  }
}
</script>

<style>
</style>