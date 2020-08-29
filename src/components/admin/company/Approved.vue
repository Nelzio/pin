<template>
  <div>
    <q-table
      title="Empresas aprovadas"
      :data="dataTable"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="getCompanyDetails(props.row.compony)">
          <q-td key="compony" :props="props">{{ props.row.name }}</q-td>
          <q-td key="email" :props="props">{{ props.row.email }}</q-td>
          <q-td key="telephone" :props="props">{{ props.row.telephone }}</q-td>
          <q-td key="numVacancies" :props="props">{{ props.row.numVacancies }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
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
      companies: {}
    };
  },
  methods: {
    getCompanyDetails(compony) {
      console.log(compony)
      this.$root.$emit("companyToEvaluation", compony)
    },
    displayDatas(list) {
      const vm = this;
      let data = []
      list.forEach(element => {
        console.log(element)
        data.push({
          name: element.displayName,
          email: element.email,
          telephone: element.phoneNumber,
          numVacancies: 65,
          compony: element
        })
      });
      console.log(data)
      this.dataTable = data
    }
  },
  mounted() {
    this.displayDatas(this.data);
  },
  watch: {
    data(val) {
      this.displayDatas(val)
    }
  }
};
</script>