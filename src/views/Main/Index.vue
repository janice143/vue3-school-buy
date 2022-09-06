<template>
  <div class="product">
    <!-- 悬浮按钮组 -->
    <MainNav @getNewOrder="getNewOrder"></MainNav>
    <!-- 商品网格展示 -->
    <div class="main" v-if="productlist && productlist.length > 0">
      <Prodgrid
        :wantId="wantId"
        :productlist="productlist"
        :userlist="userlist"
        :pageNo="state.conditions.pageNo"
        :pageSize="state.conditions.pageSize"
      >
      </Prodgrid>
      <Pagination
        :pageNo="state.conditions.pageNo"
        :pageSize="state.conditions.pageSize"
        :total="totalCount"
        :continues="5"
        @getPageNo="getPageNo"
      ></Pagination>
    </div>
    <Blank v-else></Blank>
  </div>
</template>

<script setup lang="ts">
import MainNav from "./MainNav.vue";
import Prodgrid from "./Prodgrid.vue";
import Pagination from "./Pagination.vue";
import Blank from "./Blank.vue";

import {
  reactive,
  onMounted,
  watchEffect,
  computed,
  onBeforeUnmount,
  watch,
  provide,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import {Conditions} from "types/mainpage"

const route = useRoute();
const router = useRouter();
const store = useStore();

const state = reactive(new Conditions());

let productlist = computed(() => {
  return store.state.home.productlist.productlist;
});
const wantId = computed(() => {
  return store.state.home.productlist.wantId;
});
const userlist = computed(() => {
  return store.state.home.userlist;
});
const totalCount = computed(() => {
  return store.state.home.productlist.totalCount;
});

const getProductList = () => {
  state.conditions.categoryName =
    route.query.categoryName === undefined
      ? "全部商品"
      : String(route.query.categoryName);
  state.conditions.category1Id =
    route.query.category1Id === undefined ? '0' : route.query.category1Id as string;
  state.conditions.keyword = route.params.keyword as string;
  store.dispatch("getProductList", state.conditions);
};

// 自定义事件
const getPageNo = (page:number) => {
  state.conditions.pageNo = page;
  // console.log(page)
  // 向服务器发送请求
  getProductList();
};

onMounted(() => {
  getProductList();

  // 获取商品展示的用户信息
  store.dispatch("getUsersdetail");
});
// 获取最新的排序方式
const getNewOrder = (newOrder:string) => {
  state.conditions.order = newOrder;
  // console.log("aaa", newOrder);
  // 拿到最新的排序方式后，向服务器发送请求
  getProductList();
};

const PARENT_PROVIDE = "parentProvide";
// 提供父组件指定方法

provide(`${PARENT_PROVIDE}/getProductList`, getProductList);

watchEffect(() => {});
watch(route, (pre, old) => {
  // 输入框等改变路由，监听路由的信息是否发生变化

  state.conditions.categoryName =
    route.query.categoryName === undefined
      ? "全部商品"
      : route.query.categoryName as string;
  state.conditions.category1Id =
    route.query.category1Id === undefined ? '0' : route.query.category1Id as string;
  state.conditions.keyword = route.params.keyword as string;

  // //再次发起ajax请求
  getProductList();
  state.conditions.category1Id = undefined;
  route.params.keyword = '';
});
</script>
<style scoped lang="less">
.product {
  padding: 1% 10%;
  display: flex;
  flex-direction: column;
}
</style>
