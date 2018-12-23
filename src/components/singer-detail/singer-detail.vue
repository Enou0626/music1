<template>
  <div class="singer-detail">detaildetaildetaildetaildetaildetaildetail</div>
</template>

<script>
import { getSingerDetail } from "api/singer";
import { mapState } from "vuex";
export default {
  name: "singer-detail",
  data() {
    return {};
  },
  created() {
    getSingerDetail(this.singer.id).then(res => {
      console.log(res);
    });
  },
  computed: {
    ...mapState(["singer"])
  }
};
</script>

<style lang="stylus" scoped>
.singer-detail {
  position: relative;
  height: 100%;
}
</style>