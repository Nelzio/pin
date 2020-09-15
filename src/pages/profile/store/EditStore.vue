<template>
  <q-page padding>
    <!-- content -->
    <!-- <input id="fileInput" type="file">
    <q-btn color="white" text-color="black" label="Standard" @click="processFile()" />-->
    <div class="row justify-center">
      <div class="q-gutter-y-md col-12 col-md-8">
        <q-card class="my-card">
          <q-img
            :src="imageUrl"
            alt
          />
          <q-card-actions>
            <q-btn
              rounded
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
              label="Trocar imagem"
              @click="processFile()"
            />
          </q-card-actions>
        </q-card>

        <q-form
          class="q-gutter-md"
          ref="storeForm"
        >
          <input
            id="fileInput"
            type="file"
            hidden
            ref="fileImg"
            accept="image/*"
            @change="onChangeImg"
          />

          <q-input
            :color="darkModeConf.iconVar"
            rounded
            outlined
            v-model="storeData.title"
            label="Titulo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza O título']"
          />
          <!-- <q-input :color="darkModeConf.iconVar" rounded outlined v-model="store.description" label="Descricao" /> -->
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="storeData.category"
            :options="categories"
            label="Categoria"
            :rules="[ val => val && val.length > 0 || 'Selecione a categoria']"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="storeData.subCategory"
            :options="subCategories"
            label="Subcategoria"
            :rules="[ val => val && val.length > 0 || 'Selecione a sub subcategoria']"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="storeData.place"
            :options="places"
            label="Província"
            :rules="[ val => val && val.length > 0 || 'Selecione a província']"
          />
          <q-input
            rounded
            outlined
            v-model="storeData.price"
            :color="darkModeConf.iconVar"
            label="Preço"
          >
            <template v-slot:append>
              <q-checkbox
                :color="darkModeConf.iconVar"
                v-model="storeData.priceVariable"
              />
              <div class="text-body1">Negociável</div>
            </template>
          </q-input>
          <q-editor
            :color="darkModeConf.iconVar"
            v-model="storeData.description"
            min-height="8rem"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza uma descrição']"
          />
          <div>
            <q-btn
              rounded
              class="full-width"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              label="Enviar"
              @click="updateStoreThis()"
            />
          </div>
        </q-form>
      </div>
    </div>
    <div>
      <q-dialog v-model="confirmInsert">
        <q-card>
          <q-card-section class="text-h5 text-green">Atualizada com sucesso</q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="primary"
              @click="confirmIsertFunc()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="errorFileDialog">
        <q-card>
          <q-card-section class="text-h5 text-red">Por favor, insira uma imagem válida.</q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="red"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDB } from "boot/firebase";
export default {
  // name: 'PageName',
  data () {
    return {
      confirmInsert: false,
      errorFileDialog: false,
      storeData: {
        title: "",
        user: "",
        description: "",
        img: "",
        public: false,
        category: "",
        place: "",
        subCategory: "",
        price: "",
        priceVariable: false
      },
      storeDataTemp: {
        title: "",
        user: "",
        description: "",
        img: "",
        public: false,
        category: "",
        place: "",
        subCategory: "",
        price: "",
        priceVariable: false
      },
      fileImage: null,
      imageUrl: "",
      categories: ["Produto", "Serviço"],
      places: [
        "Cabo Delgado",
        "Gaza",
        "Inhambane",
        "Manica",
        "Maputo",
        "Matola",
        "Nampula",
        "Niassa",
        "Sofala",
        "Tete",
        "Zambézia"
      ],
      subCategories: [
        "Construção",
        "Culinária",
        "Games e Lazer",
        "Animais",
        "Moda",
        "Casa",
        "Tecnologia",
        "Veículos",
        "Imobiliário",
        "Domésticos, Reparações e Mudanças",
        "Saúde e Beleza",
        "Eventos",
        "Técnicos"
      ]
    };
  },
  computed: {
    ...mapState("settings", ["settings", "appMode", "darkModeConf"]),
    ...mapState("store", ["storeDtl", "storeUploaded"]),
    ...mapGetters("store", ["getSore"])
  },
  methods: {
    confirmIsertFunc () {
      this.confirmInsert = false;
      this.$router.go(-1);
    },
    ...mapActions("store", ["detailStore", "updateStore"]),

    detailStoreLocal (id) {
      // test
      // Loading.show()
      const ref = firestoreDB.collection("stories").doc(id);
      let data = {};
      ref.get().then(doc => {
        if (doc.exists) {
          data = {
            key: doc.id,
            title: doc.data().title,
            user: doc.data().user,
            description: doc.data().description,
            img: doc.data().img,
            public: doc.data().public,
            category: doc.data().category,
            place: doc.data().place,
            subCategory: doc.data().subCategory,
            price: doc.data().price,
            priceVariable: doc.data().priceVariable,
            timeSend: doc.data().timeSend
          };
          this.storeData = data;
          this.imageUrl = data.img;
          // Loading.hide()
        } else {
          console.log("No such document!");
          // Loading.hide()
        }
      });
    },

    updateStoreThis () {
      this.updateStore({
        id: this.$route.params.idEditStore,
        data: this.storeData,
        img: this.fileImage
      });
    },

    processFile () {
      // document.getElementById("fileInput").click()
      this.$refs.fileImg.click();
      console.log(document.getElementById("fileInput"));
    },

    onChangeImg (event) {
      const files = event.target.files;
      let filename = files[0].name;
      let file = files[0];
      if (!(file && file["type"].split("/")[0] === "image")) {
        return (this.errorFileDialog = true);
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.fileImage = files[0];
    }
  },

  mounted () {
    this.detailStoreLocal(this.$route.params.idEditStore);

    this.$root.$emit(
      "textToSpeechRouter",
      "Editar " + this.storeData.category + " " + this.storeData.title
    );
  },
  watch: {
    storeUploaded () {
      if (this.storeUploaded) {
        this.confirmInsert = true;
      }
    }
  }
};
</script>
