<template>
  <!-- 未登录 -->
  <ul v-if="!username">
    <li v-for="(item, index) in state.mylist" :key="index">
      <router-link :to="item.to" class="base_link">
        <svg class="iconfont" aria-hidden="true">
          <use :xlink:href="`#${item.icon}`"></use>
        </svg>
      </router-link>
    </li>
  </ul>
  <!-- 已经登录 -->
  <ul v-else>
    <li>
      <div class="base_link" @click="state.isOpenCart = !state.isOpenCart">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-gouwuchekong"></use>
        </svg>
      </div>
      <Cart
        v-if="state.isOpenCart"
        @mouseleave="state.isOpenCart = false"
      ></Cart>
    </li>
    <li>
      <div class="btn base_link" @click="goCMS($event)">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-houtai9"></use>
        </svg>
      </div>
    </li>
    <li>
      <div class="base_link" @click="logout($event)">
        <svg class="iconfont" aria-hidden="true">
          <use xlink:href="#icon-tuichu"></use>
        </svg>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Cart from "@/views/Cart.vue";
import {
  reactive,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const router = useRouter();
const store = useStore();
const currentInstance = getCurrentInstance();
const  $message = currentInstance?.appContext.config.globalProperties.$message

const state = reactive({
  isOpenCart: false,
  // 未登录
  mylist: [
    {
      to: "/login",
      name: "登陆",
      icon: "icon-denglu-copy",
    },
    {
      to: "/register",
      name: "注册",
      icon: "icon-zhuce",
    },
  ],
});
const username = computed(() => {
  return store.state.user.userInfo.username;
});

// 退出登录：通知服务器清除一些数据，比如token。
const logout = (e:MouseEvent) => {
  // console.log('exit')
  e.preventDefault();
  store
    .dispatch("userLogoutClear")
    .then(() => router.push("/home"))
    .catch((err) => console.log(err));
};
const goCMS = (e:MouseEvent) => {
  const cmsURL = "http://43.143.81.10:9528/login";
  // 判断用户信息是否填完整
  // 获取用户信息
  let userinfo = store.state.user.userInfo;

  // 说明不是空对象
  if (Object.keys(userinfo).length > 0) {
    if (
      userinfo.place.length > 0 &&
      userinfo.phone.length > 0 &&
      userinfo.studentnumber.length > 0
    ) {
      window.location = cmsURL as Location | (string & Location);
    } else {
      router.push("/completeinfo");
    }
  } else {
    $message.show({ text: "请先登录！", type: "warn" });
  }
};

</script>
<style scoped lang="less">
.base_link:hover {
  cursor: pointer;
}

ul {
  // margin-left: auto;
  display: flex;
  flex-direction: row;

  li {
    .base_link {
      color: @info-color;
      &:hover {
        color: @hover-color;
      }
    }
  }

  & > * {
    .mx(30px,30px);
    @media screen and (max-width: 900px) {
      // .mx(14px,14px);
      .mx(1rem,1rem);
    }
  }
}
</style>
