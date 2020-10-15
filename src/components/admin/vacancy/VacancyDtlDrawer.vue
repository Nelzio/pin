<template>
  <div v-if="vacancy && Object.keys(vacancy).length">
    <q-drawer
      side="right"
      v-model="drawer"
      :width="430"
      :breakpoint="500"
      bordered
      content-class="bg-grey-2"
      class="fixed-right"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="text-primary">
          <q-btn
            flat
            round
            dense
            icon="arrow_forward"
            @click="$emit('close')"
          />
          <q-toolbar-title>Detalhes da vaga</q-toolbar-title>
          <div v-if="userData.access[1] == 'w'">
            <q-btn
              v-if="approved"
              rounded
              color="red"
              label="Reprovar"
              @click="dialogApprove = true"
            />
            <q-btn
              v-else
              rounded
              color="primary"
              label="Aprovar"
              @click="dialogApprove = true"
            />
          </div>
        </q-toolbar>
        <div>
          <q-card class="my-card shadow-0">
            <q-img :src="vacancy.img" spinner-color="white" />
          </q-card>
          <div class="q-gutter-y-xs q-pa-sm">
            <div class="text-h5">
              {{ vacancy.title }}
            </div>
            <div class="text-body1">
              Nome da Empresa: {{ vacancy.user.displayName }}
            </div>
            <div class="text-body1">
              Email Empresa: {{ vacancy.user.email }}
            </div>
            <div class="text-body1">
              Telefone Empresa: {{ vacancy.user.phoneNumber }}
            </div>
            <div class="text-h6">Descrição da vaga</div>
            <div class="text-body1" v-html="vacancy.description" />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <div v-if="vacancy && Object.keys(vacancy).length">
      <q-dialog v-model="devaluationDialog">
        <q-card style="width: 80vw">
          <q-card-section>
            <div class="text-h6">Confirmação</div>
          </q-card-section>
          <q-card-section class="text-body1">
            <div v-if="approved">Vaga Aprovada com sucesso!</div>
            <div v-else>Vaga rejeitada</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div v-if="vacancy && Object.keys(vacancy).length">
      <q-dialog v-model="dialogApprove">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6" :class="getFont.title">Atenção</div>
          </q-card-section>
          <q-card-section :class="getFont.text" v-if="vacancy.approved"
            >Rejeitar vaga {{ vacancy.title }}?</q-card-section
          >
          <q-card-section :class="getFont.text" v-else
            >Aprovar vaga {{ vacancy.title }}?</q-card-section
          >
          <q-card-actions align="right">
            <q-btn
              v-if="vacancy.approved"
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              rounded
              label="Rejeitar"
              @click="approveVacancy()"
            />
            <q-btn
              v-else
              :color="darkModeConf.iconVar"
              :class="darkModeConf.textBtn"
              rounded
              label="Aprovar"
              @click="approveVacancy()"
            />
            <q-btn
              :color="darkModeConf.iconVar"
              outline
              rounded
              label="Cancelar"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import { firestoreDB } from "boot/firebase"
import { Loading } from "quasar"
export default {
  props: ["openDrawer", "vacancy"],
  data() {
    return {
      drawer: false,
      approved: false,
      devaluationDialog: false,
      dialogApprove: false,
    }
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
    ...mapGetters("auth", ["userData"]),
  },
  methods: {
    approveVacancy() {
      Loading.show()
      const vm = this
      const ref = firestoreDB.collection("vacancies")
      let vacancy = {}
      ref
        .doc(this.vacancy.id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            vacancy = doc.data()
            vacancy.approved = !vacancy.approved
            ref
              .doc(vm.vacancy.id)
              .set(vacancy)
              .then(function () {
                Loading.hide()
                vm.approved = vacancy.approved
                vm.dialogApprove = false
                vm.devaluationDialog = true
                console.log("Done")
              })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  mounted() {
    this.approved = this.vacancy.approved
    const vm = this
    setTimeout(() => {
      vm.drawer = true
    }, 3000)
  },
  watch: {
    openDrawer(val) {
      this.drawer = val
    },
    vacancy(val) {
      this.approved = val.approved
    },
  },
}
</script>

<style>
</style>