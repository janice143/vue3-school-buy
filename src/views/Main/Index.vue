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

<script setup>
import MainNav from "./MainNav.vue";
import Prodgrid from "./Prodgrid.vue";
import Pagination from "./Pagination.vue";
import Blank from "./Blank.vue";

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
  provide,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();

const store = useStore();

// 引入 全局bus
const currentInstance = getCurrentInstance();
const { $bus } = currentInstance.appContext.config.globalProperties;

/**
 * 数据部分
 */
const state = reactive({
  // 带给服务器传入的参数
  conditions: {
    //产品相应的级次
    category1Id: "",
    //产品的名字
    categoryName: "",
    //搜索的关键字 keyword
    keyword: "",
    //排序:初始状态应该是综合且降序
    order: "1:desc",
    //第几页
    pageNo: 1,
    //每一页展示条数
    pageSize: 10,
  },
});
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
      : route.query.categoryName;
  state.conditions.category1Id =
    route.query.category1Id === undefined ? 0 : route.query.category1Id;
  state.conditions.keyword = route.params.keyword;
  store.dispatch("getProductList", state.conditions);
};

// $bus.on("showMenu", showMenu);
// 自定义事件
const getPageNo = (page) => {
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
onBeforeUnmount(() => {
  // $bus.off("showMenu", showMenu);
});

// 获取最新的排序方式
const getNewOrder = (newOrder) => {
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
      : route.query.categoryName;
  state.conditions.category1Id =
    route.query.category1Id === undefined ? 0 : route.query.category1Id;
  state.conditions.keyword = route.params.keyword;

  // //再次发起ajax请求
  getProductList();
  state.conditions.category1Id = undefined;
  route.params.keyword = undefined;
});
</script>
<style scoped lang="less">
.product {
  padding: 1% 10%;
  // background-color: rgb(249, 249, 249);

  // margin: 0px auto;
  display: flex;
  flex-direction: column;
  // border: 1px solid red;

  // .main {
  //   flex: 1;
  //   .px(40px,40px);
  //   @media screen and (max-width: 900px) {
  //     .px(0px,0px);
  //   }
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   // & > *{
  //   //   border: 1px solid red;
  //   // }
  // }
}
</style>
