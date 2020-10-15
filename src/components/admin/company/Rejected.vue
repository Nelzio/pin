<template>
  <div>
    <q-table
      title="Empresas aprovadas"
      :data="dataTable"
      :columns="columns"
      row-key="name"
      :filter="filter"
      role="table"
    >
      <template v-slot:top-left>
        <div class="row q-gutter-x-sm">
          <div class="text-h6">
            Empresas Rejeitadas
          </div>
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
      </template>
      <template v-slot:top-right>
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
      <template v-slot:body="props">
        <q-tr
          :props="props"
          @click="getCompanyDetails(props.row.compony)"
        >
          <q-td
            key="compony"
            :props="props"
          >{{ props.row.name }}</q-td>
          <q-td
            key="email"
            :props="props"
          >{{ props.row.email }}</q-td>
          <q-td
            key="telephone"
            :props="props"
          >{{ props.row.telephone }}</q-td>
          <q-td
            key="numVacancies"
            :props="props"
          >{{ props.row.numVacancies }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import exportFromJSON from 'export-from-json'
export default {
  props: ["data"],
  data () {
    return {
      filter: "",
      columns: [
        {
          name: "compony",
          required: true,
          label: "Nome da empresa",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "email",
          align: "center",
          label: "Email",
          field: "email",
          sortable: true,
        },
        {
          name: "telephone",
          label: "Telefone",
          field: "telephone",
          sortable: true,
        },
        {
          name: "numVacancies",
          label: "Numero de vagas",
          field: "numVacancies",
        },
      ],
      dataTable: [
        {
          name: "",
          email: "",
          telephone: "",
          numVacancies: null,
          compony: {}
        },
      ],
      dataJson: []
    };
  },
  methods: {
    getCompanyDetails (compony) {
      this.$root.$emit("companyToEvaluation", compony)
    },
    displayDatas (list) {
      console.log(list)
      const vm = this;
      let data = [];
      let dataJson = [];
      list.forEach((element) => {
        data.push({
          name: element.displayName,
          email: element.email,
          telephone: element.phoneNumber,
          numVacancies: element.numVacancies,
          compony: element
        });
        dataJson.push({
          Nome: element.displayName,
          Email: element.email,
          Telefone: element.phoneNumber,
          "Numero de vagas": element.numVacancies,
        });
      });
      this.dataTable = data;
      this.dataJson = dataJson
    },
    exportTable () {
      // naive encoding to csv format
      const data = this.dataJson
      const fileName = 'rejectedCompanies'
      const exportType = 'csv'

      exportFromJSON({ data, fileName, exportType })
    },


    exportToExl () {
      const data = this.dataJson
      const fileName = 'rejectedCompanies'
      const exportType = 'xls'

      exportFromJSON({ data, fileName, exportType })
    }
  },
  mounted () {
    this.displayDatas(this.data);
  },
  watch: {
    data (val) {
      this.displayDatas(val);
    },
  },
};
</script>