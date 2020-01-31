<template>
  <q-page class="q-gutter-y-md q-pt-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img :src="getUser.photoURL" spinner-color="white" />
          </q-avatar>

          <div class="text-h5">{{ getUser.displayName }}</div>
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
                      <q-item-label>{{ getUser.phoneNumber }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn round icon="ion-logo-whatsapp" color="green" :to="'https://wa.me/' + getUser.phoneNumber" />
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Email</q-item-label>
                      <q-item-label>{{ getUser.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Endereço</q-item-label>
                      <q-item-label class="text-body2">{{ getUser.adress }}</q-item-label>
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
                      <q-item-label>{{ getUser.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="work" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label class="text-h6">Profissão</q-item-label>
                      <q-item-label>{{ getUser.profission }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-h6">Formação</q-item-label>
                      <q-item-label class="text-body2">{{ getUser.education }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <q-separator />
      </div>

    </div>
    <!-- sec 6 -->

    <!-- asdasdasd -->

        <div v-if="!(vacancyNum == 0 && storeNum == 0)">
          <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
            <q-toolbar-title>Actividades</q-toolbar-title>
          </q-toolbar>
          <div class="row">
            <div v-if="vacancyNum > 0" class="q-pa-sm col-12 col-md-4">
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  :to="'/vacancies/' + this.$route.params.idUser"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-icon name="work" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-bold text-body1">{{ vacancyNum }} vagas de emprego.</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
            <div v-if="storeNum > 0" class="q-pa-sm col-12 col-md-4">
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  :to="'/store/' + this.$route.params.idUser"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-icon name="store" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-bold text-body1">{{ storeNum }} produtos e Serviços</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
        </div>


    <!-- <div v-if="vacancies.length" class="row justify-center">
      <div class="col-12 col-md-8">
        <q-toolbar class="shadow-1" :class="darkModeConf.bgColor">
          <q-toolbar-title>Vagas de emprego</q-toolbar-title>
        </q-toolbar>

        <div class="row">
          <div class="col-12 col-md-6 q-pa-sm" v-for="vacancy in vacancies" :key="vacancy.key">
            <q-card class="my-card">
              <q-img
                v-if="vacancy.img"
                :src="vacancy.img"
                spinner-color="white"
                style="min-height: 200px;"
              />
              
              <q-card-section class="q-pb-none">
                <div class="text-h5">{{ vacancy.title }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none q-pb-none">{{ vacancy.description }}</q-card-section>
              <q-card-actions align="right">
                <q-btn
                  outline
                  rounded
                  label="Detalhes"
                  :to="'/vacancies/details/'+vacancy.key"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div> -->
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
import offline from 'v-offline'
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "bio",
      vacancies: [],
      vacancyNum: 0,
      storeNum: 0,
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("user", ["getUser"])
  },
  methods: {
    ...mapActions("user", ["detailUserStore"]),

    listVacancy(user) {
      // done
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      // vm.myVacancies = []
      var myVacanciesAux = [];
      const ref = firestoreDb.collection("vacancies");
      ref
        .where("user", "==", user)
        .onSnapshot(function(querySnapshot) {
          vm.vacancyNum = querySnapshot.docs.length
        });
    },
    listStoreMyHere(user) {
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      const ref = firestoreDb.collection("stories");
      ref
        .where("user", "==", user)
        .onSnapshot(function(querySnapshot) {
          vm.storeNum = querySnapshot.docs.length
        });
    }
  },
  created() {
    this.detailUserStore(this.$route.params.idUser)
  },
  mounted() {
    this.listVacancy(this.$route.params.idUser)
    this.listStoreMyHere(this.$route.params.idUser)
  }
};
</script>
