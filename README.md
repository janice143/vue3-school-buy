# Vue 3 + Vite

安装插件
添加typescript，这里直接使用vue add typescript会报错，需要先添加一个依赖

npm install @vue/cli-service -D
使用vue添加插件，如果没有安装@vue/cli的先全局安装

npm install -g @vue/cli
然后再使用
vue add typescript

之后一些文件，比如main.js文件变成ts，而且额外多了一些ts文件
一些配置问题参考这个网站
https://www.csdn.net/tags/NtjakgzsNDY0ODYtYmxvZwO0O0OO0O0O.html

导入json文件找不到模块
https://mariusschulz.com/blog/importing-json-modules-in-typescript

get stash 使用
https://www.jianshu.com/p/b2e5a6611183

Cannot find module './App.vue' or its corresponding type declarations.
https://juejin.cn/post/6904831097533071368

getCurrentInstance()必须得在setup里面用，参考https://juejin.cn/post/6918365587248775175
vue3.0通讯 - hook优雅的封装mitt.js
https://blog.csdn.net/u012901970/article/details/126027006

编程式导航，自定义locations，写到router.push()中，出现 自定义locations的类型不能赋值给 RouteLocationRaw类型
https://segmentfault.com/a/1190000039373891

props 类型声明
https://blog.51cto.com/u_15077552/4172068

Element implicitly has an 'any' type because expression of type 'string' can't be used to index
在写message的组件使，template上的动态样式报了上面的错误，
https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
原：:style="state.style[props.type]"
改：:style="state.style[props.type as keyof Istyle]"


Here are two other solutions

When a module is not yours - try to install types from @types:

npm install -D @types/module-name
If the above install errors - try changing import statements to require:

// import * as yourModuleName from 'module-name';
const yourModuleName = require('module-name');

报Property 'content' does not exist on type 'AxiosResponse<any>'
https://github.com/axios/axios/issues/1510


This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
