<template>
  <div>
    <ul class="category-list">
       <li class="menu-category">
        <router-link to="/home" active-class="curStyle"
        @click.native="state.curIndex = -1"
          ><span class="menu-title">首页</span></router-link
        >
      </li>
      <li v-for="(cat, index) in sideNav" :key="index" class="menu-category">
        <router-link
          :to="`/search?categoryName=${cat.name}&category1Id=${index}`"
          :class="{ curStyle: state.curIndex === index }"
          @click.native="state.curIndex = index"
        >
          <span class="menu-title">{{ cat.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import sideNav from "@/assets/list.json";
import {
  reactive,
  onMounted,
  watchEffect,
  defineProps,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();


const state = reactive({
  curIndex: route.query.category1Id || -1,
});

watchEffect(() => state.curIndex = Number(route.query.category1Id))

</script>
<style scoped lang="less">
.category-list {
  // border: 1px solid red;
  // position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  gap: 30px;
  height: 6em;
  li {
    .curStyle {
      background-color: @salmon-pink;
      padding: 0.8em 1.3em;
      border-radius: @border-radius-md;
      span {
        color: white;
        &:hover {
          color: white;
        }
      }
    }
  }

  .menu-category:not(:nth-child(2)) {
    position: relative;
  }
  .menu-title {
    position: relative;
    color: @onyx;
    // font-size: @fs-6;
    // font-weight: @weight-400;
    text-transform: uppercase;
    padding: 15px 0;
    transition: @transition-timing;
    &:hover {
      color: @salmon-pink;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: @salmon-pink;
      transform: scaleX(0);
      transform-origin: left;
      transition: @transition-timing;
    }
  }
  &:hover::after {
    transform: scaleX(1);
  }
  @media screen and (max-width: 900px) {
    justify-content: flex-start;
  }
}
</style>
