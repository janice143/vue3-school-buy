<template>
  <div class="category">
    <div class="category-item-container has-scrollbar">
      <div class="category-item" v-for="cat in state.keycatList">
        <div class="category-img-box">
          <svg class="iconfont" aria-hidden="true" >
            <use :xlink:href="`#${cat.icon}`"></use>
          </svg>
        </div>

        <div class="category-content-box">
          <div class="category-content-flex">
            <h3 class="category-item-title">{{ cat.name }}</h3>

            <p class="category-item-amount">({{ cat.count }})</p>
          </div>
          <div class="category-btn" @click="goProductList(cat.type)">更多</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqgetKeycat } from "@/api/index.js";
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
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import {IkeycatList} from 'types/keycat.ts'
import { useEventbus } from "@/hooks/useEventBus";
const eventbus = useEventbus();


const store = useStore();
// 路由对象
const route = useRoute();
const router = useRouter();
// 数据部分
const state = reactive({
  keycatList: {},
});

const goProductList = (type) => {
  if (type.category) {
    // 按照分类名查找
    let location = { name: "search" };
    let query = { categoryName: type.category };
    //一定是a标签：一级目录
    query.category1Id = type.category1Id;

    // 由于在搜索框中输入字符搜索时，该参数是在params上，所以要顺带带上params参数
    if (route.params) {
      location.params = route.params;
      //动态给location配置对象添加query属性
      location.query = query;
      //路由跳转
      router.push(location);
    }
  } else {
    // 按照关键字查找
    let location = {
      name: "search",
      params: { keyword: type.keyword },
    };
    location.query = route.query;
    router.push(location);
  }
  eventbus.customEmit("getKeycat"); // 改变backhome状态
  eventbus.customEmit("changeIdx"); // 主页跳转，改变Index为1
};

onBeforeMount(() => {});
onMounted(() => {
  reqgetKeycat()
    .then((result) => {
      // console.log(result)
      if (result.code === 200) state.keycatList = result.data.keyCount;
    })
    .catch((err) => console.log(err));
});

</script>
<style scoped lang="less">
.category {
  margin-bottom: 30px;
  margin-top: 30px;
  .category-item-container {
    display: flex;
    align-items: center;
    // justify-content: center;
    gap: 10px;
    overflow: auto hidden;
    scroll-snap-type: inline mandatory;
    overscroll-behavior-inline: contain;
    //  border: 1px solid red;

    .category-item {
      min-width: calc(25% - 40px); // 10px的gap+左右padding 30px
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      border: 1px solid @cultured;
      border-radius: @border-radius-md;
      scroll-snap-align: start;
      .category-img-box {
        background: @cultured;
        border: 1px solid hsl(0, 0%, 80%);
        padding: 10px;
        border-radius: @border-radius-sm;
        i {
          font-size: 1.2rem;
        }
      }

      .category-content-box {
        width: 100%;

        .category-content-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .category-item-title {
            color: @eerie-black;
            font-size: @fs-9;
            font-weight: @weight-600;
            text-transform: uppercase;
          }

          .category-item-amount {
            color: @sonic-silver;
            font-size: @fs-11;
          }
        }

        .category-btn {
          color: @salmon-pink;
          font-size: @fs-9;
          font-weight: @weight-500;
          text-transform: capitalize;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    @media screen and (max-width: 900px) {
      .category-item {
        min-width: calc(100% - 32px); // 左右padding30px+左右border2px
      }
    }
  }
}
</style>
