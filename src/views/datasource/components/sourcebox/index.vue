<!--这是数据源展示框-->
<template>
  <div class="sourcebox" @click="handleClick(info)">
    <div
      class="img"
      :style="{
        'background-image': 'url(' + info.img + ')',
      }"
    ></div>
    <div class="title">
      <p style="margin: 0">{{ info.title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: Object,
  },
  methods: {
    //处理数据源box点击事件
    handleClick(info) {
      let data = info.type
      this.$emit('Clicked', data, info) //当数据源box被点击后,触发事件，将数据源的type发送给父组件
    },
  },
}
</script>
<style scoped>
.sourcebox {
  width: 200px;
  height: 150px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.sourcebox:hover {
  border: 1px solid #4981ca;
  font-weight: bold;
  cursor: pointer;
}

.img {
  height: 80%;
  background-repeat: no-repeat;
  background-size: cover;
}

.title {
  height: 20%;
  border-top: 2px solid #dddddd;
  text-align: center;
  font-size: small;
}
</style>
