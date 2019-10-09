<template>
  <el-header :span="24" class="header" style="height: 87px">
    <el-col class="header_logo" @click.native="home()">
      <img src="../../../static/img/logo_1.png" alt="享乐康科技" />
      <div class="header_title" style="float: left">享乐康医生后台管理系统</div>
    </el-col>
    <el-col class="header_user">
      <div class="exit" @click="logout"><i class="icon-exit"></i>退出登录</div>
      <div class="company" v-if="GET_USER_INFO"><i class="icon-company"></i>欢迎<span style="margin-right: 10px">{{GET_USER_INFO.orgName}} </span><span>{{GET_USER_INFO.doctorsName}}</span></div>
    </el-col>
  </el-header>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'Header',
  components: {},
  props: ['corporateName'],
  data () {
    return {
    }
  },
  computed: {
    userInfo () {
      return this.GET_USER_INFO
    },
    ...mapGetters({
      GET_USER_INFO: 'GET_USER_INFO'
    })
  },
  methods: {
    logout: function () {
      let _this = this
      this.$confirm('确认退出吗?', '提示', {})
        .then(() => {
          sessionStorage.removeItem('token')
          _this.$router.push('/login')
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
.header {
  height: 87px;
  color: #fff;
  padding: 0;
  background: rgba(0, 110, 54, 1);
  .header_logo {
    width: 440px;
    height: 100%;
    background: rgba(0, 110, 54, 1);
    padding: 15px 35px;
    cursor: pointer;
    img {
      width: 45px;
      float: left;
      margin-top: 12px;
      margin-right: 10px;
    }
    .header_title {
      float: left;
      font-size: 26px;
      line-height: 54px;
      font-family: SourceHanSansSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .header_user {
    height: 100%;
    float: right;
    max-width: 600px;
    padding: 30px 47px 30px 0;
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    .exit {
      display: flex;
      align-items: center;
      margin-right: 35px;
      cursor: pointer;
      .icon-exit {
        display: inline-block;
        width: 30px;
        height:30px;
        background: url("../../../static/img/exit.png") no-repeat;
        background-size: cover;
        margin-right: 5px;
      }
    }
    .company {
      display: flex;
      align-items: center;
      .icon-company {
        display: inline-block;
        width: 30px;
        height:30px;
        background: url("../../../static/img/company.png") no-repeat;
        background-size: cover;
        margin-right: 5px;
      }
    }
  }
}
</style>
