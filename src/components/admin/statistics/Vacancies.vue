<template>
  <div>
    <div class="text-h5 q-ma-sm">
      Vagas
    </div>
    <div class="row q-pa-sm">
      <div class="col-3">
        <q-card class="my-card">
          <q-card-section class="text-h5">
            Resumo
          </q-card-section>
          <q-card-section class="q-pa-none">
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Numero de anúncios vagas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  label="25"
                />

              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Numero de anúncios vagas válidas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  label="25"
                />

              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Numero de anúncios vagas expiradas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  label="25"
                />

              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Numero de vagas
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  label="25"
                />

              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Numero de vagas disponíveis
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  label="25"
                />

              </q-item-section>
            </q-item>
            <q-separator />
            <q-item
              clickable
              v-ripple
            >
              <q-item-section class="text-body1">
                Numero de vagas não disponíveis
              </q-item-section>
              <q-item-section side>
                <q-badge
                  class="text-bold text-body2"
                  color="primary"
                  text-color="white"
                  label="25"
                />

              </q-item-section>
            </q-item>
            <q-separator />
          </q-card-section>
        </q-card>

      </div>
      <div class="col-9 q-pa-sm">
        <div class="row">
          <div class="col-12">
            <TimeLineCandidatures />
          </div>
        </div>
        <q-separator size="2px" />
        <div class="row">
          <div class="col-5 shadow-2">
            <Evaluation />
          </div>
          <div class="col-7 shadow-2">
            <DisabilityEmployees />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLineCandidatures from "./graphs/vacancies/TimeLineCandidatures"
import DisabilityEmployees from "./graphs/vacancies/DisabilityEmployees"
import Evaluation from "./graphs/vacancies/Evaluation"
export default {
  components: { TimeLineCandidatures, DisabilityEmployees, Evaluation }

}
</script>

<style>
</style>