<template>
  <div class="main">
    <div class="box">
      <div class="container">
        <div class="sourcebox" v-for="data in textlist" :key="data.id" @click="handleClick(data)">
          <div class="icon-container">
            <i class="icon" :class="data.icon"></i>
          </div>
          <div class="title">
            <p style="margin: 0">{{ data.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <SqlDialog :visible="visible2" :typename="chosed" :dbinfo="dbinfo" width="25%" @close="visible2 = false"></SqlDialog>
    <FileDialog :visible="visible" :typename="chosed" width="25%" @close="visible = false"></FileDialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chosed: 'default', // 选中的数据源名称
      dbinfo: {}, // 选中的数据源配置对象
      textlist: [
        {
          id: 1,
          title: 'NBIComponents',
          icon: 'el-icon-folder', // 使用Element UI的图标类名
        },
        {
          id: 2,
          title: 'NBIFeatures',
          icon: 'el-icon-folder',
        },
        {
          id: 3,
          title: 'Others',
          icon: 'el-icon-folder',
        },
      ],
    }
  },
  methods: {
    handleClick(data) {
      let dataType = data.title
      this.$emit('Clicked', dataType, data) // 当数据源box被点击后，触发事件，将数据源的类型和信息发送给父组件
    },
  },
}
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-image: url('/bgroud.png'); /* 设置背景图片 */
  background-repeat: no-repeat;
  /* background-size: cover; */
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

.sourcebox {
  width: 200px;
  height: 190px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 实现垂直和水平居中 */
  transition: transform 0.2s ease; /* 添加点击动画 */
}

.sourcebox:hover {
  transform: scale(1.05); /* 设置鼠标悬停时的放大效果 */
}

.icon-container {
  font-size: 80px; /* 调整图标大小为原来的两倍 */
}

.icon {
  color: yellow; /* 设置图标颜色为黄色 */
}

.title {
  height: 20%;
  /* border-top: 2px solid #dddddd; */
  text-align: center;
  font-size: small;
}
</style>
