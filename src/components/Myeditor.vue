<template>
  <!-- 编辑器 -->
  <Editor
    style="height: 300px; overflow-y: hidden;"
    :defaultConfig="state.editorConfig"
    v-model="props.description"
    @onCreated="handleCreated"
  />
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { Editor } from "@wangeditor/editor-for-vue";
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
  watch,
  shallowRef,
  onBeforeUnmount,
} from "vue";
import { useRoute, useRouter } from "vue-router";
// 路由对象
const route = useRoute();
const router = useRouter();
// 数据部分
const state = reactive({

  editorConfig: {
    readOnly: true, // 设置只读属性
  },
});
const props = defineProps({
  description: String,
});
// 编辑器实例
const editorRef = shallowRef();

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

</script>
<style scoped lang="less"></style>
