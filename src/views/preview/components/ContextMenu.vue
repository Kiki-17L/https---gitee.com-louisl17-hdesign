<template>
  <div v-if="showContextMenu" class="context-menu" :style="{ top: `${position.y}px`, left: `${position.x}px` }">
    <ul>
      <li @click="createFile"><i class="el-icon-folder-add"></i> 创建文件</li>
      <li @click="deleteFile"><i class="el-icon-folder-remove"></i> 删除文件</li>
    </ul>
  </div>
</template>
  
<script>
export default {
  mounted() {
    // 添加文档级别的点击事件监听器
    document.addEventListener('click', this.closeContextMenu);
  },
  props: {
    showContextMenu: Boolean,
    position: Object,
  },
  methods: {
    createFile() {
      this.$emit('create-file');
      this.closeContextMenu();
    },
    deleteFile() {
      this.$emit('delete-file');
      this.closeContextMenu();
    },
    closeContextMenu() {
      this.$emit('close-context-menu');
    },
  },
};
</script>
  
<style scoped>
.context-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 8px 16px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
  