<template>
  <div class="home">
    <!-- 顶部菜单栏 -->
    <category @getCategoryName="getCategoryName"></category>
    <section v-if="state.backhome">
      <Banner></Banner>
      <Keycat></Keycat>
      <Prodmain></Prodmain>

    </section>

    <Main v-else></Main>
  </div>
</template>

<script setup>
import category from "./Category.vue";
import Main from "../Main/Index.vue";
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

// 引入 全局bus
const currentInstance = getCurrentInstance();
const { $bus, $message } = currentInstance.appContext.config.globalProperties;

/**
 * 数据部分
 */
const state = reactive({
  hide: true,
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
  backhome: true,
});
const productlist = computed(() => {
  return store.state.home.productlist.productlist;
});

// const wantId = computed(() => {
//   return store.state.home.productlist.wantId;
// });
// const userlist = computed(() => {
//   return store.state.home.userlist;
// });
// const totalCount = computed(() => {
//   return store.state.home.productlist.totalCount;
// });

const showMenu = () => {
  state.hide = !state.hide;
  // console.log("点击了");
};
const getKeyword = (keyword)=>{
  // console.log(keyword)
  state.backhome = false;
}
const getKeycat= ()=>{
  // console.log(keyword)
  state.backhome = false;
}
const changeBHT= ()=>{
  // console.log(keyword)
  state.backhome = true;
  // console.log(state.backhome)
}
const getProductList = () => {
  store.dispatch("getProductList", state.conditions);
};
const getUser = ()=> {
  store.dispatch("getUser").catch(err=>console.log(err.message))
}

$bus.on("showMenu", showMenu);
$bus.on("enterKeyword", getKeyword);
$bus.on("getKeycat", getKeycat);
$bus.on("changeBHT", changeBHT);
// 自定义事件
const getPageNo = (page) => {
  state.conditions.pageNo = page;
  // console.log(page)
  // 向服务器发送请求
  getProductList();
};

// 拿到子组件中的分类名字
const getCategoryName = (categoryName) => {
  // console.log("拿到子组件数据", categoryName);
  if (categoryName === "首页") {
    // 不展示商品，展示首页的内容
    state.backhome = true;
  } else {
    state.backhome = false;
  }
  //   将pageNo置为1
  // state.conditions.pageNo = 1;
  // state.conditions.categoryName = categoryName;
  // // // 向服务器发送请求
  // getProductList();
};

onMounted(() => {
  // $message.show({text:'111',type:'error'})
  getProductList();
  // // 获取商品展示的用户信息
  // store.dispatch("getUsersdetail");
    getUser()
});
onBeforeUnmount(() => {
  $bus.off("showMenu", showMenu);
});

// 获取最新的排序方式
// const getNewOrder = (newOrder) => {
//   state.conditions.order = newOrder;
//   // console.log("aaa", newOrder);
//   // 拿到最新的排序方式后，向服务器发送请求
//   getProductList();
// };

watchEffect(() => {});
watch(route,(pre,old) => {
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
  route.params.keyword = undefined
});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
// defineExpose({
//   ...toRefs(data),
// });
</script>
<style scoped lang="less">
.home {
  padding: 1% 10%;
  // border: 1px solid red;
}
</style>
