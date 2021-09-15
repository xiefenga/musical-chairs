<script setup>
import { reactive, ref, defineEmits } from 'vue'

const emit = defineEmits(['submit'])

const formRef = ref(null)

const form = reactive({
  name: '',
  no: '',
  secondary: '',
  className: '',
  phone: '',
  startDate: new Date(),
  startTime: new Date(),
  lasting: 2
})

const rules = {
  name: { required: true , message: '请输入姓名'},
  no: { required: true , message: '请输入学号'},
  secondary: { required: true, message: '请输入学院'},
  className: { required: true, message: '请输入班级' },
  phone: { required: true, message: '请输入手机号' },
  startDate: { required: true, message: '请输入开始日期' },
  startTime: { required: true, message: '请输入开始时间' },
  lasting: { required: true, message: '请输入持续时间' },
}

const submit = async () => {
  try {
    await formRef.value.validate()
    emit('submit', form)
  } catch (__) {}
}

</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="90px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="学号" prop="no">
          <el-input v-model="form.no" placeholder="请输入学号" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="学院" prop="secondary">
          <el-input v-model="form.secondary" placeholder="请输入学院" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="班级" prop="className">
          <el-input v-model="form.className" placeholder="请输入班级" />
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="12">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="开始时间" prop="startDate">
          <el-date-picker v-model="form.startDate" type="date" placeholder="选择日期" />
        </el-form-item>
      </el-col>
      <el-col  :span="12">
        <el-form-item label="开始时间" prop="startTime">
          <el-time-picker
            v-model="form.startTime"
            placeholder="选择时间"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-form-item label="持续时长" prop="lasting">
        <el-input-number v-model="form.lasting" size="small" /> s
      </el-form-item>
    </el-row>

    <el-row>
      <el-col :offset="5" :span="12">
        <el-button @click="submit" :style="{width: '100%'}" type="primary" size="medium">生成代码</el-button>
      </el-col>
    </el-row>

  </el-form>
</template>

<style scoped>
.el-form {
  border: 1px solid;
  padding: 50px;
}

</style>