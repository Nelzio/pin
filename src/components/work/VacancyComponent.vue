<template>
  <q-item
    class="q-mb-sm text-black"
    :style="appMode.modeName === 'dark' ? 'border: 2px solid white;' : ''"
    :class="[appMode.bgColor]"
    clickable
  >
    <q-item-section avatar top>
      <q-avatar>
        <q-img :src="vacancy.img" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <div>
        <q-item-label :class="[appMode.textColorOptional]">{{ vacancy.name }}</q-item-label>
        <q-item-label :class="[appMode.textColorOptional]" caption lines="4">{{ vacancy.desc }}</q-item-label>
      </div>
      <div class="row justify-end q-pt-md">
        <div>
          <q-btn
            rounded
            outline
            size="sm"
            :text-color="appMode.modeName === 'dark' ? 'white' : 'teal'"
            label="Detalhes"
            to="/vacancies/details"
          />
        </div>
        <div
          class="q-ml-xs"
          :class="appMode.modeName === 'light' ? 'text-teal' : 'text-white'"
          :style="appMode.modeName === 'light' ? 'border-radius: 20px;border: 1px solid #009688;margin-bottom: 2px' : 'border-radius: 20px;border: 1px solid white'"
        >
          <q-btn
            round
            outline
            size="sm"
            flat
            :color="appMode.modeName === 'dark' ? 'white' : ''"
            icon="volume_up"
          />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "VacancyComponent",
  props: ["vacancy"],
  computed: {
    ...mapState("settings", ["appMode"])
  }
};
</script>

<style scoped>
</style>