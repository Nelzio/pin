<template>
  <q-layout :class="[appMode.textColor, appMode.bgColor]" view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
          v-if="$q.screen.gt.sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.sm" shrink class="row items-center no-wrap">
          Superativo
        </q-toolbar-title>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="volume_up">
            <q-tooltip>Som</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn
            round
            flat
          >
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
            <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
            >
              <q-list style="min-width: 100px">
                <template v-if="isUserAuth">
                  <q-item to="/profile" clickable>
                    <q-item-section>Perfil</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item
                      @click="logoutUser"
                      clickable>
                    <q-item-section>Sair</q-item-section>
                  </q-item>
                </template>
                <q-item
                   v-else
                   to="/account"
                   clickable>
                  <q-item-section>Entrar</q-item-section>
                </q-item>

              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer :class="[appMode.textColor, appMode.bgColor]" elevated class="bg-white text-black" v-if="!$q.screen.gt.sm">
      <q-tabs active-color="teal" indicator-color="transparent" class="text-grey">
        <q-route-tab name="home" icon="home" to="/" />
        <q-route-tab name="trabalho" icon="work" to="/work" />
        <q-route-tab name="store" icon="storefront" to="/store" />
        <q-route-tab name="profile" icon="settings" to="/settings" />
        <!--<q-route-tab name="profile" icon="person" to="/profile" />-->
      </q-tabs>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      behavior="mobile"
      @click="leftDrawerOpen = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-grey-8">
            <!-- <img class="q-pl-md" src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"> -->
            <span class="q-ml-sm">Superativo Negocio</span>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" :to="link.to" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
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

          <q-btn round flat color="grey-8" stack no-caps size="26px" class="GPL__side-btn" to="/store">
            <q-icon size="22px" name="storefront" />
            <div class="GPL__side-btn__label">Loja</div>
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
  import { mapState, mapActions } from 'vuex'
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: false,
      leftDrawerOpen: false,
      tab:"home",
      navtab: "list",
      isHome: 'Início',
      links1: [
        { icon: 'work', text: 'Vagas', to: "/company/vacancies" },
        { icon: 'group', text: 'Candidatos', to: "/company/employees" },
        { icon: 'mic', text: 'Entrevistas', to: "/company/interviews" },
      ],
    }
  },
    computed: {
        ...mapState('settings', ['appMode']),
        ...mapState('auth', ['isUserAuth']),
    },
    mounted () {
        this.$root.$on('isHomePage', (val) => {
            this.isHome = val
        })
        this.$root.$emit('isHomePage', this.$router.currentRoute.path === '/')
    },
    methods: {
        ...mapActions ('auth', ['logoutUser'])
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
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500

  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>