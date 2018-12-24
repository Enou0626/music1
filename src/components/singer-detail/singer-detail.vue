<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import { getSingerDetail } from "api/singer";
import { mapState } from "vuex";
import { creatSong } from "common/js/song";
import MusicList from "components/music-list/music-list";
export default {
  name: "singer-detail",
  data() {
    return { songs: [] };
  },
  components: {
    MusicList
  },
  created() {},
  activated() {
    this._getSingerDetail(this.singer.id);
  },
  computed: {
    ...mapState(["singer"]),
    title: function() {
      return this.singer.name;
    },
    bgImage: function() {
      return this.singer.avatar;
    }
  },
  methods: {
    _getSingerDetail(singerId) {
      if (singerId) {
        getSingerDetail(singerId).then(res => {
          console.log(res);
          if (res.code === 0) {
            let musicList = this._normalizeData(res.data.list);
            this.songs = musicList;
            console.log(this.songs);
          }
        });
      }
    },
    _normalizeData(list) {
      let ret = [];
      list.forEach(element => {
        ret.push(creatSong(element.musicData));
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