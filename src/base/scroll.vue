<template>
  <div class="scroll-box" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import Btscroll from "better-scroll";
import { mapMutations } from "vuex";
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
    listenScrollStart: {
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
      if (this.listenScrollStart) {
        this._listenScrollStart();
      }
    }, 200);
  },
  activated() {
    // this.refresh();
  },
  methods: {
    ...mapMutations(["setScrollStart"]),
    _listenScrollStart() {
      this.scroll &&
        this.scroll.on("beforeScrollStart", () => {
          // this.$emit("scrollStart");
          this.setScrollStart(true);
        });
    },
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
    },
    scrollTo(x, y, delay) {
      this.scroll && this.scroll.scrollTo(x, y, delay);
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