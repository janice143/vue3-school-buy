<template>
  <div class="home">
    <Banner></Banner>
    <Keycat></Keycat>
    <Prodmain></Prodmain>
  </div>
</template>

<script setup lang="ts">
import Banner from "./Banner.vue";
import Keycat from "./Keycat.vue";
import Prodmain from "./Prodmain.vue";

</script>
<style scoped lang="less">
.home {
  padding: 1% 10%;
  // border: 1px solid red;
}
</style>
