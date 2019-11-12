<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar class="bg-grey-3 text-teal">
        <!-- <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        /> -->
        <q-toolbar-title class="text-center">
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          Oportunity
        </q-toolbar-title>
      </q-toolbar>

      <!-- <q-tabs class="bg-grey-3 text-teal" v-model="navtab">
        <q-route-tab
          to="/"
          replace
          label="List"
          name="list"
        />
        <q-route-tab
          to="/some/other/route"
          replace
          label="Map"
          name="map"
        />
      </q-tabs> -->
    </q-header>

    <q-footer elevated class="bg-grey-3 text-black">
      <q-tabs active-color="teal" indicator-color="transparent" class="text-grey">
        <q-route-tab name="home" icon="home" to="/" />
        <q-route-tab name="trabalho" icon="work" to="/work" />
        <q-route-tab name="search" icon="search" to="/search" />
        <q-route-tab name="profile" icon="person" to="/profile" />
        
      </q-tabs>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <!-- Content here -->
      </q-scroll-area>
    </q-drawer>

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
      leftDrawer: false,
      tab:"home",
      navtab: "list"
    }
  }
}
</script>
