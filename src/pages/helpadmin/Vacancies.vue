<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/vacancies/Image1.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Administração de vagas
          </div>
          <div :class="getFont.text">
            <p>
              A página de vagas da Administração de vagas apresenta uma lista de
              cartões que mostram informações básicas das vagas publicadas na
              plataforma, o título da vaga, o nome da empresa, o número de
              candidatos e data limite da vaga.
            </p>
            <p>
              Para ter mais detalhes da vaga e avaliar candidatos basta clicar
              no cartão da vaga especifica e será redirecionado para a página de
              detalhes da vaga.
            </p>
            <p>
              Na página de vagas da Administração é possível ver se tem vagas
              por aprovar no botão <b>aprovar vagas</b>. Clicando nesse botão
              será redirecionado a página de avaliação e aprovação de vagas.
            </p>
            <p>
              Na mesma página é possível baixar arquivo no forma CSV ou Excel
              com os dados de todas as vagas.
            </p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/vacancies/Image2.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Avaliação e aprovação de vagas
          </div>
          <div :class="getFont.text">
            <p>
              Na página de avaliação de vagas contem lista de vagas aprovadas e
              por aprovadas. Clicando no cartão de uma das vagas, abrirá na
              lateral direita da tela uma gaveta com detalhes da cagar e a
              partir dessa gaveta é possível aprovar ou reprovar a vagas,
              dependendo do seu estado.
            </p>
            <p>
              Somente as vagas aprovadas é que irão aparecer na página de vagas
              em que o usuário comum, end user, tem acesso.
            </p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/vacancies/Image3.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Detalhes da vaga
          </div>
          <div :class="getFont.text">
            <p>
              Clicando em um cartão de uma determinada vaga na página de vagas
              da administração, será redirecionado a página que contem mais
              detalhes da vaga inclusive todos os candidátos da vaga.
            </p>
            <p>
              Na mesma página é possível pesquisar por um determinado candidato
              e avaliar os candidatos
            </p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/vacancies/Image4.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Avaliação de candidatos
          </div>
          <div :class="getFont.text">
            <p>
              Clicando por cima da foto ou cartão de um determinado candidato,
              na lateral irá abrir uma gaveta com detalhes de um determinado
              candidato.
            </p>
            <p>
              A partir dessa gavéta é possível também fazer avaliação do
              candidato, atribuindo júris e pontuação.
            </p>
            <p>
              O sistema de aprovação de candidatos é automático. Ele conta as
              pontuações de cada candidáto e os que tiverem maior pontuação
              serão os candidátos aprovados e a empresa detentora da vaga irá
              poder ver os aprovados e contactar.
            </p>
            <p>Os candidatos aprovados terão um selo com certo colorido</p>
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
    ...mapGetters("settings", ["getFont", "getStart"]),
  },
}
</script>
