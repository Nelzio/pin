<template>
  <div>
    <q-page>
      <div class="row">
        <div class="col-12">
          <Table />
          <AddAssociation />
          <EditAssociation />
        </div>
      </div>
    </q-page>
    <Details />
  </div>
</template>

<script>
import Table from "components/admin/associations/Table";
import Details from "components/admin/associations/Details";
import AddAssociation from "components/admin/associations/AddAssociation";
import EditAssociation from "components/admin/associations/EditAssociation";
export default {
  components: { Table, Details, AddAssociation, EditAssociation },
};
</script>

<style>
</style>