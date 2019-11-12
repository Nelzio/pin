<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-y-md" v-if="$q.screen.gt.sm">
      <div class="col-sm-12 col-md-4" :class="padding" v-for="i in 30" :key="i">
        <q-card class="my-card">
          <q-img src="https://cdn.quasar.dev/img/mountains.jpg">
          <div style="padding: 10px; background: transparent;">
            <q-avatar text-color="white">
              <q-img src="https://explicador.co.mz/images/explicador%20logo.png" spinner-color="white" />
              
            </q-avatar>
          </div>
            
          </q-img>

          <q-card-section>
            <div class="text-h5">Vaga de contabilista</div>
          </q-card-section>

          <q-card-section>
            {{ lorem }}
          </q-card-section>

          <q-card-actions>
            <q-btn flat round color="teal" icon="pan_tool" />
            <q-btn flat round color="teal" icon="thumb_up" />
            <q-btn flat round color="teal" icon="share" />
            <q-btn flat round color="teal" icon="more_horiz" to="/work/details" />
            
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div v-else>
      <q-list>
        <q-card class="my-card" v-for="(vacancy, i) in vacancies" :key="i">
          <q-item class="q-mb-sm" clickable>
            <q-item-section avatar top>
              <q-avatar>
                <img :src="vacancy.img">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <div>
                <q-item-label>{{ vacancy.name }}</q-item-label>
                <q-item-label caption lines="4">{{ vacancy.desc }}</q-item-label>
              </div>
              <div class="row justify-between q-pt-md">
                <div>
                  <q-btn rounded color="white" text-color="black" label="Detalhes" />
                </div>
                <div>
                  <q-btn round flat icon="speaker_phone" />
                </div>
              </div>
            </q-item-section>

          </q-item>
        </q-card>
        
      </q-list>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      padding: '',
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
  mounted () {
    this.deviceWidth = window.screen.width
    if(this.$q.screen.gt.sm) this.padding = 'q-pa-sm'
    // console.log(this.deviceWidth)

      this.$root.$emit('isHomePage', false)
  }
}
</script>
