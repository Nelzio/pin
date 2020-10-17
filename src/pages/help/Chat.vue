<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/chat/list.png"
            style="height: 100%; width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/chat/list.png"
              style="width: 20vw"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Página de lista de conversas
            </div>
            <div :class="getFont.text">
              Se o usuário tiver recebido ou enviado alguma mensagem, aparecerá
              na barra superior de navegação, ao lado de sua foto de perfil, um
              botão com o icon de mensagem
              <q-icon color="primary" size="md" name="chat" />. Clicando nele
              será redirecionado a página que contem lista de conversa. O
              Usuário pode escolher uma das conversas e interagir com o outro
              usuário.
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            v-if="!$q.screen.gt.sm"
            class="rounded-borders"
            src="statics/help/chat/Imagem.png"
            style="height: 100%; width: 60vw"
          />
        </div>
        <q-card-section horizontal>
          <q-card-section v-if="$q.screen.gt.sm" class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/chat/Imagem.png"
              style="width: 20vw"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs text-justify">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Página de chat
            </div>
            <div :class="getFont.text">
              O contacto por meio do aplicativo é feito por mensagens de texto
              ou de voz. Para mandar mensagens de texto, basta escrever e clicar
              no ícone de enviar. Para mandar mensagens de voz, o usuário deve
              clicar no botão com ícone de microfone ao lado da caixa de texto e
              para parar o áudio deve clicar no botão enviar.
            </div>
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
