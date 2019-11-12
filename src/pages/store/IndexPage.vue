<template>
  <q-page padding>
    <!-- content -->
    <div class="row">
      <div class="col-6 q-pa-sm" v-for="i in 16" :key="i">
        <q-card class="my-card">
          <q-img src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg" spinner-color="white" />
          <q-card-section>
            <div class="text-body1">Armando Jose</div>
            <div class="text-subtitle2">Sandalias de cabdal</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn size="xs" outline rounded color="white" text-color="black" label="Detalhes" to="/store/details" />
            <q-btn size="xs" round outline  icon="volume_up"/>
          </q-card-actions> 
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
