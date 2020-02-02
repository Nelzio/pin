<template>
  <q-page padding>
    <!-- content -->
    <q-btn color="white" text-color="black" label="Record" @click="recordAudio()" />
    <q-btn color="white" text-color="black" label="Stop" @click="stopRecord()" />
    <q-btn color="white" text-color="black" label="Play" @click="playRecord()" />
    <q-btn color="white" text-color="black" label="Pause" @click="pauseRecord()" />
<br>

    <div>
      <q-card class="q-pt-none q-pb-none">
        <q-card-section class="q-pb-none q-pt-none">
          <div class="text-weight-bold">Nélzio Sitoe</div>
        </q-card-section>
        <q-card-section class="row items-center no-wrap q-pt-none q-pl-none q-pb-none">
          <q-btn flat round icon="play_arrow" size="lg" @click="playBtn()" />
          <q-linear-progress :value="progress" color="primary" />
        </q-card-section>
      </q-card>
    </div>

    <q-footer>
      <q-toolbar class="bg-grey-3 text-black row">
        <!-- <q-btn round flat icon="insert_emoticon" class="q-mr-sm" /> -->
        <q-input v-if="recording" v-model="fullTimer" rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" disable />
        <q-input v-else rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="Type a message" />
        <q-btn v-if="message" round flat icon="send" />
        <q-btn v-else-if="!recording" round flat icon="mic" @click="recordAudio()" />
        <q-btn v-else round flat icon="stop" color="red" @click="stopRecord()" />
      </q-toolbar>
    </q-footer>
    
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      mediaRecorder: null,
      audioChunks: [],
      audioUrl: null,
      timer: {
        mm: 0,
        ss: 0,
      },
      fullTimer: "00min : 00sec",
      recording: false,
      refreshInterval: null,
      message: "",
      timeslice: null,
      progress: 0,
      playing: false,
      audio: null
    }
  },

  methods: {
    recordAudio () {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // Record Audio
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.counter()
        this.recording = true

        // Save recorded data Chunks in a list
        this.audioChunks = [];
        this.mediaRecorder.addEventListener("dataavailable", event => {
          this.audioChunks.push(event.data);
        });
      });
    },

    stopRecord () {
      // // // // // // // navigator.mediaDevices.getUserMedia({ audio: true })
      // // // // // // // .then(stream => {
        // const mediaRecorder = new MediaRecorder(stream);
        this.recording = false
        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(this.audioChunks);
          this.audioUrl = URL.createObjectURL(audioBlob);
          console.log(audioBlob)
        });
        this.mediaRecorder.stop();
        clearInterval(this.refreshInterval);
        console.log(this.timer.ss)
      // // // // // // // });
    },
    playRecord () {
      if (!this.playing) {
      this.audio = new Audio(this.audioUrl);
      this.playing = true
      }
      this.audio.play();
    },
    pauseRecord () {
      this.audio.pause();
    },

    counter () {
      const vm = this
      var totalSeconds = 0;
      this.refreshInterval = setInterval(setTime, 1000);

      function setTime() {
        ++totalSeconds;
        vm.timer.ss = totalSeconds % 60
        vm.timer.mm = totalSeconds / 60
        vm.fullTimer = pad(parseInt(totalSeconds / 60)) + "min : " + pad(totalSeconds % 60) + "sec"
      }

      function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
      }
    },

    playBtn () {
      var i = 0
      var inte = 100/(100*30)
      console.log("Nigga")
      var inter = setInterval(() => {
        i += inte
        if(i >= 1) {
          console.log("done")
          stopInter()
          this.progress = 0
          return
        }
        this.progress = i
        console.log(i)
      }, 1000)


      

      function stopInter () {
        clearInterval(inter)
      }
    }
  },
  watch: {
    audioChunks () {
      console.log(this.audioChunks)
    }
  }
}
</script>
