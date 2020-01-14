<template>
  <q-page class="q-pt-lg">
    <!-- content -->
    <div class="q-mt-lg">
      <q-tab-panels v-model="tab" animated swipeable class="bg-white">
        <q-tab-panel name="details" style="padding: 0;">
          <q-card bordered class="my-card col-sm-12">
            <q-card-section>
              <div class="text-h6">Descricao</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section class="row" v-for="i in 3" :key="i">
              <div class="col text-center">
                <q-icon name="arrow_forward_ios" />
              </div>
              <div
                class="col-11 text-body1"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure animi adipisci itaque deleniti error ipsam blanditiis nostrum maxime, pariatur, corporis architecto consequuntur. Voluptates quis rerum quam ex eos. Corrupti, ipsam!</div>
            </q-card-section>
          </q-card>
        </q-tab-panel>

        <q-tab-panel name="aplayed" style="padding: 0;">
          <q-list separator>
            <q-item clickable v-ripple to="/profile/vacancy/details/employee">
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Antonio Armando</q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <q-page-sticky expand position="top" class="bg-white">
      <div class="shadow-2" style="width: 100vw;">
        <q-tabs v-model="tab" class="text-teal" align="justify">
          <q-tab name="details" label="Detalhes" />
          <q-tab name="aplayed" label="Candidatos" />
        </q-tabs>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      tab: "details"
    };
  }
};
</script>
