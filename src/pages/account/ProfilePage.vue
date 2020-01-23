<template>
  <q-page class="q-gutter-y-md">
    <!-- content -->
    <div class="text-center">
      <q-avatar size="100px">
        <q-img src="https://www.correio24horas.com.br/fileadmin/_processed_/8/1/csm_samai_cunha_quanta_8cdb15efa4.jpg" spinner-color="white" />
      </q-avatar>

      <div class="text-h5">
        Antonio Velas
      </div>
      <div class="text-caption">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi unde vitae eaque labore
      </div>
    </div>

    <q-separator />
    <div>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <!-- <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`"> -->
              <q-icon name="style" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            Opções
          </q-item-section>

          <q-item-section side>
            <q-icon name="keyboard_arrow_right" color="grey" />
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <!-- <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`"> -->
              <q-icon name="style" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            Notificações
          </q-item-section>

          <q-item-section side>
            <q-icon name="keyboard_arrow_right" color="grey" />
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <!-- <img :src="`https://cdn.quasar.dev/img/${contact.avatar}`"> -->
              <q-icon name="style" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            Favoritos
          </q-item-section>

          <q-item-section side>
            <q-icon name="keyboard_arrow_right" color="grey" />
          </q-item-section>
        </q-item>
      </q-list>
      
    </div>

    <q-separator />

    <div>
      <div class="text-h5 q-pl-md col-12">
        Publicacoes recentes
      </div>
      <div class="row">
        <div class="col-8 q-pa-sm" v-for="i in 6" :key="i">
          <q-card class="my-card">
            <q-img src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg" spinner-color="white" />
          </q-card>
        </div>
      </div>
    </div>


    
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
