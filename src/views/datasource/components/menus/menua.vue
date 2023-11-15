<template>
  <div class="menu">
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
      menu: [{ text: '基于此表创建工作表' }],
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
          this.createView()
          break
        default:
          break
      }
    },

    /**
     * TODO:基于此表创建工作表
     */
    createView() {
      this.$emit('createView')
    },
  },
}
</script>

<style scoped>
.item {
  text-align: center;
  width: 100%;
  height: 30px;
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
  width: 100px;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  overflow: hidden;
}
</style>
