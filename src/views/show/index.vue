<template>
  <div :style="{ width: windowWidth + 'px', height: conHeight + 'px', backgroundColor: designCache.bgColor }" style="background-size: 100% 100%; background-color: #2b3340; overflow: hidden">
    <div style="position: relative; transform-origin: 0 0" :style="{ width: windowWidth + 'px', height: conHeight + 'px', transform: 'scale(' + containerScale + ')' }">
      <transition-group appear name="bounce">
        <div
          v-for="item in designCache.components"
          :key="item.id"
          style="position: absolute"
          :style="{ width: Math.round(item.cptWidth) + 'px', height: Math.round(item.cptHeight) + 'px', top: Math.round(item.cptY) + 'px', left: Math.round(item.cptX) + 'px', zIndex: item.cptZ }"
        >
          <component :is="item.cptKey" :width="Math.round(item.cptWidth)" :height="Math.round(item.cptHeight)" @reload="loadCacheData" :option="item.cptOption" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'preview_index',
  data() {
    return {
      designCache: {},
      windowWidth: 0,
      windowHeight: 0,
      conHeight: 0,
      containerScale: 1,

      viewCode: '',
    }
  },
  mounted() {
    const that = this
    that.loadCacheData()

    window.onresize = () => {
      return (() => {
        that.loadSize()
      })()
    }
  },
  methods: {
    loadCacheData() {
      const path = this.$route.path
      const that = this
      const id = this.$route.query.id

      let designCache = JSON.parse(localStorage.getItem('designCache'))
      this.loadDesign(designCache, false)
    },
    loadDesign(design, componentPares) {
      if (componentPares) {
        design.components = JSON.parse(design.components)
      }
      document.title = design.title
      this.designCache = design
      this.loadSize()
    },

    loadSize() {
      this.windowWidth = document.documentElement.clientWidth
      this.windowHeight = document.documentElement.clientHeight
      this.containerScale = Math.round((this.windowWidth / this.designCache.scaleX) * 100) / 100
      this.conHeight = this.windowHeight
    },
  },
}
</script>

<style scoped>
.bounce-enter-active {
  transition: all 1s;
  /*animation: bounce-in 1s;*/
}
.bounce-enter {
  opacity: 0;
  transform: scale(0.5);
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
