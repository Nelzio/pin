<template>
  <q-page padding>
    <!-- content -->
    <!-- <input id="fileInput" type="file">
     <q-btn color="white" text-color="black" label="Standard" @click="proccessFile()" /> -->
    
    <q-form class="q-gutter-md">
      <q-input :color="darkModeConf.color" rounded outlined v-model="vacancy.title" label="Titulo" />
      <q-input :color="darkModeConf.color" rounded outlined v-model="vacancy.description" label="Descricao" />
      <!-- <q-editor :color="darkModeConf.color" v-model="vacancy.description" min-height="8rem" /> -->
      <div>
        <q-btn rounded class="full-width" :color="darkModeConf.color" :class="darkModeConf.textBtn" label="Enviar" @click="updateVacancyThis()" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  // name: 'PageName',
  data () {
    return {
      vacancy: {
        title: "",
        user: "nelzio@gmail.com",
        description: "",
        img: ""
      }
    }
  },
  computed: {
    ...mapState("settings", ["settings", "appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancyDtl"]),
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "createVacancy", "detailVacancy", "updateVacancy"]),
    updateVacancyThis () {
      this.updateVacancy(this.$route.params.idEdit, this.vacancy)
    },

    proccessFile () {
      document.getElementById("fileInput").click()
      console.log(document.getElementById("fileInput"))
    }
  },
  
  created () {
    this.detailVacancy(this.$route.params.idEdit)
    this.vacancy = this.vacancyDtl
  },
}
</script>
