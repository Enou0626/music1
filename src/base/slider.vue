<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for="(item, index) in dots" :key="index" :class="{active : currentIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BtScroll from "better-scroll";
export default {
  name: "slider",
  data() {
    return {
      dots: [],
      currentIndex: 0
    };
  },
  created() {},
  mounted() {
    this._initWidth(false);
    this._initSlider();
    this._initDots();

    window.addEventListener("resize", () => {
      if (this.scroll) {
        this._initWidth(true);
        this.scroll.refresh();
      }
    });
  },
  methods: {
    _initDots() {
      this.dots = new Array(this.children.length - 2);
    },
    _initWidth(isResize) {
      const slider = this.$refs.slider;
      const sliderGroup = this.$refs.sliderGroup;
      this.children = sliderGroup.children;
      let width = 0;
      const clientWidth = slider.clientWidth;

      for (let index = 0; index < this.children.length; index++) {
        const element = this.children[index];
        element.className = "slider-item";
        element.style.width = clientWidth + "px";

        width += clientWidth;
      }

      sliderGroup.style.width =
        (!isResize ? width + clientWidth * 2 : width) + "px";
    },
    _initSlider() {
      this.scroll = new BtScroll(".slider", {
        scrollX: true,
        momentum: false,
        snap: {
          loop: true
        }
      });

      this.scroll.on("scrollEnd", () => {
        let pageIndex = this.scroll.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentIndex = pageIndex;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.slider {
  overflow: hidden;
  position: relative;

  .slider-group {
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;

      a {
        text-decoration: none;
        display: block;
        width: 100%;

        img {
          display: block;
          width: 100%;
        }
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    span {
      display: inline-block;
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
}
</style>
