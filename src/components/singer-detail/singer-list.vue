<template>
  <div class="singer-list">
    <loading :data="singers"></loading>
    <list-view @itemClick="itemClick" :data="singers"></list-view>
  </div>
</template>
<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import ListView from "base/listview";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  activated() {},
  methods: {
    ...mapMutations(["setSinger"]),
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSingerList(res.data.list);
        }
      });
    },
    _normalizeSingerList(dataArr) {
      const HOT_LENGTH = 10;
      const HOT_NAME = "热门";
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      dataArr.forEach((item, index) => {
        if (index < HOT_LENGTH) {
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        let key = item.Findex;
        if (!map[key]) {
          map[key] = { title: key, items: [] };
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      let hot = [];
      let ret = [];

      for (const key in map) {
        const item = map[key];
        if (item.title === HOT_NAME) {
          hot.push(item);
        } else if (item.title.match(/[a-zA-z]/)) {
          ret.push(item);
        }
      }

      return hot.concat(
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        })
      );
    },
    itemClick(item) {
      this.$router.push(`/singer/detail`);
      this.setSinger(item);
    }
  },
  computed: {
    ...mapState(["singer"])
  },
  components: {
    ListView
  }
};
</script>
<style lang="stylus" scoped>
.singer-list {
  // position: relative;
  // top: 0;
  // bottom: 0;
  height: 100%;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
