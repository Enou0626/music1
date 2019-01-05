<template>
  <div class="suggest">
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
      <!-- <loading v-show="hasMore" title=""></loading> -->
    </ul>
  </div>
</template>

<script>
import { search } from "api/search";
import { creatSong } from "common/js/song";
const TYPE_SINGER = "singerName";
export default {
  name: "suggest",
  props: {
    query: {
      type: String,
      default: ""
    },
    page: {
      type: Number,
      default: 1
    },
    zhida: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      result: []
    };
  },
  methods: {
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
    selectItem() {},
    _genResult(data) {
      let ret = [];
      if (data.zhida && data.zhida.singerid) {
        ret.push({ ...data.zhida, ...{ type: TYPE_SINGER } });
      }
      if (data.song) {
        // let temp = data.song.list;
        // delete temp[0].songname;
        // ret = ret.concat(this._normalizeSongs(temp));
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
    }
  },
  watch: {
    query(newData) {
      search(newData, this.page, this.zhida).then(res => {
        if (res.data.code === 0) {
          this.result = this._genResult(res.data.data);
          console.log(res.data);

          console.log(this.result);
        }
      });
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