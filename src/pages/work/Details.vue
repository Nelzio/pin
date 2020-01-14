<template>
  <q-page padding>
    <!-- content -->
    <div class="row q-gutter-y-md">
      <q-card class="my-card col-12" style="padding: 0;height: 300px">
        <q-video style="padding: 0;height: 300px" src="https://www.youtube.com/embed/Raa0vBXA8OQ" />
      </q-card>

      <div class="col-12 row justify-end q-gutter-x-md">
        <q-btn
          v-if="!vacancyDone"
          rounded
          :color="darkModeConf.color"
          :class="darkModeConf.textBtn"
          label="Candidatar-se"
          icon="done_all"
          @click="apply = true"
        />
        <q-btn v-else rounded color="red" label="Cancelar" icon="close" @click="apply = true" />
        <!-- <q-btn round outline color="teal" icon="share" /> -->
      </div>

      <q-card
        bordered
        class="my-card col-sm-12"
        :class="[appMode.bgColor, appMode.textColorOptional]"
      >
        <q-card-section>
          <div class="text-h6">Descricao</div>
        </q-card-section>

        <q-separator dark inset />

        <q-card-section class="row" v-for="i in 4" :key="i">
          <div class="col text-center">
            <q-icon name="arrow_forward_ios" />
          </div>
          <div
            class="col-11 text-body1"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi adipisci itaque deleniti error ipsam blanditiis nostrum maxime, pariatur, corporis architecto consequuntur. Voluptates quis rerum quam ex eos. Corrupti, ipsam!</div>
        </q-card-section>
      </q-card>
    </div>

    <div>
      <q-dialog v-model="apply">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h5">Confirmar</div>
          </q-card-section>

          <q-card-section v-if="!vacancyDone" class="q-pt-none text-h6">Registar-se a vaga?</q-card-section>
          <q-card-section v-else class="q-pt-none text-h6">Retirar candidatura?</q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn rounded outline color="green" label="Candidatar" @click="submit" />
            <q-btn rounded outline color="grey" label="Cancelar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="col-12 row justify-end q-gutter-x-md q-pt-md q-mb-lg">
      <q-btn
        v-if="!vacancyDone"
        rounded
        :color="darkModeConf.color"
        :class="darkModeConf.textBtn"
        label="Candidatar-se"
        icon="done_all"
        @click="apply = true"
      />
      <q-btn v-else rounded color="red" label="Cancelar" icon="close" @click="apply = true" />
      <!-- <q-btn round outline color="teal" icon="share" @click="socialNet = true" /> -->
    </div>
  </q-page>
</template>

<script>
import { mapState } from "vuex";
export default {
  // name: 'PageName',
  data() {
    return {
      socialNet: false,
      apply: false,
      vacancyDone: false
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"])
  },
  methods: {
    submit() {
      this.vacancyDone = !this.vacancyDone;
      if (!this.vacancyDone) {
        alert("A sua candidatura foi submetida com sucesso!!");
      } else {
        alert("A sua candidatura foi cancelada com sucesso!!");
      }
    }
  },
  mounted() {
    this.$root.$emit("isHomePage", "Descrição da vaga");
  }
};
</script>
