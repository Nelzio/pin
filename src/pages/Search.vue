<template>
  <q-page>
    <!-- content -->
     <q-list style="margin-top: 50px;">

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>Nelzio Sitoe</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>Contabilsta</q-item-section>
      </q-item>

    </q-list>
    
        

    <!-- place QPageSticky at end of page -->
    <q-page-sticky expand position="top">
      <q-toolbar class="text-white">
        <q-input dense outlined rounded v-model="text" input-class="text-right" class="full-wigth col-12"> 
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
      </q-toolbar>
    </q-page-sticky> 
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      text: '',
    }
  },
    mounted () {
        this.$root.$emit('isHomePage', false)
    }
}
</script>
