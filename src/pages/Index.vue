<template>
  <q-page class="flex flex-center" v-touch-swipe.mouse.left.right.down="handleSwipe">
    <!--<h5 v-if="isConected">App Mode: <b class="text-green-8">Internet</b></h5>-->
    <!--<h5 v-else>App Mode: <b class="text-red-8">Offline</b></h5>-->
    <!-- <home-content v-if="!$q.screen.gt.sm" /> -->
    <home-content v-if="!$q.screen.gt.sm" />

    <div v-else class="q-gutter-y-lg q-pa-lg">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Vagas de emprego</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/djob.png" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/business.png" />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Exposição de produtos</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Negocio</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/deal.png" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/inclusive.png" />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Inclusão</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>
        </q-card-section>
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
        this.$router.push("/vacancies");
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

