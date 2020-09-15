<template>
  <div>
    <GChart
      type="PieChart"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  props: ["users"],
  data () {
    return {
      chartData: [],
      chartOptions: {
        title: "Comparação de géneros",
      },
    };
  },
  components: {
    GChart,
  },
  methods: {
    loadChart () {
      let userList = [];
      const vm = this;
      let numMan = 0;
      let numGirl = 0;
      let numUndefined = 0;
      this.users.forEach((element) => {
        if (element.gender) {
          numMan += 1;
        } else if (element.gender !== "") {
          numGirl += 1;
        } else {
          numUndefined += 1;
        }
      });

      this.chartData = [
        ["Géneros", "Comparação de géneros"],
        ["Homens", numMan],
        ["Mulheres", numGirl],
        ["Indefinido", numUndefined],
      ];

      numMan = 0;
      numGirl = 0;
      numUndefined = 0;
    },
  },
  mounted () {
    this.loadChart();
  },
  watch: {
    users (val) {
      if (val) {
        this.loadChart();
      }
    },
  },
};
</script>

<style>
</style>