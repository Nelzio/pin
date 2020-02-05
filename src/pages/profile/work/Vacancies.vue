<template>
  <q-page class="q-gutter-y-md q-pb-xl">
    <!-- content -->

    <div class="row justify-center q-pb-xl">
      <div class="col-12 col-md-8">
        <!-- sec 6 -->
        <div v-if="myVacancies.length">
          <div class="row">
            <div
              class="col-12 col-md-4 q-pa-sm"
              v-for="vacancy in myVacancies"
              :key="vacancy.key"
            >
              <Vacancy :vacancy="vacancy" />
            </div>
          </div>
        </div>
      </div>
    </div>


    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="user">
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.color"
        :class="darkModeConf.textBtn"
        to="/profile/vacancy/add"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Loading } from "quasar";
import { firebaseAuth, firestoreDb, fireStorage } from "boot/firebase";
import offline from "v-offline";
import Vacancy from "components/profile/Vacancies.vue"
export default {
  // name: 'PageName',
  components: {
    Vacancy
  },
  data() {
    return {
      tab: "bio",
      myVacancies: [],
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user", "userData"])
  },
  methods: {
    ...mapActions("auth", ["detailUser", "checkAuthUser"]),

    handleHold ({ ...info }) {
      console.log(info)
      // console.log(evt)
      // console.log(val)
      // console.log(this.vacancy)
    },

    listVacancyMyHere(user) {
      // done
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      var myVacancies = []
      var update = false
      const ref = firestoreDb.collection("vacancies");
      ref.where("user", "==", user).onSnapshot(function(querySnapshot) {
        if (vm.myVacancies.length !== querySnapshot.docs.length) {
          myVacancies = []
          update = true
          querySnapshot.forEach(function(doc) {
              myVacancies.push({
                key: doc.id,
                title: doc.data().title,
                user: doc.data().user,
                description: doc.data().description,
                img: doc.data().img,
                public: doc.data().public,
                place: doc.data().place,
                validate: doc.data().validate,
                category: doc.data().category
              });
            });
            if (update) vm.myVacancies = myVacancies
          }
        });
    }
  },
  created() {
    this.checkAuthUser();
    this.detailUser(this.user.email);
    this.listVacancyMyHere(this.user.email);
  },
  mounted() {
    // this.listVacancyMy(this.user.email)
    // this.listVacancyMyHere(this.user.email);
  },
};
</script>
