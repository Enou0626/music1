<template>
  <div class="singer">singerr</div>
</template>
<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
// import Scroll from "../../base/scroll/scroll";

export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = res.data.list;
          console.log(this.singers);
          console.log(this._normalizeSingerList(this.singers));
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
              id: item.Fsinger_id,
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
            id: item.Fsinger_id,
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
    }
  },
  components: {
    // Scroll
  }
};
</script>
<style lang="stylus" scoped>
</style>
