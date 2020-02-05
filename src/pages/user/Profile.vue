<template>
  <q-page
    @click="handleRepeat()"
    class="q-gutter-y-md q-pt-md"
    v-touch-swipe.mouse.right="handleSwipe"
    v-touch-hold:600.mouse="handleHold"
  >
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img :src="getUser.photoURL" spinner-color="white" />
          </q-avatar>

          <div :class="getFont.title">{{ getUser.displayName }}</div>
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
                      <q-item-label :class="getFont.text">{{ getUser.phoneNumber }}</q-item-label>
                    </q-item-section>
                    <!-- <q-item-section side>
                      <q-btn round icon="ion-logo-whatsapp" color="green" :to="'/https://wa.me/' + getUser.phoneNumber" />
                    </q-item-section>-->
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Email</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Endereço</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.adress }}</q-item-label>
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
                      <q-item-label :class="getFont.title">Data de nascimento</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon name="work" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Profissão</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.profission }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon name="school" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Formação</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.education }}</q-item-label>
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
    <div class="row justify-center q-pa-md">
      <q-btn
        rounded
        class="full-width"
        :color="darkModeConf.color"
        :class="darkModeConf.textBtn"
        icon="message"
        label="Contactar"
        :to="'/chat/' + this.$route.params.idUser"
      />
    </div>
    <!-- sec 6 -->

    <!-- asdasdasd -->

    <div v-if="!(vacancyNum == 0 && storeNum == 0)">
      <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
        <q-toolbar-title :class="getFont.title">Actividades</q-toolbar-title>
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
                <div class="text-bold" :class="getFont.text">{{ vacancyNum }} vagas de emprego.</div>
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
                <div class="text-bold" :class="getFont.text">{{ storeNum }} produtos e Serviços</div>
              </q-item-section>
            </q-item>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
import offline from "v-offline";
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "bio",
      vacancies: [],
      vacancyNum: 0,
      storeNum: 0,
      pitch: 0.8,
      rate: 1,
      synth: window.speechSynthesis
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("settings", ["getFont"])
  },
  methods: {
    ...mapActions("user", ["detailUserStore"]),

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      this.$root.$emit(
        "textToSpeechRouter",
        this.getUser.displayName +
          ".\n Telefone: " +
          this.converNumbPhone(this.getUser.phoneNumber) +
          ";\n email: " +
          this.getUser.email +
          "; \n profissão: " +
          this.getUser.profission +
          "."
      );
      // console.log(this.vacancy)
    },

    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1);
      }
    },

    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1);
      }
    },

    handleRepeat() {
      var vm = this;

      this.touchNums += 1;

      if (this.touchNums >= 5) {
        this.touchNums = -80;
        window.navigator.vibrate(200);

        this.$router.push("/chat/" + this.getUser.email);
      }

      setTimeout(() => {
        vm.touchNums = 0;
      }, 5000);
    },

    listVacancy(user) {
      // done
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      // vm.myVacancies = []
      var myVacanciesAux = [];
      const ref = firestoreDb.collection("vacancies");
      ref.where("user", "==", user).onSnapshot(function(querySnapshot) {
        vm.vacancyNum = querySnapshot.docs.length;
      });
    },

    listStoreMyHere(user) {
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
    this.detailUserStore(this.$route.params.idUser);
  },
  mounted() {
    this.listVacancy(this.$route.params.idUser);
    this.listStoreMyHere(this.$route.params.idUser);
    this.$root.$emit(
      "textToSpeechRouter",
      "Perfil de " +
        this.getUser.displayName +
        ".\n Pressione para ouvir detalhes do perfil. \n Clique 5 vezes para contactar."
    );
  },

  filters: {
    converNumbPhoneFilter: function(valueNum) {
      console.log(valueNum);
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
  }
};
</script>
