import { reqgetProductDetail, reqpostAddToCart } from "@/api";

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
  async getProductDetail({ commit },productId) {
    const result = await reqgetProductDetail(productId);
    // console.log(result)
    if (result.code == 200) {
      commit("PRODUCTDETAIL", result.data);
    }
  },
  async addProductinToCart({ commit },productId) {
    const result = await reqpostAddToCart(productId);
    // console.log(result)
    if (result.code == 200) {
      //返回的是成功的标记
      return true
    } else {
      //返回的是失败的标记
      return Promise.reject(new Error("failed"))
    }
    
  },


 
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


