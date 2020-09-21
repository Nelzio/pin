<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="isHome"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          role="button"
          lang="pt-PT"
          aria-label="Página de login"
        />
        <q-btn
          v-else
          @click="$router.go(-1)"
          flat
          dense
          round
          icon="arrow_back"
          role="link"
          lang="pt-PT"
          aria-label="Página de login"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
          <q-btn
            icon="settings"
            flat
            round
            to="/settings"
          />
        </div>
      </q-toolbar>
    </q-header>

    <base-left-drawer :leftDrawerOpen="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import BaseLeftDrawer from "../components/base/BaseLeftDrawer";
export default {
  name: 'MyLayout',
  components: { BaseLeftDrawer },
  data () {
    return {
      leftDrawerOpen: false,
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
