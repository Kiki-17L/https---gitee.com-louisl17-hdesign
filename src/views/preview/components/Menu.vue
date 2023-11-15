<template>
  <div class="menubox" style="border-right: 2px solid #dddddd">
    <!--菜单顶部栏-->
    <div style="text-align: right; border-bottom: 1px solid #dddddd; display: flex; flex-direction: row-reverse">
      <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" class="collapse" style="display: inline-block" @click="handleCollapse()"></i>

      <transition name="func">
        <div v-show="!isCollapse" style="height: 100%; width: 80%">
          <i class="el-icon-refresh collapse" style="display: inline-block" @click="refreshList"></i>
        </div>
      </transition>
    </div>
    <!--菜单主要活动内容区域-->

    <div style="height: 100px; background-color: #ffffff">
      <SourceList ref="sourcelist" :visible="!isCollapse"></SourceList>
      <ComponentBar v-show="!isCollapse"></ComponentBar>
    </div>
  </div>
</template>
<script>
import ComponentBar from './ComponentBar.vue'
import SourceList from '@/views/datasource/components/SourceList.vue'
export default {
  data() {
    return {
      isCollapse: false, //菜单是否收起flag
    }
  },
  components: {
    SourceList,
    ComponentBar,
  },

  methods: {
    // 刷新数据源列表
    refreshList() {
      this.$refs.sourcelist.getAllDataSource()
      console.log('刷新成功')
    },

    handleCollapse() {
      this.isCollapse = !this.isCollapse
      this.$emit('collapse', this.isCollapse)
    },
  },
}
</script>
<style scoped>
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
