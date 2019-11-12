<template>
  <q-page padding>
    <!-- content -->
    <q-card class="my-card shadow-3 col-12 text-center" style="margin-top: 5rem;">
      <q-img round
        src="https://www.correio24horas.com.br/fileadmin/_processed_/8/1/csm_samai_cunha_quanta_8cdb15efa4.jpg"
        class="shadow-3" spinner-color="white" style="height: 140px; max-width: 150px; transform: translateY(-50%);" />
      <div class="text-right">
        <q-btn class="absolute" round flat color="white" text-color="teal" icon="edit" style="right: 0; top: 0;" />
      </div>
      <q-card-section class="text-h4" style="margin-top: -5rem;">
      Ana Maria Sitoe
      </q-card-section>
      <q-card-section class="text-h6">
        841224724
      </q-card-section>
      <q-card-section class="text-h6">
        anasitoe@gmail.com
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
    mounted () {
        this.$root.$emit('isHomePage', 'Perfil')
    }
}
</script>
