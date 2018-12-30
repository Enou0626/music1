<template>
  <div class="progress-bar" ref="progressBar" @click.capture="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  data() {
    return {};
  },
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newData) {
      if (!this.touching) {
        this._setBtnPosition(newData);
      }
    }
  },
  methods: {
    _setBtnPosition(percent) {
      const progress = this.$refs.progressBar.clientWidth * percent;
      const $pBt = this.$refs.progressBtn;
      this.$refs.progress.style.width = progress + "px";
      $pBt.style.transform = `translate3d(${progress - 8}px, 0 , 0)`;
    },
    progressClick(e) {
      const clickPrecent = e.offsetX / this.$refs.progressBar.clientWidth;
      this._setBtnPosition(clickPrecent);
      this.$emit("changedPrecent", clickPrecent);
    },
    progressTouchStart(e) {
      this.touchFirstX = e.touches[0].pageX;
      this.currentprogress = this.$refs.progress.clientWidth;
      this.touching = true;
      //   console.log(this.touchFirstX);
    },
    progressTouchMove(e) {
      this.touchMoveX = e.touches[0].pageX;
      let moveX = this.touchMoveX - this.touchFirstX;
      this.changedPrecent =
        (this.currentprogress + moveX) / this.$refs.progressBar.clientWidth;
      if (this.changedPrecent < 0) {
        this.changedPrecent = 0;
      } else if (this.changedPrecent > 1) {
        this.changedPrecent = 1;
      }
      this._setBtnPosition(this.changedPrecent);
      //   console.log(this.touchMoveX);
    },
    progressTouchEnd() {
      this.touching = false;
      if (!this.changedPrecent) {
        return;
      }
      this.$emit("changedPrecent", this.changedPrecent);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>