<template>
  <q-page
    class="q-gutter-y-md q-pt-md"
    v-touch-swipe.mouse.left.right="handleSwipe"
    v-touch-hold:600.mouse="handleHold"
  >
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img :src="user.photoURL" spinner-color="white" />
          </q-avatar>

          <div :class="getFont.title">{{ user.displayName }}</div>
          <!-- <div class="text-caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi unde vitae eaque labore
          </div>-->
        </div>

        <q-separator />
        <!-- sec2 -->
        <div class="row text-center justify-center">
          <q-card class="col-12">
            <q-tabs
              v-model="tab"
              dense
              :active-color="darkModeConf.color"
              :indicator-color="darkModeConf.color"
              class="text-grey"
              align="justify"
              narrow-indicator
            >
              <q-tab name="bio" label="Contacto" icon="contacts" />
              <q-tab name="ocupacao" label="Sobre" icon="assignment_ind" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="bio">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Telefone</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.phoneNumber }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Email</q-item-label>
                      <q-item-label :class="getFont.text">{{ user.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Endereço</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.adress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="ocupacao">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="calendar_today" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Data de nascimento</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="work" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Profissão</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.profission }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Formação</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.education }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>

        <!-- btn conect -->
        <div class="row justify-center q-pa-md">
          <!-- <q-btn rounded class="full-width" :color="darkModeConf.color" :class="darkModeConf.textBtn" label="Contactar" /> -->
          <q-btn
            rounded
            class="full-width"
            :color="darkModeConf.color"
            :class="darkModeConf.textBtn"
            label="Editar perfil"
            icon="edit"
            to="account/edit"
          />
        </div>

        <q-separator />

        <div v-if="vacanciesAply.length">
          <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
            <q-toolbar-title :class="getFont.title">Minhas candidaturas</q-toolbar-title>
          </q-toolbar>
          <div class="row">
            <div
              class="q-pa-sm col-12 col-md-4"
              v-for="candidate in vacanciesAply"
              :key="candidate.id"
            >
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  :to="'/vacancies/details/' + candidate.id"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <img :src="candidate.img" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-bold" :class="getFont.title">{{ candidate.title}}</div>
                    <div :class="getFont.text">{{ candidate.user }}</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todas" to="/profile/candidatures" />
          </div>
        </div>
        <!-- sec 6 -->

        <!-- asdasdasd -->

        <div v-if="!(vacancyNum == 0 && storeNum == 0)">
          <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
            <q-toolbar-title :class="getFont.title">Actividades</q-toolbar-title>
          </q-toolbar>
          <div class="row">
            <div v-if="vacancyNum > 0" class="q-pa-sm col-12 col-md-6">
              <q-card class="my-card">
                <q-item :class="darkModeConf.textColor" clickable to="/profile/vacancies" v-ripple>
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-icon name="work" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-bold" :class="getFont.text">{{ vacancyNum }} vagas de emprego.</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
            <div v-if="storeNum > 0" class="q-pa-sm col-12 col-md-6">
              <q-card class="my-card">
                <q-item :class="darkModeConf.textColor" clickable to="/profile/store" v-ripple>
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-icon name="store" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-bold" :class="getFont.text">{{ storeNum }} produtos e Serviços</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      myVacanciesAux: [],
      vacancyNum: 0,
      storeNum: 0
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
    ...mapGetters("auth", ["user", "userData"]),
    ...mapGetters("settings", ["getFont"])
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

    // deleteVacancyThis(id) {
    //   const vm = this;

    //   this.deleteVacancy(id).then(function() {
    //     vm.confirDeleteAux = false;
    //     vm.confirDelete = false;
    //   });
    // },

    // vacancyDtlFunc(id) {
    //   console.log(id);
    //   this.detailVacancy(id);
    //   console.log("Nelzio Sitoe delll");
    // },

    // updateVacancyHere(payload) {
    //   Loading.show();
    //   const updateRef = firestoreDb.collection("vacancies").doc(payload.id);
    //   updateRef
    //     .set(payload.data)
    //     .then(() => {
    //       this.listVacancyMyHere(this.user.email);
    //       Loading.hide();
    //     })
    //     .catch(error => {
    //       Loading.hide();
    //       alert("Error update document: ", error);
    //     });
    // },

    handleSwipe(val) {
      // if (val.direction === "left") {
      //   this.$router.push("/store");
      // }

      if (val.direction === "right") {
        this.$router.push("/settings");
      }
    },

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      this.$root.$emit(
        "textToSpeechRouter",
        this.userData.displayName +
          ".\n Telefone: " +
          this.converNumbPhone(this.userData.phoneNumber) +
          ";\n email: " +
          this.userData.email +
          "; data de nascimento: " +
          this.userData.date +
          ";\n profissão: " +
          this.userData.profission +
          "."
      );
      // console.log(this.vacancy)
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

    listCandidatures(user) {
      // done
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      this.vacanciesAply = [];
      const ref = firestoreDb.collection("vacancies");
      const vm = this;
      ref
        .where("public", "==", true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            firestoreDb
              .collection("vacancies")
              .doc(doc.id)
              .collection("candidates")
              .doc(user)
              .get()
              .then(doc2 => {
                if (doc2.exists) {
                  vm.vacanciesAply.push({
                    id: doc.id,
                    title: doc.data().title,
                    user: doc.data().user,
                    img: doc.data().img
                  });
                  if (vm.vacanciesAply.length >= 3) return;
                }
              });
          });
        });
    },

    listVacancyMyHere(user) {
      // done
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      // vm.myVacancies = []
      var myVacanciesAux = [];
      const ref = firestoreDb.collection("vacancies");
      ref.where("user", "==", user).onSnapshot(function(querySnapshot) {
        vm.vacancyNum = querySnapshot.docs.length;
        // querySnapshot.forEach(function(doc) {
        //   // if (vm.myVacancies.length !== querySnapshot.docs.length) {
        //   //   vm.myVacancies.push({
        //   //     key: doc.id,
        //   //     title: doc.data().title,
        //   //     user: doc.data().user,
        //   //     description: doc.data().description,
        //   //     img: doc.data().img,
        //   //     public: doc.data().public,
        //   //     place: doc.data().place,
        //   //     validate: doc.data().validate,
        //   //     category: doc.data().category
        //   //   });
        //   // }
        //   // myVacanciesAux.push({
        //   //   public: doc.data().public
        //   // });
        // });
        // vm.myVacanciesAux = myVacanciesAux;
      });
    },
    listStoreMyHere(user) {
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      const ref = firestoreDb.collection("stories");
      ref.where("user", "==", user).onSnapshot(function(querySnapshot) {
        vm.storeNum = querySnapshot.docs.length;
      });
    },

    converNumbPhone(valueNum) {
      var converted = "";
      var count = 0;
      const value = String(valueNum)
        .replace(/(.)(?=(\d{3})+$)/g, "$1,")
        .split(",");
      value.forEach(element => {
        count += 1;
        if (value.length > count) {
          converted = converted + element + "; ";
        } else {
          converted = converted + element;
        }
      });
      return converted;
    }
  },
  created() {
    this.checkAuthUser();
    this.detailUser(this.user.email);
    this.listVacancyMyHere(this.user.email);
    this.listStoreMyHere(this.user.email);
  },
  mounted() {
    // this.listVacancyMy(this.user.email)
    this.listCandidatures(this.user.email);

    this.$root.$emit(
      "textToSpeechRouter",
      "Pagina do seu perfil.\n Pressione para ouvir detalhes do seu perfil"
    );
  }
  // watch: {
  //   vacancyDetail() {
  //     if (this.vacancyDetail) {
  //       this.confirDelete = true;
  //     }
  //   },
  //   vacancyDeleted() {
  //     if (this.vacancyDeleted) {
  //       this.confirDeleteSuccess = true;
  //       this.listVacancyMy(this.user.email);
  //     }
  //   },
  //   vacancyUploaded() {
  //     this.listVacancyMy(this.user.email);
  //   }
  // }
};
</script>
