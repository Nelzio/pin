<template>
  <q-page
    v-touch-swipe.mouse.left.right="handleSwipe"
    class="q-pb-xl"
  >
    <!-- content -->

    <div
      v-if="!vacancies || loading"
      class="row justify-center q-gutter-y-md"
    >
      <div
        class="col-12 col-md-4"
        v-for="i in 20"
        :key="i"
      >
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-skeleton
            height="200px"
            square
          />

          <q-card-actions
            align="right"
            class="q-gutter-md"
          >
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div
      class="q-pb-xl"
      :class="cardClass"
    >
      <!-- <div v-if="!val_search && !filterVal" class="row q-gutter-y-md">
        <div
          ref="item"
          class="col-12 col-md-4"
          :class="padding"
          v-for="vacancy in vacancies"
          :key="vacancy.key"
        >
          <vacancy-component :lorem="lorem" :vacancy="vacancy" />
        </div>
      </div>-->
      <q-infinite-scroll
        v-if="!val_search && !filterVal"
        @load="onLoad"
        :offset="250"
      >
        <div class="row q-gutter-y-md">
          <div
            ref="item"
            class="col-12 col-md-4"
            :class="padding"
            v-for="vacancy in tempVacancy"
            :key="vacancy.key"
          >
            <vacancy-component
              :lorem="lorem"
              :vacancy="vacancy"
            />
          </div>
        </div>
        <q-card
          v-if="endPage"
          class="my-card q-pt-lg"
        >
          <q-item
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label
                class="text-center text-bold"
                :color="darkModeConf.iconVar"
              >End Page</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>

        <template
          v-else
          v-slot:loading
        >
          <div class="row justify-center q-my-md">
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </template>
      </q-infinite-scroll>
      <div
        v-else
        class="row q-gutter-y-md"
      >
        <div
          ref="item"
          class="col-12 col-md-4"
          :class="padding"
          v-for="vacancy in data_var"
          :key="vacancy.key"
        >
          <vacancy-component
            :lorem="lorem"
            :vacancy="vacancy"
          />
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

    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
      v-if="user && isUserAuth"
    >
      <q-btn
        fab
        round
        :color="darkModeConf.iconVar"
        :class="darkModeConf.textBtn"
        to="/profile/vacancy/add"
      >
        <q-icon
          size="lg"
          name="add"
        />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import VacancyComponent from "components/work/VacancyComponent";
export default {
  components: { VacancyComponent },
  name: "Vacancies",
  props: ["val_search", "filterVal"],
  data () {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      padding: "",
      maximizedToggle: true,
      deviceWidth: 375,
      addVacancy: false,
      text: "",
      description: "",
      valSearch: "",
      loading: true,
      data_var: [],
      cardClass: "",
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      itemsLayzeRef: [],
      lazyImages: [],
      tempVacancy: [],
      start: 0,
      end: 50,
      endPage: false,
      first: false
    };
  },
  computed: {
    ...mapState("settings", [
      "settings",
      "appMode",
      "darkModeConf",
      "vibrateState"
    ]),
    ...mapState("vacancy", ["vacancies", "vacancy"]),
    ...mapGetters("vacancy", ["getVacancies", "getVacancy"]),
    ...mapGetters("auth", ["user", "isUserAuth"])
  },
  methods: {
    ...mapActions("settings", ["setSettings", "playSound"]),
    ...mapActions("vacancy", ["listVacancy", "createVacancy"]),
    ...mapActions("user", ["detailUser"]),

    onLoad (index, done) {
      let vm = this;
      if (this.tempVacancy.length == this.vacancies.length) {
        this.endPage = true;
      } else {
        setTimeout(() => {
          if (vm.tempVacancy) {
            vm.vacancies.slice(vm.start, vm.end).forEach(element => {
              vm.tempVacancy.push(element);
            });
            vm.start = vm.end;
            vm.end = vm.end + 50;
            done();
          }
        }, 3000);
      }
    },

    firstLoad () {
      console.log("Hey");
      this.vacancies.slice(this.start, this.end).forEach(element => {
        this.tempVacancy.push(element);
        console.log("Hey2");
      });
      this.start = this.end;
      this.end = this.end + 1;
    },

    speak (userInput) {
      if (this.synth.speaking) {
        // console.error('speechSynthesis.speaking');
        return;
      }
      if (userInput !== "") {
        let sInstance = new SpeechSynthesisUtterance(userInput);
        sInstance.lang = "pt-PT";
        sInstance.onend = function (event) {
          // console.log('SpeechSynthesisUtterance.onend');
        };
        sInstance.onerror = function (event) {
          // console.error('SpeechSynthesisUtterance.onerror');
        };
        // vibrate antes de falar
        window.navigator.vibrate(200);
        // speak
        sInstance.pitch = this.pitch;
        sInstance.rate = this.rate;
        this.synth.speak(sInstance);
      } else {
        let sInstance = new SpeechSynthesisUtterance(
          "Nenhum texto nesta área."
        );
        sInstance.onend = function (event) {
          // console.log('SpeechSynthesisUtterance.onend');
        };
        sInstance.onerror = function (event) {
          // console.error('SpeechSynthesisUtterance.onerror');
        };

        // vibrate antes de falar
        window.navigator.vibrate(200);
        // speak
        sInstance.pitch = this.pitch;
        sInstance.rate = this.rate;
        this.synth.speak(sInstance);
      }
    },

    speakCordova (userInput) {
      navigator.vibrate(200);
      TTS.speak(
        {
          text: userInput,
          locale: "pt-PT",
          pitch: this.pitch,
          rate: this.rate
        },
        function () {
          console.log("Text succesfully spoken");
        },
        function (reason) {
          alert(reason);
        }
      );
    },

    handleSwipe (val) {
      if (val.direction === "left") {
        this.$router.push("/store");
      }

      if (val.direction === "right") {
        this.$router.push("/");
      }
    },

    lazeItems () {
      if (!(this.itemsLayzeRef == this.$refs.item)) {
        this.itemsLayzeRef = this.$refs.item;
      }
      let active = false;
      if (active === false && this.itemsLayzeRef) {
        active = true;
        this.itemsLayzeRef.forEach(function (item) {
          var position =
            window.innerHeight - item.getBoundingClientRect().bottom;
          var interval1 = item.getBoundingClientRect().top - 55;
          var interval2 = item.getBoundingClientRect().top + 55;
          if (position <= interval2 && position >= interval1) {
            // setTimeout(function() {
            if (window.hasOwnProperty("cordova")) {
              navigator.vibrate(350);
            } else {
              window.navigator.vibrate(350);
            }
            // }, 200)
          }
        });
        active = false;
      }
    },

    search (val) {
      if (val != "") {
        var temp = new RegExp(".*" + val + ".*");
        var items = [];
        var vacancies = this.vacancies;
        for (var i in vacancies) {
          var value = vacancies[i]["title"].match(temp);
          var valueDesc = vacancies[i]["description"].match(temp);
          var valuePlace = vacancies[i]["place"].match(temp);
          var valueCategory = vacancies[i]["category"].match(temp);
          if (value != null && valueDesc != null) {
            if (
              vacancies[i]["title"] == value[0] &&
              vacancies[i]["description"] == valueDesc[0]
            ) {
              items.push(vacancies[i]);
            }
          } else if (value != null) {
            if (vacancies[i]["title"] == value[0]) {
              items.push(vacancies[i]);
            }
          } else if (valueDesc != null) {
            if (vacancies[i]["description"] == valueDesc[0]) {
              items.push(vacancies[i]);
            }
          } else if (valuePlace != null) {
            if (vacancies[i]["place"] == valuePlace[0]) {
              items.push(vacancies[i]);
            }
          } else if (valueCategory != null) {
            if (vacancies[i]["category"] == valueCategory[0]) {
              items.push(vacancies[i]);
            }
          }
        }
        this.data_var = items.slice(0, 2);
      } else {
        this.data_var = [];
      }
    }
  },
  created () {
    this.listVacancy();
  },
  mounted () {
    // this.lazeItems();
    this.first = true;
    // this.firstLoad();

    if (this.vibrateState) {
      window.addEventListener("scroll", this.lazeItems);
      window.addEventListener("resize", this.lazeItems);
      window.addEventListener("orientationchange", this.lazeItems);
    }
    this.loading = false;
    this.deviceWidth = window.screen.width;
    if (this.$q.screen.gt.sm) {
      this.padding = "q-pa-sm";
      this.cardClass = "q-pl-xl";
    }
    // console.log(this.deviceWidth)
    // text to speech
    this.$root.$emit("isHomePage", "Vagas");
    this.$root.$on("textToSpeech", val => {
      var text =
        val.user +
        " disponibilizou a vaga de " +
        val.vacancy.title +
        "\n Clique para descrição.";
      if (window.hasOwnProperty("cordova")) {
        this.speakCordova(text);
      } else {
        this.speak(text);
      }
    });

    // Vibração
    // if (this.settings.isVibrationActive) {
    //   this.vibrate();
    // }
    // // Play do áudio
    // if (this.settings.isNarratorActive) {
    //   this.playSound("statics/audios/vagas.aac");
    // }
    // this.listVacancy()

    // this.$on("valueSearch")

    this.$root.$emit(
      "textToSpeechRouter",
      "Página de vagas.\n Ao rolar, o telefone vai vibrar quando um item estiver no centro."
    );
  },
  watch: {
    val_search (val) {
      this.search(val);
    },
    filterVal (val) {
      this.search(val);
    },
    vacancies () {
      // this.lazeItems();
      if (this.first) {
        this.firstLoad();
        this.first = false;
      }
    }
  }
};
</script>
