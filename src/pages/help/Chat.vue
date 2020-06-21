<template>
  <q-page padding>
    <div class="q-gutter-y-lg q-pa-lg">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-6 flex flex-center">
            <q-img
              class="rounded-borders"
              src="statics/help/chat/Imagem.png"
              style="height: 100%; width: 20vw;"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">Página de Produto e serviços</div>
            <div :class="getFont.text">
              O contacto por meio do aplicativo é feito por mensagens de texto ou de voz.
Para mandar mensagens de texto, basta escrever e clicar no ícone de enviar.

Para mandar mensagens de voz, o usuário deve clicar no botão com ícone de microfone ao lado da caixa de texto ou clicar repetidas vezes na tela até vibrar e para para o áudio deve repetir a ação.


            </div>
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
