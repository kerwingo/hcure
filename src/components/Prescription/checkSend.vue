<template>
  <div >
      <div class="tit1">检查并发送</div>
      <div id="prescription">
        <div v-for="(item,index) in data.list" :key="'table'+index" v-show="item.list.length !==0">
          <div class="prescription" >
            <div class="main">
              <h3 class="p-tit">{{item.type | presType}}</h3>
              <p class="line"></p>
              <div class="case-info">
                <span>患者姓名：{{data.rxsBaseInfos.caption}}</span>
                <span>患者性别：{{data.rxsBaseInfos.sex===0?'男':'女'}}</span>
                <span>患者年龄：{{data.rxsBaseInfos.age}}</span>
                <span>开方日期：{{data.rxsBaseInfos.rxsdate}}</span>
              </div>
              <el-row class="text-item">
                <el-col :span="3.5"><div class="tit" >病史、症状及体征：</div></el-col>
                <el-col :span="18">
                  {{data.rxsBaseInfos.content}}
                </el-col>
              </el-row>
              <el-row class="text-item">
                <el-col :span="2.5"><div class="tit">临床诊断：</div></el-col>
                <el-col :span="18">
                  {{data.rxsBaseInfos.diagslist.join('、')}}
                </el-col>
              </el-row>
            </div>
            <div class="rp"><sup>R</sup><sub>P</sub></div>
            <table class="table" v-show="item.type !==1">
              <thead>
                <tr>
                  <td>项目名称</td>
                  <td>剂型</td>
                  <td>规格</td>
                  <td>关联</td>
                  <td>单次剂量</td>
                  <td>剂量单位</td>
                  <td>频次</td>
                  <td>用法</td>
                  <td>疗程</td>
                  <td>单价</td>
                  <td>数量</td>
                  <td>滴速</td>
                  <td>包装单位</td>
                  <td>总金额</td>
                  <td>报销</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(tr,index) in item.list" :key="'table'+index" style="background: #f6f6f6">
                    <td>{{tr.itemname}}</td>
                    <td>{{tr.formname}}</td>
                    <td>{{tr.spec}}</td>
                    <td>{{tr.link}}</td>
                    <td>{{tr.dose}}</td>
                    <td>{{tr.doseunitname}}</td>
                    <td>{{tr.genfreqname}}</td>
                    <td>{{tr.wayname}}</td>
                    <td>{{tr.course}}</td>
                    <td>{{tr.price}}</td>
                    <td>{{tr.amount}}</td>
                    <td>{{tr.dropspeedname}}</td>
                    <td>{{tr.itemunit}}</td>
                    <td>{{tr.total}}</td>
                    <td>{{tr.returned===0?"不可报销":"可报销"}}</td>
                </tr>
              </tbody>
            </table>
            <div class="tcm" v-show="item.type ===1">
              <table class="table tcmtable" v-for="(items,index) in  splitArr(item.list)" :key="'tcm'+index">
                <thead>
                <tr>
                  <td>药品名称</td>
                  <td>数量</td>
                  <td>单价</td>
                  <td>总金额</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(tr,index) in items.list" :key="'tcmtable'+index" style="background: #f6f6f6">
                  <td>{{tr.drugName}}</td>
                  <td>{{tr.num}}</td>
                  <td>{{tr.price}}</td>
                  <td>{{tr.totalMoney}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <el-row class="notice" style="text-align: left">
              <el-col :span="1"><div class="tit" >医嘱：</div></el-col>
              <el-col :span="23">
                {{data.rxsBaseInfos.advice}}
              </el-col>
            </el-row>
            <div class="check">
                <div>总价：<span>￥{{item.total}}</span></div>
                <div>自费：<span>￥{{item.selftotal}}</span></div>
                <div>可报销：<span>￥{{item.rebursetotal}}</span></div>
                <div>科室：{{data.rxsBaseInfos.sectionname}}</div>
                <div>医生：{{data.rxsBaseInfos.doctorname}}</div>
                <div>医生签名：<span>{{data.rxsBaseInfos.sign}}</span></div>
            </div>
          </div>
        </div>
        <!-- 打印图片区域-->
        <div id="printBox" class="print-box" v-show="true"></div>
      </div>
      <div class="operation">
          <span class="cancel" @click="reWrite">返回修改</span>
          <span style="background-color: gold;" class="print" @click="send('print')">打印并发送患者</span>
          <span class="print" @click="send('send')">发送患者</span>
      </div>
  </div>
</template>
<script>
import printJS from 'print-js'
import html2canvas from 'html2canvas'
import {
  alert,
  commitRxs
} from '@/axios/api'
export default {
  components: {
  },
  props: {
    cacheData: {
      type: Object,
      default: null
    }
  },
  filters: {
    presType: function (val) {
      switch (val) {
        case 0:
          return '西药处方'
        case 1:
          return '中药处方'
        case 2:
          return '检查处方'
        case 3:
          return '治疗处方'
      }
    }
  },
  data () {
    return {
      data: {
        amount: 1,
        cacherxsid: '4cf2bfa740324f4ea41330d60dc70fab',
        rxsBaseInfos: {
          advice: '阿道夫',
          age: 25,
          diagslist: ['190e012815a04fac90556c0a3469253d', '感冒'],
          caption: '测试患者',
          content: 'adf',
          doctorname: 'fuck',
          rxsdate: '2019年10月16日',
          sectionname: '未知',
          sex: '女',
          sign: ''
        },
        ListAll: [
          {
            type: '0',
            List: [
              {
                amount: 1,
                category: 2,
                course: 1,
                dose: '',
                doseunit: '',
                dropspeed: '',
                formName: '外用液体剂',
                genfreq: 0,
                id: '2f98d4a5267e433eb5c3c4a13187d536',
                itemunit: '毫升',
                link: '',
                price: 500,
                returned: 1,
                spec: '500毫升/1瓶',
                title: '测试检查项目',
                total: 500,
                way: '点滴'
              },
              {
                amount: 1,
                category: 2,
                course: 1,
                dose: '',
                doseunit: '',
                dropspeed: '',
                formName: '外用液体剂',
                genfreq: 0,
                id: '2f98d4a5267e433eb5c3c4a13187d536',
                itemunit: '毫升',
                link: '',
                price: 500,
                returned: 1,
                spec: '500毫升/1瓶',
                title: '测试检查项目',
                total: 500,
                way: '点滴'
              }
            ],
            rebursetotal: '0',
            selftotal: '0',
            total: '0'
          },
          {
            type: '1',
            List: [
              {
                amount: 1,
                category: 2,
                course: 1,
                dose: '',
                doseunit: '',
                dropspeed: '',
                formName: '外用液体剂',
                genfreq: 0,
                id: '2f98d4a5267e433eb5c3c4a13187d536',
                itemunit: '毫升',
                link: '',
                price: 500,
                returned: 1,
                spec: '500毫升/1瓶',
                title: '测试检查项目',
                total: 500,
                way: '点滴'
              },
              {
                amount: 1,
                category: 2,
                course: 1,
                dose: '',
                doseunit: '',
                dropspeed: '',
                formName: '外用液体剂',
                genfreq: 0,
                id: '2f98d4a5267e433eb5c3c4a13187d536',
                itemunit: '毫升',
                link: '',
                price: 500,
                returned: 1,
                spec: '500毫升/1瓶',
                title: '测试检查项目',
                total: 500,
                way: '点滴'
              }
            ],
            rebursetotal: '0',
            selftotal: '0',
            total: '0'
          }
        ]
      }
    }
  },
  watch: {
    cacheData: function (val) {
      this.data = val
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog')
    },
    openInnerDialog () {
      this.innerDialogVisible = true
    },
    closeInnerDialog () {
      this.innerDialogVisible = false
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },

    splitArr (arr) {
      let temp = [[], [], []]
      for (let i = 0; i < arr.length; i++) {
        if ((i % 3) === 3 || (i % 3) === 0) {
          temp[0].push(arr[i])
        } else if ((i % 3) === 2) {
          temp[2].push(arr[i])
        } else if ((i % 3) === 1) {
          temp[1].push(arr[i])
        }
      }
      return temp
    },
    printHtmlCustomStyle () {
      // 直接写样式
      const style = '#prescription{\n' +
        '  background: #f2f2f2\n' +
        '}\n' +
        '.tit1 {\n' +
        '  width: 100%;\n' +
        '  height: 100px;\n' +
        '  font-size:22px;\n' +
        '  line-height: 100px;\n' +
        '  font-weight: 700;\n' +
        '}\n' +
        '.prescription {\n' +
        '  padding: 30px 30px;\n' +
        '  box-sizing: border-box;\n' +
        '  background: rgba(255, 255, 255, 1);\n' +
        '  box-shadow: 0px 0px 13px 0px rgba(223, 230, 234, 0.57);\n' +
        '  margin-bottom: 30px;\n' +
        'text-align:center' +
        '}\n' +
        '\n' +
        '.prescription .p-tit {\n' +
        '  font-size: 20px;\n' +
        '  font-weight: bold;\n' +
        'text-align:center' +
        '}\n' +
        '.prescription .line {\n' +
        '  width: 100%;\n' +
        '  margin: 30px auto 10px;\n' +
        '  border-bottom: 2px dashed #333333;\n' +
        '}\n' +
        '.prescription .case-info {\n' +
        '  font-size: 18px;\n' +
        '}\n' +
        '.prescription > .main {\n' +
        '  width: 80%;\n' +
        '  margin: 0 auto;\n' +
        '}\n' +
        '.prescription .case-info {\n' +
        '  display: flex;\n' +
        '  justify-content: space-between;\n' +
        '  padding: 20px 0px;\n' +
        '  font-size: 16px;\n' +
        '}\n' +
        '.prescription .text-item {\n' +
        '  display: flex;\n' +
        '  justify-content: start;\n' +
        '  text-align: left;\n' +
        '  margin: 20px 0 0 0;\n' +
        '  line-height: 30px;\n' +
        '}\n' +
        '.prescription .text-item .tit {\n' +
        '  font-size: 16px;\n' +
        '  line-height: 30px;\n' +
        '  margin-right: 10px;\n' +
        '}\n' +
        '.prescription .rp {\n' +
        '  text-align: left;\n' +
        '  margin: 20px 0;\n' +
        '  font-family:NSimSun;\n' +
        '  font-weight:bold;\n' +
        '  color:rgba(51,51,51,1);\n' +
        '  line-height:58px;\n' +
        '  font-size: 24px ;\n' +
        '}\n' +
        '.prescription .table{\n' +
        '  width: 100%;\n' +
        'border-collapse: collapse;\n' +
        '    border-spacing: 0;' +
        '  box-shadow:0px -1px 9px 0px rgba(234,234,234,1);\n' +
        '  border-radius:3px 3px 0px 0px;\n' +
        '  line-height: 20px;\n' +
        '}\n' +
        '.prescription .table thead {\n' +
        '  background:rgba(231,231,231,1);\n' +
        '  color: #737373;\n' +
        '}\n' +
        '.prescription .table thead td {\n' +
        '  background:rgba(231,231,231,1);\n' +
        '  color: #737373;\n' +
        '}\n' +
        '.prescription .table tbody {\n' +
        '  background:rgba(246,246,246,1);\n' +
        '  color: #333333;\n' +
        '}\n' +
        '.prescription .table tbody tr {\n' +
        '  border-bottom: 1px solid #fff;\n' +
        '  font-size: 14px;\n' +
        '  background:rgba(246,246,246,1);\n' +
        '}\n' +
        '.prescription .table tbody td {\n' +
        '  background:rgba(246,246,246,1);\n' +
        '  color: #333333;\n' +
        '}\n' +
        '.prescription .table  td {\n' +
        '  padding: 15px 0;\n' +
        '  font-size: 14px;\n' +
        '}' +
        '.prescription .notice {\n' +
        '  display: flex;\n' +
        '  justify-content: start;\n' +
        '  padding: 30px 0 10px 0;\n' +
        '}\n' +
        '.check {\n' +
        '  margin: 20px 0;\n' +
        '  display: flex;\n' +
        '  justify-content: space-between;\n' +
        '}\n' +
        '.check span {\n' +
        '  color: #F31E1E;\n' +
        '}'
      printJS({
        printable: 'prescription', // 要打印内容的id
        type: 'html',
        style: style,
        scanStyles: false
      })
    },
    reWrite () {
      this.$emit('reWrite')
    },
    send (type) {
      if (type === 'print') {
        /* html2canvas(document.querySelector('#prescription')).then(function (canvas) {
          document.querySelector('#printBox').appendChild(canvas)
        }).then(
          () => {
            this.$nextTick(function () {
              this.printHtmlCustomStyle()
            })
          }
        ) */
        commitRxs({'id': this.data.cacherxsid}).then(res => {
          if (res.data.code === 200) {
            alert('发送成功')
          }
        })
        this.printHtmlCustomStyle()
      } else {
        commitRxs({'id': this.data.cacherxsid}).then(res => {
          if (res.data.code === 200) {
            alert('发送成功')
          }
        })
      }
    }
  }

}
</script>
<style scoped lang="less">
#prescription{
  background: #f2f2f2
}
.tit1 {
  width: 100%;
  height: 100px;
  font-size:22px;
  line-height: 100px;
  font-weight: 700;
}
.prescription {
  padding: 30px 30px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 13px 0px rgba(223, 230, 234, 0.57);
  margin-bottom: 30px;
}

.prescription .p-tit {
  font-size: 20px;
  font-weight: bold;
}
.prescription .line {
  width: 100%;
  margin: 30px auto 10px;
  border-bottom: 2px dashed #333333;
}
.prescription .case-info {
  font-size: 18px;
}
.prescription > .main {
  width: 70%;
  min-width: 1000px;
  margin: 0 auto;
}
.prescription .case-info {
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
  font-size: 16px;
}
.prescription .text-item {
  text-align: left;
  margin: 20px 0 0 0;
  line-height: 30px;
  display: flex;
  justify-content: start;
}
.prescription .text-item .tit {
  font-size: 16px;
  line-height: 30px;
  margin-right: 10px;
}
.prescription .rp {
  text-align: left;
  margin: 20px 0;
  font-family:NSimSun;
  font-weight:bold;
  color:rgba(51,51,51,1);
  line-height:58px;
  font-size: 24px ;
}
.prescription .table{
  width: 100%;
  box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
  border-radius:3px 3px 0px 0px;
  line-height: 20px;
}
.prescription .table thead {
  background:rgba(231,231,231,1);
  color: #737373;
}
.prescription .table thead td {
  background:rgba(231,231,231,1);
  color: #737373;
}
.prescription .table tbody {
  background:rgba(246,246,246,1);
  color: #333333;
}
.prescription .table tbody tr {
  border-bottom: 1px solid #fff;
  font-size: 14px;
  background:rgba(246,246,246,1);
}
.prescription .table tbody td {
  background:rgba(246,246,246,1);
  color: #333333;
}
.prescription .table  td {
  padding: 15px 0;
  font-size: 14px;
}
.prescription .table.tcmtable  {
  width: calc((100% - 30px)/3);
  margin: 0 5px;
}

.prescription .notice {
  padding: 30px 0 10px 0;
}
.check {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.check span {
  color: #F31E1E;
}
.operation {
  padding: 35px 0 40px 0;
  span {
    display: inline-block;
    height:40px;
    line-height: 40px;
    text-align: center;
    border-radius:3px;
    padding: 0 20px;
    cursor: pointer;
    margin: 0 15px;
    font-size: 14px;
    &.cancel{
      color: #565656;
      background:rgba(229,229,229,1);
    }
    &.print{
      color: #fff;
      background:rgba(67,190,127,1);
    }
  }
}
.print-box {
  opacity: 1;
  position: fixed;
  left: -10000px;
  z-index: -10;
}
</style>
