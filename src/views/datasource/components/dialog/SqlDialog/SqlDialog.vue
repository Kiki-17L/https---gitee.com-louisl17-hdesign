<template>
  <div>
    <MyDialog ref="baseDialog" v-bind="$attrs" @close="handleClose">
      <template #title>{{ typename }}</template>
      <template #body>
        <SqlForm ref="form" :visible="$attrs.visible" :dbinfo="$attrs.dbinfo" @refresh="$emit('refresh')" @close="handleClose"></SqlForm>
      </template>
      <template #footer>
        <el-button style="float: left" type="primary" plain @click="testConnection"><i class="iconfont icon-lianjie"></i> 测试链接</el-button>
        <el-button @click="saveDataSource" plain type="success" icon="el-icon-check">保存</el-button>
        <el-button @click="handleClose" plain type="info" icon="el-icon-close">取消</el-button>
      </template>
    </MyDialog>
  </div>
</template>
<script>
  import MyDialog from '@/views/datasource/components/dialog/MyDialog.vue'
  import SqlForm from '@/views/datasource/components/form/SqlForm.vue'
  export default {
    data() {
      return {}
    },
    props: {
      typename: {
        type: String
      }
    },
    components: {
      MyDialog,
      SqlForm
    },
    methods: {
      // 测试数据库连接
      testConnection() {
        this.$refs.form.handleConnect()
      },
      // 处理保存
      saveDataSource() {
        this.$refs.form.handleSave()
      },
      // 处理取消
      handleClose() {
        this.$emit('close')
      }
    }
  }
</script>
<style scoped></style>
