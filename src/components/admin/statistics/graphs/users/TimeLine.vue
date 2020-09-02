<template>
  <div>
    <div class="q-pl-xl">
      Registo de usuários
    </div>
    <GChart
      type="AreaChart"
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
        ['Year', 'Cadastros'],
        ['2013', 1000],
        ['2014', 1170],
        ['2015', 660],
        ['2016', 1030]
      ],
      chartOptions: {
        hAxis: { title: 'Year', titleTextStyle: { color: '#008080' } },
        vAxis: { minValue: 0 }
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