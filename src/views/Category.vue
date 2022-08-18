<template>
  <div>
    <ul class="category-list">
      
      <li
        v-for="(cat, index) in sideNav"
        :key="index"
        @click="changeIdx(index, $event)"
        :class="{ curStyle: state.curIndex === index }"
        class="menu-category"
      >
      <a href="javscript:void(0)" :data-id="index" >
      <span class="menu-title">{{ cat.name }}</span>
      </a>

      </li>
    </ul>
  </div>
</template>

<script setup>
import sideNav from "@/assets/list.json";
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  defineEmits,
  defineProps,
  getCurrentInstance
} from "vue";
import { useRoute, useRouter } from "vue-router";

/**
 * 路由对象
 */
const route = useRoute();
const router = useRouter();
// 引入 全局bus
const currentInstance = getCurrentInstance();
const { $bus } = currentInstance.appContext.config.globalProperties;

/**
 * 数据部分
 */

const state = reactive({
  curIndex: route.query.category1Id  || 0
});
// 获取父组件的值
const props = defineProps({
  type: {
    type: String,
    default: "col",
  },
});


const changeIdx = (index, e) => {
  state.curIndex = index;

  // 把分类名字传给父组件，父组件中发请求
  const categoryName = sideNav[index].name;

  // 如果 类名是全部商品，并且没有关键字，那么路径重定向为Home
  if (categoryName === "首页") {
    router.push("/home");
  } else {
    // 如果类名是其他，那么传对应参数给路由
    //准备路由跳转的参数对象
    let location = { name: "search" };
    let query = { categoryName: categoryName };
    //一定是a标签：一级目录
    query.category1Id = index;

    // 由于在搜索框中输入字符搜索时，该参数是在params上，所以要顺带带上params参数
    if (route.params) {
      location.params = route.params;
      //动态给location配置对象添加query属性
      location.query = query;
      //路由跳转
      router.push(location);
      // console.log(location)
    }
  }
  e.preventDefault();
};
onMounted(()=>{
  // console.log(router.currentRoute.value.fullPath)
})
defineExpose({

});
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
  li.curStyle {
    background-color: @salmon-pink;
    padding: 0.8em 1.3em;
    border-radius: @border-radius-md;
    span {
      color: white;
      &:hover {
        color: white;
      }
    }

    // font-weight: 900;
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
