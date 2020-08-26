<template>
  <div>
    <div class="row justify-center q-pt-lg">
      <div class="col-8">
        <q-toolbar class="text-primary shadow-1">
          <q-toolbar-title>Candidatos a vaga</q-toolbar-title>
        </q-toolbar>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-8">
        <div class="row">
          <div class="col-4 q-pa-sm" v-for="candidate in candidates" :key="candidate.id">
            <q-card @click="emitUser(candidate.id)" class="my-card text-center">
              <q-img :src="candidate.photoURL" spinner-color="white" style="max-height:220px" />

              <q-avatar
                v-if="candidate.status == 'approved'"
                rounded
                color="primary"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="done_all"
              />
              <q-avatar
                v-else-if="candidate.status == 'rejected'"
                rounded
                color="red"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="close"
              />
              <q-avatar
                v-else
                rounded
                color="grey"
                class="absolute"
                size="md"
                style="top: 0; right: 12px; transform: translateY(10%);"
                text-color="white"
                icon="check"
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
  </div>
</template>

<script>
import { firestoreDb } from "boot/firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      candidates: [],
    };
  },
  computed: {
    ...mapGetters("admin", ["vacancyId"]),
  },
  methods: {
    getCandidates() {
      const vm = this;
      this.candidates = [];
      if (this.vacancyId) {
        const ref = firestoreDb
          .collection("vacancies")
          .doc(this.vacancyId)
          .collection("candidates");
        ref.get().then((docs) => {
          docs.forEach((doc) => {
            var data = doc.data()
            data["id"] = doc.id
            vm.candidates.push(data);
          });
          // console.log(vm.candidates);
        });
      }
    },
    emitUser(user) {
      this.$root.$emit("userCandidature", user);
    },
  },
  mounted() {
    this.getCandidates();
  },
};
</script>

<style>
</style>