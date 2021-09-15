<script setup>
import { ref } from 'vue'
import url from './assets/resources.zip?url'
import { template } from './utils/template'
import { ElMessageBox } from 'element-plus'
import { mergeTime, delay } from './utils/util'
import ConfigForm from './components/ConfigForm.vue'
import CodeReview from './components/CodeReview.vue'

const code = ref('')

const loading = ref(false)

const onSubmit = async form => {
  try {
    const start = mergeTime(form.startDate, form.startTime)
    const { name, no, secondary, className, phone, lasting } = form
    const msg = `${name}-${no}-${secondary}-${className}-${phone}`
    const format = start.format('YYYY-MM-DD HH:mm:ss')
    await ElMessageBox.confirm(
    `<p>发送信息：${msg}</p>
    <p>抢座开始时间：${format}</p>
    <p>脚本持续发送：${lasting} s</p>
    `, 
    '确认信息', 
    {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    code.value = ''
    loading.value = true
    await delay(500)
    loading.value = false
    code.value = template(msg, start.valueOf(), lasting)
  } catch (__) {}
}
</script>

<template>
  <el-row>
    <el-col :span="12">
      <config-form @submit="onSubmit" />
    </el-col>
    <el-col :span="12">
      <code-review v-loading="loading" element-loading-text="代码生成中" :code="code" />
    </el-col>
  </el-row>
  <el-row>
    <a href="https://jioho.gitee.io/blog/tools_%E8%B0%83%E8%AF%95PC%E7%AB%AF%E5%BE%AE%E4%BF%A1%E5%86%85%E7%BD%AE%E6%B5%8F%E8%A7%88%E5%99%A8.html#_2021-08-03-%E6%9C%80%E6%96%B0%E6%9B%B4%E6%96%B0" target="_blank">微信安装开发者工具教程</a>
  </el-row>
  <el-row>
    不用自己起服务器，使用微信打开这个
    <a href="https://wuchendi.gitee.io/chrome/index.html" target="_blank">链接</a>
    即可
  </el-row>
  <el-row>
    <a :href="url" download="resources.zip">资源下载</a>
  </el-row>
</template>

