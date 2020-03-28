<template>
  <q-page padding>
    <!-- content -->
     <q-btn color="white" text-color="black" label="Speack" @click="speak()" />
    
  </q-page>
</template>

<script>
import textToSpeech from "@google-cloud/text-to-speech"
// import VueTextToSpeech from "vue-text-to-speech"
import fs from "fs"
import util from "util"
export default {
  // name: 'PageName',
  // components: {
  //   VueTextToSpeech
  // },
  name: 'textToSpeatch',
  data() {
    return {
      userInput: 'Seja louvado o Nosso Senhor.',
      pitch: 0.9,
      rate: 0.8,
      synth: window.speechSynthesis,
      validation: false
    }
  },
  methods: {
    speak() {
      if (this.synth.speaking) {
        // console.error('speechSynthesis.speaking');
        return;
      }
      if (this.userInput !== '') {
          this.validation = false;
          let sInstance = new SpeechSynthesisUtterance(this.userInput);
          sInstance.onend = function (event) {
              // console.log('SpeechSynthesisUtterance.onend');
          }
          sInstance.onerror = function (event) {
              // console.error('SpeechSynthesisUtterance.onerror');
          }

          sInstance.pitch = this.pitch;
          sInstance.rate = this.rate;
          this.synth.speak(sInstance);
      } else {
        this.validation = true;
      }
    }
  }
};
</script>
