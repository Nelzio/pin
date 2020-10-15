<template>
  <div>
    <q-page>
      <div class="row flex flex-center">
        <div class="col-10">
          <q-toolbar class="text-primary shadow-3">
            <div>
              <q-tabs
                v-model="panel"
                class="text-teal full-width"
              >
                <q-tab
                  name="approved"
                  label="Aprovados"
                />
                <q-tab
                  name="requestes"
                  label="Pedidos pendentes"
                />
                <q-tab
                  name="rejected"
                  label="Rejeitados"
                />
              </q-tabs>
            </div>
            <q-space />
            <div class="row q-gutter-x-sm">
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
          </q-toolbar>

          <q-tab-panels
            v-model="panel"
            animated
            class="shadow-2 rounded-borders"
          >
            <q-tab-panel
              name="approved"
              class="q-pa-none"
            >
              <Approved :data="companiesApproved" />
            </q-tab-panel>
            <q-tab-panel
              name="requestes"
              class="q-pa-none"
            >
              <Requests :data="companiesReq" />
            </q-tab-panel>
            <q-tab-panel
              name="rejected"
              class="q-pa-none"
            >
              <Rejected :data="companiesRejected" />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-page>
    <Evaluation />
  </div>
</template>

<script>
import { firestoreDB } from "boot/firebase";
import Approved from "components/admin/company/Approved";
import Rejected from "components/admin/company/Rejected";
import Requests from "components/admin/company/Requests";
import Evaluation from "components/admin/company/Evaluation";
import exportFromJSON from 'export-from-json';
export default {
  data () {
    return {
      panel: "approved",
      companiesApproved: [],
      companiesRejected: [],
      companiesReq: [],
      companies: [],
      componyJson: []
    };
  },
  components: { Approved, Rejected, Requests, Evaluation },
  methods: {
    countVacancies (user, list) {
      let num = 0
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (element.user == user) {
          num += 1;
        }
      }
      return num
    },
    getCompanies () {
      const vm = this;
      let vacancies = []
      let ref = firestoreDB.collection("users");
      let refVacancies = firestoreDB.collection("vacancies");
      refVacancies.get().then(vacanciesDocs => {
        vacanciesDocs.forEach(vacancyDoc => {
          vacancies.push(vacancyDoc.data())
        });

        ref
          .where("profileType", "==", "organization")
          .onSnapshot(function (docs) {
            vm.companiesApproved = [];
            vm.companiesRejected = [];
            vm.companiesReq = [];
            vm.companies = [];
            docs.forEach(function (doc) {
              var data = doc.data();
              data["id"] = doc.id;
              data["numVacancies"] = vm.countVacancies(data.email, vacancies)
              if (doc.data().status == "approved") {
                vm.companiesApproved.push(data);
              } else if (doc.data().status == "rejected") {
                vm.companiesRejected.push(data);
              } else {
                vm.companiesReq.push(data);
              }
              vm.companies.push(data);
              vm.componyJson.push({
                Nome: data.displayName,
                Email: data.email,
                Telefone: data.phoneNumber,
                "Numero de vagas": vm.countVacancies(data.email, vacancies)
              })
            });
          });
      }).catch(error => {
        console.log(error)
      })
    },
    exportTable () {
      // naive encoding to csv format
      const data = this.componyJson
      const fileName = 'companies'
      const exportType = 'csv'

      exportFromJSON({ data, fileName, exportType })
    },


    exportToExl () {
      const data = this.componyJson
      const fileName = 'companies'
      const exportType = 'xls'

      exportFromJSON({ data, fileName, exportType })
    }
  },
  mounted () {
    this.getCompanies();
  },
};
</script>

<style>
</style>