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
      <svg
        class="iconfont icon-sousuo"
        aria-hidden="true"
        @click="state.showForm = !state.showForm"
      >
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

<script setup lang="ts">
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
import { useRoute, useRouter, RouteLocationOptions } from "vue-router";
import HeaderNav from "./HeaderNav.vue";
import { useEventbus } from "@/hooks/useEventBus";
import { IHeaderData, Ilocation } from "types/header";

const route = useRoute();
const router = useRouter();
const eventbus = useEventbus();


const state:IHeaderData = reactive({
  keyword: "",
  showForm: false,
});

const goHome = () => {
  eventbus.customEmit("changeBHT"); // change backhome false
  eventbus.customEmit("changeIdx0");
  router.push("/home");
};
const showCompoMenu = () => {
  eventbus.customEmit("showMenu");
};

const goSearch = () => {
  state.showForm = false;
  if (route.query) {
    let location: Ilocation = {
      name: "search",
      params: { keyword: state.keyword || undefined },
      query: {category1Id: '', categoryName: ''}
    };
    location.query = route.query;
    router.push(location as RouteLocationOptions) ;
    // 全局事件总线传值给home
    eventbus.customEmit("enterKeyword", state.keyword);
    eventbus.customEmit("changeIdx");
    state.keyword = "";
  }
};

onBeforeMount(() => {});
onMounted(() => {
  // console.log(HeaderData);
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
