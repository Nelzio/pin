<template>
  <div v-touch-hold:600.mouse="handleHold">
    <!-- content -->
		<q-card class="my-card">
			<q-img v-ripple v-if="store.img" :src="store.img" style="min-height: 200px;" @click="$router.push('/profile/store/details/'+store.key)" />
			<q-skeleton v-else height="230px" square />
			<q-card-section :class="getFont.title">{{ store.title }}</q-card-section>
			<q-card-actions align="right">
				<q-btn
					outline
					rounded
					label="Detalhes"
					icon="details"
					:to="'/profile/store/details/'+store.key"
				/>
				<q-btn outline rounded icon="edit" :to="'/profile/store/edit/'+store.key" />
				<q-btn
					outline
					rounded
					color="red"
					icon="delete"
					@click="confirDelete = true"
				/>
				<q-btn
					outline
					rounded
					:icon="statusStore ? 'visibility' : 'visibility_off'"
					@click="makePublic(store.key, store, statusStore)"
				/>
			</q-card-actions>
		</q-card>

      <div>
        <q-dialog v-model="confirDelete">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div :class="getFont.title">Confirmar</div>
            </q-card-section>

            <q-card-section class="q-pt-none" :class="getFont.text">Deletar {{ store.title }}?</q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                rounded
                outline
                color="red"
                label="Deletar"
                @click="deleteStoreThis(store.key)"
              />
              <q-btn rounded outline color="grey" label="Cancelar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

        <q-dialog v-model="confirDeleteSuccess">
          <q-card>
            <q-card-section class="text-green" :class="getFont.title">Deletado com sucesso</q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { Loading } from "quasar";
import { firebaseAuth, firestoreDb, fireStorage } from "boot/firebase";
import offline from "v-offline";

export default {
  // name: 'PageName',
  props: ["store"],
  data() {
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
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {

    handleHold ({ ...info }) {
      
      // console.log(evt)
      // console.log(val)
			// console.log(this.store)
			window.navigator.vibrate(200);
			this.$root.$emit("textToSpeechRouter", "Você adicionou" + this.store.category + " " + this.store.title + ".\n Clique para detalhes.");
    },

    getStatusStore(id) {
				const vm = this
        const ref = firestoreDb.collection('stories').doc(id);
        ref.onSnapshot((doc) => {
        if (doc.exists) {
						vm.statusStore = doc.data().public
        } else {
            console.log("No such document!")
        }
        });
    },

    deleteStoreThis(id) {
			const vm = this;

			Loading.show()
			var storageRef = fireStorage.ref()

			var desertRef = storageRef.child('stories/' + id);

			firestoreDb.collection('stories').doc(id).delete().then(() => {
			// Delete the file
			desertRef.delete().then(function () {
				// File deleted successfully
				vm.confirDeleteSuccess = true
				Loading.hide()
			}).catch(function (error) {
				// Uh-oh, an error occurred!
				console.log("Erro ao deletar imagem")
				Loading.hide()
			});

			}).catch((error) => {
				Loading.hide()
				alert("Error removing document: ", error);
			});
    },

    updateStoreHere(payload) {
      Loading.show();
      const updateRef = firestoreDb.collection("stories").doc(payload.id);
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
      };
      this.updateStoreHere({
        id: id,
        data: dataAux
      });
    },
    
  },
  created() {
  },
  mounted() {
		this.getStatusStore(this.store.key)
  },
};
</script>
