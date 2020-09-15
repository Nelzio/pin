<template>
  <div v-if="chartData.length">
    <div class="q-pl-xl">
      Negócio
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
import { firestoreDB } from 'boot/firebase'
export default {
  props: ["modelSelect", "optionsSelect"],
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [],
      chartOptions: {},
      users: [],
      storiesItems: [],
      businessUsers: []
    }
  },
  components: {
    GChart
  },
  methods: {
    getUsersAndStories () {
      const vm = this
      const refUsers = firestoreDB.collection("users")
      const refStories = firestoreDB.collection("stories")
      let users = []
      let storiesItems = []
      refUsers.get().then(function (usersDocs) {
        usersDocs.forEach(function (userDoc) {
          if (userDoc.data().place == vm.modelSelect && vm.modelSelect != vm.optionsSelect[0]) {
            users.push(userDoc.data())
          } else if (!vm.modelSelect || vm.modelSelect == vm.optionsSelect[0]) {
            users.push(userDoc.data())
          }
        });
        vm.users = users
        refStories.get().then(function (storiesDocs) {
          storiesDocs.forEach(function (storeDoc) {
            storiesItems.push(storeDoc.data())
          });
          vm.storiesItems = storiesItems
          vm.getGenders()
        })
      })
    },
    getBusinessUsers () {
      let businessUsers = []
      let businessUsersEmails = [] // aux to control if user is added to businessUsers list
      for (let index = 0; index < this.users.length; index++) {
        const user = this.users[index];
        if (!businessUsersEmails.includes(user.email)) {
          for (let index = 0; index < this.storiesItems.length; index++) {
            const item = this.storiesItems[index];
            if (user.email == item.user && !businessUsersEmails.includes(user.email)) {
              businessUsers.push(user)
              businessUsersEmails.push(user.email)
            }
          }
        }
      }
      this.$root.$emit("businessUsers", businessUsers) // emit users list of business to other components
      return businessUsers
    },
    getGenders () {
      const users = this.getBusinessUsers()
      this.chartData = []
      let genders = [
        ['Género', 'Comparação de géneros'],
        ['Masculino', 0],
        ['Feminino', 0],
        ['Não definido', 0],
      ]
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if (user.gender) {
          genders[1][1] = genders[1][1] += 1
        } else if (user.gender === "" || user.gender == undefined) {
          genders[3][1] = genders[3][1] += 1
        } else {
          genders[2][1] = genders[2][1] += 1
        }
      }
      this.chartData = genders
    }
  },
  mounted () {
    this.getUsersAndStories()
  },
  watch: {
    modelSelect () {
      this.getUsersAndStories()
    }
  }
}
</script>

<style>
</style>