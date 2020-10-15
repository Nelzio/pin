<template>
  <q-page
    class="presentation bg-primary"
    padding
    v-touch-swipe.mouse.left.right="handleSwipe"
  >
    <div class="absolute" style="left: -800px">
      <q-btn
        label="Ouvir mensagem de boas vindas"
        role="button"
        @click="$refs.testAudio.play()"
      />
      <q-btn label="Página inicial" role="link" to="/" />
    </div>
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
      <q-carousel-slide
        name="primeiro"
        class="column no-wrap flex-center"
        role="group"
      >
        <q-btn round color="white" size="39px">
          <q-icon
            color="primary"
            name="img:statics/img/home/appLogoHome.png"
            size="96px"
            role="img"
            lang="pt-PT"
            aria-label="Imagem"
          />
        </q-btn>
        <div class="q-mt-md text-center text-white q-gutter-y-sm" role="group">
          <div class="text-h4">Superativo</div>
          <div class="text-h6">
            Bem-vindo a plataforma mais inclusiva de Moçambique.
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="segundo" class="column no-wrap flex-center">
        <q-btn round color="white" size="39px">
          <q-icon color="primary" name="work" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white q-gutter-y-sm">
          <div class="text-h4">Emprego</div>
          <div class="text-h6">Encontre e disponibilize vagas de emprego.</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="terceiro" class="column no-wrap flex-center">
        <q-btn round color="white" size="39px">
          <q-icon color="primary" name="store" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white q-gutter-y-sm">
          <div class="text-h4">Negócio</div>
          <div class="text-h6">
            Encontre e disponibilize produtos e serviços.
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <!-- <q-btn
        rounded
        color="white"
        text-color="primary"
        label="A seguir"
        @click="next()"
      /> -->
      <q-btn-group
        rounded
        role="group"
        aria-label="Controlo do slide de boas vindas"
      >
        <q-btn
          flat
          v-show="slide != 'primeiro'"
          color="white"
          icon="arrow_back"
          aria-label="Anterior"
          lang="pt-PT"
          size="lg"
          @click="back()"
          style="width: 120px"
        />
        <q-btn
          flat
          color="white"
          icon="arrow_forward"
          aria-label="Próximo"
          lang="pt-PT"
          size="lg"
          @click="next()"
          style="width: 120px"
        />
      </q-btn-group>
    </div>

    <audio ref="testAudio" :src="audioPath" />
    <!-- <audio
      ref="testAudio"
      :src="audioPath"
      autoplay
    /> -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-gutter-x-md">
        <q-btn
          rounded
          color="white"
          text-color="primary"
          class="shadow-5"
          icon="replay"
          @click="$refs.testAudio.play()"
          role="button"
          label="Ouvir Audio"
        />
        <q-btn
          round
          color="white"
          text-color="primary"
          class="shadow-5"
          :icon="vibrateMode ? 'accessible' : 'not_accessible'"
          @click="accessibility()"
          role="button"
          lang="pt-PT"
          :aria-label="
            changeStatus
              ? vibrateMode
                ? 'Modo acessibilidade ativo'
                : 'Modo acessibilidade desativado'
              : 'Ativar e desativar modo acessibilidade.'
          "
        />
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar"
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  name: "Home",
  data() {
    return {
      changeStatus: false,
      options: [
        { label: 1, value: "primeiro" },
        { label: 2, value: "segundo" },
        { label: 3, value: "terceiro" },
      ],
      audioPath: "statics/audios/welcome.mp3",
      vibrateMode: false,
      slide: "primeiro",
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      textToSpeechRouter:
        "Bem-vindo a plataforma Superativo. Encontre vagas de emprego, divulgue seus produtos e serviços nesta plataforma mais inclusiva de Moçambique.\n Para desativar o modo de narração e vibração, vai até a página de preferências ou clique no botão de audio no canto inferior direito da tela e desabilite o.\n Para repetir o áudio, clique no botão Ouvir Audio.",
    }
  },
  computed: {
    ...mapState("settings", ["vibrateState"]),
    ...mapGetters("settings", ["getVibrate"]),
  },

  methods: {
    ...mapActions("settings", ["setVibrate"]),

    accessibility() {
      this.changeStatus = true
      this.vibrateMode = !this.vibrateMode
    },

    next() {
      if (this.slide == "primeiro") {
        this.slide = "segundo"
      } else if (this.slide == "segundo") {
        this.slide = "terceiro"
      } else {
        LocalStorage.set("notFirst", true)
        this.$router.push("/")
      }
    },
    back() {
      if (this.slide == "terceiro") {
        this.slide = "segundo"
      } else if (this.slide == "segundo") {
        this.slide = "primeiro"
      }
    },

    vibrateApp() {
      if (this.vibrateMode) {
        this.setVibrate(1)
      } else {
        this.$refs.testAudio.pause()
        this.setVibrate(0)
      }
    },

    handleSwipe(val) {
      if (val.direction === "left" && this.slide == "terceiro") {
        LocalStorage.set("notFirst", true)
        this.$router.push("/")
      }

      if (val.direction === "down" && this.vibrateMode) {
        this.$refs.testAudio.play()
      }
    },

    speakCordova(userInput) {
      navigator.vibrate(200)
      window.navigator.vibrate(200)
      TTS.speak(
        {
          text: userInput,
          locale: "pt-PT",
          rate: 0.8,
        },
        function () {
          // console.log('Text succesfully spoken');
        },
        function (reason) {
          console.log(reason)
        }
      )
    },

    speak(userInput) {
      if (this.synth.speaking) {
        // console.error('speechSynthesis.speaking');
        // console.log("Teste")
        this.synth.cancel()
        // return;
      }
      if (userInput !== "") {
        let sInstance = new SpeechSynthesisUtterance(userInput)
        sInstance.onend = function (event) {
          // console.log('SpeechSynthesisUtterance.onend');
        }
        sInstance.onerror = function (event) {
          // console.error('SpeechSynthesisUtterance.onerror');
        }
        // vibrate antes de falar
        navigator.vibrate(200)
        window.navigator.vibrate(200)
        // speak
        sInstance.pitch = this.pitch
        sInstance.rate = this.rate
        sInstance.lang = "pt-PT"
        this.synth.speak(sInstance)
      } else {
        let sInstance = new SpeechSynthesisUtterance("Nenhum texto nesta área.")
        sInstance.onend = function (event) {
          // console.log('SpeechSynthesisUtterance.onend');
        }
        sInstance.onerror = function (event) {
          // console.error('SpeechSynthesisUtterance.onerror');
        }

        // vibrate antes de falar
        navigator.vibrate(200)
        window.navigator.vibrate(200)
        // speak
        sInstance.pitch = this.pitch
        sInstance.rate = this.rate
        sInstance.lang = "pt-PT"
        this.synth.speak(sInstance)
      }
    },
  },
  mounted() {
    if (this.vibrateState == 1) {
      this.vibrateMode = true
      this.$refs.testAudio.play()
    } else {
      this.vibrateMode = false
    }
  },

  watch: {
    vibrateMode(val) {
      this.vibrateApp()
      if (val) {
        var textToSpeechRouter = "Modo acessibilidade ativo"
      } else {
        var textToSpeechRouter = "Modo acessibilidade desativado"
      }

      if (window.hasOwnProperty("cordova")) {
        this.speakCordova(textToSpeechRouter)
      } else {
        this.speak(textToSpeechRouter)
      }
    },
    changeStatus(val) {
      const vm = this
      if (val) {
        setTimeout(() => {
          vm.changeStatus = false
        }, 4000)
      }
    },
  },
}
</script>

<style lang="sass">
  // .presentation
  //   background: url("..statics/img/background/background.svg") center bottom no-repeat
  //   background-size: 100vh 100vw
</style>

