import { createStore } from 'vuex'

//引入home|search模块的仓库
import home from "./modules/home";
import detail from "./modules/detail";
import user from "./modules/user";
import want from "./modules/want";
import cart from "./modules/cart";

export default createStore({
  //模块：把小仓库进行合并变为大仓库
  modules: {
    home,
    detail,
    user,
    want,
    cart,
  },
})