<template>
  <q-page class="q-gutter-y-md q-pt-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">

        <div v-if="vacanciesAply">
          <div class="q-pa-sm" v-for="candidate in vacanciesAply" :key="candidate.id">
            <q-card class="my-card" @click="$router.push('/vacancies/details/' + candidate.id)" v-ripple>
                <img :src="candidate.img" />
                <q-card-section>
                    <div :class="getFont.title">{{ candidate.title }}</div>
                </q-card-section>
              </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase"
export default {
  // name: 'PageName',
  data() {
    return {
      vacanciesAply: []
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters('auth', [
        'user', 'userData'])
    
  },
  methods: {
    listCandidatures(user) { // done
      this.vacanciesAply = []
      const ref = firestoreDb.collection('vacancies')
      var vacanciesAply = []
      var count = 0
      const vm = this
      ref.where("public", "==", true)
        .get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            count += 1
            firestoreDb.collection('vacancies').doc(doc.id).collection("candidates").doc(user).get().then((doc2) => {
                if (doc2.exists) {
                  vm.vacanciesAply.push({
                    id: doc.id,
                    title: doc.data().title,
                    user: doc.data().user,
                    img: doc.data().img
                  })
                  if (count == 3) return
                }
            });
          });
        });
    },
  },
  created () {
    
  },
  mounted() {
    this.listCandidatures(this.user.email)
  },
};
</script>
