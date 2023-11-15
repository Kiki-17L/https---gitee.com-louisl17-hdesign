<template>
  <div>
    <el-container style="height: 100vh">
      <aside>
        <SideBar></SideBar>
      </aside>
      <el-main style="background-color='#FFFFFF';padding: 0;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import SideBar from '@/layout/components/Sidebar.vue'

export default {
  components: {
    SideBar,
  },
}
</script>
<style scoped></style>
