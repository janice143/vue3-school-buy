import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//引入全局样式
import "./styles/common.less"
// import "./styles/iconfont.js"

import store from './store'

const app = createApp(App) // 创建实例

// 全局挂载$API接口
// 统一引入
import * as API from './api/index';
app.config.globalProperties.$API = API
// 全局bus
import bus from '@/utils/bus'
app.config.globalProperties.$bus = bus

// 引入消息弹框组件
import Message from '@/components/Message/message.js';
app.use(Message); // 会去执行Message.js中的install方法

import directivePlugin from '@/directives/imz.js'

app.use(directivePlugin)

app.use(router)
    .use(store)

app.mount('#app')
