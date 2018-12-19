<template>
  <div class="loading" v-show="!data.length">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      type: String,
      default: "正在载入..."
    },
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.loading {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
  z-index: 100;

  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>
