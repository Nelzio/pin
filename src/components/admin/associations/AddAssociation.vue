<template>
  <div>
    <q-dialog
      v-model="dialog"
      persistent
    >
      <q-card
        class="q-pb-lg"
        style="width: 700px; max-width: 80vw;"
      >
        <q-card-section class="row items-center">
          <div class="text-h6">Adicionar Associação</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-section>
        <q-card-section>
          <q-form
            ref="form"
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              outlined
              rounded
              v-model="data.name"
              label="Nome da associação *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Adicione o nome da associação']"
            />
            <q-input
              outlined
              rounded
              v-model="data.phoneNumber"
              label="Telefone da associação *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Adicione o telefone da associação']"
            />
            <q-input
              outlined
              rounded
              v-model="data.email"
              label="Email da associação *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Adicione o email da associação']"
            />
            <q-input
              outlined
              rounded
              v-model="data.address"
              label="Endereço da associação *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Adicione o endereço da associação']"
            />
            <q-select
              outlined
              rounded
              v-model="data.types"
              multiple
              :options="optionsType"
              use-chips
              use-input
              stack-label
              @filter="filterFn"
              label="Multiple selection"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">No results</q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            rounded
            icon="add"
            label="Enviar"
            color="primary"
            @click="onSubmit()"
          />
          <q-btn
            rounded
            label="Reset"
            color="primary"
            flat
            class="q-ml-sm"
            @click="onReset()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDialog">
      <q-card style="width: 400px; max-width: 50vw;">
        <q-card-section>
          <div :class="[getFont.title, 'text-'+darkModeConf.iconVar]">Adição de associação</div>
        </q-card-section>
        <q-card-section
          :class="getFont.text"
          class="text-center"
        >
          <q-icon
            name="check_circle"
            color="green"
            size="80px"
          />

        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            :color="darkModeConf.iconVar"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="errorDialog">
      <q-card style="width: 400px; max-width: 50vw;">
        <q-card-section>
          <div :class="[getFont.title, 'text-'+darkModeConf.iconVar]">Erro ao adicionar</div>
        </q-card-section>
        <q-card-section
          :class="getFont.text"
          class="text-center"
        >
          <q-icon
            name="mood_bad"
            color="red"
            size="80px"
          />

        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            :color="darkModeConf.iconVar"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Loading } from "quasar";
import { firestoreDB } from "boot/firebase";
const options = ["Visual", "Auditiva", "Física", "Psico Social"];
export default {
  data () {
    return {
      confirmDialog: false,
      errorDialog: false,
      dialog: false,
      tempSelect: null,
      data: {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        types: [],
      },
      optionsType: options,
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {
    openDialog () {
      const vm = this;
      this.$root.$on("addAssociation", function () {
        vm.dialog = true;
      });
    },
    onSubmit () {
      Loading.show();
      const vm = this;
      const ref = firestoreDB.collection("associations");
      ref
        .add(this.data)
        .then((res) => {
          console.log(res);
          vm.dialog = false
          vm.onReset()
          Loading.hide();
          vm.confirmDialog = true
        })
        .catch((error) => {
          console.log(error);
          Loading.hide();
          vm.errorDialog = true
        });
    },
    onReset () {
      this.$refs.form.resetValidation();
      this.data = {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        types: [],
      };
    },
    filterFn (val, update) {
      if (val === "") {
        update(() => {
          this.optionsType = options;

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.optionsType = options.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
  },
  mounted () {
    // Loading.hide()
    this.openDialog();
  },
  watch: {
    tempSelect (val) {
      console.log(val);
    },
  },
};
</script>

<style>
</style>