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
          <div class="row login justify-center q-gutter-y-lg">
            <q-icon color="blue-9" 
              size="100px" name="account_circle"
            />
            <!-- <div class="col-12">
              Entrar ou se Inscrever
            </div> -->
            <div class="bg-grey-3 q-pa-lg shadow-10 col-md-4 col-12">
              <q-form
                ref="loginForm"
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  standout="bg-grey"
                  color="blue-9"
                  dense
                  v-model="user"
                  label="Nome do usuario"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  standout="bg-grey"
                  color="blue-9"
                  @keyup.enter="login_account"
                  dense
                  placeholder="password"
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type pass']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <div>
                  <q-btn label="login" type="login" color="primary" class="full-width"/>
                </div>

                <q-item>
                  <!-- <q-item-section>
                    <q-checkbox v-model="teal" label="Remenber me" />
                  </q-item-section> -->
                    <q-item-section>
                      <q-btn rounded outline size="sm" color="primary" label="Criar conta" @click="tab = 'create'" />
                    </q-item-section>
                  <q-item-section>
                    <router-link to="/">
                      Recuperar senha
                    </router-link>
                    
                  </q-item-section>
                </q-item>
              </q-form>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="create">
          <div class="row login justify-center q-gutter-y-lg">
            <q-icon color="blue-9" 
              size="100px" name="person_add"
            />
            <!-- <div class="col-12">
              Entrar ou se Inscrever
            </div> -->
            <div class="bg-grey-3 q-pa-lg shadow-10 col-md-4 col-12">
              <q-form
                ref="loginForm"
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  standout="bg-grey"
                  color="blue-9"
                  dense
                  v-model="user"
                  label="Nome completo"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  standout="bg-grey"
                  color="blue-9"
                  dense
                  type="email"
                  v-model="email"
                  label="Email"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  standout="bg-grey"
                  color="blue-9"
                  @keyup.enter="login_account"
                  dense
                  placeholder="password"
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type pass']"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <div class="q-gutter-y-md">
                  <q-btn rounded label="Registar" type="login" color="primary" class="full-width"/>
                  <q-btn rounded outline label="Entrar" type="login" color="primary" class="full-width" @click="tab = 'login'"/>
                </div>

                <!-- <q-item>
                  <q-item-section>
                    <q-checkbox v-model="teal" label="Remenber me" />
                  </q-item-section>
                  <q-item-section>
                    <router-link to="/">
                      Recuperar senha
                    </router-link>
                  </q-item-section>
                </q-item> -->
              </q-form>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    
  </q-page>
</template>

<script>
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