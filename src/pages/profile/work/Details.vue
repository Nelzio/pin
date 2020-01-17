<template>
  <q-page class="q-pt-lg">
    <!-- content -->
    <div class="q-mt-lg">
      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="details" style="padding: 0;">
          <q-card bordered class="my-card col-sm-12">
            <q-card-section>
              <div class="text-h6">Descricao</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section class="row">
              <div class="col text-center">
                <q-icon name="arrow_forward_ios" />
              </div>
              <div
                class="col-11 text-body1"
              >{{ vacancyDtl.description }}</div>
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="aplayed" style="padding: 0;">
          <div class="q-pa-sm" v-for="i in 5" :key="i">
            <q-card class="my-card">
              <q-item clickable v-ripple to="/profile/vacancy/details/employee">
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                </q-item-section>
                <q-item-section><div class="text-bold">Antonio Armando {{ i }}</div><div>Tecnico de eletricidade</div> </q-item-section>
                <q-item-section side><div>22</div><div>anos</div></q-item-section>
              </q-item>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <q-page-sticky expand position="top" :class="darkModeConf.bgColor">
      <div class="shadow-2" style="width: 100vw;">
        <q-tabs v-model="tab" align="justify">
          <q-tab name="details" label="Detalhes" />
          <q-tab name="aplayed" label="Candidatos" />
        </q-tabs>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "details"
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
  },
  created () {
    // this.listVacancy()
    this.detailVacancy(this.$route.params.id)
  },
};
</script>
