<template>
  <q-page padding>
    <!-- content -->
    <!-- <input id="fileInput" type="file">
    <q-btn color="white" text-color="black" label="Standard" @click="processFile()" />-->
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
              label="Trocar imagem"
              role="button"
              @click="processFile()"
            />
          </q-card-actions>
        </q-card>

        <q-form
          class="q-gutter-md"
          role="form"
          lang="pt-PT"
          aria-label="Formulário de edição de vaga"
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
            ref="titleInput"
            :color="darkModeConf.iconVar"
            rounded
            outlined
            label="Titulo"
            type="text"
            v-model="vacancyData.title"
          />
          <!-- <q-input :color="darkModeConf.iconVar" rounded outlined v-model="vacancy.description" label="Descricao" /> -->
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="vacancyData.category"
            :options="categories"
            role="combobox"
            label="Categoria"
          />
          <q-input
            :color="darkModeConf.iconVar"
            rounded
            outlined
            v-model.number="vacancyData.numVacancies"
            label="Número de vagas"
            type="number"
            lazy-rules
            :rules="[(val) => val || 'Introduza o número de vagas']"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="vacancyData.place"
            :options="places"
            role="combobox"
            label="Província"
          />
          <q-input
            :color="darkModeConf.iconVar"
            label="Data de validade"
            rounded
            outlined
            v-model="vacancyData.validate"
            mask="##/##/####"
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
                    v-model="vacancyData.validate"
                    @input="() => $refs.qDateProxy.hide()"
                    mask="DD/MM/YYYY"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-editor
            :color="darkModeConf.iconVar"
            v-model="vacancyData.description"
            min-height="8rem"
          />
          <div>
            <q-btn
              rounded
              class="full-width"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              label="Enviar"
              role="button"
              @click="updateVacancyThis()"
            />
          </div>
        </q-form>
      </div>
    </div>
    <div>
      <q-dialog
        v-model="confirmInsert"
        role="dialog"
        lang="pt-PT"
        aria-label="Alerta de sucesso"
      >
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6" :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text"
            >Vaga atualizada com sucesso</q-card-section
          >

          <q-card-actions align="right">
            <q-btn
              rounded
              label="OK"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              role="button"
              @click="confirmIsertFunc()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="errorFileDialog"
        role="dialog"
        lang="pt-PT"
        aria-label="Alerta de sucesso"
      >
        <q-card>
          <q-card-section class="text-h5 text-red"
            >Por favor, insira uma imagem válida.</q-card-section
          >

          <q-card-actions align="right">
            <q-btn flat label="OK" color="red" role="button" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { firestoreDB } from "boot/firebase"
export default {
  // name: 'PageName',
  data() {
    return {
      confirmInsert: false,
      errorFileDialog: false,
      vacancyData: {
        description: "",
        img: "",
        user: "",
        title: "",
        public: false,
        category: "",
        validate: "",
        place: "",
        approved: false,
        numVacancies: 0,
      },
      vacancyDataTemp: {
        description: "",
        img: "",
        user: "",
        title: "",
        public: false,
        category: "",
        validate: "",
        place: "",
        approved: false,
        numVacancies: 0,
      },
      fileImage: null,
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
    ...mapState("vacancy", ["vacancyDtl", "vacancyUploaded"]),
    ...mapGetters("vacancy", ["getVacancy"]),
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {
    confirmIsertFunc() {
      this.confirmInsert = false
      this.$router.go(-1)
    },
    ...mapActions("vacancy", [
      "listVacancy",
      "createVacancy",
      "detailVacancy",
      "updateVacancy",
    ]),

    detailVacancyLocal(id) {
      // test
      // Loading.show()
      const ref = firestoreDB.collection("vacancies").doc(id)
      let data = {}
      ref.get().then((doc) => {
        if (doc.exists) {
          data = {
            key: doc.id,
            title: doc.data().title,
            user: doc.data().user,
            approved: doc.data().approved ? doc.data().approved : false,
            numVacancies: doc.data().numVacancies,
            description: doc.data().description,
            img: doc.data().img,
            public: doc.data().public,
            category: doc.data().category,
            validate: doc.data().validate,
            place: doc.data().place,
            timeSend: doc.data().timeSend,
          }
          this.vacancyData = data
          this.imageUrl = data.img
          // Loading.hide()
        } else {
          console.log("No such document!")
          // Loading.hide()
        }
      })
    },

    updateVacancyThis() {
      this.vacancyData.numVacancies = parseInt(this.vacancyData.numVacancies)
      this.updateVacancy({
        id: this.$route.params.idEdit,
        data: this.vacancyData,
        img: this.fileImage,
      })
    },

    processFile() {
      // document.getElementById("fileInput").click()
      this.$refs.fileImg.click()
      console.log(document.getElementById("fileInput"))
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
      this.fileImage = files[0]
    },
  },

  mounted() {
    this.detailVacancyLocal(this.$route.params.idEdit)
  },
  watch: {
    vacancyUploaded() {
      if (this.vacancyUploaded) {
        this.confirmInsert = true
      }
    },
  },
}
</script>
