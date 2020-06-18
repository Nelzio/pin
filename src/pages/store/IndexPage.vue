<template>
  <q-page class="q-pb-xl" v-touch-swipe.mouse.left.right="handleSwipe">
    <!-- content -->
    <div
      v-if="!stories || loading"
      class="row justify-center q-gutter-y-md"
      v-touch-swipe.mouse.left.right="handleSwipe"
    >
      <div class="col-12 col-md-4" v-for="i in 20" :key="i">
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

          <q-skeleton height="200px" square />

          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="q-pb-xl" :class="cardClass" v-touch-swipe.mouse.left.right="handleSwipe">
      <q-infinite-scroll v-if="!val_search && !filterVal" @load="onLoad" :offset="250">
        <div class="row q-gutter-y-md">
          <div
            rref="item"
            class="col-12 col-md-4"
            :class="padding"
            v-for="store in tempTestStories"
            :key="store.key"
          >
            <store-component :lorem="lorem" :store="store" />
          </div>
        </div>
        <q-card v-if="endPage" class="my-card q-pt-lg">
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label class="text-center text-bold" :color="darkModeConf.iconVar">End Page</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
        <template v-else v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
      <div v-else class="row q-gutter-y-md">
        <div
          ref="item"
          class="col-12 col-md-4"
          :class="padding"
          v-for="store in data_var"
          :key="store.key"
        >
          <store-component :lorem="lorem" :store="store" />
        </div>
      </div>
    </div>

    <!-- <div v-else>
      <q-list>
        <q-card class="my-card" v-for="(store, i) in stories" :key="i">
          <store-component :store="store"/>
        </q-card>
        
      </q-list>
    </div>-->

    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="user && isUserAuth">
      <q-btn
        fab round
        :color="darkModeConf.iconVar"
        :class="darkModeConf.textBtn"
        to="/profile/store/add"
      >
        <q-icon size="lg" name="add" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import StoreComponent from "components/store/StoreComponent.vue";
export default {
  components: { StoreComponent },
  name: "stories",
  props: ["val_search", "filterVal"],
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      padding: "",
      maximizedToggle: true,
      deviceWidth: 375,
      addSore: false,
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
      tempTestStories: [],
      start: 0,
      end: 50,
      endPage: false
    };
  },
  computed: {
    ...mapState("settings", [
      "settings",
      "appMode",
      "darkModeConf",
      "vibrateState"
    ]),
    ...mapState("store", ["stories", "store"]),
    ...mapGetters("store", ["getStories", "getStore"]),
    ...mapGetters("auth", ["user", "isUserAuth"])
  },
  methods: {
    ...mapActions("settings", ["setSettings", "playSound"]),
    ...mapActions("store", ["listStore", "createStore"]),
    ...mapActions("user", ["detailUser"]),

    onLoad(index, done) {
      let vm = this;
      if (this.tempTestStories.length == this.stories.length) {
        this.endPage = true;
      } else {
        setTimeout(() => {
          if (vm.tempTestStories) {
            vm.stories.slice(vm.start, vm.end).forEach(element => {
              vm.tempTestStories.push(element);
            });
            vm.start = vm.end;
            vm.end = vm.end + 50;
            done();
          }
        }, 3000);
      }
    },

    firstLoad() {
      this.stories.slice(this.start, this.end).forEach(element => {
        this.tempTestStories.push(element);
      });
      this.start = this.end;
      this.end = this.end + 1;
    },

    speak(userInput) {
      if (this.synth.speaking) {
        // console.error('speechSynthesis.speaking');
        return;
      }
      if (userInput !== "") {
        let sInstance = new SpeechSynthesisUtterance(userInput);
        sInstance.lang = "pt-BR";
        sInstance.onend = function(event) {
          // console.log('SpeechSynthesisUtterance.onend');
        };
        sInstance.onerror = function(event) {
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
        sInstance.onend = function(event) {
          // console.log('SpeechSynthesisUtterance.onend');
        };
        sInstance.onerror = function(event) {
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

    speakCordova(userInput) {
      navigator.vibrate(200);
      TTS.speak(
        {
          text: userInput,
          locale: "pt-BR",
          pitch: this.pitch,
          rate: this.rate
        },
        function() {
          console.log("Text succesfully spoken");
        },
        function(reason) {
          alert(reason);
        }
      );
    },

    handleSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/settings");
      }

      if (val.direction === "right") {
        this.$router.push("/vacancies");
      }
    },

    lazeItems() {
      if (!(this.itemsLayzeRef == this.$refs.item)) {
        this.itemsLayzeRef = this.$refs.item;
      }
      let active = false;
      if (active === false && this.itemsLayzeRef) {
        active = true;
        this.itemsLayzeRef.forEach(function(item) {
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

    search(val) {
      if (val != "") {
        var temp = new RegExp(".*" + val + ".*");
        var items = [];
        var stories = this.stories;
        for (var i in stories) {
          var value = stories[i]["title"].match(temp);
          var valueDesc = stories[i]["description"].match(temp);
          var valuePlace = stories[i]["place"].match(temp);
          var valueCategory = stories[i]["category"].match(temp);
          var valueSubCategory = stories[i]["subCategory"].match(temp);
          if (value != null && valueDesc != null) {
            if (
              stories[i]["title"] == value[0] &&
              stories[i]["description"] == valueDesc[0]
            ) {
              items.push(stories[i]);
            }
          } else if (value != null) {
            if (stories[i]["title"] == value[0]) {
              items.push(stories[i]);
            }
          } else if (valueDesc != null) {
            if (stories[i]["description"] == valueDesc[0]) {
              items.push(stories[i]);
            }
          } else if (valuePlace != null) {
            if (stories[i]["place"] == valuePlace[0]) {
              items.push(stories[i]);
            }
          } else if (valueCategory != null) {
            if (stories[i]["category"] == valueCategory[0]) {
              items.push(stories[i]);
            }
          } else if (valueCategory != null) {
            if (stories[i]["subCategory"] == valueSubCategory[0]) {
              items.push(stories[i]);
            }
          }
        }
        this.data_var = items.slice(0, 2);
      } else {
        this.data_var = [];
      }
    }
  },
  created() {
    this.listStore();
    this.firstLoad();
  },
  mounted() {
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
    this.$root.$on("textToSpeechStore", val => {
      var text;
      if (val.store.price) {
        var text =
          val.user +
          " disponibilizou o " +
          val.store.category +
          " " +
          val.store.title +
          " de " +
          val.store.price +
          " meticais. \n Clique para descrição.";
      } else if (val.store.price && val.store.priceVariable) {
        text =
          val.user +
          " disponibilizou o " +
          val.store.category +
          " " +
          val.store.title +
          " de " +
          val.store.price +
          " meticais.; Negociavel. \n Clique para descrição.";
      } else {
        text =
          val.user +
          " disponibilizou o " +
          val.store.category +
          " " +
          val.store.title +
          ". \n Clique para descrição.";
      }
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
    // this.listStore()

    // this.$on("valueSearch")

    this.$root.$emit(
      "textToSpeechRouter",
      "Página de produtos e serviços.\n Ao rolar, o telefone vai vibrar quando um item estiver no centro.\n Pressione no centro para ouvir."
    );
  },
  watch: {
    val_search(val) {
      this.search(val);
    },
    filterVal(val) {
      this.search(val);
    }
    // stories() {
    //   this.lazeItems();
    // }
  }
};
</script>
