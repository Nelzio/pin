<template>
  <q-page
    @click="handleRepeat()"
    class="q-gutter-y-md q-pt-md"
    v-touch-swipe.mouse.right="handleSwipe"
    v-touch-hold:600.mouse="handleHold"
  >
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img :src="getUser.photoURL" spinner-color="white" />
          </q-avatar>

          <div :class="getFont.title">{{ getUser.displayName }}</div>
        </div>

        <q-separator />
        <!-- sec2 -->
        <div class="row justify-center">
          <q-card class="col-12">
            <q-tabs
              v-model="tab"
              dense
              :active-color="darkModeConf.iconVar"
              :indicator-color="darkModeConf.iconVar"
              class="text-grey"
              align="justify"
              narrow-indicator
            >
              <q-tab name="bio" label="Contacto" icon="contacts" />
              <q-tab v-if="getUser.profileType" name="ocupacao" label="Sobre" icon="description" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="bio">
                <q-list>
                  <q-item v-if="getUser.phoneNumber" class="text-left">
                    <q-item-section top avatar>
                      <!-- <q-icon :color="darkModeConf.iconVar" name="phone" /> -->
                      <q-btn round outline @click="callPhone(getUser.phoneNumber)" :color="darkModeConf.iconVar" icon="phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Telefone</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.phoneNumber }}</q-item-label>
                    </q-item-section>
                    <!-- <q-item-section side>
                      <q-btn round icon="ion-logo-whatsapp" color="green" :to="'/https://wa.me/' + getUser.phoneNumber" />
                    </q-item-section>-->
                  </q-item>

                  <q-separator v-if="getUser.email.split('@')[getUser.email.split('@').length - 1] !== 'superactive.com'" spaced inset="item" />

                  <q-item v-if="getUser.email.split('@')[getUser.email.split('@').length - 1] !== 'superactive.com'" class="text-left">
                    <q-item-section top avatar>
                      <q-icon :color="darkModeConf.iconVar" name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Email</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon :color="darkModeConf.iconVar" name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Endereço</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.adress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="local">Bairro da Polana caniço</q-tab-panel>

              <q-tab-panel v-if="getUser.profileType && getUser.profileType == 'person'" name="ocupacao">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon :color="darkModeConf.iconVar" name="calendar_today" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Data de nascimento</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon :color="darkModeConf.iconVar" name="work" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Profissão</q-item-label>
                      <q-item-label :class="getFont.text">{{ getUser.profission }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator v-if="curriculumDownload.docUrl" />

                  <q-item v-if="curriculumDownload.docUrl" class="text-left" clickable v-ripple @click="dialogCV = true;">
                    <q-item-section avatar top>
                      <q-icon :color="darkModeConf.iconVar" name="school" />
                    </q-item-section>
                    <q-item-section :class="getFont.title">
                      Curiculum
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel v-else-if="getUser.profileType && getUser.profileType == 'organization'" name="ocupacao">
                <div v-html="getUser.description"></div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        <div class="row text-center justify-center">
          <q-card class="col-12">
            <!-- <my-video ref="player" :sources="video.sources" :options="video.options"></my-video> -->
            <q-video v-if="videoDownload.videoUrl" :src="videoDownload.videoUrl" controls controlsList="nodownload"/>
            
          </q-card>
        </div>
        <q-separator />
      </div>
    </div>
    <div class="row justify-center q-pa-md">
      <div class="col-12 col-md-8">
        <q-btn
          rounded
          class="full-width"
          :color="darkModeConf.iconVar"
          :class="darkModeConf.textBtn"
          icon="message"
          label="Contactar"
          @click="routeToChat()"
        />
      </div>
    </div>
    <!-- sec 6 -->

    <!-- asdasdasd -->

    <div class="row justify-center" v-if="!(vacancyNum == 0 && storeNum == 0)">
      <div class="col-12 col-md-8">
        <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
          <q-toolbar-title :class="getFont.title">Actividades</q-toolbar-title>
        </q-toolbar>
        <div class="row">
          <div v-if="vacancyNum > 0" class="q-pa-sm col-12 col-md-6">
            <q-card class="my-card">
              <q-item
                :class="darkModeConf.textColor"
                clickable
                :to="'/vacancies/' + this.$route.params.idUser"
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar size="65px">
                    <q-icon :color="darkModeConf.iconVar" name="work" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div class="text-bold" :class="getFont.text">{{ vacancyNum }} vagas de emprego.</div>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
          <div v-if="storeNum > 0" class="q-pa-sm col-12 col-md-6">
            <q-card class="my-card">
              <q-item
                :class="darkModeConf.textColor"
                clickable
                :to="'/store/' + this.$route.params.idUser"
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar size="65px">
                    <q-icon :color="darkModeConf.iconVar" name="store" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <div class="text-bold" :class="getFont.text">{{ storeNum }} produtos e serviços</div>
                </q-item-section>
              </q-item>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-dialog v-model="dialogCV" :maximized="maximizedToggle">
        <div class="row">
        <q-card class="bg-white">
          <q-toolbar
        :class="[darkModeConf.bgColor, darkModeConf.textColor]"
        class="GPL__toolbar"
        style="height: 64px"
      >
        <q-btn
          v-close-popup
          :color="darkModeConf.iconVar"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          size="lg"
        />

        <q-toolbar-title shrink class="row items-center no-wrap text-primary text-h5 text-weight-bolder title-font">
          Curriculum
        </q-toolbar-title>
      </q-toolbar>
          <q-card-section :style="'height: ' + zoomVal.height + 'px; width: ' + zoomVal.width + 'px;'">
            <pdf :src="curriculumDownload.docUrl"></pdf>
          </q-card-section>
          <!-- <q-card-actions align="right">
            <q-btn label="Trocar Curiculo" color="primary" @click="dialogUpCV = true, dialog = false" />
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions> -->
        </q-card>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firebaseAuth, firestoreDb, fireStorage, firebase } from "boot/firebase";
import offline from "v-offline";
import pdf from 'vue-pdf';
// import myVideo from 'vue-video';
export default {
  // name: 'PageName',
  data() {
    return {
      numForZoo: 0,
      zooBool: false,
      zoomVal: {
        height: null,
        width: null,
      },
      tab: "bio",
      dialogCV: false,
      maximizedToggle : true,
      vacancies: [],
      videoDownload: {},
      curriculumDownload: {
        key: "",
        docUrl: "",
        user: "",
      },
      vacancyNum: 0,
      storeNum: 0,
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      video: {
        sources: [{
          src: '',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: 'statics/app-logo-128x128.png'
        }
      },
    };
  },
  components: { pdf },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["isUserAuth"]),
  },
  methods: {
    ...mapActions("user", ["detailUserStore"]),
    routeToChat () {
      if (!this.isUserAuth) {
        this.$router.push("/account")
      } else {
        this.$router.push('/chat/' + this.$route.params.idUser)
      }
    },


    zoomPDF() {
      var vm = this;
      this.numForZoo = this.numForZoo += 1
      if (this.numForZoo >= 2) {
        this.zooBool = !this.zooBool;
        if (this.zooBool) {
          this.zoomVal.height = window.innerHeight + 150;
          this.zoomVal.width = window.innerWidth + 150;
        } else {
          this.zoomVal.height = window.innerHeight;
          this.zoomVal.width = window.innerWidth;
        }
        this.numForZoo = 0;
        console.log(this.zoomVal)
      }
      setTimeout(() => {
        vm.numForZoo = 0;
      }, 2000);
    },

    getCV() {
      // Loading.show()
      
      const vm = this;
      if (!offline.data().isOnline) {
        return showErrorMessage("Está sem internet.")
      }
      var storage = firebase.storage();
      const ref = firestoreDb.collection('curriculum').doc(this.getUser.email);
      ref.get().then((doc) => {
        if (doc.exists) {
          vm.curriculumDownload = {
            key: doc.id,
            docUrl: doc.data().docUrl,
            user: doc.data().user,
          }

          
          // Loading.hide()
        } else {
          console.log("No such document!")
          // Loading.hide()
        }
      });
    },

    callPhone(number) {
      if(number) {
        window.open("tel:"+number);
      }
    },

    getVideo(id) { // test
    // Loading.show()
    const vm = this;
    if (!offline.data().isOnline) {
      return showErrorMessage("Está sem internet.")
    }
    const ref = firestoreDb.collection('videos').doc(id);
    ref.get().then((doc) => {
      if (doc.exists) {
        vm.videoDownload = {
          key: doc.id,
          videoUrl: doc.data().videoUrl,
          user: doc.data().user,
        }
        vm.video.sources[0].src = doc.data().videoUrl
        // Loading.hide()
      } else {
        console.log("No such document!")
        // Loading.hide()
      }
    });
  },

  convertToPlain(text) {
    if ((text===null) || (text===''))
    return false;
    else
    var str = text.toString();
    return str.replace( /(<([^>]+)>)/ig, '').replace(/([A-Z])/g, '\n $1');
  },

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      if (this.getUser.profileType && this.getUser.profileType == "organization") {
        this.$root.$emit(
          "textToSpeechRouter",
          this.getUser.displayName +
            ".\n Telefone: " +
            this.converNumbPhone(this.getUser.phoneNumber) +
            ";\n email: " +
            this.getUser.email +
            "; \n descrição: " +
            this.convertToPlain(this.getUser.description) +
            "."
        );
      } else {
        this.$root.$emit(
          "textToSpeechRouter",
          this.getUser.displayName +
            ".\n Telefone: " +
            this.converNumbPhone(this.getUser.phoneNumber) +
            ";\n email: " +
            this.getUser.email +
            "; \n profissão: " +
            this.getUser.profission +
            "."
        );
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
        this.touchNums = -80;
        navigator.vibrate(200);
        window.navigator.vibrate(200);

        this.$router.push("/chat/" + this.getUser.email);
      }

      setTimeout(() => {
        vm.touchNums = 0;
      }, 5000);
    },

    listVacancy(user) {
      // done
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      var itemsReady = [""];
      var today = new Date();
      var num = 0;
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + '/' + dd + '/' + yyyy;
      // vm.myVacancies = []
      var myVacanciesAux = [];
      const ref = firestoreDb.collection("vacancies");
      ref.where("user", "==", user).where("public", "==", true).onSnapshot(function(querySnapshot) {
        num = 0
        querySnapshot.forEach(function(doc) {
          if (doc.data().validate) {
              var date = doc.data().validate.split("/");
              if ((date[1] + "/" + date[0] + "/" + date[2] >= today) && !itemsReady.includes(doc.id)) {
                itemsReady.push(doc.id);
                num += 1
              }
            }
          });
        vm.vacancyNum = num;
      });
    },

    listStoreMyHere(user) {
      if (!offline.data().isOnline) {
        return alert("Sem internet");
      }
      const vm = this;
      const ref = firestoreDb.collection("stories");
      ref.where("user", "==", user).where("public", "==", true).onSnapshot(function(querySnapshot) {
        vm.storeNum = querySnapshot.docs.length;
      });
    },

    converNumbPhone(valueNum) {
      var converted = "";
      var count = 0;
      const value = String(valueNum)
        .replace(/(.)(?=(\d{3})+$)/g, "$1,")
        .split(",");
      value.forEach(element => {
        count += 1;
        if (value.length > count) {
          converted = converted + element + "; ";
        } else {
          converted = converted + element;
        }
      });
      return converted;
    }
  },
  created() {
    this.detailUserStore(this.$route.params.idUser);
    this.getVideo(this.$route.params.idUser);
  },
  mounted() {
    // console.log(this.getUser)
    this.listVacancy(this.$route.params.idUser);
    this.listStoreMyHere(this.$route.params.idUser);
    // // // var privider = firebase.auth().currentUser.providerData[0].providerId;
    this.getCV()
    this.$root.$emit(
      "textToSpeechRouter",
      "Perfil de " +
        this.getUser.displayName +
        ".\n Pressione para ouvir detalhes do perfil. \n Clique 5 vezes para contactar."
    );
  },

  filters: {
    converNumbPhoneFilter: function(valueNum) {
      console.log(valueNum);
      var converted = "";
      var count = 0;
      const value = String(valueNum)
        .replace(/(.)(?=(\d{3})+$)/g, "$1,")
        .split(",");
      value.forEach(element => {
        count += 1;
        if (value.length > count) {
          converted = converted + element + "; ";
        } else {
          converted = converted + element;
        }
      });
      return converted;
    }
  }
};
</script>
