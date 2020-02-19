<template>
  <q-page class="presentation bg-primary" padding v-touch-swipe.mouse.left.right="handleSwipe">
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
          <q-icon color="primary" name="accessibility_new" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white">
          <div class="text-h4">Bem vindo</div>
          <div class="text-body1">Bem vindo ao aplicativo mais inclusivo de Moçambique</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="segundo" class="column no-wrap flex-center">
        <q-btn round color="white" size="39px">
          <q-icon color="primary" name="work" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white">
          <div class="text-h4">Emprego</div>
          <div class="text-body1">Encotre emprego ou disponibilize vagas de emprego.</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="terceiro" class="column no-wrap flex-center">
        <q-btn round color="white" size="39px">
          <q-icon color="primary" name="store" size="96px" />
        </q-btn>
        <div class="q-mt-md text-center text-white">
          <div class="text-h4">Negócio</div>
          <div class="text-body1">Encontre e disponibilize produtos e serviços</div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="row justify-center">
      <q-btn rounded color="white" text-color="primary" label="A seguir" @click="next()" />
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      options: [
        { label: 1, value: "primeiro" },
        { label: 2, value: "segundo" },
        { label: 3, value: "terceiro" }
      ],
      slide: "primeiro",
      pitch: 0.8,
      rate: 1,
      synth: window.speechSynthesis,
      lorem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    ...mapState("settings", ["vibrateState"]),
  },

  methods: {
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

    speak(userInput) {
      const vm = this
      if (this.vibrateState === 1) {
        if (this.synth.speaking) {
          // console.error('speechSynthesis.speaking');
          return;
        }
        if (userInput !== "") {
          let sInstance = new SpeechSynthesisUtterance(userInput);
          sInstance.onend = function(event) {
            // console.log('SpeechSynthesisUtterance.onend');
          };
          sInstance.onerror = function(event) {
            // console.error('SpeechSynthesisUtterance.onerror');
          };
          // speak
          sInstance.pitch = this.pitch;
          sInstance.rate = this.rate;
          this.synth.speak(sInstance);
          setTimeout(() => {
            vm.$router.push("/welcome")
          }, 5000);
        } else {
          let sInstance = new SpeechSynthesisUtterance(
            "Nenhum texto nesta área."
          );
          sInstance.onend = function(event) {
            // console.log('SpeechSynthesisUtterance.onend');
          };
          sInstance.onerror = function(event) {
            // console.error('SpeechSynthesisUtterance.onerror');
          };
          sInstance.pitch = this.pitch;
          sInstance.rate = this.rate;
          this.synth.speak(sInstance);
        }
      }
    },

    handleSwipe(val) {
      if (val.direction === "left" && this.slide == "terceiro") {
        LocalStorage.set("notFirst", true);
        this.$router.push("/");
      }
    }
  },
  mounted() {
    var textToSpeechRouter = "Bem vindo a plataforma Superactive.\n Encontre vagas de emprego, divulgue seus produtos e serviços nesta plataforma mais inclusiva de Moçambique.\n Deslize o dedo para a esquerda 3 vezes para ir a página inicial.\n Para desativar o modo de naração e vibração, vai até a pagina de preferencias e desabilie o modo de naração e vibração"
    // textToSpeechRouter = "Bem vindo"
    const vm = this
    vm.speak(textToSpeechRouter)
  }
};
</script>

<style lang="sass">
  // .presentation
  //   background: url("..statics/img/background/background.svg") center bottom no-repeat
  //   background-size: 100vh 100vw
    
</style>

