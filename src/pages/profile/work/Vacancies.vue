<template>
  <q-page class="q-gutter-y-md q-pb-xl">
    <!-- content -->

    <div class="row justify-center q-pb-xl">
      <div class="col-12 col-md-11">
        <!-- sec 6 -->
        <div v-if="myVacancies.length">
          <div class="row" role="group">
            <div
              ref="item"
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

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      v-if="user && userData.profileType == 'organization'"
    >
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.iconVar"
        :class="darkModeConf.textBtn"
        to="/profile/vacancy/add"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { Loading } from "quasar"
import { firebaseAuth, firestoreDB, fireStorage } from "boot/firebase"
import offline from "v-offline"
import Vacancy from "components/profile/Vacancies.vue"
export default {
  // name: 'PageName',
  components: {
    Vacancy,
  },
  data() {
    return {
      tab: "bio",
      myVacancies: [],
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user", "userData"]),
  },
  methods: {
    ...mapActions("auth", ["detailUser", "checkAuthUser"]),

    handleHold({ ...info }) {
      console.log(info)
      // console.log(evt)
      // console.log(val)
      // console.log(this.vacancy)
    },

    listVacancyMyHere(user) {
      // done
      var storageRef = fireStorage.ref()
      if (!offline.data().isOnline) {
        return alert("Sem internet")
      }
      const vm = this
      var myVacancies = []
      var update = false
      const ref = firestoreDB.collection("vacancies")
      ref.where("user", "==", user).onSnapshot(function (querySnapshot) {
        if (vm.myVacancies.length !== querySnapshot.docs.length) {
          myVacancies = []
          update = true
          querySnapshot.forEach(function (doc) {
            myVacancies.push({
              key: doc.id,
              approved: doc.data().approved,
              numVacancies: doc.data().numVacancies,
              title: doc.data().title,
              user: doc.data().user,
              description: doc.data().description,
              img: doc.data().img,
              public: doc.data().public,
              place: doc.data().place,
              validate: doc.data().validate,
              category: doc.data().category,
              timeSend: doc.data().timeSend,
            })
          })
          if (update) vm.myVacancies = myVacancies
        }
      })
    },

    lazeItems() {
      if (!(this.itemsLayzeRef == this.$refs.item)) {
        this.itemsLayzeRef = this.$refs.item
      }
      let active = false
      if (active === false && this.itemsLayzeRef) {
        active = true
        this.itemsLayzeRef.forEach(function (item) {
          var position =
            window.innerHeight - item.getBoundingClientRect().bottom
          var interval1 = item.getBoundingClientRect().top - 55
          var interval2 = item.getBoundingClientRect().top + 55
          if (position <= interval2 && position >= interval1) {
            // setTimeout(function() {
            navigator.vibrate(350)
            window.navigator.vibrate(350)
            // console.log("Workkkk")
            // }, 200)
          }
        })
        active = false
      }
    },
  },
  created() {
    this.checkAuthUser()
    this.detailUser(this.user.email)
    this.listVacancyMyHere(this.user.email)
  },
  mounted() {
    // this.listVacancyMy(this.user.email)
    // this.listVacancyMyHere(this.user.email);
  },
}
</script>
