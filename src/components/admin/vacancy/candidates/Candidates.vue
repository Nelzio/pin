<template>
  <div>
    <div class="row justify-center q-pt-lg">
      <div class="col-12">
        <q-toolbar class="text-primary shadow-1">
          <q-toolbar-title>Candidatos a vaga</q-toolbar-title>
          <q-space />
          <q-input
            outlined
            rounded
            bottom-slots
            v-model="valSearch"
            label="Pesquise candidato"
            @input="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="valSearch !== ''"
                name="close"
                @click="valSearch = ''"
                class="cursor-pointer"
              />
              <q-icon name="search" />
            </template>
          </q-input>
        </q-toolbar>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-12">
        <div
          v-if="valSearch"
          class="row"
        >
          <div
            class="col-3 q-pa-sm"
            v-for="candidate in data_search"
            :key="candidate.id"
          >
            <q-card
              @click="emitUser(candidate.id)"
              class="my-card text-center"
            >
              <q-img
                :src="candidate.photoURL"
                spinner-color="white"
                style="max-height:220px"
              />
              <q-avatar
                v-if="!candidate.evaluators.length"
                rounded
                color="grey"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="check"
              />
              <q-avatar
                v-else-if="isApproved(candidate)"
                rounded
                color="primary"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="done_all"
              />
              <q-avatar
                v-else
                rounded
                color="red"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="close"
              />

              <q-card-section class="text-subtitle1">
                {{ candidate.displayName }}
                <div class="text-body1">{{ candidate.email }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div
          v-else
          class="row"
        >
          <div
            class="col-3 q-pa-sm"
            v-for="candidate in candidates"
            :key="candidate.id"
          >
            <q-card
              @click="emitUser(candidate.id)"
              class="my-card text-center"
            >
              <q-img
                :src="candidate.photoURL"
                spinner-color="white"
                style="max-height:220px"
              />
              <q-avatar
                v-if="!candidate.evaluators.length"
                rounded
                color="grey"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="check"
              />
              <q-avatar
                v-else-if="isApproved(candidate)"
                rounded
                color="primary"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="done_all"
              />
              <q-avatar
                v-else
                rounded
                color="red"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="close"
              />

              <q-card-section class="text-subtitle1">
                {{ candidate.displayName }}
                <div class="text-body1">{{ candidate.email }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="primary"
      size="10px"
      skip-hijack
    />
  </div>
</template>

<script>
import { firestoreDB } from "boot/firebase";
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      valSearch: "",
      data_search: [],
      candidates: [],
      numCandidatesApproved: [],
    };
  },
  computed: {
    ...mapGetters("admin", ["vacancy"]),
  },
  methods: {
    isApproved (candidate) {
      for (let index = 0; index < this.numCandidatesApproved.length; index++) {
        const element = this.numCandidatesApproved[index];
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
      this.numCandidatesApproved = [];
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
          if (numVacancies > vm.numCandidatesApproved.length) {
            vm.numCandidatesApproved.push(candidate);
            listPunctuation.push(numEvaluate)
          } else {
            // change users approved by punctuation
            var auxIndex = 0;
            var iterate = true; // to allow get in IF bloc of iterator of list punctuation.
            var makeChange = false; // not allow change
            for (let index = 0; index < listPunctuation.length; index++) {
              const punctuation = listPunctuation[index];
              if (numEvaluate > punctuation && iterate) {
                auxIndex = index; // store index of listPunctuation and numCandidatesApproved
                iterate = false; // to block get in IF bloc of iterator of list punctuation.
                makeChange = true; // allow change
              }
            }
            // change users and punctuation
            if (makeChange) {
              listPunctuation[auxIndex] = numEvaluate
              vm.numCandidatesApproved[auxIndex] = candidate
            }
          }
        }
      });
    },
    getCandidates () {
      const vm = this;
      var load = true
      this.$refs.bar.start()
      if (this.vacancy.id) {
        const ref = firestoreDB
          .collection("vacancies")
          .doc(this.vacancy.id)
          .collection("candidates");
        ref.onSnapshot((docs) => {
          let candidates = [];
          docs.forEach((doc) => {
            var data = doc.data();
            data["id"] = doc.id;
            candidates.push(data);
          });
          vm.candidateEvaluateStatus(candidates, vm.vacancy.numVacancies);
          vm.candidates = candidates;
          if (load) vm.$refs.bar.stop();
          load = false
        });
      }
    },
    search (valSearch) {
      if (valSearch != "") {
        var temp = new RegExp(".*" + valSearch + ".*");
        var items = [];
        var candidates = this.candidates;
        for (var i in candidates) {
          var name = candidates[i]["displayName"].match(temp);
          var email = candidates[i]["email"].match(temp);
          if (name != null) {
            if (candidates[i]["displayName"] == name[0]) {
              items.push(candidates[i]);
            }
          } else if (email != null) {
            if (candidates[i]["email"] == email[0]) {
              items.push(candidates[i]);
            }
          }
        }
        this.data_search = items.slice(0, 2);
      } else {
        this.data_search = [];
      }
    },
    emitUser (user) {
      this.$root.$emit("userCandidature", user);
    },
  },
  mounted () {
    this.getCandidates();
  },
  watch: {
    // candidates(val) {
    //   console.log(val)
    //   console.log(this.numCandidatesApproved)
    // }
  },
};
</script>

<style>
</style>