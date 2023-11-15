<template>
  <div id="bg">
    <div id="loginbox">
      <el-form ref="loginform" :model="loginform" :rules="rules" label-width="50px" label-position="top">
        <div style="color: aliceblue; margin-top: 10%">
          <h1 style="text-align: center; height: 80px; font-size: 35px; font-weight: 800">登录</h1>
        </div>
        <el-form-item label="用户" prop="username" style="margin-top: 10%">
          <el-input v-model="loginform.username" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pw" style="margin-top: 10%">
          <el-input v-model="loginform.pw" show-password placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-key"></i>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-top: 50px" size="large">
          <el-row type="flex" justify="center">
            <el-button class="loginbutton" round type="primary" @click="handleLogin('loginform')">登录</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单数据
      loginform: {
        username: 'louis',
        pw: '1234',
      },

      //校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'validator' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        pw: [
          { required: true, message: '请输入密码', trigger: 'validator' },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    /**
     * 执行登录
     * @param {*} formname 用户信息
     */
    handleLogin(formname) {
      this.$refs[formname].validate((validate) => {
        if (validate) {
          // 开启加载
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
          })
          //登录异步
          this.$store
            .dispatch('user/login', this.loginform)
            .then((response) => {
              if (response.code == 200) {
                this.$notify({
                  title: '成功',
                  message: response.msg,
                  duration: 1000,
                  type: 'success',
                })
                loading.close()
                this.$router.push({ path: '/main/dataSource' })
              } else {
                this.$notify({
                  title: '失败',
                  message: response.msg,
                  duration: 1000,
                  type: 'error',
                })
                loading.close()
              }
            })
            .catch((error) => {
              this.$notify({
                title: '网络错误',
                message: error,
                duration: 5000,
                type: 'error',
              })
              loading.close()
            })
        } else {
          this.$notify({
            title: '警告',
            message: '请按要求输入正确的格式',
            duration: 2000,
            type: 'warning',
          })
        }
      })
    },
  },
}
</script>

<style scoped>
#bg {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url('/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

#loginbox {
  height: 600px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 0.75rem;
  background-color: #1e293b;
  opacity: 0.8;
}

.loginbutton {
  width: 40%;
}
</style>
