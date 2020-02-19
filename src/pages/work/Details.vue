<template>
  <q-page
    @click="handleRepeat()"
    v-touch-swipe.mouse.left.right="handleSwipe"
    padding
    v-touch-hold:600.mouse="handleHold"
  >
    <!-- content -->
    <div class="row justify-center">
      <div class="q-gutter-y-md col-12 col-md-8">
        <div>
          <q-card class="my-card col-12" style="padding: 0;">
            <!-- <q-video style="padding: 0;height: 300px" src="https://www.youtube.com/embed/Raa0vBXA8OQ" /> -->
            <q-img :src="getVacancy.img" spinner-color="white" style="min-height: 200px;" />
            <q-card-section>
              <div :class="getFont.title">{{ getVacancy.title }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col text-center">
                <q-icon name="place" size="lg" />
              </div>
              <div class="col-10" :class="getFont.text">{{ getVacancy.place }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col text-center">
                <q-icon name="filter_list" size="lg" />
              </div>
              <div class="col-10" :class="getFont.text">{{ getVacancy.category }}</div>
            </q-card-section>
            <q-card-section class="row q-pt-none">
              <div class="col-12" :class="getFont.text">{{ getVacancy.description }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="row justify-end q-gutter-x-md" v-if="user">
          <q-btn
            v-if="!vacancyDone"
            rounded
            :color="darkModeConf.color"
            :class="darkModeConf.textBtn"
            label="Candidatar-se"
            icon="done_all"
            @click="apply = true"
          />
          <q-btn v-else rounded color="red" label="Cancelar" icon="close" @click="apply = true" />
          <!-- <q-btn round outline color="teal" icon="share" /> -->
        </div>
      </div>
    </div>

    <div>
      <q-dialog v-model="apply">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h5">Confirmar</div>
          </q-card-section>

          <q-card-section
            v-if="!vacancyDone"
            class="q-pt-none"
            :class="getFont.title"
          >Candidatar-se a vaga?</q-card-section>
          <q-card-section v-else class="q-pt-none" :class="getFont.title">Retirar candidatura?</q-card-section>

          <q-card-actions align="right" class="bg-white">
            <q-btn
              v-if="!vacancyDone"
              rounded
              outline
              color="green"
              label="Candidatar"
              @click="aply()"
            />
            <q-btn v-else rounded outline color="red" label="Retirar" @click="deleteCandidate()" />
            <q-btn rounded outline label="Cancelar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>


<script>
import { Loading, Notify } from "quasar";
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDb } from "boot/firebase";
import offline from "v-offline";
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "details",
      socialNet: false,
      apply: false,
      vacancyDone: false,
      pitch: 0.8,
      rate: 1,
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
    ...mapGetters("auth", ["user", "userData"])
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "detailVacancy"]),
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

    speakCordova(userInput) {
      navigator.vibrate(200);
      TTS.speak(
        {
          text: userInput,
          locale: "pt-PT",
          rate: 1
        },
        function() {
          alert("Text succesfully spoken");
        },
        function(reason) {
          alert(reason);
        }
      );
    },

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      var text =
        "Vaga para " +
        this.getVacancy.title +
        ". Local: " +
        this.getVacancy.place +
        ". Categoría: " +
        this.getVacancy.category +
        ". Descrição: " +
        this.getVacancy.description;
      if (window.hasOwnProperty("cordova")) {
        this.speakCordova(text);
      } else {
        this.speak(text);
      }
      // console.log(this.vacancy)
    },

    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1);
      }
    },
    handleRepeat() {
      var vm = this;

      this.touchNums += 1;

      if (this.touchNums >= 5) {
        this.submitGo = true;
        this.touchNums = -80;
        navigator.vibrate(200);
        window.navigator.vibrate(200);
        if (!this.user) {
          var text = "Usuário não autenticado.";
          this.speak(text);
          return;
        }

        if (this.vacancyDone) {
          this.deleteCandidate();
        } else {
          this.aply();
        }
      }

      setTimeout(() => {
        vm.touchNums = 0;
      }, 5000);
    },

    getAply() {
      const ref = firestoreDb
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

    aply() {
      const data = {
        photoURL: this.user.photoURL,
        displayName: this.user.displayName,
        phoneNumber: this.userData.phoneNumber,
        email: this.user.email,
        adress: this.userData.adress,
        profission: this.userData.profission,
        education: this.userData.education,
        date: this.userData.date
      };
      this.aplyVacancyMethod({ id: this.$route.params.id, data: data });
    },

    aplyVacancyMethod(payload) {
      if (!offline.data().isOnline) {
        return alert("Está sem internet");
      }
      Loading.show();
      const ref = firestoreDb
        .collection("vacancies")
        .doc(payload.id)
        .collection("candidates")
        .doc(payload.data.email); // email is the key
      ref
        .set(payload.data)
        .then(docRef => {
          console.log("aply success" + docRef);
          this.apply = false;
          this.getAply();
          Loading.hide();
        })
        .catch(error => {
          Loading.hide();
          alert("Error aplying document: ", error);
        });
    },

    deleteCandidate() {
      if (!offline.data().isOnline) {
        return alert("Está sem internet");
      }
      Loading.show();
      firestoreDb
        .collection("vacancies")
        .doc(this.$route.params.id)
        .collection("candidates")
        .doc(this.user.email)
        .delete()
        .then(() => {
          this.apply = false;
          this.getAply();
          console.log("Deleted candidate");
          Loading.hide();
        })
        .catch(error => {
          Loading.hide();
          alert("Error removing document: ", error);
        });
    }
  },
  created() {
    // this.listVacancy()
    this.detailVacancy(this.$route.params.id);
  },
  mounted() {
    if (this.user) {
      this.getAply();
    }

    this.$root.$emit(
      "textToSpeechRouter",
      "Detalhes da vaga.\n Pressione para ouvir descrição.\n Clique 5 vezes na tela para se candidatar ou retirar candidatura."
    );
  },

  watch: {
    vacancyDone() {
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
