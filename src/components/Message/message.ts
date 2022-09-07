import Message from "./index.vue";
import { App, createVNode, render } from "vue";

interface Iprops{
  text: string,
  type: string
}
export default {
  // 向外暴露install方法
  install(app: App<Element>) {
    let message:null = null;

    function show(props:Iprops) {
      // 添加方法，后面挂载到$message上
      if (!message) {
        const div = document.createElement("div");
        // div.setAttribute("class", "xtx-message-contsiner");
        document.body.appendChild(div);

        // 创建虚拟 DOM
        const VNode = createVNode(Message, {...props});
        // 通过 render 函数挂载到页面中
        render(VNode, div);
      }
    }

    app.config.globalProperties.$message = {
      show,
    };
  },
};
