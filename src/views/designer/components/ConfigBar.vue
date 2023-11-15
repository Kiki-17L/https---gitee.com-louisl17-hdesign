<template>
  <div style="width: 100%">
    <el-tabs v-model="configTab" :stretch="true">
      <!--组件坐标配置-->
      <el-tab-pane label="坐标" name="basic">
        <div style="width: 200px; margin: 0 auto">
          <el-row style="padding: 10px 6px 0 6px">
            宽度：<el-input-number :min="20" :max="2000" v-model="currentCpt.cptWidth" size="small" />
          </el-row>
          <el-row style="padding: 10px 6px 0 6px">
            高度：<el-input-number :min="20" :max="1500" v-model="currentCpt.cptHeight" size="small" />
          </el-row>
          <el-row style="padding: 10px 6px 0 6px"> X 轴：<el-input-number :min="-500" :max="2500" v-model="currentCpt.cptX" size="small" /> </el-row>
          <el-row style="padding: 10px 6px 0 6px"> Y 轴：<el-input-number :min="-500" v-model="currentCpt.cptY" size="small" /> </el-row>
          <el-row style="padding: 10px 6px 0 6px"> Z 轴：<el-input-number :min="1" :max="1800" v-model="currentCpt.cptZ" size="small" /> </el-row>
        </div>
      </el-tab-pane>
      <!--属性配置-->
      <el-tab-pane label="属性" name="custom">
        <div class="customForm" :style="{ height: height - 250 + 'px' }" v-if="currentCpt && currentCpt.cptOption">
          <component
            :is="currentCpt.cptOptionKey ? currentCpt.cptOptionKey : +currentCpt.cptKey + '-config'"
            :attribute="currentCpt.cptOption ? currentCpt.cptOption.attribute : undefined"
          ></component>
        </div>
      </el-tab-pane>
      <!--数据配置-->
      <el-tab-pane label="数据" name="data" v-if="cptDataFormShow">
        <div class="customForm" :style="{ height: height - 250 + 'px' }">
          <el-form size="mini" label-position="top">
            <!--数据来源的选择-->
            <el-form-item label="数据类型">
              <el-radio-group v-model="currentCpt.cptOption.cptDataForm.dataSource" @change="">
                <el-radio :label="1">静态数据</el-radio>
                <el-radio :label="2">接口</el-radio>
                <el-radio :label="3">sql</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="轮询" v-show="currentCpt.cptOption.cptDataForm.dataSource !== 1">
              <el-switch v-model="dataPollEnable" active-text="开启" inactive-text="关闭" />
            </el-form-item>
            <el-form-item label="轮询时间(s)" v-show="dataPollEnable">
              <el-input-number v-model="currentCpt.cptOption.cptDataForm.pollTime" :min="0" :max="100" label="描述文字" />
            </el-form-item>
            <!--静态数据编辑-->
            <el-form-item :label="dataLabels[currentCpt.cptOption.cptDataForm.dataSource - 1]">
              <JsonEditorVue
                v-show="currentCpt.cptOption.cptDataForm.dataSource === 1"
                v-model="dataJson"
                :show-btns="false"
                :expandedOnStart="true"
                :mode="'code'"
              />
              <el-input
                v-show="currentCpt.cptOption.cptDataForm.dataSource === 2"
                type="textarea"
                :rows="5"
                v-model="currentCpt.cptOption.cptDataForm.apiUrl"
              />
              <codemirror
                class="code"
                v-show="currentCpt.cptOption.cptDataForm.dataSource === 3"
                v-model="currentCpt.cptOption.cptDataForm.sql"
                :options="cmOptions"
              />
            </el-form-item>
            <!--刷新数据按钮-->
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="refreshCptData">刷新数据</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { isJSON } from '@/utils/myUtil'

import JsonEditorVue from 'json-editor-vue'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime' //sublime编辑器效果
import 'codemirror/theme/dracula.css' // 配置里面也需要theme设置为monokai
import 'codemirror/mode/sql/sql.js' // 配置里面也需要mode设置为vue
import 'codemirror/addon/selection/active-line'
export default {
  data() {
    return {
      configTab: 'custom', //默认展开的标签页
      cptDataFormShow: true,
      dataLabels: ['数据', '接口地址', 'sql'],

      hasJsonFlag: true,

      cmOptions: {
        tabSize: 4, // tab的空格个数
        theme: 'dracula', //主题样式
        lineNumbers: true, //是否显示行数
        lineWrapping: true, //是否自动换行
        styleActiveLine: true, //line选择是是否加亮
        matchBrackets: true, //括号匹配
        mode: 'text/x-sparksql', //实现javascript代码高亮
        readOnly: false, //只读

        keyMap: 'default',
        extraKeys: { tab: 'autocomplete' },
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        hintOptions: {
          completeSingle: false,
          tables: {},
        },
      },
    }
  },
  props: {
    currentCpt: Object,
    height: Number,
  },
  components: {
    JsonEditorVue,
    codemirror,
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
    },
  },
  computed: {
    dataPollEnable: {
      get() {
        return !!(
          this.currentCpt.cptOption.cptDataForm &&
          this.currentCpt.cptOption.cptDataForm.pollTime &&
          this.currentCpt.cptOption.cptDataForm.pollTime !== 0
        )
      },
      set(newValue) {
        if (newValue) {
          this.currentCpt.cptOption.cptDataForm.pollTime = 8
        } else {
          this.currentCpt.cptOption.cptDataForm.pollTime = 0
          // this.refreshCptData() //清除定时器
        }
        return newValue
      },
    },
    dataJson: {
      get() {
        if (isJSON(this.currentCpt.cptOption.cptDataForm.dataText)) {
          return JSON.parse(this.currentCpt.cptOption.cptDataForm.dataText)
        } else {
          return {}
        }
      },
      set(newValue) {
        this.currentCpt.cptOption.cptDataForm.dataText = JSON.stringify(newValue)
      },
    },
  },
  methods: {
    /**
     * 将刷新组件数据传递到父组件
     */
    refreshCptData() {
      this.$emit('refreshCptData')
    },
  },
}
</script>
<style>
.customForm {
  padding: 0 6px 0 4px;
  overflow-y: auto;
}
</style>
