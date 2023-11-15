<template>
  <div class="manage">
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <!-- 用户的表单信息 -->

      <el-form ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名" v-model="form.name"> </el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input placeholder="请输入年龄" v-model="form.age"> </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker v-model="form.birth" type="date" placeholder="选择日期"> </el-date-picker>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header"></div>
    <el-button @click="dialogVisible = true" type="primary"> + 新增 </el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="birth" label="出生日期"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
      },
      // 生成假数据并替换tableData
      tableData: [],
    }
  },
  methods: {
    // 生成假数据的方法
    generateFakeData() {
      const fakeData = []

      for (let i = 1; i <= 10; i++) {
        fakeData.push({
          name: `用户${i}`,
          age: Math.floor(Math.random() * 30 + 20),
          sex: Math.random() < 0.5 ? '1' : '0',
          birth: '2000-01-01',
        })
      }

      return fakeData
    },
    //提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.name = ''
          this.form.age = ''
          this.form.sex = ''
          this.form.birth = ''

          // 关闭弹窗
          this.dialogVisible = false
        }
      })
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
  },

  mounted() {
    // 调用生成假数据的方法并替换tableData
    this.tableData = this.generateFakeData()
  },
}
</script>
