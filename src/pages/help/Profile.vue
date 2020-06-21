<template>
  <q-page padding>
    <div class="q-gutter-y-lg q-pa-lg">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/profile/profile.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Perfil</div>
            <div
              :class="getFont.text"
            >No perfil é possível encontrar informações sobre o usuário como dados pessoas e algumas actividades do usuário dentro da aplicação. Também é possível fazer a edição de perfil, adicionar vídeo e Curriculum vitae.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Adição, troca e remoção de vídeo</div>
            <div
              :class="getFont.text"
            >O vídeo do perfil pode ser adicionado de duas maneiras: Carregando um ficheiro de vídeo clicando no botão de carregar vídeo ou adicionando um link de onde possa estar o vídeo clicando no botão link.</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/profile/addvideo.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <!-- <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div
              :class="getFont.title"
              class="q-mt-sm q-mb-xs"
            >Adição, troca e remoção de curriculum vitae</div>
            <div
              :class="getFont.text"
            >Para adicionar CV basta clicar na aba Sobre logo depois depois do nome e clicar no botão com três pontinhos no item curriculum e escolher a opção desejada(Visualizar, adição e remoção.</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/profile/edit.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card> -->
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Candidaturas e Actividades</div>
            <div
              :class="getFont.text"
            >O aplicativo regista algumas actividades do usuário na pagina do seu perfil para facilitar o acesso delas. As actividades são: candidaturas, adição de vagas, e adição de produtos e serviços.</div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/profile/activity.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  // name: 'PageName',
  data() {
    return {};
  },
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart"])
  }
};
</script>
