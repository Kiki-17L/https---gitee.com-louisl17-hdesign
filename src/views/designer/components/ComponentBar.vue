<template>
  <div>
    <!-- 组件分类 -->
    <div v-for="group in Options" :key="group.name">
      <!-- 组件标题 -->
      <div style="display: flex; line-height: 45px; cursor: pointer; border-top: 1px solid #dddddd" @click="group.opened = !group.opened">
        <div style="display: inline-block; text-indent: 1em; width: 50%">{{ group.name }}</div>
        <div style="display: inline-block; margin-left: auto; margin-right: 5%">
          <i :class="group.opened ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"></i>
        </div>
      </div>
      <!-- 组件列表 -->
      <el-row :gutter="2" v-show="group.opened">
        <el-col :span="12" v-for="item in group.children" :key="item.name">
          <div
            class="drag"
            :config="JSON.stringify(item)"
            draggable="true"
            @dragstart="onDragStart"
            style="background-color: #dcdfe6; height: 70px; text-align: center; margin-top: 2px"
          >
            <div style="line-height: 40px">
              <i v-if="item.icon" style="width: 20px; font-size: 2rem" :class="item.icon"></i>
              <i v-else style="font-size: 20px" class="el-icon-question"></i>
            </div>
            <div style="font-size: 13px">{{ item.name }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Options from '@/components/options'

export default {
  data() {
    return {
      Options,
      group: {
        opened: false,
      },
    }
  },
  methods: {
    /**
     * TODO: drag动作开始回调
     * 将拖动的component传送给Menu
     *
     * @param {*} e 事件
     */
    onDragStart(e) {
      let copyDom = e.currentTarget.cloneNode(true)
      this.$emit('dragStart', copyDom)
    },
  },
  props: {},
}
</script>
<style scoped>
.drag:hover {
  cursor: grab;
}
</style>
