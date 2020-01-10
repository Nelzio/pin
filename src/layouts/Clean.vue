<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->
  <q-header elevated>
      <q-toolbar class="bg-white text-teal">
        <q-btn
          icon="arrow_back"
          flat
          round
          dense
          @click="$router.go(-1)"
          v-if="backPage" />
        <q-toolbar-title class="text-center">
          Superativo | Conta
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
export default {
  // name: 'LayoutName',

  data () {
    return {
      backPage: false,
    }
  },
  mounted () {
    if(this.$route.path !== '/account') this.backPage = true
  },
  watch: {
    $route(to, from) {
      // react to route changes...
      this.backPage = false
      if(to.path !== '/account') this.backPage = true
    }
  }
}
</script>
