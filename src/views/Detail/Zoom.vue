<template>
  <div class="spec-preview">
    <img :src="gallery" />

    <div class="event" @mousemove="handler($event)"></div>
    <div class="big">
      <img :src="gallery" ref="big" />
    </div>
    <!-- 绿色的放大镜层 -->
    <div class="mask" ref="mask"></div>
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
const gallery = computed(() => {
  return props.productImg !== undefined ? props.productImg[state.curIndex] : "";
});
const mask = ref(null);
const big = ref(null);
const handler = (e) => {
  // console.log(mask.value)
  const maskNode = mask.value;
  const bigNode = big.value;

  const { offsetX: x, offsetY: y } = e;
  const { offsetWidth: width, offsetHeight: height } = maskNode;
  let left = x - width / 2;
  let top = y - height / 2;

  //约束范围
  if (left <= 0) left = 0;
  if (left >= width) left = width;
  if (top <= 0) top = 0;
  if (top >= height) top = height;

  maskNode.style.left = left + "px";
  maskNode.style.top = top + "px";

  bigNode.style.left = -2 * left + "px";
  bigNode.style.top = -2 * top + "px";
};

onBeforeMount(() => {});
onMounted(() => {
  // 全局事件总线，获取兄弟组件传过来的getIndex
  $bus.on("getIndex", (index) => {
    state.curIndex = index;
  });
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  mask,
  big,
});
</script>
<style scoped lang="less">
.spec-preview {
  position: relative;
  border: 1px solid #ccc;
  

  img {
    width: 100%;
    max-height: 20rem;
    height: 100%;
    object-fit: cover;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
    @media screen and (max-width: 900px) {
      position: absolute;
      // top: -1px;
      top: 100%;
      left: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
