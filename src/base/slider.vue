<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BtScroll from "better-scroll";
export default {
  name: "slider",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this._initSlider();
  },
  methods: {
    _initSlider() {
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

      sliderGroup.style.width = width + clientWidth*2 + "px";
      this.scroll = new BtScroll(".slider", {
        scrollX: true,
        momentum: false,
        snap: {
          loop: true
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.slider {
  overflow: hidden;

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
}
</style>
