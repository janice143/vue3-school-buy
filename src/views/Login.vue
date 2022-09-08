<template>
  <div class="login">
    <div class="container">
      <div class="title">
        <span>账户登录</span>
      </div>
      <form action="#">
        <div class="row">
          <span class="svg-container">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-yonghu"></use>
            </svg>
          </span>

          <input
            type="text"
            placeholder="用户名"
            v-model="state.username"
            required
          />
        </div>
        <div class="row">
          <span class="svg-container">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-mima"></use>
            </svg>
          </span>

          <input
            type="password"
            placeholder="请输入密码"
            v-model="state.password"
            required
          />
        </div>
        <div class="row row3">
          <span class="svg-container">
            <svg class="iconfont" aria-hidden="true">
              <use xlink:href="#icon-yanzhengma"></use>
            </svg>
          </span>
          <input
            type="text"
            placeholder="验证码"
            maxlength="4"
            v-model="state.codeNumber"
          />
          <div class="yanzhengma">
            <img v-show="state.captchaCodeImg" :src="state.captchaCodeImg" />
            <svg
              class="iconfont"
              aria-hidden="true"
              @click="getCaptchaCode"
              style="cursor: pointer"
            >
              <use xlink:href="#icon-huanyipi"></use>
            </svg>
          </div>
        </div>
        <!-- <div class="pass"><a href="#">Forgot password?</a></div> -->
        <div class="row button">
          <input type="submit" value="登录" @click.prevent="userLogin" />
        </div>
        <!-- <div class="btn" >登&nbsp;&nbsp;录</div> -->
        <div class="signup-link">
          还不是用户？
          <router-link to="/register">现在去注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reqpostCaptchas } from "@/api/index.js";
import {
  reactive,
  onBeforeMount,
  onMounted,
  watchEffect,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter, RouteLocationOptions } from "vue-router";
import { useStore } from "vuex";
import { Iresult } from "types/keycat";
const currentInstance = getCurrentInstance();
const $message = currentInstance?.appContext.config.globalProperties.$message;

// 路由对象
const route = useRoute();
const router = useRouter();
const store = useStore();
// 数据部分
const state = reactive({
  username: "", // 本来想写userId的，这样可以同时用 用户名，手机号或者学号登录，现在只验证用户名登录
  password: "",
  codeNumber: "", // 验证码
  computedTime: 0, // 倒数记时
  captchaCodeImg: undefined, //验证码图片地址
});

const userLogin = () => {
  const { username, password, codeNumber } = state;
  // console.log(codeNumber)
  if (!username) {
    $message.show({ text: "请输入用户名", type: "error" });
    return;
  } else if (!password) {
    $message.show({ text: "请输入密码", type: "error" });
    return;
  } else if (!codeNumber) {
    $message.show({ text: "请输入验证码", type: "error" });
    return;
  }
  store
    .dispatch("userLoginByInfo", {
      username,
      password,
      codeNumber,
    })
    .then(() => {
      //登录的路由组件：看路由当中是否包含query参数，有：调到query参数指定路由，没有：调到home
      const toPath = route.query.redirect || "/home";
      router.push(toPath as RouteLocationOptions);
    })
    .catch((err) => {
      $message.show({ text: err.message, type: "error" });

      getCaptchaCode();
    });
};

//获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
const getCaptchaCode = () => {
  reqpostCaptchas().then((res: Iresult) => {
    // console.log(res)
    state.captchaCodeImg = res.data.code;
  });
};

onBeforeMount(() => {});
onMounted(() => {
  getCaptchaCode();
});
</script>
<style scoped lang="less">
* {
  box-sizing: border-box;
}
.login {
  width: 100vw;
  height: 100vh;
  background: #283c86; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #45a247,
    #283c86
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #45a247,
    #283c86
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  .container {
    max-width: 440px;
    margin: 10% auto;

    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
    .title {
      height: 90px;
      // background: rgb(254,254,254);
      border-radius: 5px 5px 0 0;
      // color: #;
      font-size: 30px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    form {
      padding: 30px 25px 25px 25px;
      .row {
        height: 45px;
        margin-bottom: 15px;
        position: relative;
        input {
          height: 100%;
          width: 100%;
          outline: none;
          padding-left: 60px;
          border-radius: 5px;
          border: 1px solid lightgrey;
          font-size: 16px;
          transition: all 0.3s ease;
          &:focus {
            border-color: purple;
            box-shadow: inset 0px 0px 2px 2px rgba(127, 10, 127, 0.5);
          }
        }
        &::placeholder {
          color: #999;
        }
        // border:1px solid red;
        span {
          position: absolute;
          width: 47px;
          height: 100%;
          color: #fff;
          font-size: 18px;
          // background: #16a085;
          // border: 1px solid #16a085;
          border-radius: 5px 0 0 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .row3 {
        input {
          height: 100%;
          width: 55%;
        }
        .yanzhengma {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 40%;
          display: flex;
          flex-direction: row;
          align-items: center;
          & > * + * {
            margin-left: 10px;
          }
          img {
            border: 1px solid black;
          }
        }
      }
      .button input {
        color: #fff;
        font-size: 20px;
        font-weight: 500;
        padding-left: 0px;
        background: @salmon-pink;
        border: 1px solid @salmon-pink;
        cursor: pointer;
        &:hover {
          background: @eerie-black;
        }
      }
      .signup-link {
        text-align: center;
        margin-top: 20px;
        font-size: 17px;
        a {
          color: @salmon-pink;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
