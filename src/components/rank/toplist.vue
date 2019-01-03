<template>
  <transition name="slide">
    <music-list :bgImage="topList.picUrl" :title="topList.topTitle" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from "components/music-list/music-list";
import { getMusicList } from "api/rank";
import { mapState } from "vuex";
import { creatSong } from "common/js/song";

export default {
  name: "top-list",
  components: {
    MusicList
  },
  created() {
    this._getMusicList(this.topList.id);
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapState(["topList"])
  },
  methods: {
    _getMusicList(id) {
      getMusicList(id).then(res => {
        // console.log(res);
        if (res.code === 0) {
          this.songs = this._normalizeArr(res.songlist);
        }
      });
    },
    _normalizeArr(arr) {
      let ret = [];
      arr.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albummid) {
          ret.push(creatSong(musicData));
        }
      });
      return ret;
    }
  }
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>