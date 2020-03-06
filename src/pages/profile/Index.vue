<template>
  <q-page
    class="q-gutter-y-md q-pt-md q-pb-xl"
    v-touch-swipe.mouse.left.right="handleSwipe"
    v-touch-hold:600.mouse="handleHold"
  >
    <!-- content -->

    <div class="row justify-center q-pb-xl">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img :src="user.photoURL" spinner-color="white" />
          </q-avatar>

          <div :class="getFont.title">{{ user.displayName }}</div>
          <!-- <div class="text-caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi unde vitae eaque labore
          </div>-->
        </div>

        <q-separator />
        <!-- sec2 -->
        <div class="row text-center justify-center">
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
              <q-tab name="ocupacao" label="Sobre" icon="assignment_ind" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="bio">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon :color="darkModeConf.iconVar" name="phone" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Telefone</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.phoneNumber }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon :color="darkModeConf.iconVar" name="email" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Email</q-item-label>
                      <q-item-label :class="getFont.text">{{ user.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon :color="darkModeConf.iconVar" name="place" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Endereço</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.adress }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="ocupacao">
                <q-list>
                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon :color="darkModeConf.iconVar" name="calendar_today" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Data de nascimento</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="text-left">
                    <q-item-section top avatar>
                      <q-icon :color="darkModeConf.iconVar" name="work" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Profissão</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.profission }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator spaced inset="item" />

                  <q-item class="text-left">
                    <q-item-section avatar top>
                      <q-icon :color="darkModeConf.iconVar" name="school" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Formação</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.education }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
        
        <div class="row text-center justify-center">
          <q-card class="col-12">
            <q-card-section>
                <!-- <my-video ref="player" :sources="video.sources" :options="video.options"></my-video> -->
                <q-video v-if="videoDownload.videoUrl" :src="videoDownload.videoUrl"/>
            </q-card-section>

            <q-card-actions>
              <q-btn
                rounded
                class="full-width"
                label="Carregar vídeo"
                icon="play"
                :color="darkModeConf.iconVar"
                :class="darkModeConf.textBtn"
                @click="proccessFile()"
              />
            </q-card-actions>
            
          </q-card>
          <q-form class="q-gutter-md" ref="storeForm">
            <input
              id="fileInput"
              type="file"
              hidden
              ref="fileVideo"
              accept="video/*"
              @change="onChangeVideo"
            />
          </q-form>
        </div>

        <!-- btn conect -->
        <!-- <div class="row justify-center q-pa-md">
          <q-btn
            rounded
            class="full-width"
            :color="darkModeConf.iconVar"
            :class="darkModeConf.textBtn"
            label="Editar perfil"
            icon="edit"
            to="account/edit"
          />
        </div> -->

        <q-separator />

        <div v-if="vacanciesAply.length">
          <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
            <q-toolbar-title :class="getFont.title">Minhas candidaturas</q-toolbar-title>
          </q-toolbar>
          <div class="row">
            <div
              class="q-pa-sm col-12 col-md-4"
              v-for="candidate in vacanciesAply"
              :key="candidate.id"
            >
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  :to="'/vacancies/details/' + candidate.id"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-img :src="candidate.img" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-bold" :class="getFont.title">{{ candidate.title}}</div>
                    <div :class="getFont.text">{{ candidate.user }}</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline rounded class="full-width" label="Ver todas" to="/profile/candidatures" />
          </div>
        </div>
        <!-- sec 6 -->

        <!-- asdasdasd -->

        <div v-if="!(vacancyNum == 0 && storeNum == 0)">
          <q-toolbar :class="darkModeConf.bgColor" class="shadow-1">
            <q-toolbar-title :class="getFont.title">Actividades</q-toolbar-title>
          </q-toolbar>
          <div class="row">
            <div v-if="vacancyNum > 0" class="q-pa-sm col-12 col-md-6">
              <q-card class="my-card">
                <q-item :class="darkModeConf.textColor" clickable to="/profile/vacancies" v-ripple>
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
                <q-item :class="darkModeConf.textColor" clickable to="/profile/store" v-ripple>
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-icon :color="darkModeConf.iconVar" name="store" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div class="text-bold" :class="getFont.text">{{ storeNum }} produtos e Serviços</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          v-if="scrollNum < 150"
          rounded
          size="lg"
          :color="darkModeConf.iconVar"
          :class="darkModeConf.textBtn"
          label="Editar perfil"
          icon="edit"
          to="account/edit"
        />
        <q-btn
          v-else
          fab
          :color="darkModeConf.iconVar"
          :class="darkModeConf.textBtn"
          to="account/edit"
        >
          <q-icon name="edit" size="lg" />
        </q-btn>
        
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Loading } from "quasar";
import { firebaseAuth, firestoreDb, fireStorage, firebase } from "boot/firebase";
import { showErrorMessage } from "../../functions/handle-error-messages";
import myVideo from 'vue-video';
// import VueDPlayer from 'vue-dplayer'
// import 'vue-dplayer/dist/vue-dplayer.css'
import offline from "v-offline";
export default {
  // name: 'PageName',

  data() {
    return {
      tab: "bio",
      confirDeleteSuccess: false,
      errorFileDialog: false,
      confirDelete: false,
      confirDeleteAux: false,
      isPublic: true,
      vacancyDel: {
        title: "",
        key: null
      },
      vacanciesAply: [],
      myVacancies: [],
      myVacanciesAux: [],
      vacancyNum: 0,
      storeNum: 0,
      scrollNum: 0,
      video: {
        sources: [{
          src: 'https://firebasestorage.googleapis.com/v0/b/hack-a2a7b.appspot.com/o/videos%2Fnelziositoe%40gmail.com?alt=media&token=f9ad9952-a781-4bfa-a706-d38ff3ee4fb6',
          type: 'video/mp4'
        }],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: 'statics/app-logo-128x128.png'
        }
      },
      videoUpload: {
        video: null,
        user: ""
      },
      videoDownload: {}
    };
  },
  components: { myVideo },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", [
      "vacancies",
      "vacancyDtl",
      "vacancyDeleted",
      "vacancyUploaded",
      "vacancyDetail"
    ]),
    ...mapGetters("auth", ["user", "userData"]),
    ...mapGetters("settings", ["getFont"]),
    // player() {
    //   return this.$refs.videoPlayer.player
    // }
  },
  methods: {
    ...mapActions("vacancy", [
      "listVacancy",
      "listVacancyMy",
      "createVacancy",
      "detailVacancy",
      "updateVacancy",
      "deleteVacancy"
    ]),
    ...mapActions("auth", ["detailUser", "checkAuthUser"]),

    playVIdeo() {
      this.$refs.player.play()
    },


    proccessFile() {
      // document.getElementById("fileInput").click()
      console.log(this.$refs)
      this.$refs.fileVideo.click();
    },
    onChangeVideo(event) {
      const files = event.target.files;
      let filename = files[0].name;
      let file = files[0];
      if (!(file && file["type"].split("/")[0] === "video")) {
        return (this.errorFileDialog = true);
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.video.sources[0].src = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.videoUpload.video = files[0];
      this.uploadVideo(this.videoUpload);
    },
    uploadVideo (payload) {
      const vm = this;
    // Upload file and metadata to the object
    var storageRef = fireStorage.ref();
    var uploadTask = storageRef.child('videos/' + payload.user).put(payload.video);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function (error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            vm.videoDB({videoUrl: downloadURL, user: vm.user.email})
          });
        });
      });
    },

    videoDB(payload) { // done
    const vm = this;
    if (!offline.data().isOnline) {
      return alert("Está sem internet")
    }
    // Loading.show()
    const ref = firestoreDb.collection('videos').doc(payload.user);
    // Create a root reference
    var storageRef = fireStorage.ref();
    // Create the file metadata
    ref.set(payload).then((docRef) => {
      console.log("Inserido")
      console.log(docRef)
      vm.getVideo(payload.user)
    })
      .catch((error) => {
        // Loading.hide()
        alert("Error adding document: ", error)
      })

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

    // deleteVacancyThis(id) {
    //   const vm = this;

    //   this.deleteVacancy(id).then(function() {
    //     vm.confirDeleteAux = false;
    //     vm.confirDelete = false;
    //   });
    // },

    // vacancyDtlFunc(id) {
    //   console.log(id);
    //   this.detailVacancy(id);
    //   console.log("Nelzio Sitoe delll");
    // },

    // updateVacancyHere(payload) {
    //   Loading.show();
    //   const updateRef = firestoreDb.collection("vacancies").doc(payload.id);
    //   updateRef
    //     .set(payload.data)
    //     .then(() => {
    //       this.listVacancyMyHere(this.user.email);
    //       Loading.hide();
    //     })
    //     .catch(error => {
    //       Loading.hide();
    //       alert("Error update document: ", error);
    //     });
    // },

    handleSwipe(val) {
      // if (val.direction === "left") {
      //   this.$router.push("/store");
      // }

      if (val.direction === "right") {
        // this.$router.push("/settings");
        this.$router.go(-1)
      }
    },

    handleHold({ evt, ...info }) {
      // console.log(info)
      // console.log(evt)
      this.$root.$emit(
        "textToSpeechRouter",
        this.userData.displayName +
          ".\n Telefone: " +
          this.converNumbPhone(this.userData.phoneNumber) +
          ";\n email: " +
          this.userData.email +
          "; data de nascimento: " +
          this.userData.date +
          ";\n profissão: " +
          this.userData.profission +
          "."
      );
      // console.log(this.vacancy)
    },

    makePublic(id, data, val) {
      let dataAux = {
        title: data.title,
        user: data.user,
        description: data.description,
        img: data.img,
        place: data.place,
        category: data.category,
        validate: data.validate,
        public: !val
      };
      this.updateVacancyHere({
        id: id,
        data: dataAux
      });
    },

    listCandidatures(user) {
      // done
      if (!offline.data().isOnline) {
      return showErrorMessage("Está sem internet.")
    }
      this.vacanciesAply = [];
      const ref = firestoreDb.collection("vacancies");
      const vm = this;
      ref
        .where("public", "==", true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            firestoreDb
              .collection("vacancies")
              .doc(doc.id)
              .collection("candidates")
              .doc(user)
              .get()
              .then(doc2 => {
                if (doc2.exists) {
                  vm.vacanciesAply.push({
                    id: doc.id,
                    title: doc.data().title,
                    user: doc.data().user,
                    img: doc.data().img
                  });
                  if (vm.vacanciesAply.length >= 3) return;
                }
              });
          });
        });
    },

    listVacancyMyHere(user) {
      // done
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        showErrorMessage("Está sem internet.")
      }
      const vm = this;
      // vm.myVacancies = []
      var myVacanciesAux = [];
      const ref = firestoreDb.collection("vacancies");
      ref.where("user", "==", user).onSnapshot(function(querySnapshot) {
        vm.vacancyNum = querySnapshot.docs.length;
        // querySnapshot.forEach(function(doc) {
        //   // if (vm.myVacancies.length !== querySnapshot.docs.length) {
        //   //   vm.myVacancies.push({
        //   //     key: doc.id,
        //   //     title: doc.data().title,
        //   //     user: doc.data().user,
        //   //     description: doc.data().description,
        //   //     img: doc.data().img,
        //   //     public: doc.data().public,
        //   //     place: doc.data().place,
        //   //     validate: doc.data().validate,
        //   //     category: doc.data().category
        //   //   });
        //   // }
        //   // myVacanciesAux.push({
        //   //   public: doc.data().public
        //   // });
        // });
        // vm.myVacanciesAux = myVacanciesAux;
      });
    },
    listStoreMyHere(user) {
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        showErrorMessage("Está sem internet.")
      }
      const vm = this;
      const ref = firestoreDb.collection("stories");
      ref.where("user", "==", user).onSnapshot(function(querySnapshot) {
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
    },
    windowScroll () {
      this.scrollNum = window.scrollY
    },

    // Video Player functions
  },
  created() {
    this.checkAuthUser();
    this.detailUser(this.user.email);
    this.listVacancyMyHere(this.user.email);
    this.listStoreMyHere(this.user.email);
  },
  mounted() {
    this.getVideo(this.user.email)
    // this.listVacancyMy(this.user.email)
    this.videoUpload.user = this.user.email
    
    window.addEventListener("scroll", this.windowScroll);
    this.listCandidatures(this.user.email);

    this.$root.$emit(
      "textToSpeechRouter",
      "Pagina do seu perfil.\n Pressione para ouvir detalhes do seu perfil"
    );
  }
  // watch: {
  //   vacancyDetail() {
  //     if (this.vacancyDetail) {
  //       this.confirDelete = true;
  //     }
  //   },
  //   vacancyDeleted() {
  //     if (this.vacancyDeleted) {
  //       this.confirDeleteSuccess = true;
  //       this.listVacancyMy(this.user.email);
  //     }
  //   },
  //   vacancyUploaded() {
  //     this.listVacancyMy(this.user.email);
  //   }
  // }
};
</script>
