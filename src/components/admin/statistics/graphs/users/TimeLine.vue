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
  props: ["data"],
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Year', 'Cadastros'],
      ],
      chartOptions: {
        hAxis: { title: 'Datas', titleTextStyle: { color: '#008080' } },
        vAxis: { minValue: 0 }
      }
    }
  },
  components: {
    GChart
  },
  methods: {
    getDates () {
      const vm = this;
      this.chartData = [
        ['Year', 'Cadastros'],
      ]
      var registrationDateByUser = null
      var auxRegistrationDateByUser = null
      this.data.forEach(user => {
        if (vm.chartData.length < 11) {
          var registrationUserDate = new Date(user.registrationDate)
          registrationDateByUser = registrationUserDate.getDate() + "/" + registrationUserDate.getMonth() + "/" + registrationUserDate.getFullYear()
          if (auxRegistrationDateByUser == registrationDateByUser) {
            vm.chartData[vm.chartData.length - 1] = [registrationDateByUser, vm.chartData[vm.chartData.length - 1][1] + 1]
          } else {
            vm.chartData.push([registrationDateByUser, 1])
            auxRegistrationDateByUser = registrationDateByUser
          }
        }
      });
    }
  },
  mounted () {
    this.getDates()
  },
  watch: {
    data () {
      this.getDates()
    }
  }
}
</script>

<style>
</style>