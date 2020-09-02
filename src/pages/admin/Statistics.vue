<template>
  <q-page padding>
    <div>
      <q-card class="my-card">
        <Users />
      </q-card>
      <q-card class="my-card">
        <Vacancies />
      </q-card>

    </div>
  </q-page>
</template>

<script>
import Users from "components/admin/statistics/Users"
import Vacancies from "components/admin/statistics/Vacancies"
export default {
  data () {
    return {}
  },
  components: { Users, Vacancies },
  methods: {},
  mounted () { }

}
</script>

<style>
</style>