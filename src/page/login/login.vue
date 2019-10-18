<template>
  <div class="login_box">
    <div class="login-content">
      <h1 class="b-title">享乐康医生管理系统</h1>
      <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">
          <img src="../../../static/img/logo.png" alt="享乐康" />
        </h3>
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="ruleForm2.account"
            auto-complete="off"
            placeholder="请输入用户名/账号"
            style="background:#f6f6f6;"
          >
            <i slot="prefix" class="user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            :type="type?'password':'text'"
            v-model="ruleForm2.checkPass"
            auto-complete="off"
            style="background:#f6f6f6;"
            placeholder="请输入密码"
            @keyup.enter.native="handleSubmit2"
          >
            <i slot="prefix" class="password"></i>
            <i slot="suffix" class="el-icon-view eye" @click="eye"></i>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember" @click.native="remember()">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleSubmit2"
            :loading="logining"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
/**
 * @author Geliangjun
 * @Description: Life is but a dream
 * @date 2019/9/16
 * @annotation：登录页面
 */
import {login} from '@/axios/api'
export default {
  name: 'login',
  data: function () {
    return {
      logining: false,
      ruleForm2: {
        account: '',
        checkPass: ''
      },
      rules2: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      checked: false,
      type: true
    }
  },
  watch: {
    'ruleForm2.account': function (i) {
      this.logining = false
    },
    'ruleForm2.checkPass': function (i) {
      this.logining = false
    }
  },
  methods: {
    remember () {
      let name = this.ruleForm2.account
      let pass = this.ruleForm2.checkPass
      if (this.checked) {
        this.clearCookie()
      } else {
        this.setCookie(name, pass, 7)
      }
    },
    eye () {
      this.type = !this.type
    },
    // 设置cookie
    setCookie (c_name, c_pwd, exdays) {
      var exdate = new Date() // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie =
        'userPwd' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    // 读取cookie
    getCookie: function () {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split('; ') // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split('=') // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.checked = true
            this.ruleForm2.account = arr2[1] // 保存到保存数据的地方
          } else if (arr2[0] == 'userPwd') {
            this.ruleForm2.checkPass = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', -1) // 修改2值都为空，天数为负1天就好了
    },
    // 请求登录接口
    handleSubmit2 (ev) {
      console.log('ref', this.$refs.ruleForm2.$children)
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true
          let params = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          }
          login(params).then(res => {
            this.logining = false
            sessionStorage.setItem('token', res.data.data.access)
            sessionStorage.setItem('enable', res.data.data.subject.enable)
            let token = window.sessionStorage.getItem('token')
            if (token) {
              this.$router.push({ path: '/main' })
            }
          }).catch(
            setTimeout(() => {
              this.logining = false
            }, 1000 * 5)
          )
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.getCookie()
  }
}
</script>
<style lang="less">
.login_box .login-container {
  .el-input__inner {
    background-color: #f6f6f6;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 40px;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #34BE7F;
    border-color: #34BE7F;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #44d2bc;
  }
  .el-button--primary {
    // height:67px;
    // font-size: 28px;
    background: rgba(0, 110, 54, 1);
    border-radius: 5px;
    border-color: rgba(0, 110, 54, 1);
  }
}
</style>
<style lang="less" scoped>
.login_box {
  margin: 0 auto;
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: url(../../../static/img/login_background.png) no-repeat center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-content {
    width: 100%;
    .b-title {
      color: rgba(255, 255, 255, 1);
      font-size: 2.2rem;
    }
    .login-container {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 50px auto;
      width: 23%;
      min-width: 350px;
      padding: 19px 37px 15px 37px;
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0px 9px 8px 0px #263131;
      border-radius: 10px;
      .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        float: left;
        margin: 0px 0px 35px 5px;
      }
      .user {
        padding: 7px 13px;
        background: url("../../../static/img/me.png");
      }
      .password {
        padding: 7px 13px;
        background: url("../../../static/img/password.png");
      }
      .eye {
        padding: 7px 13px;
        cursor: pointer;
      }
    }
  }
}
</style>
