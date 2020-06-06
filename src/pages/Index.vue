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
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Vagas de emprego</div>
            <div
              :class="getFont.text"
            >Publique e encontre vagas de emprego na plataforma. A plataforma é inclusiva, no sentido de que todos pode usar de igual forma, sendo assim, todos os utilizadores da plataforma podem publicar vagas de emprego e se candidatar a uma delas. Tanto pessoas singulares como colectivas.</div>
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
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Negócio</div>
            <div
              :class="getFont.text"
            >Exponha os seus produtos e serviços e também encontre produtos e serviços de outros utilizadores da plataforma. Alcance mais facil os seu clientes e encontre rápido o que deseja.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Inclusão</div>
            <div
              :class="getFont.text"
            >A plataforma é inclusiva e tem recurso de acessiblidade indispensavel. Pessoas com e sem dificiencia podem usar a plataforma de igual forma, assim todos interagem e as diferenças são iliminadas.</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/inclusive.png" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
    <!-- <audio ref="testAudio" :src="audioPath" autoplay /> -->
    <audio ref="testAudio" :src="audioPath" />
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import HomeContent from "components/HomeContent.vue";
import pdf from 'vue-pdf';
export default {
  name: "PageIndex",
  components: { HomeContent },
  data() {
    return {
      audioPath: "statics/audios/homepage.mp3",
      lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis
    };
  },
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart"])
  },
  methods: {
    ...mapActions("settings", ["playSound", "vibrate", "setStart"]),

    speakAudioStart() {
      if (this.getStart && this.vibrateState) {
        this.$refs.testAudio.play();
        this.setStart(false)
      } else {
        this.$root.$emit(
          "textToSpeechRouter",
          "Página Inicial.\n Para navegar entre as páginas, deslise o dedo para as laterais."
        );
      }
    },

    handleSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/vacancies");
      }
      
      if (val.direction === "down" && this.vibrateState) {
        this.$refs.testAudio.play();
      }
      // if (val.direction === "down") {
      //   this.$router.push("/account");
      // }
    },
  },
  mounted() {
    this.speakAudioStart()
    // this.$root.$emit("textToSpeechRouter", "Página Inicial");
    
  }
};
</script>

<style lang="sass">
  // .pdfcontent.q-card__section
  //   width: 676px
  //   height: 915px
    
</style>

