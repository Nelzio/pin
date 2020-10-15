<template>
  <div id="q-app">
    <router-view />
    <!-- @detected-condition fires when the connectivity status of the device changes -->
  </div>
</template>

<script>
import { LocalStorage } from "quasar";
import offline from "v-offline";
import { mapState, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    offline
  },
  data () {
    return {
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    ...mapActions("settings", ["setSettings", "setIsConected", "setVibrate"]),
    ...mapActions("auth", ["checkAuthUser"]),
  },
  created () {
    // Verificando se o utilizador tem configurações no LocalStorage
    // // let settings = this.$q.localStorage.getItem("stgs");
    // // let appMode = this.$q.localStorage.getItem("appMode");



    if (this.darkModeConf.bgColor == "bg-white") {

      if (window.hasOwnProperty("cordova")) {
        StatusBar.backgroundColorByHexString("#075e54");
        StatusBar.styleBlackOpaque();
      } else {
        this.$q.addressbarColor.set("#075e54");
      }
    } else {

      if (window.hasOwnProperty("cordova")) {
        StatusBar.backgroundColorByHexString("#000");
        StatusBar.styleBlackOpaque();
      } else {
        this.$q.addressbarColor.set("#000");
      }
    }


    // this.checkAuthUser ()
  },
  mounted () {
    if (this.$route.path == "/welcome") {
      this.$q.addressbarColor.set("#075e54");
    }

    if (LocalStorage.getItem("vibrate") !== null) {
      if (LocalStorage.getItem("vibrate") === 1) {
        this.setVibrate(1)
      } else {
        this.setVibrate(0)
      }
    }
    // else {
    //   this.setVibrate(1)
    // }
  },
  watch: {
    darkModeConf (val) {
      if (this.$route.path == "/welcome") {
        this.$q.addressbarColor.set("#075e54");
      } else {
        if (val.bgColor == "bg-white") {
          if (window.hasOwnProperty("cordova")) {
            StatusBar.backgroundColorByHexString("#075e54");
            StatusBar.styleBlackOpaque();
          } else {
            this.$q.addressbarColor.set("#075e54");
          }
        } else {
          if (window.hasOwnProperty("cordova")) {
            StatusBar.backgroundColorByHexString("#000000");
            StatusBar.styleBlackOpaque();
          } else {
            this.$q.addressbarColor.set("#000000");
          }
        }
      }
    }
  },

  $route (to, from) {
    if (this.$route.path == "/welcome") {
      this.$q.addressbarColor.set("#075e54");
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>