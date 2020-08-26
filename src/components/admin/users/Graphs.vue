<template>
  <div>
    <GChart type="PieChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
export default {
  props: ["users"],
  data() {
    return {
      chartData: [],
      chartOptions: {
        title: "Comparação de géneros",
      },
      tempData: [
        {
          address: "",
          date: "",
          description: "",
          displayName: "Amílcar Paco",
          education: "",
          email: "amilcarcpaco@gmail.com",
          gender: true,
          phoneNumber: "",
          photoURL:
            "https://lh3.googleusercontent.com/a-/AOh14GgsFt3QWnH_fAs3XeJSQFZ9ozD0ntSv_k5cR1Ldvg",
          profileType: "",
          profession: "",
        },
        {
          address: "",
          date: "",
          description: "",
          displayName: "Marta I.N.C",
          education: "",
          email: "anacletomachava@gmail.com",
          gender: true,
          phoneNumber: "",
          photoURL:
            "https://lh3.googleusercontent.com/-4lVyWVPUsXs/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJO_jvDsbFTc1V-VJsppiGfVtUkkEw/photo.jpg",
          profileType: "",
          profession: "",
        },
        {
          address: "Habel Jafar",
          date: "04/04/2000",
          description: "",
          displayName: "Bernardo ",
          education: "",
          email: "bernardojhu9@gmail.com",
          gender: true,
          phoneNumber: "844098224",
          photoURL: "",
          profileType: "person",
          profession: "Designer",
        },
        {
          address: "",
          date: "",
          description: "",
          displayName: "Meu nome",
          education: "",
          email: "email@gmail.com",
          gender: false,
          phoneNumber: "844444444",
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/superactive-app.appspot.com/o/users%2Femail%40gmail.com?alt=media&token=bc72de05-21bf-4cd9-b68c-56f4662b87a1",
          profileType: "",
          profession: "",
        },
        {
          address: "Xipamanine",
          date: "21/09/1991",
          description: "",
          displayName: "Francisco Bento Conjo",
          education: "",
          email: "franciscobento.conjo@gmail.com",
          gender: true,
          phoneNumber: "848939188",
          photoURL:
            "https://lh3.googleusercontent.com/a-/AOh14GhULqxx_uBY_Gp0l5fvkO_8UeyfhFSK33RAhuy5",
          profileType: "person",
          profession: "Técnico de Saúde",
        },
        {
          address: "Bairro Ferroviario",
          date: "16/01/1996",
          description: "",
          displayName: "Nelzio Sitoe",
          education: "",
          email: "nelziositoe@gmail.com",
          gender: true,
          phoneNumber: "841224724",
          photoURL:
            "https://lh3.googleusercontent.com/a-/AOh14GjZO2F2MOba2EqLrkXJVM0ydv38Um_EUjgd9VQU1A",
          profileType: "person",
          profession: "Programador",
        },
        {
          address: "B Ferroviario",
          date: "19/08/1980",
          description: "",
          displayName: "Alberto N",
          education: "",
          email: "nelziositoe@gmaill.com",
          gender: true,
          phoneNumber: "845555552",
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/superactive-app.appspot.com/o/users%2Fnelziositoe%40gmaill.com?alt=media&token=98124641-6543-4a77-8b6c-aa8970a5c3fa",
          profileType: "person",
          profession: "Carpinteiro",
        },
        {
          address: "Bairro de Maxaquene",
          date: "16/01/1996",
          description: "",
          displayName: "Nélzio Petroço",
          education: "",
          email: "nelziositoe@yahoo.com",
          gender: true,
          phoneNumber: "841224724",
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/superactive-app.appspot.com/o/users%2Fnelziositoe%40yahoo.com?alt=media&token=280019ea-bf25-4f20-84f5-6e9cf3056f9e",
          profileType: "person",
          profession: "Programador",
        },
        {
          address: "Bairro da Mafalala",
          date: "20/02/1980",
          description: "",
          displayName: "Rita Sitoe",
          education: "",
          email: "rita@gmail.com",
          gender: false,
          phoneNumber: "844444444",
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/superactive-app.appspot.com/o/users%2Frita%40gmail.com?alt=media&token=cbd05d43-8348-4eae-af74-019223796a22",
          profileType: "person",
          profession: "Faxineira",
        },
      ],
    };
  },
  components: {
    GChart,
  },
  methods: {
    loadChart() {
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
  mounted() {
    this.loadChart();
  },
  watch: {
    users(val) {
      if (val) {
        this.loadChart();
      }
    },
  },
};
</script>

<style>
</style>