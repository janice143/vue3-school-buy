<template>
  <div id="app">
    <div class="header">
      <Header v-show="route.meta.isShow"></Header>
      <category v-show="route.meta.isShow"></category>
    </div>

    <router-view v-slot="{ Component }" v-if="route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <router-view v-slot="{ Component }" v-else>
      <component :is="Component" />
    </router-view>
    <Footer v-show="route.meta.isShow"></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import category from "@/views/Category.vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
// 路由对象
const route = useRoute();
const store = useStore();
// 获取登录用户信息
const getUser = () => {
  store.dispatch("getUser").catch((err) => console.log(err.message));
};
onMounted(() => {
  getUser();
});
</script>

<style scoped lang="less">
#app {
  width: 100%;
  min-height: 100vh;

  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .header{
    
  padding: 0 10%;
  }
}

</style>
