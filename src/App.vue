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
        methods: {
            ...mapActions ('settings', [
                'setSettings', 'setIsConected'
            ]),
            // ...mapActions ('auth', [
            //     'handleAuthStateChange'
            // ])
        },
        mounted () {
            // Verificando se o utilizador tem configurações no LocalStorage
            let settings = this.$q.localStorage.getItem('stgs');
            if (settings) {
                this.setSettings (settings) //guardando as configurações do user no state (vuex)
            }
        }
    }
</script>
