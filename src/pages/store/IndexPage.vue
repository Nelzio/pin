<template>
  <q-page class="q-pb-xl">
    <!-- content -->

    <!-- <div>
      <div class="q-pl-sm text-h6">
        Filtrar
      </div>
      <div>
        <q-scroll-area
          horizontal
        >
          <div class="row no-wrap q-pa-sm q-gutter-sm">
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            <q-card>
              <q-icon name="style" size="70px" />
            </q-card>
            
          </div>
        </q-scroll-area>
      </div>
    </div>-->

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
      <div v-if="!val_search && !filterVal" class="row q-gutter-y-md">
        <div
          ref="item"
          class="col-12 col-md-4"
          :class="padding"
          v-for="store in stories"
          :key="store.key"
        >
          <store-component :lorem="lorem" :store="store" />
        </div>
      </div>
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

    <q-page-sticky position="bottom-right" :offset="[18, 18]" v-if="user">
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.color"
        :class="darkModeConf.textBtn"
        to="/profile/store/add"
      />
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
      pitch: 0.8,
      rate: 1,
      synth: window.speechSynthesis,
      itemsLayzeRef: [],
      lazyImages: []
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
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("settings", ["setSettings", "playSound"]),
    ...mapActions("store", ["listStore", "createStore"]),
    ...mapActions("user", ["detailUser"]),

    speak(userInput) {
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
      this.speak(text);
    });

    // Vibração
    // if (this.settings.isVibrationActive) {
    //   this.vibrate();
    // }
    // // Play do áudio
    // if (this.settings.isNarratorActive) {
    //   this.playSound("/statics/audios/vagas.aac");
    // }
    // this.listStore()

    // this.$on("valueSearch")

    this.$root.$emit(
      "textToSpeechRouter",
      "Pagina de produtos e serviços.\n Ao rolar, o telefone vai vibrar quando um item estiver no centro.\n Pressione no centro para ouvir."
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
