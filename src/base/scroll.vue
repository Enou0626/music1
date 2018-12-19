<template>
  <div class="scroll-box">
    <slot></slot>
  </div>
</template>

<script>
import Btscroll from "better-scroll";
export default {
  name: "scroll-box",
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    probeType: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll() {
      this.scroll = new Btscroll(".scroll-box", {
        probeType: this.probeType,
        click: true
      });
    },
    refresh() {
      setTimeout(() => {
        this.scroll.refresh();
      }, 20);
    }
  },
  watch: {
    data(val) {
      this.refresh();
    }
  }
};
</script>

<style lang="stylus" scoped>
.scroll-box {
  height: 100%;
}
</style>