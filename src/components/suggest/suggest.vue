<template>
  <scroll
    class="suggest"
    ref="suggest"
    :listenScrollStart="true"
    :data="result"
    :isPullUp="true"
    @scrollToEnd="onScrollEnd"
    @scrollStart="onScrollStart"
  >
    <ul class="suggest-list">
      <li
        @click="selectItem(item)"
        class="suggest-item"
        v-for="(item, index) in result"
        :key="index"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <div
        v-show="hasMore"
        class="loading-wrap"
        style="position:relative; height:50px; width:100%;"
      >
        <loading title=" "></loading>
      </div>
    </ul>
  </scroll>
</template>

<script>
import { search } from "api/search";
import { creatSong } from "common/js/song";
import Scroll from "base/scroll";
import Loading from "base/loading/loading";
import { mapActions } from "vuex";
const TYPE_SINGER = "singerName";
const perPageNum = 30;
export default {
  name: "suggest",
  components: {
    Scroll,
    Loading
  },
  props: {
    query: {
      type: String,
      default: ""
    },
    zhida: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      result: [],
      page: 1,
      hasMore: true
    };
  },
  methods: {
    ...mapActions(["querySelect", "addQueryHistory"]),
    onScrollStart() {
      // console.log("scroll start");
    },
    onScrollEnd() {
      // console.log("scroll end");
      this._queryMore();
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name}-${item.singer}`;
      }
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else {
        return "icon-music";
      }
    },
    selectItem(item) {
      if (item.type === TYPE_SINGER) {
        this.$router.push(`/singer/${item.singermid}`);
      } else {
        // console.log("selected song");
        this.querySelect(item);
        this.addQueryHistory(item.name);
      }
    },
    _genResult(data, isFrist) {
      let ret = [];
      if (isFrist && data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list));
      }
      return ret;
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(creatSong(musicData));
        }
      });
      return ret;
    },
    _checkMore(song) {
      if (song.curnum + song.curpage * perPageNum >= song.totalnum) {
        this.hasMore = false;
      }
    },
    _queryMore() {
      if (this.hasMore) {
        search(this.query, this.page++, this.zhida, perPageNum).then(res => {
          if (res.data.code === 0) {
            const data = res.data;
            this.result = this.result.concat(this._genResult(data.data, false));
            this._checkMore(data.data.song);
          }
        });
      }
    },
    _query(newData) {
      this.page = 1;
      this.hasMore = true;
      if (this.$refs.suggest) {
        this.$refs.suggest.scrollTo(0, 0);
      }
      search(newData, this.page, this.zhida, perPageNum).then(res => {
        if (res.data.code === 0) {
          const data = res.data;
          this.result = this._genResult(data.data, true);
          // console.log(data, this.result);
          this._checkMore(data.data.song);
        }
      });
    }
  },
  watch: {
    query(newData) {
      this._query(newData);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>