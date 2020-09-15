<template>
  <div v-if="chartData.length">
    <div class="q-pl-xl">
      Comparação de género
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
  props: ["data"],
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
    getGender () {
      this.chartData = [
        ['Género', 'Comparação de géneros'],
        ['Masculino', this.data.mans],
        ['Feminino', this.data.womans],
        ['Não definido', this.data.null],
      ]
    }
  },
  mounted () {
    this.getGender()
  },
  watch: {
    data () {
      this.getGender()
    }
  }
}
</script>

<style>
</style>