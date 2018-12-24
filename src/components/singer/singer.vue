<template>
  <div class="singer">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {};
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
