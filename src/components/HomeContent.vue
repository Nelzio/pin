<template>
  <div style="height: 82vh; width: 100vw;">
    <div class="flex flex-center" style="height: 50%;">
      <div
        class="text-center q-pr-lg"
        style="height: 100%; width: 50vw; border-right: 2px solid rgba(0,0,0,.1); padding-top: 15%; border-bottom: 2px solid rgba(0,0,0,.1)"
        @click="$router.push('/work')"
      >
        <div>
          <q-icon size="100px" name="work" />
        </div>
        <div class="text-h6">
          Vagas
        </div>
      </div>
      <div
        class="text-center q-pl-lg"
        style="height: 100%; width: 50vw; border-bottom: 2px solid rgba(0,0,0,.1); padding-top: 15%"
        @click="$router.push('/store')"
      >
        <div>
          <q-icon size="100px" name="storefront" />
        </div>
        <div class="text-h6">
          Exposição
        </div>
      </div>
    </div>
    <div class="flex flex-center" style="height: 50%;">
      <div
        class="text-center"
        style="height: 100%; width: 50vw; border-right: 2px solid rgba(0,0,0,.1); padding-top: 15%;"
      >
        <div>
          <q-icon size="100px" name="account_circle" @click="$router.push('/profile')" />
        </div>
        <div class="text-h6">
          Perfil
        </div>
      </div>
      <div class="text-center" style="height: 100%; width: 50vw; padding-top: 15%;">
        <div>
          <q-icon size="100px" name="settings" @click="$router.push('/settings')" />
        </div>
        <div class="text-h6">
          Preferências
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeContent",
  mounted() {
  }
};
</script>

<style scoped>
</style>