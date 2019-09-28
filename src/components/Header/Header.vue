<template>
  <el-header :span="24" class="header" style="height: 87px">
    <el-col class="header_logo" @click.native="home()">
      <img src="../../../static/img/logo_1.png" alt="享乐康科技" />
      <div class="header_title" style="float: left">享乐康医生后台管理系统</div>
    </el-col>
    <el-col class="header_user">
      <div @click="logout">退出</div>
      <div></div>
      <div>{{corporateName}}</div>
      <div></div>
    </el-col>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: ["corporateName"],
  data() {
    return {
    };
  },
  methods: {
    logout: function() {
      let _this = this;
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {
          sessionStorage.removeItem("token");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  }
};
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
    div {
      float: right;
      height: 100%;
      color: white;
      text-align: center;
      cursor: pointer;
      font-size: 17px;
    }
    div:nth-child(4) {
      width: 24px;
      background: url("../../../static/img/company.png") no-repeat;
      background-size: cover;
    }
    div:nth-child(3) {
      padding-left: 5px;
      letter-spacing: 1px;
      /* width: 350px;*/
      text-align: left;
      color: #ffffff;
      line-height: 28px;
    }
    div:nth-child(2) {
      margin-left: 50px;
      width: 24px;
      background: url("../../../static/img/me_1.png") no-repeat;
      background-size: cover;
    }
    div:nth-child(1) {
      padding-left: 5px;
      line-height: 28px;
    }
    div:nth-child(5) {
      margin-left: 40px;
      width: 24px;
      background: url("../../../static/img/exit.png") no-repeat;
      background-size: cover;
    }
    div:nth-child(6) {
      padding-left: 10px;
      line-height: 28px;
    }
  }
}
</style>
