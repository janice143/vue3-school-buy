<template>
  <div class="home">
    <Banner></Banner>
    <Keycat></Keycat>
    <Prodmain></Prodmain>
  </div>
</template>

<script setup>
import Banner from "./Banner.vue";
import Keycat from "./Keycat.vue";
import Prodmain from "./Prodmain.vue";

import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();

const store = useStore();
</script>
<style scoped lang="less">
.home {
  padding: 1% 10%;
  // border: 1px solid red;
}
</style>
