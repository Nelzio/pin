<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->
    <!-- <q-header height-hint="64">
        <q-space />
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-toolbar-title
          class="row items-center text-center no-wrap"
        >
        <q-btn color="white" round>
          <q-img src="statics/app-logo-128x128.png" style="height: 50px" alt="">
        </q-btn>
        Emprego Inclusivo</q-toolbar-title>
      </q-toolbar>
    </q-header>-->
    <!-- <q-header height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-toolbar-title class="text-center">
          <q-avatar class="bg-white">
            <q-img src="statics/app-logo-128x128.png" />
          </q-avatar>Emprego Inclusivo
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar"
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
    }
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
      padding-left: 94px
</style>