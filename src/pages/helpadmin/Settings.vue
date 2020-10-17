<template>
  <q-page padding>
    <div class="q-gutter-y-lg">
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/settings/Image.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">
            Página de estatística
          </div>
          <div :class="getFont.text">
            <p>
              A página de estatística mostra algumas correlações da plataforma.
            </p>
            <p>
              É possível ver dados estatísticos de usuários, de vagas, de
              produtos e serviços. É possível filtrar os dados por província.
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
    ...mapGetters("settings", ["getFont", "getStart", "getVibrate"]),
  },
}
</script>
