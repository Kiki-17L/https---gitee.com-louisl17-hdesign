<template>
  <div>
    <ContextMenu
      class="menu"
      v-if="show"
      :style="{ left: locationX + 'px', top: locationY + 'px' }"
      @delete="handleDelete"
      @rename="handleRename"
      @createProj="handleCreateProj"
      @createDashBoard="handleCreateDashBoard"
    >
    </ContextMenu>
    <transition name="tree">
      <el-tree
        ref="tree"
        class="treenode"
        v-show="visible"
        :data="projectList"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="keys"
        @node-click="handleSelect"
        @node-contextmenu="rightClick"
        @empty-text="defaultText"
        lazy
        :load="loadNode"
      >
        <template #default="{ node, data }">
          <span>
            <p><i :class="data.icon" style="color: #409eff"></i> {{ node.label }}</p>
          </span>
        </template>
      </el-tree>
    </transition>
  </div>
</template>
<script>
import ContextMenu from '@/views/designer/components/ContextMenu.vue'
import { delDataSource, renameDataSource } from '@/api/datasource.js'
import { getAllProjects, createProject } from '@/api/design.js'

export default {
  name: 'ProjectList',
  data() {
    return {
      // 默认展开的节点
      keys: [-1],

      defaultText: '亲,这里空空如也',

      //项目列表nodes节点树对象
      projectList: [],

      // 默认属性
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf',
      },

      // contextMenu开关
      show: false,

      // 当前被选择的节点
      selectedNode: null,

      locationX: 0,
      locationY: 0,
    }
  },

  components: {
    ContextMenu,
  },
  props: ['visible'],

  computed: {
    modifiable() {
      return this.selectedNode.data.remove
    },
  },
  //创建时,分发一个获取项目列表活动
  created() {
    this.getAllProject()
  },

  methods: {
    /**
     * 获取项目列表tree的数据
     */
    getAllProject() {
      let list
      getAllProjects()
        .then((res) => {
          list = res.data
          let children = this.storeMap(list)
          this.projectList = [
            {
              id: -1,
              label: '项目列表',
              icon: 'el-icon-folder',
              children,
              remove: false,
            },
          ]
        })
        .catch((err) => {
          console.log(err)
        })
    },

    /**
     * 对数据源数据的预处理
     * @param {Array} list 数据源列表
     */
    storeMap(list) {
      let nodes = new Array(list.length) //创建一个新数组作为nodes
      for (let index = 0; index < list.length; index++) {
        //遍历store里面的dslist,提有用信息给nodes数组
        const element = list[index]
        let ds = {}
        ds.id = element.id
        ds.label = element.name
        ds.type = element.type
        ds.icon = 'el-icon-folder'
        ds.remove = true
        nodes[index] = ds
      }
      return nodes
    },

    /**
     * 右键唤醒contextMenu
     * @param {ContextEvent} event contextMenu事件
     * @param {*} data node节点的配置数据
     * @param {Node} node 触发点击的node节点
     * @param {*} obj dom对象
     */
    rightClick(event, data, node, obj) {
      this.show = false
      this.show = true
      this.locationX = event.pageX
      this.locationY = event.pageY

      this.selectedNode = node //标记当前选择的节点

      document.addEventListener('click', this.closeRightMenu) // 给整个document添加监听鼠标事件，点击任何位置执行closeRightMenu方法，及时将菜单关闭
    },

    /**
     * 关闭contextMenu
     */
    closeRightMenu() {
      this.show = false
    },

    /**
     * 新建项目节点
     */
    handleCreateProj() {
      this.$prompt('请输入项目名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let formdata = new FormData()
        formdata.append('projectname', value)
        createProject(formdata)
          .then((res) => {
            if (res.code == 200) {
              this.$alert(res.msg, '成功', {
                comfirmButtonText: '确定',
              })

              this.$emit('refresh') //创建成功后刷新，项目列表
            } else {
              this.$alert(res.msg, '失败', {
                comfirmButtonText: '确定',
              })
            }
          })
          .catch((err) => {
            this.$message({
              type: 'error',
              message: '网络错误',
            })
            console.log(err)
          })
      })
    },
    /**
     * 新建仪表盘节点
     */
    handleCreateDashBoard() {
      console.log('仪表盘成功')
    },
    /**
     * 删除节点
     */
    handleDelete() {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          if (!this.modifiable) {
            this.$message({
              type: 'erro',
              message: '不可删除！',
            })
          } else {
            // 删除数据源api
            let dsid = this.selectedNode.data.id
            await delDataSource(dsid)
            this.$refs.tree.remove(this.selectedNode)
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          }
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: err,
          })
        })
    },

    /**
     * 重命名当前节点
     */
    handleRename() {
      if (this.modifiable) {
        this.$prompt('请输入新的项目名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
          .then(({ value }) => {
            // 修改数据源名api
            let ds = {
              fileid: '',
              filename: '',
            }
            ds.fileid = this.selectedNode.data.id
            ds.filename = value

            renameDataSource(ds).then((res) => {
              if (res.code == 200) {
                this.selectedNode.data.label = value
                this.$message({
                  type: 'success',
                  message: '修改成功',
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '修改失败',
                })
              }
            })
          })
          .catch((err) => {
            this.$message({
              type: 'info',
              message: err,
            })
          })
      }
    },

    /**
     *懒加载回调
     */
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.projectList)
      } else if (node.level === 1) {
        return resolve(this.projectList[0].children)
      } else {
        return resolve([])
      }
    },

    /**
     * 当节点被选中时的回调
     */
    handleSelect(data, node, vnode) {
      this.$store.commit('design/SET_Project', data.id)
    },
  },
}
</script>
<style scoped>
.treenode {
  width: 200px;
}
.tree-enter-active {
  transition: all 0.4s ease-in-out;
}
.tree-leave-active {
  transition: all 0.5s ease-in-out;
}
.tree-enter {
  width: 0;
  opacity: 0;
}
.tree-leave-to {
  width: 0;
  opacity: 0;
}

.menu {
  z-index: 1800;
  position: absolute;
}
</style>
