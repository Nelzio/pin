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
            <q-img
              :src="user.photoURL"
              spinner-color="white"
              alt="Imagem de perfil"
              role="img"
            />
          </q-avatar>

          <div :class="getFont.title">{{ user.displayName }}</div>
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
              role="tab"
            >
              <q-tab
                name="bio"
                label="Contacto"
                icon="contacts"
                role="tab"
                aria-label="Guia de contacto"
              />
              <q-tab
                name="ocupacao"
                label="Sobre"
                icon="description"
                v-if="userData.profileType"
                role="tab"
                aria-label="Guia de mais   descrição do perfil"
              />
            </q-tabs>

            <q-separator />

            <q-tab-panels
              v-model="tab"
              animated
            >
              <q-tab-panel name="bio">
                <q-list>
                  <q-item
                    v-if="userData.phoneNumber"
                    class="text-left"
                  >
                    <q-item-section
                      top
                      avatar
                    >
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="phone"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Telefone</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.phoneNumber }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator
                    v-if="user.email.split('@')[user.email.split('@').length - 1] !== 'superactive.com'"
                    spaced
                    inset="item"
                  />

                  <q-item
                    v-if="user.email.split('@')[user.email.split('@').length - 1] !== 'superactive.com'"
                    class="text-left"
                  >
                    <q-item-section
                      top
                      avatar
                    >
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="email"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Email</q-item-label>
                      <q-item-label :class="getFont.text">{{ user.email }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator
                    v-if="userData.phoneNumber || userData.email.split('@')[userData.email.split('@').length - 1] !== 'superactive'"
                    spaced
                    inset="item"
                  />

                  <q-item class="text-left">
                    <q-item-section
                      avatar
                      top
                    >
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="place"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Endereço</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.address }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel
                v-if="userData.profileType && userData.profileType == 'person'"
                name="ocupacao"
              >
                <q-list>
                  <q-item class="text-left">
                    <q-item-section
                      top
                      avatar
                    >
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="calendar_today"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Data de nascimento</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.date }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item class="text-left">
                    <q-item-section
                      top
                      avatar
                    >
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="work"
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label :class="getFont.title">Profissão</q-item-label>
                      <q-item-label :class="getFont.text">{{ userData.profession }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator
                    spaced
                    inset="item"
                  />

                  <q-item class="text-left">
                    <q-item-section
                      avatar
                      top
                    >
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="school"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label :class="getFont.title">Curiculum</q-item-label>
                    </q-item-section>
                    <q-item-section
                      top
                      side
                    >
                      <div class="text-grey-8 q-gutter-xs">
                        <q-btn
                          flat
                          dense
                          round
                          icon="more_vert"
                        >
                          <q-menu
                            persistent
                            auto-close
                          >
                            <q-list style="min-width: 100px">
                              <q-item
                                clickable
                                @click="$root.$emit('cvDialog', true)"
                              >
                                <q-item-section
                                  top
                                  avatar
                                >
                                  <q-icon
                                    :color="darkModeConf.iconVar"
                                    name="visibility"
                                  />
                                </q-item-section>
                                <q-item-section>Ver</q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                @click="$root.$emit('uploadCV')"
                              >
                                <q-item-section
                                  top
                                  avatar
                                >
                                  <q-icon
                                    :color="darkModeConf.iconVar"
                                    name="upload_file"
                                  />
                                </q-item-section>
                                <q-item-section>Carregar</q-item-section>
                              </q-item>
                              <q-item clickable>
                                <q-item-section
                                  top
                                  avatar
                                >
                                  <q-icon
                                    :color="darkModeConf.iconVar"
                                    name="delete"
                                  />
                                </q-item-section>
                                <q-item-section>Apagar</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
              <q-tab-panel
                v-else-if="userData.profileType && userData.profileType == 'organization'"
                name="ocupacao"
              >
                <div v-html="userData.description"></div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>

        <div
          class="row"
          role="row"
          aria-label="Vídeo de perfil"
        >
          <q-card class="col-12">
            <q-video
              v-if="videoDownload.videoUrl && videoDownload.from == 'link'"
              :ratio="16/9"
              :src="videoDownload.videoUrl"
              role="application"
              aria-label="Vídeo de perfil."
            />
            <VideoProfile
              v-else-if="videoDownload.videoUrl"
              :videoUrl="videoDownload.videoUrl"
              role="application"
              aria-label="Vídeo de perfil."
            />

            <div
              class="row q-pa-md"
              :class="getFont.text"
            >Carregar vídeo ou adicionar link</div>

            <q-card-actions align="left">
              <q-btn
                rounded
                label="Carregar"
                icon="upload_file"
                :color="darkModeConf.iconVar"
                :class="darkModeConf.textBtn"
                @click="processFile('video')"
                role="button"
                aria-label="Carregar novo vídeo"
              />
              <q-btn
                rounded
                label="Link"
                icon="link"
                :color="darkModeConf.iconVar"
                :class="darkModeConf.textBtn"
                @click="dialogAddVideoLink = true"
                role="button"
                aria-label="Adicionar link do vídeo"
              />
              <q-btn
                v-if="videoDownload.videoUrl"
                rounded
                label="Apagar"
                icon="delete"
                :color="darkModeConf.iconVar"
                :class="darkModeConf.textBtn"
                @click="deleteVideoDialog = true"
                role="button"
                aria-label="Remover vídeo"
              />
            </q-card-actions>
          </q-card>
          <q-form
            class="q-gutter-md"
            ref="storeForm"
            role="form"
          >
            <input
              type="file"
              hidden
              ref="fileVideo"
              accept="video/*"
              @change="onChange"
            />
          </q-form>
        </div>

        <q-separator />

        <div
          v-if="vacanciesAply.length"
          role="group"
          aria-label="Candidaturas do usuário"
        >
          <q-toolbar
            :class="darkModeConf.bgColor"
            class="shadow-1"
          >
            <q-toolbar-title :class="getFont.title">Minhas candidaturas</q-toolbar-title>
          </q-toolbar>
          <div class="row">
            <div
              class="q-pa-sm col-12 col-md-6"
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
                    <div
                      class="text-bold"
                      :class="getFont.title"
                    >{{ candidate.title}}</div>
                    <div
                      v-if="candidate.user.split('@')[candidate.user.split('@').length - 1] !== 'superactive.com'"
                      :class="getFont.text"
                    >{{ candidate.user }}</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn
              outline
              rounded
              class="full-width"
              label="Ver todas"
              to="/profile/candidatures"
              role="link"
            />
          </div>
        </div>
        <!-- sec 6 -->

        <!-- asdasdasd -->

        <div
          v-if="!(vacancyNum == 0 && storeNum == 0)"
          role="group"
          aria-label="Atividades do usuário"
        >
          <q-toolbar
            :class="darkModeConf.bgColor"
            class="shadow-1"
            role="tab"
          >
            <q-toolbar-title :class="getFont.title">Actividades</q-toolbar-title>
          </q-toolbar>
          <div class="row">
            <div
              v-if="vacancyNum > 0"
              class="q-pa-sm col-12 col-md-6"
            >
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  to="/profile/vacancies"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="work"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div
                      class="text-bold"
                      :class="getFont.text"
                    >{{ vacancyNum }} vagas de emprego.</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
            <div
              v-if="storeNum > 0"
              class="q-pa-sm col-12 col-md-6"
            >
              <q-card class="my-card">
                <q-item
                  :class="darkModeConf.textColor"
                  clickable
                  to="/profile/store"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-avatar size="65px">
                      <q-icon
                        :color="darkModeConf.iconVar"
                        name="store"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <div
                      class="text-bold"
                      :class="getFont.text"
                    >{{ storeNum }} produtos e Serviços</div>
                  </q-item-section>
                </q-item>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- div para pdf component -->
    <div>
      <CV @dialog="errorDocumentUpload" />
    </div>
    <div>
      <q-dialog
        v-model="dialogAddProfile"
        role="dialog"
        aria-label="Escolher tipo de perfil entre pessoal e empresarial."
      >
        <q-card style="width: 90vw;">
          <q-card-section class="row">
            <div :class="getFont.title">Tipo de perfil</div>
            <q-space />
            <div :class="getFont.title">
              <q-btn
                flat
                round
                icon="close"
                v-close-popup
              />
            </div>
          </q-card-section>
          <q-card-section class="q-gutter-y-md">
            <q-btn
              @click="setStoreProfileType('person')"
              rounded
              label="Pessoa"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
            />
            <q-btn
              @click="setStoreProfileType('organization')"
              rounded
              label="Entidade"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
            />
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="dialogAddVideoLink"
        role="dialog"
        aria-label="Adicionar link do video de perfil"
      >
        <q-card style="width: 90vw;">
          <q-card-section>
            <div :class="getFont.title">Adicionar Link</div>
          </q-card-section>
          <q-card-section :class="getFont.text">
            <q-form
              ref="linkForm"
              class="q-gutter-md"
              role="form"
            >
              <q-input
                :color="darkModeConf.iconVar"
                rounded
                outlined
                v-model="videoLink"
                label="Link do vídeo"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Escreva o link do vídeo']"
              />
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              rounded
              label="Enviar link"
              icon="link"
              :class="darkModeConf.textBtn"
              :color="darkModeConf.iconVar"
              @click="addLink()"
            />
            <q-btn
              rounded
              outline
              label="Cancelar"
              :color="darkModeConf.iconVar"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="errorFileDialog">
        <q-card style="width: 90vw;">
          <q-card-section>
            <div :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text">{{ errorFileDialogMessage }}</q-card-section>
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
      <q-dialog v-model="deleteVideoDialog">
        <q-card style="width: 90vw;">
          <q-card-section>
            <div :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text">Apagar video?</q-card-section>
          <q-card-actions align="right">
            <q-btn
              rounded
              label="Apagar"
              icon="delete"
              color="red"
              @click="deleteVideo"
            />
            <q-btn
              rounded
              outline
              label="Cancelar"
              :color="darkModeConf.iconVar"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-page-sticky
        v-if="userData.profileType"
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          v-if="scrollNum < 150"
          rounded
          size="lg"
          :color="darkModeConf.iconVar"
          :class="darkModeConf.textBtn"
          label="Editar perfil"
          icon="edit"
          to="/account/edit"
        />
        <q-btn
          v-else
          round
          size="xl"
          :color="darkModeConf.iconVar"
          :class="darkModeConf.textBtn"
          to="/account/edit"
        >
          <q-icon
            name="edit"
            size="lg"
          />
        </q-btn>
      </q-page-sticky>
      <q-page-sticky
        v-else
        position="bottom-right"
        :offset="[18, 18]"
      >
        <q-btn
          v-if="scrollNum < 150"
          rounded
          size="lg"
          :color="darkModeConf.iconVar"
          :class="darkModeConf.textBtn"
          label="Editar perfil"
          icon="edit"
          @click="dialogAddProfile = true"
        />
        <q-btn
          v-else
          fab
          :color="darkModeConf.iconVar"
          :class="darkModeConf.textBtn"
          @click="dialogAddProfile = true"
        >
          <q-icon
            name="edit"
            size="lg"
          />
        </q-btn>
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { LocalStorage, Loading } from "quasar";
import {
  firebaseAuth,
  firestoreDB,
  fireStorage,
  firebase
} from "boot/firebase";
import { showErrorMessage } from "../../functions/handle-error-messages";
import VideoProfile from "components/profile/VideoProfile.vue";
import offline from "v-offline";
import CV from "components/profile/CV.vue";
export default {
  // name: 'PageName',

  data () {
    return {
      tab: "bio",
      deleteVideoDialog: false,
      dialogAddVideoLink: false,
      dialogAddProfile: false,
      maximizedToggle: true,
      dialogCV: false,
      dialogUploadCV: false,
      confirDeleteSuccess: false,
      errorFileDialog: false,
      confirDelete: false,
      confirDeleteAux: false,
      isPublic: true,
      videoLink: "",
      errorFileDialogMessage: "",
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
        sources: [
          {
            src:
              "https://firebasestorage.googleapis.com/v0/b/hack-a2a7b.appspot.com/o/videos%2Fnelziositoe%40gmail.com?alt=media&token=f9ad9952-a781-4bfa-a706-d38ff3ee4fb6",
            type: "video/mp4"
          }
        ],
        options: {
          autoplay: false,
          volume: 0.6,
          poster: "statics/app-logo-128x128.png"
        }
      },
      videoUpload: {
        video: null,
        user: ""
      },
      videoDownload: {},

      pathDoc: ""
    };
  },
  components: { VideoProfile, CV },
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
    ...mapGetters("settings", ["getFont"])
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
    ...mapActions("auth", ["checkAuthUser"]),

    errorDocumentUpload () {
      this.errorFileDialogMessage = "O documento deve estar no formato PDF.";
      this.errorFileDialog = true;
    },

    setStoreProfileType (type) {
      LocalStorage.set("profileType", type);
      this.$router.push("/account/edit");
    },

    playVIdeo () {
      this.$refs.player.play();
    },

    processFile (type) {
      // document.getElementById("fileInput").click()
      this.$refs.fileVideo.click();
    },
    onChange (event) {
      if (!event.target.files) {
        return;
      }
      const files = event.target.files;
      let filename = files[0].name;
      let file = files[0];
      if (!(file && file["type"].split("/")[0] === "video")) {
        this.errorFileDialogMessage = "Insira um vídeo válido.";
        return (this.errorFileDialog = true);
      }
      const fileReader = new FileReader();
      // addEventListener to preload image
      fileReader.addEventListener("load", () => {
        this.video.sources[0].src = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.videoUpload.video = files[0];
      this.uploadFile(this.videoUpload);
    },
    uploadFile (payload, type) {
      Loading.show();
      const vm = this;
      // Upload file and metadata to the object
      var storageRef = fireStorage.ref();
      var uploadTask = storageRef
        .child("videos/" + payload.user)
        .put(payload.video);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              Loading.hide();
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              Loading.hide();
              // User canceled the upload
              break;

            case "storage/unknown":
              Loading.hide();
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                console.log("File available at", downloadURL);
                Loading.hide();
                vm.videoDB({
                  videoUrl: downloadURL,
                  user: vm.user.email,
                  from: "storange"
                });
              });
          });
        }
      );
    },

    deleteVideo () {
      const vm = this;
      // console.log(vm.userData.email);
      if (!offline.data().isOnline) {
        return showErrorMessage("Está sem internet.");
      }
      Loading.show();

      const ref = firestoreDB.collection("videos").doc(vm.userData.email);
      ref
        .get()
        .then(doc => {
          if (doc.exists) {
            // console.log(doc.data().from);
            if (doc.data().from == "storange") {
              var storageRef = fireStorage.ref();

              var desertRef = storageRef.child("videos/" + vm.userData.email);

              desertRef
                .delete()
                .then(function () {
                  // File deleted successfully
                  console.log("video file deleted");
                  ref
                    .delete()
                    .then(function () {
                      // File deleted successfully
                      vm.videoDownload = {};
                      console.log("video deleted firestore");
                      vm.deleteVideoDialog = false;
                      Loading.hide();
                    })
                    .catch(error => {
                      console.log("video delete Error firestore");
                      console.log(error);
                    });
                  console.log("Video deletado");
                })
                .catch(function (error) {
                  // Uh-oh, an error occurred!
                  console.log("Erro ao Remover video");
                  Loading.hide();
                });
            } else {
              ref
                .delete()
                .then(function () {
                  // File deleted successfully
                  vm.videoDownload = {};
                  console.log("video deleted firestore2");
                  vm.deleteVideoDialog = false;
                  Loading.hide();
                })
                .catch(error => {
                  console.log("video delete Error firestore");
                  console.log(error);
                });
            }
          } else {
            console.log("No such document!");
            Loading.hide();
          }
        })
        .catch(error => {
          Loading.hide();
          showErrorMessage("Error adding document: ", error);
        });
    },

    videoDB (payload) {
      Loading.show();
      const vm = this;
      if (!offline.data().isOnline) {
        return alert("Está sem internet");
      }
      // Loading.show()
      const ref = firestoreDB.collection("videos").doc(payload.user);
      // Create a root reference
      var storageRef = fireStorage.ref();
      // Create the file metadata
      ref
        .set(payload)
        .then(docRef => {
          // console.log(docRef);
          vm.getVideo(payload.user);
          Loading.hide();
          this.dialogAddVideoLink = false;
          this.videoLink = "";
        })
        .catch(error => {
          // Loading.hide()
          console.log("Error adding document: ", error);
          Loading.hide();
        });
    },

    addLink () {
      this.$refs.linkForm.validate();
      if (this.$refs.linkForm.hasError) {
        this.errorFileDialogMessage = "";
        this.errorFileDialog = true;
        return;
      } else {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = this.videoLink.match(regExp);
        if (match && match[2].length == 11) {
          // 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0';
          this.videoLink = "https://www.youtube.com/embed/" + match[2];
        }
        this.videoDB({
          videoUrl: this.videoLink,
          user: this.user.email,
          from: "link"
        });
      }
    },

    getVideo (id) {
      // test
      // Loading.show()
      const vm = this;
      if (!offline.data().isOnline) {
        return showErrorMessage("Está sem internet.");
      }
      const ref = firestoreDB.collection("videos").doc(id);
      ref.onSnapshot(doc => {
        if (doc.exists) {
          vm.videoDownload = {
            key: doc.id,
            videoUrl: doc.data().videoUrl,
            user: doc.data().user,
            from: doc.data().from
          };
          // console.log(doc.data().from);

          // console.log(vm.videoDownload);
          // vm.video.sources[0].src = doc.data().videoUrl
          // Loading.hide()
        } else {
          console.log("No such document!");
          // Loading.hide()
        }
      });
    },

    handleSwipe (val) {
      // if (val.direction === "left") {
      //   this.$router.push("/store");
      // }

      if (val.direction === "right") {
        // this.$router.push("/settings");
        this.$router.go(-1);
      }
    },

    handleHold ({ evt, ...info }) {
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
        this.userData.profession +
        "."
      );
      // console.log(this.vacancy)
    },

    makePublic (id, data, val) {
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

    listCandidatures (user) {
      // done
      if (!offline.data().isOnline) {
        return showErrorMessage("Está sem internet.");
      }
      this.vacanciesAply = [];
      const ref = firestoreDB.collection("vacancies");
      const vm = this;
      ref
        .where("public", "==", true)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            firestoreDB
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

    listVacancyMyHere (user) {
      // done
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        showErrorMessage("Está sem internet.");
      }
      const vm = this;
      // vm.myVacancies = []
      var myVacanciesAux = [];
      const ref = firestoreDB.collection("vacancies");
      ref.where("user", "==", user).onSnapshot(function (querySnapshot) {
        vm.vacancyNum = querySnapshot.docs.length;
      });
    },

    listStoreMyHere (user) {
      var storageRef = fireStorage.ref();
      if (!offline.data().isOnline) {
        showErrorMessage("Está sem internet.");
      }
      const vm = this;
      const ref = firestoreDB.collection("stories");
      ref.where("user", "==", user).onSnapshot(function (querySnapshot) {
        vm.storeNum = querySnapshot.docs.length;
      });
    },

    converNumbPhone (valueNum) {
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
      this.scrollNum = window.scrollY;
    }

    // Video Player functions
  },
  created () {
    this.checkAuthUser("back");
    this.listVacancyMyHere(this.user.email);
    this.listStoreMyHere(this.user.email);
  },
  mounted () {
    Loading.hide()
    this.getVideo(this.user.email);
    // this.listVacancyMy(this.user.email)
    this.videoUpload.user = this.user.email;

    window.addEventListener("scroll", this.windowScroll);
    this.listCandidatures(this.user.email);

    // console.log(this.userData)

    this.$root.$emit(
      "textToSpeechRouter",
      "Página do seu perfil.\n Pressione para ouvir detalhes do seu perfil"
    );
  }
};
</script>
