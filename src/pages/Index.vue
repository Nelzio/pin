<template>
  <q-page class="flex flex-center">
      <!--<h5 v-if="isConected">App Mode: <b class="text-green-8">Internet</b></h5>-->
      <!--<h5 v-else>App Mode: <b class="text-red-8">Offline</b></h5>-->
      <home-content />
  </q-page>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import HomeContent from "../components/HomeContent";
    export default {
        name: 'PageIndex',
        components: {HomeContent},
        data () {
            return {

            }
        },
        computed: {
            ...mapState('settings', [
                'isConected'
            ]),
        },
        methods: {
            ...mapActions('settings', ['playSound'])
        },
        mounted () {
            this.$root.$emit('isHomePage', true) //Coloca o menú do controlo de página inicial activa
            // window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]);
        },
    }
</script>
