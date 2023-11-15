<template>
  <div style="height: 100%">
    <el-header id="header" style="height: 10%; border-bottom: 2px solid #dddddd"></el-header>
    <el-main class="main" style="height: 90%">
      <div class="container">
        <video id="vid"></video>
      </div>
      <el-button @click="turnOnCamera">开启</el-button>
      <el-button @click="close">关闭</el-button>
      <el-button @click="record">录制</el-button>
      <el-button @click="stop">停止</el-button>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stream: {},
      mediaRecorder: {},
      recordBlob: [],
    }
  },

  created() {},

  methods: {
    turnOnCamera() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.stream = stream
          var vi = document.getElementById('vid')
          vi.srcObject = stream
          vi.onloadedmetadata = () => vi.play()
        })
        .catch((err) => {
          console.log('获取摄像头失败', err)
        })
    },
    close() {
      this.stream.getTracks().forEach((track) => {
        if (track.kind == 'video') {
          track.stop()
        }
      })
    },

    record() {
      this.mediaRecorder = new MediaRecorder(this.stream, {
        videoBitsPerSecond: 2500000,
        mimeType: 'video/webm',
      })

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.recordBlob.push(event.data)
        }
      }

      this.mediaRecorder.onstop = (e) => {
        console.log('录制结束', e)
        console.log(this.recordBlob)
      }

      this.mediaRecorder.start(10)
    },

    stop() {
      this.mediaRecorder.stop()
      console.log('录制结束')
    },
  },
}
</script>
<style scoped>
.main {
  /* padding: 0; */
  display: block;
}

.container {
  padding: 10px;
  width: 30%;
  height: 40%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
}
#vid {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
