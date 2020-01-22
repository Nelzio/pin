<template>
  <q-page class="q-gutter-y-md q-pt-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec 6 -->
        <div>
          <div class="row">
            <div class="col-12 col-md-6 q-pa-sm" v-for="vacancy in vacancies" :key="vacancy.key">
              <q-card class="my-card">
                <q-img
                  v-if="vacancy.img"
                  :src="vacancy.img"
                  spinner-color="white"
                  style="min-height: 200px;"
                />
                <q-card-section>{{ vacancy.title }}</q-card-section>
                <q-card-actions align="right">
                  <q-btn outline rounded label="Detalhes" :to="'/profile/vacancy/details/'+vacancy.key" />
                  <q-btn outline rounded icon="edit" :to="'/profile/vacancy/edit/'+vacancy.key" />
                  <q-btn outline rounded color="red" icon="delete" @click="vacancyDtlFunc(vacancy.key)" />
                  <q-btn outline rounded :icon="vacancy.public ? 'visibility' : 'visibility_off'" @click="makePublic(vacancy.key, vacancy)" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>
      </div>
      <div>
      <q-dialog v-model="confirDelete">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h5">Confirmar</div>
          </q-card-section>

          <q-card-section class="q-pt-none text-h6">Deletar vaga de {{ vacancyDtl.title }}?</q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn rounded outline color="red" label="Deletar" @click="deleteVacancyThis(vacancyDtl.key)" />
            <q-btn rounded outline color="grey" label="Cancelar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="confirDeleteSuccess">
      <q-card>
        <q-card-section class="text-h5 text-green">
          Vaga deletada com sucesso
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firebaseAuth } from "boot/firebase"
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "bio",
      confirDeleteSuccess: false,
      confirDelete: false,
      confirDeleteAux: false,
      isPublic: true,
      vacancyDel: {
        title: '',
        key: null
      }
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancies", "vacancyDtl", "vacancyDeleted", "vacancyUploaded", "vacancyDetail"]),
    ...mapGetters('auth', [
        'user', 'userData'])
    
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "listVacancyMy", "createVacancy", "detailVacancy", "updateVacancy", "deleteVacancy"]),
    ...mapActions("auth", ["checkAuthUser"]),

    deleteVacancyThis (id) {
      const vm = this
      
      this.deleteVacancy(id).then(function () {
        vm.confirDeleteAux = false
        vm.confirDelete = false
      })
      
    },
    vacancyDtlFunc (id) {
      console.log(id)
      this.detailVacancy(id)
      console.log("Nelzio Sitoe delll")
      
    },
    makePublic (id, data) {
      let dataAux = {
        title: data.title,
        user: data.user,
        description: data.description,
        img: data.img,
        public: !data.public
      }
      this.updateVacancy({
        id: id,
        data: dataAux,
        img: ""
      })
    }
  },
  created () {
    
  },
  mounted() {
    this.listVacancyMy(this.user.email)
    this.checkAuthUser()
  },
  watch: {
    vacancyDetail () {
      if(this.vacancyDetail) {
        this.confirDelete = true
      }
    },
    vacancyDeleted () {
      if(this.vacancyDeleted) {
        this.confirDeleteSuccess = true
      }
    }
  }
};
</script>
