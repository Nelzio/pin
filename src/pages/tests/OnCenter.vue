<template>
  <q-page padding>
    <!-- content -->
    <q-btn color="white" text-color="black" label="Standard" @click="lazeItem()" />
    <div v-for="i in 20" :key="i" ref="item">
      <q-card class="my-card">
        <q-card-section class="bg-blue" style="height: 200px;"></q-card-section>
        <q-card-section>test card {{ i }}</q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
// import textToSpeech from "@google-cloud/text-to-speech"
// import VueTextToSpeech from "vue-text-to-speech"
import fs from "fs";
import util from "util";
export default {
  // name: 'PageName',
  data() {
    return {};
  },
  methods: {
    lazeItem() {
      let lazyItems = this.$refs.item;
      let active = false;
      const lazyLoad = function() {
        if (active === false) {
          active = true;
          // setTimeout(function() {
            lazyItems.forEach(function(item) {
              var position = window.innerHeight - item.getBoundingClientRect().bottom;
              var interval1 = item.getBoundingClientRect().top - 12;
              var interval2 = item.getBoundingClientRect().top + 12;
              if (position <= interval2 && position >= interval1) {
                window.navigator.vibrate(700);
                console.log(item);
              }
            });
            active = false;
          // }, 200);
        }
      };
      window.addEventListener("scroll", lazyLoad);
      window.addEventListener("resize", lazyLoad);
      window.addEventListener("orientationchange", lazyLoad);
    }
  },
  mounted() {
    // this.lazeItem()
  }
};
</script>
