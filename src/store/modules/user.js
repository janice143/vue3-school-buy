import { reqpostUserRegister, reqpostUserLogin, reqgetUserInfo, reqpostUserLogout,reqpostuserComplete } from "@/api";
import { setToken, getToken,removeToken} from "@/utils/token";

const state = {
    token: getToken(),
    userInfo:{}

};
//mutions是唯一修改state的地方
const mutations = {
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state,getUser){
        state.userInfo = getUser;
    },
    CLEAR(state){
        state.token = '';
        state.userInfo = '';
        removeToken();
    }


};
//action|用户处理派发action地方的，可以书写异步语句、自己逻辑地方
const actions = {
    // 用户注册
    async userRegsiterByInfo({commit},userInfo){
        const res = await reqpostUserRegister(userInfo);

        if(res.code === 200){
            return '你已经成功注册'
        }else{
            return Promise.reject(new Error(res.msg))
        }
    },
    // 用户信息完善
    async userCompleteByInfo({commit},userInfo){
        const res = await reqpostuserComplete(userInfo);
        if(res.code === 200){
            return '用户信息已经完善'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    

    // 用户登录
    async userLoginByInfo({commit},userInfo){
        const res = await reqpostUserLogin(userInfo);
        // console.log(res)
        if(res.code === 200){
            commit('USERLOGIN',res.data.token)
            // 将token持久化存储
            setToken(res.data.token);
            return true
        }else{
            return Promise.reject(new Error(res.msg))
        }
    },
    // 获取用户信息
    async getUser({commit}){
        const res = await reqgetUserInfo();
        // console.log(res);  
        if(res.code === 200){
            // 提交用户信息
            commit('USERINFO',res.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(res.msg))
        }
    },
    // 退出登录
    async userLogoutClear({commit}){
        const res = await reqpostUserLogout();
        // console.log(res);
        if(res.code === 200){
            commit('CLEAR')
            return 'OK'
        }else{
            return Promise.reject(new Error('failed'))
        }
    }

 
};
//计算属性
const getters = {

}


export default {
  state,
  mutations,
  actions,
  getters,
};


