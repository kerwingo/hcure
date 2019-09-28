<template>
  <el-row :span="24">
    <div class="visit-top">
      <div class="doctor">
          <div class="avator"><img src="../../../static/img/doctor.png" alt=""></div>
          <div class="info">
              <p>张德荣医师</p>
              <p class="data"><span>解答:56</span><span>好评:100%</span></p>
          </div>
      </div>
      <div class="search">
          <p class="tit">我的患者</p>
          <el-input suffix-icon="el-icon-search" placeholder="输入患者姓名" v-model="searchName"></el-input>
          <el-button>查询</el-button>
      </div>
    </div>
      <table class="brandList">
        <tr class="thead">
          <th>问诊时间</th>
          <th>患者姓名</th>
          <th>患者性别</th>
          <th>患者年龄</th>
          <th>最近问询</th>
          <th>结束情况</th>
          <th>处方笺</th>
        </tr>
        <tr v-for="(medical, index) in 10" :key="index" v-loading="loading" element-loading-text="想健康 享乐康 更健康">
          <td>459</td>
          <td>诸葛</td>
          <td>男</td>
          <td>30</td>
          <td>正在询问</td>
          <td>否</td>
          <td width="300">
            <el-button title="添加药品" type="success" size="mini" plain  icon="" @click="openChat('否')">查看</el-button>
          </td>
        </tr>
      </table>
      <div v-if="!medicalList" class="empty-block">
        <span>暂无数据</span>
      </div>
      <pages :total='totals'
             :page-size="pageSize"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange"></pages>
    <div class="dialog-wrap" v-show="dialogVisible">
      <div class="dialog" >
        <chatbox @closeDialog = "closeDialog"></chatbox>
      </div>
    </div>
  </el-row>
</template>

<script>
// 分页
import pages from '@/components/pagination/pagination'
import chatbox from '@/components/ChatBox/ChatBox'
export default {
  name: 'chineseMedicine',
  components: {
    pages,
    chatbox
  },
  data () {
    return {
      searchName: '',
      loading: false,
      isActive: 1,
      pageSize: 10,
      totals: 6,
      from: {
        limit: 1
      },
      medicalList: [],
      dialogVisible: false
    }
  },
  methods: {
    inquire () { // 新增

    },
    list () {},
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
      /*  if (val === 1) {
                                          this.form.offset = 0
                                        } else {
                                          this.form.offset = (val * this.form.limit) - this.form.limit
                                        } */
    },
    openChat (state) {
      if (state && state == '否') {
        this.dialogVisible = true
      }
    },
    closeDialog () {
      this.dialogVisible = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  mounted () {
    this.list()
  }
}
</script>
<style scoped lang="less">
  @import "../../common/less/public";
  .visit-top {
    display: flex;
    justify-content:space-between;
    padding: 30px 0;
    .doctor{
      display: flex;
      justify-content: center;
      .avator{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #DCDCDC;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        img {height: 70%}
      }
      .info{
        display: flex;
        flex-direction: column;
        justify-content:center;
        align-items: start;
        text-align: left;
        &>* {
          text-align: left;
          margin: 5px 0;
          width: 100%;
        }
        .data span{
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      .tit {color:rgba(51,51,51,1);min-width: 100px}
      .el-input__inner {
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 16px 0px rgba(212,212,212,0.53);
        border-radius:3px;
        border: 0;
      }
      .el-button{
        margin-left: 20px;
      }
    }
  }
  .brandList {
    border-spacing: 0;
    box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
    border-radius:3px 3px 0px 0px;
    border: 0;
    .thead{
      background-color:#F6F6F6 !important;
      th{
        font-weight: normal;
        color: #737373;
      }
    }
    tr {background: #fff !important;
      &:hover {
        background-color:#F6F6F6 !important;
      }
      td {
        border-bottom: 1px solid #F2F2F2;
      }
    }
  }
  .dialog-wrap {
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .dialog{
        background: #fff;
      overflow: hidden;
    }
  }
</style>
