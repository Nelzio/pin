<template>
  <div class="q-pb-md q-pt-md">
    <!-- <q-item v-if="showCV" clickable @click="getCV()">
      <q-item-section top avatar>
        <q-icon :color="darkModeConf.iconVar" name="visibility" />
      </q-item-section>
      <q-item-section>Ver</q-item-section>
    </q-item>
    <q-item clickable @click="selectFile()">
      <q-item-section top avatar>
        <q-icon :color="darkModeConf.iconVar" name="upload_file" />
      </q-item-section>
      <q-item-section>Carregar</q-item-section>
    </q-item> -->
    <q-card class="my-card shadow-8">
      <q-item
        class="text-left"
        @click="optionsDialog = !optionsDialog"
        clickable
        v-ripple
      >
        <q-item-section avatar top>
          <q-icon :color="darkModeConf.iconVar" name="school" />
        </q-item-section>
        <q-item-section>
          <q-item-label :class="getFont.title">Curriculum</q-item-label>
        </q-item-section>
      </q-item>
    </q-card>

    <q-form class="q-gutter-md" ref="storeForm" role="form">
      <input
        id="fileInput"
        type="file"
        hidden
        ref="fileDoc"
        accept="application/pdf"
        role="button"
        lang="pt-PT"
        aria-label="Carregar ficheiro pdf"
        @change="onChangeDoc"
      />
    </q-form>

    <!-- <div>
      <q-dialog v-model="dialogCVHere" :maximized="maximizedToggle">
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
                lang="pt-PT" aria-label="Menu"
                size="lg"
              />

              <q-space />

              <q-toolbar-title
                shrink
                class="row items-center no-wrap text-primary text-h5 text-weight-bolder title-font"
              >Curriculum</q-toolbar-title>

              <q-space />

              <q-btn
                v-close-popup
                :color="darkModeConf.iconVar"
                flat
                dense
                round
                icon="edit"
                lang="pt-PT" aria-label="Trocar CV"
                size="lg"
                @click="processFile('doc')"
              />
            </q-toolbar>
            <q-card-section>
              <pdf :src="curriculumDownload.docUrl"></pdf>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </div> -->
    <div>
      <q-dialog
        v-model="dialogCVHere"
        :maximized="maximizedToggle"
        role="dialog"
        lang="pt-PT"
        aria-label="Dialogo de carregamento de documento"
      >
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
              size="lg"
              role="button"
              lang="pt-PT"
              aria-label="Fechar dialogo"
            />

            <q-space />

            <q-toolbar-title
              shrink
              class="row items-center no-wrap text-h5 text-weight-bolder title-font"
              >Curriculum</q-toolbar-title
            >

            <q-space />

            <q-btn
              v-close-popup
              :color="darkModeConf.iconVar"
              flat
              dense
              round
              icon="edit"
              lang="pt-PT"
              aria-label="Trocar CV"
              role="button"
              size="lg"
              @click="selectFile()"
            />
          </q-toolbar>
          <q-card-section class="container">
            <q-pdfviewer
              v-model="show"
              :src="curriculumDownload.docUrl"
              type="html5"
              content-class="fit container"
              inner-content-class="fit container"
            />
          </q-card-section>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="optionsDialog"
        lang="pt-PT"
        aria-label="Opções de Curriculum"
        role="dialog"
      >
        <q-card style="width: 80vw">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Curriculum Vitae</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-list separator class="q-pa-sm q-gutter-y-md">
            <q-card class="my-card" v-if="showCV">
              <q-item
                clickable
                v-ripple
                @click="getCV()"
                lang="pt-PT"
                aria-label="Ver CV"
                role="button"
              >
                <q-item-section avatar>
                  <q-icon :color="darkModeConf.iconVar" name="visibility" />
                </q-item-section>
                <q-item-section>Abrir</q-item-section>
              </q-item>
            </q-card>
            <q-card class="my-card">
              <q-item
                clickable
                v-ripple
                @click="selectFile()"
                lang="pt-PT"
                aria-label="Carregar CV"
                role="button"
              >
                <q-item-section avatar>
                  <q-icon :color="darkModeConf.iconVar" name="upload_file" />
                </q-item-section>
                <q-item-section>Carregar</q-item-section>
              </q-item>
            </q-card>
          </q-list>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import pdf from "vue-pdf"
// import pdf from "vue-pdf-cdn";
// import PdfRenderer from "vue-pdf-renderer";
// import pdf from 'vue-pdf-cs'
import offline from "v-offline"
import { LocalStorage, Loading } from "quasar"
import { firebaseAuth, firestoreDB, fireStorage, firebase } from "boot/firebase"
export default {
  props: ["dialogCV"],
  data() {
    return {
      optionsDialog: false,
      show: true,
      curriculumDownload: {
        key: "",
        docUrl: "",
        user: "",
      },
      dialogCVHere: false,
      maximizedToggle: true,
      docUpload: {
        doc: null,
        user: "",
      },
      showCV: false,
    }
  },
  components: { pdf },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("auth", ["user", "userData"]),
    ...mapGetters("settings", ["getFont", "getVibrate"]),
  },
  methods: {
    selectFile() {
      this.$refs.fileDoc.click()
    },

    verifyCV() {
      const cvRef = firestoreDB.collection("curriculum").doc(this.user.email)

      cvRef.onSnapshot((doc) => {
        if (doc.exists) {
          this.showCV = true
        }
      })
    },

    curriculumDB(payload) {
      Loading.show()
      const vm = this
      if (!offline.data().isOnline) {
        return alert("Está sem internet")
      }
      // Loading.show()
      const ref = firestoreDB.collection("curriculum").doc(payload.user)
      // Create a root reference
      var storageRef = fireStorage.ref()
      // Create the file metadata
      ref
        .set(payload)
        .then((docRef) => {
          console.log(docRef)
          Loading.hide()
        })
        .catch((error) => {
          // Loading.hide()
          console.log("Error adding document: ", error)
          Loading.hide()
        })
    },

    onChangeDoc(event) {
      if (!event.target.files) {
        return
      }
      const files = event.target.files
      let filename = files[0].name
      let file = files[0]
      // console.log(file["type"].split(".")[file["type"].split(".").length - 1])
      if (
        !(
          file &&
          file["type"].split(".")[file["type"].split(".").length - 1] ===
            "application/pdf"
        )
      ) {
        return this.$emit("dialog")
      }
      const fileReader = new FileReader()
      fileReader.readAsDataURL(files[0])
      this.docUpload.doc = files[0]
      this.uploadFile(this.docUpload, "doc")
    },

    uploadFile(payload, type) {
      console.log(payload)
      Loading.show()
      const vm = this
      // Upload file and metadata to the object
      var storageRef = fireStorage.ref()
      var uploadTask = storageRef
        .child("curriculum/" + payload.user.split("@")[0] + ".pdf")
        .put(payload.doc)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log("Upload is " + progress + "% done")
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused")
              break
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running")
              break
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              Loading.hide()
              // User doesn't have permission to access the object
              break

            case "storage/canceled":
              Loading.hide()
              // User canceled the upload
              break

            case "storage/unknown":
              Loading.hide()
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL)
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                console.log("File available at", downloadURL)
                vm.curriculumDB({
                  docUrl: downloadURL,
                  user: vm.userData.email,
                })
                vm.optionsDialog = false
              })
          })
        }
      )
    },

    getCV() {
      Loading.show()

      const vm = this
      if (!offline.data().isOnline) {
        return showErrorMessage("Está sem internet.")
      }
      var storage = firebase.storage()
      const ref = firestoreDB.collection("curriculum").doc(this.userData.email)
      ref
        .get()
        .then((doc) => {
          if (doc.exists) {
            vm.curriculumDownload = {
              key: doc.id,
              docUrl: doc.data().docUrl,
              user: doc.data().user,
            }

            // console.log(vm.curriculumDownload.docUrl)
            // vm.curriculumDownload.docUrl = "https://cdn.mozilla.net/pdfjs/tracemonkey.pdf";
            vm.optionsDialog = false
            vm.dialogCVHere = true
            Loading.hide()
          } else {
            console.log("No such document!")
            // Loading.hide()
          }
        })
        .catch((error) => {
          console.log(error)
        })
      // this.dialogCVHere = true;
    },
  },
  mounted() {
    const vm = this
    this.docUpload.user = this.userData.email
    this.verifyCV()
    // this.$root.$on("cvDialog", function (val) {
    //   // vm.dialogCV = val;
    //   // vm.dialogCVHere = val;
    //   vm.getCV()
    // })
    // this.$root.$on("uploadCV", function () {
    //   // vm.dialogCV = val;
    //   // vm.dialogCVHere = val;
    //   // console.log(vm.$refs.fileDoc)
    //   vm.$refs.fileDoc.click()
    // })
    // this.$root.$on("cvDialog", function(val) {
    // 	// vm.dialogCV = val;
    // 	vm.dialogCVHere = val;
    // });
  },
}
</script>

<style>
.container {
  /* max-width: 50%;
  max-height: 70%;
  min-width: 400px; */
  min-height: 85vh;
  width: 100%;
  height: 100%;
}
</style>