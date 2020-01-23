<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
  <q-header elevated>
      <q-toolbar :class="[darkModeConf.bgColor, darkModeConf.textColor]">
        <q-btn
          icon="arrow_back"
          flat
          round
          dense
          @click="$router.go(-1)"
          v-if="backPage" />
        <q-toolbar-title class="text-center">
          Superactive | Conta
        </q-toolbar-title>
        <!-- <q-btn
          flat
          round
          size="lg"
          dense
          icon="volume_up"
        /> -->

      </q-toolbar>

    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  // name: 'LayoutName',

  data () {
    return {
      backPage: false,
      bgColor: "bg-white",
      textColor: "text-black",
      color: "black",
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    darkMode () {
      if(this.appMode) {
        this.$q.dark.set(false)
        } else {
        this.$q.dark.set(true)
      }
    }
  },
  mounted () {
    if(this.$route.path !== '/account') this.backPage = true
    this.darkMode()
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      this.backPage = false
      if(to.path !== '/account') this.backPage = true
    },
  }
}
</script>
