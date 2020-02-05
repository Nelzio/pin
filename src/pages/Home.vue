<template>
  <q-page class="presentation bg-primary" padding>
    <!-- <div v-if="!$q.screen.gt.sm" class="q-gutter-y-lg">
      <q-card flat class="my-card">
        <q-card-section horizontal>
          <q-card-section class="text-body1">Procure e encontre emprego</q-card-section>
          <q-img class="col-5" src="statics/img/home/djob.png" />
        </q-card-section>
      </q-card>
      <q-card flat class="my-card">
        <q-card-section horizontal>
          <q-img class="col-5" src="statics/img/home/business.png" />
          <q-card-section class="text-body1">Exponha os seus produtos e serviços</q-card-section>
        </q-card-section>
      </q-card>
      <q-card flat class="my-card">
        <q-card-section horizontal>
          <q-card-section class="text-body1">Encontre oportunidades de negocio</q-card-section>
          <q-img class="col-5" src="statics/img/home/deal.png" />
        </q-card-section>
      </q-card>
      <q-card flat class="my-card">
        <q-card-section horizontal>
          <q-img class="col-5" src="statics/img/home/inclusive.png" />
          <q-card-section class="text-body1">Aplicativo inclusivo</q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="q-gutter-y-lg q-pa-lg">
      <q-card flat class="my-card">
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
      <q-card flat class="my-card">
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
      <q-card flat class="my-card">
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
      <q-card flat class="my-card">
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
    </div>-->

    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      arrows
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
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
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
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  methods: {
    next() {
      if (this.slide == "primeiro") {
        this.slide = "segundo";
      } else if (this.slide == "segundo") {
        this.slide = "terceiro";
      } else {
        LocalStorage.set("notFirst", true)
        this.$router.push("/");
      }
    }
  },
  mounted () {
    this.$root.$emit("textToSpeechRouter", "Bem vindo a  plataforma Superactive.; Encontre vagas de emprego, divulgue seus produtos e serviços nesta plataforma mais inclusiva de Moçambique.;;;; Deslize o dedo para a direita para ir a pagina inicial.");
  }
};
</script>

<style lang="sass">
  // .presentation
  //   background: url("../statics/img/background/background.svg") center bottom no-repeat
  //   background-size: 100vh 100vw
    
</style>

