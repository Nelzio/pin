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
      <div
        v-if="!val_search && !filterVal"
        class="row q-gutter-y-md"
      >
        <div
          ref="item"
          class="col-12 col-md-4"
          :class="padding"
          v-for="vacancy in vacancies"
          :key="vacancy.key"
        >
          <vacancy-component
            :lorem="lorem"
            :vacancy="vacancy"
          />
        </div>
      </div>
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

    <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="user">
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.iconVar"
        :class="darkModeConf.textBtn"
        to="/profile/vacancy/add"
      />
    </q-page-sticky> -->
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import VacancyComponent from "components/work/VacancyComponent";
import { firestoreDB } from "boot/firebase";
import offline from "v-offline";
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
      vacancies: []
    };
  },
  computed: {
    ...mapState("settings", [
      "settings",
      "appMode",
      "darkModeConf",
      "vibrateState"
    ]),
    // ...mapState("vacancy", ["vacancies", "vacancy"]),
    // ...mapGetters("vacancy", ["getVacancies", "getVacancy"]),
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("settings", ["setSettings", "playSound"]),
    // ...mapActions("vacancy", ["listVacancy", "createVacancy"]),
    ...mapActions("user", ["detailUser"]),

    listVacancyHere (user) {
      // done
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const ref = firestoreDB.collection("vacancies");
      var vacancies = [];
      const vm = this;
      var itemsReady = [""];
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      ref
        .where("user", "==", user).where("public", "==", true)
        .get()
        .then(function (querySnapshot) {
          // vacancies = []
          querySnapshot.forEach(function (doc) {
            var date = doc.data().validate.split("/")
            if ((date[1] + "/" + date[0] + "/" + date[2] >= today) && !itemsReady.includes(doc.id)) {
              itemsReady.push(doc.id);
              vacancies.push({
                key: doc.id,
                title: doc.data().title,
                user: doc.data().user,
                description: doc.data().description,
                img: doc.data().img,
                public: doc.data().public,
                place: doc.data().place,
                validate: doc.data().validate,
                category: doc.data().category
              });
            }
          });
          vm.vacancies = vacancies;
        });
    },

    speak (userInput) {
      if (this.synth.speaking) {
        // console.error('speechSynthesis.speaking');
        return;
      }
      if (userInput !== "") {
        let sInstance = new SpeechSynthesisUtterance(userInput);
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

    handleSwipe (val) {
      if (val.direction === "left") {
        this.$router.push("/store");
      }

      if (val.direction === "right") {
        this.$router.push("/home");
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
            navigator.vibrate(350);
            window.navigator.vibrate(350);
            // console.log("Workkkk")
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
    this.listVacancyHere(this.$route.params.idUser);
  },
  mounted () {
    // this.lazeItems();

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
      var text = val.user + " disponibilizou a vaga de " + val.vacancy.title;
      this.speak(text);
    });

    this.$root.$emit("textToSpeechRouter", "Vagas do usuário.");
  },
  watch: {
    val_search (val) {
      this.search(val);
    },
    filterVal (val) {
      this.search(val);
    }
    // vacancies() {
    //   this.lazeItems();
    // }
  }
};
</script>
