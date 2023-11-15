<template>
  <div>
    <el-dialog v-bind="$attrs" @close="handleClose" :close-on-click-modal="false" @open="handleOpen">
      <template #title>
        <slot name="title"></slot>
      </template>

      <!--主体-->
      <slot name="body"></slot>

      <!--页脚-->
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleOpen() {
      this.$emit('open')
    },
  },
}
</script>
<style scoped></style>
