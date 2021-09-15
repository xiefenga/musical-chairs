<script setup>
import Clipboard from 'clipboard'
import { triggerClick } from '../utils/util'
import { onMounted, defineProps, ref } from 'vue'
import { ElMessage as message } from 'element-plus'

const props = defineProps({
  code: {
    type: String,
    required: true
  }
})

const finalCode = ref('')

const clipboardRef = ref(null)

onMounted(() => {
  const clipboard = new Clipboard('#clipboard', {
    text: () => finalCode.value
  })
  clipboard.on('success', () => {
    message.success('复制成功')
  })
  clipboard.on('error', () => {
    message.error('复制失败')
  })
})

const onClick = async () => {
  if (clipboardRef.value) {
    finalCode.value = (await Terser.minify(props.code)).code
    triggerClick(clipboardRef.value)
  }
}

</script>

<template>
  <div class="code-review">
    <el-input type="textarea" :rows="18" v-model="code" />
    <el-button size="small" type="primary" @click="onClick">点击复制</el-button>
    <button id="clipboard" ref="clipboardRef" :style="{ display: 'none' }">clipboard</button>
  </div>
</template>

<style scoped>
.code-review {
  padding: 20px;
  text-align: center;
}
</style>
