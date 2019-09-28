<template>
  <aside style="background: #363d43">
    <el-menu
      :collapse="isCollapse"
      default-active="1"
      class="el-menu-vertical-demo"
      text-color="#fff"
      background-color="#363d43"
      :unique-opened="true"
      router
      :default-openeds="openeds"
      style="border-right: 1px #363d43 solid"
    >
      <template v-for="(menu_one,i) in menuData">
        <el-submenu v-if="menu_one.subs.length>0" :key="i" :index="menu_one.path">
          <template slot="title">
            <i :class="menu_one.icon"></i>
            <span>{{menu_one.title}}</span>
          </template>
          <el-menu-item
            v-for="(menu_two,i) in menu_one.subs"
            :key="i"
            :index="menu_two.path"
          >
            <i :class="menu_two.icon"></i>
            <span>{{menu_two.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <el-tooltip :content="isCollapse?'展开':'收起'" placement="bottom-start">
      <el-switch
        v-model="isCollapse"
        active-color="#67C23A"
        inactive-color="#ff4949"
        style="margin-top: 20px"
      ></el-switch>
    </el-tooltip>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},
  data() {
    return {
      openeds: ["2"],
      isCollapse: false,
      menuData: [
        {
          icon: "el-icon-office-building",
          path: "p_UserInfo",
          title: "账户信息",
          subs: [
            {
              page: true,
              path: "info",
              title: "账户信息",
            }
          ]
        },
        {
          icon: "el-icon-tickets",
          path: "p_OnlineVisity",
          title: "在线问诊",
          subs: [
            {
              page: true,
              path: "visitis",
              title: "在线问诊",
            }
          ]
        },
        {
          icon: "el-icon-tickets",
          path: "p_Earnings",
          title: "线上收益",
          subs: [
            {
              page: true,
              path: "earnings",
              title: "线上收益",
            }
          ]
        }
      ]
    };
  },
  methods: {
  }
};
</script>

<style scoped lang="less">
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
</style>
