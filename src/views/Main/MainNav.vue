<template>
  <div
    class="nav-content"
    @click="handleClick"
    :class="{ open: state.isOpen, fadeout:state.isFadeout }"
  >
    <div class="toggle-btn">
      <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-jiahao-copy"></use>
      </svg>
    </div>

    <button
      style="--i: 4"
      :class="{ active: state.order.split(':')[0] === '1' }"
      @click="changeOrder('1')"
    >
      新品
      <span v-show="state.order.split(':')[0] === '1'"
        >&nbsp;{{ state.order.split(":")[1] === "desc" ? "↓" : "↑" }}</span
      >
    </button>

    <button
      style="--i: 3"
      :class="{ active: state.order.split(':')[0] === '2' }"
      @click="changeOrder('2')"
    >
      <span>热门</span>
      <span v-show="state.order.split(':')[0] === '2'"
        >&nbsp;{{ state.order.split(":")[1] === "desc" ? "↓" : "↑" }}</span
      >
    </button>

    <button
      style="--i: 2"
      :class="{ active: state.order.split(':')[0] === '3' }"
      @click="changeOrder('3')"
    >
      价格
      <span v-show="state.order.split(':')[0] === '3'"
        >&nbsp;{{ state.order.split(":")[1] === "desc" ? "↓" : "↑" }}</span
      >
    </button>

    <button
      style="--i: 1"
      @click="goToTop"
    >
    <svg class="iconfont" aria-hidden="true">
        <use xlink:href="#icon-to-top"></use>
      </svg>
    </button>

  </div>
</template>

<script setup lang="ts">
import {
  reactive
} from "vue";
import { useRoute, useRouter } from "vue-router";

// 数据部分
const state = reactive({
  order: "1:desc",
  isOpen: false,
  isFadeout: true,
});
//   改变菜单栏的排序方式
const changeOrder = (order:string) => {
  // order 1表示新品 2表示热门 3表示价格
  const newOrder = `${order}:${
    state.order.split(":")[1] === "desc" ? "asc" : "desc"
  }`;
  state.order = newOrder;
  // 把最新的order传给父组件
  emit("getNewOrder", newOrder);

};
// 子组件触发自定义事件，传值给父组件
const emit = defineEmits(["getNewOrder"]);
let t:number | undefined = undefined

const handleClick = ()=>{
  state.isOpen = !state.isOpen
  state.isFadeout = false
  // console.log(t)
  if(t) window.clearTimeout(t)

   t = window.setTimeout(()=>{
    state.isFadeout = true
    state.isOpen = false
    window.clearTimeout(t)
  },3000)
}

const goToTop = ()=>{
  // console.log('got to top')
  // window.scrollTo(0,0)

   const cubic = (value:number) => Math.pow(value, 3)

  const easeInOutCubic = (value:number) => value < 0.5 ?
    cubic(value * 2) / 2 :
    1 - cubic((1 - value) * 2) / 2
    
   // 记录开始时间
    const beginTime = Date.now()
    // 初始位置
    const beginValue = document.documentElement.scrollTop;
    const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
    const frameFunc = () => {
      // 进度，500ms 内将页面滚动到顶部
      const progress = (Date.now() - beginTime) / 500
      if (progress < 1) {
        // 根据进度修改 scrollTop 的值
        document.documentElement.scrollTop = beginValue * (1 - easeInOutCubic(progress))
        rAF(frameFunc)
      } else {
        document.documentElement.scrollTop = 0
      }
    }
    rAF(frameFunc)
}
</script>
<style scoped lang="less">
.nav-content {
  position: fixed;
  z-index: 999;
  bottom: 50%;
  right: 0;
  // box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  cursor: grab;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: 1;
  &.fadeout{
    opacity: 0.2;
  }
  &.open .toggle-btn i {
    transform: rotate(-225deg);
  }
  &.open .toggle-btn{
    border-radius: 0;
  }
  &.open button {
    opacity: 1;
    transform: translateX(calc(var(--i) * (-3rem)));
    
  }
  & > * {
    // position: absolute;
    box-sizing: border-box;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @cultured;
    color: @eerie-black;
    font-size: @fs-8;

    &:first-child {
      background-color: @salmon-pink;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1000;
      i {
        transition: all 0.6s ease;
      }
    }
  }
  button {
    position: absolute;
    transition: all 0.6s ease;
    opacity: 0;
    &.active{
      background: @spanish-gray;
    }
  }
}

// .nav-content span a i {
//   font-size: 24px;
//   color: #0e2431;
//   transform: rotate(calc(var(--i) * (360deg / -8)));
//   opacity: 0.8;
//   transition: 0.2s;
// }
// .nav-content span a:hover i {
//   opacity: 1;
// }
</style>
