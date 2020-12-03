<template>
  <div>
    <q-media-player
      v-if="videoUrl"
      type="video"
      :sources="sources"
      mobile-mode
    />
  </div>
</template>
<script>
/**
 * 注意：
 * vue-video-player引入方式为
 * import { videoPlayer } from 'vue-video-player
 */
import VideoPlayer from "vue-video-player-vjs"
import "video.js/dist/video-js.css"
import "vue-video-player-vjs/styles/index.css"

export default {
  name: "App",
  components: { VideoPlayer },
  props: ["videoUrl"],
  data() {
    return {
      poster: "media/TearsOfSteel/TearsOfSteel.jpeg",
      sources: null,
    }
  },
  computed() {},
  methods: {
    getStorageFileType(file) {
      const name = file.split("%2F")[1].split("?")[0]
      const type = "video/" + name.split(".")[name.split(".").length - 1]
      return type
    },
  },
  mounted() {
    // console.log(this.videoUrl);
    // console.log(this.playerOptions.sources);
    this.sources = [
      {
        src: this.videoUrl,
        type: this.getStorageFileType(this.videoUrl),
      },
    ]
  },
}
</script>