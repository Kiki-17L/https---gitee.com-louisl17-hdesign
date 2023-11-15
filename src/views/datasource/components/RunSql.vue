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
          <input type="hidden" v-model="hiddenValue" value="10" />
          <a href="#" class="l-btn" @click="executeSQL">执行</a>
          <a href="javascript:void(0)" class="l-btn" @click="saveSQL">{{ saveButtonLabel }}</a>
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
      <div class="datagrid-wrap panel-body" title style="width: 890px; height: 200px">
        <table>
          <thead></thead>
          <tbody>
            <tr v-for="(item, index) in dataFromServer" :key="index">
              <td>{{ index + 1 }}</td>
              <!-- 显示序号 -->
              <td>{{ item.field1 }}</td>
              <!-- 显示字段1的值 -->
              <td>{{ item.field2 }}</td>
              <!-- 显示字段2的值 -->
              <td>{{ item.field3 }}</td>
              <!-- 显示字段3的值 -->
              <td>{{ item.field4 }}</td>
              <!-- 显示字段4的值 -->

              <!-- 添加更多字段 -->
            </tr>
          </tbody>
        </table>
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
import axios from 'axios'
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
  },
  mounted() {
    let node = JSON.parse(this.$route.params.id)
    let ds = JSON.parse(this.$route.params.ds)
    this.dataSourceName = ds.label
    this.kpiViewName = node.label
    this.inputValue = 'Select * From ' + '[' + node.label + ']'
  },
  destroyed() {
    console.log('组件销毁')
  },
  watch: {
    $route: {
      handler() {
        let node = JSON.parse(this.$route.params.id)
        let ds = JSON.parse(this.$route.params.ds)
        this.dataSourceName = ds.label
        this.kpiViewName = node.label
        this.inputValue = 'Select * From ' + '[' + node.label + ']'
      },
      deep: true,
    },
  },

  methods: {
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

    async executeSQL() {
      try {
        const response = await axios.post('/execute-sql', {
          sqlQuery: this.inputValue,
        })

        // 假设服务器返回的数据在 response.data 中
        this.dataFromServer = response.data // 将数据存储到 dataFromServer
      } catch (error) {
        console.error('执行 SQL 出错:', error)
        // 处理错误情况
      }
    },

    async saveSQL() {
      if (this.kpiViewName == '') {
        alert('请输入业务视图名称！')
      } else {
        try {
          // 发送 SQL 保存请求到服务器
          const response = await axios.post('/save-sql', {
            //发送post请求到服务器的'/save-sql'
            sqlQuery: this.inputValue, // 从前端获取 SQL 语句
            kpiViewName: this.kpiViewName, // 也可以将业务视图名称一并发送到服务器
          })

          console.log('SQL 已成功保存到服务器！')
          alert('保存成功！')
        } catch (error) {
          console.error('保存 SQL 出错:', error)
          // 处理错误情况
          alert('保存失败 ！')
        }
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
