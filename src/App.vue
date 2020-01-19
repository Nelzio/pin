<template>
  <div id="q-app">
    <router-view />
    <!-- @detected-condition fires when the connectivity status of the device changes -->
    <offline @detected-condition="setIsConected"></offline>
  </div>
</template>

<script>
    import offline from 'v-offline';
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'App',
        components: {
            offline
        },
        computed: {
            ...mapState('settings', ['appMode'])
        },
        methods: {
            ...mapActions ('settings', [
                'setSettings', 'setIsConected', 'setAppMode'
            ]),
            ...mapActions ('auth', [
                'checkAuthUser'
            ]),

            // ============= Generic PlayAudio
            playSound (audioPath) {
                if(audioPath) {
                    var audio = new Audio(audioPath);
                    audio.play();
                }
            },

        },
        created () {
            // Verificando se o utilizador tem configurações no LocalStorage
            let settings = this.$q.localStorage.getItem('stgs');
            let appMode = this.$q.localStorage.getItem('appMode');

            if (settings) { this.setSettings (settings) } //guardando as configurações do user no state (vuex)

            if (appMode) { this.setAppMode (appMode) }

            this.$q.addressbarColor.set(this.appMode.modeColor)

            // this.checkAuthUser ()

        },
        mounted () {

            this.$root.$on('playSound', (audioPath) => {
                this.playSound (audioPath)
            })
        }
    }
</script>
