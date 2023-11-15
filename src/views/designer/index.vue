<template>
  <div>
    <el-container style="height: 100vh">
      <!--主页标头-->
      <el-header class="header1">
        <p style="line-height: 1.7">创 建 仪 表 盘</p>
      </el-header>

      <!--主页主容器-->
      <el-container style="height: 95vh; overflow: hidden">
        <!--容器侧边栏-->
        <aside style="height: 100%; display: flex; flex-direction: column">
          <Menu @ondragStart="dragStart" ref="menu" style="height: 100%"></Menu>
        </aside>
        <!--容器主内容-->
        <el-main style="padding: 0; height: 100%">
          <Containner ref="container"></Containner>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppMain from '@/views/datasource/components/AppMain.vue'
import Menu from '@/views/designer/components/Menu.vue'
import Containner from '@/views/designer/Containner.vue'
export default {
  data() {
    return {
      isCollapse: false,
    }
  },
  components: {
    AppMain,
    Containner,
    Menu,
  },

  /**
   * TODO:将拖动的component DOM 传送给 container
   */
  methods: {
    dragStart(copyDom) {
      this.$refs.container.onDragStart(copyDom)
    },
  },
}
</script>

<style scoped>
.header1 {
  font-family: Arial, sans-serif;
  text-align: left;
  color: #409eff;
  height: 5vh;
  background-color: #ffffff;
  border-bottom: 2px solid #dddddd;
}
</style>
