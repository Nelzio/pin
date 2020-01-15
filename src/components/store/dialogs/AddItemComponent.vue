<template>
  <q-dialog
    v-model="modal"
    :maximized="maximizedToggle"
  >
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Adicionar Item</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>


      <q-card-section class="row q-gutter-y-md">
        <q-uploader
          class="col-12"
          :color="darkModeConf.color"
          :class="darkModeConf.textColor"
          url="http://localhost:4444/upload"
          label="Carregar Imagens"
          multiple
        />
        
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md col-12" >
          <q-input rounded outlined :color="darkModeConf.color" v-model="name" label="Nome *" hint="Name and surname"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input rounded outlined :color="darkModeConf.color" v-model="description" label="Descrição *" hint="Name and surname"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input rounded outlined :color="darkModeConf.color" v-model="price" label="Preço *" hint="Name and surname"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <div>
          <q-btn rounded outlined label="Enviar" type="submit" :color="darkModeConf.color" :class="darkModeConf.textBtn"/>
          <q-btn rounded label="Limpar" type="reset" outline class="q-ml-sm" />
          </div>
        </q-form>

        

      </q-card-section>

      
    </q-card>
  </q-dialog>
  
</template>

<script>
import { mapState } from 'vuex'
export default {
  // name: 'ComponentName',
  data () {
    return {
      maximizedToggle: true,
      modal: false,
      name: '',
      description: '',
      price: '',
    }
  },
  computed: {
    ...mapState('settings', ['appMode', 'darkModeConf']),
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
    let vm = this
      this.$root.$on('addStore', function(val){
      vm.modal = val
    })
  }
}
</script>
