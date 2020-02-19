<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="q-gutter-y-md col-12 col-md-8">
        <q-card class="my-card">
          <q-img :src="imageUrl" alt />
          <q-card-actions>
            <q-btn
              rounded
              :color="darkModeConf.color"
              :class="darkModeConf.textBtn"
              class="full-width"
              icon="image"
              label="Inserir imagem"
              @click="proccessFile()"
            />
          </q-card-actions>
        </q-card>

        <q-form class="q-gutter-md" ref="storeForm">
          <input
            id="fileInput"
            type="file"
            hidden
            ref="fileImg"
            accept="image/*"
            @change="onChangeImg"
          />

          <q-input
            :color="darkModeConf.color"
            rounded
            outlined
            v-model="store.title"
            label="Titulo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza O título']"
          />
          <!-- <q-input :color="darkModeConf.color" rounded outlined v-model="store.description" label="Descricao" /> -->
          <q-select
            rounded
            outlined
            :color="darkModeConf.color"
            v-model="store.category"
            :options="categories"
            label="Categoria"
            :rules="[ val => val && val.length > 0 || 'Selecione a categoria']"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.color"
            v-model="store.subCategory"
            :options="subCategories"
            label="Sub Categoria"
            :rules="[ val => val && val.length > 0 || 'Selecione a sub categoria']"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.color"
            v-model="store.place"
            :options="places"
            label="Província"
            :rules="[ val => val && val.length > 0 || 'Selecione a provincia']"
          />
          <q-input rounded outlined v-model="store.price" :color="darkModeConf.color" label="Preço">
            <template v-slot:append>
              <q-checkbox :color="darkModeConf.color" v-model="store.priceVariable" />
              <div class="text-body1">Negociavel</div>
            </template>
          </q-input>
          <q-editor
            :color="darkModeConf.color"
            v-model="store.description"
            min-height="8rem"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza uma descrição']"
          />
          <div>
            <q-btn
              rounded
              class="full-width"
              :color="darkModeConf.color"
              :class="darkModeConf.textBtn"
              label="Enviar"
              @click="addStore()"
            />
          </div>
        </q-form>
      </div>
    </div>

    <div>
      <q-dialog v-model="confirmInsert">
        <q-card>
          <q-card-section class="text-h5 text-green">Inserido com sucesso</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="green" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="errorFileDialog">
        <q-card>
          <q-card-section class="text-h5 text-red">Por favor, insira uma imagem válida.</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="red" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  // name: 'PageName',
  data() {
    return {
      confirmInsert: false,
      errorFileDialog: false,
      store: {
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
    ...mapState("store", ["storeDtl"]),
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("store", ["createStore"]),
    addStore() {
      this.store.user = this.user.email;
      this.$refs.storeForm.validate();
      if (this.$refs.storeForm.hasError) {
        this.formHasError = true;
      } else {
        this.createStore(this.store);
      }
    },
    proccessFile() {
      // document.getElementById("fileInput").click()
      this.$refs.fileImg.click();
    },
    onChangeImg(event) {
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
      this.store.img = files[0];
    },
    mounted() {
      this.$root.$emit("textToSpeechRouter", "Adiciona produto ou serviço");
    }
  },
  watch: {
    storeDtl() {
      if (!this.storeDtl.title) {
        this.store = {
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
        };
        this.imageUrl = "";
        this.$refs.storeForm.resetValidation();
        this.confirmInsert = true;
      }
    }
  }
};
</script>
