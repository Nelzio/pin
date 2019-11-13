<template>
  <q-page padding>
    <!-- content -->
    <div class="row">
      <div class="col-3 q-pa-sm" v-for="(vacancy, i) in vacancies" :key="i">
        <q-card class="my-card">
          <q-list>
            <q-item clickable v-ripple to="/company/vacancy">
              <q-item-section avatar>
                <q-avatar>
                  <q-img src="https://blog.lexos.com.br/wp-content/uploads/2018/01/contabilidade-gerencial-e1516816542768.jpg" spinner-color="white" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                Contabilista Senior
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <q-dialog
      v-model="addVacancy"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <div class="text-h6">Adicionar Vaga</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form class="q-gutter-md" >
            <q-input rounded outlined v-model="text" label="Nome" />
            <!-- <q-input rounded outlined v-model="text" label="Square outlined" />
            <q-input rounded outlined v-model="text" label="Square outlined" />
            <q-input rounded outlined v-model="text" label="Square outlined" />
            <q-input rounded outlined v-model="text" label="Square outlined" /> -->
            <q-editor v-model="description" min-height="8rem" />
          </q-form>
          
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn rounded color="primary" label="Enviar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addVacancy = true" />
    </q-page-sticky>
  </q-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import VacancyComponent from "../../components/work/VacancyComponent";
    export default {
        components: { VacancyComponent },
        // name: 'PageName',
    data () {
      return {
        description: '',
        text: '',
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        padding: '',
        addVacancy: false,
        deviceWidth: 375,
        vacancies: [
          {
              name: 'Vaga de contabilista',
              company: 'Explicador Inc',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
              img: 'https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg'
          },
          {name: 'Vaga de contabilista', company: 'Explicador Inc', desc: 'Vaga para um contabilista junior', img: 'https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg'},
          {name: 'Vaga de contabilista', company: 'Explicador Inc', desc: 'Vaga para um contabilista junior', img: 'https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg'},
          {name: 'Vaga de contabilista', company: 'Explicador Inc', desc: 'Vaga para um contabilista junior', img: 'https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg'},
          {name: 'Vaga de contabilista', company: 'Explicador Inc', desc: 'Vaga para um contabilista junior', img: 'https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg'},
          {name: 'Vaga de contabilista', company: 'Explicador Inc', desc: 'Vaga para um contabilista junior', img: 'https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg'},
          {name: 'Vaga de contabilista', company: 'Explicador Inc', desc: 'Vaga para um contabilista junior', img: 'https://www.contabeis.com.br/assets/img/news/a_5368_574ebc151c3252c2eb93d6504efdc5ab.jpg'},
        ]
      }
    },
    computed: {
        ...mapState('settings', [
          'settings'
        ]),
            // ...mapGetters('settings', [
            //     'getSettings'
            // ]),
    },
    methods: {
        ...mapActions ('settings', ['setSettings', 'playSound', 'vibrate'])
    },
    mounted () {
      this.deviceWidth = window.screen.width
      if(this.$q.screen.gt.sm) this.padding = 'q-pa-sm'
      // console.log(this.deviceWidth)

        this.$root.$emit('isHomePage', 'Vagas')

        // Vibração
        if (this.settings.isVibrationActive) {
            this.vibrate ()
        }
        // Play do áudio
        if (this.settings.isNarratorActive) {
            this.playSound('/statics/audios/vagas.aac')
        }
    }
  }
</script>
