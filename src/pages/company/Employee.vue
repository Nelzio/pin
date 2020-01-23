<template>
  <q-page padding>
    <!-- content -->
    <div class="q-pt-md q-pb-md">
      Perfil
    </div>
    <div class="row q-gutter-md">
      <div class="col-4">
        <q-card class="q-mb-md" style="border-radius: 20px; max-height: 50vh;">
          <q-img 
            src="https://media.istockphoto.com/photos/happy-woman-picture-id174929219?k=6&m=174929219&s=612x612&w=0&h=0BvbyEiOm3d7EQ-qZ5KUE2eZehirYCxYQJm6QNYtROs="
            style="height: 250px; min-height: 250px;"
          />
          <q-card-section class="details">
            <q-list>
            <q-item>
                <q-item-section>
                  <q-item-label class="text-h6">Julia Seila</q-item-label>
                  <q-item-label caption line="1">Contabilista</q-item-label>
                  
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="place" />
                </q-item-section>
                  <q-item-section>
                    Cidade de Maputo
                  </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>

        <q-btn rounded  color="primary" label="Marcar entrevista" class="full-width">
          <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
            <q-date v-model="proxyDate" style="width: 35vw;">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
        
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 35vh;"
          class="q-mt-lg"
        >
          <div class="q-pa-xs">
            <q-list bordered padding class="rounded-borders">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Profissao</q-item-label>
                  <q-item-label class="text-h6">February 22nd, 2019</q-item-label>
                </q-item-section>

              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar icon="place" color="grey" text-color="white" />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">Profissao</q-item-label>
                  <q-item-label class="text-h6">February 22nd, 2019</q-item-label>
                </q-item-section>

              </q-item>

              <q-expansion-item>
                 <template v-slot:header>
                  <q-item-section avatar>
                    <q-avatar icon="av_timer" color="grey" text-color="white" />
                  </q-item-section>

                  <q-item-section class="text-h6">
                    Experiencia
                  </q-item-section>

                </template>
                <q-item
                  class="bg-white"
                >
                  <q-tooltip
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    Jun 2000 - Ago 2000
                  </q-tooltip>

                  <q-item-section side avatar>
                    <q-avatar color="grey" text-color="white" icon="directions" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-h6">Contabilista</q-item-label>
                    <q-item-label class="text-h6 text-grey">Empresa de contabilidade</q-item-label>
                     
                  </q-item-section>
                </q-item>

              </q-expansion-item>
            </q-list>
          </div>
        </q-scroll-area>
        
      </div>
      <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 80vh;"
          class="col-8 q-mt-lg"
        >
          <pdf src="statics/nelziocv.pdf" style="width:100%"></pdf>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  // name: 'PageName',
  data () {
    return {
      date: '2019/03/01',
      proxyDate: '2019/03/01'
    }
  },
  components: {
    pdf
  },

  computed: {
    contentStyle () {
      return {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: '#555'
      }
    },

    contentActiveStyle () {
      return {
        backgroundColor: '#eee',
        color: 'black'
      }
    },

    thumbStyle () {
      return {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  methods: {
    updateProxy () {
      this.proxyDate = this.date
    },

    save () {
      this.date = this.proxyDate
    }
  }
}
</script>
