<template>
  <div>
    <q-page>
      <VacancyDetails />
      <Candidates />
    </q-page>
    <Evaluation />
  </div>
</template>

<script>
import VacancyDetails from "components/admin/vacancy/VacancyDetails";
import Candidates from "components/admin/vacancy/candidates/Candidates";
import Evaluation from "components/admin/vacancy/candidates/Evaluation";

export default {
  data() {
    return {};
  },
  components: {
    VacancyDetails,
    Candidates,
    Evaluation,
  },
};
</script>

<style>
</style>