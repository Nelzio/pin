<template>
  <q-page>
    <!-- content -->
    <div>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        transition-prev="scale"
        transition-next="scale"
        class="text-center"
      >
        <q-tab-panel name="login">
          <login-forms-component />
        </q-tab-panel>

        <q-tab-panel name="create">

        </q-tab-panel>
      </q-tab-panels>
    </div>
    
  </q-page>
</template>

<script>
import LoginFormsComponent from "../../components/auth/LoginFormsComponent";
export default {
  // name: 'PageName',
  data (){
    return {
      teal: false,
      user: '',
      email: '',
      password: '',
      isPwd: true,
      dialogLogin: false,
      tab: 'login'
    }
  },
  components: {
      LoginFormsComponent
    
  },
  methods: {
    onSubmit () {
      console.log("submited")
    },
    onReset () {
      this.password = ''
      this.user = ''
    }
  },
  mounted () {
    
  }
}
</script>

<style lang="sass">
  
</style>