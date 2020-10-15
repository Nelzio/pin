<template>
  <div>
    <q-table
      title="Treats"
      :data="tableData"
      :columns="tableColumns"
      row-key="name"
      :visible-columns="visibleColumns"
      :filter="filter"
      :fullscreen="false"
    >
      <template v-slot:top>
        <div class="row q-gutter-x-sm">
          <q-select
            v-model="visibleColumns"
            multiple
            rounded
            outlined
            dense
            options-dense
            :display-value="$q.lang.table.columns"
            emit-value
            map-options
            :options="tableColumns"
            option-value="name"
            style="min-width: 150px"
          />
          <q-btn
            rounded
            outline
            color="primary"
            icon-right="archive"
            label="Export em csv"
            no-caps
            @click="exportTable"
          />

          <q-btn
            rounded
            outline
            color="primary"
            icon-right="archive"
            label="Export em excel"
            no-caps
            @click="exportToExl"
          />
        </div>

        <q-space />

        <q-select
          outlined
          rounded
          dense
          options-dense
          v-model="filterGender"
          :options="optionsGender"
          label="Filtrar por sexo"
          emit-value
          map-options
          style="width: 150px"
          class="q-mr-lg"
        />

        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:no-data>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon
            size="2em"
            name="sentiment_dissatisfied"
          />
          <span>Nenhum valor encontrado</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import exportFromJSON from 'export-from-json'

export default {
  props: ["users"],
  data () {
    return {
      optionsGender: [
        {
          label: "Todos",
          value: "all",
        },
        {
          label: "Masculino",
          value: true,
        },
        {
          label: "Feminino",
          value: false,
        },
        {
          label: "Indefinido",
          value: "",
        },
      ],
      filterGender: null,
      filter: "",
      visibleColumns: [
        "telephone",
        "email",
        "gender",
        "date",
        "deficiency",
        "profession",
        "association",
      ],
      tableColumns: [
        {
          name: "name",
          required: true,
          label: "Nome",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "telephone",
          align: "center",
          label: "Telefone",
          field: "telephone",
          sortable: true,
        },
        { name: "email", label: "Email", field: "email", sortable: true },
        { name: "gender", label: "Sexo", field: "gender" },
        { name: "date", label: "Data de nascimento", field: "date" },
        { name: "deficiency", label: "Deficiência", field: "deficiency" },
        {
          name: "profession",
          label: "Profissão",
          field: "profession",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "association",
          label: "Associação",
          field: "association",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
      tableData: [],
      listByGender: [],
      usersJson: []
    };
  },
  methods: {
    addUsersList () {
      let userList = [];
      let usersJson = [];
      const vm = this;
      this.users.forEach((element) => {
        userList.push({
          name: element.displayName,
          telephone: element.phoneNumber,
          email: element.email,
          gender: element.gender !== "" ? (element.gender ? "M" : "F") : "Não definido",
          date: element.date,
          deficiency: element.deficiency,
          profession: element.profession ? element.profession : "",
          association: element.association && element.association.label
            ? element.association.label
            : "Não associado",
        });
        usersJson.push({
          Nome: element.displayName,
          Telefone: element.phoneNumber,
          Email: element.email,
          Género: element.gender !== "" ? (element.gender ? "M" : "F") : "Não definido",
          "Data de Nascimento": element.date,
          Deficiência: element.deficiency,
          Profissão: element.profession ? element.profession : "",
          Associação: element.association && element.association.label
            ? element.association.label
            : "Não associado",
        });
      });
      vm.tableData = userList;
      vm.usersJson = usersJson
    },
    filterByGender (gender) {
      let userList = []
      this.users.forEach((element) => {
        if (element.gender == gender && typeof (gender) !== "string") {
          userList.push({
            name: element.displayName,
            telephone: element.phoneNumber,
            email: element.email,
            gender: element.gender !== "" ? (element.gender ? "M" : "F") : "",
            date: element.date,
            deficiency: element.deficiency,
            profession: element.profession ? element.profession : "",
            association: element.association
              ? element.association
              : "Não associado",
          });
        } else if (element.gender === gender && gender === "") {
          userList.push({
            name: element.displayName,
            telephone: element.phoneNumber,
            email: element.email,
            gender: element.gender !== "" ? (element.gender ? "M" : "F") : "",
            date: element.date,
            deficiency: element.deficiency,
            profession: element.profession ? element.profession : "",
            association: element.association
              ? element.association
              : "Não associado",
          });
        } else if (gender === "all") {
          userList.push({
            name: element.displayName,
            telephone: element.phoneNumber,
            email: element.email,
            gender: element.gender !== "" ? (element.gender ? "M" : "F") : "",
            date: element.date,
            deficiency: element.deficiency,
            profession: element.profession ? element.profession : "",
            association: element.association
              ? element.association
              : "Não associado",
          });
        }
      });
      this.tableData = userList;
    },
    exportTable () {
      // naive encoding to csv format
      const data = this.usersJson
      const fileName = 'users'
      const exportType = 'csv'

      exportFromJSON({ data, fileName, exportType })
    },


    exportToExl () {
      const data = this.usersJson
      const fileName = 'users'
      const exportType = 'xls'

      exportFromJSON({ data, fileName, exportType })
    }
  },
  mounted () {
    this.addUsersList();
  },
  watch: {
    users (val) {
      if (val) {
        this.addUsersList();
      }
    },
    filterGender (val) {
      this.filterByGender(val)
    }
  },
};
</script>

<style>
</style>