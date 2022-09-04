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



This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
