<template>
  <div class="singer" ref="singerBox">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import { playlistMixin } from "common/js/mixin";
export default {
  mixins: [playlistMixin],
  methods: {
    handlePlaylist() {
      this.$refs.singerBox.style.bottom = "60px";
    }
  }
};
</script>
<style lang="stylus" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
