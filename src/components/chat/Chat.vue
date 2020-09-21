<template>
  <div>
    <div v-if="message.sender !== user.email">
      <q-chat-message
        v-if="!message.audio"
        :class="getFont.text"
        :text="[message.message]"
        :avatar="message.imgUserUrl"
        :stamp="message.timeSend.getHours() + 'horas:' + message.timeSend.getMinutes() + 'minutos'"
        role="article"
      />
      <q-chat-message
        v-else
        :class="getFont.text"
        class="voice"
        :avatar="message.imgUserUrl"
        :stamp="message.timeSend.getHours() + 'horas:' + message.timeSend.getMinutes() + 'minutos'"
        bg-color="white"
        size="8"
        role="audio"
      >
        <q-card class="q-pt-none q-pb-none voice">
          <q-card-section class="row items-center no-wrap q-pt-none q-pl-none q-pb-none">
            <q-btn
              flat
              round
              :icon="playing ? 'pause' : 'play_arrow'"
              size="lg"
              :lang="pt-PT"
              aria-label="playing ? 'Pausar audio' : 'Ouvir audio'"
              @click="playing ? pauseRecord() : playRecord(message.audio)"
              role="button"
            />
            <q-linear-progress
              :value="progress"
              color="primary"
            />
          </q-card-section>
        </q-card>
      </q-chat-message>
    </div>
    <div v-else>
      <q-chat-message
        v-if="!message.audio"
        :class="getFont.text"
        :text="[message.message]"
        :stamp="message.timeSend.getHours() + 'horas:' + message.timeSend.getMinutes() + 'minutos'"
        sent
        role="article"
      />
      <q-chat-message
        v-else
        :class="getFont.text"
        sent
        :stamp="message.timeSend.getHours() + 'horas:' + message.timeSend.getMinutes() + 'minutos'"
        bg-color="white"
        size="8"
        role="audio"
      >
        <q-card class="q-pt-none q-pb-none voice">
          <q-card-section class="row items-center no-wrap q-pt-none q-pl-none q-pb-none">
            <q-btn
              flat
              round
              :icon="playing ? 'pause' : 'play_arrow'"
              :lang="pt-PT"
              aria-label="playing ? 'Pausar audio' : 'Ouvir audio'"
              size="lg"
              @click="playing ? pauseRecord() : playRecord(message.audio)"
              role="button"
            />
            <q-linear-progress
              :value="progress"
              color="primary"
            />
          </q-card-section>
        </q-card>
      </q-chat-message>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  props: ["message"],
  data () {
    return {
      progress: 0,
      playing: false,
      audio: null,
      pausedTime: 0,
      counter: null
    };
  },
  computed: {
    ...mapGetters("auth", ["user", "userData"]),
    ...mapGetters("settings", ["getFont"])
  },
  methods: {
    playRecord (audio) {
      if (this.progress == 0) {
        this.audioUrl = audio;
        this.audio = new Audio(this.audioUrl.audioUrl);
      }
      this.audio.play();
      // this.audio.resume();
      this.playing = true;
      this.playBtn(this.audioUrl.time, this.pausedTime);
    },

    pauseRecord () {
      this.playing = false;
      this.pausedTime = this.progress;
      this.progress = this.pausedTime;
      clearInterval(this.counter);
      this.audio.pause();
    },

    playBtn (val, pausedTime) {
      var i = 0;
      const vm = this;
      if (pausedTime > 0) i = pausedTime;
      var inte = 100 / (100 * val);
      console.log("Nigga");
      this.counter = setInterval(() => {
        i += inte;
        if (i >= 1) {
          console.log("done");
          stopInter();
          this.progress = 0;
          this.pausedTime = 0;
          this.playing = false;
          return;
        }
        this.progress = i;
        console.log(i);
      }, 1000);

      function stopInter () {
        clearInterval(vm.counter);
      }
    }
  },
  mounted () {
    // console.log(this.message)
  }
};
</script>
