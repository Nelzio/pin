<template>
  <q-page padding v-touch-swipe.mouse.left.right="handleSwipe" class="q-pb-xl">
    <!-- content -->
    <div class="q-pb-xl">
      
      <div v-if="!val_search && !filterVal" class="row q-gutter-y-md justify-center">
        <div class="col-12 col-md-8" :class="padding" v-for="vacancy in vacancies" :key="vacancy.key">
          <vacancy-desktop-component :lorem="lorem" :vacancy="vacancy" />
        </div>
      </div>
      <div v-else class="row q-gutter-y-md justify-center">
        <div class="col-12 col-md-8" :class="padding" v-for="vacancy in data_var" :key="vacancy.key">
          <vacancy-desktop-component :lorem="lorem" :vacancy="vacancy" />
        </div>
      </div>
    </div>

    <div v-if="!vacancies.length" class="row justify-center">
      <div class="col-12 col-md-8 q-pa-md" v-for="i in 6" :key="i">
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" />
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-skeleton height="500px" square />

          <q-card-actions align="right" class="q-gutter-md">
            <q-skeleton type="QBtn" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- <div v-else>
      <q-list>
        <q-card class="my-card" v-for="(vacancy, i) in vacancies" :key="i">
          <vacancy-component :vacancy="vacancy"/>
        </q-card>
        
      </q-list>
    </div>-->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        :color="darkModeConf.color"
        :class="darkModeConf.textBtn"
        to="/profile/vacancy/add" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
import VacancyComponent from "../../components/work/VacancyComponent"
import VacancyDesktopComponent from "../../components/work/VacancyDesktopComponent"
export default {
  components: { VacancyDesktopComponent, VacancyComponent },
  name: 'Vacancies',
  props: ['val_search', 'filterVal'],
  data() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      padding: "",
      maximizedToggle: true,
      deviceWidth: 375,
      addVacancy: false,
      text: '',
      description: '',
      valSearch: '',


      data_var: []
    };
  },
  computed: {
    ...mapState("settings", ["settings", "appMode", "darkModeConf"]),
    ...mapState("vacancy", ["vacancies", "vacancy"]),
    ...mapGetters('vacancy', [
        'getVacancies', 'getVacancy'
    ]),
  },
  methods: {
    // ...mapActions("settings", ["setSettings", "playSound", "vibrate"]),
    ...mapActions("vacancy", ["listVacancy", "createVacancy"]),
    ...mapActions("user", ["detailUser"]),

    handleSwipe(val) {
      if (val.direction === "left") {
        this.$router.push("/store");
      }

      if (val.direction === "right") {
        this.$router.push("/home");
      }
    },
    search(val) {
      if(val != ''){
      var temp =  new RegExp(".*"+val+".*")
      var items = []
      var vacancies = this.vacancies
      for(var i in vacancies){
        var value = vacancies[i]["title"].match(temp)
        var valueDesc = vacancies[i]["description"].match(temp)
        var valuePlace = vacancies[i]["place"].match(temp)
        var valueCategory = vacancies[i]["category"].match(temp)
        if(value != null && valueDesc != null){
          if(vacancies[i]["title"] == value[0] && vacancies[i]["description"] == valueDesc[0]){
            items.push(vacancies[i])
          }
        } else if(value != null){
          if(vacancies[i]["title"] == value[0]){
            items.push(vacancies[i])
          }
        } else if(valueDesc != null){
          if(vacancies[i]["description"] == valueDesc[0]){
            items.push(vacancies[i])
          }
        } else if(valuePlace != null){
          if(vacancies[i]["place"] == valuePlace[0]){
            items.push(vacancies[i])
          }
        } else if(valueCategory != null){
          if(vacancies[i]["category"] == valueCategory[0]){
            items.push(vacancies[i])
          }
        }
      }
      this.data_var = items.slice(0, 2)
      }
      else{
        this.data_var = []
      }
    }
  },
  created () {
    this.listVacancy()
  },
  mounted() {
    this.deviceWidth = window.screen.width;
    if (this.$q.screen.gt.sm) this.padding = "q-pa-sm";
    // console.log(this.deviceWidth)

    this.$root.$emit("isHomePage", "Vagas");

    // Vibração
    if (this.settings.isVibrationActive) {
      this.vibrate();
    }
    // Play do áudio
    if (this.settings.isNarratorActive) {
      this.playSound("/statics/audios/vagas.aac");
    }
    console.log("Nelzio")
    // this.listVacancy()

    // this.$on("valueSearch") 
  },
  watch: {
    val_search (val) {
      this.search(val)
    },
    filterVal (val) {
      this.search(val)
    },
  }
};
</script>
