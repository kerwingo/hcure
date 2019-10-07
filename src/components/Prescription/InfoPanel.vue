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
                <li v-for="(item,index) in listOne" :key="'listOne'+index" @click="addItem('zd',item)">
                  {{item}}
                </li>
              </ul>
            </div>
            <div class="ideal" v-show="panelType ==='xy'">
                <table style="width: 100%">
                  <col width="30%">
                    <thead>
                      <tr>
                        <td>项目名称</td>
                        <td>剂型</td>
                        <td>规格</td>
                        <td>报销</td>
                      </tr>
                    </thead>
                  <tbody>
                      <tr v-for="(item,index) in listTwo" :key="'listTwo'+index" @click="addItem('xy',item)">
                        <td>{{item.name}}</td>
                        <td>{{item.jx}}</td>
                        <td>{{item.gg}}</td>
                        <td>{{item.bx}}</td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div class="ideal" v-show="panelType ==='yf'">
              <table style="width: 100%">
                <col width="30%">
                <thead>
                <tr>
                  <td>药方名称</td>
                  <td>主治</td>
                  <td>药材种类</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in listThree" :key="'listThree'+index" @click="addItem('yf',item.data)">
                  <td>{{item.name}}</td>
                  <td>{{item.zz}}</td>
                  <td>{{item.zl}}</td>
                </tr>
                </tbody>
              </table>
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
      listOne: [
        '感冒发烧1',
        '感冒发烧',
        '感冒发烧',
        '感冒发烧',
        '感冒发烧7'
      ],
      listTwo: [{
        name: '阿莫西林1',
        jx: '100g',
        gg: '100',
        bx: '可报销'
      },
      {
        name: '阿莫西林2',
        jx: '100g',
        gg: '100',
        bx: '不可报销'
      }
      ],
      listThree: [
        {name: '传统秘方',
          zz: '胃病',
          zl: '6种',
          data: [
            {c_name: '南天竹叶2',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶3',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶4',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶5',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶6',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶7',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'}
          ]
        },
        {name: '传统秘方2',
          zz: '胃病2',
          zl: '7种',
          data: [
            {c_name: '南天竹叶1',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶2',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶3',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶7',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'}
          ]},
        {name: '传统秘方2',
          zz: '胃病2',
          zl: '8种',
          data: [
            {c_name: '南天竹叶1',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶2',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶3',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶4',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶5',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'},
            {c_name: '南天竹叶8',
              c_sl: '5g',
              c_dj: '1',
              c_zje: '5'}
          ]}
      ],
      listFour: [],
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
        this.loading = false
        this.isResult = false
        this.inputValue = ''
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
        case 'yf':
          this.tit1 = '添加药方'
          this.tit2 = '中药汤剂'
          this.placeholder = '请输入药方名称'
      }
    },
    doSearch () {
      // use inputValue do somethings
      // this.loading = true
      this.isResult = true
      /* switch (this.panelType) {
        case 'zd':
          getDiagdescs().then(res => {
            this.listOne = res
            this.isResult = true
            this.loading = false
          })
      } */
    },
    getCurrentPage (val) {
      this.currentPage = val
      console.log('父组件获取到currentPage', this.currentPage)
    },
    addItem (type, data) {
      this.$emit('addItem', type, data)
    }
    /* addZd (type, data) {
      this.$emit('addZd', data)
    },
    addXy (data) {
      this.$emit('addXy', data)
    },
    addZy (data) {
      this.$emit('addZy', data)
    } */
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
        padding:0 0 30px 0;
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
        table{
          vertical-align: middle;
          font-size: 22px;
          tr {
            background: #fff;
            cursor: pointer;
            border-bottom: 1px solid #F6F6F6;
            &:hover {
              background: #F6F6F6;
            }
            td{
              line-height: 66px;
              vert-align: middle !important;
            }
          }
          thead tr {
            background: #F6F6F6;
            box-shadow:0px 0px 16px 0px rgba(212,212,212,0.53);
            &:hover {cursor: text}
            td {
              color: #737373;
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
