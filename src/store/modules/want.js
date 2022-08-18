import { reqpostWantProduct,reqpostWantNoProduct } from "@/api";

const state = {

  productDetail: [],

};
//mutions是唯一修改state的地方
const mutations = {
    PRODUCTDETAIL(state, detail) {
    state.productDetail = detail;
  },


};
//action|用户处理派发action地方的，可以书写异步语句、自己逻辑地方
const actions = {
    async wantProduct({ commit },info) {
    const result = await reqpostWantProduct(info);
    // console.log(result)
    if (result.code === 200) {
        // console.log(this)
        return true
    }else if(result.code === 401){
      return Promise.reject(new Error('你还未登录！'))
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
  async wantNoProduct({ commit },info) {
    const result = await reqpostWantNoProduct(info);
    // console.log(result)
    if (result.code === 200) {
        // console.log(this)
        return true
    }else if(result.code === 401){
      return Promise.reject(new Error('你还未登录！'))
    }else{
      return Promise.reject(new Error('failed'))
    }
  },



 
};
//计算属性
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
};





