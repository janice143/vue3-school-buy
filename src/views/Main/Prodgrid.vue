<template>
  <div>
    <ul class="product-grid">
      <li class="showcase" v-for="product in productlist" :key="product._id">
        <div class="showcase-banner">
          <img :src="product.imgUrl" width="300" class="product-img default" />
          <!-- <router-link :to="`/detail/${product._id}`">
          
        </router-link> -->
          <p class="showcase-badge">15%</p>

          <div class="showcase-actions">
            <button class="btn-action">
              <svg
                class="iconfont menu-title-img"
                aria-hidden="true"
                @click="
                  addShoucang({
                    id: product._id,
                    title: product.title,
                    username: userName,
                  })
                "
              >
                <use
                  :xlink:href="`#${
                    props.wantId.includes(product._id)
                      ? 'icon-shoucang1'
                      : 'icon-shoucang'
                  }`"
                ></use>
              </svg>
            </button>

            <button class="btn-action">
              <svg
                class="iconfont"
                aria-hidden="true"
                @click="addCart(product._id)"
              >
                <use xlink:href="#icon-jiarugouwuche"></use>
              </svg>
            </button>

            <router-link :to="`/detail/${product._id}`">
              <button class="btn-action">
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icon-chakanxiangqing1"></use>
                </svg>
              </button>
            </router-link>
          </div>
        </div>

        <router-link :to="`/detail/${product._id}`">
          <div class="showcase-content">
            <a href="#" class="showcase-category">{{ product.categoryName }}</a>

            <a href="#">
              <h3 class="showcase-title">{{ product.title }}</h3>
            </a>

            <div class="price-box">
              <p class="price">￥{{ product.price.toFixed(2) }}</p>
              <p class="hotscore">
                <strong>{{ product.hotScore }}</strong> 人想要
              </p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  onBeforeMount,
  onMounted,
  watchEffect,
  inject,
  getCurrentInstance,
  computed
} from "vue";
import { useStore } from "vuex";
import { Iinfo, Iproductlist, Iuserlist, IwantId } from 'types/prodgrid'
const currentInstance = getCurrentInstance();
const $message = currentInstance?.appContext.config.globalProperties.$message

const store = useStore();

// 数据部分
const state = reactive({
  hasProdChanged: false,
});
const props = defineProps<{
  productlist: Iproductlist[],
  userlist: Iuserlist[],
  wantId: IwantId,
}>()
// 注入父组件指定方法
const PARENT_PROVIDE = "parentProvide";
const getProductList = inject(`${PARENT_PROVIDE}/getProductList`) as ()=>{};
// 添加收藏
const addShoucang = (info:Iinfo) => {
  // console.log('点击收藏')
  const isWanted = props.wantId.includes(info.id) ? true : false;
  // 未收藏的时候，发送收藏请求
  if (isWanted) {
    // console.log("想要-1");
    store
      .dispatch("wantNoProduct", info)
      .then(() => {
        // 让父组件更新
        getProductList();
      })
      .catch((err) => {
        $message.show({ text: String(err), type: "error" });
      });
  } else {
    // console.log("想要+1");
    store
      .dispatch("wantProduct", info)
      .then(() => {
        getProductList();
      })
      .catch((err) => {
        $message.show({ text: String(err), type: "error" });
      });
  }
};

// 添加购物车
const addCart = (id:string) => {
  // console.log("点击加入购物车");

  const token = store.state.user.token;
  // 如果登录了
  if (token) {
    const productId = id;
    store
      .dispatch("addProductinToCart", productId)
      .then(() => {
        // console.log("成功加入购物车");
        $message.show({ text: "成功加入购物车", type: "success" });
      })
      .catch((err) => {
        $message.show({ text: err.message, type: "error" });
      });
  } else {
    // 如果没登录
    $message.show({
      text: "你还未登录，不能加入购物车！",
      type: "warn",
    });
  }
};
const userName = computed(()=>{
      return store.state.user.userInfo.username;
})
onBeforeMount(() => {});
onMounted(() => {
  console.log();
  
});
watchEffect(() => {});
</script>
<style scoped lang="less">
.product-grid {
  // border: 1px solid red;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  .showcase {
    border: 1px solid @cultured;
    border-radius: @border-radius-md;
    overflow: hidden;
    transition: @transition-timing;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 10px hsla(0, 0%, 0%, 0.1);
      // opacity: 0.6;
      .showcase-actions {
        transform: translateX(-50px);
        // border:1px solid red;
      }
    }

    .showcase-banner {
      position: relative;
      // border: 1px solid red;
      .product-img {
        width: 100%;
        height: 100%;
        max-height: 14rem;
        object-fit: cover;
        transition: @transition-timing;
        &.default {
          position: relative;
          z-index: 1;
        }
      }
      .showcase-badge {
        position: absolute;
        top: 15px;
        left: 15px;
        background: @ocean-green;
        font-size: @fs-8;
        font-weight: @weight-500;
        color: @white;
        padding: 0 8px;
        border-radius: @border-radius-sm;
        z-index: 3;
        &.angle {
          top: 8px;
          left: -29px;
          transform: rotate(-45deg);
          text-transform: uppercase;
          font-size: 11px;
          padding: 5px 40px;
        }
        &.black {
          background: @eerie-black;
        }
        &.pink {
          background: @salmon-pink;
        }
      }
      .showcase-actions {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 10px;
        right: -40px;
        font-size: 20px;
        transition: @transition-timing;
        z-index: 99;
        .btn-action {
          background: @white;
          color: @sonic-silver;
          margin-bottom: 5px;
          border: 1px solid @cultured;
          padding: 5px;
          border-radius: @border-radius-sm;
          transition: @transition-timing;
          &:hover {
            filter: invert(1) hue-rotate(180deg);
          }
        }
      }
    }
    .showcase-content {
      // padding: 15px 20px 0;
      padding: 0.6em 0.8em;
      .showcase-category {
        color: @salmon-pink;
        font-size: @fs-9;
        font-weight: @weight-500;
        margin-bottom: 10px;
      }
      .showcase-title {
        color: @sonic-silver;
        font-size: @fs-8;
        font-weight: @weight-300;
        text-transform: capitalize;
        letter-spacing: 1px;
        margin-bottom: 10px;
        transition: @transition-timing;
        &:hover {
          color: @eerie-black;
        }
      }
      .price-box {
        display: flex;
        justify-content: space-between;

        font-size: @fs-7;
        color: @eerie-black;
        margin-bottom: 10px;
        .price {
          font-weight: @weight-700;
        }
        .hotscore {
          color: @sonic-silver;
          font-size: @fs-9;
          font-weight: @weight-500;
          strong {
            font-size: @fs-7;
            color: @eerie-black;
            font-weight: @weight-700;
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    .iconfont {
      vertical-align: 0;
    }
  }
  @media screen and (min-width: 601px) and (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    .iconfont {
      vertical-align: 0;
    }
  }
  @media screen and (min-width: 901px) and (max-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    .iconfont {
      vertical-align: 0;
    }
  }
}
</style>
