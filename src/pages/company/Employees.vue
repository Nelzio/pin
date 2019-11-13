<template>
  <q-page padding>
    <!-- content -->
    <div>
      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Candidato</th>
            <th class="text-right">Profissao</th>
            <th class="text-right">Telefone</th>
            <th class="text-right">Email</th>
            <th class="text-right">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 14" :key="i">
            <td class="text-left">
              <q-avatar color="red" text-color="white">
                <q-img src="https://alpinepc.com/wp-content/uploads/2011/07/Opi51c74dfa1fef6.png" spinner-color="white" />
              </q-avatar>
              Nelzio Sitoe
            </td>
            <td class="text-right">Carpinteiro</td>
            <td class="text-right">841224724</td>
            <td class="text-right">nelziositoe@gmail.com</td>
            <td class="text-right q-gutter-md">
              <q-btn color="white" text-color="black" icon="info" label="Informação" to="/company/employee" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
