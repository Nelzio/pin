<template>
  <div>
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
export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Género', 'Comparação de géneros'],
        ['Masculino', 11],
        ['Feminino', 6],
        ['Não definido', 2],
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