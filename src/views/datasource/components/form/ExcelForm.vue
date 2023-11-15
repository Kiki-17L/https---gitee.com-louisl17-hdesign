<template>
  <el-form ref="dsform" :rules="rules" :model="data" label-width="50px" label-position="top" @submit.native.prevent :hide-required-asterisk="true">
    <!--数据源名称-->
    <el-form-item prop="name" label="数据源名称">
      <el-input v-model="data.name" placeholder="请输入数据源名称"></el-input>
    </el-form-item>
    <!--数据源文件-->
    <el-form-item :label="typename + '文件'">
      <el-upload
        ref="upload"
        drag
        multiple
        action=""
        :http-request="handleRequest"
        :auto-upload="false"
        :file-list="fileList"
        :show-file-list="true"
        :limit="2"
        :on-change="handleChange"
        :with-credentials="true">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">最多上传1个文件</div>
      </el-upload>
    </el-form-item>
  </el-form>
</template>
<script>
  import { uploadFile } from '@/api/file.js'
  export default {
    data() {
      return {
        data: {
          name: ''
        },
        fileList: [],
        rules: {
          name: [{ required: true, message: '请输入数据源名', trigger: 'validator' }]
        }
      }
    },
    props: {
      //获取数据源类型
      typename: {
        type: String
      },
      // 获取数据源对象
      dbinfo: {
        type: Object
      },
      // 获取对话框状态
      visible: {
        type: Boolean
      }
    },

    watch: {
      /**
       *
       * TODO: 监听Dialog是否关闭，关闭则重置表单
       */
      visible: {
        handler(newval, oldval) {
          this.restForm() //重置表单
          this.fileList = [] //重置fileList
          this.$refs.upload.clearFiles()
        }
      }
    },
    methods: {
      /**
       * TODO：保存按钮，保存数据源
       */
      handleSave() {
        this.$refs.dsform.validate(valid => {
          //验证成功则保存数据
          if (valid) {
            if (this.fileList.length != 0) {
              this.$refs.upload.submit()
              this.handleClose()
            } else {
              this.$alert('绑定文件不能为空', '保存失败', {
                comfirmButtonText: '确定'
              })
            }
            //最后关闭窗口
          } else {
            this.$message('保存失败')
          }
        })
      },

      //重置表单
      restForm() {
        this.$refs.dsform.resetFields()
      },

      //处理el-upload组件文件改变
      handleChange(file, fileList) {
        this.fileList.push(file)
      },

      /**
       *
       * TODO: 处理el-upload提交事件
       */
      handleRequest() {
        // 开启一个loading
        const load = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        let data = new FormData()

        data.append('filename', this.data.name)
        data.append('file', this.fileList[0].raw)

        //发送请求
        uploadFile(data)
          .then(res => {
            load.close()
            if (res.code == 201) {
              this.$alert(res.msg, '成功', {
                comfirmButtonText: '确定',
                callback: action => {
                  this.$emit('refresh') //刷新数据源列表
                }
              })
            } else {
              this.$alert('保存失败', '失败', {
                comfirmButtonText: '确定'
              })
            }
          })
          .catch(error => {
            load.close()
            console.log(error)
          })
      },

      // 保存成功之后，向父组件传递关闭消息
      handleClose() {
        this.$emit('close')
      }
    }
  }
</script>
<style>
  .el-upload {
    width: 100%;
  }

  .el-upload-dragger {
    width: 100%;
  }
</style>
