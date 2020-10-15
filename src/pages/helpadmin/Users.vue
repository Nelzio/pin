<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/users/Image.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Página de usuários da aplicação
          </div>
          <div :class="getFont.text">
            <p>
              A página de usuário da aplicação contem uma tabela com lista de
              todos usuários da aplicação.
            </p>
            <p>
              É possível a partir da página ver uma comparação de género dos
              usuários em termos de números e percentagens.
            </p>
            <p>
              E também é possível baixar um arquivo no formato CSV ou Excel de
              todos os usuários ou por género.
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
    ...mapGetters("settings", ["getFont", "getStart"]),
  },
}
</script>
