<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      selection="multiple"
      :selected.sync="selected"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card
            clickable
            v-ripple
            @click="goToVacancy(props.row.vacancy)"
            :class="props.selected ? 'bg-grey-2' : ''"
          >
            <q-card-section
              v-for="col in props.cols.filter(col => col.name !== 'desc')"
              :key="col.name"
              class="q-pa-xs"
            >
              <div class="text-body2 text-bold">{{ col.label }}</div>
              <div class="text-body1">{{ col.value }}</div>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  firebaseAuth,
  firestoreDb,
  fireStorage,
  firebase,
} from "boot/firebase";
export default {
  data() {
    return {
      filter: "",
      selected: [],
      columns: [
        {
          name: "vacancy",
          required: true,
          label: "Título da vaga",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "company",
          align: "center",
          label: "Empresa",
          field: "company",
          sortable: true,
        },
        {
          name: "candidatures",
          label: "Numero de candidatos",
          field: "candidatures",
          sortable: true,
        },
        { name: "limitDate", label: "Data limite da vaga", field: "limitDate" },
      ],
      data: [],
      users: [],
      candidates: [],
    };
  },
  methods: {
    ...mapActions("admin", ["getVacancy"]),
    goToVacancy(val) {
      console.log(val);
      this.getVacancy(val)
    },
    userName(id) {
      // Get user name of a user in users array
      for (let index = 0; index < this.users.length; index++) {
        let element = this.users[index];
        if (element.email == id) {
          return element.displayName;
        }
      }
    },
    countVacancyCandidature(idCompany) {
      let countNumCandidatures = 0;
      for (let index = 0; index < this.candidates.length; index++) {
        const element = this.candidates[index];
        if (element.owner == idCompany) {
          countNumCandidatures++;
        }
      }
      return countNumCandidatures;
    },
    getVacancies() {
      const vm = this;
      let tempObject = {};
      let candidates = [];
      let refUser = firestoreDb.collection("users");
      let ref = firestoreDb.collection("vacancies");

      //first get all users
      refUser.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.users.push(doc.data());
        });

        // get all vacancies candidatures
        ref.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (docVacancy) {
            ref
              .doc(docVacancy.id)
              .collection("candidates")
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (docCandidate) {
                  candidates.push({
                    id: docCandidate.id,
                    owner: docVacancy.data().user,
                  });
                });
                vm.candidates = candidates;
                console.log(vm.candidates)
                // Then get vacancies
                ref
                  .where("public", "==", true)
                  .onSnapshot(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      tempObject = doc.data();
                      tempObject["id"] = doc.id;
                      vm.data.push({
                        name: doc.data().title,
                        company: vm.userName(doc.data().user),
                        candidatures: vm.countVacancyCandidature(
                          doc.data().user
                        ),
                        limitDate: doc.data().validate,
                        vacancy: tempObject
                      });
                    });
                  });
              });
          });
        });
      });
    },
    getCandidates() {
      const vm = this;
      // const ref = firestoreDb.collection("vacancies").doc("*").collection("candidates");
      const ref = firestoreDb.collection("vacancies");
      var candidates = [];

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
                  owner: doc.data().user,
                });
              });
              vm.candidates = candidates;

              //here
            });
        });
      });
    },
  },
  mounted() {
    this.getVacancies();
    this.getCandidates();
  },
};
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>