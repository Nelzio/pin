<template>
  <q-page>
    <div class="row">
      <div class="col-8">
        <TableList :users="users" />
      </div>
      <div class="col-4">
        <Graphs :users="users" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Graphs from "components/admin/users/Graphs";
import TableList from "components/admin/users/TableList";
import { firestoreDB } from "boot/firebase";
export default {
  data () {
    return {
      users: [],
    };
  },
  components: { Graphs, TableList },
  methods: {
    getUsers () {
      const vm = this;
      let ref = firestoreDB.collection("users");
      ref.onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          if (
            doc.data().profileType !== "organization" &&
            doc.data().profileType !== "admin"
          ) {
            vm.users.push(doc.data());
          }
        });
      });
    },
  },
  mounted () {
    this.getUsers();
  },
};
</script>

<style>
</style>