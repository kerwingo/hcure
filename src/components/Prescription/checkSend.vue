<template>
  <div >
      <div class="tit1">检查并发送</div>
      <div id="prescription">
        <div v-for="(table,index) in tableList" :key="'table'+index">
          <div class="prescription" >
            <div class="main">
              <h3 class="p-tit">{{prscTit}}</h3>
              <p class="line"></p>
              <div class="case-info">
                <span>患者姓名：{{sicker.caption}}</span>
                <span>患者性别：{{sicker.sex===0?'男':'女'}}</span>
                <span>患者年龄：{{sicker.age}}</span>
                <span>开方日期：{{prsDate}}</span>
              </div>
              <el-row class="text-item">
                <el-col :span="6"><div class="tit" ><span style="display: inline-block;color: red;font-weight: bold;font-size: 20px;position: relative;top: 5px;margin-right: 3px;">*</span> 病史、症状及体征：</div></el-col>
                <el-col :span="18">
                  {{symptoms}}
                </el-col>
              </el-row>
              <el-row class="text-item">
                <el-col :span="6"><div class="tit"><span style="display: inline-block;color: red;font-weight: bold;font-size: 20px;position: relative;top: 5px;margin-right: 3px;">*</span>临床诊断：</div></el-col>
                <el-col :span="18">
                  <span v-for="(tag,index) in dynamicTags" :key="'dynamicTags'+index">
                    {{tag.description}}<i v-show="index!==dynamicTags.length">、</i>
                  </span>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-table
            border
            :data="table"
            style="width: 100%">
            <el-table-column
              label="项目名称"
              width="">
              <template slot-scope="scope">
                {{ scope.row.title }}
              </template>
            </el-table-column>
            <el-table-column
              label="剂型"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.formName }}
              </template>
            </el-table-column>
            <el-table-column
              label="规格"
              width="">
              <template slot-scope="scope">
                {{ scope.row.spec }}
              </template>
            </el-table-column>
            <el-table-column
              label="关联"
              width="60">
              <template slot-scope="scope">
                <el-input v-model="scope.row.link"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="单次剂量"
              width="60">
              <template slot-scope="scope">
                <el-input v-model="scope.row.dose"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="剂量单位"
              width="110">
              <template slot-scope="scope">
                {{scope.row.doseunit}}
              </template>
            </el-table-column>
            <el-table-column
              label="频次"
              width="110">
              <template slot-scope="scope">
                {{scope.row.genfreq}}
              </template>
            </el-table-column>
            <el-table-column
              label="用法"
              width="110">
              <template slot-scope="scope">
                {{scope.row.way}}
              </template>
            </el-table-column>
            <el-table-column
              label="疗程"
              width="50">
              <template slot-scope="scope">
                {{scope.row.course}}
              </template>
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.price}}
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              width="115">
              <template slot-scope="scope">
                {{scope.row.amount}}
              </template>
            </el-table-column>
            <el-table-column
              label="滴速"
              width="120">
              <template slot-scope="scope">
                {{scope.row.dropspeed}}
              </template>
            </el-table-column>
            <el-table-column
              label="包装单位"
              width="90">
              <template slot-scope="scope">
                {{ scope.row.itemunit}}
              </template>
            </el-table-column>
            <el-table-column
              label="总金额"
              width="80">
              <template slot-scope="scope">
                {{ scope.row.total}}
              </template>
            </el-table-column>
            <el-table-column
              label="报销"
              width="70">
              <template slot-scope="scope">
                {{ scope.row.returned===0?"不可报销":"可报销"}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 打印图片区域-->
        <div id="printBox" class="print-box" v-show="true"></div>
      </div>
      <div class="operation">
          <span class="cancel" @click="cancel">返回修改</span>
          <span style="background-color: gold;" class="print" @click="send('print')">打印并发送患者</span>
          <span class="print" @click="send">发送患者</span>
      </div>
  </div>
</template>
<script>
import pagination from '@/components/pagination/pagination'
import InfoPanel from '@/components/Prescription/InfoPanel'
import printJS from 'print-js'
import html2canvas from 'html2canvas'
export default {
  components: {
    pagination: pagination,
    InfoPanel: InfoPanel
  },
  props: {
    closable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableList: []
    }
  },
  mounted () {

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
    toggleTabs: function (index) {
      this.nowIndex = index
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    openPanel (type, display) {
      this.$refs.InfoPanel.displayPanel(type, display)
    },
    printHtmlCustomStyle () {
      // 直接写样式
      const style = '' +
        '@page { margin: 0 } ' +
        '@media print {' +
        '#prescription{text-align:center} ' +
        '.prescription .p-tit {\n' +
        '    font-size: 32px;\n' +
        '    font-weight: bold;\n' +
        '} ' +
        '.prescription .line {\n' +
        '    width: 100%;\n' +
        '    margin: 40px auto 20px;\n' +
        '    border-bottom: 2px dashed #333333;\n' +
        '}' +
        '.prescription > .main .case-info{\n' +
        '    display: -webkit-box;\n' +
        '    display: -ms-flexbox;\n' +
        '    display: flex;\n' +
        '    -webkit-box-pack: justify;\n' +
        '    -ms-flex-pack: justify;\n' +
        '    justify-content: space-between;\n' +
        '    padding: 30px 0px;\n' +
        '}' +
        '.prescription > .main .text-item {\n' +
        '    margin: 30px 0 0 0;\n' +
        '}' +
        '.el-col-5 {\n' +
        '    width: 20.83333%;\n' +
        '}' +
        '.el-col-18 {\n' +
        '    width: 75%;\n' +
        '}' +
        '[class*=el-col-] {\n' +
        '    float: left;\n' +
        '    -webkit-box-sizing: border-box;\n' +
        '    box-sizing: border-box;\n' +
        '}' +
        '[class*=el-col-] {\n' +
        '    float: left;\n' +
        '    -webkit-box-sizing: border-box;\n' +
        '    box-sizing: border-box;\n' +
        '}'
      printJS({
        printable: 'printBox', // 要打印内容的id
        type: 'html',
        style: style,
        scanStyles: false
      })
    },
    cancel () {
      this.$emit('closeInnerDialog')
    },
    send (type) {
      if (type === 'print') {
        html2canvas(document.querySelector('#prescription')).then(function (canvas) {
          document.querySelector('#printBox').appendChild(canvas)
        }).then(
          () => {
            this.$nextTick(function () {
              this.printHtmlCustomStyle()
            })
          }
        )
      } else {

      }
    }
  }

}
</script>
<style scoped lang="less">
.tit1 {
  width: 100%;
  height: 100px;
  font-size:22px;
  line-height: 100px;
  font-weight: 700;
}
.operation {
  padding: 35px 0 40px 0;
  span {
    display: inline-block;
    height:50px;
    line-height: 50px;
    text-align: center;
    border-radius:3px;
    min-width: 100px;
    cursor: pointer;
    margin: 0 27px;
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
