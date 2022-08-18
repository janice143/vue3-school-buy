import requests from "./request.js"

// 获取全部的商品列表
export const reqgetProductList = (conditions)=> requests.post('/front/productlist',conditions)

// 获取主页上的商品的用户信息
export const reqgetUsersdetail = () => requests.get('/product/users')

// 按照商品id获取商品详情
export const reqgetProductDetail = (productId) => requests.get(`/productdetail/${productId}`)

// 注册
export const reqpostUserRegister = (userInfo) => requests.post('/user/register',userInfo)

// 完善信息
export const reqpostuserComplete = (userInfo) => requests.post('/user/complete',userInfo)

// 登录
export const reqpostUserLogin = (userInfo) => requests.post('/user/login',userInfo)

//获取用户信息【需要带着用户的token向服务器要用户信息】
//URL:/api/user/passport/auth/getUserInfo  method:get 
export const reqgetUserInfo = ()=>requests.get('/user/getInfo');

// 退出登录
export const reqpostUserLogout = () => requests.get('/user/logout')

// 想要商品
export const reqpostWantProduct = (info) => requests.post(`/want/${info.id}`,info)

// 取消想要商品
export const reqpostWantNoProduct = (info) => requests.post(`/wantno/${info.id}`,info)

// 加入购物车 
export const reqpostAddToCart = (productId) => requests.post(`/cart/addcart/${productId}`,productId)

// 获取购物车列表
export const reqgetCartList = () => requests.get(`/cart/list`)

// 删除购物车物理
export const reqgetDeleteCart = (productId) => requests.delete(`/cart/delete/${productId}`)

// 获取验证码
export const reqpostCaptchas = () => requests.post('/v1/captchas')

// 获取首页的keycat
export const reqgetKeycat = () => requests.get(`/home/keycat`)

// 获取首页的三列：新品、热门，低价商品
export const reqpostProdmain = (order) => requests.post(`/home/prodmain`,order)

// 获取首页左侧的展开分类框的数据
export const reqgetProdleft = () => requests.get(`/home/prodleft`)