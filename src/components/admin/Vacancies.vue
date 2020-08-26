<template>
  <div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Nome da empresa</th>
          <th class="text-right">Titulo da vaga</th>
          <th class="text-right">Quantidade de vagas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vacancy in vacancies" :key="vacancy.id">
          <td class="text-left">{{ userName(vacancy.user) }}</td>
          <td class="text-right">{{ vacancy.title }}</td>
          <td class="text-right">{{ vacancy.quantity }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import {
  firebaseAuth,
  firestoreDb,
  fireStorage,
  firebase,
} from "boot/firebase";
export default {
  data() {
    return {
      vacancies: [],
      users: []
    };
  },
  methods: {

    userName (id) { 
      // Get user name of a user in users array
      for (let index = 0; index < this.users.length; index++) {
        let element = this.users[index];
        if(element.email == id) {
          return element.displayName
        }
      }
    },

    getVacancies() {
      const vm = this;
      let tempObject = {};
      let refUser = firestoreDb.collection("users");
      let ref = firestoreDb.collection("vacancies");

      //first get all users
      refUser.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.users.push(doc.data())
        });

        // Then get vacancies
        ref.where("public", "==", true).limit(5).onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            tempObject = doc.data()
            tempObject["id"] = doc.id;
            vm.vacancies.push(tempObject);
          });
        });
      });
    }, 
  },
  mounted() {
    this.getVacancies();
  },
};
</script>

<style>
</style>