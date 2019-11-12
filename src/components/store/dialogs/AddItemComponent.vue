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
          url="http://localhost:4444/upload"
          label="Carregar Imagens"
          multiple
        />
        
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-y-md col-12" >
          <q-input filled v-model="name" label="Nome *" hint="Name and surname"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input filled v-model="description" label="Descrição *" hint="Name and surname"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input filled v-model="price" label="Preço *" hint="Name and surname"
            lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <div>
          <q-btn rounded label="Enviar" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>

        

      </q-card-section>

      
    </q-card>
  </q-dialog>
  
</template>

<script>
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
