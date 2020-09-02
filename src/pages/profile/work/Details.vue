<template>
  <q-page class="q-pt-lg">
    <!-- content -->
    <div class="q-mt-lg row justify-center">
      <div class="col-md-8 col-12">
        <div
          v-if="$q.screen.gt.sm"
          class="shadow-2"
        >
          <q-tabs
            v-model="tab"
            align="justify"
          >
            <q-tab
              name="details"
              label="Detalhes"
            />
            <q-tab
              name="aplayed"
              label="Candidatos"
            />
          </q-tabs>
        </div>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
        >
          <q-tab-panel
            name="details"
            style="padding: 0;"
          >
            <q-card
              bordered
              class="my-card col-sm-12"
            >
              <q-img
                v-if="getVacancy.img"
                :src="getVacancy.img"
                style="min-height: 200px;"
              />
              <q-card-section>
                <div :class="getFont.title">{{ getVacancy.title }}</div>
              </q-card-section>
              <q-card-section class="row q-pt-none">
                <div class="col text-center">
                  <q-icon
                    :color="darkModeConf.iconVar"
                    name="place"
                    size="lg"
                  />
                </div>
                <div
                  class="col-10"
                  :class="getFont.text"
                >{{ getVacancy.place }}</div>
              </q-card-section>
              <q-card-section class="row q-pt-none">
                <div class="col text-center">
                  <q-icon
                    :color="darkModeConf.iconVar"
                    name="filter_list"
                    size="lg"
                  />
                </div>
                <div
                  class="col-10"
                  :class="getFont.text"
                >{{ getVacancy.category }}</div>
              </q-card-section>
              <q-card-section class="row q-pt-none">
                <div
                  class="col-12"
                  :class="getFont.text"
                  v-html="getVacancy.description"
                ></div>
              </q-card-section>
            </q-card>
          </q-tab-panel>

          <q-tab-panel
            name="aplayed"
            style="padding: 0;"
          >
            <div
              class="q-pa-sm"
              v-for="candidate in candidates"
              :key="candidate.id"
            >
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  @click="detailUser(candidate)"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-img :src="candidate.photoURL" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div
                      class="text-bold"
                      :class="getFont.text"
                    >{{ candidate.displayName}}</div>
                    <div>{{ candidate.profession }}</div>
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
    </div>

    <q-page-sticky
      expand
      position="top"
      :class="darkModeConf.bgColor"
    >
      <div
        v-if="!$q.screen.gt.sm"
        class="shadow-2"
        style="width: 100vw;"
      >
        <q-tabs
          v-model="tab"
          align="justify"
        >
          <q-tab
            name="details"
            label="Detalhes"
          />
          <q-tab
            name="aplayed"
            label="Candidatos"
          />
        </q-tabs>
      </div>
      <!-- <div v-else class="row justify-center" style="width: 80vw;">
        <div class="shadow-2 col-8">
          <q-tabs v-model="tab" align="justify">
            <q-tab name="details" label="Detalhes" />
            <q-tab name="aplayed" label="Candidatos" />
          </q-tabs>
        </div>
      </div>-->
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
import offline from "v-offline";
export default {
  // name: 'PageName',
  data () {
    return {
      tab: "details",
      candidates: []
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancies", "vacancyDtl"]),
    ...mapGetters("vacancy", ["getVacancies", "getVacancy"]),
    ...mapGetters("settings", ["getFont"])
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
    getCandidates () {
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      const ref = firestoreDb
        .collection("vacancies")
        .doc(this.$route.params.id)
        .collection("candidates");
      var candidates = [];
      ref.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          candidates.push({
            id: doc.id,
            photoURL: doc.data().photoURL,
            displayName: doc.data().displayName,
            phoneNumber: doc.data().phoneNumber,
            email: doc.data().email,
            address: doc.data().address,
            profession: doc.data().profession,
            education: doc.data().education,
            date: doc.data().date
          });
        });
        vm.candidates = candidates;
      });
    },
    yearsOld (date) {
      var today = new Date();
      return (
        today.getFullYear() -
        parseInt(date.split("/")[date.split("/").length - 1])
      );
    }
  },
  created () {
    // this.listVacancy()
    this.getCandidates();
    this.detailVacancy(this.$route.params.id);
  }
};
</script>
