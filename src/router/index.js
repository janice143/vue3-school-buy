import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
// 多次跳转相同路由会出现问题，下面可以解决
// const originalRouter = Router.prototype.push;
// Router.prototype.push = function(location){
//     return originalRouter.call(this,location).catch(err=>err)
// }



// 配置路由
const router = createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes:[
        // 重定向
        {
            path: '/',
            redirect:'/home',
        },
        // 主页
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Home/index.vue'),
            meta:{
                isShow:true,
                keepAlive:false,
            },
        },
        {
            path:'/search/:keyword?', // 占位，路由传参
            component:() => import('../views/Main/Index.vue'),
            name:'search',
            meta:{
                isShow:true,
                keepAlive: true
            },
        },
        {
            path:'/detail/:productId',
            component:() => import('../views/Detail/index.vue'),
            meta:{
                isShow:true,
                keepAlive: false,
   
            },
            name:'detail'

        },
        {
            path:'/register',
            component:() => import('../views/Register.vue'),
            meta:{
                isShow:false,
                keepAlive: true
            }
        },
        {
            path:'/login',
            component:() => import('../views/Login.vue'),
            meta:{
                isShow:false,
                keepAlive: true
            }
        },
        {
            path: '/completeinfo',
            component: () => import('../views/CompleteInfo.vue'),
            meta:{
                isShow:false,
                keepAlive: true,
            }
        }
       
    ]
})

// 注册一个全局前置守卫
router.beforeEach((to, from,next) => {
    // console.log(store);
    const token = store.state.user.token
    const name = store.state.user.userInfo.name
   
    // 如果登录了，用户想再去登录，不能去。只能放行到首页
    if(token){
       
        //已经登录而且还想去登录------不行
        if(to.path === "/login" || to.path === "/register"){
           next('/')
           
        }else{
        // 登录后，如果有用户名（说明获取了用户信息），那就放行，如果没有用户名，那就派发ation获取用户信息
        
          if(name){
            
            next()
          }else{
            
            //登陆了且没有用户信息
            //在路由跳转之前获取用户信息且放行
            (async()=>{
                try {
                    await store.dispatch('getUser')
                    next()
                } catch (error) {
                  //token失效,重新登录
                    await store.dispatch('userLogoutClear')
                    next('/home')
                }
            })()
          }
        }
    }else{
       
        // 用户未登录，不能去/cart,/trade,/center
        const toPath = to.path
        // console.log(toPath)
        if(toPath === '/completeinfo'){
            
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath)
        }else{
            //去的不是上面这些路由（home|search|shopCart）---放行
            next()
        }
       
    }
})
export default router;

