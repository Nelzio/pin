<template>
  <q-page
      class="flex flex-center"
      :class="[appMode.textColor, appMode.bgColor]"
      v-touch-swipe.mouse.left.right="handleSwipe"
  >
      <!--<h5 v-if="isConected">App Mode: <b class="text-green-8">Internet</b></h5>-->
      <!--<h5 v-else>App Mode: <b class="text-red-8">Offline</b></h5>-->
      <home-content :appMode="appMode" v-if="!$q.screen.gt.sm"/>
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
                'isConected', 'settings', 'appMode'
            ]),
        },
        methods: {
            ...mapActions('settings', ['playSound', 'vibrate']),
            handleSwipe (val) {
                if (val.direction === 'left') {
                    this.$router.push('/work')
                }
            }
        },
        mounted () {
            this.$root.$emit('isHomePage', 'Início') //Coloca o menú do controlo de página inicial activa

            if (this.settings.isVibrationActive) {
                this.vibrate ()
            }

            if (this.settings.isNarratorActive) {
                this.playSound('/statics/audios/home.aac')
            }
        }
    }
</script>
