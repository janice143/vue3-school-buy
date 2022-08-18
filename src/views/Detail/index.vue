<template>
  <div class="showcase-wrapper">
    <div class="showcase-container">
      <div class="showcase-banner">
        <!--放大镜效果-->
        <Zoom :productImg="productDetail.gallery" />
        <!-- 小图列表 -->
        <ImageList :productImg="productDetail.gallery" />
      </div>

      <div class="showcase-content">
        <a href="#">
          <h3 class="showcase-title">{{ productDetail.title }}</h3>
        </a>
        <div class="user-box">
          <p class="user">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use></svg
            >{{ productDetail.username }}
          </p>
          <p class="place">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-daohangdizhi"></use>
              </svg>{{ place(productDetail.username) }}
          </p>
          <p class="time">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-timefill"></use>
              </svg>{{ time }}</p>
        </div>

        <p class="showcase-desc">
          <MyEditor :description="productDetail.description"></MyEditor>
        </p>

        <div class="price-box">
          <p class="price">¥&nbsp;{{ productDetail.price }}</p>
          <p class="hotscore">
            <span>{{ productDetail.hotScore }}</span
            >人想要
          </p>
        </div>
        <button class="add-cart-btn" @click="addShopcar()">加入购物车</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyEditor from "@/components/Myeditor.vue";
import ImageList from "./ImageList.vue";
import Zoom from "./Zoom.vue";
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  getCurrentInstance
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const currentInstance = getCurrentInstance();
const { $message } = currentInstance.appContext.config.globalProperties;

// 路由对象
const route = useRoute();
const router = useRouter();
const store = useStore();
// 数据部分
const state = reactive({});

const productDetail = computed(() => {
  return store.state.detail.productDetail;
});
const userlist = computed(() => {
  return store.state.home.userlist;
});

const time = computed(() => {
  const date = new Date(+productDetail.value.createTime);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = date.getDate() + " ";
  const h = date.getHours() + ":";
  const m = date.getMinutes() + ":";
  const s = date.getSeconds();
  // console.log(productDetail)
  return Y + M + D + h + m + s;
});

const place = (username) => {
  // console.log(username)
  // 根据用户名查找place
  // userlist 是要想服务器发请求拿到的，一开始长度可能为空，所以filter之后的结果为空
  if (userlist.value.length > 0) {
    // console.log(this.userlist.filter((user) => user.username === username)[0].place)
    // 过滤操作需要一定时间，没拿到最后数据前没定义，所以要赋空对象
    const user =
      userlist.value.filter((user) => user.username === username)[0] || {};
    // console.log(user)
    return user.place;
  }
  // return '111'
};


const addShopcar = () => {
  const token = store.state.user.token;
  // 如果登录了
  if (token) {
    // console.log('加入购物车')
    // 点击购物车按钮，把参数带给服务器 productId
    const productId = route.params.productId;
    try {
      //成功
      store.dispatch("addProductinToCart", productId);

      //产品信息的数据【比较复杂:skuInfo】,通过会话存储（不持久化,会话结束数据在消失）
      //本地存储|会话存储，一般存储的是字符串

      $message.show({ text: "成功加入购物车", type: "success" });
    } catch (error) {
      //失败
      $message.show({ text: error.message, type: "error" });
    }
  } else {
    // 如果没登录
    $message.show({
       text: "你还未登录，不能加入购物车！",
      type: "warn",
    });
  }
};

onBeforeMount(() => {});
onMounted(() => {
  store.dispatch("getProductDetail", route.params.productId);
});

watchEffect(() => {
  // console.log(productDetail.description)
});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
// defineExpose({
//   productDetail,
// })
</script>

<style scoped lang="less">
.showcase-wrapper {
  padding: 1% 10%;

  .showcase-container {
    padding: 20px;
    border: 1px solid @cultured;
    border-radius: @border-radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 30px;
    // flex-wrap: wrap;

    .showcase-banner {
      min-width: 200px;
      // max-width: 450px;
      flex-basis: 300px;

      margin: auto;
      .showcase-img {
        // border: 1px solid red;
        width: 100%;
        object-fit: cover;
      }
    }
    @media screen and (max-width: 900px) {
      flex-direction: column;
      .showcase-banner {
        flex-basis: 100px;
      }
    }

    .showcase-content {
      flex: 1;
      min-height: 400px;
      min-width: 60%;

      // border: 1px solid red;
      // & > *{
      //   border: 1px solid red;
      // }

      .showcase-title {
        font-size: @fs-3;
        color: @eerie-black;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 10px;
      }
      .user-box {
        display: flex;
        flex-direction: row;
        gap: 10px;
        p {
          font-size: @fs-8;
          color: @sonic-silver;
          i {
            padding-right: 0.4rem;
          }
        }
      }
      .showcase-desc {
        color: @sonic-silver;
        font-size: @fs-11;
        font-weight: @weight-300;
        margin-bottom: 10px;
      }
      .price-box {
        font-size: @fs-5;
        margin-bottom: 10px;
        display: flex;
        gap: 60px;
        .price {
          font-size: @fs-2;
          color: @salmon-pink;
          font-weight: @weight-700;
        }
        .hotscore span {
          font-size: @fs-2;
          color: @salmon-pink;
          font-weight: @weight-700;
        }
      }
      .add-cart-btn {
        background: @salmon-pink;
        padding: 0.8em 1.2em;
        font-size: @fs-6;

        color: @white;
        font-weight: @weight-700;
        text-transform: uppercase;
        border-radius: @border-radius-md;
        margin-bottom: 15px;
        transition: @transition-timing;
        &:hover {
          background: @eerie-black;
          color: @white;
        }
      }
    }
  }
}
</style>
