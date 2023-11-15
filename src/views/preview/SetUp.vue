<template>
  <div class="container">
    <div class="TopContainer">
      <button class="top-left-button">根目录/</button>

      <button class="top-right-button">
        <el-radio v-model="istop" :label="false">可视化视图</el-radio>
        <el-radio v-model="istop" :label="true">树形视图</el-radio>
      </button>
    </div>
    <div v-show="istop">
      <div style="display: flex; flex-direction: row">
        <div @contextmenu.prevent="showContextMenu($event)" class="tree-container" :class="isCollapse ? 'tree-container--collapse' : ''">
          <div @contextmenu.prevent="showContextMenu($event)" @click="isCollapse = !isCollapse" style="text-align: right; border-bottom: 1px solid #dddddd; display: flex; flex-direction: row-reverse">
            <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" style="display: inline-block"></i>
          </div>

          <div class="tree-button-container" v-show="!isCollapse">
            <el-button type="text" @click="open"><i class="el-icon-folder-add"></i></el-button>
          </div>
          <el-tree
            :data="data"
            :props="defaultProps"
            v-show="!isCollapse"
            node-key="id"
            @node-contextmenu="showContextMenu"
            @node-click="handleNodeClick"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :default-expand-all="true"
            :allow-drag="allowDrag"
          >
            <template #default="{ node, data }">
              <p><i :class="data.icon"></i>{{ node.label }}</p>
            </template>
          </el-tree>
        </div>

        <div style="height: 800px; width: 100%">
          <div>
            <div class="vertical-scale"></div>
            <!-- <div class="horizontal-scale"></div> -->
            <el-tabs v-model="activeName" @tab-click="handleClick()" style="height: 100%" closable @tab-remove="closeTab">
              <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name" style="height: 100%">
                <div style="display: flex; flex-direction: row">
                  <test :num="tab.Option" style="height: 300px; width: 400px"></test>
                  <i class="el-icon-close close-icon" @click="closeTab(tab.name)"></i>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div v-if="isshow" class="empty"><el-empty description="左侧打开所需文件"></el-empty></div>
          </div>
        </div>

        <context-menu :show-context-menu="contextMenu.show" :position="contextMenu.position" @create-file="createFile" @delete-file="deleteFile" @close-context-menu="closeContextMenu" />
      </div>
    </div>
    <div v-show="!istop">
      <Index></Index>
    </div>
  </div>
</template>

<script>
import Index from '@/views/preview/components/Index.vue'
import Options from '@/components/options'
import ContextMenu from '@/views/preview/components/ContextMenu.vue'
import EChartsChart from '@/views/preview/components/EChartsChart.vue'
import EChartsChart2 from '@/views/preview/components/EChartsChart2.vue'
import test from '@/views/preview/components/test.vue'

export default {
  props: ['mouse'],
  components: {
    ContextMenu,
    EChartsChart,
    EChartsChart2,
    test,
    Index,
  },
  data() {
    return {
      Option: '0',
      chart: null,
      activeName: 'first',
      radio: '1',
      istop: true,
      isshow: true,
      contextMenu: {
        show: false,
        position: { x: 0, y: 0 },
      },
      isCollapse: false,
      tabs: [],
      data: [
        {
          label: '报告列表',
          icon: 'el-icon-folder',
          thumbnail: '/src/assets/imgs/excel.png',
          children: [
            {
              label: 'NBI组件演示',
              icon: 'el-icon-folder',
              thumbnail: '/src/assets/imgs/excel.png',
              children: [
                {
                  Option: '1',
                  label: '组件',
                  icon: 'el-icon-document',
                  thumbnail: '/src/assets/imgs/excel.png',
                },
              ],
            },
            {
              label: 'NBI功能演示',
              icon: 'el-icon-folder',
              thumbnail: '/src/assets/imgs/excel.png',
              children: [
                {
                  Option: '2',
                  label: '功能',
                  icon: 'el-icon-document',
                  thumbnail: '/src/assets/imgs/excel.png',
                },
              ],
            },
            {
              label: '其他',
              icon: 'el-icon-folder',
              thumbnail: '/src/assets/imgs/excel.png',
              children: [
                {
                  Option: '3',
                  label: '1',
                  icon: 'el-icon-document',
                  thumbnail: '/src/assets/imgs/excel.png',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  watch: {
    mouse(newVal) {
      this.localmouse = newVal
    },
  },

  methods: {
    openPage(item) {
      // 在这里处理点击缩小版图片后弹出对应页面的逻辑
      console.log('打开页面:', item.label)
      // 可以打开一个对话框或者切换页面等操作
    },
    handleClick(tab, event) {
      this.isshow = false
    },
    close() {
      this.isshow = !this.isshow
    },
    showContextMenu(event, data) {
      event.preventDefault()
      this.contextMenu.position.x = this.calculateXPosition(event)
      this.contextMenu.position.y = event.clientY
      this.contextMenu.show = true
      this.contextMenu.selectedNode = data // 记录用户右键点击的节点
    },
    calculateXPosition(event) {
      if (this.mouse) {
        return event.clientX - 62
      } else {
        return event.clientX - 150
      }
    },
    createFile() {
      this.$prompt('请输入文件名', '新建文件', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-Za-z0-9_]+$/,
        inputErrorMessage: '文件命名格式不正确',
        duration: 1000,
      })
        .then(({ value }) => {
          const newFileNode = {
            label: value,
            icon: 'el-icon-document',
          }
          if (this.contextMenu.selectedNode.children || this.contextMenu.selectedNode) {
            this.contextMenu.selectedNode.children.push(newFileNode)
          } else {
            this.$set(this.contextMenu.selectedNode, 'children', [newFileNode])
          }

          this.$set(newFileNode, 'expand', true)

          this.$message({
            type: 'success',
            message: '创建成功',
            duration: 1000,
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '创建失败',
            duration: 1000,
          })
        })
    },
    deleteFile() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          // 找到要删除的文件节点的父节点
          const parentNode = this.findParentNode(this.data[0], this.contextMenu.selectedNode)

          if (parentNode && parentNode.children) {
            // 找到要删除的文件节点的索引
            const index = parentNode.children.indexOf(this.contextMenu.selectedNode)

            if (index !== -1) {
              // 从父节点的 children 数组中删除该节点
              parentNode.children.splice(index, 1)
            }
          }

          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000,
          })
          this.closeContextMenu()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 1000,
          })
        })
    },
    findParentNode(tree, targetNode) {
      // 递归查找父节点
      if (tree.children) {
        for (const node of tree.children) {
          if (node === targetNode) {
            return tree
          }
          const parent = this.findParentNode(node, targetNode)
          if (parent) {
            return parent
          }
        }
      }
      return null
    },

    closeContextMenu() {
      this.contextMenu.show = false
    },
    open() {
      this.$prompt('请输入文件夹名称', '新建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[A-Za-z0-9_]+$/,
        inputErrorMessage: '文件夹命名格式不正确',
      })
        .then(({ value }) => {
          const newFileNode = {
            label: value,
            icon: 'el-icon-folder',
          }
          const parentNode = this.data[0]

          parentNode.children.push(newFileNode)

          this.$set(parentNode, 'expand', true)

          this.$message({
            type: 'success',
            message: '创建成功',
            duration: 1000,
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消创建',
            duration: 1000,
          })
        })
    },
    // handleNodeClick(data) {
    //   if (data.icon === 'el-icon-document') {
    //     const label = data.label;
    //     this.Option = data.Option;
    //     const existingTab = this.tabs.find((tab) => tab.label === label);
    //     if (existingTab) {
    //       this.activeName = existingTab.name;
    //     } else {
    //       const name = `tab-${Date.now()}`;
    //       this.tabs.push({ label, name });
    //       this.activeName = name;
    //     }
    //     this.isshow = false;
    //   }
    // },
    handleNodeClick(data) {
      if (data.icon === 'el-icon-document') {
        const label = data.label
        const Option = data.Option
        const existingTab = this.tabs.find((tab) => tab.label === label)
        if (existingTab) {
          this.activeName = existingTab.name
        } else {
          const name = `tab-${Date.now()}`
          this.tabs.push({ label, name, Option })
          this.activeName = name
        }
        this.isshow = false
      }
    },
    closeTab(name) {
      const index = this.tabs.findIndex((tab) => tab.name === name)
      if (index !== -1) {
        this.tabs.splice(index, 1)
        if (this.tabs.length > 0) {
          // 如果还有其他选项卡，激活前一个选项卡
          const previousTabIndex = index > 0 ? index - 1 : 0
          this.activeName = this.tabs[previousTabIndex].name
        } else {
          // 如果没有其他选项卡，显示提示
          this.isshow = true
        }
      }
    },
    // renderContent(h, { data }) {
    //   return (
    //     <span>
    //       <i class={data.icon}></i>
    //       <span>{data.label}</span>
    //     </span>
    //   );
    // },
    handleDragStart(node) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
  },
}
</script>

<style scoped>
.visual-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
}

.close-icon {
  cursor: pointer;
  transition: color 0.2s, font-weight 0.2s;
  /* 添加过渡效果 */
}

.close-icon:hover {
  color: red;
  /* 鼠标悬停时字体颜色变为红色 */
  font-weight: bold;
  /* 鼠标悬停时字体加粗 */
}

.container {
  position: relative;
}

.TopContainer {
  background-color: #333;
  padding: 15px;
  position: relative;
}

.top-right-button {
  position: absolute;
  top: 15%;
  right: 0;
  background: none;
  border: none;
  color: white;
}

.top-left-button:hover,
.top-right-button:hover {
  color: rgb(0, 102, 255);
}

.top-left-button {
  position: absolute;
  top: 15%;
  left: 0;
  background: none;
  border: none;
  color: white;
}

.tree-container {
  width: 15%;
  height: 100vh;
  border: 1px solid #999;
  transition: width 0.75s;
}

.tree-container--collapse {
  width: 18px;
  transition: width 0.75s;
}

.empty {
  left: 50%;
  position: absolute;
  top: 30%;
}

.horizontal-scale {
  top: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-color: #999;
}

.vertical-scale {
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  background-color: #999;
}

.tree-button-container {
  position: absolute;
  top: 18px;
  left: 11%;
}
</style>
