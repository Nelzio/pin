<template>
  <q-page padding class="flex flex-center">
      <h5 v-if="isConected">App Mode: <b class="text-green-8">Internet</b></h5>
      <h5 v-else>App Mode: <b class="text-red-8">Offline</b></h5>
  </q-page>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: 'PageIndex',
        computed: {
            ...mapState('settings', [
                'isConected'
            ])
        },
        mounted () {
            this.$root.$emit('isHomePage', true) //Coloca o menú do controlo de página inicial activa
        }
    }
</script>
