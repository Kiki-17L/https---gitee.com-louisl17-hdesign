<template>
  <div>
    <el-form :model="data" :rules="rules" ref="dsform" label-position="right" label-width="8rem" :hide-required-asterisk="true">
      <el-form-item label="数据源名称" prop="dsname">
        <el-col :span="12"> <el-input v-model="data.dsname"></el-input></el-col>
      </el-form-item>
      <el-form-item label="数据库名称" prop="dbname">
        <el-col :span="12">
          <el-input v-model="data.dbname"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="数据库地址" prop="host">
        <el-col :span="12">
          <el-input v-model="data.host"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="数据源端口" prop="port">
        <el-col :span="12">
          <el-input v-model="data.port" prefix-icon="el-icon-s-platform"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="登录账号" prop="username">
        <el-col :span="12">
          <el-input v-model="data.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-col :span="12">
          <el-input v-model="data.password" prefix-icon="el-icon-key" show-password></el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { testConnection, saveDataSource } from '@/api/datasource.js'

  export default {
    data() {
      return {
        formname: 'dsform',
        //表单数据
        data: {
          dsname: '',
          dbname: 'test',
          host: 'server.natappfree.cc',
          port: '',
          username: '',
          password: ''
        },
        //表单验证
        rules: {
          dsname: [{ required: true, message: '请输入数据源名', trigger: 'validator' }],
          dbname: [{ required: true, message: '请输入数据库名', trigger: 'validator' }],
          host: [{ required: true, message: '请输入数据库地址', trigger: 'validator' }],
          port: [{ required: true, message: '请输入数据库端口', trigger: 'validator' }],
          username: [{ required: true, message: '请输入数据库用户名', trigger: 'validator' }],
          password: [{ required: true, message: '请输入数据库密码', trigger: 'validator' }]
        }
      }
    },

    props: {
      dbinfo: {
        type: Object
      },
      visible: {
        type: Boolean
      }
    },

    watch: {
      // 当某个数据源被选中后,重置表单,传入默认的端口号。
      visible: {
        handler(newval, oldval) {
          this.restForm()
          this.data.port = this.dbinfo.port
        },
        deep: true
      }
    },

    // 挂载钩子
    mounted() {
      this.data.port = this.dbinfo.port
    },

    methods: {
      //测试数据库连接api
      handleConnect() {
        this.$refs.dsform.validate(validata => {
          if (validata) {
            // 测试数据库连接所需要的字段
            let dbinfo = {
              database: this.data.dbname,
              server: this.data.host,
              port: this.data.port,
              username: this.data.username,
              pwd: this.data.password
            }

            const load = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })

            //调用测试连接api
            testConnection(dbinfo)
              .then(response => {
                load.close()
                if (response) {
                  this.$alert('链接成功', '成功', {
                    comfirmButtonText: '确定'
                  })
                } else {
                  this.$alert('链接失败', '失败', {
                    comfirmButtonText: '确定'
                  })
                }
              })
              .catch(error => {
                load.close()
                console.log(error)
              })
          } else {
            this.$message('请完整表单内容')
          }
        })
      },
      //
      handleOpen() {
        this.data.port = this.dbinfo.port
      },

      // 提交表单
      handleSave() {
        const load = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$refs.dsform.validate(valid => {
          if (valid) {
            //调用
            let ds = {
              name: '',
              database: '',
              server: '',
              port: '',
              username: '',
              pwd: ''
            }

            ds.name = this.data.dsname
            ds.database = this.data.dbname
            ds.server = this.data.host
            ds.port = this.data.port
            ds.username = this.data.username
            ds.pwd = this.data.password

            saveDataSource(ds)
              .then(res => {
                load.close()

                // 保存成功
                if (res.code == 201) {
                  this.$emit('close') //关闭对话框
                  this.$alert(res.msg, '成功', {
                    comfirmButtonText: '确定',
                    callback: action => {
                      this.$emit('refresh') //刷新数据源列表
                    }
                  })
                } //保存失败
                else {
                  this.$alert(res.msg, '失败', {
                    comfirmButtonText: '确定'
                  })
                }
              })
              .catch(error => {
                load.close()
                console.log(error)
              })
          } else {
            this.$message('验证失败')
            load.close()
          }
        })
      },
      //重置表单
      restForm() {
        this.$refs.dsform.resetFields()
      }
    }
  }
</script>
<style scoped></style>
