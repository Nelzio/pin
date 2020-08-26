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
        },
        {
          name: "Ice cream sandwich",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 37,
        },
        {
          name: "Eclair",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 23,
        },
        {
          name: "Cupcake",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 67,
        },
        {
          name: "Gingerbread",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 49,
        },
        {
          name: "Jelly bean",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 94,
        },
        {
          name: "Lollipop",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 98,
        },
        {
          name: "Honeycomb",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 87,
        },
        {
          name: "Donut",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 51,
        },
        {
          name: "KitKat",
          email: "nelziositoe@gmail.com",
          telephone: "+258841224724",
          numVacancies: 65,
        },
      ],
    };
  },
};
</script>