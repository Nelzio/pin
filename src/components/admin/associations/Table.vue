<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Associações"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      selection="single"
      :selected.sync="selected"
      hide-header
      role="table"
      lang="pt-PT"
      aria-label="Tabela de lista de associações."
    >
      <template
        v-slot:top-left
        class="q-gutter-x-lg"
      >
        <div :class="getFont.title">Associações</div>
      </template>
      <template
        v-slot:top-right
        class="q-gutter-x-lg"
      >
        <div class="q-mr-xl">
          <q-btn
            rounded
            outline
            color="primary"
            label="Adicionar Associação"
            role="button"
            @click="openAddDialog()"
          />
        </div>

        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
          role="search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card
            @click="addRemoveSelection(props.row)"
            :class="props.selected ? 'bg-grey-2' : ''"
            clickable
            v-ripple
            role="grou+"
          >
            <q-list dense>
              <q-item
                v-for="col in props.cols.filter(col => col.name !== 'desc')"
                :key="col.name"
              >
                <q-item-section>
                  <q-item-label
                    :class="getFont.text"
                    class="text-bold"
                  >{{ col.label }}</q-item-label>
                  <q-item-label :class="getFont.text">{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { firestoreDB } from "boot/firebase";
export default {
  data () {
    return {
      filter: "",
      selected: [],
      columns: [
        {
          name: "association",
          required: true,
          label: "Nome da associação",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "address",
          align: "center",
          label: "Localização",
          field: "address",
          sortable: true,
        },
        {
          name: "type",
          label: "Tipo de deficiências",
          field: "type",
          sortable: true,
        },
      ],
      data: [
        {
          name: "Frozen Yogurt",
          address: "Nampula",
          type: 6.0,
          types: ["Auditiva", "Visual", "Psico Social"],
          phoneNumber: "+258841224724",
          email: "associa@gmail.com",
        },
      ],
    };
  },
  computed: {
    ...mapState("settings", ["appMode", "darkModeConf"]),
    ...mapGetters("settings", ["getFont"]),
  },
  methods: {
    openAddDialog () {
      this.$root.$emit("addAssociation");
    },
    addRemoveSelection (object) {
      if (object == this.selected[0]) {
        this.selected = [];
        this.$root.$emit("associationDetailsClose");
      } else {
        if (this.selected.length) this.selected = [];
        this.selected.push(object);
        this.$root.$emit("associationDetails", object);
      }
    },

    getData () {
      const vm = this;
      const ref = firestoreDB.collection("associations");
      ref.onSnapshot(function (docs) {
        var data = [];
        docs.forEach(function (doc) {
          var object = {
            id: doc.id,
            name: doc.data().name,
            address: doc.data().address,
            type: "",
            types: doc.data().types,
            phoneNumber: doc.data().phoneNumber,
            email: doc.data().email,
          };
          if (object.types.length > 1) {
            object["type"] = "Diferentes tipos";
          } else if (object.types.length) {
            object["type"] = object.types[0];
          }
          data.push(object);
        });
        vm.data = data;
      });
    },
    giveNewData () {
      const vm = this;
      this.$root.$on("pleaseNewData", function (id) {
        const ref = firestoreDB.collection("associations").doc(id);
        ref
          .get()
          .then((doc) => {
            if (doc.exists) {
              var object = {
                id: doc.id,
                name: doc.data().name,
                address: doc.data().address,
                types: doc.data().types,
                phoneNumber: doc.data().phoneNumber,
                email: doc.data().email,
              };

              this.$root.$emit("newData", object);
            } else {
              this.$root.$emit("newData", {});
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
  mounted () {
    this.getData();
    this.giveNewData();
  },
};
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
</style>