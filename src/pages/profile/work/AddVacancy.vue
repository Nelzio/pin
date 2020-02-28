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
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              class="full-width"
              label="Inserir imagem"
              @click="proccessFile()"
            />
          </q-card-actions>
        </q-card>

        <q-form class="q-gutter-md" ref="vacancyForm">
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
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Introduza O título']"
          />
          <!-- <q-input :color="darkModeConf.iconVar" rounded outlined v-model="vacancy.description" label="Descricao" /> -->
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="vacancy.category"
            :options="categories"
            label="Categoria"
          />
          <q-select
            rounded
            outlined
            :color="darkModeConf.iconVar"
            v-model="vacancy.place"
            :options="places"
            label="Província"
          />
          <q-input
            :color="darkModeConf.iconVar"
            rounded
            outlined
            v-model="vacancy.validate"
            mask="##/##/####"
            :rules="[ val => val && val.length > 0 || 'Introduza a data de validade']"
          >
            <template v-slot:append>
              <q-icon :color="darkModeConf.iconVar" name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
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
              @click="addVacancy()"
            />
          </div>
        </q-form>
      </div>
    </div>

    <div>
      <q-dialog v-model="confirmInsert">
        <q-card>
          <q-card-section class="text-h5 text-green">Vaga inserida com sucesso</q-card-section>

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
      vacancy: {
        title: "",
        user: "",
        description: "",
        img: "",
        public: false,
        category: "",
        validate: "",
        place: ""
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
        "Zambézia"
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
        "Vendas"
      ]
    };
  },
  computed: {
    ...mapState("settings", ["settings", "appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancyDtl"]),
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "createVacancy"]),
    addVacancy() {
      // console.log(this.vacancy)
      this.vacancy.user = this.user.email;
      this.$refs.vacancyForm.validate();
      if (this.$refs.vacancyForm.hasError) {
        this.formHasError = true;
      } else {
        this.createVacancy(this.vacancy);
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
      this.vacancy.img = files[0];
    }
  },
  watch: {
    vacancyDtl() {
      if (!this.vacancyDtl.title) {
        this.vacancy = {
          title: "",
          user: "",
          description: "",
          img: ""
        };
        this.imageUrl = "";
        this.$refs.vacancyForm.resetValidation();
        this.confirmInsert = true;
      }
    }
  }
};
</script>
