<template>
  <q-page
    v-touch-swipe.mouse.left.right="handleSwipe"
    role="group"
    lang="pt-PT"
    :aria-label="'Página de detalhes do ' + getStore.category"
  >
    <q-btn
      label="Ouvir detalhes"
      role="button"
      @click="listenDetails()"
      style="left: -800px"
    />

    <!-- content -->
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <q-card flat>
          <q-img v-if="getStore.img" :src="getStore.img" />
          <q-img
            v-else
            src="statics/img/nophoto.png"
            role="img"
            :alt="'Imagem do ' + getStore.category"
          />
        </q-card>

        <div class="row no-wrap items-center q-pa-md" role="row">
          <div class="col ellipsis" :class="getFont.title">
            {{ getStore.title }}
          </div>
          <div class="col ellipsis" :class="getFont.title" v-if="isUserAuth">
            <q-btn
              v-if="isUserAuth"
              rounded
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              icon="message"
              label="Contactar"
              :to="'/chat/' + getStore.user"
              role="link"
            />
          </div>
        </div>

        <q-list>
          <q-item v-if="getStore.price">
            <q-item-section avatar top>
              <q-icon :color="darkModeConf.iconVar" name="attach_money" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="getFont.title"
                >{{ getStore.price }} MZN</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-separator v-if="getStore.price" spaced inset="item" />

          <q-item class="text-left">
            <q-item-section top avatar>
              <!-- <q-icon :color="darkModeConf.iconVar" name="phone" /> -->
              <q-btn
                round
                outline
                @click="callPhone(getUser.phoneNumber)"
                :color="darkModeConf.iconVar"
                icon="phone"
                role="button"
                lang="pt-PT"
                :aria-label="'Ligar para ' + getUser.displayName"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="getFont.title">Telefone</q-item-label>
              <q-item-label :class="getFont.text">{{
                getUser.phoneNumber
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset="item" />

          <q-item>
            <q-item-section top avatar>
              <q-icon :color="darkModeConf.iconVar" name="description" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="getFont.title">Descrição</q-item-label>
              <q-item-label :class="getFont.text">
                <div v-html="getStore.description" role="row"></div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>


<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { firestoreDB } from "boot/firebase"
import { QSpinnerRings, QSpinnerRadio } from "quasar"
import offline from "v-offline"
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "details",
      candidates: [],
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      touchNums: 0,
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapState("store", ["stories", "storeDtl"]),
    ...mapGetters("store", ["getStories", "getStore"]),
    ...mapGetters("auth", ["isUserAuth", "user", "userData"]),
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("settings", ["getFont", "getVibrate"]),
  },
  methods: {
    ...mapActions("store", [
      "listStore",
      "createStore",
      "detailStore",
      "updateStore",
      "deleteStore",
    ]),
    ...mapActions("user", ["detailUserStore"]),

    callPhone(number) {
      if (number) {
        window.open("tel:" + number)
      }
    },

    speak(userInput) {
      if (this.synth.speaking) {
        // console.error('speechSynthesis.speaking');
        return
      }
      if (userInput !== "") {
        let sInstance = new SpeechSynthesisUtterance(userInput)
        sInstance.lang = "pt-PT"
        sInstance.onend = function (event) {
          // console.log('SpeechSynthesisUtterance.onend');
        }
        sInstance.onerror = function (event) {
          // console.error('SpeechSynthesisUtterance.onerror');
        }

        // vibrate antes de falar
        window.navigator.vibrate(200)
        // speak
        sInstance.pitch = this.pitch
        sInstance.rate = this.rate
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
        window.navigator.vibrate(200)
        // speak
        sInstance.pitch = this.pitch
        sInstance.rate = this.rate
        this.synth.speak(sInstance)
      }
    },

    speakCordova(userInput) {
      navigator.vibrate(200)
      TTS.speak(
        {
          text: userInput,
          locale: "pt-PT",
          pitch: this.pitch,
          rate: this.rate,
        },
        function () {
          console.log("Text succesfully spoken")
        },
        function (reason) {
          alert(reason)
        }
      )
    },

    convertToPlain(text) {
      if (text === null || text === "") return false
      else var str = text.toString()
      return str.replace(/(<([^>]+)>)/gi, "").replace(/([A-Z])/g, "\n $1")
    },

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)  getStore.price getUser.phoneNumber getStore.description
      if (this.vibrateState) {
        var text =
          this.getStore.title +
          ". categoria: " +
          this.getStore.category +
          "; Preço: " +
          this.getStore.price +
          " meticais. número de telefone: " +
          this.converNumbPhone(this.getUser.phoneNumber) +
          ";. descrição: " +
          this.convertToPlain(this.getStore.description)
        if (window.hasOwnProperty("cordova")) {
          this.speakCordova(text)
        } else {
          this.speak(text)
        }
      }
      // console.log(this.vacancy)
    },

    listenDetails() {
      var text =
        this.getStore.title +
        ". categoria: " +
        this.getStore.category +
        "; Preço: " +
        this.getStore.price +
        " meticais. número de telefone: " +
        this.converNumbPhone(this.getUser.phoneNumber) +
        ";. descrição: " +
        this.convertToPlain(this.getStore.description)
      if (window.hasOwnProperty("cordova")) {
        this.speakCordova(text)
      } else {
        this.speak(text)
      }
      // console.log(this.vacancy)
    },

    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1)
      }
    },

    converNumbPhone(number) {
      var converted = ""
      var count = 0
      const value = String(number)
        .replace(/(.)(?=(\d{3})+$)/g, "$1,")
        .split(",")
      value.forEach((element) => {
        count += 1
        if (value.length > count) {
          converted = converted + element + "; "
        } else {
          converted = converted + element
        }
      })
      return converted
    },

    handleRepeat() {
      if (this.vibrateState) {
        var vm = this

        this.touchNums += 1

        if (this.touchNums >= 5) {
          this.touchNums = -80
          navigator.vibrate(200)
          window.navigator.vibrate(200)
          if (!this.user) {
            var text = "Usuário não autenticado."
            if (window.hasOwnProperty("cordova")) {
              this.speakCordova(text)
            } else {
              this.speak(text)
            }
            return
          }

          this.$router.push("/chat/" + this.getUser.email)
        }

        setTimeout(() => {
          vm.touchNums = 0
        }, 5000)
      }
    },
  },
  created() {
    this.detailStore(this.$route.params.id)
  },
  mounted() {},
  watch: {
    getStore() {
      if (this.getStore.title) {
        this.detailUserStore(this.getStore.user)
        if (this.getUser.displayName) {
          if (this.vibrateState === 1 && this.getVibrate)
            this.$root.$emit(
              "textToSpeechRouter",
              "Detalhes do " +
                this.getStore.category +
                " " +
                this.getStore.title +
                " de " +
                this.getUser.displayName +
                "."
            )
        }
      }
    },
  },
}
</script>
