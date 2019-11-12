<template>
  <div id="q-app">
    <router-view />
    <!-- @detected-condition fires when the connectivity status of the device changes -->
    <offline @detected-condition="setIsConected">
      <!-- Only renders when the device is online -->
      <div slot="online">
        <!-- <p>It looks like you're online! Here's all the things you can do...</p>
        ... -->
      </div>
      <!-- Only renders when the device is offline -->
      <div slot="offline">
        <!-- <h6>You appear to be offline, that's okay!</h6>
        ... -->
      </div>
    </offline>
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
