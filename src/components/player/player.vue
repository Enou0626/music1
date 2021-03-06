<template>
  <div class="player" v-show="playList.length>0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <transition name="cd">
          <div class="middle" v-show="fullScreen">
            <div class="middle-l" ref="middleL">
              <div class="cd-wrapper" ref="cdWrapper">
                <div class="cd" :class="cdCls">
                  <img class="image" :src="currentSong.image">
                </div>
              </div>
              <div class="playing-lyric-wrapper">
                <div class="playing-lyric">{{playingLyric}}</div>
              </div>
            </div>
          </div>
        </transition>
        <div class="volumn">
          <p>{{volume}}</p>
          <span class="left" @click="upVolumn">+</span>
          <span class="right" @click="downVolumn">-</span>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <!-- <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>-->
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @changedPrecent="onChangePrecent"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click="changeMode">
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i @click="prev" class="icon-prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i @click="togglePlaying" :class="playIcon"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i
                @click="toggleFavorite(currentSong)"
                class="icon"
                :class="getFavoriteIcon(currentSong)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :percent="percent">
            <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
          </progress-circle>
        </div>
        <div class="control" @click.stop>
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      :src="currentSong.url"
      @timeupdate="timeUpdate"
      @canplay="ready"
      @error="error"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
// import * as type from "store/mutation-types";
import { mapState, mapGetters, mapMutations } from "vuex";
import ProgressBar from "base/progress-bar/progress-bar";
import progressCircle from "base/progress-circle/progress-circle";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";
export default {
  name: "player",
  components: { ProgressBar, progressCircle },
  data() {
    return {
      playingLyric: "",
      songReady: false,
      currentTime: "",
      volume: 4
    };
  },
  mounted() {
    // console.log(this._getPosAndScale());
  },
  computed: {
    ...mapState([
      "playing",
      "fullScreen",
      "playList",
      "currentIndex",
      "mode",
      "sequenceList"
    ]),
    ...mapGetters(["currentSong"]),
    iconMode() {
      return this.mode === playMode.sequence
        ? "icon-sequence"
        : this.mode === playMode.loop
        ? "icon-loop"
        : "icon-random";
    },
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    playIcon() {
      return this.playing ? "icon-pause" : "icon-play";
    },
    miniIcon() {
      return this.playing ? "icon-pause-mini" : "icon-play-mini";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    }
  },
  watch: {
    currentSong(newData) {
      const audio = this.$refs.audio;

      this.$nextTick(() => {
        audio.play();
      });
    },
    playing(newData) {
      const audio = this.$refs.audio;

      if (newData) {
        this.$nextTick(() => {
          audio.play();
          audio.volume = 0.4;
        });
      } else {
        audio.pause();
      }
    },
    mode(mode) {
      if (mode === playMode.random) {
        const playListR = shuffle(this.sequenceList);
        const currentIndex = playListR.findIndex(item => {
          return item.id === this.currentSong.id;
        });
        this.setPlayList(playListR);
        this.setCurrentIndex(currentIndex);
      } else {
        const currentIndex = this.sequenceList.findIndex(item => {
          return item.id === this.currentSong.id;
        });
        this.setCurrentIndex(currentIndex);
        this.setPlayList(this.sequenceList);
      }
    },
    volume(newData, oldData) {
      if (newData > 9) {
        this.volume = 10;
      }
      if (newData < 1) {
        this.volume = 0;
      }
    }
  },
  methods: {
    ...mapMutations([
      "setFullScreen",
      "setPlayingState",
      "setCurrentIndex",
      "setPlayMode",
      "setPlayList"
    ]),
    end() {
      if (this.mode === playMode.loop) {
        const audio = this.$refs.audio;
        audio.currentTime = 0;
        audio.play();
      } else {
        this.next();
      }
    },
    upVolumn() {
      this.volume += 1;
      this.$nextTick(() => {
        this.$refs.audio.volume = this.volume / 10;
      });
    },
    downVolumn() {
      this.volume -= 1;
      this.$nextTick(() => {
        this.$refs.audio.volume = this.volume / 10;
      });
    },
    onChangePrecent(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent;
    },
    format(time) {
      let minute = (time / 60) | 0;
      let second = this._pad(time % 60 | 0);
      return `${minute}:${second}`;
    },
    _pad(num, n = 2) {
      let strLength = num.toString().length;
      while (strLength < n) {
        num = "0" + num;
        strLength++;
      }
      return num;
    },
    timeUpdate(e) {
      this.currentTime = e.target.currentTime;
    },
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    changeMode() {
      let currentMode = (this.mode + 1) % 3;
      this.setPlayMode(currentMode);
    },
    prev() {
      let currentIndex =
        this.currentIndex === 0
          ? this.playList.length - 1
          : this.currentIndex - 1;
      if (this.songReady) {
        this.setCurrentIndex(currentIndex);
        this.songReady = false;
      }
    },
    togglePlaying() {
      this.setPlayingState(!this.playing);
    },
    next() {
      let currentIndex =
        this.currentIndex === this.playList.length - 1
          ? 0
          : this.currentIndex + 1;
      if (this.songReady) {
        this.setCurrentIndex(currentIndex);
        this.songReady = false;
      }
    },
    toggleFavorite() {},
    getFavoriteIcon() {},
    _getPosAndScale() {
      const targetWidth = 40;
      const paddingLeft = 40;
      const paddingBottom = 30;
      const paddingTop = 80;
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale
      };
    },
    ready(e) {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    }
    // enter() {},
    // afterEnter() {},
    // leave() {},
    // afterLeave() {}
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.cd-enter-active {
  animation: cd-in 0.5s;
}

.cd-leave-active {
  animation: cd-in 1s reverse;
}

@keyframes cd-in {
  0% {
    transform: translate3d(-171.5 px, 415.8px, 0) scale(0.1);
  }

  10% {
    transform: translate3d(-150.5 px, 355.8px, 0) scale(0.2);
  }

  20% {
    transform: translate3d(-130.5 px, 305.8px, 0) scale(0.3);
  }

  30% {
    transform: translate3d(-110.5 px, 255.8px, 0) scale(0.4);
  }

  40% {
    transform: translate3d(-90 px, 200.8px, 0) scale(0.5);
  }

  50% {
    transform: translate3d(-75 px, 150 px, 0) scale(0.6);
  }

  60% {
    transform: translate3d(-30 px, 100 px, 0) scale(0.8);
  }

  70% {
    transform: translate3d(-15 px, 50px, 0) scale(0.9);
  }

  80% {
    transform: translate3d(-10 px, 30px, 0) scale(1);
  }

  90% {
    transform: translate3d(0 px, 0px, 0) scale(1.1);
  }

  100% {
    transform: translate3d(0px, 0, 0) scale(1);
  }
}

.volumn {
  text-align: center;
  top: 60%;
  position: relative;

  span {
    padding: 5px 10px;
    border: 1px solid gray;
  }
}

.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;

        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            &.play {
              animation: rotate 20s linear infinite;
            }

            &.pause {
              animation-play-state: paused;
            }

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.7s;

      .top, .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }

    &.normal-enter, &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;

    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }

    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }

    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;

      img {
        border-radius: 50%;

        &.play {
          animation: rotate 10s linear infinite;
        }

        &.pause {
          animation-play-state: paused;
        }
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;

      .name {
        margin-bottom: 2px;
        no-wrap();
        font-size: $font-size-medium;
        color: $color-text;
      }

      .desc {
        no-wrap();
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }

    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;

      .icon-play-mini, .icon-pause-mini, .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }

      .icon-mini {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>