<template>
  <div>
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Nome do candidato</th>
          <th class="text-right">Associação</th>
          <th class="text-right">Titulo da vaga</th>
          <th class="text-right">Empresa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(candidate, index) in candidates" :key="index">
          <td class="text-left">{{ candidate.displayName }}</td>
          <td class="text-right">{{ candidate.association }}</td>
          <td class="text-right">{{ candidate.title }}</td>
          <td class="text-right">{{ userName(candidate.user) }}</td>
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
      candidates: [],
      users: [],
    };
  },
  methods: {
    userName(id) {
      for (let index = 0; index < this.users.length; index++) {
        let element = this.users[index];
        if (element.email == id) {
          return element.displayName;
        }
      }
    },

    getCandidates() {
      const vm = this;
      // const ref = firestoreDb.collection("vacancies").doc("*").collection("candidates");
      const ref = firestoreDb.collection("vacancies");
      const refUser = firestoreDb.collection("users");
      var candidates = [];
      refUser.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (docUser) {
          vm.users.push(docUser.data());
        });

        ref.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            ref
              .doc(doc.id)
              .collection("candidates")
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (docCandidate) {
                  candidates.push({
                    id: docCandidate.id,
                    photoURL: docCandidate.data().photoURL,
                    displayName: docCandidate.data().displayName,
                    phoneNumber: docCandidate.data().phoneNumber,
                    email: docCandidate.data().email,
                    address: docCandidate.data().address,
                    profession: docCandidate.data().profession,
                    education: docCandidate.data().education,
                    association: docCandidate.data().association ? docCandidate.data().association : "Não associado",
                    date: docCandidate.data().date,
                    title: doc.data().title,
                    user: doc.data().user,
                  });
                });
                vm.candidates = candidates;
              });
          });
        });
      });
    },
  },
  mounted() {
    this.getCandidates();
  },
};
</script>

<style>
</style>