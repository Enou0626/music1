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
          [HOT_NAME]: []
        },
        items: []
      };
      dataArr.forEach((item, index) => {
        if (index < HOT_LENGTH) {
          map.hot[HOT_NAME].push(
            new Singer({
              id: item.Fsinger_id,
              name: item.Fsinger_name
            })
          );
        }

        let key = item.Findex;
        if (key.match(/[a-zA-Z]/)) {
          if (!map.items[key]) {
            map.items[key] = [
              new Singer({
                id: item.Fsinger_id,
                name: item.Fsinger_name
              })
            ];
          } else {
            map.items[key].push(
              new Singer({
                id: item.Fsinger_id,
                name: item.Fsinger_name
              })
            );
          }
        }
      });
      let sortItems = [];

      Object.keys(map.items)
        .sort((a, b) => {
          return a.charCodeAt(0) - b.charCodeAt(0);
        })
        .forEach(keyName => {
          sortItems.push({ [keyName]: map.items[keyName] });
        });

       sortItems.unshift(map.hot);
       return sortItems;
    }
  },
  components: {
    // Scroll
  }
};
</script>
<style lang="stylus" scoped>
</style>
