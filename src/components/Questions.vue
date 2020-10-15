<template>
  <div>
    <q-dialog v-model="open" :maximized="$q.platform.is.desktop ? false : true">
      <q-card
        :style="$q.platform.is.desktop ? 'width: 700px; max-width: 80vw' : ''"
      >
        <q-card-section class="row">
          <div class="text-h6">Reclamação ou sugestão</div>
          <q-space />
          <q-btn flat icon="close" @click="$emit('close')" />
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            ref="suggestionsForm"
            class="q-gutter-md"
          >
            <q-select
              rounded
              outlined
              v-model="form.option"
              :options="['Reclamação', 'Sugestão']"
              label="Selecione uma opção"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Selecione uma opção',
              ]"
            />
            <q-input
              rounded
              outlined
              v-model="form.message"
              label="Mensagem"
              type="textarea"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Enviar"
            rounded
            class="full-width"
            color="primary"
            @click="onSubmit()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="confirmInsert"
      role="dialog"
      lang="pt-PT"
      aria-label="Alerta de sucesso"
    >
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6" :class="getFont.title">Atenção</div>
        </q-card-section>
        <q-card-section :class="getFont.text"
          >{{ form.option }} enviada com sucesso</q-card-section
        >

        <q-card-actions align="right">
          <q-btn
            rounded
            label="OK"
            :color="darkModeConf.iconVar"
            :class="darkModeConf.textBtn"
            role="button"
            @click="confirmInsertFunc()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { firestoreDB } from "boot/firebase"
import { mapState, mapActions, mapGetters } from "vuex"
import { Loading } from "quasar"
export default {
  props: ["openDialogQuestion"],
  data() {
    return {
      confirmInsert: false,
      open: false,
      form: {
        option: "",
        message: "",
        user: {},
      },
    }
  },
  computed: {
    ...mapState("settings", ["settings", "appMode", "darkModeConf"]),
    ...mapGetters("auth", ["isUserAuth", "userData"]),
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {
    onSubmit() {
      const vm = this
      this.$refs.suggestionsForm.validate().then((success) => {
        if (success) {
          // yay, models are correct
          vm.sendData()
        } else {
          // oh no, user has filled in
          // at least one invalid value
          alert("Preencha corretamente o formulário")
        }
      })
    },
    sendData() {
      Loading.show()
      const vm = this
      this.form["user"] = {
        email: this.userData.email,
        phoneNumber: this.userData.phoneNumber,
      }
      const ref = firestoreDB.collection("suggestions")
      ref
        .add(this.form)
        .then((res) => {
          Loading.hide()
          vm.confirmInsert = true
        })
        .catch((error) => {
          console.log(error)
          Loading.hide()
        })
    },
    onReset() {
      this.$refs.suggestionsForm.resetValidation()
      this.form = {
        option: "",
        message: "",
        user: {},
      }
    },
    confirmInsertFunc() {
      this.onReset()
      this.confirmInsert = false
      this.open = false
    },
  },
  mounted() {
    if (this.openDialogQuestion) this.open = true
  },
  watch: {
    openDialogQuestion(val) {
      this.open = val
    },
    open(val) {
      if (!val) {
        this.$emit("close")
      }
    },
  },
}
</script>

<style>
</style>