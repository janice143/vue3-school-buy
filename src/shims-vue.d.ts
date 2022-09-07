// /* eslint-disable */
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

declare module '*.vue' {
  import { Component } from 'vue'
  const component: Component
  export default component
}

// import Message from '@/components/Message/message'
// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     $message: Message; //挂载类型
//   }
// }
