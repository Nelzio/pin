<template>
  <q-page padding class="flex flex-center">
    <!-- @detected-condition fires when the connectivity status of the device changes -->
    <offline @detected-condition="handleConnectivityChange">
      <!-- Only renders when the device is online -->
      <div slot="online">
        <p>It looks like you're online! Here's all the things you can do...</p>
        ...
      </div>
      <!-- Only renders when the device is offline -->
      <div slot="offline">
        <h6>You appear to be offline, that's okay!</h6>
        ...
      </div>
    </offline>
  </q-page>
</template>

<script>
    import offline from 'v-offline';

    export default {
        name: 'PageIndex',
        components: {
            offline
        },

        methods: {
            handleConnectivityChange(status) {
                console.log(status);
            }
        }
    }
</script>
