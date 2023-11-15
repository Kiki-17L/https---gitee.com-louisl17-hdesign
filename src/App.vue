<script>
import { removeToken } from '@/utils/auth'
export default {
  data() {
    return {
      beforeUnloadTime: 0,
      gapTime: 0,
    }
  },
  mounted() {
    window.addEventListener('beforeunload', () => this.beforeunloadHandler())
    window.addEventListener('unload', () => this.unloadHandler())
  },
  methods: {
    beforeunloadHandler() {
      this.beforeUnloadTime = new Date().getTime()
    },

    /**
     * TODO：浏览器关闭则，移除token
     */
    unloadHandler() {
      this.gapgapTime = new Date().getTime() - this.beforeUnloadTime
      if (gapTime <= 5) {
        //浏览器关闭
        removeToken('Admin-Token')
      }
    },
  },
}
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
