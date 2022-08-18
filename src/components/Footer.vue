<template>
  <div class="footer">
    <div class="footer-container">
      <div class="copyright">
        <p>&COPY; 师大Buy 校园二手闲置信息平台</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// 路由对象
const route = useRoute();
const router = useRouter();
// 数据部分
const state = reactive({})
onBeforeMount(() => {
})
onMounted(() => {
})
watchEffect(()=>{
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
//defineExpose({
// ...toRefs(state)
//})

</script>
<style scoped lang='less'>
.footer {
  background-color: #eaeaea;

  .footer-container {
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;

    .copyright {
      padding:0.2rem;

      p {
        margin: 1rem 0;
        text-align: center;
      }
    }
  }
}
</style>