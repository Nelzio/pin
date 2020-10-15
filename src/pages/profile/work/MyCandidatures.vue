<template>
  <q-page class="q-gutter-y-md q-pt-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-11">
        <div v-if="vacanciesAply" class="row">
          <div
            class="q-pa-sm col-12 col-md-4"
            v-for="candidate in vacanciesAply"
            :key="candidate.id"
          >
            <q-card
              class="my-card"
              @click="$router.push('/vacancies/details/' + candidate.id)"
              v-ripple
            >
              <q-img :src="candidate.img" />
              <q-card-section>
                <div :class="getFont.title">{{ candidate.title }}</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  rounded
                  outline
                  :color="darkModeConf.iconVar"
                  icon="details"
                  label="Detalhes"
                  :to="'/vacancies/details/' + candidate.id"
                  role="button"
                  lang="pt-PT"
                  :aria-label="
                    'Clicar para ir a página de detalhes da vaga de ' +
                    candidate.title
                  "
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { firestoreDB } from "boot/firebase"
export default {
  // name: 'PageName',
  data() {
    return {
      vacanciesAply: [],
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user", "userData"]),
  },
  methods: {
    listCandidatures(user) {
      // done
      this.vacanciesAply = []
      const ref = firestoreDB.collection("vacancies")
      var vacanciesAply = []
      var count = 0
      const vm = this
      ref
        .where("public", "==", true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            count += 1
            firestoreDB
              .collection("vacancies")
              .doc(doc.id)
              .collection("candidates")
              .doc(user)
              .get()
              .then((doc2) => {
                if (doc2.exists) {
                  vm.vacanciesAply.push({
                    id: doc.id,
                    title: doc.data().title,
                    user: doc.data().user,
                    img: doc.data().img,
                  })
                  // if (count == 3) return;
                }
              })
          })
        })
    },
  },
  created() {},
  mounted() {
    this.listCandidatures(this.user.email)
  },
}
</script>
