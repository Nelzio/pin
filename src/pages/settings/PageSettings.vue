<template>
  <q-page v-touch-swipe.mouse.left.right="handleSwipe">
    <div>
      <div class="row justify-center">
        <div class="col-12 col-md-8">
          <q-list>
            <q-expansion-item
              expand-separator
              default-opened
              icon="settings_applications"
              label="Definições do app"
              :class="getFont.text"
              
            >
              <q-card>
                <q-item>
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="highlight" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="getFont.text">Modo claro</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-toggle :color="darkModeConf.icon" v-model="mode" />
                  </q-item-section>
                </q-item>

                <q-separator spaced inset="item" />

                <q-item>
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="vibration" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="getFont.text">Vibrar e narar</q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-toggle :color="darkModeConf.icon" v-model="vibrateMode" />
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="format_size" />
                  </q-item-section>

                  <q-item-section>
                    <!-- <q-item-label class="text-h6">Tamanho do texto</q-item-label> -->
                    <q-select
                      v-model="fontSize"
                      :color="darkModeConf.iconVar"
                      :class="getFont.text"
                      :options="fontText"
                      label="Tamanho de texto"
                    />
                  </q-item-section>
                </q-item>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              v-if="user && isUserAuth" 
              expand-separator
              default-opened
              icon="perm_identity"
              label="Definições de conta"
              :class="getFont.text"
              :caption="user.displayName"
            >
              <q-card>
                <q-item clickable v-ripple to="/profile">
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="account_circle" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="getFont.text">Ver perfil</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple to="/account/edit">
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="edit" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="getFont.text">Editar conta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="logOutDialog = true">
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="logout" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="getFont.text">Sair da conta</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-ripple @click="deletDialog = true">
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="delete_forever" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="getFont.text">Remover conta</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              v-else
              expand-separator
              default-opened
              icon="perm_identity"
              label="Definições de conta"
              :class="getFont.text"
            >
              <q-card>
                <q-item clickable v-ripple to="/account">
                  <q-item-section avatar>
                    <q-icon :color="darkModeConf.iconVar" name="account_circle" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label :class="getFont.text">Entrar na conta</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>

      <div>
        <q-dialog v-model="deletDialog">
          <q-card class="text-red">
            <q-card-section>
              <div :class="getFont.title">Introduza sua senha</div>
            </q-card-section>
            <q-card-section v-if="providerId == 'password'" :class="getFont.text">
              <q-input
                rounded
                outlined
                :color="darkModeConf.iconVar"
                ref="password"
                label="Senha"
                placeholder="Senha"
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Introduza a sua senha']"
              >
                <template v-slot:append>
                  <q-icon :color="darkModeConf.iconVar"
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-card-section v-else :class="getFont.text">Tem a certeza de que quer Remover a conta?</q-card-section>
            <q-card-actions align="right">
              <q-btn rounded label="Remover conta" color="red" @click="deleteUser({id: user.email, password: password})" />
              <q-btn rounded outline label="Cancelar" :color="darkModeConf.iconVar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="logOutDialog">
          <q-card>
            <q-card-section>
              <div :class="getFont.title">Atençao</div>
            </q-card-section>
            <q-card-section :class="getFont.text">Tem a certeza de que quer sair da conta?</q-card-section>
            <q-card-actions align="right">
              <q-btn rounded label="Sair" icon="logout" :color="darkModeConf.iconVar" :class="darkModeConf.textBtn" @click="signOut()" />
              <q-btn rounded outline label="Cancelar" :color="darkModeConf.iconVar" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { firebase } from "boot/firebase"
export default {
  name: "PageSettings",
  data() {
    return {
      mode: true,
      vibrateMode: false,
      deletDialog: false,
      logOutDialog: false,
      providerId: "",
      fontSize: "Médio",
      fontText: ["Pequeno", "Médio", "Grande"],
      snap: {
        min: 2,
        max: 12
      },
      password: "",
      isPwd: true,
      localSettings: {} //Veja a estrutura desse objecto no state do /store/store-modules/settings-module.js
    };
  },
  computed: {
    ...mapState("settings", [
      "appMode",
      "darkModeConf",
      "vibrateState",
      "fontConfig"
    ]),
    ...mapGetters("settings", ["getMode", "getFont"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["user", "userData", "isUserAuth"])

    // ...mapGetters('settings', [
    //     'getSettings'
    // ]),
  },
  methods: {
    ...mapActions("settings", [
      "setFont",
      "playSound",
      "setVibrate",
      "setAppMode"
    ]),
    ...mapActions("auth", ["detailUser", "deleteUser", "signOut"]),

    handleSwipe(val) {
      if (val.direction === "right") {
        this.$router.push("/store");
      }

      if (val.direction === "left") {
        if (!this.isUserAuth) {
          this.$router.push("/account")
        } else {
          this.$router.push("/profile")
        }
        // this.$router.push("/profile");
      }
    },
    darkMode() {
      if (this.mode) {
        this.setAppMode(1);
      } else {
        this.setAppMode(0);
      }
    },
    vibrateApp() {
      if (this.vibrateMode) {
        this.setVibrate(1);
      } else {
        this.setVibrate(0);
      }
    },
    funcFont() {
      if (this.fontSize == "Pequeno") {
        this.setFont(1);
      } else if (this.fontSize == "Médio") {
        this.setFont(2);
      } else {
        this.setFont(3);
      }
    }
  },
  created() {
    if (this.fontConfig == 1) {
      this.fontSize = "Pequeno";
    } else if (this.fontConfig == 2) {
      this.fontSize = "Médio";
    } else {
      this.fontSize = "Grande";
    }

    if (this.getMode == 1) {
      this.mode = true;
    } else {
      this.mode = false;
    }

    if (this.vibrateState == 1) {
      this.vibrateMode = true;
    } else {
      this.vibrateMode = false;
    }
  },
  mounted() {
    if(firebase.auth().currentUser) this.providerId = firebase.auth().currentUser.providerData[0].providerId;

    this.$root.$emit("isHomePage", "Preferências");

    this.darkMode();

    // Vibração
    if (this.vibrateState) {
      if(window.hasOwnProperty("cordova")){
        navigator.vibrate(200);
      } else {
        window.navigator.vibrate(200);
      }
    }

    this.$root.$emit("textToSpeechRouter", "Página de configurações.");
  },
  watch: {
    snap(val) {
      console.log("Fonte: ", val);
    },

    mode() {
      this.darkMode();
    },

    vibrateMode() {
      this.vibrateApp();
    },

    fontConfig() {
      if (this.fontConfig == 1) {
        this.fontSize = "Pequeno";
      } else if (this.fontConfig == 2) {
        this.fontSize = "Médio";
      } else {
        this.fontSize = "Grande";
      }
    },

    fontSize() {
      this.funcFont();
    }
  }
};
</script>

<style scoped>
</style>