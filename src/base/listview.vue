<template>
  <scroll
    class="listview"
    :data="data"
    ref="scroll"
    :isListenScroll="true"
    :probeType="3"
    @listenScroll="listenScroll"
  >
    <ul>
      <li v-for="(listGroup, index) in data" :key="index" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{listGroup.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="(item, index) in listGroup.items" :key="index">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart="onShortCutTagTouch"
      @touchmove.stop.prevent="onShortCutTagTouchMove"
    >
      <ul>
        <li
          :class="{'item':true, 'current': index === currentIndex}"
          v-for="(item, index) in shortCutTag"
          :index="index"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll";
export default {
  name: "listview",
  data() {
    return {
      currentIndex: 0,
      listGroupHeightArr: [],
      scrollY: 0
    };
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    Scroll
  },
  mounted() {},
  computed: {
    shortCutTag: function() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    },
    fixedTitle: function() {
      if (this.scrollY > 0) {
        return "";
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : "";
    }
  },
  watch: {
    data: function() {
      setTimeout(() => {
        this._measureListGroup();
      }, 20);
    }
  },
  methods: {
    scrollTo(targetIndex) {
      this.$refs.scroll.scrollToElement(
        this.$refs.listGroup[parseInt(targetIndex)],
        500
      );
    },
    onShortCutTagTouch(e) {
      this.targetIndex = e.target.getAttribute("index") - 0;
      this.currentIndex = this.targetIndex;
      this.Y1 = e.touches[0].pageY;
      this.scrollTo(this.targetIndex);
    },
    onShortCutTagTouchMove(e) {
      this.Y2 = e.touches[0].pageY;
      let delta = ((this.Y2 - this.Y1) / 18) | 0;
      let currentIndex = parseInt(this.targetIndex) + delta;
      if (currentIndex < 0) {
        currentIndex = 0;
      } else if (currentIndex > this.data.length - 1) {
        currentIndex = this.data.length - 1;
      }
      this.currentIndex = currentIndex;
      this.scrollTo(currentIndex);
    },
    _measureListGroup(vue) {
      let listGroupHeightArr =
        this.$refs.listGroup &&
        this.$refs.listGroup.map(element => {
          return element.clientHeight;
        });

      let arr = [0];
      let height = 0;
      listGroupHeightArr.forEach(element => {
        height += element;
        // console.log(element);
        arr.push(height);
      });

      this.listGroupHeightArr = arr;
    },
    listenScroll(pos) {
      this.scrollY = pos.y;
      const y = -pos.y;
      if (y <= 0) {
        this.currentIndex = 0;
      }
      for (let index = 0; index < this.listGroupHeightArr.length; index++) {
        const h1 = this.listGroupHeightArr[index];
        const h2 = this.listGroupHeightArr[index + 1];
        if (y > h1 && y < h2) {
          this.currentIndex = index;
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 100;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>