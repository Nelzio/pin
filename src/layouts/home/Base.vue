<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar class="bg-grey-3 text-teal">
        <q-btn
            @click="$router.go(-1)"
            flat
            dense
            round
            icon="arrow_back"
            aria-label="Menu"
        />
        <q-toolbar-title class="text-center">
          Oportunity
        </q-toolbar-title>
        <q-btn
          flat
          round
          size="lg"
          dense
          icon="account_circle"
          to="/profile"
        />

      </q-toolbar>

    </q-header>

    <q-footer elevated class="bg-grey-3 text-black" v-if="!$q.screen.gt.sm">
      <q-tabs active-color="teal" indicator-color="transparent" class="text-grey">
        <q-route-tab name="home" icon="home" to="/" />
        <q-route-tab name="trabalho" icon="work" to="/work" />
        <q-route-tab name="search" icon="storefront" to="/search" />
        <q-route-tab name="profile" icon="settings" to="/settings" />
        <!--<q-route-tab name="profile" icon="person" to="/profile" />-->

      </q-tabs>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      behavior="mobile"
      content-class="bg-grey-2"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <!-- This is where pages get injected -->
      <router-view />

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn round flat color="grey-8" stack no-caps size="26px" class="GPL__side-btn" to="/">
            <q-icon size="22px" name="home" />
            <div class="GPL__side-btn__label">Home</div>
          </q-btn>

          <q-btn round flat color="grey-8" stack no-caps size="26px" class="GPL__side-btn" to="/work">
            <q-icon size="22px" name="work" />
            <div class="GPL__side-btn__label">Vagas</div>
          </q-btn>

          <q-btn round flat color="grey-8" stack no-caps size="26px" class="GPL__side-btn" to="/search">
            <q-icon size="22px" name="search" />
            <div class="GPL__side-btn__label">Pesquisar</div>
            <!-- <q-badge floating color="red" text-color="white" style="top: 8px; right: 16px">
              1
            </q-badge> -->
          </q-btn>
          <q-btn round flat color="grey-8" stack no-caps size="26px" class="GPL__side-btn" to="/profile">
            <q-icon size="22px" name="person" />
            <div class="GPL__side-btn__label">Perfil</div>
          </q-btn>

        </div>
      </q-page-sticky>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: false,
      tab:"home",
      navtab: "list",
        isHome: true
    }
  },
    mounted () {
        this.$root.$on('isHomePage', (val) => {
            this.isHome = val
        })
        this.$root.$emit('isHomePage', this.$router.currentRoute.path === '/')
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
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>