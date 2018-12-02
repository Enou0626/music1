<template>
  <div class="recommendContent">
    <div class="recommend-list">
      <div class="list-title">recommend</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// import {RECOMMEND_BASE_URL} from 'common/js/static.js'
// import {getDisclist} from 'api/recommend'
import { getRecommend } from "api/recommend";
// import { Indicator } from 'mint-ui';
// import originJsonp from 'jsonp'

export default {
  data() {
    return {
      // slider: [],
      // discList: [],
      // sliderHeight: 200
    };
  },
  created() {
    getRecommend().then(res => {
      console.log(res);
    });
  }
  // methods: {
  //   sliderHeightHandler() {
  //     // var w = document.documentElement.offsetWidth || document.body.offsetWidth ;
  //     var h = document.documentElement.offsetHeight || document.body.offsetHeight;
  //     return h * 0.2
  //   }
  // },
  // created () {
  //   Indicator.open();
  //   this.sliderHeight = this.sliderHeightHandler();
  //   this.axios.get('/api/getRecommend').then((data, err) => {
  //     if (!err) {
  //       this.slider = data.data.data.slider
  //       }
  //   })
  //   getDisclist().then((data, err) => {
  //     if (!err) {
  //       this.discList = data.data.list
  //     }
  //   })
  // },
  // watch: {
  //   discList(newList, oldList) {
  //     Indicator.close();
  //   }
  // }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend-list {
  .list-title {
    height: 65px;
    line-height: 65px;
    text-align: center;
    font-size: $font-size-medium;
    color: $color-theme;
  }

  .item {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px 20px;

    .icon {
      flex: 0 0 60px;
      width: 60px;
      padding-right: 20px;
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      font-size: $font-size-medium;

      .name {
        margin-bottom: 10px;
        color: $color-text;
      }

      .desc {
        color: $color-text-d;
      }
    }
  }
}
</style>