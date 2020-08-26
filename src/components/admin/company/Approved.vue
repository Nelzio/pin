<template>
  <div>
    <q-table
      title="Empresas aprovadas"
      :data="data"
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
        <q-tr :props="props" @click="getCompanyDetails(props.row.vacancyId)">
          <q-td key="vacancy" :props="props">{{ props.row.name }}</q-td>
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
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "vacancy",
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
      data: [
        {
          name: "Frozen Yogurt",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 24,
          vacancyId: "asdasdasdasdasda22"
        },
        {
          name: "Ice cream sandwich",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 37,
          vacancyId: "asdasdasdasdassda22"
        },
        {
          name: "Eclair",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 23,
          vacancyId: "asdasdasda5sdasda22"
        },
        {
          name: "Cupcake",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 67,
          vacancyId: "asdasdasda2sdasda22"
        },
        {
          name: "Gingerbread",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 49,
          vacancyId: "asdasdasda6sdasda22"
        },
        {
          name: "Jelly bean",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 94,
          vacancyId: "asdasdasdasd7asda22"
        },
        {
          name: "Lollipop",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 98,
          vacancyId: "asdasda9sdasdasda22"
        },
        {
          name: "Honeycomb",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 87,
          vacancyId: "asdasdasda0sdasda22"
        },
        {
          name: "Donut",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 51,
          vacancyId: "asdasdasdasbdasda22"
        },
        {
          name: "KitKat",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 65,
          vacancyId: "asdasdasdaszdasda22"
        },
      ],
      companies: {}
    };
  },
  methods: {
    getCompanyDetails(componyId) {
      console.log(componyId)
      this.$root.$emit("companyIdToEvaluation", componyId)
    }
  }
};
</script>