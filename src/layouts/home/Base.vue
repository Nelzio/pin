<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-header elevated height-hint="64">
      <q-toolbar :class="[darkModeConf.bgColor, darkModeConf.textColor]" class="GPL__toolbar" style="height: 64px">
        <q-btn
          @click="$router.go(-1)"
          v-if="backIcon"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          size="lg"
        />
        <q-btn
          to="/home"
          v-if="$route.path == '/'"
          flat
          dense
          round
          icon="home"
          aria-label="Home"
          size="lg"
        />
        <q-btn
          @click="drowerFilter = !drowerFilter"
          v-if="$route.path == '/vacancies'"
          flat
          dense
          round
          icon="filter_list"
          aria-label="DowrerFilter"
          size="lg"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap"><img src="/statics/app-logo-128x128.png" style="height: 50px" alt=""> Superactive</q-toolbar-title>
        <q-toolbar-title
          shrink
          class="row items-center no-wrap"
          v-else
        >
        <img src="/statics/app-logo-128x128.png" style="height: 50px" alt="">
        Superactive</q-toolbar-title>

        <q-space />

        <q-input v-if="$q.screen.gt.sm && toSearch" :color="darkModeConf.color" outlined rounded v-model="valueSearch" input-class="text-right" placeholder="Pesquisar" style="width: 50%;">
          <template v-slot:append>
            <q-icon v-if="valueSearch === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="valueSearch = ''" />
          </template>
        </q-input>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat icon="notifications">
            <q-badge color="primary" text-color="white" floating>2</q-badge>
          </q-btn>
          <q-btn round flat>
            <q-avatar>
              <img v-if="isUserAuth" :src="user.photoURL" />
              <img v-else src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
            <q-menu transition-show="jump-down" transition-hide="jump-up">
              <q-list style="min-width: 100px">
                <template v-if="isUserAuth">
                  <q-item to="/profile" clickable>
                    <q-item-section>Perfil</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item @click="signOut" clickable>
                    <q-item-section>Sair</q-item-section>
                  </q-item>
                </template>
                <q-item v-else to="/account" clickable>
                  <q-item-section>Entrar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
      <!-- rounded-borders -->
      <q-toolbar :class="[darkModeConf.bgColor, darkModeConf.textColor]" v-if="toSearch && !$q.screen.gt.sm">
        <q-input :color="darkModeConf.color" dense outlined rounded v-model="valueSearch" input-class="text-right" class="full-width" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon v-if="valueSearch === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="valueSearch = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-footer
      elevated
      :class="[darkModeConf.bgColor, darkModeConf.textColor]"
      v-if="!$q.screen.gt.sm && !backIcon && $route.path !== '/'"
    >
      <q-tabs :active-color="darkModeConf.color" align="justify" indicator-color="transparent" class="text-grey">
        <q-route-tab name="home" icon="home" to="/home" />
        <q-route-tab name="trabalho" icon="work" to="/vacancies" />
        <q-route-tab name="store" icon="storefront" to="/store" />
        <q-route-tab name="settings" icon="settings" to="/settings" />
        <!--<q-route-tab name="profile" icon="person" to="/profile" />-->
      </q-tabs>
    </q-footer>

    <!-- (Optional) A Drawer you can add one more with side="right" or change this one's side -->
    <!-- <q-drawer v-model="leftDrawerOpen" bordered behavior="mobile" @click="leftDrawerOpen = false">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <span class="q-ml-sm">Superactive Negocio</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            :to="link.to"
            clickable
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-drawer v-if="$route.path == '/vacancies'" v-model="drowerFilter" bordered behavior="mobile" @click="drowerFilter = false">
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <span class="q-ml-sm">Filtrar vagas</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item
            clickable v-ripple
            @click="filterVal = '', drowerFilter = false"
          >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
            
            <q-item-section>
              <q-item-label :class="darkModeConf.textColor">Todas vagas</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item expand-separator icon="group_work" label="Categorias">
          <q-item
            clickable v-ripple
            v-for="(item, idx) in categories" :key="idx"
            @click="filterVal = item, drowerFilter = false"
          >
            <q-item-section>
              <q-item-label :class="darkModeConf.textColor">{{ item }}</q-item-label>
            </q-item-section>
          </q-item>
          </q-expansion-item>
          <q-expansion-item expand-separator icon="place" label="Provincias">
          <q-item
            clickable v-ripple
            v-for="(item, idx) in places" :key="idx"
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

    <q-page-container class="GPL__page-container">
      <!-- This is where pages get injected -->
      <router-view v-if="toSearch" :val_search="valueSearch" :filterVal="filterVal" />
      <router-view v-else />

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn round flat color="grey-8" stack no-caps size="40px" class="GPL__side-btn" to="/">
            <q-icon size="lg" name="home" />
            <div class="GPL__side-btn__label">Home</div>
          </q-btn>

          <q-btn
            round
            flat
            color="grey-8"
            stack
            no-caps
            size="40px"
            class="GPL__side-btn"
            to="/vacancies"
          >
            <q-icon size="lg" name="work" />
            <div class="GPL__side-btn__label">Vagas</div>
          </q-btn>

          <q-btn
            round
            flat
            color="grey-8"
            stack
            no-caps
            size="40px"
            class="GPL__side-btn"
            to="/store"
          >
            <q-icon size="lg" name="store" />
            <div class="GPL__side-btn__label">Exposição</div>
            <!-- <q-badge floating color="red" text-color="white" style="top: 8px right: 16px">
              1
            </q-badge>-->
          </q-btn>
          <q-btn
            round
            flat
            color="grey-8"
            stack
            no-caps
            size="40px"
            class="GPL__side-btn"
            to="/profile"
          >
            <q-icon size="lg" name="person" />
            <div class="GPL__side-btn__label">Perfil</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  // name: 'LayoutName',

  data() {
    return {
      textColor: "text-black",
      valueSearch: "",
      filterVal: "",
      leftDrawer: false,
      drowerFilter: false,
      leftDrawerOpen: false,
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
      ]
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("auth", ["isUserAuth", "user"])
  },
  methods: {
    ...mapActions("auth", ["signOut"]),
    
    backIconFunc (to) {
      // active/ deactivate icon
      this.backIcon = false
      if (to.path !== "/" && to.path !== "/vacancies" && to.path !== "/home" && to.path !== "/store" && to.path !== "/settings") this.backIcon = true
    },
    
  },
  mounted() {
    if(this.appMode) {
      this.$q.dark.set(false)
      } else {
      this.$q.dark.set(true)
    }

    this.backIconFunc(this.$route)

    if (this.$route.path == "/store" || this.$route.path == "/vacancies") this.toSearch = true

  },
  watch: {
    $route(to, from) {
      // react to route changes...
      this.toSearch = false
      if (this.$route.path == "/store" || this.$route.path == "/vacancies") this.toSearch = true
      this.backIconFunc(to)
    },
    appMode (val) {
      if(val) {
        this.$q.dark.set(false)
        } else {
        this.$q.dark.set(true)
      }
    }
  }
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
      padding-left: 94px
</style>