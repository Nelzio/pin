<template>
  <q-page class="q-gutter-y-md">
    <!-- content -->

    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- sec1 -->
        <div class="text-center">
          <q-avatar size="100px">
            <q-img src="https://www.correio24horas.com.br/fileadmin/_processed_/8/1/csm_samai_cunha_quanta_8cdb15efa4.jpg" spinner-color="white" />
          </q-avatar>

          <div class="text-h5">
            Antonio Velas
          </div>
          <!-- <div class="text-caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi unde vitae eaque labore
          </div> -->
        </div>

        <q-separator />
        <!-- sec2 -->
        <div class="row text-center justify-center q-pa-md q-gutter-x-xl">
          <!-- <div>
            <q-icon name="style" size="xl" />
            <div>
              Ocupação
            </div>
          </div>
          <div>
            <q-icon name="place" size="xl" />
            <div>
              Local
            </div>
          </div>
          <div>
            <q-icon name="style" size="xl" />
            <div>
              Ocupação
            </div>
          </div> -->

          <q-card class="col-12">
            <q-tabs
              v-model="tab"
              dense
              class="text-grey col-12"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="bio" label="Bio" icon="assignment_ind" />
              <q-tab name="local" label="Loca" icon="place" />
              <q-tab name="ocupacao" label="Ocupação" icon="work" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="bio">
                Gosto da vida e de ser como todos
              </q-tab-panel>

              <q-tab-panel name="local">
                Bairro da Polana caniço
              </q-tab-panel>

              <q-tab-panel name="ocupacao">
                Cabelereira
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>

        <!-- btn conect -->
        <div class="row justify-center q-pa-md">
          <q-btn rounded class="full-width" color="primary" label="Contratar" />
        </div>

        <q-separator />

        <!-- sec4 -->
        <div>
          <div class="text-h5 q-pl-md col-12">
            Publicacoes recentes
          </div>
          <div class="row">
            <div class="col-6 q-pa-sm" v-for="i in 6" :key="i">
              <q-card class="my-card">
                <q-img src="https://cdn.awsli.com.br/600x1000/60/60876/produto/28035638/9e1cebfb32.jpg" spinner-color="white" />
              <q-card-actions align="right">
                <q-btn size="xs" outline rounded color="white" text-color="black" label="Detalhes" />
                <q-btn size="xs" round outline  icon="volume_up"/>
              </q-card-actions>
              </q-card>
            </div>
          </div>
          <div class="q-pa-sm">
            <q-btn outline class="full-width" color="white" text-color="black" label="Ver mais" />
          </div>
          
        </div>

      </div>
    </div>


    
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      tab: 'bio'
    }
  },
    mounted () {
        this.$root.$emit('isHomePage', 'Perfil')
    }
}
</script>
