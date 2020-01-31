<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Pagina não encotrada...<strong>(404)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.go(-1)"
      label="Voltar"
    />
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
