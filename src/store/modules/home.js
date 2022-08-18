import { reqgetProductList, reqgetUsersdetail } from '@/api'

//home模块的仓库
const state = {
    // 全部商品
    productlist:[],
    // 商品发布人信息
    userlist:[]

};
//mutions是唯一修改state的地方
const mutations = {
  GETPRODUCTLIST(state, productlist) {
    state.productlist = productlist;
  },
  GETUSERSDETAIL(state,users){
    state.userlist = users
  }

};
//action|用户处理派发action地方的，可以书写异步语句、自己逻辑地方
const actions = {
  async getProductList({ commit },conditions={}) {
    const result = await reqgetProductList(conditions)
    // console.log(result.data.wantId)
    commit("GETPRODUCTLIST", result.data);
  },
  async getUsersdetail({commit}){
    //需要用await接受成功返回的结果，await必须要结合async一起使用（CP）
    const result = await reqgetUsersdetail();
    // console.log(result)
    commit("GETUSERSDETAIL", result.data);
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
