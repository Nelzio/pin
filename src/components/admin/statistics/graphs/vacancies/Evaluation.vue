<template>
  <div v-if="chartData.length">
    <div class="q-pl-xl">
      Avaliação de candidatos
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
export default {
  props: ["vacancies"],
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {},
    }
  },
  components: {
    GChart
  },
  methods: {
    getEvaluationDatas () {
      this.chartData = []
      let chartData = []
      let approved = 0
      let reproved = 0
      let pending = 0
      for (let index = 0; index < this.vacancies.length; index++) {
        const vacancy = this.vacancies[index];

        approved += vacancy.approvedCandidates.length
        reproved += vacancy.reprovedCandidates.length
        pending += vacancy.pendingCandidates.length
      }
      if (approved || reproved || pending) chartData = [
        ['Género', 'Comparação de géneros'],
        ['Aprovados', approved],
        ['Reprovados', reproved],
        ['Não entrevistados', pending],
      ]
      this.chartData = chartData
    }
  },
  mounted () {
    if (this.vacancies) this.getEvaluationDatas()
  },
  watch: {
    vacancies (val) {
      if (val.length) {
        this.getEvaluationDatas()
      } else {
        this.chartData = []
      }
    }
  }
}
</script>

<style>
</style>