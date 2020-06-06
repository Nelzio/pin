<template>
  <div>Redirect</div>
</template>

<script>
export default {
    mounted () {
        // console.log("Ola");
        console.log(this.$route.params.idauth)
        // location.replace("https://firebaseapp.com/__/auth/" + this.$route.params.idauth);
        // location.replace("https://google.com");
    }

}
</script>

<style>

</style>