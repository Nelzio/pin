<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-y-md">
      <q-card class="my-card col-sm-12" v-for="i in 30" :key="i">
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
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}
</script>
