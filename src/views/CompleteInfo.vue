<template>
  <div class="login">
    <div class="container">
      <div class="wrapper">
        <div class="title">
          <span>账户注册</span>
        </div>
        <div class="signup-link">
          已有账号？
          <router-link to="/login">现在去登录</router-link>
        </div>

        <div class="form">
          <el-form
            status-icon
            ref="registerForm"
            label-width="100px"
            class="demo-ruleForm"
            :model="state.registerForm"
            :rules="state.rules"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model="state.registerForm.username"
                autocomplete="off"
                :disabled="true"
              ></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input
                type="text"
                v-model="state.registerForm.phone"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="学号" prop="studentnumber">
              <el-input
                type="text"
                v-model="state.registerForm.studentnumber"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="寝室" prop="place">
              <el-select
                placeholder="请选择"
                v-model="state.registerForm.place"
              >
                <el-option
                  :label="c1"
                  :value="c1"
                  v-for="(c1, idx) in state.places"
                  :key="idx"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button class="btn-primary" @click="submitForm(registerForm)"
                >提交</el-button
              >
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>

          <div class="tips">
            注：手机号、学号和寝室信息为选填，但是如果后期要进入后台管理系统发布商品，这些信息需要完善。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ref,
  reactive,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import type { FormInstance } from 'element-plus'

// 路由对象
const route = useRoute();
const router = useRouter();
const store = useStore();
const currentInstance = getCurrentInstance();
const $message = currentInstance?.appContext.config.globalProperties.$message

// const registerForm = ref(null);
const registerForm = ref<FormInstance>()

const validatePhone = (rule:any, value:string, callback:any) => {
  if (value === "") {
    callback(new Error("必须填入手机号"));
  } else {
    setTimeout(() => {
      if (!new RegExp(/^1\d{10}$/).test(value)) {
        callback(new Error("不符合手机格式"));
      }
      callback();
    }, 1000);
  }
};
const validateStudentnumber = (rule:any, value:string, callback:any) => {
  if (value === "") {
    callback(new Error("必须填学号"));
  } else {
    callback();
  }
};
const validatePlace = (rule:any, value:string, callback:any) => {
  if (value === "") {
    callback(new Error("必须填寝室"));
  } else {
    callback();
  }
};
// 数据部分
const state = reactive({
  places: [
    "桃源公寓",
    "杏园公寓",
    "初阳公寓",
    "桂苑公寓",
    "启明公寓",
    "留学生公寓",
  ],
  registerForm: {
    username: "",
    phone: "",
    studentnumber: "",
    place: "",
  },
  rules: {
    phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
    studentnumber: [
      { required: true, validator: validateStudentnumber, trigger: "blur" },
    ],
    place: [{ required: true, validator: validatePlace, trigger: "blur" }],
  },
});

//  用户注册
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userComplete()
        .then((res) => {
          $message.show({ text: res, type: "success" });
          //看路由当中是否包含query参数，有：调到query参数指定路由，没有：调到home
          const toPath = "/home";
          router.push(toPath);
        })
        .catch((err) => {
          $message.show({ text: String(err), type: "error" });
        });
    } else {
      // console.log('error submit!!');
      $message.show({ text: "请填完整信息！", type: "error" });
      return false;
    }
  });
};
const resetForm = () => {
  state.registerForm.place = "";
  state.registerForm.studentnumber = "";
  state.registerForm.phone = "";
};
const getData = () => {
  const userinfo = store.state.user.userInfo;
  // console.log(userinfo)
  // userinfo.place.length > 0 && userinfo.phone.length > 0 && userinfo.studentnumber.length > 0
  if (Object.keys(userinfo).length > 0) {
    state.registerForm.username = userinfo.username;
  }
};
const userComplete = () => {
  const { username, phone, studentnumber, place } = state.registerForm;
  return store.dispatch("userCompleteByInfo", {
    username,
    phone,
    studentnumber,
    place,
  });
};

onMounted(() => {
  getData();
});
defineExpose({
  registerForm,
});
</script>
<style scoped lang="less">
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
}
.container {
  max-width: 660px;
  padding: 0 20px;
  margin: 170px auto;
  .wrapper {
    width: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 4px 10px 1px rgba(0, 0, 0, 0.1);
    .form {
      .btn-primary {
        background: @salmon-pink;
        color: white;
        &:hover {
          background: @eerie-black;
        }
      }
    }
  }
}

.wrapper .title {
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
.wrapper .title img {
  height: 80px;
}
.wrapper .form {
  padding: 30px 25px 25px 25px;
}

.wrapper .signup-link {
  text-align: center;
  // margin-top: 20px;
  font-size: 14px;
}
.wrapper .signup-link a {
  color: @salmon-pink;
  text-decoration: none;
}
.form .signup-link a:hover {
  text-decoration: underline;
}
.tips {
  font-size: 0.5rem;
}
</style>
