<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/accessbility/Imagem.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/accessbility/Imagem.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Acessibilidade</div>
            <div :class="getFont.text">
              O aplicativo é acessível para todo tipo de pessoas e com todo tipo de deficiência.
              <br />Apelamos para que os usuário do aplicativo introduzam conteúdo claro, como imagens auto explicativas para facilitar a compreensão de todos o usuários.
              Para ativar a principal função de acessibilidade do aplicativo, precisa ativar o modo de narração e vibração na página do configurações.
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/accessbility/navegation.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Navegação entre as páginas</div>
            <div
              :class="getFont.text"
            >É possível navegar entre as página deslizando o dedo pelas laterais. Ao navegar, o telefone vibra quando a página muda e o aplicativo faz a sua descrição e dá indicações de como proceder na página.</div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/accessbility/navegation.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/accessbility/vibratemode.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Narração e Vibração</div>
            <div :class="getFont.text">
              O telefone vibra no início e no fim de uma determinada ação do usuário.
              O telefone emite som no início e/ou no fim de uma determinada ação do usuário.
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/accessbility/vibratemode.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/accessbility/repeattouch.png"
            style="height: 100%; width: 60vw;"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Toques repetidos</div>
            <div
              :class="getFont.text"
            >Para fazer algumas ações, como por exemplo, ligar o microfone para gravar áudio e candidatar-se a uma vaga o usuário precisa dar cliques repetidos até o telefone vibrar</div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/accessbility/repeattouch.png"
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
