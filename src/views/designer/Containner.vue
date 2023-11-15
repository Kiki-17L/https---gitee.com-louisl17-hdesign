<template>
  <div style="height: 100%; width: 100%">
    <!--顶部功能栏-->
    <div style="height: 5%; display: flex; border-bottom: 2px solid #dddddd">
      <div style="margin-right: auto">当前项目id: {{ currentProj }}</div>

      <el-tooltip style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" effect="dark" content="大屏设置" placement="top">
        <div @click="popConfig">
          <i style="font-size: 22px" class="el-icon-setting"></i>
        </div>
      </el-tooltip>
      <el-tooltip style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" effect="dark" content="保存" placement="top">
        <div @click="saveDesign">
          <i style="font-size: 22px" class="el-icon-document-checked"></i>
        </div>
      </el-tooltip>
      <el-tooltip style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" effect="dark" content="预览" placement="top">
        <div @click="preview">
          <i style="font-size: 22px" class="el-icon-view"></i>
        </div>
      </el-tooltip>
      <el-tooltip style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" effect="dark" content="清空" placement="top">
        <div @click="clearDesign">
          <i style="font-size: 22px" class="el-icon-delete"></i>
        </div>
      </el-tooltip>

      <!-- <div style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" @click="clearDesign">
        <i style="font-size: 22px" class="el-icon-delete"></i>
      </div> -->
      <!-- <div style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" @click="saveDesign">
        <i style="font-size: 22px" class="el-icon-document-checked"></i>
      </div> -->
      <!-- <div style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" @click="preview">
        <i style="font-size: 22px" class="el-icon-view"></i>
      </div> -->
      <!-- <div style="margin: 3px 5px; padding: 5px; text-align: center" class="configBtn" @click="popConfig">
        <i style="font-size: 22px" class="el-icon-setting"></i>
      </div> -->
    </div>
    <div id="contain" class="container" style="position: relative; overflow: hidden; height: 94%; width: 100%">
      <!--顶部刻度栏-->
      <div class="top" style="height: 10px; margin-left: 10px" :style="{ width: designData.scaleX * containerScale + 'px' }">
        <ScaleMarkX></ScaleMarkX>
      </div>
      <!--侧边刻度栏-->
      <div class="left" style="position: absolute; width: 10px" :style="{ height: ((designData.scaleX * containerScale) / designData.scaleX) * designData.scaleY + 'px' }">
        <ScaleMarkY></ScaleMarkY>
      </div>
      <!--容器box-->
      <div
        class="webContainer"
        :style="{
          width: designData.scaleX + 'px',
          height: designData.scaleY + 'px',
          backgroundColor: designData.bgColor,
          transform: 'scale(' + containerScale + ')',
          overflow: 'hidden'
        }"
        @dragover="allowDrop"
        @drop="drop"
        @click.self="outBlur"
        ref="webContainer">
        <!--组件box-->
        <div
          v-for="(item, index) in cacheComponents"
          :key="item.id"
          class="cptDiv"
          :style="{
            width: Math.round(item.cptWidth) + 'px',
            height: Math.round(item.cptHeight) + 'px',
            top: Math.round(item.cptY) + 'px',
            left: Math.round(item.cptX) + 'px',
            zIndex: currentCptIndex === index ? 1800 : item.cptZ
          }"
          tabindex="0"
          @mousedown="chose($event, item, index)"
          :ref="'div' + item.cptKey + index">
          <!--顶部辅助线-->
          <div v-show="currentCptIndex === index" style="position: fixed; border-top: 1px dashed #8a8a8a; width: 100%; left: 0"></div>
          <!--左侧辅助线-->
          <div v-show="currentCptIndex === index" style="position: fixed; border-right: 1px dashed #8a8a8a; height: 100%; top: 0"></div>

          <!--蒙版box-->
          <div v-resize="'move'" class="activeMask" :style="cacheChoices[item.id] ? { border: '1px solid #B6BFCE' } : {}"></div>
          <!--功能按键-->
          <div class="delTag">
            <i class="el-icon-edit" @click.stop="popCptConfig(item, index)"></i>
            <i style="margin-left: 4px" class="el-icon-copy-document" @click.stop="copyCpt(item)"></i>
            <i style="margin-left: 4px" class="el-icon-delete" @click.stop="delCpt(item, index)"></i>
          </div>
          <!--组件渲染出口-->
          <div style="width: 100%; height: 100%">
            <component :is="item.cptKey" :ref="item.cptKey + index" :width="Math.round(item.cptWidth)" :height="Math.round(item.cptHeight)" :option="item.cptOption" />
          </div>

          <!--缩放点-->
          <div v-show="currentCptIndex === index" style="top: 0; left: 0; cursor: se-resize; transform: translate(-50%, -50%)" class="resizeTag" v-resize="'lt'"></div>
          <div v-show="currentCptIndex === index" style="top: 0; left: 50%; cursor: s-resize; transform: translate(-50%, -50%)" class="resizeTag" v-resize="'t'"></div>
          <div v-show="currentCptIndex === index" style="top: 0; right: 0; cursor: ne-resize; transform: translate(50%, -50%)" class="resizeTag" v-resize="'rt'"></div>
          <div v-show="currentCptIndex === index" style="top: 50%; right: 0; cursor: w-resize; transform: translate(50%, -50%)" class="resizeTag" v-resize="'r'"></div>
          <div v-show="currentCptIndex === index" style="bottom: 0; right: 0; cursor: se-resize; transform: translate(50%, 50%)" class="resizeTag" v-resize="'rb'"></div>
          <div v-show="currentCptIndex === index" style="bottom: 0; left: 50%; cursor: s-resize; transform: translate(-50%, 50%)" class="resizeTag" v-resize="'b'"></div>
          <div v-show="currentCptIndex === index" style="bottom: 0; left: 0; cursor: ne-resize; transform: translate(-50%, 50%)" class="resizeTag" v-resize="'lb'"></div>
          <div v-show="currentCptIndex === index" style="top: 50%; left: 0; cursor: w-resize; transform: translate(-50%, -50%)" class="resizeTag" v-resize="'l'"></div>
        </div>
      </div>
      <!--滑动条-->
      <div class="slide" style="position: absolute; width: 120px; height: 30px; bottom: 10px; left: 10px">
        <el-slider v-model="containerScale" :min="0.3" :max="2" :step="0.01"></el-slider>
      </div>
    </div>

    <!--大屏配置栏目-->
    <el-drawer :visible.sync="drawer">
      <template #title>
        <div style="text-align: center; font-size: xx-large">
          <h1>大屏配置</h1>
        </div>
      </template>

      <el-form :model="designData" label-width="100px" size="small">
        <el-form-item label="网站标题">
          <el-input v-model="designData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="网站描述">
          <el-input type="textarea" v-model="designData.simpleDesc"></el-input>
        </el-form-item>
        <el-form-item label="分辨率X">
          <el-input-number v-model="designData.scaleX" :min="640" :max="10240" style="width: 100%" />
        </el-form-item>
        <el-form-item label="分辨率Y">
          <el-input-number v-model="designData.scaleY" :min="320" :max="10240" style="width: 100%" />
        </el-form-item>
        <el-form-item label="背景颜色">
          <el-color-picker v-model="designData.bgColor" show-alpha />
        </el-form-item>
      </el-form>
    </el-drawer>
    <!--组件配置-->

    <el-drawer v-if="isSelected" :visible.sync="drawer2">
      <template #title>
        <div style="text-align: center; font-size: xx-large">
          <h1>组件配置</h1>
        </div>
      </template>
      <!--组件配置表-->
      <ConfigBar style="overflow: hidden" ref="configBar" :currentCpt.sync="currentCpt" :designData.sync="designData" @refreshCptData="refreshCptData" :height="windowHeight" />
    </el-drawer>
  </div>
</template>
<script>
  import ScaleMarkX from '@/views/designer/scalemark/ScaleMarkX.vue'
  import ScaleMarkY from '@/views/designer/scalemark/ScaleMarkY.vue'
  import ConfigBar from '@/views/designer/components/ConfigBar.vue'
  import { save } from '@/api/design'
  export default {
    data() {
      return {
        windowWidth: 0,
        windowHeight: 0,

        cptBarWidth: 200,
        configBarWidth: 300,

        containerScale: 0, //刻度条

        copyDom: '', //被拖动的组件dom

        // 大屏的配置
        designData: {
          id: 0,
          title: '我的大屏',
          scaleX: 1920,
          scaleY: 1080,
          bgColor: '#2B3340',
          simpleDesc: '',
          components: [] // 保存大屏时，将cache组件保存到这里，由designData统一发送
        },

        cacheComponents: [], //存储当前画板的组件cache
        cacheChoices: {}, // 存储'ctrl'，一起选中的组件
        cacheChoicesFixed: {},
        currentCpt: { cptOption: undefined }, // 当前选中组件对象
        currentCptIndex: -1, // 标记当前画板选中的唯一组件，为cacheComponents里面的index
        drawer: false, // 大屏配置flag
        drawer2: false // 组件配置flag
      }
    },

    watch: {
      currentCpt(newVal) {
        this.cptDataFormShow = false
        if (!newVal || !newVal.cptOption) {
          this.configBarShow = false //清空时
        } else {
          if (this.currentCpt.cptOption.cptDataForm) {
            this.cptDataFormShow = true
          } else {
            this.configTab = 'basic' //解決上一組件沒有数据表单导致tab栏未选中bug
          }
        }
      }
    },

    computed: {
      //计算当前是否有组件被选中，防止未有组件被选中时，读不到currentCpt而报错
      isSelected() {
        if (this.currentCptIndex == -1) {
          return false
        } else {
          return true
        }
      },

      currentProj() {
        return this.$store.getters['design/getCurrentProj']
      }
    },

    mounted() {
      const that = this

      /**
       * 添加拖动组件的事件监听
       *
       */
      that.initContainerSize()

      /**
       * 窗口大小变化的事件监听
       */
      window.onresize = () => {
        return (() => {
          that.initContainerSize()
        })()
      }
    },

    methods: {
      initContainerSize() {
        this.windowWidth = document.documentElement.clientWidth //获取html元素宽度
        this.windowHeight = document.documentElement.clientHeight //获取tml元素高度
        let tempWidth = document.getElementById('contain').clientWidth
        this.containerScale = Math.round((tempWidth / this.designData.scaleX) * 100) / 100
      },

      refreshCptData() {
        const refName = this.currentCpt.cptKey + this.currentCptIndex
        if (!this.$refs[refName][0].refreshCptData) {
          this.$message.warning('当前图层还未实现refreshCptData方法')
        } else {
          this.$refs[refName][0].refreshCptData() //刷新子组件数据，refs为组建名加index
        }
      },

      /**
       * TODO:阻止系统默认事件，允许container能drop组件
       * @param {*} e 事件
       */
      allowDrop(e) {
        e.preventDefault()
      },

      /**
       * TODO:从组件栏丢下组件
       * @param {*} e 事件
       */
      drop(e) {
        //将拖动组件的配置对象解析出来
        let config = JSON.parse(this.copyDom.getAttribute('config'))

        let cpt = {
          id: this.$v1(),
          cptTitle: config.name,
          icon: config.icon,
          cptKey: config.cptKey,
          cptOptionKey: config.cptOptionKey ? config.cptOptionKey : config.cptKey + '-config',
          cptOption: config.option,
          cptX: Math.round(e.offsetX),
          cptY: Math.round(e.offsetY),
          cptZ: 100,
          cptWidth: config.width ? config.width : 400,
          cptHeight: config.height ? config.height : 300
        }

        // 判断，释放组件是否超出边界。
        if (e.offsetX > this.designData.scaleX - cpt.cptWidth) {
          cpt.cptX = this.designData.scaleX - cpt.cptWidth
        }

        if (e.offsetY > this.designData.scaleY - cpt.cptHeight) {
          cpt.cptY = this.designData.scaleY - cpt.cptHeight
        }

        this.cacheComponents.push(cpt) //将组件推送到cache里面
        this.cacheChoices = {} //多选清空
        this.chose({}, cpt, this.cacheComponents.length - 1)
      },

      /**
       * TODO:drag开始时,将源对象copyDom，传进来
       * @param {*} copyDom
       */
      onDragStart(copyDom) {
        this.copyDom = copyDom
        copyDom.draggable = false
      },

      /**
       * 选中组件，进行组件聚焦
       * @param {*} e
       * @param {Object} item  当前选中component
       * @param {Number} index cache数组索引
       */
      chose(e, item, index) {
        //刷新属性栏数据，页面上拖动的组件执行click事件来更新组件的属性栏
        this.currentCpt = item
        this.currentCptIndex = index

        if (this.$refs['div' + item.cptKey + index]) {
          this.$refs['div' + item.cptKey + index][0].focus() //聚焦 用于多选移动
        }
        if (!e.ctrlKey) {
          //未按住ctrl键
          this.cacheChoices = {}
        }
        this.cacheChoices[item.id] = item
        this.cacheChoicesFixed[item.id] = JSON.parse(JSON.stringify(item))
      },

      /**
       * TODO:弹出组件的配置
       */
      popCptConfig(item, index) {
        this.currentCpt = item
        this.currentCptIndex = index
        if (!this.drawer) {
          this.drawer = false
        }
        this.drawer2 = true
      },

      /**
       * TODO:弹出大屏配置按钮
       */
      popConfig() {
        this.drawer = true
      },

      /**
       * TODO: 取消组件聚焦
       */
      outBlur() {
        this.currentCptIndex = -1
        this.currentCpt = {}
        this.cacheChoices = {}
      },

      /**
       * 复制一个组件，组件向右下偏移
       * @param {*} item
       */
      copyCpt(item) {
        let copyItem = JSON.parse(JSON.stringify(item))
        copyItem.cptX = item.cptX + 30 //复制的组件向右下偏移
        copyItem.cptY = item.cptY + 30
        copyItem.id = this.$v1()
        this.cacheComponents.push(copyItem)
        this.currentCptIndex = this.cacheComponents.length - 1 //聚焦到复制的组件
      },

      /**
       * TODO:删除一个组件
       * @param {*} cpt
       * @param {*} index
       */
      delCpt(cpt, index) {
        this.$confirm('删除' + cpt.cptTitle + '组件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            //v-for key值重复导致页面渲染数据错乱。在丢下组件时实用uuid作为key解决。
            this.currentCpt = {}
            this.cacheComponents.splice(index, 1)
            const childId = this.$refs[cpt.cptKey + index][0].uuid
            clearCptInterval(childId)
          })
          .catch(() => {})
      },

      /**
       * TODO:清空画板
       */
      clearDesign() {
        this.$confirm('此操作将会清空图层，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.cacheComponents = []
            this.designData.components = []
            this.currentCpt = {}
            localStorage.removeItem('designCache')
            clearCptInterval(null, true)
            this.$message.success('清除成功')
          })
          .catch(() => {})
      },

      /**
       * TODO:保存画板
       */
      saveDesign() {
        const loading = this.$loading({
          lock: true,
          text: '保存中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        this.designData.components = JSON.stringify(this.cacheComponents) //将caches组件数组转JSON
        this.designData.createUser = this.$store.getters['user/getUserName']

        let data = JSON.stringify(this.designData)
        localStorage.setItem('designCache', data) //缓存仪表盘

        let formdata = new FormData()
        formdata.append('projectid', this.currentProj)
        formdata.append('design', data)

        // 没有选中项目，则提示
        if (this.currentProj === -1) {
          this.$message.error('请选择一个项目')
          loading.close()
          return
        }

        save(formdata)
          .then(res => {
            if (res.code == 201) {
              this.$message.success('已保存')
            } else {
              this.$message.error(res.msg)
            }

            loading.close()
          })
          .catch(err => {
            loading.close()
            this.$message.error(err)
          })
      },

      /**
       * TODO:预览当前画板
       */
      preview() {
        this.designData.components = this.cacheComponents
        localStorage.setItem('designCache', JSON.stringify(this.designData))
        let routeUrl = this.$router.resolve({
          path: '/show'
        })
        window.open(routeUrl.href, '_blank')
      }
    },
    components: {
      ScaleMarkX,
      ScaleMarkY,
      ConfigBar
    },

    directives: {
      /**
       * 组件拉伸、移动指令
       * @param {*} el
       * @param {*} binding
       * @param {*} vNode
       */
      resize(el, binding, vNode) {
        //组件拉伸，移动位置
        el.onmousedown = function (e) {
          const that = vNode.context
          const scaleClientX = e.clientX / that.containerScale
          const scaleClientY = e.clientY / that.containerScale
          const rbX = scaleClientX - el.parentNode.offsetWidth
          const rbY = scaleClientY - el.parentNode.offsetHeight
          const ltX = scaleClientX + el.parentNode.offsetWidth
          const ltY = scaleClientY + el.parentNode.offsetHeight
          const disX = scaleClientX - el.parentNode.offsetLeft
          const disY = scaleClientY - el.parentNode.offsetTop
          let cptWidth, cptHeight, cptX, cptY

          document.onmousemove = function (me) {
            const meScaleClientX = me.clientX / that.containerScale
            const meScaleClientY = me.clientY / that.containerScale

            //操作 = 移动组件位置
            if (binding.value === 'move') {
              cptX = meScaleClientX - disX
              cptY = meScaleClientY - disY
              Object.keys(that.cacheChoices).forEach(key => {
                that.cacheChoices[key].cptX = that.cacheChoicesFixed[key].cptX + Math.round(meScaleClientX - scaleClientX)
                that.cacheChoices[key].cptY = that.cacheChoicesFixed[key].cptY + Math.round(meScaleClientY - scaleClientY)
              })
            } else {
              // 操作 = 缩放组件大小
              switch (binding.value) {
                case 'lt':
                  cptWidth = ltX - meScaleClientX
                  cptHeight = ltY - meScaleClientY
                  cptX = meScaleClientX - disX
                  cptY = meScaleClientY - disY
                  that.currentCpt.cptX = Math.round(cptX)
                  that.currentCpt.cptY = Math.round(cptY)
                  break
                case 't':
                  cptHeight = ltY - meScaleClientY
                  cptY = meScaleClientY - disY
                  that.currentCpt.cptY = Math.round(cptY)
                  break
                case 'rt':
                  cptWidth = meScaleClientX - rbX
                  cptHeight = ltY - meScaleClientY
                  cptY = meScaleClientY - disY
                  that.currentCpt.cptY = Math.round(cptY)
                  break
                case 'r':
                  cptWidth = meScaleClientX - rbX
                  break
                case 'rb':
                  cptWidth = meScaleClientX - rbX
                  cptHeight = meScaleClientY - rbY
                  break
                case 'b':
                  cptHeight = meScaleClientY - rbY
                  break
                case 'lb':
                  cptWidth = ltX - meScaleClientX
                  cptHeight = meScaleClientY - rbY
                  cptX = meScaleClientX - disX
                  that.currentCpt.cptX = Math.round(cptX)
                  break
                case 'l':
                  cptWidth = ltX - meScaleClientX
                  cptX = meScaleClientX - disX
                  that.currentCpt.cptX = Math.round(cptX)
                  break
              }
              cptWidth = cptWidth < 40 ? 40 : cptWidth //限制最小缩放
              cptHeight = cptHeight < 20 ? 20 : cptHeight
              if (cptWidth) that.currentCpt.cptWidth = Math.round(cptWidth)
              if (cptHeight) that.currentCpt.cptHeight = Math.round(cptHeight)
            }
          }
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null
            that.cacheChoicesFixed = JSON.parse(JSON.stringify(that.cacheChoices)) //解决多选移动未松开ctrl键第二次以后拖动定位还原
          }
          return false
        }
      }
    }
  }
</script>
<style scoped>
  .webContainer {
    position: relative;
    margin: 0 10px;
    background-size: 100% 100%;
    transform-origin: 0 0;
  }

  .cptDiv {
    position: absolute;
    outline: none;
  }
  .cptDiv:hover .delTag {
    display: block;
  }

  .activeMask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1801;
  }

  .delTag {
    width: 60px;
    height: 22px;
    background: rgba(43, 51, 64, 0.8);
    border-radius: 2px;
    color: #ccc;
    z-index: 2000;
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    display: none;
    cursor: pointer;
  }
  .resizeTag {
    width: 8px;
    height: 8px;
    position: absolute;
    background-color: #b6bfce;
    z-index: 2000;
    border-radius: 50%;
  }

  .configBtn:hover {
    cursor: pointer;
    background-color: #dcdfe6;
  }

  .customForm {
    padding: 0 6px 0 4px;
    overflow-y: scroll;
  }
</style>
