<template>
  <div>
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
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Deficiências', 'Aprovados', 'Reprovados', 'Por entrevistar'],
        ['Física', 1000, 400, 200],
        ['Auditiva', 1170, 460, 250],
        ['Visual', 660, 1120, 300],
        ['Psico-Social', 1030, 540, 350],
      ],
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
  }
}
</script>

<style>
</style>