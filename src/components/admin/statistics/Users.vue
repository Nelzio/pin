<template>
  <div>
    <div class="text-h5 q-ma-sm">
      Usuários
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
                Numero de usuários
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
                Numero de usuários do sexo feminino
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
                Usuários candidatos
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
                Usuários auto emprego
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
                Usuários com emprego
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
                Usuários desempregados
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
          <div class="col-8">
            <TimeLine />
          </div>
          <div class="col-4">
            <Gender />
          </div>
        </div>
        <q-separator size="2px" />
        <div class="row">
          <div class="col-6">
            <Vacancies />
          </div>
          <div class="col-6">
            <Business />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeLine from "./graphs/users/TimeLine"
import Gender from "./graphs/users/Gender"
import Business from "./graphs/users/Business"
import Vacancies from "./graphs/users/Vacancies"
export default {
  components: { TimeLine, Gender, Business, Vacancies }

}
</script>

<style>
</style>