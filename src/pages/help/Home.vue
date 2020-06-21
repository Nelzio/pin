<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/help/home/home.png"
          style="height: 100%; width: 60vw;"
        />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/home/home.png"
              style="height: 100%; width: 18vw;"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Página Inicial</div>
            <div
              :class="getFont.text"
            >A página inicial do aplicativo é na verdade um navegador em indica quais são as principais páginas que o aplicativo tem e que através dessas páginas é possível ter acesso a outras páginas.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/help/home/navitens.png"
          style="heght: 70vh;"
        />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Itens de navegação</div>
            <div :class="getFont.text">
              Para ajudar na acessibilidade do aplicativo, a primeira pagina dispõe de 4 itens que clicando em um deles
              será conduzido para a página descrita no item.
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/home/navitens.png"
              style="heght: 70vh;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img v-if="!$q.screen.gt.sm" class="rounded-borders" src="statics/help/home/navbar.png" />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Barra de navegação</div>
            <div :class="getFont.text">
              A barra de navegação é fixa e presente nas 4 principais paginas do aplicativo, nomeadamente: página inicial,
              página de vagas, página de negócios e pagina de configurações
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/help/home/navbar.png" />
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
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart"])
  }
};
</script>
