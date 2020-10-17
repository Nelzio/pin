<template>
  <div>
    <div class="q-pl-xl">Usuário por deficiência</div>
    <!-- Graph here -->
    <!-- <q-list bordered separator>
      <q-item clickable v-ripple v-for="user in usersData" :key="user.id">
        <q-item-section>{{ user[0] }}</q-item-section>
        <q-item-section
          >{{ user[1] }} / mans {{ user[2] }} / womans {{ user[3] }} / undefined
          {{ user[4] }}</q-item-section
        >
      </q-item>
    </q-list> -->
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts"
export default {
  props: ["data"],
  data() {
    return {
      users: [],
      usersData: [],
      deficiencies: [],
      chartData: [
        [
          "Usuários por deficiência",
          "Total",
          "Homens",
          "Mulheres",
          "Não definido",
        ],
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017",
        },
      },
    }
  },
  components: {
    GChart,
  },
  methods: {
    processDataUsers() {
      this.usersData = []
      this.deficiencies = []
      for (let index = 0; index < this.users.length; index++) {
        const element = this.users[index]
        if (this.deficiencies.includes(element.deficiency)) {
          for (let index = 0; index < this.usersData.length; index++) {
            const statisticData = this.usersData[index]
            if (statisticData[0] == element.deficiency) {
              this.usersData[index][1] += 1
              if (element.gender) {
                this.usersData[index][2] += 1
              } else if (element.gender === "") {
                this.usersData[index][4] += 1
              } else {
                this.usersData[index][3] += 1
              }
            }
          }
        } else {
          this.deficiencies.push(element.deficiency)
          this.usersData.push([
            element.deficiency,
            1,
            element.gender ? 1 : 0,
            element.gender === "" ? 1 : 0,
            !element.gender && element.gender !== "" ? 1 : 0,
          ])
        }
      }

      // add to chartData
      this.usersData.forEach((dataProcessed) => {
        var valData = dataProcessed
        if (valData[0] === "") valData[0] = "Não definido"
        this.chartData.push(valData)
      })
    },
  },
  mounted() {
    if (this.data) {
      this.users = this.data
      this.processDataUsers()
    }
  },
  watch: {
    data(val) {
      if (val) {
        this.users = val
        this.processDataUsers()
      }
    },
  },
}
</script>

<style>
</style>