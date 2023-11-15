<template>
  <div>
    <MyDialog v-bind="$attrs" @close="handleClose">
      <template #title>{{ typename }}</template>
      <template #body>
        <ExcelForm ref="form" :visible="$attrs.visible" :typename="typename" @close="handleClose" @refresh="$emit('refresh')"></ExcelForm>
      </template>
      <template #footer>
        <el-button @click="saveDataSource" plain type="success" icon="el-icon-check">保存</el-button>
        <el-button @click="handleClose" plain type="info" icon="el-icon-close">取消</el-button>
      </template>
    </MyDialog>
  </div>
</template>
<script>
import MyDialog from '@/views/datasource/components/dialog/MyDialog.vue'
import ExcelForm from '@/views/datasource/components/form/ExcelForm.vue'
export default {
  data() {
    return {}
  },
  components: {
    MyDialog,
    ExcelForm,
  },
  props: {
    typename: String,
  },
  methods: {
    // 保存数据源
    saveDataSource() {
      this.$refs.form.handleSave()
    },

    // 处理对话框关闭
    handleClose() {
      this.$emit('close')
    },
  },
}
</script>
<style scoped></style>
