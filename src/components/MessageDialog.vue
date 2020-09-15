<template>
  <q-dialog v-model="show">
    <q-card
      style="width: 80vw;"
      aria-label="Mensagem de confirmação"
      :class="darkModeConf.textColor"
    >
      <q-card-section>
        <div
          class="text-h6"
          :class="getFont.title"
        >Confirmar</div>
      </q-card-section>
      <q-card-section :class="getFont.text">
        {{ message }}
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          rounded
          outline
          label="OK"
          :color="darkModeConf.iconVar"
          @click="$emit('close')"
          role="button"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["message"],
  data () {
    return {
      show: false,
    }
  },
  computed: {
    ...mapState("settings", ["darkModeConf"]),
    ...mapGetters("settings", ["getFont"])
  },
  mounted () {
    const vm = this
    this.$root.$on("openConfirmDialog", () => {
      vm.show = true
    })
  }

}
</script>

<style>
</style>