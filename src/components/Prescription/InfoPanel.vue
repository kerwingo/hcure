<template>
  <div class="panel-wrap" v-show="panelShow">
      <div class="panel">
          <h3 class="title">{{tit1}} <span style="font-size: 22px;color: rgba(86,86,86,1);font-weight: normal;margin-left: 15px">{{tit2}}</span></h3>
          <span class="close" @click="displayPanel(false)"></span>
          <div class="search-wrap">
            <div class="input-wrap">
              <i class="icon-search el-icon-search"></i>
              <input type="text" :placeholder = "placeholder" autofocus  v-model="inputValue">
            </div>
            <div class="search-btn" @click="doSearch">查询</div>
          </div>
        <div class="result-wrap" v-loading="loading">
          <p class="r-tit">{{resultTips}}</p>
          <div v-show="isResult">
            <div class="ideal" v-show="panelType ==='zd'">
              <ul class="list">
                <li>
                  ****************情况
                </li>
                <li>
                  ****************情况
                </li>
                <li>
                  ****************情况
                </li>
                <li>
                  ****************情况
                </li>
              </ul>
            </div>
            <div class="ideal" v-show="panelType ==='xy'">
              xy
            </div>
            <div class="ideal" v-show="panelType ==='zy'">
              zy
            </div>
            <pagination :total="10" :currentPage="currentPage" @getCurrentPage="getCurrentPage"></pagination>
          </div>
          <div class="non-ideal" v-show="!isResult">
              <div>
                <img src="@/static/img/history.png" alt="">
              </div>
              <p class="warn">您对病症的描述不准确  请输入标准描述</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination2'
import {
  getDiagdescs
} from '@/axios/api'
export default {
  name: 'InfoPanel',
  props: {},
  components: {
    pagination: pagination
  },
  data () {
    return {
      panelType: '',
      panelShow: false,
      tit1: '临床诊断',
      tit2: '中药汤剂',
      placeholder: '请输入诊断描述',
      inputValue: '',
      resultTips: '搜索结果：',
      loading: false,
      isResult: false,
      currentPage: 1
    }
  },
  methods: {
    displayPanel (type, display) { // @type:string,弹窗类型; @display:true||false,控制弹窗的显示隐藏
      this.panelShow = display
      this.panelType = type
      if (display) {
        this.currentPage = 1 // 初始化当前页
        document.getElementById('innerDialog').style.overflowY = 'hidden'
      } else {
        document.getElementById('innerDialog').style.overflowY = 'scroll'
      }
      switch (type) {
        case 'zd':
          this.tit1 = '临床诊断'
          this.tit2 = ''
          this.placeholder = '请输入诊断描述'
          return
        case 'xy':
          this.tit1 = '查找项目'
          this.tit2 = ''
          this.placeholder = '请输入项目名称'
          return
        case 'zy':
          this.tit1 = '添加药方'
          this.tit2 = '中药汤剂'
          this.placeholder = '请输入药方名称'
      }
    },
    doSearch () {
      // use inputValue do somethings
      console.log('inputValue')
      getDiagdescs()
    },
    getCurrentPage (val) {
      this.currentPage = val
      console.log('父组件获取到currentPage', this.currentPage)
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
.panel-wrap {
  box-sizing: border-box;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  .panel {
    position: relative;
    width: 1000px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #F6F6F6;
    text-align: left;
    .title {
      font-size:32px;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:55px;
    }
    .search-wrap {
      display: flex;
      margin: 25px 0;
      font-size: 22px;
      justify-content: space-between;
      .input-wrap {
          width: calc(100% - 120px);
          font-size: 20px;
        position: relative;
        .icon-search {
          position: absolute;
          left: 15px;
          top: 15px;
        }
        input{
          width: 100%;
          height: 50px;
          padding:0 20px 0 55px;
          border: 0;
          box-shadow:0px 0px 16px 0px rgba(212,212,212,0.53);
          border-radius:3px;
        }
      }
      .search-btn {
        width:100px;
        height:50px;
        color: #fff;
        background:rgba(67,190,127,1);
        border-radius:3px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .result-wrap {
      .r-tit{
        color:rgba(170,170,170,1);
        font-size: 22px;
        margin-bottom: 30px;
      }
      .non-ideal{
        min-height: 200px;
        padding: 80px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .warn {
          margin-top: 60px;
          font-size:22px;
          color:rgba(86,86,86,1);
          line-height:30px;
        }
      }
      .ideal{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        .list{
          min-width: 70%;
          overflow: hidden;
          &:hover {
            li {border:0}
          }
          li {
            line-height: 80px;
            height: 80px;
            text-align: center;
            border-bottom: 1px solid rgba(220,220,220,0.5);
            cursor: pointer;
            box-sizing: border-box;
            &:hover {
              background: linear-gradient(to right, #F6F6F6 ,#fff, #F6F6F6); /* 标准的语法 */
              box-shadow:0px 0px 16px 0px rgba(212,212,212,0.53);
              border-bottom:0
            }
          }
        }
      }
    }
    .close {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      background-image: url("../../static/img/close_2.png");
      background-repeat: no-repeat;
      background-size: cover;
      position: absolute;
      top: 20px;
      right: 20px;
      transition: 0.3s;
      &:hover {
        transform:rotate(180deg);
        transition: 0.3s;
      }
    }
  }
}

</style>
<style>
  .el-loading-spinner .path{
    stroke: #43BE7F;
  }
</style>
