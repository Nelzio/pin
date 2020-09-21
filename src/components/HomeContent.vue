<template>
  <div style="height: 80vh; width: 100vw;">
    <div
      class="flex flex-center"
      style="height: 50%;"
    >
      <router-link
        to="/vacancies"
        class="text-center q-pr-lg"
        style="height: 100%; width: 50vw; border-right: 2px solid rgba(0,0,0,.1); padding-top: 15%; border-bottom: 2px solid rgba(0,0,0,.1)"
        role=link
        aria-label="Link para página de vagas"
        lang="pt-PT"
      >
        <div>
          <q-icon
            :color="darkModeConf.iconVar"
            size="100px"
            name="work"
          />
        </div>
        <div
          class="text-h6"
          :class="darkModeConf.textColor"
          lang="pt-PT"
          v-show="vibrateState"
        >Vagas</div>
      </router-link>
      <router-link
        to="/store"
        class="text-center q-pl-lg"
        style="height: 100%; width: 50vw; border-bottom: 2px solid rgba(0,0,0,.1); padding-top: 15%"
        role=link
        aria-label="Link para página de Negócios"
        lang="pt-PT"
      >
        <div>
          <q-icon
            :color="darkModeConf.iconVar"
            size="100px"
            name="store"
          />
        </div>
        <div
          class="text-h6"
          :class="darkModeConf.textColor"
          lang="pt-PT"
          v-show="vibrateState"
        >Negócio</div>
      </router-link>
    </div>
    <div
      class="flex flex-center"
      style="height: 50%;"
    >
      <router-link
        v-if="!this.isUserAuth"
        to="/account"
        class="text-center"
        style="height: 100%; width: 50vw; border-right: 2px solid rgba(0,0,0,.1); padding-top: 15%;"
        role=link
        aria-label="Link para página de Perfil"
        lang="pt-PT"
      >
        <div>
          <q-icon
            :color="darkModeConf.iconVar"
            size="100px"
            name="account_circle"
          />
        </div>
        <div
          class="text-h6"
          :class="darkModeConf.textColor"
          v-show="vibrateState"
        >Perfil</div>
      </router-link>
      <router-link
        v-else
        to="/profile"
        class="text-center"
        style="height: 100%; width: 50vw; border-right: 2px solid rgba(0,0,0,.1); padding-top: 15%;"
        role=link
        aria-label="Link para página de perfil"
        lang="pt-PT"
      >
        <div>
          <q-icon
            :color="darkModeConf.iconVar"
            size="100px"
            name="account_circle"
          />
        </div>
        <div
          class="text-h6"
          :class="darkModeConf.textColor"
          v-show="vibrateState"
        >Perfil</div>
      </router-link>
      <router-link
        to="/settings"
        class="text-center"
        style="height: 100%; width: 50vw; padding-top: 15%;"
        role=link
        aria-label="Link para página de configurações"
        lang="pt-PT"
      >
        <div>
          <q-icon
            :color="darkModeConf.iconVar"
            size="100px"
            name="settings"
            @click="$router.push('/settings')"
          />
        </div>
        <div
          v-show="vibrateState"
          class="text-h6"
          :class="darkModeConf.textColor"
        >Definições</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import offline from 'v-offline';
export default {
  name: "HomeContent",
  computed: {
    ...mapGetters("auth", ["isUserAuth"]),
    ...mapState("settings", ["darkModeConf", "vibrateState"]),
  },
  methods: {
    ...mapActions("auth", ["checkAuthUser"]),

    routeToProfile () {
      if (!this.isUserAuth) {
        this.$router.push("/account")
      } else {
        this.$router.push("/profile")
      }
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>