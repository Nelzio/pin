<template>
  <div>
    <VideoPlayer
      v-if="playerOptions.sources.length"
      class="vjs-custom-skin"
      :options="playerOptions"
      :playsinline="true"
    />
  </div>
</template>
<script>
/**
 * 注意：
 * vue-video-player引入方式为
 * import { videoPlayer } from 'vue-video-player
 */
import VideoPlayer from "vue-video-player-vjs";
import "video.js/dist/video-js.css";
import "vue-video-player-vjs/styles/index.css";

export default {
  name: "App",
  components: { VideoPlayer },
  props: ["videoUrl"],
  data () {
    return {
      playerOptions: {
        autoplay: false, // 自动播放，false
        controls: true, // 控制条
        preload: "auto", // 预加载
        language: "zh-CN",
        fluid: true,
        notSupportedMessage: "Video nao suportado",
        // hls直播
        sources: [],
        controlBar: {
          timeDivider: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: false,
          durationDisplay: false
        }
      }
    };
  },
  computed () {
  },
  mounted () {
    // console.log(this.videoUrl);
    // console.log(this.playerOptions.sources);
    this.playerOptions.sources = [
      {
        withCredentials: false,
        type: "video/mp4",
        src: this.videoUrl
      }
    ];
  }
};
</script>