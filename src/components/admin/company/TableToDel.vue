<template>
  <div class="q-pa-md">
    <q-table
      grid
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
      role="table"
    >
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
    </q-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      columns: [
        {
          name: 'vacancy',
          required: true,
          label: 'Título da vaga',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'company', align: 'center', label: 'Empresa', field: 'company', sortable: true },
        { name: 'candidatures', label: 'Numero de candidatos', field: 'candidatures', sortable: true },
        { name: 'limitDate', label: 'Data limite da vaga', field: 'limitDate' }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          company: 159,
          candidatures: 6.0,
          limitDate: 24
        },
        {
          name: 'Ice cream sandwich',
          company: 237,
          candidatures: 9.0,
          limitDate: 37
        },
        {
          name: 'Eclair',
          company: 262,
          candidatures: 16.0,
          limitDate: 23
        },
        {
          name: 'Cupcake',
          company: 305,
          candidatures: 3.7,
          limitDate: 67
        },
        {
          name: 'Gingerbread',
          company: 356,
          candidatures: 16.0,
          limitDate: 49
        },
        {
          name: 'Jelly bean',
          company: 375,
          candidatures: 0.0,
          limitDate: 94
        },
        {
          name: 'Lollipop',
          company: 392,
          candidatures: 0.2,
          limitDate: 98
        },
        {
          name: 'Honeycomb',
          company: 408,
          candidatures: 3.2,
          limitDate: 87
        },
        {
          name: 'Donut',
          company: 452,
          candidatures: 25.0,
          limitDate: 51
        },
        {
          name: 'KitKat',
          company: 518,
          candidatures: 26.0,
          limitDate: 65
        }
      ]
    }
  }
}
</script>