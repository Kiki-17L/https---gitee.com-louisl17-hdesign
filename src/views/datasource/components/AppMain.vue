<template>
  <div class="main">
    <div class="box">
      <el-tag>关系数据源</el-tag>
      <div class="container">
        <SourceBox v-for="data in relationlist" :info="data" :key="data.id" style="margin-right: 2rem" @Clicked="handleDsClick"></SourceBox>
      </div>
    </div>
    <div class="box">
      <el-tag>文件数据源</el-tag>
      <div class="container">
        <SourceBox v-for="data in textlist" :info="data" :key="data.id" style="margin-right: 2rem" @Clicked="handleDsClick"></SourceBox>
      </div>
    </div>
    <div class="box">
      <el-tag>大数据平台数据源</el-tag>
      <div class="container"></div>
    </div>
    <div class="box">
      <el-tag>其他数据源</el-tag>
      <div class="container"></div>
    </div>
    <SqlDialog :visible="visible2" :typename="chosed" :dbinfo="dbinfo" width="25%" @close="visible2 = false" @refresh="$emit('refresh')"></SqlDialog>
    <FileDialog :visible="visible" :typename="chosed" width="25%" @close="visible = false" @refresh="$emit('refresh')"></FileDialog>
  </div>
</template>
<script>
  import SourceBox from '@/views/datasource/components/sourcebox/index.vue'
  import FileDialog from '@/views/datasource/components/dialog/FileDialog/FileDialog.vue'
  import SqlDialog from '@/views/datasource/components/dialog/SqlDialog/SqlDialog.vue'
  export default {
    data() {
      return {
        visible: false, //控制文件数据源弹窗
        visible2: false, //控制关系数据源弹窗
        chosed: 'default', //选中的数据源名称
        dbinfo: {}, //选中的数据源配置对象
        textlist: [
          {
            id: 1,
            img: '/excel.png',
            title: 'Excel数据源',
            type: 'Excel',
            relation: false
          },
          {
            id: 2,
            img: '/csv.png',
            title: 'CSV数据源',
            type: 'CSV',
            relation: false
          },
          {
            id: 3,
            img: '/txt.png',
            title: 'TXT数据源',
            type: 'TXT',
            relation: false
          }
        ],
        relationlist: [
          {
            id: 1,
            img: '/oracle.png',
            title: 'Oracle数据源',
            type: 'Oracle',
            port: '1521',
            relation: true
          },
          {
            id: 2,
            img: '/mysql.png',
            title: 'Mysql数据源',
            type: 'Mysql',
            port: '3306',
            relation: true
          },
          {
            id: 3,
            img: '/access.png',
            title: 'Access数据源',
            type: 'Access',
            port: '1234',
            relation: true
          }
        ]
      }
    },
    methods: {
      //处理数据源Box被点击后
      handleDsClick(type, info) {
        this.chosed = type //数据源被点击后，将该Box的type绑定到响应式chosed
        this.dbinfo = info //数据源被点击后，将该Box的数据源对象绑定到dbinfo

        // 判断数据源类型
        if (info.relation) {
          this.visible2 = !this.visible2
        } else {
          this.visible = !this.visible //数据源被点击后，弹出配置对话框。
        }
      }
    },
    components: {
      SourceBox,
      FileDialog,
      SqlDialog
    }
  }
</script>
<style scoped>
  .main {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .box {
    margin-bottom: 40px;
    height: 20%;
  }

  .container {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    border-top: 3px solid #dddddd;
  }
</style>
