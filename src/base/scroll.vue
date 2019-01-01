<template>
  <div class="scroll-box" ref="wrapper">
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
    },
    isListenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
      if (this.isListenScroll) {
        this._listenScroll();
      }
    }, 20);
  },
  activated() {
    console.log("scroll activated");
    this.refresh();
  },
  methods: {
    _initScroll() {
      // console.log(this.$refs.wrapper);

      if (this.$refs.wrapper) {
        this.scroll = new Btscroll(".scroll-box", {
          probeType: this.probeType,
          click: true
        });
      }
    },
    _listenScroll() {
      const that = this;
      this.scroll &&
        this.scroll.on("scroll", pos => {
          // console.log(pos);
          that.$emit("listenScroll", pos);
        });
    },
    refresh() {
      console.log("scroll refresh");

      this.scroll && this.scroll.refresh();
    },
    scrollToElement(el, delay) {
      this.scroll && this.scroll.scrollToElement(el, delay);
    }
  },
  watch: {
    data(val) {
      setTimeout(() => {
        console.log(val);

        this.refresh();
      }, 20);
    }
  }
};
</script>

<style lang="stylus" scoped>
.scroll-box {
  height: 100%;
}
</style>