<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
import Btscroll from "better-scroll";
export default {
  name: "container",
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
      this.scroll = new Btscroll(".container", {
        probeType: this.probeType
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
      this.scroll.refresh();
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
    height 100%
}
</style>