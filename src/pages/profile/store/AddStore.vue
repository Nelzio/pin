<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="q-gutter-y-md col-12 col-md-8">
        <q-card class="my-card">
          <q-img
            :src="imageUrl"
            alt="Imagem do produto ou serviço"
            role="img"
          />
          <q-card-actions>
            <q-btn
              rounded
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
              icon="image"
              label="Inserir imagem"
              @click="processFile()"
              role="button"
            />
          </q-card-actions>
        </q-card>

        <q-form
          class="q-gutter-md"
          ref="storeForm"
          role="form"
          lang="pt-PT"
          aria-label="Formulário de detalhes do item a submeter"
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
            v-model="store.title"
            label="Titulo"
            type="text"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Introduza O título']"
          />
          <!-- <q-input :color="darkModeConf.iconVar" rounded outlined v-model="store.description" label="Descricao" /> -->
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="store.category"
            :options="categories"
            label="Categoria"
            role="option"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Selecione a categoria',
            ]"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="store.subCategory"
            :options="subCategories"
            label="Subcategoria"
            role="option"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Selecione a subcategoria',
            ]"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="store.place"
            :options="places"
            label="Província"
            role="option"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Selecione a provincia',
            ]"
          />
          <q-input
            rounded
            outlined
            v-model="store.price"
            :color="darkModeConf.iconVar"
            label="Preço"
            type="number"
          >
            <template v-slot:append>
              <q-checkbox
                :color="darkModeConf.iconVar"
                :class="darkModeConf.textBtn"
                v-model="store.priceVariable"
              />
              <div class="text-body1">Negociável</div>
            </template>
          </q-input>
          <q-editor
            :color="darkModeConf.iconVar"
            v-model="store.description"
            min-height="8rem"
            role="textbox"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Introduza uma descrição',
            ]"
          />
          <div>
            <q-btn
              rounded
              class="full-width"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              label="Enviar"
              @click="addStore()"
              role="button"
            />
          </div>
        </q-form>
      </div>
    </div>

    <div>
      <q-dialog v-model="confirmInsert" role="dialog">
        <q-card
          style="width: 80vw"
          lang="pt-PT"
          aria-label="Confirmar adição de produto."
        >
          <q-card-section>
            <div :class="getFont.title">Adição de negocio</div>
          </q-card-section>
          <q-card-section :class="getFont.text"
            >Inserido com sucesso.</q-card-section
          >
          <q-card-actions align="right">
            <q-btn
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              rounded
              label="OK"
              role="button"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="errorFileDialog" role="dialog">
        <q-card lang="pt-PT" aria-label="Atenção com a imagem">
          <q-card-section>
            <div :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text"
            >Por favor, insira uma imagem válida.</q-card-section
          >
          <q-card-actions align="right">
            <q-btn
              :color="darkModeConf.iconVar"
              rounded
              outline
              label="OK"
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
        public: true,
        category: "",
        place: "",
        subCategory: "",
        price: "",
        timeSend: "",
        priceVariable: false,
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
        "Zambézia",
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
        "Técnicos",
      ],
    }
  },
  computed: {
    ...mapState("settings", [
      "settings",
      "appMode",
      "darkModeConf",
      "vibrateState",
    ]),
    ...mapState("store", ["storeDtl"]),
    ...mapGetters("settings", ["getFont", "getVibrate"]),
    ...mapGetters("auth", ["user"]),
  },
  methods: {
    ...mapActions("store", ["createStore"]),
    addStore() {
      var today = new Date()
      this.store.timeSend = String(today)
      this.store.user = this.user.email
      this.$refs.storeForm.validate()
      if (this.$refs.storeForm.hasError) {
        this.formHasError = true
      } else {
        this.createStore(this.store)
      }
    },
    processFile() {
      // document.getElementById("fileInput").click()
      this.$refs.fileImg.click()
    },
    onChangeImg(event) {
      const files = event.target.files
      let filename = files[0].name
      let file = files[0]
      if (!(file && file["type"].split("/")[0] === "image")) {
        return (this.errorFileDialog = true)
      }
      const fileReader = new FileReader()
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.store.img = files[0]
    },
    mounted() {
      if (this.vibrateState === 1 && this.getVibrate)
        this.$root.$emit(
          "textToSpeechRouter",
          "Página adição de produto ou serviço"
        )
    },
  },
  watch: {
    storeDtl() {
      if (!this.storeDtl.title) {
        this.imageUrl = ""
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
          priceVariable: false,
        }
        this.$refs.storeForm.resetValidation()
        this.confirmInsert = true
      }
    },
  },
}
</script>
