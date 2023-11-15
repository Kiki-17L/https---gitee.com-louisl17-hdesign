<template>
  <div style="background-color: white; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12); border-radius: 5px; width: 100px; display: flex; flex-direction: column">
    <div class="item" v-for="(item, index) in menu" :key="index" @click.stop="handleClick(index)">
      <p style="display: block; width: 100%">{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //菜单项
      menu: [{ text: '新建项目' }, { text: '新建仪表盘' }, { text: '重命名' }, { text: '删除' }],
    }
  },

  methods: {
    /**
     * 点击事件调度
     * @param {*} index 被点击项的索引
     */
    handleClick(index) {
      switch (index) {
        case 0:
          this.createProj()
          break
        case 1:
          this.createDashBoard()
          break
        case 2:
          this.rename()
          break
        case 3:
          this.del()
          break
        default:
          break
      }
    },

    /**
     * TODO:新建一个项目
     */
    createProj() {
      this.$emit('createProj')
    },

    /**
     * TODO:新建一个仪表盘
     */
    createDashBoard() {
      this.$emit('createDashBoard')
    },

    /**
     * TODO:重命名所选中的节点
     */
    rename() {
      this.$emit('rename')
    },

    /**
     * TODO:删除所选中的项目。
     */
    del() {
      this.$emit('delete')
    },
  },
}
</script>

<style scoped>
.item {
  text-align: center;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-items: center;
}

.item:hover {
  background-color: #dcdfe6;
  cursor: pointer;
}
</style>
