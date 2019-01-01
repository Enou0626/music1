<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from "components/music-list/music-list1";
import { mapState } from "vuex";
import { getSonglist } from "api/recommend";
import { creatSong } from "common/js/song";

export default {
  name: "recommend-list",
  components: { MusicList },
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapState(["disc"])
  },
  data() {
    return {
      songs: []
    };
  },
  created() {
    if (!this.disc.dissid) {
      this.$router.push("/recommend");
      return;
    }
    this._getList(this.disc.dissid);
  },
  methods: {
    _normalizeArray(arr) {
      let temp = [];
      arr.forEach(element => {
        temp.push(creatSong(element));
      });
      return temp;
    },
    _getList(id) {
      getSonglist(id).then(res => {
        if (res.code === 0) {
          const songs = res.cdlist[0].songlist;
          this.songs = this._normalizeArray(songs);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>