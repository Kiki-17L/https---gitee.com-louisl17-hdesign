<template>
  <div style="height: 100%">
    <el-menu
      router
      :collapse="isCollapse"
      :default-active="$router.currentRoute.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height: 100%; border: none"
    >
      <div class="logout" @click="isCollapse = !isCollapse">
        <i :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'" id="collapse" style="width: 100%; height: 100%"></i>
      </div>
      <el-menu-item index="/main/dataSource">
        <i class="el-icon-coin"></i>
        <span>数据源</span>
      </el-menu-item>
      <el-menu-item index="/main/dashBoard">
        <i class="el-icon-odometer"></i>
        <span slot="title">创建仪表盘</span>
      </el-menu-item>
      <el-menu-item index="/main/preview">
        <i class="el-icon-document"></i>
        <span slot="title">查看报表</span>
      </el-menu-item>
      <el-menu-item index="/main/settings">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
      <el-menu-item index="/main/realtime">
        <i class="el-icon-view"></i>
        <span slot="title">实况</span>
      </el-menu-item>
      <div class="logout" @click="handleLogout">
        <i class="iconfont icon-tuichu" style="width: 100%; height: 100%" id="logouticon"></i>
      </div>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'SideBar',

  data() {
    return {
      isCollapse: false,
    }
  },
  methods: {
    //处理退出登录
    handleLogout() {
      this.$confirm('确定要退出登录吗', '退出登录', {
        type: 'warning',
      })
        .then(() => {
          this.$store.dispatch('user/logout')
        })
        .then(() => {
          this.$router.push({ path: 'login' })
        })
    },
  },
}
</script>
<style scoped>
.logout {
  text-align: center;
}

#collapse:hover {
  color: aliceblue;
  cursor: pointer;
}
#logouticon:hover {
  cursor: pointer;
  color: aliceblue;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
</style>
