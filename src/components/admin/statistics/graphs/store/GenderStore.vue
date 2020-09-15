<template>
  <div v-if="chartData.length">
    <div class="q-pl-xl">
      Comparação de género por produto
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
  props: ["stories"],
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {}
    }
  },
  components: {
    GChart
  },
  methods: {
    getGenderNum () {
      let chartData = [
        ['Género', 'Comparação de géneros'],
        ['Masculino', 0],
        ['Feminino', 0],
        ['Não definido', 0],
      ]
      for (let index = 0; index < this.stories.length; index++) {
        const store = this.stories[index];
        if (store.category == "Produto") {
          if (store.userObject.gender) {
            // man
            chartData[1][1] += 1
          } else if (store.userObject.gender === "") {
            // undefined
            chartData[3][1] += 1
          } else {
            // woman
            chartData[2][1] += 1
          }
        }
      }
      this.chartData = chartData
    }
  },
  mounted () {
    this.getGenderNum()
  },
  watch: {
    stories () {
      this.getGenderNum()
    }
  }
}
</script>

<style>
</style>