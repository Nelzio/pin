<template>
  <q-page
    class="flex flex-center"
    v-touch-swipe.mouse.left.right.down="handleSwipe"
  >
    <!--<h5 v-if="isConected">App Mode: <b class="text-green-8">Internet</b></h5>-->
    <!--<h5 v-else>App Mode: <b class="text-red-8">Offline</b></h5>-->
    <home-content v-if="!$q.screen.gt.sm" />

    <div v-else class="row justify-center q-gutter-y-md">
      <q-card class="my-card col-12 col-md-8">
        <q-video src="https://www.youtube.com/embed/AQj33T3g2h4" style="height: 40vh;" />
        <!-- <iframe width="960" height="540" src="https://www.youtube.com/embed/AQj33T3g2h4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

        <q-card-section>
          <div class="text-h6">Saiba mais sobre nossa app</div>
          <div class="text-subtitle2">Uma só, para todos</div>
        </q-card-section>

        <q-card-section>Na aplicacao foi usado o conceito de universal design para satisfazer a todos sem nenhuma destinção.</q-card-section>
      </q-card>

      <q-card class="my-card col-12 col-md-8">
        <q-card-section>{{ lorem }}</q-card-section>
      </q-card>

      <q-card
        class="my-card text-white col-12 col-md-8"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
      >
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-section>{{ lorem }}</q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";
import HomeContent from "../components/HomeContent";
export default {
  name: "PageIndex",
  components: { HomeContent },
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    ...mapState("settings", ["isConected", "settings", "appMode"])
  },
  methods: {
    ...mapActions("settings", ["playSound", "vibrate"]),
    handleSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/work");
      }
      if (val.direction === "down") {
        this.$router.push("/account");
      }
    }
  },
  mounted() {

    if (this.settings.isVibrationActive) {
      this.vibrate();
    }

    if (this.settings.isNarratorActive) {
      this.playSound("/statics/audios/home.aac");
		}
		
		
  }
};
</script>

