<template>
  <q-page class="q-pt-lg">
    <!-- content -->
    <div class="q-mt-lg row justify-center">
      <div class="col-md-8 col-12">
        <div
          v-if="$q.screen.gt.sm"
          class="shadow-2"
          role="tablist"
        >
          <q-tabs
            v-model="tab"
            align="justify"
            role="tab"
          >
            <q-tab
              name="details"
              label="Detalhes"
              role="tab"
            />
            <q-tab
              name="aplayed"
              label="Candidatos"
              role="tab"
            />
          </q-tabs>
        </div>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          role="group"
        >
          <q-tab-panel
            name="details"
            style="padding: 0;"
            role="tabpanel"
          >
            <q-card
              bordered
              class="my-card col-sm-12"
            >
              <q-img
                v-if="getVacancy.img"
                :src="getVacancy.img"
                style="min-height: 200px;"
                role="img"
                alt="Imagem da vaga"
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
            role="tabpanel"
            lang="pt-PT"
            aria-label="Painel de candidatos"
          >
            <div
              class="q-pa-sm"
              v-for="candidate in candidatesApproved"
              :key="candidate.id"
            >
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  @click="detailUser(candidate)"
                  role="listitem"
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
          role="tab"
        >
          <q-tab
            name="details"
            label="Detalhes"
            role="tab"
          />
          <q-tab
            name="aplayed"
            label="Candidatos"
            role="tab"
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
import { firestoreDB } from "boot/firebase";
import offline from "v-offline";
export default {
  // name: 'PageName',
  data () {
    return {
      tab: "details",
      candidates: [],
      candidatesApproved: []
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
      const ref = firestoreDB
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
            date: doc.data().date,
            address: doc.data().address,
            access: doc.data().access,
            association: doc.data().association,
            deficiency: doc.data().deficiency,
            description: doc.data().description,
            evaluators: doc.data().evaluators,
            gender: doc.data().gender,
            place: doc.data().place,
            profileType: doc.data().profileType,
            registrationDate: doc.data().registrationDate,
            submittedDate: doc.data().submittedDate
          });
        });
        vm.candidates = candidates;
      });
    },
    isApproved (candidate) {
      for (let index = 0; index < this.candidatesApproved.length; index++) {
        const element = this.candidatesApproved[index];
        if (element.id == candidate.id) {
          return true;
        }
      }
      return false;
    },
    candidateEvaluateStatus (candidates, numVacancies) {
      const vm = this;
      let lastNumEvaluate = 0;
      let listPunctuation = []
      this.candidatesApproved = [];
      // make foreach in candidates list
      candidates.forEach((candidate) => {
        // verify if candidate it is in approved list
        if (!vm.isApproved(candidate)) {
          // calculate punctuation
          var numEvaluate = 0;
          candidate.evaluators.forEach((val) => {
            numEvaluate += val.punctuation;
          });
          // make push elements if have vacancies
          if (numVacancies > vm.candidatesApproved.length) {
            vm.candidatesApproved.push(candidate);
            listPunctuation.push(numEvaluate)
          } else {
            // change users approved by punctuation
            var auxIndex = 0;
            var iterate = true; // to allow get in IF bloc of iterator of list punctuation.
            var makeChange = false; // not allow change
            for (let index = 0; index < listPunctuation.length; index++) {
              const punctuation = listPunctuation[index];
              if (numEvaluate > punctuation && iterate) {
                auxIndex = index; // store index of listPunctuation and candidatesApproved
                iterate = false; // to block get in IF bloc of iterator of list punctuation.
                makeChange = true; // allow change
              }
            }
            // change users and punctuation
            if (makeChange) {
              listPunctuation[auxIndex] = numEvaluate
              vm.candidatesApproved[auxIndex] = candidate
            }
          }
        }
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
  },
  watch: {
    candidates (val) {
      if (Object.keys(this.getVacancy)) {
        this.candidateEvaluateStatus(val, this.getVacancy.numVacancies)
      }
    },
    getVacancy (val) {
      if (this.candidates) {
        this.candidateEvaluateStatus(this.candidates, val.numVacancies)
      }
    },
  }
};
</script>
