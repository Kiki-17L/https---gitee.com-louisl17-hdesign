<template>
  <div class="menu" style="">
    <div class="item" @click.stop="handleClick(menu[0].id)">
      <p style="display: block; width: 100%">{{ menu[0].text }}</p>
    </div>
    <div class="item" @click.stop="handleClick(menu[1].id)">
      <p style="display: block; width: 100%">{{ menu[1].text }}</p>
    </div>
    <div v-if="isRDB" class="item" @click.stop="handleClick(menu[2].id)">
      <p style="display: block; width: 100%">{{ menu[2].text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //菜单项

      menu: [
        { id: 0, text: '重命名', type: 0 },
        { id: 1, text: '删除', type: 0 },
        { id: 2, text: '测试连接', type: 1 },
      ],
    }
  },
  props: {
    isRDB: Boolean, // 判断是否是关系数据库
  },

  methods: {
    /**
     * 点击事件调度
     * @param {*} index 被点击项的索引
     */
    handleClick(index) {
      switch (index) {
        case 0:
          this.rename()
          break

        case 1:
          this.del()
          break
        case 2:
          this.testConnection()
          break
        default:
          break
      }
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

    /**
     * TODO:关系数据源测试连接
     */
    testConnection() {
      this.$emit('testConnection')
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

.menu {
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  width: 80px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
