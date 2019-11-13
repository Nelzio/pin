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
          <login-forms-component
              @tab="tab = $event"
              @loginUser="loginUser"
          />
        </q-tab-panel>

        <q-tab-panel name="create">
          <register-form-component
              @tab="tab = $event"
              @loginUser="registerUser"

          />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    
  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
import LoginFormsComponent from "../../components/auth/LoginFormsComponent";
import RegisterFormComponent from "../../components/auth/RegisterFormComponent";
export default {
  // name: 'PageName',
  data (){
    return {
      teal: false,
      dialogLogin: false,
      tab: 'login'
    }
  },
  components: {
      RegisterFormComponent,
      LoginFormsComponent
    
  },
  methods: {
      ...mapActions('auth', ['registerUser', 'loginUser'])

  },
  mounted () {
    
  }
}
</script>

<style lang="sass">
  
</style>