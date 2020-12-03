<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/settings/Imagem.png"
            style="height: 100%; width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/settings/Imagem.png"
              style="height: 100%; width: 20vw"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Definições</div>
            <div :class="getFont.text">
              Na página de definições podemos encontrar definições de luz,
              acessibilidade, texto e de conta.
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/help/settings/dark.png"
        />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Definições de luz
            </div>
            <div :class="getFont.text">
              Para trocar o modo de claro para escuro e vice versa para deixar a
              visão do usuário confortável deve trocar o estado do toggle.
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/settings/dark.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/help/settings/vibrate.png"
        />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Definições de acessibilidade
            </div>
            <div :class="getFont.text">
              <p>
                A principal configuração de acessibilidade do aplicativo é o
                modo acessibilidade que conduz o usuário entre as páginas do
                aplicativo emitindo som e vibrando.
              </p>
              <p>
                Para desativar e ativar o modo acessibilidade do aplicativo deve
                mudar o status do modo acessibilidade na página de definições.
              </p>
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/settings/vibrate.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/help/settings/text.png"
        />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Definições de texto
            </div>
            <div :class="getFont.text">
              <p>
                O tamanho do texto pode ser alterado para deixar o usuário mais
                confortável na leitura.
              </p>
              <p>
                Para Trocar a tamanho do texto das páginas do aplicativo
                toque/clique em tamanho de texto e no popup que abrir, selecione
                o tamanho de texto desejado.
              </p>
            </div>
          </q-card-section>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/settings/text.png"
            />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-img
          v-if="!$q.screen.gt.sm"
          class="rounded-borders"
          src="statics/help/settings/account.png"
        />
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Definições de conta
            </div>
            <div :class="getFont.text">
              A partir da página de definições pode entrar na conta, ver perfil,
              sair da conta e eliminar conta.
            </div>
          </q-card-section>

          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/settings/account.png"
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
