<template>
  <q-page class="q-pt-lg">
    <!-- content -->
    <div class="q-mt-lg">
      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="details" style="padding: 0;">
          <q-card bordered class="my-card col-sm-12">
            <q-img v-if="getVacancy.img" :src="getVacancy.img" style="min-height: 200px;" />
            <q-card-section>
              <div class="text-h6">{{ getVacancy.title }}</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section class="row">
              <div class="col text-center">
                <q-icon name="arrow_forward_ios" />
              </div>
              <div class="col-11 text-body1">{{ getVacancy.description }}</div>
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="aplayed" style="padding: 0;">
          <div class="q-pa-sm" v-for="candidate in candidates" :key="candidate.id">
            <q-card class="my-card">
              <q-item :class="darkModeConf.textColor" clickable @click="detailUser(candidate)" v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="candidate.photoURL" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div class="text-bold">{{ candidate.displayName}}</div>
                  <div>{{ candidate.profission }}</div>
                </q-item-section>
                <q-item-section side>
                  <div class="text-black">{{ yearsOld(candidate.date) }}</div>
                  <div>anos</div>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <q-page-sticky expand position="top" :class="darkModeConf.bgColor">
      <div class="shadow-2" style="width: 100vw;">
        <q-tabs v-model="tab" align="justify">
          <q-tab name="details" label="Detalhes" />
          <q-tab name="aplayed" label="Candidatos" />
        </q-tabs>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
import offline from "v-offline";
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "details",
      candidates: []
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancies", "vacancyDtl"]),
    ...mapGetters("vacancy", ["getVacancies", "getVacancy"])
  },
  methods: {
    ...mapActions("vacancy", [
      "listVacancy",
      "createVacancy",
      "detailVacancy",
      "updateVacancy",
      "deleteVacancy"
    ]),
    ...mapActions("user", ["detailUser"]),
    getCandidates() {
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this
      const ref = firestoreDb
        .collection("vacancies")
        .doc(this.$route.params.id)
        .collection("candidates");
      var candidates = [];
      ref.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          candidates.push({
            id: doc.id,
            photoURL: doc.data().photoURL,
            displayName: doc.data().displayName,
            telephone: doc.data().telephone,
            email: doc.data().email,
            adress: doc.data().adress,
            profission: doc.data().profission,
            education: doc.data().education,
            date: doc.data().date
          });
        });
        vm.candidates = candidates;
      });
    },
    yearsOld (date) {
      var today = new Date()
      return today.getFullYear() - parseInt(date.split("/")[date.split("/").length -1 ])
    }
  },
  created() {
    // this.listVacancy()
    this.getCandidates();
    this.detailVacancy(this.$route.params.id);
  }
};
</script>
