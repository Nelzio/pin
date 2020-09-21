<template>
  <div>
    <q-table
      hide-bottom
      title="Vagas mais recentes"
      :data="dataTable"
      :columns="columns"
      row-key="id"
      role="table"
    />
  </div>
</template>

<script>
import {
  firebaseAuth,
  firestoreDB,
  fireStorage,
  firebase,
} from "boot/firebase";
export default {
  data () {
    return {
      users: [],
      columns: [
        {
          name: "owner",
          required: true,
          label: "Nome da empresa",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
        },
        {
          name: "title",
          align: "right",
          label: "Título da vaga",
          field: "title",
        },
        {
          name: "quantity",
          align: "right",
          label: "Quantidade de vagas",
          field: "quantity",
        },
      ],
      dataTable: [],
    };
  },
  methods: {
    userName (id) {
      // Get user name of a user in users array
      for (let index = 0; index < this.users.length; index++) {
        let element = this.users[index];
        if (element.email == id) {
          return element.displayName;
        }
      }
    },

    getVacancies () {
      const vm = this;
      let tempObject = {};
      let refUser = firestoreDB.collection("users");
      let ref = firestoreDB.collection("vacancies");

      //first get all users
      refUser.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.users.push(doc.data());

          // Then get vacancies
          ref
            .where("public", "==", true)
            .limit(5)
            .onSnapshot(function (querySnapshot) {
              vm.dataTable = [];
              querySnapshot.forEach(function (doc) {
                vm.dataTable.push({
                  name: vm.userName(doc.data().user),
                  title: doc.data().title,
                  quantity: doc.data().numVacancies,
                  id: doc.id,
                });
              });
            });
        });
      });
    },
  },
  mounted () {
    this.getVacancies();
  },
};
</script>

<style>
</style>