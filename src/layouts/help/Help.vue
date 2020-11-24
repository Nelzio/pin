<template>
  <q-layout view="hHh Lpr lff" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar
        class="GNL__toolbar"
        :class="[darkModeConf.bgColor, darkModeConf.textColor]"
        role="menubar"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          class="q-mr-sm"
          role="menu"
          lang="pt-PT"
          aria-label="Abrir menú"
        />

        <q-toolbar-title shrink class="row items-center no-wrap">
          <!-- <q-btn flat round to="/" style="margin: 0">
            <img src="statics/img/home/appLogo.png" style="height: 35px" />
          </q-btn> -->
          <router-link to="/">
            <img
              src="statics/logo.png"
              style="width: 150px"
              alt="Logótipo"
              role="img"
          /></router-link>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap" v-if="isUserAuth">
          <q-btn
            round
            flat
            role="button"
            lang="pt-PT"
            aria-label="Ir a página de perfil"
            to="/profile"
          >
            <q-avatar size="26px">
              <img :src="user.photoURL" role="img" alt="Imagem de perfil" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
    >
      <q-scroll-area
        class="fit"
        role="navigation"
        lang="pt-PT"
        aria-label="Menú de navegação"
      >
        <q-list
          padding
          role="list"
          lang="pt-PT"
          aria-label="Lista de navegação na área administrativa."
        >
          <q-item
            role="menuitem"
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            :to="link.to"
            clickable
          >
            <q-item-section avatar>
              <q-icon v-if="link.img" :name="'img:' + link.img" />
              <q-icon :color="darkModeConf.iconVar" v-else :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="darkModeConf.textColor">{{
                link.text
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-separator inset class="q-my-sm" />

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" lang="pt-PT" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" lang="pt-PT" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" lang="pt-PT" aria-label="About">About Google</a>
            </div>
          </div> -->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view
        :class="[darkModeConf.bgColor, darkModeConf.textColor]"
        class="q-pb-xl"
      />
      <div v-if="isUserAuth">
        <q-page-sticky class="q-pa-md">
          <q-btn
            icon="message"
            rounded
            role="button"
            label="Reclamar ou sugerir"
            :color="darkModeConf.iconVar"
            :class="darkModeConf.textBtn"
            @click="openDialogQuestion = true"
          />
        </q-page-sticky>
        <Questions
          :openDialogQuestion="openDialogQuestion"
          @close="openDialogQuestion = false"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { fasGlobeAmericas, fasFlask } from "@quasar/extras/fontawesome-v5"
import Questions from "components/Questions.vue"
export default {
  name: "GoogleNewsLayout",
  data() {
    return {
      openDialogQuestion: false,
      leftDrawerOpen: false,
      search: "",
      showAdvanced: false,
      showDateOptions: false,
      exactPhrase: "",
      hasWords: "",
      excludeWords: "",
      byWebsite: "",
      byDate: "Any time",
      links1: [
        {
          icon: "web",
          text: "Overview",
          to: "/help",
          img: "statics/app-icon.png",
        },
        { icon: "home", text: "Página Inicial", to: "/help/home" },
        { icon: "work", text: "Vagas", to: "/help/vacancies" },
        { icon: "store", text: "Negocio", to: "/help/stories" },
        { icon: "settings", text: "Configurações", to: "/help/settings" },
        { icon: "account_circle", text: "Perfil", to: "/help/profile" },
        { icon: "message", text: "Conversas", to: "/help/chat" },
        {
          icon: "accessibility",
          text: "Acessibilidade",
          to: "/help/accessibility",
        },
      ],
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapGetters("auth", ["isUserAuth", "user"]),
  },
  components: { Questions },
  methods: {
    onClear() {
      this.exactPhrase = ""
      this.hasWords = ""
      this.excludeWords = ""
      this.byWebsite = ""
      this.byDate = "Any time"
    },
    changeDate(option) {
      this.byDate = option
      this.showDateOptions = false
    },
  },
}
</script>

<style lang="sass">
.GNL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>