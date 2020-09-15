<template>
  <q-page
    @click="handleRepeat"
    v-touch-swipe.mouse.left.right="handleSwipe"
    padding
    v-touch-hold:650.mouse="handleHold"
    role="group"
    aria-label="Página de detalhes da vaga"
  >
    <!-- content -->
    <div
      class="row justify-center"
      role="row"
    >
      <div class="q-gutter-y-md col-12 col-md-8">
        <div>
          <q-card
            class="my-card col-12"
            style="padding: 0;"
          >
            <!-- <q-video style="padding: 0;height: 300px" src="https://www.youtube.com/embed/Raa0vBXA8OQ" /> -->
            <q-img
              :src="getVacancy.img"
              spinner-color="white"
              style="min-height: 200px;"
              alt="img"
              aria-label="Imagem da vaga"
            />
            <q-card-section :aria-label="getVacancy.title">
              <div :class="getFont.title">{{ getVacancy.title }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col text-center">
                <q-icon
                  :color="darkModeConf.iconVar"
                  name="place"
                  size="lg"
                />
              </div>
              <div
                class="col-10"
                :class="getFont.text"
              >{{ getVacancy.place }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col text-center">
                <q-icon
                  :color="darkModeConf.iconVar"
                  name="filter_list"
                  size="lg"
                />
              </div>
              <div
                class="col-10"
                :class="getFont.text"
              >{{ getVacancy.category }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div
                class="col-12"
                :class="getFont.text"
              >
                <div v-html="getVacancy.description"></div>
              </div>
              <!-- <div class="col-12" :class="getFont.text">{{getVacancy.description}}</div> -->
            </q-card-section>
          </q-card>
        </div>

        <div
          class="row justify-end q-gutter-x-md"
          v-if="user && isUserAuth"
        >
          <q-btn
            v-if="!vacancyDone"
            rounded
            :color="darkModeConf.iconVar"
            :class="darkModeConf.textBtn"
            label="Candidatar-se"
            icon="done_all"
            @click="applyDialog = true"
            role="button"
          />
          <q-btn
            v-else
            :color="darkModeConf.iconVar"
            :class="darkModeConf.textBtn"
            rounded
            label="Cancelar candidatura"
            icon="close"
            @click="applyDialog = true"
            role="button"
          />
        </div>
        <div
          class="row justify-end q-gutter-x-md"
          v-else
        >
          <q-btn
            v-if="!vacancyDone"
            rounded
            :color="darkModeConf.iconVar"
            :class="darkModeConf.textBtn"
            label="Cadastrar-se"
            icon="done_all"
            @click="routeToAccount()"
            role="link"
          />
        </div>
      </div>
    </div>

    <div>
      <q-dialog
        v-model="applyDialog"
        role="dialog"
        :aria-label="!vacancyDone ? 'Confirmar Candidatura' : 'Confirmar cancelamento de candidatura'"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div :class="getFont.title">Confirmar</div>
          </q-card-section>

          <q-card-section
            v-if="!vacancyDone"
            class="q-pt-none"
            :class="getFont.title"
          >Candidatar-se a vaga?</q-card-section>
          <q-card-section
            v-else
            class="q-pt-none"
            :class="getFont.title"
          >Retirar candidatura?</q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-if="!vacancyDone"
              rounded
              outline
              color="green"
              label="Candidatar"
              @click="aply()"
              role="button"
            />
            <q-btn
              v-else
              rounded
              outline
              color="green"
              label="Retirar candidatura"
              @click="deleteCandidate()"
              role="button"
            />
            <q-btn
              rounded
              outline
              label="Cancelar"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="applyDialogDone">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div :class="getFont.title">Confirmar</div>
          </q-card-section>

          <q-card-section
            v-if="vacancyDone"
            class="q-pt-none"
            :class="getFont.title"
          >Candidatura feita com sucesso</q-card-section>
          <q-card-section
            v-else
            class="q-pt-none"
            :class="getFont.title"
          >Candidatura cancelada com sucesso</q-card-section>

          <q-card-actions align="right">
            <q-btn
              rounded
              outline
              label="OK"
              :color="darkModeConf.iconVar"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>


<script>
import { Loading, Notify } from "quasar";
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDB } from "boot/firebase";
import { LocalStorage } from "quasar";
import offline from "v-offline";
export default {
  // name: 'PageName',
  data () {
    return {
      tab: "details",
      socialNet: false,
      applyDialog: false,
      vacancyDone: false,
      applyDialogDone: false,
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      touchNums: 0,
      submitGo: false
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapState("vacancy", ["vacancies", "vacancyDtl"]),
    ...mapGetters("vacancy", ["getVacancies", "getVacancy"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user", "userData", "isUserAuth"])
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "detailVacancy"]),

    routeToAccount () {
      LocalStorage.set("routeBack", this.$route.fullPath)
      this.$router.push("/account")

    },

    speak (userInput) {
      if (this.synth.speaking) {
        // console.error('speechSynthesis.speaking');
        return;
      }
      if (userInput !== "") {
        let sInstance = new SpeechSynthesisUtterance(userInput);
        sInstance.lang = 'pt-BR';
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
          locale: "pt-BR",
          pitch: this.pitch,
          rate: this.rate
        },
        function () {
          console.log("Text succesfully spoken");
        },
        function (reason) {
          console.log(reason);
        }
      );
    },

    handleHold ({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      if (this.vibrateState) {
        var text =
          "Vaga para " +
          this.getVacancy.title +
          ". Local: " +
          this.getVacancy.place +
          ". Categoría: " +
          this.getVacancy.category +
          ". Descrição: " +
          this.convertToPlain(this.getVacancy.description);
        if (window.hasOwnProperty("cordova")) {
          this.speakCordova(text);
        } else {
          this.speak(text);
        }
      }
      // console.log(this.vacancy)
    },

    handleSwipe (val) {
      if (val.direction === "right") {
        this.$router.go(-1);
      }
    },

    handleRepeat () {
      if (this.vibrateState) {
        var vm = this;

        this.touchNums += 1;
        console.log(vm.touchNums)

        if (this.touchNums === 5) {
          Loading.show();
          this.touchNums = -80;
          navigator.vibrate(200);
          window.navigator.vibrate(200);
          if (!this.user || !this.isUserAuth) {
            var text = "Usuário não autenticado.";
            if (window.hasOwnProperty("cordova")) {
              this.speakCordova(text);
            } else {
              this.speak(text);
            }
            setTimeout(() => {
              vm.$router.push("/account")
            }, 5000);
          } else {
            if (this.vacancyDone) {
              Loading.hide();
              this.deleteCandidate();
              this.submitGo = true;
            } else {
              // this.aply();
              Loading.hide();
              this.submitGo = true;
              this.userData["evaluators"] = []
              this.userData["submittedDate"] = new Date()
              this.aplyVacancyMethod({ id: this.$route.params.id, data: this.userData });
            }
          }
        }

        setTimeout(() => {
          vm.touchNums = 0;
          console.log(vm.touchNums)
        }, 10000);
      }
    },

    getAply () {
      const ref = firestoreDB
        .collection("vacancies")
        .doc(this.$route.params.id)
        .collection("candidates")
        .doc(this.user.email);
      ref.get().then(doc => {
        if (doc.exists) {
          this.vacancyDone = true;
        } else {
          this.vacancyDone = false;
          console.log("No such document!");
        }
      });
    },

    aply () {
      this.userData["evaluators"] = []
      this.userData["submittedDate"] = new Date()
      this.aplyVacancyMethod({ id: this.$route.params.id, data: this.userData });
    },

    convertToPlain (text) {
      if ((text === null) || (text === ''))
        return false;
      else
        var str = text.toString();
      return str.replace(/(<([^>]+)>)/ig, '').replace(/([A-Z])/g, '\n $1');
    },



    aplyVacancyMethod (payload) {
      const vm = this;
      if (!offline.data().isOnline) {
        return alert("Está sem internet");
      }
      Loading.show();
      const ref = firestoreDB
        .collection("vacancies")
        .doc(payload.id)
        .collection("candidates")
        .doc(payload.data.email); // email is the key
      ref
        .set(payload.data)
        .then(docRef => {
          console.log("aply success" + docRef);
          if (this.vibrateState) {
            console.log("hehehehehehehe")
            if (window.hasOwnProperty("cordova")) {
              this.speakCordova("Candidatura feita com sucesso.");
            } else {
              this.speak("Candidatura feita com sucesso.");
            }
          }
          this.applyDialog = false;
          this.getAply();
          if (!this.vibrateState) {
            setTimeout(() => {
              vm.applyDialogDone = true;
            }, 2000);
          }
          Loading.hide();
        })
        .catch(error => {
          Loading.hide();
          alert("Error aplying document: ", error);
        });
    },

    deleteCandidate () {
      const vm = this;
      if (!offline.data().isOnline) {
        return alert("Está sem internet");
      }
      Loading.show();
      firestoreDB
        .collection("vacancies")
        .doc(this.$route.params.id)
        .collection("candidates")
        .doc(this.user.email)
        .delete()
        .then(() => {
          this.applyDialog = false;
          if (this.vibrateState) {
            if (window.hasOwnProperty("cordova")) {
              this.speakCordova("Candidatura removida com sucesso.");
            } else {
              this.speak("Candidatura removida com sucesso.");
            }
          }
          this.getAply();
          if (!this.vibrateState) {
            setTimeout(() => {
              vm.applyDialogDone = true;
            }, 2000);
          }
          Loading.hide();
        })
        .catch(error => {
          Loading.hide();
          alert("Error removing document: ", error);
        });
    }
  },
  created () {
    // this.listVacancy()
    this.detailVacancy(this.$route.params.id);
  },
  mounted () {
    if (this.user && this.isUserAuth) {
      this.getAply();
    }

    this.$root.$emit(
      "textToSpeechRouter",
      "Detalhes da vaga.\n Pressione para ouvir descrição.\n Clique 5 vezes na tela para se candidatar ou retirar candidatura."
    );
  },

  watch: {
    vacancyDone () {
      if (this.vibrateState && this.submitGo) {
        this.submitGo = false;
        if (this.vacancyDone) {
          var text = "A sua candidatura foi submetida com sucesso.";
          this.speak(text);
        } else {
          var text = "A sua candidatura foi retirada.";
          this.speak(text);
        }
      }
    }
  }
};
</script>
