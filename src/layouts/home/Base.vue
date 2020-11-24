<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-header elevated height-hint="64">
      <q-toolbar
        :class="[darkModeConf.bgColor, darkModeConf.textColor]"
        class="GPL__toolbar bg-primary"
        style="height: 64px"
      >
        <q-btn
          @click="redirectNewUser()"
          v-if="newUser == 1"
          :color="darkModeConf.iconVar"
          flat
          dense
          round
          icon="arrow_back"
          size="lg"
          role="button"
          lang="pt-PT"
          aria-label="Voltar a página anterior"
        />
        <q-btn
          @click="$router.go(-1)"
          v-else-if="backIcon"
          :color="darkModeConf.iconVar"
          flat
          dense
          round
          icon="arrow_back"
          size="lg"
          role="button"
          lang="pt-PT"
          aria-label="Voltar a página anterior"
        />

        <!-- <q-btn
          to="/"
          v-if="$route.path == '/' && !$q.screen.gt.sm"
          flat
          dense
          round
          icon="home"
          lang="pt-PT" aria-label="Home"
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
          size="lg"
          role="button"
          lang="pt-PT"
          aria-label="Abrir menú"
        />
        <q-btn
          @click="drowerFilterStore = !drowerFilterStore"
          v-if="$route.path == '/store'"
          :color="darkModeConf.iconVar"
          flat
          dense
          round
          icon="filter_list"
          size="lg"
          role="button"
          lang="pt-PT"
          aria-label="Abrir menú"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.sm"
          shrink
          class="row items-center no-wrap text-primary text-h5 text-weight-bolder title-font"
        >
          <router-link
            class="text-primary"
            to="/"
            role="link"
            lang="pt-PT"
            aria-label="Link para a página inicial"
            style="text-decoration: none"
          >
            <img
              :src="appMode ? 'statics/logo.png' : 'statics/logodark.png'"
              style="height: 50px"
              alt="Logótipo"
              role="img"
            />
          </router-link>
        </q-toolbar-title>
        <q-toolbar-title
          shrink
          class="row items-center no-wrap text-primary text-h5 text-weight-bolder title-font"
          v-else
        >
          <!-- <q-btn
            flat
            round
            to="/"
            role="button"
            lang="pt-PT"
            aria-label="Link para a página inicial"
          >
            <q-img
              src="statics/logo.png"
              style="height: 50px"
              alt="Logótipo"
              role="img"
            />
          </q-btn> -->
          <router-link
            class="text-primary"
            to="/"
            role="link"
            lang="pt-PT"
            aria-label="Link para a página inicial"
            style="text-decoration: none"
          >
            <img
              :src="appMode ? 'statics/logo.png' : 'statics/logodark.png'"
              style="height: 50px"
              alt="Logótipo"
              role="img"
            />
          </router-link>
        </q-toolbar-title>

        <q-space />

        <q-input
          v-if="$q.screen.gt.sm && toSearch"
          :color="darkModeConf.color"
          outlined
          rounded
          v-model="valueSearch"
          input-class="text-right"
          style="width: 50%"
          type="search"
          role="searchbox"
        >
          <template v-slot:append>
            <q-icon
              :color="darkModeConf.iconVar"
              v-if="valueSearch === ''"
              name="search"
            />
            <q-icon
              :color="darkModeConf.iconVar"
              v-else
              name="clear"
              class="cursor-pointer"
              @click="valueSearch = ''"
            />
          </template>
        </q-input>

        <!-- temporary -->
        <q-space />

        <!-- temporary -->

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <!-- <q-btn round dense flat icon="notifications">
            <q-badge color="primary" text-color="white" floating>2</q-badge>
          </q-btn>-->
          <ChatCount
            v-if="$route.path.split('/')[1] != 'admin'"
            :readed="readed"
          />
          <q-btn
            v-if="isUserAuth"
            round
            flat
            to="/profile"
            role="button"
            lang="pt-PT"
            aria-label="Ver Perfil"
          >
            <q-avatar>
              <q-img v-if="user.photoURL" :src="user.photoURL" />
              <q-img src="statics/img/avataruser.png" />
            </q-avatar>
          </q-btn>
          <q-btn
            v-else
            round
            flat
            to="/account"
            role="button"
            lang="pt-PT"
            aria-label="Entrar na conta"
          >
            <q-avatar>
              <q-icon name="account_circle" size="lg" color="primary" />
            </q-avatar>
          </q-btn>
          <q-btn
            @click="drowerAdmin = !drowerAdmin"
            v-if="$route.path.split('/')[1] == 'admin'"
            :color="darkModeConf.iconVar"
            flat
            dense
            round
            icon="menu"
            lang="pt-PT"
            aria-label="DowrerFilter"
            size="lg"
          />
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
          type="search"
          role="searchbox"
        >
          <template v-slot:append>
            <q-icon
              :color="darkModeConf.iconVar"
              v-if="valueSearch === ''"
              name="search"
            />
            <q-icon
              :color="darkModeConf.iconVar"
              v-else
              name="clear"
              class="cursor-pointer"
              @click="valueSearch = ''"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-footer
      elevated
      :class="[darkModeConf.bgColor, darkModeConf.textColor]"
      v-if="!$q.screen.gt.sm && !backIcon"
      class="q-pt-xs q-pb-xs"
    >
      <div class="row justify-around">
        <router-link
          to="/"
          :class="
            $route.path == '/' ? 'text-' + darkModeConf.iconVar : 'text-grey-8'
          "
          class="col-3 text-center"
          lang="pt-PT"
          aria-label="Botão para página inicial"
        >
          <q-icon name="home" size="md" />
        </router-link>
        <router-link
          to="/vacancies"
          class="col-3 text-center"
          lang="pt-PT"
          aria-label="Botão para página de vagas"
          :class="
            $route.path == '/vacancies'
              ? 'text-' + darkModeConf.iconVar
              : 'text-grey-8'
          "
        >
          <q-icon name="work" size="md" />
        </router-link>
        <router-link
          to="/store"
          class="col-3 text-center"
          lang="pt-PT"
          aria-label="Botão para página de negócio"
          :class="
            $route.path == '/store'
              ? 'text-' + darkModeConf.iconVar
              : 'text-grey-8'
          "
        >
          <q-icon name="store" size="md" />
        </router-link>
        <router-link
          to="/settings"
          class="col-3 text-center"
          lang="pt-PT"
          aria-label="Botão para página de configurações"
          :class="
            $route.path == '/settings'
              ? 'text-' + darkModeConf.iconVar
              : 'text-grey-8'
          "
        >
          <q-icon name="settings" size="md" />
        </router-link>
      </div>
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
          <q-item
            clickable
            v-ripple
            @click=";(filterVal = ''), (drowerFilter = false)"
          >
            <q-item-section avatar>
              <q-icon :color="darkModeConf.iconVar" name="list" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="darkModeConf.textColor"
                >Todas vagas</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-expansion-item
            expand-separator
            icon="group_work"
            label="Categorias"
          >
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in categories"
              :key="idx"
              @click=";(filterVal = item), (drowerFilter = false)"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{
                  item
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item
            default-opened
            expand-separator
            icon="place"
            label="Provincias"
          >
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in places"
              :key="idx"
              @click=";(filterVal = item), (drowerFilter = false)"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{
                  item
                }}</q-item-label>
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
          <q-item
            clickable
            v-ripple
            @click=";(filterVal = ''), (drowerFilterStore = false)"
          >
            <q-item-section avatar>
              <q-icon :color="darkModeConf.iconVar" name="list" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="darkModeConf.textColor"
                >Todas Produtos e serviços</q-item-label
              >
            </q-item-section>
          </q-item>
          <q-expansion-item
            expand-separator
            icon="group_work"
            label="Categorias"
          >
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in categoriesStore"
              :key="idx"
              @click=";(filterVal = item), (drowerFilterStore = false)"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{
                  item
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          <q-expansion-item
            default-opened
            expand-separator
            icon="place"
            label="Provincias"
          >
            <q-item
              clickable
              v-ripple
              v-for="(item, idx) in places"
              :key="idx"
              @click=";(filterVal = item), (drowerFilterStore = false)"
            >
              <q-item-section>
                <q-item-label :class="darkModeConf.textColor">{{
                  item
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-drawer
      v-if="$route.path.split('/')[1] == 'admin' && userData.access"
      v-model="drowerAdmin"
      bordered
      behavior="mobile"
      @click="drowerAdmin = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-black">
            <span class="q-ml-sm">Administração</span>
          </q-toolbar-title>
          <!-- <q-space /> -->
          <q-btn
            :color="darkModeConf.iconVar"
            flat
            round
            icon="arrow_back"
            @click="drowerAdmin = false"
          />
        </q-toolbar>

        <q-list padding>
          <q-item
            clickable
            v-ripple
            v-for="(item, idx) in adminPages"
            :key="idx"
            :to="item.to"
            @click="drowerAdmin = false"
          >
            <q-item-section avatar>
              <q-icon
                v-if="item.iconawesome"
                :color="darkModeConf.iconVar"
                :name="'fas fa-' + item.iconawesome"
                size="20px"
              />
              <q-icon v-else :color="darkModeConf.iconVar" :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="darkModeConf.textColor">{{
                item.name.toUpperCase()
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container class="GPL__page-container">
      <!-- This is where pages get injected -->
      <router-view
        v-if="toSearch"
        :val_search="valueSearch"
        :filterVal="filterVal"
      />
      <router-view v-else />

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-lg q-px-xs column">
          <q-btn
            round
            flat
            stack
            no-caps
            size="30px"
            class="GPL__side-btn"
            to="/"
            :class="
              $route.path.split('/')[1] == ''
                ? appMode
                  ? 'bg-grey-4'
                  : 'bg-grey-9'
                : ''
            "
            role="link"
            lang="pt-PT"
            aria-label="Página Inicial"
          >
            <q-icon :color="darkModeConf.iconVar" size="lg" name="home" />
            <div class="GPL__side-btn__label">Home</div>
          </q-btn>

          <q-btn
            round
            flat
            stack
            no-caps
            size="30px"
            class="GPL__side-btn"
            :class="
              $route.path.split('/')[1] == 'vacancies'
                ? appMode
                  ? 'bg-grey-4'
                  : 'bg-grey-9'
                : ''
            "
            to="/vacancies"
            role="link"
            lang="pt-PT"
            aria-label="Página de vagas de emprego"
          >
            <q-icon :color="darkModeConf.iconVar" size="lg" name="work" />
            <div class="GPL__side-btn__label">Vagas</div>
          </q-btn>

          <q-btn
            round
            flat
            stack
            no-caps
            size="30px"
            class="GPL__side-btn"
            :class="
              $route.path.split('/')[1] == 'store'
                ? appMode
                  ? 'bg-grey-4'
                  : 'bg-grey-9'
                : ''
            "
            to="/store"
            role="link"
            lang="pt-PT"
            aria-label="Página Produtos e serviços"
          >
            <q-icon :color="darkModeConf.iconVar" size="lg" name="store" />
            <div class="GPL__side-btn__label">Negócio</div>
            <!-- <q-badge floating :color="darkModeConf.iconVar" text-color="white" style="top: 8px right: 16px">
              1
            </q-badge>-->
          </q-btn>
          <q-btn
            v-if="isUserAuth"
            round
            flat
            stack
            no-caps
            size="30px"
            class="GPL__side-btn"
            :class="
              $route.path.split('/')[1] == 'profile'
                ? appMode
                  ? 'bg-grey-4'
                  : 'bg-grey-9'
                : ''
            "
            to="/profile"
            role="link"
            lang="pt-PT"
            aria-label="Página de perfil"
          >
            <q-icon :color="darkModeConf.iconVar" size="lg" name="person" />
            <div class="GPL__side-btn__label">Perfil</div>
          </q-btn>
          <q-btn
            v-else
            round
            flat
            stack
            no-caps
            size="30px"
            class="GPL__side-btn"
            :class="
              $route.path.split('/')[1] == 'account'
                ? appMode
                  ? 'bg-grey-4'
                  : 'bg-grey-9'
                : ''
            "
            to="/account"
            role="link"
            lang="pt-PT"
            aria-label="Página de login"
          >
            <q-icon :color="darkModeConf.iconVar" size="lg" name="person" />
            <div class="GPL__side-btn__label">Perfil</div>
          </q-btn>
          <q-btn
            round
            flat
            stack
            no-caps
            size="30px"
            class="GPL__side-btn"
            :class="
              $route.path.split('/')[1] == 'settings'
                ? appMode
                  ? 'bg-grey-4'
                  : 'bg-grey-9'
                : ''
            "
            to="/settings"
            role="link"
            lang="pt-PT"
            aria-label="Página de configurações"
          >
            <q-icon :color="darkModeConf.iconVar" size="lg" name="settings" />
            <div class="GPL__side-btn__label">Definições</div>
          </q-btn>
          <q-btn
            v-if="userData.access"
            round
            flat
            stack
            no-caps
            size="30px"
            class="GPL__side-btn"
            :class="
              $route.path.split('/')[1] == 'admin'
                ? appMode
                  ? 'bg-grey-4'
                  : 'bg-grey-9'
                : ''
            "
            to="/admin"
            role="link"
            lang="pt-PT"
            aria-label="Página de administração"
          >
            <q-icon
              :color="darkModeConf.iconVar"
              size="lg"
              name="admin_panel_settings"
            />
            <div class="GPL__side-btn__label">Admin</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { LocalStorage } from "quasar"
import { firestoreDB } from "boot/firebase"
import ChatCount from "components/layout/ChatCount"
export default {
  // name: 'LayoutName',

  data() {
    return {
      newUser: 0,
      readed: false,
      textColor: "text-black",
      numStatusVibrate: 0,
      numMessage: 0,
      valueSearch: "",
      filterVal: "",
      leftDrawer: false,
      drowerFilter: false,
      leftDrawerOpen: false,
      drowerFilterStore: false,
      drowerAdmin: false,
      toSearch: false,
      backIcon: false,
      tab: "home",
      navtab: "list",
      isHome: "Início",
      links1: [
        { icon: "work", text: "Vagas", to: "/company/vacancies" },
        { icon: "group", text: "Candidatos", to: "/company/employees" },
        { icon: "mic", text: "Entrevistas", to: "/company/interviews" },
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
        "Zambézia",
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
        "Vendas",
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
        "Técnicos",
      ],
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      itemsLayzeRef: [],
      adminPages: [
        { name: "Home Admin", icon: "admin_panel_settings", to: "/admin" },
        { name: "Empresas", icon: "business", to: "/admin/companies" },
        { name: "Usuários", icon: "group", to: "/admin/users" },
        {
          name: "Associações",
          iconawesome: "users",
          to: "/admin/associations",
        },
        { name: "Vagas", icon: "work", to: "/admin/vacancies" },
        { name: "Estatística", icon: "show_chart", to: "/admin/statistics" },
        {
          name: "Add Admin",
          icon: "admin_panel_settings",
          to: "/admin/admins",
        },
        { name: "Ajuda", icon: "help", to: "/helpadmin" },
      ],
    }
  },
  components: {
    ChatCount,
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("settings", ["getVibrate"]),
    ...mapGetters("auth", ["isUserAuth", "user", "userData"]),
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    ...mapActions("settings", ["setAppMode"]),

    isNewUser() {
      if (LocalStorage.getItem("newUser")) {
        this.newUser = LocalStorage.getItem("newUser")
        this.backIcon = false
      }
    },

    redirectNewUser() {
      console.log("Este")
      LocalStorage.set("newUser", 0)
      this.newUser = 0
      this.$router.push("/")
    },

    backIconFunc(to) {
      // active/ deactivate icon
      this.backIcon = false
      if (
        to.path !== "/" &&
        to.path !== "/vacancies" &&
        to.path !== "/" &&
        to.path !== "/store" &&
        to.path !== "/settings"
      )
        this.backIcon = true
    },

    speak(userInput) {
      if (this.vibrateState === 1 && this.getVibrate) {
        if (this.synth.speaking) {
          // console.error('speechSynthesis.speaking');
          // console.log("Teste")
          this.synth.cancel()
          // return;
        }
        if (userInput !== "") {
          let sInstance = new SpeechSynthesisUtterance(userInput)
          sInstance.onend = function (event) {
            // console.log('SpeechSynthesisUtterance.onend');
          }
          sInstance.onerror = function (event) {
            // console.error('SpeechSynthesisUtterance.onerror');
          }
          // vibrate antes de falar
          //navigator.vibrate(200);
          // window.navigator.vibrate(200);
          // speak
          sInstance.pitch = this.pitch
          sInstance.rate = this.rate
          sInstance.lang = "pt-PT"
          this.synth.speak(sInstance)
        } else {
          let sInstance = new SpeechSynthesisUtterance(
            "Nenhum texto nesta área."
          )
          sInstance.onend = function (event) {
            // console.log('SpeechSynthesisUtterance.onend');
          }
          sInstance.onerror = function (event) {
            // console.error('SpeechSynthesisUtterance.onerror');
          }

          // vibrate antes de falar
          //navigator.vibrate(200);
          // window.navigator.vibrate(200);
          // speak
          sInstance.pitch = this.pitch
          sInstance.rate = this.rate
          sInstance.lang = "pt-PT"
          this.synth.speak(sInstance)
        }
      }
    },

    speakCordova(userInput) {
      if (this.vibrateState === 1 && this.getVibrate) {
        TTS.speak(
          {
            text: userInput,
            locale: "pt-PT",
            rate: 0.8,
          },
          function () {
            // console.log('Text succesfully spoken');
          },
          function (reason) {
            console.log(reason)
          }
        )
      }
    },

    // getChat() {
    //   const vm = this;
    //   if (this.isUserAuth) {
    //     const ref = firestoreDB.collection("chat");
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
      const ref = firestoreDB
        .collection("chat")
        .doc(vm.userData.email.split("@")[0])
      var chatDataObj = {}

      ref.onSnapshot(function (doc) {
        if (doc.exists) {
          vm.numMessage = 0
          doc.data().peopleChat.forEach((element) => {
            var refToCount = firestoreDB
              .collection("chat")
              .doc(vm.userData.email.split("@")[0])
              .collection(element)
            refToCount
              .where("readed", "==", false)
              .onSnapshot(function (querySnap) {
                querySnap.forEach(function (doc) {
                  if (
                    !doc.data().readed &&
                    doc.data().sender !== vm.userData.email
                  ) {
                    vm.numMessage += 1
                  }
                })
              })
          })
        }
      })
    },

    accessibilityMode() {
      this.$root.$on("textToSpeechRouter", (val) => {
        if (window.hasOwnProperty("cordova")) {
          this.speakCordova(val)
        } else {
          this.speak(val)
        }
      })
    },
  },

  beforeCreate() {
    if (!LocalStorage.getItem("notFirst")) {
      this.$router.push("/welcome")
    }
  },

  created() {
    // if (!LocalStorage.getItem("notFirst")) {
    //   this.$router.push("/welcome");
    // }
  },

  mounted() {
    const vm = this
    if (LocalStorage.getItem("lightMode") !== null) {
      if (LocalStorage.getItem("lightMode") === 1) {
        this.setAppMode(1)
      } else {
        this.setAppMode(0)
      }
    } else {
      this.setAppMode(1)
    }

    if (this.user && this.isUserAuth) {
      this.getChat(vm)
    }

    this.isNewUser()

    // // // // // this.$root.$on("countMessages", val => {
    // // // // //   // this.getChat(vm);
    // // // // //   this.readed = true;
    // // // // // });

    // if (this.appMode == 1) {
    //   this.$q.dark.set(false);
    // } else {
    //   this.$q.dark.set(true);
    // }

    // // // // // // this.$root.$store.state.vibrateState

    this.accessibilityMode()

    this.backIconFunc(this.$route)

    if (this.$route.path == "/store" || this.$route.path == "/vacancies")
      this.toSearch = true

    console.log(this.$store.state.settings.appMode + "asas")
  },

  watch: {
    appMode(val) {
      console.log(val)
    },
    $route(to, from) {
      // react to route changes...
      this.toSearch = false
      if (this.$route.path == "/store" || this.$route.path == "/vacancies") {
        this.toSearch = true
        this.valueSearch = ""
        this.filterVal = ""
      }
      this.backIconFunc(to)

      if (this.vibrateState && this.getVibrate) {
        if (window.hasOwnProperty("cordova")) {
          navigator.vibrate(200)
        } else {
          window.navigator.vibrate(200)
        }
      }

      if (to.path.split("/")[1] == "admin" && !this.userData.access) {
        this.$router.go(-1)
      }

      if (
        to == "/profile/vacancy/add" &&
        userData.profileType == "organization"
      ) {
        this.$router.go(-1)
      }
    },
    appMode(val) {
      if (val) {
        this.$q.dark.set(false)
      } else {
        this.$q.dark.set(true)
      }
    },

    // vibrateState (val) {
    //   console.log(val)
    //   if (this.vibrateState === 1) {
    //     this.numStatusVibrate = val
    //   } else {
    //     this.numStatusVibrate = val
    //   }
    //   // this.accessibilityMode()
    // }
  },
}
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
      padding-left: 124px
a
  text-decoration: none
</style>