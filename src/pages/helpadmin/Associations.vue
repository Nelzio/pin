<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/associations/Image1.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Página de associações
          </div>
          <div :class="getFont.text">
            <p>
              Na página de associações é possível ver uma lista de associações
              registadas, baixar arquivo em CSV ou Excel de todas associações,
              ver detalhes de uma determinada associação e adicionar associação.
            </p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/associations/Image2.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Adição de associação
          </div>
          <div :class="getFont.text">
            <p>
              Para adicionar associação o administrador deve clicar no botão
              adicionar associação e será abertos um diálogo com formulário para
              adição de associação.
            </p>
            <p>
              No formulário o administrador deve fornecer alguns dados sobre a
              associação e depois clicar em enviar para que a associação faça
              parte da lista das associações da plataforma.
            </p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/associations/Image4.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Detalhes de associação
          </div>
          <div :class="getFont.text">
            <p>
              Para ver detalhes de uma determinada associação deve clicar no
              carão da vaga e depois será aberta uma gaveta na lateral direita.
            </p>
            <p>
              A partir dessa gaveta é possível clicar botão para editar
              associação e remover associação.
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
