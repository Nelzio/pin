<template>
  <q-page>
    <div class="statistics">
      <Statistics />
    </div>
		<div class="row">
			<Vacancies class="col-6 q-pa-md" />
			<Candidatures class="col-6 q-pa-md" />
		</div>
  </q-page>
</template>

<script>
import Statistics from "components/admin/Statistics"
import Vacancies from "components/admin/Vacancies"
import Candidatures from "components/admin/Candidatures"
export default {
	components: {Statistics, Vacancies, Candidatures}
};
</script>

<style>
</style>