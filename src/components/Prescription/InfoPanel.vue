<template>
  <div class="panel-wrap" v-show="panelShow">
      <div class="panel">
          <h3 class="title">{{tit1}} <span style="font-size: 16px;color: rgba(86,86,86,1);font-weight: normal;margin-left: 15px">{{tit2}}</span></h3>
          <span class="close" @click="displayPanel(false)"></span>
          <div class="search-wrap">
            <div class="input-wrap">
              <i class="icon-search el-icon-search"></i>
              <input type="text" :placeholder = "placeholder" autofocus  v-model="keyword" @keyup.enter="doSearch(true)">
            </div>
            <el-button class="search-btn" @click.native.prevent="doSearch(true)">查询</el-button>
          </div>
        <div class="result-wrap" v-loading="loading">
          <p class="r-tit">{{resultTips}}</p>
          <div v-show="isResult">
            <div class="ideal" v-show="panelType ==='zd'">
              <ul class="list">
                <li v-for="(item,index) in listOne" :key="'listOne'+index" @click="addItem('zd',item)">
                  {{item.description}}
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
                        <td>{{item.title}}</td>
                        <td>{{item.formName}}</td>
                        <td>{{item.spec}}</td>
                        <td>{{item.returned ===0?"不可报销":"可报销"}}</td>
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
                <tr v-for="(item,index) in listThree" :key="'listThree'+index" @click="addItem('yf',item)">
                  <td>{{item.scriptName}}</td>
                  <td>{{item.indications}}</td>
                  <td>{{item.goodsCount}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="ideal" v-show="panelType ==='zy'">
              <ul class="list">
                <li v-for="(item,index) in listFour" :key="'listFour'+index" @click="addItem('zy',item)">
                  {{item.drugName}}
                </li>
              </ul>
            </div>
            <pagination :pages="pages" :currentPage="currentPage" @getCurrentPage="getCurrentPage"></pagination>
          </div>
          <div class="non-ideal" v-show="noResult">
              <div>
                <img src="@/static/img/history.png" alt="">
              </div>
              <p class="warn">{{emptyTips}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination2'
import {
  getDiagdescs,
  itemsPage,
  scriptsPage,
  drugsPage
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
      keyword: '',
      resultTips: '搜索结果：',
      listOne: [],
      listTwo: [],
      listThree: [],
      listFour: [],
      loading: false,
      isResult: false,
      noResult: true,
      pages: 0,
      pageSize: 1,
      offset: 0,
      emptyTips: '您对病症的描述不准确  请输入标准描述',
      currentPage: 1
    }
  },
  methods: {
    displayPanel (type, display) { // @type:string,弹窗类型; @display:true||false,控制弹窗的显示隐藏
      this.panelShow = display
      this.panelType = type
      this.keyword = ''
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
          this.emptyTips = '暂无相关病症的标签'
          return
        case 'xy':
          this.tit1 = '查找项目'
          this.tit2 = ''
          this.placeholder = '请输入项目名称'
          this.emptyTips = '暂无此项目 请更换其他项目'
          return
        case 'yf':
          this.tit1 = '添加药方'
          this.tit2 = '中药汤剂'
          this.placeholder = '请输入药方名称'
          this.emptyTips = '暂无此药方  请更换其他药方'
          return
        case 'zy':
          this.tit1 = '添加药品'
          this.tit2 = '中药汤剂'
          this.placeholder = '请输入药方名称'
          this.emptyTips = '暂无此药品'
      }
    },
    doSearch (reset) {
      if (reset) {
        this.offset = 0
        this.currentPage = 1
      }
      this.loading = true
      this.isResult = false
      this.noResult = false
      let data = {
        'offset': this.offset,
        'limit': this.pageSize,
        'keyword': this.keyword
      }
      setTimeout(() => {
        switch (this.panelType) {
          case 'zd':
            getDiagdescs(data).then(res => {
              if (Number(res.data.data.total) === 0 || res.data.data.list === null || res.data.data.list.length === 0) {
                this.isResult = false
                this.noResult = true
              } else {
                this.listOne = res.data.data.list
                this.pages = Number(res.data.data.pages)
                this.isResult = true
              }
              this.loading = false
            }).catch(
              this.loading = false
            )
            return
          case 'xy':
            itemsPage(data).then(res => {
              if (Number(res.data.data.total) === 0 || res.data.data.list === null || res.data.data.list.length === 0) {
                this.isResult = false
                this.noResult = true
              } else {
                this.listTwo = res.data.data.list
                this.pages = Number(res.data.data.pages)
                this.isResult = true
              }
              this.loading = false
            }).catch(
              this.loading = false
            )
            return
          case 'yf':
            scriptsPage(data).then(res => {
              if (Number(res.data.data.total) === 0 || res.data.data.list === null || res.data.data.list.length === 0) {
                this.isResult = false
                this.noResult = true
              } else {
                this.listThree = res.data.data.list
                this.pages = Number(res.data.data.pages)
                this.isResult = true
              }
              this.loading = false
            }).catch(
              this.loading = false
            )
            return
          case 'zy':
            drugsPage(data).then(res => {
              if (Number(res.data.data.total) === 0 || res.data.data.list === null || res.data.data.list.length === 0) {
                this.isResult = false
                this.noResult = true
              } else {
                this.listFour = res.data.data.list
                this.pages = Number(res.data.data.pages)
                this.isResult = true
              }
              this.loading = false
            }).catch(
              this.loading = false
            )
        }
      }, 500)
    },
    getCurrentPage (val) {
      this.currentPage = val
      console.log('父组件获取到currentPage', this.currentPage)
      console.log(val)
      if (val === 1) {
        this.offset = 0
      } else {
        this.offset = (val - 1) * this.pageSize
      }
      this.doSearch()
    },
    addItem (type, data) {
      this.$emit('addItem', type, data)
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
    width: 66%;
    min-width: 300px;
    max-width: 1000px;
    min-height: 400px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #F6F6F6;
    text-align: left;
    .title {
      font-size:22px;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:55px;
    }
    .search-wrap {
      display: flex;
      margin: 25px 0;
      font-size: 16px;
      justify-content: space-between;
      .input-wrap {
          width: calc(100% - 120px);
        position: relative;
        .icon-search {
          position: absolute;
          left: 15px;
          top: 12px;
        }
        input{
          width: 100%;
          height: 40px;
          padding:0 20px 0 50px;
          border: 0;
          box-shadow:0px 0px 16px 0px rgba(212,212,212,0.53);
          border-radius:3px;
          font-size: 16px;
        }
      }
      .search-btn {
        width:100px;
        height:40px;
        color: #fff;
        background:rgba(67,190,127,1);
        border-radius:3px;
        text-align: center;
        cursor: pointer;
      }
    }
    .result-wrap {
      min-height: 300px;
      .r-tit{
        color:rgba(170,170,170,1);
        font-size: 16px;
        margin-bottom: 30px;
      }
      .non-ideal{
        min-height: 300px;
        padding: 80px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-sizing: border-box;
        .warn {
          margin-top: 60px;
          font-size:16px;
          color:rgba(86,86,86,1);
          line-height:30px;
        }
      }
      .ideal{
        display: flex;
        justify-content: center;
        align-items: start;
        padding:0 0 30px 0;
        min-height: 300px;
        box-sizing: border-box;
        .list{
          min-width: 70%;
          overflow: hidden;
          &:hover {
            li {border:0}
          }
          li {
            line-height: 50px;
            height: 50px;
            text-align: center;
            border-bottom: 1px solid rgba(220,220,220,0.5);
            cursor: pointer;
            box-sizing: border-box;
            font-size: 16px;
            &:hover {
              background: linear-gradient(to right, #F6F6F6 ,#fff, #F6F6F6); /* 标准的语法 */
              box-shadow:0px 0px 16px 0px rgba(212,212,212,0.53);
              border-bottom:0
            }
          }
        }
        table{
          vertical-align: middle;
          font-size: 16px;
          tr {
            background: #fff;
            cursor: pointer;
            border-bottom: 1px solid #F6F6F6;
            &:hover {
              background: #F6F6F6;
            }
            td{
              line-height: 40px;
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
      width: 30px;
      height: 30px;
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
