<template>
  <q-page class="presentation bg-primary" padding v-touch-swipe.mouse.left.right.down="handleSwipe">
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      navigation
      swipeable
      control-color="white"
      class="rounded-borders bg-primary"
    >
      <q-carousel-slide name="primeiro" class="column no-wrap flex-center">
        <q-btn round color="white" size="39px">
          <q-icon color="primary" name="img:statics/img/home/appLogoHome.png" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white q-gutter-y-sm">
          <div class="text-h4">Superactive</div>
          <div class="text-h6">Bem vindo ao aplicativo mais inclusivo de Moçambique.</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="segundo" class="column no-wrap flex-center">
        <q-btn round color="white" size="39px">
          <q-icon color="primary" name="work" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white q-gutter-y-sm">
          <div class="text-h4">Emprego</div>
          <div class="text-h6">Encontre emprego ou disponibilize vagas de emprego.</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="terceiro" class="column no-wrap flex-center">
        <q-btn round color="white" size="39px">
          <q-icon color="primary" name="store" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white q-gutter-y-sm">
          <div class="text-h4">Negócio</div>
          <div class="text-h6">Encontre e disponibilize produtos e serviços.</div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <!-- <q-btn-toggle
        glossy
        v-model="slide"
        :options="[
          { label: 1, value: 'style' },
          { label: 2, value: 'tv' },
          { label: 3, value: 'layers' },
          { label: 4, value: 'map' }
        ]"
      />-->
      <q-btn rounded color="white" text-color="primary" label="A seguir" @click="next()" />
    </div>

    <audio ref="testAudio" :src="audioPath" autoplay />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="white"
        text-color="primary"
        class="shadow-5"
        :icon="vibrateMode ? 'volume_off' : 'volume_up'"
        @click="vibrateMode = !vibrateMode"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      options: [
        { label: 1, value: "primeiro" },
        { label: 2, value: "segundo" },
        { label: 3, value: "terceiro" }
      ],
      audioPath: "statics/audios/tts.mp3",
      vibrateMode: true,
      slide: "primeiro",
      pitch: 0.8,
      rate: 1,
      synth: window.speechSynthesis,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      textToSpeechRouter:
        "Bem vindo a plataforma Superactive.\n Encontre vagas de emprego, divulgue seus produtos e serviços nesta plataforma mais inclusiva de Moçambique.\n Deslize o dedo para a esquerda 3 vezes para ir a página inicial.\n Para desativar o modo de narração e vibração, vai até a pagina de preferências e desabilite o modo de narração e vibração.\n Para repetir o áudio, deslize do dedo do topo da tela para baixo."
    };
  },
  computed: {
    ...mapState("settings", ["vibrateState"])
  },

  methods: {
    ...mapActions("settings", ["setVibrate", "setAppMode"]),

    next() {
      if (this.slide == "primeiro") {
        this.slide = "segundo";
      } else if (this.slide == "segundo") {
        this.slide = "terceiro";
      } else {
        LocalStorage.set("notFirst", true);
        this.$router.push("/");
      }
    },

    vibrateApp() {
      if (this.vibrateMode) {
        this.setVibrate(1);
      } else {
        this.$refs.testAudio.pause();
        this.setVibrate(0);
      }
    },

    handleSwipe(val) {
      if (val.direction === "left" && this.slide == "terceiro") {
        LocalStorage.set("notFirst", true);
        this.$router.push("/");
      }

      if (val.direction === "down" && this.vibrateMode) {
        this.$refs.testAudio.play();
      }
    },

    accessibilityMode() {
      var textToSpeechRouter =
        "Bem vindo a plataforma Superactive.\n Encontre vagas de emprego, divulgue seus produtos e serviços nesta plataforma mais inclusiva de Moçambique.\n Deslize o dedo para a esquerda 3 vezes para ir a página inicial.\n Para desativar o modo de narração e vibração, vai até a pagina de preferências e desabilite o modo de narração e vibração.\n Para repetir o áudio, deslize do dedo do topo da tela para baixo.";
      if (window.hasOwnProperty("cordova")) {
        this.speakCordova(textToSpeechRouter);
      } else {
        this.speak(textToSpeechRouter);
      }
    }
  },
  mounted() {
    if (this.vibrateState == 1) {
      this.vibrateMode = true;
      this.$refs.testAudio.play();
    } else {
      this.vibrateMode = false;
    }
  },

  watch: {
    vibrateMode() {
      this.vibrateApp();
    }
  }
};
</script>

<style lang="sass">
  // .presentation
  //   background: url("..statics/img/background/background.svg") center bottom no-repeat
  //   background-size: 100vh 100vw
    
</style>

