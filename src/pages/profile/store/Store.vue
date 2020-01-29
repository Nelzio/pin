<template>
  <q-page class="q-gutter-y-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec 6 -->
        <div v-if="myStories.length">
          <div class="row">
            <div
              class="col-12 col-md-4 q-pa-sm"
              v-for="(store, idx) in myStories"
              :key="store.key"
            >
              <q-card class="my-card">
                <q-img v-ripple v-if="store.img" :src="store.img" style="min-height: 200px;" @click="$router.push('/profile/store/details/'+store.key)" />
                <q-skeleton v-else height="230px" square />
                <q-card-section :class="getFont.title">{{ store.title }}</q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    outline
                    rounded
                    label="Detalhes"
                    icon="details"
                    :to="'/profile/store/details/'+store.key"
                  />
                  <q-btn outline rounded icon="edit" :to="'/profile/store/edit/'+store.key" />
                  <q-btn
                    outline
                    rounded
                    color="red"
                    icon="delete"
                    @click="storeDtlFunc(store.key)"
                  />
                  <q-btn
                    outline
                    rounded
                    :icon="myStoriesAux[idx] ? (myStoriesAux[idx].public ? 'visibility' : 'visibility_off') : 'visibility_off'"
                    @click="makePublic(store.key, store, myStoriesAux[idx].public)"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div>
        <q-dialog v-model="confirDelete">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div :class="getFont.title">Confirmar</div>
            </q-card-section>

            <q-card-section class="q-pt-none" :class="getFont.text">Deletar {{ storeDtl.title }}?</q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                rounded
                outline
                color="red"
                label="Deletar"
                @click="deleteStoreThis(storeDtl.key)"
              />
              <q-btn rounded outline color="grey" label="Cancelar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirDeleteSuccess">
          <q-card>
            <q-card-section class="text-green" :class="getFont.title">Deletado com sucesso</q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>

      <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="user">
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.color"
        :class="darkModeConf.textBtn"
        to="/profile/store/add"
      />
    </q-page-sticky>

      
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Loading } from "quasar";
import { firebaseAuth, firestoreDb, fireStorage } from "boot/firebase";
import offline from "v-offline";
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "bio",
      confirDeleteSuccess: false,
      confirDelete: false,
      confirDeleteAux: false,
      isPublic: true,
      storeDel: {
        title: "",
        key: null
      },
      storiesAply: [],
      myStories: [],
      myStoriesAux: []
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("store", [
      "stories",
      "storeDtl",
      "storeDeleted",
      "storeUploaded",
      "storeDetail"
    ]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user", "userData"])
  },
  methods: {
    ...mapActions("store", [
      "listStore",
      "listStoreMy",
      "createStore",
      "detailStore",
      "updateStore",
      "deleteStore"
    ]),
    ...mapActions("auth", ["detailUser", "checkAuthUser"]),

    handleHold ({ ...info }) {
      console.log(info)
      // console.log(evt)
      // console.log(val)
      // console.log(this.store)
    },

    deleteStoreThis(id) {
      const vm = this;

      this.deleteStore(id).then(function() {
        vm.confirDeleteAux = false;
        vm.confirDelete = false;
      });
    },

    storeDtlFunc(id) {
      console.log(id);
      this.detailStore(id);
      console.log("Nelzio Sitoe delll");
    },

    updateStoreHere(payload) {
      Loading.show();
      const updateRef = firestoreDb.collection("stories").doc(payload.id);
      updateRef
        .set(payload.data)
        .then(() => {
          payload
          this.listStoreMyHere(this.user.email);
          Loading.hide();
        })
        .catch(error => {
          Loading.hide();
          alert("Error update document: ", error);
        });
    },

    makePublic(id, data, val) {
      let dataAux = {
        title: data.title,
        user: data.user,
        description: data.description,
        img: data.img,
        public: !val,
        category: data.category,
        place: data.place,
        subCategory: data.subCategory,
        price: data.price,
        priceVariable: data.priceVariable,
      };
      this.updateStoreHere({
        id: id,
        data: dataAux
      });
    },

    listStoreMyHere(user) {
      // done
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      var myStories = []
      var update = false
      var myStoriesAux = [];
      const ref = firestoreDb.collection("stories");
      ref
        .where("user", "==", user)
        .onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (vm.myStories.length !== querySnapshot.docs.length) {
              update = true
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
              });
            }
            myStoriesAux.push({
              public: doc.data().public
            });
          });
          if(update) vm.myStories = myStories;
          vm.myStoriesAux = myStoriesAux;
        });
    }
  },
  created() {
    this.checkAuthUser();
    this.detailUser(this.user.email);
    this.listStoreMyHere(this.user.email);
  },
  mounted() {
    // this.listStoreMy(this.user.email)
  },
  watch: {
    storeDetail() {
      if (this.storeDetail) {
        this.confirDelete = true;
      }
    },
    storeDeleted() {
      if (this.storeDeleted) {
        this.confirDeleteSuccess = true;
        this.listStoreMy(this.user.email);
      }
    },
    storeUploaded() {
      this.listStoreMy(this.user.email);
    }
  }
};
</script>
