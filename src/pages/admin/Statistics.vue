<template>
  <q-page padding>
    <div>
      <q-card class="my-card">
        <Users />
      </q-card>
      <q-card class="my-card">
        <Vacancies />
      </q-card>
      <q-card class="my-card">
        <Store />
      </q-card>

    </div>
  </q-page>
</template>

<script>
import Users from "components/admin/statistics/Users"
import Vacancies from "components/admin/statistics/Vacancies"
import Store from "components/admin/statistics/Store"
export default {
  data () {
    return {}
  },
  components: { Users, Vacancies, Store },
  methods: {},
  mounted () { }

}
</script>

<style>
</style>