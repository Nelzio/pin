<template>
  <div>
    <q-page>
      <div class="row flex flex-center">
        <div class="col-10">
          <q-toolbar class="text-primary shadow-3">
            <q-tabs v-model="panel" class="text-teal full-width">
              <q-tab name="approved" label="Aprovados" />
              <q-tab name="requestes" label="Pedidos pendentes" />
              <q-tab name="rejected" label="Rejeitados" />
            </q-tabs>
          </q-toolbar>

          <q-tab-panels v-model="panel" animated class="shadow-2 rounded-borders">
            <q-tab-panel name="approved" class="q-pa-none">
              <Approved :data="companiesApproved" />
            </q-tab-panel>
            <q-tab-panel name="requestes" class="q-pa-none">
              <Requests :data="companiesReq" />
            </q-tab-panel>
            <q-tab-panel name="rejected" class="q-pa-none">
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
import { firestoreDb } from "boot/firebase";
import Approved from "components/admin/company/Approved";
import Rejected from "components/admin/company/Rejected";
import Requests from "components/admin/company/Requests";
import Evaluation from "components/admin/company/Evaluation";
export default {
  data() {
    return {
      panel: "approved",
      companiesApproved: [],
      companiesRejected: [],
      companiesReq: [],
      companies: [],
    };
  },
  components: { Approved, Rejected, Requests, Evaluation },
  methods: {
    getCompanies() {
      const vm = this;
      let ref = firestoreDb.collection("users");
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
            if (doc.data().status == "approved") {
              vm.companiesApproved.push(data);
            } else if (doc.data().status == "rejected") {
              vm.companiesRejected.push(data);
            } else {
              vm.companiesReq.push(data);
            }
            vm.companies.push(data);
          });
        });
    },
  },
  mounted() {
    this.getCompanies();
  },
};
</script>

<style>
</style>