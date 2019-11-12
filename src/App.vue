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
            ...mapActions ('settings', ['setIsConected'])
            // setConection(status) {
            //     console.log(status);
            // }
        }
    }
</script>
