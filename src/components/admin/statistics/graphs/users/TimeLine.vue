<template>
  <div>
    <div class="q-pl-xl">Registo de usuários</div>
    <GChart type="AreaChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts"
export default {
  props: ["data"],
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [["Year", "Cadastros"]],
      chartOptions: {
        hAxis: { title: "Datas", titleTextStyle: { color: "#008080" } },
        vAxis: { minValue: 0 },
      },
    }
  },
  components: {
    GChart,
  },
  methods: {
    getDates() {
      const vm = this
      this.chartData = [["Year", "Cadastros"]]
      var registrationDateByUser = null
      var auxRegistrationDateByUser = null
      let newData = this.data.slice(0, this.data.length) // Is better to no remove slice to code work perfectly. JS is crazy!

      for (let index = 0; index < newData.length; index++) {
        const element = newData[index]
        newData[index]["registrationDate"] = new Date(element.registrationDate)
      }

      newData.sort(function (a, b) {
        return b.registrationDate - a.registrationDate
      })

      newData.forEach((user) => {
        if (vm.chartData.length <= 5) {
          var registrationUserDate = new Date(user.registrationDate)
          registrationDateByUser =
            registrationUserDate.getDate() +
            "/" +
            registrationUserDate.getMonth() +
            "/" +
            registrationUserDate.getFullYear()
          if (auxRegistrationDateByUser == registrationDateByUser) {
            vm.chartData[vm.chartData.length - 1] = [
              registrationDateByUser,
              vm.chartData[vm.chartData.length - 1][1] + 1,
            ]
          } else {
            vm.chartData.push([registrationDateByUser, 1])
            auxRegistrationDateByUser = registrationDateByUser
          }
        }
      })
    },
  },
  mounted() {
    this.getDates()
  },
  watch: {
    data() {
      this.getDates()
    },
  },
}
</script>

<style>
</style>