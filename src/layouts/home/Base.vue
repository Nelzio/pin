<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-header elevated height-hint="64">
      <q-toolbar
        :class="[darkModeConf.bgColor, darkModeConf.textColor]"
        class="GPL__toolbar"
        style="height: 64px"
      >
        <q-btn
          @click="$router.go(-1)"
          v-if="backIcon"
          :color="darkModeConf.iconVar"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          size="lg"
        />
        <!-- <q-btn
          to="/"
          v-if="$route.path == '/' && !$q.screen.gt.sm"
          flat
          dense
          round
          icon="home"
          aria-label="Home"
          size="lg"
        />-->
        <q-btn
          @click="drowerFilter = !drowerFilter"
          v-if="$route.path == '/vacancies'"
          :color="darkModeConf.iconVar"
          flat
          dense
          round
          icon="filter_list"
          aria-label="DowrerFilter"
          size="lg"
        />
        <q-btn
          @click="drowerFilterStore = !drowerFilterStore"
          v-if="$route.path == '/store'"
          :color="darkModeConf.iconVar"
          flat
          dense
          round
          icon="filter_list"
          aria-label="DowrerFilter"
          size="lg"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap text-primary text-h5 text-weight-bolder title-font">
          <q-btn flat round to="/">
            <q-img src="statics/img/home/appLogo.png" style="height: 50px" alt />
          </q-btn>Superativo
        </q-toolbar-title>
        <q-toolbar-title shrink class="row items-center no-wrap text-primary text-h5 text-weight-bolder title-font" v-else>
          <q-btn flat round to="/">
            <q-img src="statics/img/home/appLogo.png" style="height: 50px" alt />
          </q-btn>Superativo
        </q-toolbar-title>

        <q-space />

        <q-input
          v-if="$q.screen.gt.sm && toSearch"
          :color="darkModeConf.color"
          outlined
          rounded
          v-model="valueSearch"
          input-class="text-right"
          placeholder="Pesquisar"
          style="width: 50%;"
        >
          <template v-slot:append>
            <q-icon :color="darkModeConf.iconVar" v-if="valueSearch === ''" name="search" />
            <q-icon :color="darkModeConf.iconVar" v-else name="clear" class="cursor-pointer" @click="valueSearch = ''" />
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn round dense flat icon="notifications">
            <q-badge color="primary" text-color="white" floating>2</q-badge>
          </q-btn>-->
          <ChatCount />
          <q-btn v-if="isUserAuth" round flat>
            <q-avatar>
              <q-img :src="user.photoURL" />
            </q-avatar>
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <template>
                  <q-item to="/profile" clickable>
                    <q-item-section>Perfil</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item @click="signOut" clickable>
                    <q-item-section>Sair</q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn v-else round flat to="/account">
            <q-avatar>
              <q-icon name="account_circle" size="lg" color="primary" />
            </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
      <!-- rounded-borders -->
      <q-toolbar
        :class="[darkModeConf.bgColor, darkModeConf.textColor]"
        v-if="toSearch && !$q.screen.gt.sm"
      >
        <q-input
          :color="darkModeConf.color"
          dense
          outlined
          rounded
          v-model="valueSearch"
          input-class="text-right"
          class="full-width"
          placeholder="Pesquisar"
        >
          <template v-slot:append>
            <q-icon :color="darkModeConf.iconVar" v-if="valueSearch === ''" name="search" />
            <q-icon :color="darkModeConf.iconVar" v-else name="clear" class="cursor-pointer" @click="valueSearch = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-footer
      elevated
      :class="[darkModeConf.bgColor, darkModeConf.textColor]"
      v-if="!$q.screen.gt.sm && !backIcon"
    >
      <q-tabs
        :active-color="darkModeConf.iconVar"
        align="justify"
        indicator-color="transparent"
        class="text-grey"
      >
        <q-route-tab name="home" icon="home" to="/" />
        <q-route-tab name="trabalho" icon="work" to="/vacancies" />
        <q-route-tab name="store" icon="store" to="/store" />
        <q-route-tab name="settings" icon="settings" to="/settings" />
        <!--<q-route-tab name="profile" icon="person" to="/profile" />-->
      </q-tabs>
    </q-footer>

    <q-drawer
      v-if="$route.path == '/vacancies'"
      v-model="drowerFilter"
      bordered
      behavior="mobile"
      @click="drowerFilter = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <span class="q-ml-sm">Filtrar vagas</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item clickable v-ripple @click="filterVal = '', drowerFilter = false">
            <q-item-section avatar>
              <q-icon :color="darkModeConf.iconVar" name="list" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="darkModeConf.textColor">Todas vagas</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item expand-separator icon="group_work" label="Categorias">
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in categories"
              :key="idx"
              @click="filterVal = item, drowerFilter = false"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item default-opened expand-separator icon="place" label="Provincias">
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in places"
              :key="idx"
              @click="filterVal = item, drowerFilter = false"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer
      v-if="$route.path == '/store'"
      v-model="drowerFilterStore"
      bordered
      behavior="mobile"
      @click="drowerFilterStore = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <span class="q-ml-sm">Filtrar vagas</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item clickable v-ripple @click="filterVal = '', drowerFilterStore = false">
            <q-item-section avatar>
              <q-icon :color="darkModeConf.iconVar" name="list" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="darkModeConf.textColor">Todas Produtos e serviços</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item expand-separator icon="group_work" label="Categorias">
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in categoriesStore"
              :key="idx"
              @click="filterVal = item, drowerFilterStore = false"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item default-opened expand-separator icon="place" label="Provincias">
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in places"
              :key="idx"
              @click="filterVal = item, drowerFilterStore = false"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <!-- This is where pages get injected -->
      <router-view v-if="toSearch" :val_search="valueSearch" :filterVal="filterVal" />
      <router-view v-else />

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn round flat stack no-caps size="35px" class="GPL__side-btn" to="/">
            <q-icon :color="darkModeConf.iconVar" size="lg" name="home" />
            <div class="GPL__side-btn__label">Home</div>
          </q-btn>

          <q-btn round flat stack no-caps size="35px" class="GPL__side-btn" to="/vacancies">
            <q-icon :color="darkModeConf.iconVar" size="lg" name="work" />
            <div class="GPL__side-btn__label">Vagas</div>
          </q-btn>

          <q-btn round flat stack no-caps size="35px" class="GPL__side-btn" to="/store">
            <q-icon :color="darkModeConf.iconVar" size="lg" name="store" />
            <div class="GPL__side-btn__label">Negócio</div>
            <!-- <q-badge floating :color="darkModeConf.iconVar" text-color="white" style="top: 8px right: 16px">
              1
            </q-badge>-->
          </q-btn>
          <q-btn round flat stack no-caps size="35px" class="GPL__side-btn" to="/profile">
            <q-icon :color="darkModeConf.iconVar" size="lg" name="person" />
            <div class="GPL__side-btn__label">Perfil</div>
          </q-btn>
          <q-btn round flat stack no-caps size="35px" class="GPL__side-btn" to="/settings">
            <q-icon :color="darkModeConf.iconVar" size="lg" name="settings" />
            <div class="GPL__side-btn__label">Definições</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { LocalStorage } from "quasar";
import { firestoreDb } from "boot/firebase";
import ChatCount from "components/layout/ChatCount"
export default {
  // name: 'LayoutName',

  data() {
    return {
      textColor: "text-black",
      numStatusVibrate: 0,
      numMessage: 0,
      valueSearch: "",
      filterVal: "",
      leftDrawer: false,
      drowerFilter: false,
      leftDrawerOpen: false,
      drowerFilterStore: false,
      toSearch: false,
      backIcon: false,
      tab: "home",
      navtab: "list",
      isHome: "Início",
      links1: [
        { icon: "work", text: "Vagas", to: "/company/vacancies" },
        { icon: "group", text: "Candidatos", to: "/company/employees" },
        { icon: "mic", text: "Entrevistas", to: "/company/interviews" }
      ],
      places: [
        "Cabo Delgado",
        "Gaza",
        "Inhambane",
        "Manica",
        "Maputo",
        "Matola",
        "Nampula",
        "Niassa",
        "Sofala",
        "Tete",
        "Zambézia"
      ],
      categories: [
        "Administração e Secretariado",
        "Agricultura e Pescas",
        "Aquisições e Procurement",
        "Assistente",
        "Auditoria e Consultoria",
        "Comercial e Vendas",
        "Comunicação Social",
        "Design e Multimédia",
        "Engenheiro Electrotécnico",
        "Engenheiro Mecânico",
        "Estágios e Bolsas",
        "Finanças e Contabilidade",
        "Gastronomia",
        "Gestão de Dados",
        "Gestão de Projectos",
        "Gestão e Programação",
        "Gestão Financeira",
        "Informática e Programação",
        "Monitoria e Avaliação",
        "Oficial Técnico",
        "Operador",
        "Recursos Humanos",
        "Relações Públicas",
        "Saúde",
        "Supervisão e Coordenação",
        "Técnico",
        "Transportes e Logística",
        "Vendas"
      ],
      categoriesStore: [
        "Produto",
        "Serviço",
        "Moda",
        "Construção",
        "Culinária",
        "Games e Lazer",
        "Animais",
        "Moda",
        "Casa",
        "Tecnologia",
        "Veículos",
        "Imobiliário",
        "Domésticos, Reparações e Mudanças",
        "Saúde e Beleza",
        "Eventos",
        "Técnicos"
      ],
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      itemsLayzeRef: []
    };
  },
  components: {
    ChatCount
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("auth", ["isUserAuth", "user"])
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    ...mapActions("settings", ["setAppMode"]),

    backIconFunc(to) {
      // active/ deactivate icon
      this.backIcon = false;
      if (
        to.path !== "/" &&
        to.path !== "/vacancies" &&
        to.path !== "/" &&
        to.path !== "/store" &&
        to.path !== "/settings"
      )
        this.backIcon = true;
    },

    speak(userInput) {
      if (this.vibrateState === 1) {
        if (this.synth.speaking) {
          // console.error('speechSynthesis.speaking');
          // console.log("Teste")
          this.synth.cancel()
          // return;
        }
        if (userInput !== "") {
          let sInstance = new SpeechSynthesisUtterance(userInput);
          sInstance.onend = function(event) {
            // console.log('SpeechSynthesisUtterance.onend');
          };
          sInstance.onerror = function(event) {
            // console.error('SpeechSynthesisUtterance.onerror');
          };
          // vibrate antes de falar
          //navigator.vibrate(200);
          // window.navigator.vibrate(200);
          // speak
          sInstance.pitch = this.pitch;
          sInstance.rate = this.rate;
          sInstance.lang = 'pt-BR';
          this.synth.speak(sInstance);
        } else {
          let sInstance = new SpeechSynthesisUtterance(
            "Nenhum texto nesta área."
          );
          sInstance.onend = function(event) {
            // console.log('SpeechSynthesisUtterance.onend');
          };
          sInstance.onerror = function(event) {
            // console.error('SpeechSynthesisUtterance.onerror');
          };

          // vibrate antes de falar
          //navigator.vibrate(200);
          // window.navigator.vibrate(200);
          // speak
          sInstance.pitch = this.pitch;
          sInstance.rate = this.rate;
          sInstance.lang = 'pt-BR';
          this.synth.speak(sInstance);
        }
      }
    },

    speakCordova (userInput) {
      if (this.vibrateState === 1) {
        TTS.speak({
          text: userInput,
          locale: 'pt-BR',
          rate: 0.8
        }, function () {
          // console.log('Text succesfully spoken');
        }, function (reason) {
          console.log(reason);
        });
      }
    },

    // getChat() {
    //   const vm = this;
    //   if (this.isUserAuth) {
    //     const ref = firestoreDb.collection("chat");
    //     var chatData = [];
    //     ref
    //       .where("receptorUser", "==", vm.user.email)
    //       .where("readed", "==", false)
    //       .onSnapshot(function(querySnapshot) {
    //         chatData = [];
    //         vm.numMessage = 0;
    //         querySnapshot.forEach(function(doc) {
    //           chatData.push({
    //             key: doc.id,
    //             email: doc.data().email,
    //             displayName: doc.data().displayName,
    //             receptorUser: doc.data().receptorUser,
    //             readed: doc.data().readed
    //           });
    //           vm.numMessage += 1;
    //         });
    //       });
    //   }
    // },

    getChat(vm) {
      const ref = firestoreDb.collection("chat").doc(vm.user.email.split('@')[0]);
      var chatDataObj = {};

      ref.onSnapshot(function(doc) {
        if(doc.exists) {
          vm.numMessage = 0;
            doc.data().peopleChat.forEach(element => {
              var refToCount = firestoreDb.collection("chat").doc(vm.user.email.split('@')[0]).collection(element);
              refToCount.where("readed", "==", false).onSnapshot(function(querySnap) {
                querySnap.forEach(function(doc) {
                  if(!doc.data().readed && doc.data().sender !== vm.user.email) {
                    vm.numMessage += 1;
                  }
                });
              });
            });
        }
      });
    },

    accessibilityMode() {
      this.$root.$on("textToSpeechRouter", val => {
        if(window.hasOwnProperty("cordova")){
          this.speakCordova(val);
        } else {
          this.speak(val);
        }
      });
    }
  },

  beforeCreate() {
    if (!LocalStorage.getItem("notFirst")) {
      this.$router.push("/welcome");
    }
  },

  created() {
    // if (!LocalStorage.getItem("notFirst")) {
    //   this.$router.push("/welcome");
    // }
  },


  mounted() {
    const vm = this;
    if (LocalStorage.getItem("lightMode") !== null) {
      if(LocalStorage.getItem("lightMode") === 1) {
        this.setAppMode(1)
      } else {
        this.setAppMode(0)
      }
    } else {
      this.setAppMode(1)
    }


    if(this.user && this.isUserAuth) {
      this.getChat(vm);
    }

    // this.$root.$on("countMessages", val => {
    //   this.getChat(vm);
    // });


    // if (this.appMode == 1) {
    //   this.$q.dark.set(false);
    // } else {
    //   this.$q.dark.set(true);
    // }

    // // // // // // this.$root.$store.state.vibrateState

    this.accessibilityMode();

    this.backIconFunc(this.$route);

    if (this.$route.path == "/store" || this.$route.path == "/vacancies")
      this.toSearch = true;
  },


  watch: {
    $route(to, from) {
      // react to route changes...
      this.toSearch = false;
      if (this.$route.path == "/store" || this.$route.path == "/vacancies") {
        this.toSearch = true;
        this.valueSearch = "";
        this.filterVal = "";
      }
      this.backIconFunc(to);

      if (this.vibrateState) {
        if(window.hasOwnProperty("cordova")){
          navigator.vibrate(200);
        } else {
          window.navigator.vibrate(200);
        }
      }
    },
    appMode(val) {
      if (val) {
        this.$q.dark.set(false);
      } else {
        this.$q.dark.set(true);
      }
    }

    // vibrateState (val) {
    //   console.log(val)
    //   if (this.vibrateState === 1) {
    //     this.numStatusVibrate = val
    //   } else {
    //     this.numStatusVibrate = val
    //   }
    //   // this.accessibilityMode()
    // }
  }
};
</script>

<style lang="sass">
.GPL

  &__toolbar
    height: 64px

  &__toolbar-input
    width: 35%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368

    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px

  &__side-btn
    &__label
      font-size: 18px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 3000

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>