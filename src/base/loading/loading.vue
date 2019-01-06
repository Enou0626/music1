<template>
  <div class="loading" v-show="!data.length>0">
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
    },
    watch: {
      data(newData, oldData) {
        console.log(newData, oldData);
      }
    }
  }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.loading {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 60px;
  text-align: center;
  z-index: 100;

  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>
