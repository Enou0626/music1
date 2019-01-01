<template>
  <div class="recommond-first">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
.recommond-first {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
