<template>
  <div class="recommend" ref="recommendBox">
    <scroll :data="this.discList" class="recommendContent" ref="scroll">
      <div>
        <slider v-if="slider.length">
          <div v-for="(item ,index) in slider" :key="index">
            <a :href="item.linkUrl" class>
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li
              v-for="(item, index) in discList"
              @click="handleItemClick(item)"
              :key="index"
              class="item"
            >
              <div class="icon">
                <img @load="loadImage" v-lazy="item.imgurl" style="with:60px;height:60px">
              </div>
              <div class="text">
                <h2 v-text="item.creator.name" class="name"></h2>
                <p v-text="item.dissname" class="desc"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <loading :data="discList"></loading>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
// import {RECOMMEND_BASE_URL} from 'common/js/static.js'
import { getRecommend, getDisclist } from "api/recommend";
import Slider from "base/slider";
import Scroll from "base/scroll";
import { mapMutations } from "vuex";
import { playlistMixin } from "common/js/mixin";
// import Loading from "base/Loading/Loading";
// import axios from "axios";
// import originJsonp from 'jsonp'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      slider: [],
      discList: []
      // sliderHeight: 200
    };
  },
  components: {
    Slider,
    Scroll
  },
  methods: {
    ...mapMutations(["setDisc"]),
    handlePlaylist() {
      this.$refs.recommendBox.style.bottom = "60px";
    },
    handleItemClick(item) {
      this.setDisc(item);
      this.$router.push(`/recommend/list`);
      // this.$router.push(`/recommend/${item.dissid}`);
    },
    loadImage() {
      if (!this.loadImageTag) {
        this.$refs.scroll.refresh();
        this.loadImageTag = true;
      }
    }
  },
  created() {
    setTimeout(() => {
      getRecommend().then(res => {
        this.slider = res.data.slider;
        // console.log(res);
      });

      getDisclist().then(res => {
        this.discList = res.data.list;
        // console.log(this.discList);
      });
    }, 1000);

    // axios.get("/api/getRecommend").then((data, err) => {
    //   console.log(data);

    //   if (!err) {
    //     this.slider = data.data.data.slider;
    //   }
    // });
  },
  mounted() {}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  // height: 100%;
  width: 100%;
  position: absolute;
  top: 88px;
  bottom: 0;

  .loadingBox {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

.recommendContent {
  height: 100%;
  overflow: hidden;
}

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
    // box-sizing: border-box;
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
