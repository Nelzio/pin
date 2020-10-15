<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center">
      <div class="q-gutter-y-md col-12 col-md-8">
        <q-card class="my-card">
          <q-img :src="imageUrl" alt="Imagem da vaga" />
          <q-card-actions>
            <q-btn
              rounded
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
              icon="insert_photo"
              label="Inserir imagem"
              role="button"
              @click="processFile()"
            />
          </q-card-actions>
        </q-card>

        <q-form
          class="q-gutter-md"
          ref="vacancyForm"
          role="form"
          lang="pt-PT"
          aria-label="Formulário de adição de vaga"
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
            v-model="vacancy.title"
            label="Titulo"
            type="text"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Introduza o título']"
          />

          <!-- <q-input :color="darkModeConf.iconVar" rounded outlined v-model="vacancy.description" label="Descricao" /> -->
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="vacancy.category"
            :options="categories"
            label="Categoria"
            role="combobox"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Introduza a categoria',
            ]"
          />
          <q-input
            :color="darkModeConf.iconVar"
            rounded
            outlined
            v-model.number="vacancy.numVacancies"
            type="number"
            label="Número de vagas"
            lazy-rules
            :rules="[(val) => val || 'Introduza o número de vagas']"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="vacancy.place"
            :options="places"
            label="Província"
            role="combobox"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Introduza a província',
            ]"
          />
          <q-input
            :color="darkModeConf.iconVar"
            rounded
            outlined
            label="Data de validade"
            v-model="vacancy.validate"
            mask="##/##/####"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Introduza a data de validade',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :color="darkModeConf.iconVar"
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    :color="darkModeConf.iconVar"
                    v-model="vacancy.validate"
                    @input="() => $refs.qDateProxy.hide()"
                    mask="DD/MM/YYYY"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-editor
            :color="darkModeConf.iconVar"
            v-model="vacancy.description"
            role="textbox"
            min-height="8rem"
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
              role="button"
              @click="addVacancy()"
            />
          </div>
        </q-form>
      </div>
    </div>

    <div>
      <!-- <q-dialog v-model="confirmInsert">
        <q-card>
          <q-card-section class="text-h5 text-green">Vaga inserida com sucesso</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="green" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog> -->

      <!-- <q-dialog v-model="errorFileDialog">
        <q-card>
          <q-card-section class="text-h5 text-red">Por favor, insira uma imagem válida.</q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="red" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog> -->

      <q-dialog
        v-model="confirmInsert"
        role="dialog"
        lang="pt-PT"
        aria-label="Alerta de sucesso"
      >
        <q-card style="width: 80vw">
          <q-card-section>
            <div :class="getFont.title">Adição de vaga</div>
          </q-card-section>
          <q-card-section :class="getFont.text"
            >Vaga inserida com sucesso.</q-card-section
          >
          <q-card-actions align="right">
            <q-btn
              rounded
              label="OK"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="errorFileDialog"
        role="dialog"
        lang="pt-PT"
        aria-label="Alerta de erro"
      >
        <q-card>
          <q-card-section>
            <div :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text"
            >Por favor, insira uma imagem válida.</q-card-section
          >
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
      vacancy: {
        title: "",
        user: "",
        description: "",
        img: "",
        public: true,
        category: "",
        validate: "",
        place: "",
        approved: false,
        numVacancies: null,
      },
      imageUrl: "",
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
      categories: [
        "Administração e Secretariado",
        "Agricultura e Pescas",
        "Aquisições e Procurement",
        "Assistente",
        "Auditoria e Consultoria",
        "Comercial e Vendas",
        "Comunicação Social",
        "Design e Multimédia",
        "Engenheiro Electrotécnico",
        "Engenheiro Mecânico",
        "Estágios e Bolsas",
        "Finanças e Contabilidade",
        "Gastronomia",
        "Gestão de Dados",
        "Gestão de Projectos",
        "Gestão e Programação",
        "Gestão Financeira",
        "Informática e Programação",
        "Monitoria e Avaliação",
        "Oficial Técnico",
        "Operador",
        "Recursos Humanos",
        "Relações Públicas",
        "Saúde",
        "Supervisão e Coordenação",
        "Técnico",
        "Transportes e Logística",
        "Vendas",
      ],
    }
  },
  computed: {
    ...mapState("settings", ["settings", "appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancyDtl"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user"]),
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "createVacancy"]),
    addVacancy() {
      // console.log(this.vacancy)
      var today = new Date()
      this.vacancy.user = this.user.email
      this.vacancy.numVacancies = parseInt(this.vacancy.numVacancies)
      this.vacancy.timeSend = String(today)
      this.$refs.vacancyForm.validate()
      if (this.$refs.vacancyForm.hasError) {
        this.formHasError = true
      } else {
        this.createVacancy(this.vacancy)
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
      this.vacancy.img = files[0]
    },
  },
  watch: {
    vacancyDtl() {
      if (!this.vacancyDtl.title) {
        this.imageUrl = ""
        this.vacancy = {
          title: "",
          user: "",
          description: "",
          img: "",
          public: true,
          category: "",
          validate: "",
          place: "",
          timeSend: "",
          approved: false,
          numVacancies: "",
        }
        this.$refs.vacancyForm.resetValidation()
        this.confirmInsert = true
      }
    },
  },
}
</script>
