<template>
  <q-page>
    <!-- content -->
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <q-card flat>
          <q-img
            :src="getStore.img"
            role="img"
            alt="Imagem do produto ou serviço"
          />
        </q-card>
        <div
          v-if="mobile"
          class="row no-wrap items-center justify-end q-pa-md"
          role="group"
        >
          <q-btn
            @click="
              socialShare(
                'https://hack-a2a7b.firebaseapp.com/store/details/' +
                  getStore.key,
                {
                  title: 'Emprego Inclusivo Store',
                  description: getStore.title,
                }
              )
            "
            outline
            :color="darkModeConf.iconVar"
            rounded
            label="Partilhar"
            icon="share"
            role="button"
          />
        </div>
        <div v-else class="row no-wrap items-center q-pa-md" role="group">
          <div class="col ellipsis" :class="getFont.title">
            {{ getStore.title }}
          </div>
          <div class="col ellipsis">
            <social-sharing
              :url="
                'https://hack-a2a7b.firebaseapp.com/store/details/' +
                getStore.key
              "
              title="Emprego Inclusivo Store"
              description="Emprego Inclusivo Store"
              :quote="getStore.title"
              inline-template
            >
              <div class="row q-gutter-md justify-end">
                <network network="facebook">
                  <q-btn
                    outline
                    color="blue"
                    rounded
                    icon="ion-logo-facebook"
                    role="button"
                  />
                </network>
                <network network="whatsapp">
                  <q-btn
                    outline
                    color="green"
                    rounded
                    icon="ion-logo-whatsapp"
                    role="button"
                  />
                </network>
              </div>
            </social-sharing>
          </div>
        </div>

        <q-list role="list">
          <q-item v-if="getStore.price" role="listitem">
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

          <q-item class="text-left" role="listitem">
            <q-item-section top avatar>
              <q-icon :color="darkModeConf.iconVar" name="phone" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="getFont.title">Telefone</q-item-label>
              <q-item-label :class="getFont.text">{{
                userData.phoneNumber
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset="item" />

          <q-item role="listitem">
            <q-item-section top avatar>
              <q-icon :color="darkModeConf.iconVar" name="description" />
            </q-item-section>

            <q-item-section>
              <q-item-label :class="getFont.title">Descrição</q-item-label>
              <q-item-label :class="getFont.text">
                <div v-html="getStore.description"></div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="row q-gutter-md q-pa-md" role="group">
          <q-btn
            outline
            rounded
            :color="darkModeConf.iconVar"
            icon="edit"
            :to="'/profile/store/edit/' + getStore.key"
            role="button"
          />
          <q-btn
            outline
            rounded
            :color="darkModeConf.iconVar"
            :icon="statusStore ? 'visibility' : 'visibility_off'"
            @click="makePublic(getStore.key, getStore, statusStore)"
            role="button"
          />
          <q-btn
            outline
            rounded
            :color="darkModeConf.iconVar"
            icon="delete"
            @click="confirDelete = true"
            role="button"
          />
        </div>
      </div>
    </div>

    <div>
      <q-dialog
        v-model="confirDelete"
        role="dialog"
        lang="pt-PT"
        aria-label="Dialog de confirmação de remoção"
      >
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div :class="getFont.title">Confirmar</div>
          </q-card-section>

          <q-card-section class="q-pt-none" :class="getFont.text"
            >Remover {{ getStore.title }}?</q-card-section
          >

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn
              rounded
              outline
              :color="darkModeConf.iconVar"
              label="Remover"
              @click="deleteStoreThis(getStore.key)"
              role="button"
            />
            <q-btn
              rounded
              outline
              color="grey"
              label="Cancelar"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="confirDeleteSuccess"
        role="dialog"
        lang="pt-PT"
        aria-label="Dialog de alerta"
      >
        <q-card>
          <q-card-section class="text-green" :class="getFont.title"
            >Removido com sucesso</q-card-section
          >

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="primary"
              @click="$router.go(-1)"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>


<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { firebaseAuth, firestoreDB, fireStorage } from "boot/firebase"
import { QSpinnerRings, QSpinnerRadio, Loading } from "quasar"
import offline from "v-offline"
import SocialSharing from "vue-social-sharing"
export default {
  // name: 'PageName',
  components: {
    SocialSharing,
  },
  data() {
    return {
      tab: "details",
      candidates: [],
      statusStore: false,
      confirDelete: false,
      confirDeleteSuccess: false,
      mobile: false,
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf", "vibrateState"]),
    ...mapState("store", ["stories", "storeDtl"]),
    ...mapGetters("store", ["getStories", "getStore"]),
    ...mapGetters("auth", ["userData"]),
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
    ...mapActions("user", ["detailUser"]),

    getStatusStore(id) {
      const vm = this
      const ref = firestoreDB.collection("stories").doc(id)
      ref.onSnapshot((doc) => {
        if (doc.exists) {
          vm.statusStore = doc.data().public
        } else {
          console.log("No such document!")
        }
      })
    },

    updateStoreHere(payload) {
      Loading.show()
      const updateRef = firestoreDB.collection("stories").doc(payload.id)
      updateRef
        .set(payload.data)
        .then(() => {
          Loading.hide()
        })
        .catch((error) => {
          Loading.hide()
          console.log("Error update document: ", error)
        })
    },

    makePublic(id, data, val) {
      let dataAux = {
        title: data.title,
        user: data.user,
        description: data.description,
        img: data.img,
        public: !val,
        category: data.category,
        place: data.place,
        subCategory: data.subCategory,
        price: data.price,
        priceVariable: data.priceVariable,
      }
      this.updateStoreHere({
        id: id,
        data: dataAux,
      })
    },

    deleteStoreThis(id) {
      const vm = this

      Loading.show()
      var storageRef = fireStorage.ref()

      var desertRef = storageRef.child("stories/" + id)

      firestoreDB
        .collection("stories")
        .doc(id)
        .delete()
        .then(() => {
          // Delete the file
          desertRef
            .delete()
            .then(function () {
              // File deleted successfully
              vm.confirDeleteSuccess = true
              Loading.hide()
            })
            .catch(function (error) {
              // Uh-oh, an error occurred!
              vm.confirDeleteSuccess = true
              console.log("Erro ao Remover imagem")
              Loading.hide()
            })
        })
        .catch((error) => {
          Loading.hide()
          console.log("Error removing document: ", error)
        })
    },

    socialShare(url, opts) {
      var options = {
        message: opts.title, // not supported on some apps (Facebook, Instagram)
        url: url,
        chooserTitle: opts.description, // Android only, you can override the default share sheet title
      }

      var onSuccess = function (result) {
        console.log("Share completed? " + result.completed) // On Android apps mostly return false even while it's true
        console.log("Shared to app: " + result.app) // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      }

      var onError = function (msg) {
        console.log("Sharing failed with message: " + msg)
      }

      window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError)
    },
  },
  created() {
    this.detailStore(this.$route.params.idPS)

    if (window.hasOwnProperty("cordova")) {
      this.mobile = true
    }

    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit(
        "textToSpeechRouter",
        "Página de detalhes de produto ou serviço"
      )
  },
  mounted() {
    this.getStatusStore(this.$route.params.idPS)
  },
}
</script>
