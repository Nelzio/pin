<template>
  <q-page padding v-touch-swipe.mouse.left.right="handleSwipe" class="q-pb-xl">
    <!-- content -->
    <div class="q-pb-xl">
      <div class="row q-gutter-y-md">
        <div class="col-12 col-md-4" :class="padding" v-for="(vacancy, i) in vacancies" :key="i">
          <vacancy-desktop-component :lorem="lorem" :vacancy="vacancy" />
        </div>
      </div>
    </div>

    <!-- <div v-else>
      <q-list>
        <q-card class="my-card" v-for="(vacancy, i) in vacancies" :key="i">
          <vacancy-component :vacancy="vacancy"/>
        </q-card>
        
      </q-list>
    </div>-->

    <div>
      <q-dialog v-model="addVacancy" :maximized="maximizedToggle">
        <q-card>
          <q-card-section class="row items-center">
            <div class="text-h6">Adicionar Vaga</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input :color="darkModeConf.color" rounded outlined v-model="text" label="Nome" />
              <q-editor :color="darkModeConf.color" v-model="description" min-height="8rem" />
            </q-form>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn rounded :color="darkModeConf.color" :class="darkModeConf.textBtn" class="full-width" label="Enviar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.color"
        :class="darkModeConf.textBtn"
        @click="addVacancy = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex"
import VacancyComponent from "../../components/work/VacancyComponent"
import VacancyDesktopComponent from "../../components/work/VacancyDesktopComponent"
export default {
  components: { VacancyDesktopComponent, VacancyComponent },
  // name: 'PageName',
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      padding: "",
      maximizedToggle: true,
      deviceWidth: 375,
      addVacancy: false,
      vacancies: [
        {
          name: "Vaga de contabilista",
          company: "Explicador Inc",
          desc:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          img:
            "https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg"
        },
        {
          name: "Vaga de contabilista",
          company: "Explicador Inc",
          desc: "Vaga para um contabilista junior",
          img:
            "https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg"
        },
        {
          name: "Vaga de contabilista",
          company: "Explicador Inc",
          desc: "Vaga para um contabilista junior",
          img:
            "https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg"
        },
        {
          name: "Vaga de contabilista",
          company: "Explicador Inc",
          desc: "Vaga para um contabilista junior",
          img:
            "https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg"
        },
        {
          name: "Vaga de contabilista",
          company: "Explicador Inc",
          desc: "Vaga para um contabilista junior",
          img:
            "https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg"
        },
        {
          name: "Vaga de contabilista",
          company: "Explicador Inc",
          desc: "Vaga para um contabilista junior",
          img:
            "https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg"
        },
        {
          name: "Vaga de contabilista",
          company: "Explicador Inc",
          desc: "Vaga para um contabilista junior",
          img:
            "https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg"
        }
      ],
      text: '',
      description: '',
    };
  },
  computed: {
    ...mapState("settings", ["settings", "appMode", "darkModeConf"])
    // ...mapGetters('settings', [
    //     'getSettings'
    // ]),
  },
  methods: {
    // ...mapActions("settings", ["setSettings", "playSound", "vibrate"]),

    handleSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/store");
      }

      if (val.direction === "right") {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.deviceWidth = window.screen.width;
    if (this.$q.screen.gt.sm) this.padding = "q-pa-sm";
    // console.log(this.deviceWidth)

    this.$root.$emit("isHomePage", "Vagas");

    // Vibração
    if (this.settings.isVibrationActive) {
      this.vibrate();
    }
    // Play do áudio
    if (this.settings.isNarratorActive) {
      this.playSound("/statics/audios/vagas.aac");
    }
  }
};
</script>
