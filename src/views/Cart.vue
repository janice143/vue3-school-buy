<template>
  <div class="shopping-cart">
    <ul v-if="cartList && cartList.length>0">
      <li class="cart-list" v-for="cart in cartList" :key="cart._id">
        <img :src="cart.imgUrl" alt="" />
        <div class="cart-text">
          <p class="title">{{ cart.title }}</p>
          <p class="price">￥ {{ cart.price.toFixed(2) }}</p>
        </div>
        <svg class="iconfont" aria-hidden="true" @click="deleteCart(cart._id)">
                  <use xlink:href="#icon-lajitong"></use>
                </svg>
      </li>
    </ul>
    <Blank v-else></Blank>
    <div class="total">共计：￥ {{ totalPrice }}</div>
    <button @click="trade" class="btn">结算</button>
  </div>
</template>

<script setup lang="ts">
import Blank from './Main/Blank.vue'
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
import store from "../store";
import { Iproductlist } from 'types/prodgrid';

const currentInstance = getCurrentInstance();
const $message = currentInstance?.appContext.config.globalProperties.$message


// 路由对象
const route = useRoute();
const router = useRouter();
// 数据部分
const state = reactive({});

const getData = () => {
  // 派发action:通知vuex发get请求，
  store.dispatch("getCartList");
};
const deleteCart = (id:string) => {
  store.dispatch("deleteCartById", id).then(() => {
    getData();
  });
};
const trade = () => {
  // console.log("点击支付");
  $message.show({
    text: "校园闲置暂时仅支持线下交易！",
    type: "warn",
  });
};
const cartList = computed(() => {
  return store.state.cart.cartList;
});

const totalPrice = computed(() => {
  let sum = 0;
  // console.log(cartList.value)
  if (cartList.value) {
    cartList.value.forEach((item:Iproductlist) => {    
      sum += item.price;
    });
  }
  return sum.toFixed(2);
});
onBeforeMount(() => {});
onMounted(() => {
  getData();
});
</script>
<style scoped lang="less">
.shopping-cart {
  position: absolute;
  top:80px;
  right:10vw;

  // transform: translateX(-40%);
  z-index: 9999;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  box-shadow: 0.1rem 0.1rem rgba(0, 0, 0, 0.1);
  width: 20rem;
  background: #fff;

  .cart-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
    margin: 1rem 0;

    img {
      height: 3rem;
      width: 3rem;
      object-fit: cover;
    }
    .cart-text {
      height: 100%;
      flex-basis: 12rem;
      line-height: 1rem;
      padding: 0 0.4rem;
      .title {
        font-size: @fs-5;
        font-weight: @weight-700;
      }
      .price {
        font-size: @fs-7;
        margin-top: 0.4rem;
      }
    }
    .iconfont:hover{
      cursor: pointer;
    }
  }
  .total {
    line-height: 1rem;
    font-size: @fs-5;
    padding: 1rem 0;
    text-align: right;
    color: #130f40;
  }
  .btn {
    float: right;
    line-height: 1rem;
    padding: 0.6em 1.4em;
    background-color: @salmon-pink;
    color: @white;
    font-weight: @weight-600;
    border-radius: @border-radius-sm;
    &:hover{
      background-color: @eerie-black;
    }

  }
}
</style>
