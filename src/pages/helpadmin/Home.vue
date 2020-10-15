<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card" flat>
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/home/home.png"
          />
        </div>
        <q-card-section>
          <q-card-section class="q-pt-xs">
            <div :class="getFont.title" class="q-mt-sm q-mb-xs">
              Visão geral
            </div>
            <div :class="getFont.text">
              A página de visão geral apresenta um resumo dos dados da
              plataforma.
            </div>
            <div :class="getFont.text">
              Na página de visão geral é possível ver quantos usuários a
              plataforma tem, ver o número de empresas, número de vagas e número
              de associações. Para além disso temos comporta duas tabelas que
              apresenta vagas e candidaturas recentes.
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
  computed: {
    ...mapState("settings", ["vibrateState", "homeSpeak"]),
    ...mapGetters("settings", ["getFont", "getStart"]),
  },
}
</script>
