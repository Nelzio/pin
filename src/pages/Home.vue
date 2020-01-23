<template>
  <q-page class="presentation" padding>
    <div v-if="!$q.screen.gt.sm" class="q-gutter-y-lg">
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-card-section class="text-body1">Procure e encontre emprego</q-card-section>
          <q-img class="col-5" src="statics/img/home/djob.png" />
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-img class="col-5" src="statics/img/home/business.png" />
          <q-card-section class="text-body1">Exponha os seus produtos e serviços</q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-card-section class="text-body1">Encontre oportunidades de negocio</q-card-section>
          <q-img class="col-5" src="statics/img/home/deal.png" />
        </q-card-section>
      </q-card>
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-img class="col-5" src="statics/img/home/inclusive.png" />
          <q-card-section class="text-body1">Aplicativo inclusivo</q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div v-else class="q-gutter-y-lg q-pa-lg">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Vagas de emprego</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/djob.png" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/business.png" />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Exposição de produtos</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Negocio</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/deal.png" />
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img class="rounded-borders" src="statics/img/home/inclusive.png" />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">Negocio</div>
            <div
              class="text-body1"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  }
};
</script>

<style lang="sass">
  // .presentation
  //   background: url("../statics/img/background/background.svg") center bottom no-repeat
  //   background-size: 100vh 100vw
    
</style>

