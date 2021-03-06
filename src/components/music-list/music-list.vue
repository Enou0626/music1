<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="handleRandomPlay">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :probeType="3"
      :isListenScroll="true"
      @listenScroll="listenScroll"
      class="list"
      :data="songs"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :rank="rank" :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from "base/song-list/song-list";
import Scroll from "base/scroll";
import { mapActions } from "vuex";
import { playlistMixin } from "common/js/mixin";

const RESERVED_HEIGHT = 40;
export default {
  name: "",
  mixins: [playlistMixin],
  components: {
    SongList,
    Scroll
  },
  props: {
    bgImage: {
      type: String,
      default: ""
    },
    songs: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ""
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // this.$refs.scrollWrapper.style.top = `${this.$refs.bgImage.clientHeight}px`;
    this.bgImageHeight = this.$refs.bgImage.clientHeight;
    this.minTranslate = this.bgImageHeight - RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.bgImageHeight}px`;
    this.$refs.list.refresh();
  },
  activated() {
    // this.$refs.list.refresh();
  },
  computed: {
    bgStyle: function() {
      return `backgroundImage:url(${this.bgImage})`;
    }
  },
  methods: {
    ...mapActions(["randomPlay"]),
    handlePlaylist() {
      this.$refs.list.$el.style.bottom = "60px";
      this.$refs.list.refresh();
      // this.$refs.scrollWrapper.style.paddingBottom = "100px";
    },
    handleRandomPlay() {
      this.randomPlay(this.songs);
    },
    back() {
      this.$router.back();
    },
    listenScroll(pos) {
      const y = pos.y;
      let zIndex = 0;
      let scrollY = Math.max(y, -this.minTranslate);
      this.$refs.layer.style.transform = `translate3d(0, ${scrollY}px, 0)`;
      let percent = y / this.bgImageHeight;

      if (y > 0) {
        // pull down
        zIndex = 10;
        this.$refs.bgImage.style.transform = `scale(${1 + percent})`;
      }

      if (-y > this.minTranslate) {
        // arrive top
        this.$refs.bgImage.style.paddingTop = `0px`;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`; // bind fix top
        zIndex = 10;
      } else {
        this.$refs.bgImage.style.paddingTop = `70%`;
        this.$refs.bgImage.style.height = `0px`;
        this.$refs.bgImage.style.filter = `blur(${-percent * 10}px)`;
      }
      this.$refs.bgImage.style.zIndex = zIndex;
    }
  },
  data() {
    return {
      scrollY: 0
    };
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.music-list {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }

  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;

    .play-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 50;
      width: 100%;

      .play {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;

        .icon-play {
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
          font-size: $font-size-medium-x;
        }

        .text {
          display: inline-block;
          vertical-align: middle;
          font-size: $font-size-small;
        }
      }
    }

    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }

  .scroll-wrapper {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
  }

  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;

    .song-list-wrapper {
      padding: 20px 30px;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>