<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/companies/Image1.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Página de empresas
          </div>
          <div :class="getFont.text">
            <p>
              Na página de empresas na administração contem três painéis, um com
              lista de empresas aprovadas, outro com lista de empresas por
              aprovar e outro com lista de empresas reprovadas.
            </p>
            <p>
              É possível baixar arquivos no formato CSV e Excel para as vagas
              aprovadas, por avaliar, reprovadas e todas empresas.
            </p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/companies/Image2.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Detalhes e empresa
          </div>
          <div :class="getFont.text">
            <p>
              Clicando no item de uma determinada empresa, abrirá na lateral
              direita uma gaveta com detalhes ou perfil dessa empresa.
            </p>
            <p>
              Nessa gaveta é possível aprovar ou reprovar uma determinada
              empresa de acordo com os requisitos desejado pela administração da
              plataforma.
            </p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
export default {
  // name: 'PageName',
  data() {
    return {}
  },
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart", "getVibrate"]),
  },
}
</script>
