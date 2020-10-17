<template>
  <q-page class="q-gutter-y-md q-pb-xl" role="feed">
    <!-- content -->

    <div class="row justify-center q-pb-xl">
      <div class="col-12 col-md-11" role="grid">
        <!-- sec 6 -->
        <div v-if="myStories.length">
          <div class="row">
            <div
              ref="item"
              class="col-12 col-md-4 q-pa-sm"
              v-for="store in myStories"
              :key="store.key"
            >
              <Store :store="store" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="user">
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.iconVar"
        :class="darkModeConf.textBtn"
        role="link"
        lang="pt-PT"
        aria-label="Adicionar produto ou serviço"
        to="/profile/store/add"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { Loading } from "quasar"
import { firebaseAuth, firestoreDB, fireStorage } from "boot/firebase"
import offline from "v-offline"
import Store from "components/profile/Store.vue"

export default {
  // name: 'PageName',
  components: {
    Store,
  },
  data() {
    return {
      tab: "bio",
      confirDeleteSuccess: false,
      confirDelete: false,
      confirDeleteAux: false,
      isPublic: true,
      storeDel: {
        title: "",
        key: null,
      },
      storiesAply: [],
      myStories: [],
      myStoriesAux: [],
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("settings", ["getFont", "getVibrate"]),
    ...mapGetters("auth", ["user", "userData"]),
  },
  methods: {
    ...mapActions("store", [
      "listStore",
      "listStoreMy",
      "createStore",
      "detailStore",
      "updateStore",
      "deleteStore",
    ]),
    ...mapActions("auth", ["detailUser", "checkAuthUser"]),

    // handleHold({ ...info }) {
    // },

    listStoreMyHere(user) {
      // done
      var storageRef = fireStorage.ref()
      if (!offline.data().isOnline) {
        return alert("Sem internet")
      }
      const vm = this
      var myStories = []
      var update = false
      var myStoriesAux = []
      const ref = firestoreDB.collection("stories")
      ref.where("user", "==", user).onSnapshot(function (querySnapshot) {
        if (vm.myStories.length !== querySnapshot.docs.length) {
          update = true
          myStories = []
          querySnapshot.forEach(function (doc) {
            myStories.push({
              key: doc.id,
              title: doc.data().title,
              user: doc.data().user,
              description: doc.data().description,
              img: doc.data().img,
              public: doc.data().public,
              category: doc.data().category,
              place: doc.data().place,
              subCategory: doc.data().subCategory,
              price: doc.data().price,
              priceVariable: doc.data().priceVariable,
              timeSend: doc.data().timeSend,
            })
          })
          if (update) vm.myStories = myStories
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
    this.listStoreMyHere(this.user.email)
  },
  mounted() {
    // this.listStoreMy(this.user.email)

    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit("textToSpeechRouter", "Seus produtos e serviços")
  },
}
</script>
