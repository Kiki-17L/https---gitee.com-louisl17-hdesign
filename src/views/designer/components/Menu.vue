<template>
  <div class="menubox" style="border-right: 2px solid #dddddd; overflow: hidden">
    <!--菜单顶部栏-->
    <div class="funcmenu" style="">
      <div style="height: 100%; margin-left: 5px">
        <i
          :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
          class="collapse"
          style="display: inline-block"
          @click="handleCollapse()"
        ></i>
      </div>
      <div v-show="!isCollapse" style="height: 100%; margin-left: 5px">
        <i class="el-icon-refresh collapse" style="display: inline-block" @click="refreshList"></i>
      </div>
      <div v-show="!isCollapse" style="height: 100%; margin-left: auto">
        <i class="el-icon-plus collapse" style="display: inline-block" @click="newProj"></i>
      </div>
    </div>

    <!--项目列表和组件栏区域-->

    <div style="height: 100px; background-color: #ffffff">
      <ProjectList ref="projectlist" :visible="!isCollapse" @refresh="refreshList"></ProjectList>
      <ComponentBar v-show="!isCollapse" @dragStart="ondragStart"></ComponentBar>
    </div>
  </div>
</template>
<script>
import ComponentBar from '@/views/designer/components/ComponentBar.vue'
import ProjectList from '@/views/designer/components/ProjectList.vue'
export default {
  data() {
    return {
      isCollapse: false, //菜单是否收起flag
    }
  },
  components: {
    ProjectList,
    ComponentBar,
  },

  methods: {
    // 刷新数据源列表
    refreshList() {
      this.$refs.projectlist.getAllProject()
      console.log('刷新成功')
    },

    handleCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('collapse', this.isCollapse)
    },

    /**
     * TODO:将拖动的component从Menu发送到index
     * @param {*} copyDom 拖动的组件元素
     */
    ondragStart(copyDom) {
      this.$emit('ondragStart', copyDom)
    },

    /**
     * TODO:在根目录下,新增项目
     */
    newProj() {
      this.$refs['projectlist'].handleCreateProj()
    },
  },
}
</script>
<style scoped>
.funcmenu {
  text-align: center;
  border-bottom: 1px solid #dddddd;
  display: flex;
  flex-direction: row-reverse;
}
.menubox {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.collapse {
  font-size: 1.2rem;
  margin-left: 2%;
}
.collapse:hover {
  cursor: pointer;
  background-color: #e6e6e6;
  color: #409eff;
}

.func-enter-active {
  transition: all 0.5s linear;
}
.func-enter {
  width: 0;
  opacity: 0;
}
.func-leave-active {
  transition: all 0.1s;
}
.func-leave-to {
  width: 0;
  opacity: 0;
}
</style>
