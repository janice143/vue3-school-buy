<template>
  <div class="row-wrap">
    <!-- 左侧分类栏 -->
    <div class="sidebar">
      <div class="sidebar-category">
        <div class="sidebar-top">
          <h2 class="sidebar-title">分类</h2>
        </div>

        <ul class="sidebar-menu-category-list">
          <li
            class="sidebar-menu-category"
            v-for="(cat, index) in state.prodleftList"
          >
            <button
              class="sidebar-accordion-menu"
              :class="{ active: state.showSub[index] }"
            >
              <div class="menu-title-flex">
                <svg class="iconfont menu-title-img" aria-hidden="true">
                  <use :xlink:href="`#${cat.icon}`"></use>
                </svg>
                <p class="menu-title">{{ cat.name }}</p>
              </div>

              <div @click="state.showSub[index] = !state.showSub[index]">
                <svg class="add-icon iconfont" aria-hidden="true">
                  <use xlink:href="#icon-jiahao"></use>
                </svg>
                <svg class="remove-icon iconfont" aria-hidden="true">
                  <use xlink:href="#icon-jianhao"></use>
                </svg>
              </div>
            </button>

            <ul
              class="sidebar-submenu-category-list"
              :class="{ active: state.showSub[index] }"
            >
              <li class="sidebar-submenu-category">
                <div
                  @click.stop="goProductList('category', cat.name)"
                  class="sidebar-submenu-title"
                >
                  <p class="product-name">总数</p>
                  <span class="stock">{{ cat.counts[0] }}</span>
                </div>
              </li>
              <li
                class="sidebar-submenu-category"
                v-for="(keyword, idx) in cat.keyword"
              >
                <div
                  @click.stop="goProductList('keyword', keyword)"
                  class="sidebar-submenu-title"
                >
                  <p class="product-name">{{ keyword }}</p>
                  <span class="stock">{{ cat.counts[1 + idx] }}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 右侧商品缩略图：新品、热门、价格 -->
    <div class="product-minimal">
      <div class="product-showcase">
        <h2 class="title">新品</h2>

        <div class="showcase-wrapper has-scrollbar">
          <div class="showcase-container">
            <router-link
              class="showcase"
              v-for="prod in (state.prodmainList[0].slice(0, 5) as Iproductlist[])"
              :to="`/detail/${prod._id}`"
            >
              <span href="#" class="showcase-img-box">
                <!-- <img :src="prod.imgUrl" class="showcase-img" /> -->
                <img v-imz="prod.imgUrl" class="showcase-img" />
              </span>

              <div class="showcase-content">
                <h4 class="showcase-title">
                  {{ prod.title }}
                </h4>

                <span href="#" class="showcase-category">{{
                  prod.categoryName
                }}</span>

                <div class="price-box">
                  <p class="price">￥ {{ prod.price }}</p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="showcase-container">
            <router-link
              class="showcase"
              v-for="prod in (state.prodmainList[0].slice(5) as Iproductlist[])"
              :to="`/detail/${prod._id}`"
            >
              <span href="#" class="showcase-img-box">
                <img v-imz="prod.imgUrl" class="showcase-img" />
              </span>

              <div class="showcase-content">
                <h4 class="showcase-title">
                  {{ prod.title }}
                </h4>

                <span href="#" class="showcase-category">{{
                  prod.categoryName
                }}</span>

                <div class="price-box">
                  <p class="price">￥ {{ prod.price }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="product-showcase">
        <h2 class="title">热门</h2>

        <div class="showcase-wrapper has-scrollbar">
          <div class="showcase-container">
            <router-link
              class="showcase"
              v-for="prod in (state.prodmainList[1].slice(0, 5) as Iproductlist[])"
              :to="`/detail/${prod._id}`"
            >
              <span href="#" class="showcase-img-box">
                <img v-imz="prod.imgUrl" class="showcase-img" />
              </span>

              <div class="showcase-content">
                <h4 class="showcase-title">
                  {{ prod.title }}
                </h4>

                <span href="#" class="showcase-category">{{
                  prod.categoryName
                }}</span>

                <div class="price-box">
                  <p class="price">￥ {{ prod.price }}</p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="showcase-container">
            <router-link
              class="showcase"
              v-for="prod in (state.prodmainList[0].slice(5) as Iproductlist[])"
              :to="`/detail/${prod._id}`"
            >
              <span href="#" class="showcase-img-box">
                <img v-imz="prod.imgUrl" class="showcase-img" />
              </span>

              <div class="showcase-content">
                <h4 class="showcase-title">
                  {{ prod.title }}
                </h4>

                <span href="#" class="showcase-category">{{
                  prod.categoryName
                }}</span>

                <div class="price-box">
                  <p class="price">￥ {{ prod.price }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="product-showcase">
        <h2 class="title">低价</h2>

        <div class="showcase-wrapper has-scrollbar">
          <div class="showcase-container">
            <router-link
              class="showcase"
              v-for="prod in state.prodmainList[0].slice(0, 5) as Iproductlist[]"
              :to="`/detail/${prod._id}`"
            >
              <span href="#" class="showcase-img-box">
                <img v-imz="prod.imgUrl" class="showcase-img" />
              </span>

              <div class="showcase-content">
                <h4 class="showcase-title">
                  {{ prod.title }}
                </h4>

                <span href="#" class="showcase-category">{{
                  prod.categoryName
                }}</span>

                <div class="price-box">
                  <p class="price">￥ {{ prod.price }}</p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="showcase-container">
            <router-link
              class="showcase"
              v-for="prod in state.prodmainList[0].slice(0, 5) as Iproductlist[]"
              :to="`/detail/${prod._id}`"
            >
              <span href="#" class="showcase-img-box">
                <img v-imz="prod.imgUrl" class="showcase-img" />
              </span>

              <div class="showcase-content">
                <h4 class="showcase-title">
                  {{ prod.title }}
                </h4>

                <span href="#" class="showcase-category">{{
                  prod.categoryName
                }}</span>

                <div class="price-box">
                  <p class="price">￥ {{ prod.price }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {Iproductlist} from "types/prodgrid"
import { reqpostProdmain, reqgetProdleft } from "@/api/index.js";
import sideNav from "@/assets/list.json";
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
import { Ilocation } from "types/header";
import { useEventbus } from "@/hooks/useEventBus";
const eventbus = useEventbus();

// 路由对象
const route = useRoute();
const router = useRouter();
// 数据部分
const state = reactive({
  showSub: new Array(sideNav.length).fill(false),
  prodmainList: [[], [], []],
  prodleftList: Array.from({ length: sideNav.length - 2 }, () => {
    return {
      name: "",
      icon: "",
      keyword: [],
      counts: [],
    };
  }),
});

const goProductList = (type: any, name: string) => {
  // console.log(type,name)
  if (type === "category") {
    // 按照分类名查找
    let location: Ilocation = {
      name: "search",
      params: { keyword: undefined },
      query: {category1Id: '', categoryName: ''}
    };
    let query = { categoryName: name, category1Id: undefined };
    //一定是a标签：一级目录
    query.category1Id = type.category1Id;

    // 由于在搜索框中输入字符搜索时，该参数是在params上，所以要顺带带上params参数
    if (route.params) {
      location.params = route.params;
      //动态给location配置对象添加query属性
      location.query = query;
      //路由跳转
      router.push(location as RouteLocationOptions);
    }
  } else {
    // 按照关键字查找
    let location:Ilocation = {
      name: "search",
      params: { keyword: name },
      query: {category1Id: '', categoryName: ''}
    };
    location.query = route.query;
    router.push(location as RouteLocationOptions);
  }
  eventbus.customEmit("getKeycat");
  eventbus.customEmit("changeIdx");
};

// order 1表示新品 2表示热门 3表示价格 desc降序  asc 升序
// 获取前10样新品 order: "1:desc",
// 获取前10样热门 order: "2:desc",
// 获取前10样低价 order: "3:asc",

onBeforeMount(() => {});
onMounted(() => {
  const order = ["1:desc", "2:desc", "3:asc"];
  reqpostProdmain(order)
    .then((result) => {
      // console.log(result)
      if (result.code === 200) state.prodmainList = result.data.prodmainList;
    })
    .catch((err) => console.log(err));

  reqgetProdleft()
    .then((result) => {
      // console.log(result)
      if (result.code === 200) {
        state.prodleftList = result.data.categoryNames;
      }
    })
    .catch((err) => console.log(err));
});

</script>
<style scoped lang="less">
.iconfont {
  fill: @sonic-silver;
  //   --ionicon-stroke-width: 70px;
}
.row-wrap {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.sidebar {
  background: @white;
  max-width: 320px;

  position: sticky;
  top: 30px;
  left: 0;
  padding: 0;
  min-width: calc(25% - 15px);
  margin-bottom: 30px;
  visibility: visible;
  overflow-y: auto;
  overscroll-behavior: auto;
  z-index: 0;
  .sidebar-category {
    padding: 20px;
    margin-bottom: 30px;
    border: 1px solid @cultured;
    border-radius: @border-radius-md;
    .sidebar-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .sidebar-title {
        color: @onyx;
        font-size: @fs-5;
        letter-spacing: 0.8px;
        font-weight: @weight-600;
      }
    }
    .sidebar-menu-category-list {
      .sidebar-menu-category {
        .sidebar-accordion-menu {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          background: @white;
          .menu-title-flex {
            display: flex;
            align-items: center;
            gap: 10px;

            .menu-title {
              font-size: @fs-5;
              color: @sonic-silver;
              font-weight: @weight-500;
            }
          }
        }
        .sidebar-submenu-category-list {
          border-top: 1px solid @cultured;
          max-height: 0;
          overflow: hidden;
          visibility: hidden;
          transition: 0.5s ease-in-out;
          &.active {
            padding: 13px 0 8px;
            max-height: 140px;
            visibility: visible;
          }
          .sidebar-submenu-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: @sonic-silver;
            font-size: @fs-7;
            padding: 2px 0;
            &:hover {
              color: @eerie-black;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
.sidebar-accordion-menu.active .add-icon,
.sidebar-accordion-menu .remove-icon {
  display: none;
}

.sidebar-accordion-menu .add-icon,
.sidebar-accordion-menu.active .remove-icon {
  display: block;
}
@media screen and (max-width: 900px) {
  .row-wrap {
    display: flex;
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
.product-minimal {
  //   border: 1px solid red;
  margin-bottom: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  //   gap: 10px;

  .product-showcase {
    // border: 1px solid red;
    margin-bottom: 10px;
    // min-width: calc(10% - 10px);
    width: 33%;
    .title {
      border-bottom: 1px solid hsl(0, 0%, 93%);
      // border: 1px solid red;
      margin: 0 5px;
      margin-bottom: 20px;
      padding-bottom: 20px;
    }
    .showcase-wrapper {
      display: flex;
      align-items: center;
      overflow-x: auto;
      overscroll-behavior-inline: contain;
      scroll-snap-type: inline mandatory;
      .showcase-container {
        // border: 1px solid red;
        box-sizing: border-box;
        min-width: 100%;
        padding: 0 5px;
        scroll-snap-align: start;

        .showcase {
          display: flex;
          justify-content: flex-start;
          gap: 10px;
          border: 1px solid @cultured;
          padding: 1rem;
          border-radius: @border-radius-md;
          img {
            width: 4rem;
            height: 4rem;
            object-fit: cover;
          }
          &:not(:last-child) {
            margin-bottom: 15px;
          }
          .showcase-content {
            // width:calc(100%-85px)
            flex: 1;

            .showcase-title {
              color: @eerie-black;
              font-size: @fs-7;
              font-weight: @weight-600;
              margin-bottom: 2px;
            }
            .showcase-category {
              //   width: max-content;
              color: @davys-gray;
              font-size: @fs-8;
              margin-bottom: 3px;
            }
            .price-box {
              .price {
                font-size: @fs-7;
                font-weight: @weight-700;
                color: @salmon-pink;
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 900px) {
      width: 100%;
    }
  }
}
</style>
