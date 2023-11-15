<template>
  <div>
    <sourcemenu
      class="menu"
      v-if="show"
      :isRDB="isRDB"
      :style="{ left: locationX + 'px', top: locationY + 'px' }"
      @delete="handleDelete"
      @rename="handleRename"
      @testConnection="handleConnect"
    >
    </sourcemenu>
    <menua class="menu" v-if="showA" :style="{ left: locationX + 'px', top: locationY + 'px' }" @createView="handleCreateView"></menua>
    <transition name="tree">
      <el-tree
        ref="tree"
        class="treenode"
        v-show="visible"
        :data="sourceList"
        :props="defaultProps"
        node-key="id"
        lazy
        :load="loadNode"
        :default-expanded-keys="keys"
        @node-contextmenu="rightClick"
        @node-click="handleSelect"
        @empty-text="defaultText"
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
import sourcemenu from '@/views/datasource/components/menus/sourcemenu.vue'
import menua from '@/views/datasource/components/menus/menua.vue'
import { delDataSource, renameDataSource, getAllTables } from '@/api/datasource.js'

export default {
  name: 'SourceList',
  data() {
    return {
      // 默认展开的节点
      keys: [-1],

      //数据源nodes节点树对象
      sourceList: [],
      // 默认提示
      defaultText: '请检查网络',
      // 默认属性
      defaultProps: {
        children: 'children',
        label: 'label',
        isLeaf: 'leaf',
      },

      // contextMenu开关
      show: false,
      showA: false,

      // 当前被选择的节点
      selectedNode: null,

      locationX: 0,
      locationY: 0,
    }
  },

  components: {
    sourcemenu,
    menua,
  },
  props: ['visible'],

  computed: {
    modifiable() {
      return this.selectedNode.data.remove
    },
    isRDB() {
      if (this.selectedNode.data.type === 1) {
        return true
      } else {
        return false
      }
    },
  },
  //创建时,分发一个获取数据源列表活动
  created() {
    this.getAllDataSource()
  },

  methods: {
    /**
     * 获取数据源tree的数据
     */
    getAllDataSource() {
      let list
      this.$store
        .dispatch('design/fetchAllDS')
        .then((res) => {
          list = res.data
          let children = this.storeMap(list)
          this.sourceList = [
            {
              id: -1,
              label: '数据源',
              icon: 'iconfont icon-shujuyuan',
              children,
              remove: false,
              isLeaf: false,
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
        ds.icon = 'iconfont icon-peizhishujuyuan'
        ds.remove = true
        ds.isLeaf = false
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
      this.showA = false
      if (node.level === 1) {
        // 如果是根节点，不触发菜单
        return
      } else if (node.level === 3) {
        // 如果是
        return
      } else if (node.level === 4) {
        this.showA = true
        this.locationX = event.pageX
        this.locationY = event.pageY
        this.selectedNode = node
        document.addEventListener('click', this.closeRightMenu)
        return
      }
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
      this.showA = false
    },

    /**
     *节点懒加载
     */
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.sourceList)
      } else if (node.level === 1) {
        return resolve(this.sourceList[0].children)
      } else if (node.level === 2) {
        return resolve(this.getLevel2())
      } else if (node.data.label === '表') {
        // 调用根据数据源id获取表的接口
        getAllTables(node.parent.data.id)
          .then((res) => {
            let children = []
            res.data.forEach((el) => {
              children.push({
                label: el,
                leaf: true,
                icon: 'iconfont icon-biaodanzujian-biaoge',
              })
            })
            resolve(children)
          })
          .catch((err) => {
            this.$message({
              type: 'erro',
              message: err,
            })
          })
      } else if (node.data.label === '工作表') {
        // 调用根据数据源id获取工作表的接口
        return resolve([])
      } else {
        return resolve([])
      }
    },

    /**
     * 生成数据源节点的模版子树
     */
    getLevel2() {
      let children = [
        {
          label: '表',
          icon: 'iconfont icon-biaodanzujian-biaoge',
          remove: false,
        },
        {
          label: '工作表',
          icon: 'iconfont icon-tubiao-zhuzhuangtu',
          remove: false,
        },
      ]
      return children
    },

    /**
     * 节点点击回调
     */
    handleSelect(data, node, vnode) {
      this.show = false
      this.showA = false
      this.selectedNode = node
    },

    //接口功能区，以下函数都调用了网络接口

    /**
     * 删除节点
     */
    handleDelete() {
      this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
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
            // 根据id删除数据源
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
        this.$prompt('请输入新的数据源名', '提示', {
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
     * 基于此表创建工作表
     */
    handleCreateView() {
      let table = JSON.stringify(this.selectedNode.data)
      let ds = JSON.stringify(this.selectedNode.parent.parent.data)
      this.$router.push({ name: 'sql', query: { t: this.$v1() }, params: { table, ds } })
      this.showA = false
    },

    /**
     * 测试数据库的连接
     */
    handleConnect() {
      let dsid = this.selectedNode.data.id
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
