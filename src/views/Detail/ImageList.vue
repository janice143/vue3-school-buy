<template>
  <!--banner轮播-->
  <div class="swiper-container">
    <div
      class="swiper-slide"
      v-for="(img, index) in props.productImg"
      :key="img"
    >
      <img :src="img" :class="{ active: state.curIndex === index }" @click="imgActive(index)" />
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  defineProps,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
// 路由对象
const route = useRoute();
const router = useRouter();
// 引入 全局bus
const currentInstance = getCurrentInstance();
const { $bus } = currentInstance.appContext.config.globalProperties;

// 数据部分
const state = reactive({
  curIndex: 0,
});
const props = defineProps({
  productImg: Array,
});
const imgActive = (index) => {
  state.curIndex = index;
  //通知兄弟组件：当前的索引值为几
  $bus.emit("getIndex", state.curIndex);
};
onBeforeMount(() => {});
onMounted(() => {});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
//defineExpose({
// ...toRefs(state)
//})
</script>
<style scoped lang="less">
.swiper-container {
  height: 4rem;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 12px;
   display: flex;
    flex-direction: row;
    gap:10px;
  .swiper-slide{
    
    border:1px solid #ccc;
   
    img{
      height: 100%;
    }
  }
}
</style>
