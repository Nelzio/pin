<template>
  <div>
    <div class="row">
      <div class="col-3 q-pa-md">
        <q-card class="my-card">
          <q-img
            src="statics/admin/baseline_people_black_36dp.png"
            alt
          >
            <div class="absolute-bottom absolute-top text-subtitle2 text-center">
              <div
                class="text-h3 text-bold"
                style="padding-top: 25%;"
              >{{ users }}</div>
            </div>
          </q-img>
          <q-card-section class="text-h5">Usuários</q-card-section>
          <q-card-actions align="left">
            <q-btn
              outline
              rounded
              color="primary"
              label="Ir para Usuários"
              to="/admin/users"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3 q-pa-md">
        <q-card class="my-card">
          <q-img
            src="statics/admin/baseline_business_black_36dp.png"
            alt
          >
            <div class="absolute-bottom absolute-top text-subtitle2 text-center">
              <div
                class="text-h3 text-bold"
                style="padding-top: 25%;"
              >{{ companies }}</div>
            </div>
          </q-img>
          <q-card-section class="text-h5">Empresas</q-card-section>
          <q-card-actions align="left">
            <q-btn
              outline
              rounded
              color="primary"
              label="Ir para Empresas"
              to="/admin/companies"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="col-3 q-pa-md">
        <q-card class="my-card">
          <q-img
            src="statics/admin/baseline_work_black_36dp.png"
            alt
          >
            <div class="absolute-bottom absolute-top text-subtitle2 text-center">
              <div
                class="text-h3 text-bold"
                style="padding-top: 25%;"
              >{{ vacancies }}</div>
            </div>
          </q-img>
          <q-card-section class="text-h5">Vagas</q-card-section>
          <q-card-actions align="left">
            <q-btn
              outline
              rounded
              color="primary"
              label="Ir para Vagas"
              to="/admin/vacancies"
            />
          </q-card-actions>
        </q-card>
      </div>
      <!-- <div class="col-3 q-pa-md">
        <q-card class="my-card">
          <q-img
            src="statics/admin/baseline_store_black_36dp.png"
            alt
          >
            <div class="absolute-bottom absolute-top text-subtitle2 text-center">
              <div class="text-h3 text-bold" style="padding-top: 25%;">{{ productAndServices }}</div>
            </div>
          </q-img>
          <q-card-section class="text-h5">Produtos e serviços</q-card-section>
          <q-card-actions align="right">
            <q-btn outline rounded color="primary" label="Ver usuários" />
            <q-btn outline rounded color="primary" label="Estatísticas" />
          </q-card-actions>
        </q-card>
      </div> -->
      <div class="col-3 q-pa-md">
        <q-card class="my-card">
          <q-img
            src="statics/admin/baseline_groups_black_18dp.png"
            alt
          >
            <div class="absolute-bottom absolute-top text-subtitle2 text-center">
              <div
                class="text-h3 text-bold"
                style="padding-top: 25%;"
              >{{ associations }}</div>
            </div>
          </q-img>
          <q-card-section class="text-h5">Associações</q-card-section>
          <q-card-actions align="left">
            <q-btn
              outline
              rounded
              color="primary"
              label="Ir para Associações"
              to="/admin/associations"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
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
      users: 0,
      companies: 0,
      vacancies: 0,
      productAndServices: 0,
      associations: 0
    };
  },
  methods: {
    getUsers () {
      const vm = this;
      let ref = firestoreDB.collection("users");
      ref.onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (doc.data().profileType == "organization") {
            vm.companies += 1;
          } else if (doc.data().profileType !== "admin") {
            vm.users += 1;
          }
        });
      });
    },
    getCompanies () { },
    getVacancies () {
      const vm = this;
      let ref = firestoreDB.collection("vacancies");
      ref.where("public", "==", true).onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.vacancies += 1;
        });
      });
    },
    getAssociations () {
      const vm = this;
      let ref = firestoreDB.collection("associations");
      ref.onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.associations += 1;
        });
      });
    },
    getPS () {
      const vm = this;
      let ref = firestoreDB.collection("stories");
      ref.where("public", "==", true).onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          vm.productAndServices += 1;
        });
      });
    },
  },
  mounted () {
    this.getUsers();
    this.getVacancies();
    this.getPS();
    this.getAssociations()
  },
};
</script>

<style>
</style>