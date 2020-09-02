<template>
  <div>
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
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Género', 'Comparação de géneros'],
        ['Aprovados', 11],
        ['Reprovados', 6],
        ['Não entrevistados', 2],
      ],
      chartOptions: {}
    }
  },
  components: {
    GChart
  }
}
</script>

<style>
</style>