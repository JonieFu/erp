<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avator_box">
        <img src="../assets/erp.png" alt="ERP" />
      </div>
      <h4>ERP管理系统</h4>
      <el-form
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginForm"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">北京京仪北方仪器仪表有限公司</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在3到10字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15字符之间', trigger: 'blur' },
        ],
      },
    }
  },
  created() {},
  methods: {
    resetLoginForm() {
      this.$refs.loginForm.resetFields()
      this.$message.success('已重置')
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return
        // 从后端获取数据
        // 将获取到的token值存储在本地
        // window.sessionStorage.setItem('token',res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.login_container {
  background: #2b4b6b;
  height: 100%;
  h4 {
    text-align: center;
    margin-top: 70px;
  }
  .login_box {
    width: 450px;
    height: 300px;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avator_box {
      background: #fff;
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate((-50%, -50%));
      img {
        background: #eee;
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    form.el-form.login_form {
      height: 190px;
    }
    .login_form {
      position: absolute;
      margin-top: -10px;
      bottom: 0;
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;
    }

    .btn {
      display: flex;
      justify-content: center;
    }
    .footer {
      font-size: 10px;
      text-align: center;
      margin-top: 185px;
    }
  }
}
</style>