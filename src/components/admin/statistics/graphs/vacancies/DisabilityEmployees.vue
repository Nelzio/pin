<template>
  <div v-if="chartData.length">
    <div class="q-pl-xl">
      Empregados por deficiência
    </div>
    <GChart
      type="BarChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  props: ["vacancies"],
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {
        chart: {
          title: 'Empregados por deficiência',
        },
        bars: 'horizontal', // Required for Material Bar Charts.
      }
    }
  },
  components: {
    GChart
  },
  methods: {
    // getEvaluationByDeficiency () {
    //   let titles = ['Deficiências', 'Aprovados', 'Reprovados', 'Por entrevistar']
    //   let evaluationByDeficiencyList = [titles]
    //   let evaluationByDeficiencyListAux = []
    //   for (let index = 0; index < this.vacancies.length; index++) {
    //     const vacancy = this.vacancies[index];
    //     for (let index = 0; index < vacancy.candidates.length; index++) {
    //       const candidate = vacancy.candidates[index];
    //       if (!evaluationByDeficiencyListAux.includes(candidate.deficiency)) {
    //         evaluationByDeficiencyList.push([candidate.deficiency, 1])
    //         evaluationByDeficiencyListAux.push(candidate.deficiency)
    //       } else {
    //         var indexEvaluationByDeficiency = evaluationByDeficiencyListAux.indexOf(candidate.deficiency)
    //         console.log(indexEvaluationByDeficiency)
    //         console.log(evaluationByDeficiencyList[indexEvaluationByDeficiency + 1])
    //         evaluationByDeficiencyList[indexEvaluationByDeficiency + 1][1] += 1
    //       }

    //     }
    //   }
    //   console.log(evaluationByDeficiencyList)
    //   console.log(evaluationByDeficiencyListAux)
    // }

    getEvaluation (candidates) {
      let evaluationByDeficiencyList = []
      let evaluationByDeficiencyListAux = []
      for (let index = 0; index < candidates.length; index++) {
        const candidate = candidates[index];
        if (!evaluationByDeficiencyListAux.includes(candidate.deficiency)) {
          evaluationByDeficiencyList.push([candidate.deficiency, 1])
          evaluationByDeficiencyListAux.push(candidate.deficiency)
        } else {
          var indexEvaluationByDeficiency = evaluationByDeficiencyListAux.indexOf(candidate.deficiency)
          console.log(indexEvaluationByDeficiency)
          console.log(evaluationByDeficiencyList[indexEvaluationByDeficiency])
          evaluationByDeficiencyList[indexEvaluationByDeficiency][1] += 1
        }

      }
      // console.log(evaluationByDeficiencyList)
      // console.log(evaluationByDeficiencyListAux)
      return evaluationByDeficiencyList
    },

    getEvaluationByDeficiency () {
      let titles = ['Deficiências', 'Aprovados', 'Reprovados', 'Por entrevistar']

      let approvedCandidates = []
      let reprovedCandidates = []
      let pendingCandidates = []
      this.chartData = []
      for (let index = 0; index < this.vacancies.length; index++) {
        const vacancy = this.vacancies[index];
        var approvedCandidatesByUser = this.getEvaluation(vacancy.approvedCandidates)
        var reprovedCandidatesByUser = this.getEvaluation(vacancy.reprovedCandidates)
        var pendingCandidatesByUser = this.getEvaluation(vacancy.pendingCandidates)
        if (approvedCandidatesByUser.length) approvedCandidates.push(approvedCandidatesByUser)
        if (reprovedCandidatesByUser.length) reprovedCandidates.push(reprovedCandidatesByUser)
        if (pendingCandidatesByUser.length) pendingCandidates.push(pendingCandidatesByUser)
      }

      let deficiencies = []
      for (let index = 0; index < approvedCandidates.length; index++) {
        const approvedCandidate = approvedCandidates[index]
        if (!deficiencies.includes(approvedCandidate[0][0])) {
          deficiencies.push(approvedCandidate[0][0])
        }
      }
      for (let index = 0; index < reprovedCandidates.length; index++) {
        const reprovedCandidate = reprovedCandidates[index]
        if (!deficiencies.includes(reprovedCandidate[0][0])) {
          deficiencies.push(reprovedCandidate[0][0])
        }
      }
      for (let index = 0; index < pendingCandidates.length; index++) {
        const pendingCandidate = pendingCandidates[index]
        if (!deficiencies.includes(pendingCandidate[0][0])) {
          deficiencies.push(pendingCandidate[0][0])
        }
      }
      // console.log(deficiencies)
      let finalList = [
        ['Deficiências', 'Aprovados', 'Reprovados', 'Por entrevistar']
      ]
      for (let index = 0; index < deficiencies.length; index++) {
        const deficiency = deficiencies[index];
        finalList.push([deficiency, this.countNumFind(approvedCandidates, deficiency), this.countNumFind(reprovedCandidates, deficiency), this.countNumFind(pendingCandidates, deficiency)])
      }
      if (finalList.length > 1) this.chartData = finalList
      // console.log(this.chartData)
    },
    countNumFind (list, val) {
      let num = 0
      for (let index = 0; index < list.length; index++) {
        const element = list[index][0][0];
        if (element == val) {
          num += 1
        }
      }
      return num
    }
  },
  mounted () {
    if (this.vacancies) this.getEvaluationByDeficiency()
  },
  watch: {
    vacancies (val) {
      if (val.length) {
        this.getEvaluationByDeficiency()
      } else {
        this.chartData = []
      }
    },
  }
}
</script>

<style>
</style>