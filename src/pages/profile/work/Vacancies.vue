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
              v-for="(vacancy, idx) in myVacancies"
              :key="vacancy.key"
            >
              <q-card class="my-card">
                <q-img v-ripple v-if="vacancy.img" :src="vacancy.img" style="min-height: 200px;" @click="$router.push('/profile/vacancies/details/'+vacancy.key)" />
                <q-skeleton v-else height="230px" square />
                <q-card-section :class="getFont.title">{{ vacancy.title }}</q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    outline
                    rounded
                    label="Detalhes"
                    icon="details"
                    :to="'/profile/vacancy/details/'+vacancy.key"
                  />
                  <q-btn outline rounded icon="edit" :to="'/profile/vacancy/edit/'+vacancy.key" />
                  <q-btn
                    outline
                    rounded
                    color="red"
                    icon="delete"
                    @click="vacancyDtlFunc(vacancy.key)"
                  />
                  <q-btn
                    outline
                    rounded
                    :icon="myVacanciesAux[idx] ? (myVacanciesAux[idx].public ? 'visibility' : 'visibility_off') : 'visibility_off'"
                    @click="makePublic(vacancy.key, vacancy, myVacanciesAux[idx].public)"
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

            <q-card-section class="q-pt-none" :class="getFont.text">Deletar vaga de {{ vacancyDtl.title }}?</q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                rounded
                outline
                color="red"
                label="Deletar"
                @click="deleteVacancyThis(vacancyDtl.key)"
              />
              <q-btn rounded outline color="grey" label="Cancelar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirDeleteSuccess">
          <q-card>
            <q-card-section class="text-green" :class="getFont.title">Vaga deletada com sucesso</q-card-section>

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
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "bio",
      confirDeleteSuccess: false,
      confirDelete: false,
      confirDeleteAux: false,
      isPublic: true,
      vacancyDel: {
        title: "",
        key: null
      },
      vacanciesAply: [],
      myVacancies: [],
      myVacanciesAux: []
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", [
      "vacancies",
      "vacancyDtl",
      "vacancyDeleted",
      "vacancyUploaded",
      "vacancyDetail"
    ]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user", "userData"])
  },
  methods: {
    ...mapActions("vacancy", [
      "listVacancy",
      "listVacancyMy",
      "createVacancy",
      "detailVacancy",
      "updateVacancy",
      "deleteVacancy"
    ]),
    ...mapActions("auth", ["detailUser", "checkAuthUser"]),

    handleHold ({ ...info }) {
      console.log(info)
      // console.log(evt)
      // console.log(val)
      // console.log(this.vacancy)
    },

    deleteVacancyThis(id) {
      const vm = this;

      this.deleteVacancy(id).then(function() {
        vm.confirDeleteAux = false;
        vm.confirDelete = false;
      });
    },

    vacancyDtlFunc(id) {
      console.log(id);
      this.detailVacancy(id);
      console.log("Nelzio Sitoe delll");
    },

    updateVacancyHere(payload) {
      Loading.show();
      const updateRef = firestoreDb.collection("vacancies").doc(payload.id);
      updateRef
        .set(payload.data)
        .then(() => {
          this.listVacancyMyHere(this.user.email);
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
        place: data.place,
        category: data.category,
        validate: data.validate,
        public: !val
      };
      this.updateVacancyHere({
        id: id,
        data: dataAux
      });
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
      var myVacanciesAux = [];
      const ref = firestoreDb.collection("vacancies");
      ref.where("user", "==", user).onSnapshot(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (vm.myVacancies.length !== querySnapshot.docs.length) {
              update = true
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
            }
            myVacanciesAux.push({
              public: doc.data().public
            });
          });
          if (update) vm.myVacancies = myVacancies
          vm.myVacanciesAux = myVacanciesAux;
        });
    }
  },
  created() {
    this.checkAuthUser();
    this.detailUser(this.user.email);
    this.listVacancyMyHere("nelziositoe@gmail.com");
  },
  mounted() {
    // this.listVacancyMy(this.user.email)
    // this.listVacancyMyHere(this.user.email);
  },
  watch: {
    vacancyDetail() {
      if (this.vacancyDetail) {
        this.confirDelete = true;
      }
    },
    vacancyDeleted() {
      if (this.vacancyDeleted) {
        this.confirDeleteSuccess = true;
        this.listVacancyMy(this.user.email);
      }
    },
    vacancyUploaded() {
      this.listVacancyMy(this.user.email);
    }
  }
};
</script>
