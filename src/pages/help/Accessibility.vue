<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/accessbility/Imagem.png"
            style="height: 100%; width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/accessbility/Imagem.png"
              style="height: 100%; width: 20vw"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Acessibilidade
            </div>
            <div :class="getFont.text">
              <p>
                O aplicativo é acessível para todo tipo de pessoas e com todo
                tipo de deficiência.
              </p>
              <p>
                Apelamos para que os usuário do aplicativo introduzam conteúdo
                claro, como imagens auto explicativas para facilitar a
                compreensão de todos o usuários. Para ativar a principal função
                de acessibilidade do aplicativo, o usuário precisa ativar o modo
                de narração e vibração na página do configurações.
              </p>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/accessbility/talckback.png"
            style="height: 100%; width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Interação com dispositivos acessíveis
            </div>
            <div :class="getFont.text">
              O aplicativo interage com as configurações de acessibilidade de
              dispositivos como telefones e computadores, como leitores de tela
              e talkback.
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/accessbility/talckback.png"
              style="height: 100%; width: 20vw"
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
            style="height: 100%; width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Narração e Vibração
            </div>
            <div :class="getFont.text">
              Quando o modo de acessibilidade estiver ativo, o telefone vibra
              e/ou emite som no início e no fim de uma determinada ação do
              usuário, como candidaturas, navegação entre páginas e etc.
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/accessbility/vibratemode.png"
              style="height: 100%; width: 20vw"
            />
          </q-card-section>
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
