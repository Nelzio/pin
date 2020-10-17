<template>
  <div class="fixed-center text-center" v-touch-swipe.mouse.right="handleSwipe">
    <p>
      <q-img src="~assets/sad.svg" style="width: 30vw; max-width: 150px" />
    </p>
    <p class="text-faded">
      Página não encotrada...
      <strong>(404)</strong>
    </p>
    <q-btn
      color="secondary"
      style="width: 200px"
      @click="$router.go(-1)"
      label="Voltar"
    />
  </div>
</template>

<script>
export default {
  name: "Error404",
  methods: {
    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.go(-1)
      }
    },
  },
  mounted() {
    if (this.vibrateState === 1 && this.getVibrate)
      this.$root.$emit(
        "textToSpeechRouter",
        "Página não encotrada. Deslize o dedo para a direita para voltar."
      )
  },
}
</script>
