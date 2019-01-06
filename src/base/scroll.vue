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
    },
    isPullUp: {
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
      if (this.isPullUp) {
        this._listenScrollEnd();
      }
    }, 200);
  },
  activated() {
    // this.refresh();
  },
  methods: {
    _listenScrollEnd(e) {
      this.scroll.on("scrollEnd", e => {
        // console.log(e, this.scroll.maxScrollY);

        if (e.y < this.scroll.maxScrollY + 50) {
          // debugger;
          this.$emit("scrollToEnd");
        }
      });
    },
    _initScroll() {
      // console.log(this.$refs.wrapper);

      if (this.$refs.wrapper) {
        this.scroll = new Btscroll(this.$refs.wrapper, {
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
      // console.log(this.scroll.refresh);
      this.scroll && this.scroll.refresh();
    },
    scrollToElement(el, delay) {
      this.scroll && this.scroll.scrollToElement(el, delay);
    }
  },
  watch: {
    data(val) {
      setTimeout(() => {
        this.refresh();
      }, 200);
    }
  }
};
</script>

<style lang="stylus" scoped>
.scroll-box {
  // height: 100%;
}
</style>