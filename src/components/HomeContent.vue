<template>
  <div style="height: 80vh; width: 100vw;">
    <div class="flex flex-center" style="height: 50%;">
      <div
        class="text-center q-pr-lg"
        style="height: 100%; width: 50vw; border-right: 2px solid rgba(0,0,0,.1); padding-top: 15%; border-bottom: 2px solid rgba(0,0,0,.1)"
        @click="$router.push('/vacancies')"
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
          <q-icon size="100px" name="store" />
        </div>
        <div class="text-h6">
          Produtos e Serviços
        </div>
      </div>
    </div>
    <div class="flex flex-center" style="height: 50%;">
      <div
        class="text-center"
        style="height: 100%; width: 50vw; border-right: 2px solid rgba(0,0,0,.1); padding-top: 15%;"
        @click="$router.push('/profile')"
      >
        <div>
          <q-icon size="100px" name="account_circle" />
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
          Definições
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: "HomeContent",
  computed: {
    ...mapState ('auth', ['isUserAuth'])
  },
  methods: {
    ...mapActions ('auth', [
      'checkAuthUser'
    ]),
  }
};
</script>

<style scoped>
</style>