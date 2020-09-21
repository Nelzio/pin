<template>
  <div v-touch-hold:600.mouse="handleHold">
    <!-- content -->
    <q-card class="my-card">
      <q-img
        v-ripple
        v-if="store.img"
        :src="store.img"
        style="min-height: 200px;"
        @click="$router.push('/profile/store/details/'+store.key)"
        role="img"
        lang="pt-PT"
        :aria-label="'Imagem do ' + store.category"
      />
      <q-img
        v-ripple
        v-else
        src="statics/img/nophoto.png"
        style="min-height: 200px;"
        @click="$router.push('/profile/store/details/'+store.key)"
        role="img"
        lang="pt-PT"
        :aria-label="'Imagem do ' + store.category"
      />
      <q-card-section :class="getFont.title">{{ store.title }}</q-card-section>
      <q-card-actions align="right">
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          label="Detalhes"
          icon="details"
          :to="'/profile/store/details/'+store.key"
          role="link"
        />
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          icon="edit"
          :to="'/profile/store/edit/'+store.key"
          role="link"
        />
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          icon="delete"
          @click="confirDelete = true"
          role="button"
        />
        <q-btn
          outline
          rounded
          :color="darkModeConf.iconVar"
          :icon="statusStore ? 'visibility' : 'visibility_off'"
          @click="makePublic(store.key, store, statusStore)"
          lang="pt-PT"
          :aria-label="statusStore ? 'Ocultar' : 'Desocultar'"
          role="button"
        />
      </q-card-actions>
    </q-card>

    <div>
      <q-dialog
        v-model="confirDelete"
        role="dialog"
        lang="pt-PT"
        aria-label="Alerta de confirmação"
      >
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div :class="getFont.title">Confirmar</div>
          </q-card-section>

          <q-card-section
            class="q-pt-none"
            :class="getFont.text"
          >Remover {{ store.title }}?</q-card-section>

          <q-card-actions
            align="right"
            class="bg-white text-teal"
          >
            <q-btn
              rounded
              outline
              :color="darkModeConf.iconVar"
              label="Remover"
              role="button"
              @click="deleteStoreThis(store.key)"
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
        role="alertdialog"
        lang="pt-PT"
        aria-label="Alerta de sucesso"
      >
        <q-card>
          <q-card-section
            class="text-green"
            :class="getFont.title"
          >Removido com sucesso</q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="primary"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Loading } from "quasar";
import { firebaseAuth, firestoreDB, fireStorage } from "boot/firebase";
import offline from "v-offline";

export default {
  // name: 'PageName',
  props: ["store"],
  data () {
    return {
      tab: "bio",
      confirDeleteSuccess: false,
      confirDelete: false,
      myStories: [],
      statusStore: false
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"])
  },
  methods: {
    handleHold ({ ...info }) {
      // console.log(evt)
      // console.log(val)
      // console.log(this.store)
      if (window.hasOwnProperty("cordova")) {
        navigator.vibrate(200);
      } else {
        window.navigator.vibrate(200);
      }
      this.$root.$emit(
        "textToSpeechRouter",
        "Você adicionou" +
        this.store.category +
        " " +
        this.store.title +
        ".\n Clique para detalhes."
      );
    },

    getStatusStore (id) {
      const vm = this;
      const ref = firestoreDB.collection("stories").doc(id);
      ref.onSnapshot(doc => {
        if (doc.exists) {
          vm.statusStore = doc.data().public;
        } else {
          console.log("No such document!");
        }
      });
    },

    deleteStoreThis (id) {
      const vm = this;

      Loading.show();
      var storageRef = fireStorage.ref();

      var desertRef = storageRef.child("stories/" + id);

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
              vm.confirDeleteSuccess = true;
              Loading.hide();
            })
            .catch(function (error) {
              // Uh-oh, an error occurred!
              vm.confirDeleteSuccess = true;
              console.log("Erro ao Remover imagem");
              Loading.hide();
            });
        })
        .catch(error => {
          Loading.hide();
          alert("Error removing document: ", error);
        });
    },

    updateStoreHere (payload) {
      Loading.show();
      const updateRef = firestoreDB.collection("stories").doc(payload.id);
      updateRef
        .set(payload.data)
        .then(() => {
          Loading.hide();
        })
        .catch(error => {
          Loading.hide();
          console.log("Error update document: ", error);
        });
    },

    makePublic (id, data, val) {
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
        timeSend: data.timeSend,
      };
      this.updateStoreHere({
        id: id,
        data: dataAux
      });
    }
  },
  created () { },
  mounted () {
    this.getStatusStore(this.store.key);
  }
};
</script>
