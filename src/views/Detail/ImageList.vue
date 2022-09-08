<template>
  <!--banner轮播-->
  <div class="swiper-container">
    <div
      class="swiper-slide"
      v-for="(img, index) in props.productImg"
      :key="img"
    >
      <img
        :src="img"
        :class="{ active: state.curIndex === index }"
        @click="imgActive(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  defineProps,
} from "vue";
import { useEventbus } from "@/hooks/useEventBus";
const eventBus = useEventbus();

// 数据部分
const state = reactive({
  curIndex: 0,
});
const props = defineProps<{
  productImg: string[],
}>();
const imgActive = (index: number) => {
  state.curIndex = index;
  //通知兄弟组件：当前的索引值为几
  eventBus.customEmit("getIndex", state.curIndex);
};
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
  gap: 10px;
  .swiper-slide {
    border: 1px solid #ccc;

    img {
      height: 100%;
    }
  }
}
</style>
