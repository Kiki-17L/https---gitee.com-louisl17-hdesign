<template>
  <div>
    <el-container style="height: 100vh">
      <!--主页标头-->
      <el-header class="header1">
        <p style="line-height: 1.7">创 建 数 据 源</p>
        <div class="home" @click="home"><i class="el-icon-s-home"></i></div>
      </el-header>

      <!--主页主容器-->
      <el-container style="height: 95vh">
        <!--容器侧边栏-->
        <aside style="height: 100%">
          <LeftMenu ref="leftmenu"></LeftMenu>
        </aside>
        <!--容器主内容-->
        <el-main>
          <router-view @refresh="handleRefresh"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AppMain from '@/views/datasource/components/AppMain.vue'
  import LeftMenu from '@/views/datasource/components/LeftMenu.vue'
  export default {
    components: {
      AppMain,
      LeftMenu
    },

    methods: {
      /**
       * TODO:响应数据源创建成功后，刷新数据源列表的请求
       */
      handleRefresh() {
        this.$refs['leftmenu'].refreshList()
      },

      /**
       * 回到数据源主界面
       */
      home() {
        this.$router.push({ name: 'dshome' })
      }
    }
  }
</script>

<style scoped>
  .header1 {
    display: flex;
    font-family: Arial, sans-serif;
    /* text-align: left; */
    color: #409eff;
    height: 5vh;
    background-color: #ffffff;
    border-bottom: 2px solid #dddddd;
  }

  .home {
    color: black;
    margin-left: auto;
    height: 100%;
    width: 3%;
    font-size: larger;
    text-align: center;
    line-height: 2.5;
  }

  .home:hover {
    color: #409eff;
    background-color: #e6e6e6;
  }
</style>
