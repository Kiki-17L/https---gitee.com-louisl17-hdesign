<template>
  <div id="NBIKpiManager">
    <div id="NBIKpiDbsourceForm" style="height: 550px; padding: 10px 20px">
      <div class="ftitle">
        <label style="margin-right: 10px">工作表名称： </label>
        <input v-model="kpiViewName" style="height: 30px; width: 150px" class="black-text" />
        <span id="NBIKpiViewID" style="display: none"></span>
        <label style="margin-right: 20px"></label>
        <label style="margin-right: 2px">数据源名称： </label>
        <span :style="{ width: '150px', color: 'red' }">{{ dataSourceName }}</span>
        <label style="margin-right: 20px"></label>
        <label style="margin-right: 2px">数据源类型： </label>
        <span :style="{ width: '150px', color: 'red' }">{{ dataSourceType }}</span>
      </div>
      <hr style="border: 1px solid black; margin: 10px 0" />

      <div class="kpititle" style="height: 40px">
        <label>SQL语句:</label>
        <div style="float: right">
          <label>数据预览：</label>
          <input v-model="dataPreviewCount" style="width: 40px" />
          <el-button style="margin-left: 10px" type="text" icon="el-icon-s-promotion" @click="preview" :loading="isCompleted">执行</el-button>
          <el-button type="text" icon="el-icon-check" @click="saveWorkTable">保存</el-button>
        </div>
      </div>

      <div class="fitem black-background">
        <div class="CodeMirror cm-s-xq-dark">
          <div class="custom-input">
            <textarea
              rows="6"
              style="background-color: black; color: yellow; width: 99%; height: 300px; font-size: 16px"
              v-model="inputValue"
              @keydown.enter.prevent="insertNewLine"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="panel-header" style="width: 1000px">
        <div class="panel-title">数据</div>
      </div>
      <div class="datagrid-wrap panel-body" title style="width: 890px; height: 200px; overflow-x: auto">
        <el-table v-if="isCompleted" :data="tableData" border style="width: 100%">
          <el-table-column v-for="(field, index) in tableData" :prop="field.name" :label="field.name" width="180" :key="index"> </el-table-column>
        </el-table>
      </div>

      <div class="datagrid-pager paginaition">
        <table cellspacing="0" cellpadding="0" border="0">
          <tbody>
            <tr>
              <td>
                <select class="pagination-page-list">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
              </td>

              <td>
                <div class="pagination-btn-separator"></div>
              </td>
              <td>
                <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
                <span style="padding-left: 6px">第</span>
              </td>
              <td>
                <input class="pagination-num" type="text" v-model="currentPage" size="2" />
              </td>
              <td>
                <span style="padding-right: 6px">共{{ Math.ceil(dataPreviewCount / 10) }}页</span>
              </td>
              <td>
                <button @click="nextPage" :disabled="currentPage >= totalPage">下一页</button>
              </td>
            </tr>
          </tbody>
        </table>
        <span class="pagination-info">显示1到10,共{{ dataPreviewCount }}记录 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kpiViewName: '',
      dataSourceName: '',
      dataSourceType: 'Excel',
      dataPreviewCount: '',
      hiddenValue: '10',
      textarea: '',
      inputValue: '',
      dataFromServer: [], //用于存储从数据库返回的数据
      isEditMore: false, //用于追踪按钮状态
      currentPage: 1,
      totalPage: 4,
    }
  },
  computed: {
    saveButtonLabel() {
      //根据按钮状态返回不同的标签
      return this.isEditMore ? '修改' : '保存'
    },
    isCompleted() {
      return false
    },
  },
  mounted() {
    let ds = JSON.parse(this.$route.params.ds)
    let table = JSON.parse(this.$route.params.table)
    this.dataSourceName = ds.label
    this.inputValue = 'Select * From ' + table.label
  },
  watch: {
    $route: {
      handler() {
        let ds = JSON.parse(this.$route.params.ds)
        console.log(ds)
        let table = JSON.parse(this.$route.params.table)
        this.dataSourceName = ds.label
        this.inputValue = 'Select * From ' + table.label
      },
      deep: true,
    },
  },

  methods: {
    preview() {},
    saveWorkTable() {},
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    insertNewLine(event) {
      if (event.key == 'Enter') {
        //插入换行符
        this.inputValue += '\n'
      }
    },
  },
}
</script>

<style scoped>
.black-text {
  color: black;
}
.black-background {
  background-color: white;
  height: 310px;
}

.cm-keyword {
  position: absolute;
  top: 0;
  left: 0;
}
.panel-header {
  border: 1px solid gray;
}
</style>
