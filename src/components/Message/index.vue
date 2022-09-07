<template>
  <div>
    <Transition name="down">
      <div class="my-message" :style="state.style[props.type as keyof Istyle]" v-show="state.isShow">
        <!-- 上面绑定的是样式 -->
        <!-- 不同提示图标会变 -->
        <svg class="iconfont" aria-hidden="true" >
            <use :xlink:href="`#${state.style[props.type as keyof Istyle].icon}`"></use>
          </svg>
        <span class="text">{{ props.text }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from "vue";
import { Istyle } from "types/message"
// 数据部分
const style:Istyle = {
  warn: {
    icon: "icon-jinggao",
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
  },
  error: {
    icon: "icon-shibai",
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
  },
  success: {
    icon: "icon-zhengque",
    color: "#67C23A",
    backgroundColor: "rgb(240, 249, 235)",
    borderColor: "rgb(225, 243, 216)",
  },
};
const state = reactive({
  style: style,
  isShow: false,
  duration: 1500,
});
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    // warn 警告  error 错误  success 成功
    default: "warn",
  },
});
const close = (timer:number | undefined)=> {
      state.isShow = false;
      clearTimeout(timer);
      timer = undefined;
}
onMounted(() => {
    state.isShow = true;
    let timer:number = setTimeout(() => {
      if (state.isShow) {
        close(timer);
      }
    }, state.duration);
});
</script>
<style scoped lang="less">
.down {
  &-enter {
    & {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.my-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 10px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
