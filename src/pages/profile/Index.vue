<template>
  <q-page class="q-gutter-y-md q-pt-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img :src="user.photoURL" spinner-color="white" />
          </q-avatar>

          <div class="text-h5">{{ user.displayName }}</div>
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
                      <q-item-label class="text-h6">Telefone</q-item-label>
                      <q-item-label>{{ userData.phoneNumber }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Email</q-item-label>
                      <q-item-label>{{ user.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Endereço</q-item-label>
                      <q-item-label class="text-body2">{{ userData.adress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="local">Bairro da Polana caniço</q-tab-panel>

              <q-tab-panel name="ocupacao">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="calendar_today" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Data de nascimento</q-item-label>
                      <q-item-label>{{ userData.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="work" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Profissão</q-item-label>
                      <q-item-label>{{ userData.profission }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Formação</q-item-label>
                      <q-item-label class="text-body2">{{ userData.education }}</q-item-label>
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
            left-icon="edit"
            to="account/edit"
          />
        </div>

        <q-separator />

        <!-- sec4 -->
        <!-- <div>
          <q-toolbar :class="darkModeConf.bgColor">
            <q-toolbar-title>Produtos</q-toolbar-title>
            <q-btn flat round dense icon="add" />
          </q-toolbar>
          <div class="row">
            <div class="col-12 col-md-8 q-pa-sm" v-for="i in 4" :key="i">
              <q-card class="my-card">
                <q-img
                  src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg"
                  spinner-color="white"
                />
                <q-card-section>
                  <div class="row">
                    <div class="col-8">Chinelos de pneu.</div>
                    <div class="col-8 text-right">800 mt</div>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn outline rounded label="Detalhes" />
                  <q-btn outline rounded icon="edit" />
                  <q-btn outline rounded color="red" icon="delete" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todos" />
          </div>
        </div>-->

        <!-- sec 5 -->

        <!-- <q-separator />

        <div>
          <q-toolbar :class="darkModeConf.bgColor">
            <q-toolbar-title>Serviços</q-toolbar-title>
            <q-btn flat round dense icon="add" />
          </q-toolbar>
          <div class="row">
            <div class="col-12 col-md-8 q-pa-sm" v-for="i in 4" :key="i">
              <q-card class="my-card">
                <q-img
                  src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg"
                  spinner-color="white"
                />
                <q-card-section>
                  <div class="row">
                    <div class="col-12">Carpintaria</div>
                  </div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn outline rounded label="Detalhes" />
                  <q-btn outline rounded icon="edit" />
                  <q-btn outline rounded color="red" icon="delete" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todos" />
          </div>
        </div>

        <q-separator />-->

        <div v-if="vacanciesAply.length">
          <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
            <q-toolbar-title>Minhas candidaturas</q-toolbar-title>
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
                    <div class="text-bold text-body1">{{ candidate.title}}</div>
                    <div>{{ candidate.user }}</div>
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
        <div v-if="myVacancies.length">
          <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
            <q-toolbar-title>Vagas de emprego</q-toolbar-title>
            <q-btn flat round dense icon="add" to="/profile/vacancy/add" />
          </q-toolbar>

          <div class="row">
            <div
              class="col-12 col-md-6 q-pa-sm"
              v-for="(vacancy, idx) in myVacancies"
              :key="vacancy.key"
            >
              <q-card class="my-card">
                <q-img
                  v-if="vacancy.img"
                  :src="vacancy.img"
                  spinner-color="white"
                  style="min-height: 200px;"
                />
                <q-card-section>{{ vacancy.title }}</q-card-section>
                <q-card-actions align="right">
                  <q-btn
                    outline
                    rounded
                    label="Detalhes"
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
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todas" to="/profile/vacancies" />
          </div>
        </div>
      </div>
      <div>
        <q-dialog v-model="confirDelete">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h5">Confirmar</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-h6">Deletar vaga de {{ vacancyDtl.title }}?</q-card-section>

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
            <q-card-section class="text-h5 text-green">Vaga deletada com sucesso</q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
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
      ref
        .where("user", "==", user)
        .limit(10)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (vm.myVacancies.length !== querySnapshot.docs.length) {
              vm.myVacancies.push({
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
          vm.myVacanciesAux = myVacanciesAux;
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
    this.listCandidatures(this.user.email);
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
