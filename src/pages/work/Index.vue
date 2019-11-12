<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-y-md">
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
    }
  },
  mounted () {
    this.deviceWidth = window.screen.width
    if(this.deviceWidth > 850) this.padding = 'q-pa-sm'
    // console.log(this.deviceWidth)

      this.$root.$emit('isHomePage', false)
  }
}
</script>
