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
              <Approved />
            </q-tab-panel>
            <q-tab-panel name="requestes" class="q-pa-none">
              <Rejected />
            </q-tab-panel>
            <q-tab-panel name="rejected" class="q-pa-none">
              <Requests />
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </q-page>
    <Evaluation />
  </div>
</template>

<script>
import Approved from "components/admin/company/Approved";
import Rejected from "components/admin/company/Rejected";
import Requests from "components/admin/company/Requests";
import Evaluation from "components/admin/company/Evaluation";
export default {
  data() {
    return {
      panel: "approved",
    };
  },
  components: { Approved, Rejected, Requests, Evaluation },
};
</script>

<style>
</style>