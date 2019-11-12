<template>
  <q-page padding>
    <!-- content -->
    <div class="row justify-center q-gutter-y-md">

      <q-card bordered class="my-card col-sm-12">
        <q-card-section>
          <div class="text-h6">Descricao</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row" v-for="i in 4" :key="i">
          <div class="col text-center">
          <q-icon name="arrow_forward_ios" />
          </div>
          <div class="col-11 text-body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi adipisci itaque deleniti error ipsam blanditiis nostrum maxime, pariatur, corporis architecto consequuntur. Voluptates quis rerum quam ex eos. Corrupti, ipsam!
          </div>
        </q-card-section>
      </q-card>

      <q-card bordered class="my-card col-sm-12">
        <q-card-section>
          <div class="text-h6">Funções</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row" v-for="i in 4" :key="i">
          <div class="col text-center">
          <q-icon name="arrow_forward_ios" />
          </div>
          <div class="col-11 text-body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi adipisci itaque deleniti error ipsam blanditiis nostrum maxime, pariatur, corporis architecto consequuntur. Voluptates quis rerum quam ex eos. Corrupti, ipsam!
          </div>
        </q-card-section>
      </q-card>
      
      <q-card bordered class="my-card col-sm-12">
        <q-card-section>
          <div class="text-h6">Requisitos</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row" v-for="i in 4" :key="i">
          <div class="col text-center">
          <q-icon name="arrow_forward_ios" />
          </div>
          <div class="col-11 text-body1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi adipisci itaque deleniti error ipsam blanditiis nostrum maxime, pariatur, corporis architecto consequuntur. Voluptates quis rerum quam ex eos. Corrupti, ipsam!
          </div>
        </q-card-section>
      </q-card>
      
    </div>

  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
    mounted () {
        this.$root.$emit('isHomePage', false)
    }
}
</script>
