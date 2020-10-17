<template>
  <div class="q-pa-xs">
    <q-drawer
      side="right"
      v-model="drawer"
      :width="430"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
      class="fixed-right"
      role="aside"
      lang="pt-PT"
      aria-label="Avaliação de Usuário"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="text-primary">
          <q-btn
            flat
            round
            dense
            icon="arrow_forward"
            role="button"
            lang="pt-PT"
            aria-label="Fechar avaliação"
            @click="drawer = false"
          />
          <q-toolbar-title>User</q-toolbar-title>
        </q-toolbar>
        <div class="q-gutter-y-md">
          <div class="row justify-center">
            <div class="col-12">
              <!-- sec1 -->
              <div class="text-center">
                <q-avatar size="100px">
                  <q-img :src="user.photoURL" spinner-color="white" />
                </q-avatar>

                <div :class="getFont.title">{{ user.displayName }}</div>
              </div>

              <q-separator />
              <!-- sec2 -->
              <div class="row justify-center">
                <q-card class="col-12">
                  <q-tabs
                    v-model="tab"
                    dense
                    :active-color="darkModeConf.iconVar"
                    :indicator-color="darkModeConf.iconVar"
                    class="text-grey"
                    align="justify"
                    narrow-indicator
                    role="tablist"
                  >
                    <q-tab
                      name="bio"
                      label="Contacto"
                      icon="contacts"
                      role="tab"
                    />
                    <q-tab
                      name="ocupacao"
                      label="Sobre"
                      icon="description"
                      role="tab"
                    />
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="bio" role="tabpanel">
                      <q-list role="list">
                        <q-item class="text-left" role="listitem">
                          <q-item-section top avatar>
                            <q-icon
                              :color="darkModeConf.iconVar"
                              name="phone"
                            />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label :class="getFont.title"
                              >Telefone</q-item-label
                            >
                            <q-item-label :class="getFont.text">{{
                              user.phoneNumber
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-separator spaced inset="item" />

                        <q-item class="text-left" role="listitem">
                          <q-item-section top avatar>
                            <q-icon
                              :color="darkModeConf.iconVar"
                              name="email"
                            />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label :class="getFont.title"
                              >Email</q-item-label
                            >
                            <q-item-label :class="getFont.text">{{
                              user.email
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-separator spaced inset="item" />

                        <q-item class="text-left" role="listitem">
                          <q-item-section avatar top>
                            <q-icon
                              :color="darkModeConf.iconVar"
                              name="place"
                            />
                          </q-item-section>
                          <q-item-section>
                            <q-item-label :class="getFont.title"
                              >Endereço</q-item-label
                            >
                            <q-item-label :class="getFont.text">{{
                              user.address
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-tab-panel>

                    <q-tab-panel name="ocupacao" role="tabpanel">
                      <q-list role="list">
                        <q-item class="text-left" role="listitem">
                          <q-item-section top avatar>
                            <q-icon
                              :color="darkModeConf.iconVar"
                              name="calendar_today"
                            />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label :class="getFont.title"
                              >Data de nascimento</q-item-label
                            >
                            <q-item-label :class="getFont.text">{{
                              user.date
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>

                        <q-item class="text-left" role="listitem">
                          <q-item-section top avatar>
                            <q-icon :color="darkModeConf.iconVar" name="work" />
                          </q-item-section>

                          <q-item-section>
                            <q-item-label :class="getFont.title"
                              >Profissão</q-item-label
                            >
                            <q-item-label :class="getFont.text">{{
                              user.profession
                            }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </div>
            </div>
          </div>
          <div class="col-12" v-if="userData.access[1] == 'w'">
            <q-btn-group class="full-width" spread rounded>
              <q-btn
                push
                color="primary"
                label="Adicionar Júri"
                icon="add"
                role="button"
                @click="addRemoveEvaluators('add')"
              />
              <q-btn
                push
                color="red"
                label="Remover Júri"
                icon="cancel"
                role="button"
                @click="addRemoveEvaluators('remove')"
              />
            </q-btn-group>
          </div>
          <div class="row" role="group" v-if="userData.access[1] == 'w'">
            <q-card
              class="my-card col-12"
              v-for="(evaluator, index) in evaluators"
              :key="index"
            >
              <q-card-section horizontal>
                <q-card-section class="text-h5"
                  >Júri {{ index + 1 }}</q-card-section
                >
                <q-card-section>
                  <q-rating
                    v-model="evaluator.punctuation"
                    size="2em"
                    :max="10"
                    icon="done"
                    icon-selected="done_all"
                    color="primary"
                    @input="givePunctuation()"
                  />
                </q-card-section>
              </q-card-section>
            </q-card>
            <q-card v-if="evaluators.length" class="my-card col-12">
              <q-card-section horizontal>
                <q-card-section class="text-h5">Pontuação</q-card-section>
                <q-card-section class="text-h4">{{
                  punctuation
                }}</q-card-section>
              </q-card-section>
            </q-card>
          </div>
          <div
            v-if="evaluators.length && userData.access[1] == 'w'"
            class="row q-mb-lg"
          >
            <q-btn
              rounded
              color="primary"
              class="full-width"
              label="Adicionar resultado"
              @click="updateCandidate(user)"
              icon="add"
            />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { Loading } from "quasar"
import { firestoreDB } from "boot/firebase"
export default {
  data() {
    return {
      drawer: false,
      tab: "bio",
      ratingModel: 0,
      evaluators: [],
      punctuation: 0,
      user: {},
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont", "getVibrate"]),
    ...mapGetters("admin", ["vacancy"]),
    ...mapGetters("auth", ["userData"]),
  },
  methods: {
    getCandidate(candidateId) {
      const vm = this
      Loading.show()
      const ref = firestoreDB
        .collection("vacancies")
        .doc(this.vacancy.id)
        .collection("candidates")
        .doc(candidateId)
      ref
        .get()
        .then((doc) => {
          if (doc.exists) {
            vm.user = doc.data()
            vm.user["id"] = doc.id
            vm.evaluators = doc.data().evaluators
            vm.drawer = true
          }
          Loading.hide()
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
        })
    },
    changeUser() {
      const vm = this
      this.$root.$on("userCandidature", (id) => {
        console.log(id)
        vm.getCandidate(id)
      })
    },
    addRemoveEvaluators(val) {
      if (val == "add") {
        this.evaluators.push({ punctuation: 0 })
      } else if (this.evaluators.length > 0) {
        this.evaluators.pop()
      }
    },
    givePunctuation() {
      let punctuation = 0
      this.evaluators.forEach((element) => {
        punctuation += element.punctuation
      })
      var result = punctuation / this.evaluators.length
      this.punctuation = Number.isInteger(result) ? result : result.toFixed(2)
    },
    updateCandidate(val) {
      Loading.show()
      let candidate = val
      candidate.evaluators = this.evaluators
      const ref = firestoreDB
        .collection("vacancies")
        .doc(this.vacancy.id)
        .collection("candidates")
        .doc(candidate.id)
      ref
        .set(candidate)
        .then(() => {
          Loading.hide()
          console.log("done")
        })
        .catch((error) => {
          Loading.hide()
          console.log(error)
        })
    },
  },
  mounted() {
    this.changeUser()
  },
  watch: {
    evaluators() {
      this.givePunctuation()
    },
  },
}
</script>

<style>
</style>