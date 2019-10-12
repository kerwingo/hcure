<template>
  <el-row :span="24">
    <div class="visit-top">
      <div class="doctor">
          <div class="avator"><img src="../../../static/img/doctor.png" alt=""></div>
          <div class="info">
              <p v-if="userInfo">{{GET_USER_INFO.doctorsName}}医师</p>
              <p class="data" v-if="rate"><span>解答:{{rate.number}}</span><span>好评:{{rate.feedbackRate}}</span></p>
          </div>
      </div>
      <div class="search">
          <p class="tit">我的患者</p>
          <el-input suffix-icon="el-icon-search" placeholder="输入患者姓名" v-model="searchName" @keyup.enter.native="inquire"></el-input>
          <el-button @click.native.prevent="inquire">查询</el-button>
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
        <tr v-for="(item, index) in list" :key="index" v-loading="loading" element-loading-text="想健康 享乐康 更健康" :class="{'online':item.enquiry===0}">
          <td><i class="el-icon-time" v-if="item.enquiry===0" style="position: relative;left: -20px"></i>{{item.buildtime | dateFormatter }}</td>
          <td>{{item.caption}}</td>
          <td>{{item.sex===0?'男':'女'}}</td>
          <td>{{item.age}}</td>
          <td>{{item.enquiry | enquiry(item.enquiry)}}</td>
          <td>{{item.closed | isClosed}}</td>
          <td>
            <el-button title="查看" type="success" size="mini" plain  icon="" @click="openChat(item)">查看</el-button>
          </td>
        </tr>
      </table>
      <div v-show="!list.length" class="empty-block" style="background:rgba(255,255,255,0.9);color: #565656">
        <span>暂无数据</span>
      </div>
      <pages :total='totals'
             v-show="list.length"
             :pagesize="pageSize"
             @handleSizeChange="handleSizeChange"
             @handleCurrentChange="handleCurrentChange"></pages>
    <div class="dialog-wrap" v-show="dialogVisible">
      <div class="dialog" >
        <chatbox @closeDialog = "closeDialog" :sicker="sicker"></chatbox>
      </div>
    </div>
  </el-row>
</template>

<script>

import pages from '@/components/pagination/pagination'
import chatbox from '@/components/ChatBox/ChatBox'
import {
  rate,
  inquires,
  inquiresOpen,
  inquiresClose
} from '@/axios/api'
import {mapGetters, mapActions} from 'vuex'
import moment from 'moment'
export default {
  name: 'chineseMedicine',
  components: {
    pages,
    chatbox
  },
  computed: {
    userInfo () {
      return this.GET_USER_INFO
    },
    ...mapGetters({
      GET_USER_INFO: 'GET_USER_INFO'
    })
  },
  data () {
    return {
      rate: {},
      searchName: '',
      loading: false,
      isActive: 1,
      pageSize: 20,
      totals: 0,
      offset: '0',
      list: [],
      from: {
        limit: 1
      },
      dialogVisible: false,
      sicker: null
    }
  },
  filters: {
    enquiry: function (val) {
      switch (val) {
        case 0:
          return '等待问询'
        case 1:
          return '正在问询'
        case 2:
          return '完成处方签'
        case 3:
          return '问询结束'
      }
    },
    isClosed: function (val) {
      switch (val) {
        case 0:
          return '未结束'
        case 1:
          return '已结束'
        case 2:
          return '忽略'
      }
    },
    dateFormatter: function (val) {
      let t = new Date(parseInt(val)).getTime()
      return moment(t).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    ...mapActions(['SET_SICKER', 'SET_INQUIREID']),
    getRate () {
      rate().then(res => {
        this.rate = res.data.data
      })
    },
    inquire () {
      this.loading = true
      let data = {
        'offset': this.offset,
        'limit': this.pageSize,
        'patientName': this.searchName
      }
      inquires(data).then(res => {
        console.log(res.data.data.list)
        this.list = res.data.data.list
        this.totals = Number(res.data.data.total)
        this.loading = false
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.inquire()
    },
    handleCurrentChange (val) {
      console.log(val)
      if (val === 1) {
        this.offset = 0
      } else {
        this.offset = (val - 1) * this.pageSize
      }
      this.inquire()
    },
    openChat (sicker) { // 打开问询界面开启问询
      this.dialogVisible = true
      this.sicker = sicker
      this['SET_SICKER'](sicker) // 保存到store
      if (sicker.closed === 0) {
        inquiresOpen({'id': sicker.gid}).then(res => {})
      }
    },
    closeDialog (val) {
      if (val !== 'collapse') {
        if (this.sicker.closed === 0) {
          inquiresClose({'id': this.gid}).then(res => {})
        }
      }
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
    this.getRate()
    this.inquire()
  }
}
</script>
<style scoped lang="less">
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
      &.online {
        color: #E71A1A;
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
