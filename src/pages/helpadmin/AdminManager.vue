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
            Página de permissões
          </div>
          <div :class="getFont.text">
            <p>
              Na página de permissões, o administrador pode adicionar outros
              administradores e dar permissões.
            </p>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <div class="flex flex-center">
          <q-img
            class="rounded-borders"
            src="statics/adminhelp/settings/Image2.png"
          />
        </div>
        <q-card-section class="q-pt-xs text-justify">
          <div :class="getFont.title" class="q-mt-sm q-mb-xs">Permissões</div>
          <div :class="getFont.text">
            <p>
              Para adicionar administrador, o administrador com permissão de
              adicionar administradores deve clicar no botão adicionar
              administrador e será aberto um diálogo em que se deve pesquisa por
              nome ou email de um usuário e de seguida clicar sobre o item que
              aparece o usuário para o torar administrador da plataforma.
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
