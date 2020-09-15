<template>
  <div>
    <q-table
      title="Candidáturas recentes"
      :data="dataCandidates"
      :columns="columns"
      row-key="index"
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
      candidates: [],
      dataCandidates: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "Nome do candidáto",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
        },
        {
          name: "association",
          align: "right",
          label: "Associação",
          field: "association",
        },
        {
          name: "title",
          align: "right",
          label: "Título da vaga",
          field: "title",
        },
        {
          name: "company",
          align: "right",
          label: "Nome da empresa",
          field: "company",
        },
      ],
    };
  },
  methods: {
    userName (id) {
      for (let index = 0; index < this.users.length; index++) {
        let element = this.users[index];
        if (element.email == id) {
          return element.displayName;
        }
      }
    },

    getCandidates () {
      const vm = this;
      // const ref = firestoreDB.collection("vacancies").doc("*").collection("candidates");
      const ref = firestoreDB.collection("vacancies");
      const refUser = firestoreDB.collection("users");
      var candidates = [];
      var index = 0
      refUser.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (docUser) {
          vm.users.push(docUser.data());
        });

        ref.get().then(function (querySnapshot) {
          vm.dataCandidates = [];
          querySnapshot.forEach(function (doc) {
            ref
              .doc(doc.id)
              .collection("candidates")
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (docCandidate) {
                  index += 1
                  vm.dataCandidates.push({
                    index: index,
                    id: docCandidate.id,
                    photoURL: docCandidate.data().photoURL,
                    name: docCandidate.data().displayName,
                    phoneNumber: docCandidate.data().phoneNumber,
                    email: docCandidate.data().email,
                    address: docCandidate.data().address,
                    profession: docCandidate.data().profession,
                    education: docCandidate.data().education,
                    association: docCandidate.data().association
                      ? docCandidate.data().association
                      : "Não associado",
                    date: docCandidate.data().date,
                    title: doc.data().title,
                    company: vm.userName(doc.data().user),
                  });
                });
              });
          });
        });
      });
    },
  },
  mounted () {
    this.getCandidates();
  },
};
</script>

<style>
</style>