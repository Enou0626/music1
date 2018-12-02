<template>
   
</template>
<script>
// import { getSingerList } from "api/singer";
// import Scroll from "../../base/scroll/scroll";

export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    getSingerList().then(data => {
      console.log(data);
    });
  },
  components: {
    Scroll
  }
};
</script>
<style lang="stylus" scoped>
</style>
