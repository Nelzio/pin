<template>
  <q-page padding>
    <!-- content -->
    <div class="q-gutter-y-md">
      <div>
        <q-card class="my-card col-12" style="padding: 0;">
          <!-- <q-video style="padding: 0;height: 300px" src="https://www.youtube.com/embed/Raa0vBXA8OQ" /> -->
          <q-img :src="getVacancy.img" spinner-color="white" style="min-height: 200px;" />
          <q-card-section>
            <div class="text-h5">
              {{ getVacancy.title }}
            </div>
          </q-card-section>
          <q-card-section class="row">
            <div class="col text-center">
              <q-icon name="arrow_forward_ios" />
            </div>
            <div
              class="col-11 text-body1"
            >{{ getVacancy.description }}</div>
          </q-card-section>
        </q-card>
      </div>


      <div class="row justify-end q-gutter-x-md">
        <q-btn
          v-if="!vacancyDone"
          rounded
          :color="darkModeConf.color"
          :class="darkModeConf.textBtn"
          label="Candidatar-se"
          icon="done_all"
          @click="apply = true"
        />
        <q-btn v-else rounded color="red" label="Cancelar" icon="close" @click="apply = true" />
        <!-- <q-btn round outline color="teal" icon="share" /> -->
      </div>
    </div>

    <div>
      <q-dialog v-model="apply">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h5">Confirmar</div>
          </q-card-section>

          <q-card-section v-if="!vacancyDone" class="q-pt-none text-h6">Registar-se a vaga?</q-card-section>
          <q-card-section v-else class="q-pt-none text-h6">Retirar candidatura?</q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn rounded outline color="green" label="Candidatar" @click="submit" />
            <q-btn rounded outline color="grey" label="Cancelar" v-close-popup />
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
      tab: "details",
      socialNet: false,
      apply: false,
      vacancyDone: false
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancies", "vacancyDtl"]),
    ...mapGetters('vacancy', [
        'getVacancies', 'getVacancy'
    ]),
  },
  methods: {
    ...mapActions("vacancy", ["listVacancy", "createVacancy", "detailVacancy", "updateVacancy", "deleteVacancy"]),
    submit() {
      this.vacancyDone = !this.vacancyDone;
      if (!this.vacancyDone) {
        alert("A sua candidatura foi submetida com sucesso!!");
      } else {
        alert("A sua candidatura foi cancelada com sucesso!!");
      }
    }
  },
  created () {
    // this.listVacancy()
    this.detailVacancy(this.$route.params.id)
  },
};
</script>
