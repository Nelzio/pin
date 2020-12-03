<template>
  <div v-if="chartData.length">
    <div class="q-pl-xl">Candidaturas</div>
    <GChart type="AreaChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts"
export default {
  props: ["vacancies"],
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {
        hAxis: { title: "Year", titleTextStyle: { color: "#008080" } },
        vAxis: { minValue: 0 },
      },
    }
  },
  components: {
    GChart,
  },
  methods: {
    getDatesApplies() {
      let dates = [["Year", "Cadastros"]]
      let datesAux = []
      for (let index = 0; index < this.vacancies.length; index++) {
        const vacancy = this.vacancies[index]
        for (let index = 0; index < vacancy.candidates.length; index++) {
          const candidate = vacancy.candidates[index]
          const date = new Date(candidate.submittedDate.seconds * 1000) // timestamp to date
          const formatDate =
            date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()

          if (datesAux.includes(formatDate)) {
            // console.log(datesAux.indexOf(formatDate))
            // console.log(dates[datesAux.indexOf(formatDate)])
            dates[datesAux.indexOf(formatDate) + 1][1] += 1
          } else {
            dates.push([formatDate, 1])
            datesAux.push(formatDate)
          }
        }
      }
      if (dates.length > 1) this.chartData = dates
    },
  },
  mounted() {
    if (this.vacancies) this.getDatesApplies()
  },
  watch: {
    vacancies(val) {
      if (val.length) {
        this.getDatesApplies()
      } else {
        this.chartData = []
      }
    },
  },
}
</script>

<style>
</style>