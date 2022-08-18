<template>
  <div class="tool-bar">
    <div class="tool-bar-title" @click="goHome">
      <!-- <img src="@/assets/logo.png" alt=""> -->
      <!-- <span class="iconfont icon-gouwulan"></span> -->
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-gouwulan"></use>
      </svg>
      <span class="text--primary">&nbsp;师大</span>BUY
      <!-- <router-link to="/home"
        ></router-link
      > -->
      <!--  -->
    </div>

    <!-- 搜索框 -->
    <form onsubmit="event.preventDefault();" class="searchForm">
      <input
        class="search-field"
        id="search"
        type="search"
        placeholder="搜索商品"
        autofocus
        v-model="state.keyword"
      />

      <button type="submit" class="search-btn">
        <svg class="iconfont" aria-hidden="true" @click="goSearch">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </button>
    </form>

    <div class="header-right">
      <svg class="iconfont icon-sousuo" aria-hidden="true" @click="state.showForm = !state.showForm">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <!-- <div
        class="iconfont icon-sousuo"
        
      ></div> -->
      <form
        onsubmit="event.preventDefault();"
        class="searchForm"
        :class="{ 'show-form': state.showForm }"
      >
        <input
          class="search-field"
          id="search"
          type="search"
          placeholder="搜索商品"
          autofocus
          v-model="state.keyword"
        />

        <button type="submit" class="search-btn">
          <svg class="iconfont" aria-hidden="true" @click="goSearch">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
        </button>
      </form>
      <div class="header-nav">
        <header-nav></header-nav>
      </div>
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
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderNav from "./HeaderNav.vue";
const route = useRoute();
const router = useRouter();
// 引入 全局bus
const currentInstance = getCurrentInstance();
const { $bus } = currentInstance.appContext.config.globalProperties;

/**
 * 数据部分
 */
const state = reactive({
  keyword: "",
  showForm: false,
});
const goHome = () => {
  $bus.emit("changeBHT"); // change backhome false
  $bus.emit("changeIdx0");
  router.push("/home");
};
const showCompoMenu = () => {
  $bus.emit("showMenu");
  // console.log("打开菜单",$bus);
};

const goSearch = () => {
  state.showForm = false;
  if (route.query) {
    let location = {
      name: "search",
      params: { keyword: state.keyword || undefined },
    };
    location.query = route.query;
    router.push(location);
    // 全局事件总线传值给home
    $bus.emit("enterKeyword", state.keyword);
    $bus.emit("changeIdx");
    state.keyword = "";
  }
};

onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});

watchEffect(() => {});
</script>

<style scoped lang="less">
.tool-bar {
  box-sizing: border-box;
  // padding: 0 10%;
  border-bottom: 1px solid hsl(0, 0%, 93%);
  height: 80px;
  line-height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // & > *{
  //   border:1px solid red;
  // }
  .tool-bar-title {
    font-size: @fs-1;
    font-weight: @weight-700;
    .iconfont {
      width: calc(1.4 * @fs-1);
      height: calc(1.4 * @fs-1);
      vertical-align: -0.3rem;
    }
    .text--primary {
      color: @salmon-pink;
    }
    cursor: pointer;
    @media screen and (max-width: 900px) {
      font-size: 1rem;
      font-weight: @weight-700;
      .iconfont {
        width: @fs-1;
        height: @fs-1;

        vertical-align: -0.2rem;
      }
    }
  }
  .searchForm {
    // border: 1px solid red;
    width: 30%;
    position: relative;
    .search-field {
      width: 100%;
      font-size: @fs-7;
      color: @onyx;
      padding: 10px 15px;
      padding-right: 50px;
      border: 1px solid @cultured;
      border-radius: @border-radius-md;
      &::-webkit-search-cancel-button {
        display: none;
      }
      &:focus {
        border: 1px solid black;
      }
    }

    .search-btn {
      background: @white;
      position: absolute;
      top: 50%;
      right: 2px;
      transform: translateY(-50%);
      color: @onyx;
      font-size: 16px;
      padding: 0.5rem 1rem;
      border-radius: @border-radius-md;
      transition: color @transition-timing;
      &:hover {
        color: @salmon-pink;
      }
    }

    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .icon-sousuo {
      display: none;
    }
    .searchForm {
      display: none;
    }
    @media screen and (max-width: 900px) {
      .icon-sousuo {
        display: inline-block;
        margin: 0 1rem;
      }
      .searchForm {
        display: inline-block;
        width: 81vw;
        position: absolute;
        z-index: 9999;
        top: 75px;
        right: 100%;
        // transform: translateX(-100%);
        transition: @transition-timing;
        &.show-form {
          transform: translateX(112%);
        }
        input {
          border: 1px solid @salmon-pink;
          box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
