<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Vagas"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      selection="multiple"
      :selected.sync="selected"
      hide-header
      role="table"
    >
      <template v-slot:top-left>
        <div class="row q-gutter-x-sm">
          <div class="text-h6">
            Vagas
          </div>
          <q-btn
            rounded
            outline
            color="primary"
            icon-right="archive"
            label="Export em csv"
            no-caps
            @click="exportTable"
          />

          <q-btn
            rounded
            outline
            color="primary"
            icon-right="archive"
            label="Export em excel"
            no-caps
            @click="exportToExl"
          />
        </div>
      </template>
      <template v-slot:top-right>
        <div class="row q-gutter-x-lg">
          <div>
            <q-btn
              rounded
              outline
              color="primary"
              label="Aprovar vagas "
              to="/admin/evalvacancies"
            >
              <q-badge
                color="teal"
                :label="newVacancies.length"
                floating
              />
            </q-btn>
          </div>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            role="search"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

        </div>
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
import exportFromJSON from 'export-from-json';
import {
  firebaseAuth,
  firestoreDB,
  fireStorage,
  firebase,
} from "boot/firebase";
export default {
  data () {
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
      newVacancies: [],
      vacanciesJson: []
    };
  },
  methods: {
    ...mapActions("admin", ["getVacancy"]),
    goToVacancy (val) {
      this.getVacancy(val);
    },
    userName (id) {
      // Get user name of a user in users array
      for (let index = 0; index < this.users.length; index++) {
        let element = this.users[index];
        if (element.email == id) {
          return element.displayName;
        }
      }
    },
    countVacancyCandidature (vacancyId) {
      var countNumCandidatures = 0;
      for (let index = 0; index < this.candidates.length; index++) {
        const element = this.candidates[index];
        if (element.vacancyId == vacancyId) {
          countNumCandidatures += 1;
        }
      }
      return countNumCandidatures;
    },
    getNewVacancies () {
      const vm = this
      this.newVacancies = []
      let ref = firestoreDB.collection("vacancies");
      ref.where("approved", "==", false).get().then(docsVacancies => {
        docsVacancies.forEach(docVacancy => {
          vm.newVacancies.push(docVacancy)
        });
      })
    },
    getVacancies () {
      const vm = this;
      let tempObject = {};
      let candidates = [];
      let refUser = firestoreDB.collection("users");
      let ref = firestoreDB.collection("vacancies");
      var numVacancies = 0;

      //first get all users
      refUser.get().then(function (querySnapshotUser) {
        querySnapshotUser.forEach(function (doc) {
          vm.users.push(doc.data());
        });

        // get all vacancies candidatures
        ref.where("approved", "==", true).get().then(function (querySnapshotVacancy) {
          querySnapshotVacancy.forEach(function (docVacancy) {
            ref
              .doc(docVacancy.id)
              .collection("candidates")
              .get()
              .then(function (querySnapshotCandidates) {
                querySnapshotCandidates.forEach(function (docCandidate) {
                  candidates.push({
                    id: docCandidate.id,
                    vacancyId: docVacancy.id,
                  });
                });
                numVacancies += 1;
                if (querySnapshotVacancy.docs.length == numVacancies) {
                  vm.candidates = candidates;
                  // Then get vacancies
                  ref
                    .where("public", "==", true).where("approved", "==", true)
                    .onSnapshot(function (querySnapshot) {
                      querySnapshot.forEach(function (docData) {
                        tempObject = docData.data();
                        tempObject["id"] = docData.id;
                        vm.data.push({
                          name: docData.data().title,
                          company: vm.userName(docData.data().user),
                          candidatures: vm.countVacancyCandidature(
                            docData.id
                          ),
                          limitDate: docData.data().validate,
                          vacancy: tempObject,
                        });

                        vm.vacanciesJson.push({
                          Título: docData.data().title,
                          Empresa: vm.userName(docData.data().user),
                          Candidaturas: vm.countVacancyCandidature(
                            docData.id
                          ),
                          "Data limite": docData.data().validate,
                        });
                      });
                    });
                }
              });
          });
        });
      });
    },
    exportTable () {
      // naive encoding to csv format
      const data = this.vacanciesJson
      const fileName = 'vacancies'
      const exportType = 'csv'

      exportFromJSON({ data, fileName, exportType })
    },


    exportToExl () {
      const data = this.vacanciesJson
      const fileName = 'vacancies'
      const exportType = 'xls'

      exportFromJSON({ data, fileName, exportType })
    }
  },
  mounted () {
    this.getVacancies();
    this.getNewVacancies();
  },
};
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>