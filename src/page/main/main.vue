<template>
  <el-row class="container">
    <!--头部-->
    <Header :corporateName="corporateName"></Header>
    <!--中心内容-->
    <el-col :span="24" class="mainContent">
      <!-- 导航栏 -->
      <Sidebar></Sidebar>
      <!--内容显示-->
      <section class="content-container">
        <transition name="el-fade-in-linear" mode="out-in">
          <router-view></router-view>
        </transition>
      </section>
    </el-col>
  </el-row>
</template>
<script>
import axios from "../../axios/http";
import Sidebar from "../../components/Sidebar/Sidebar.vue";
import Header from "../../components/Header/Header.vue";
export default {
  name: "mian",
  components: {
    Sidebar: Sidebar,
    Header: Header
  },
  data() {
    return {
      corporateName: "",
      show: ""
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style  lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  flex: 0 0 270px;
  width: 270px;
}
.container {
  position: absolute;
  top: 0px;
  height: 100%;
  bottom: 0px;
  width: 100%;
  .sort {
    width: 28px;
    vertical-align: middle;
    margin-right: 45px;
  }
  .mainContent {
    display: flex;
    position: absolute;
    height: auto;
    min-height: 850px;
    top: 87px;
    bottom: 0px;
    overflow: hidden;
    aside {
      .el-menu-item,
      .el-submenu__title {
        font-size: 16px;
      }
      .el-menu-item.is-active {
        color: white;
        background: rgb(43, 49, 54) !important;
        border-left: #006e36 5px solid;
      }
    }
    .content-container {
      flex: 1;
      background: #f2f2f2;
      padding: 15px;
      overflow-y: scroll;
    }
  }
}
</style>
