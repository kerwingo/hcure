<template>
  <div>
    <div id="prescription" v-show="prescription">
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
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="medicalHistory"
                :readonly="!isAdd"
                maxlength="1000"
                show-word-limit
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row class="text-item">
            <el-col :span="6"><div class="tit"><span style="display: inline-block;color: red;font-weight: bold;font-size: 20px;position: relative;top: 5px;margin-right: 3px;">*</span>临床诊断：</div></el-col>
            <el-col :span="18">
              <div class="tags">
                <div>
                  <el-tag
                    v-for="(tag,index) in dynamicTags"
                    :key="tag+index"
                    :closable = "isAdd"
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >
                    {{tag.description}}
                  </el-tag>
                </div>
                <div class="operations" v-show="isAdd">
                  <div class="btns">
                    <span class="clear" @click="dynamicTags=[]">清空</span>
                    <span class="add" @click="openPanel('zd',true)">新增</span>
                  </div>
                  <p class="limit">10个标签以内</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="medical">
        <div class="tabs-wrap">
          <ul class="tabs">
            <li v-for="(tag,index) in tabs" :key="'index'+index" @click="toggleTabs(index)" :class="{'active':index==nowIndex}">
              {{tag}}
            </li>
          </ul>
          <div class="tabs-block">
            <div class="divTab" v-show="nowIndex===0">
              <el-table
                border
                :data="westernData"
                style="width: 100%">
                <el-table-column label="" width="80">
                  <template slot-scope="scope">
                    <i class="el-icon-delete" @click="deleteRow(scope.$index, westernData)" style="cursor: pointer"></i>
                  </template>
                </el-table-column>
                <el-table-column
                  label="项目名称"
                  width="">
                  <template slot-scope="scope">
                    {{ scope.row.m_name }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="剂型"
                  width="70">
                  <template slot-scope="scope">
                    {{ scope.row.m_jx }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="规格"
                  width="">
                  <template slot-scope="scope">
                    {{ scope.row.m_gg }}
                  </template>
                </el-table-column>
                <el-table-column
                  label="关联"
                  width="80">
                  <template slot-scope="scope">
                    <el-input v-model="gl_input"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单次剂量"
                  width="80">
                  <template slot-scope="scope">
                    {{ scope.row.m_dcjl}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="剂量单位"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.se_value1" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="频次"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="se_value1" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="用法"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="se_value1" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="疗程"
                  width="50">
                  <template slot-scope="scope">
                    {{ scope.row.m_lc}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="单价"
                  width="70">
                  <template slot-scope="scope">
                    {{ scope.row.m_dj}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="数量"
                  width="50">
                  <template slot-scope="scope">
                    {{ scope.row.m_sl}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="滴速"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="se_value1" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="包装单位"
                  width="90">
                  <template slot-scope="scope">
                    {{ scope.row.m_bzdw}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="总金额"
                  width="80">
                  <template slot-scope="scope">
                    {{ scope.row.m_zje}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="报销"
                  width="70">
                  <template slot-scope="scope">
                    {{ scope.row.m_bx}}
                  </template>
                </el-table-column>
              </el-table>
              <div class="add-item" @click="openPanel('xy',true)" v-show="isAdd">
                <i class="el-icon-circle-plus-outline"></i><span>添加项目</span>
              </div>
            </div>
            <div class="divTab" v-show="nowIndex===1">
              <div class="tcmTab">
                <div v-for="(table,index) in tcmData" :key="'tcmData'+index" class="tcmData">
                  <el-table
                    border
                    :data="table"
                    style="width: 100%">
                    <el-table-column label="" width="">
                      <template slot-scope="scope">
                        <i data-v-77b9088f="" class="el-icon-delete" @click="deleteRow(scope.$index, table)" style="cursor: pointer"></i>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="药品名称"
                      width="">
                      <template slot-scope="scope">
                        {{ scope.row.c_name }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="数量"
                      width="">
                      <template slot-scope="scope">
                        {{ scope.row.c_sl }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="单价"
                      width="">
                      <template slot-scope="scope">
                        {{ scope.row.c_dj }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="总金额"
                      width="">
                      <template slot-scope="scope">
                        {{ scope.row.c_zje }}
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="add-item" @click="openPanel('zy',true)" v-show="nowTcmData === index">
                    <i class="el-icon-circle-plus-outline"></i><span>添加项目</span>
                  </div>
                </div>
              </div>
              <p class="change" @click="openPanel('yf',true)" v-show="isAdd">增加/修改药方</p>
              <ul class="handleWrite">
                <li>
                  <span>用药副数</span>
                  <el-input v-model="c_fs" placeholder="请输入内容" :readonly="!isAdd"></el-input>
                </li>
                <li>
                  <span>用药方法</span>
                  <el-input v-model="c_ff" placeholder="请输入内容" :readonly="!isAdd"></el-input>
                </li>
                <li>
                  <span>用药频次</span>
                  <el-input v-model="c_pc" placeholder="请输入内容" :readonly="!isAdd"></el-input>
                </li>
                <li>
                  <span>一次用药</span>
                  <el-input v-model="c_ycyy" placeholder="请输入内容" :readonly="!isAdd"></el-input>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="history">
        <div class="main">
          <el-row class="text-item">
            <el-col :span="5"><div class="tit" ><span style="display: inline-block;color: red;font-weight: bold;font-size: 20px;position: relative;top: 5px;margin-right: 3px;">*</span> 医嘱：</div></el-col>
            <el-col :span="19">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="medicalHistory"
                :readonly="!isAdd"
                maxlength="1000"
                show-word-limit
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row class="text-item history-main">
            <el-col :span="5"><div class="tit">历史诊断记录：</div></el-col>
            <el-col :span="19">
              <div class="history-list">
                <ul>
                  <li v-for="(item,index) in historyList" :key="'ill_history'+index"><span style="margin-right: 20px">{{item.date}}</span>{{item.text}}</li>
                </ul>
              </div>
              <pagination></pagination>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="operation">
        <span class="cancel" @click="cancel" v-show="isAdd">取消</span>
        <span class="o-close" @click="cancel" v-show="!isAdd">关闭</span>
        <span class="print" @click="goPrint" v-show="isAdd">确定并打印</span>
      </div>
      <InfoPanel ref="InfoPanel" @addItem="addItem" ></InfoPanel>
    </div>
    <checkSend v-show="checkSend"></checkSend>
  </div>
</template>
<script>
import pagination from '@/components/pagination/pagination'
import InfoPanel from '@/components/Prescription/InfoPanel'
import checkSend from '@/components/Prescription/checkSend'
import printJS from 'print-js'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    pagination: pagination,
    InfoPanel: InfoPanel,
    checkSend: checkSend
  },
  props: {
    types: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      GET_SICKER: 'GET_SICKER'
    }),
    sicker: function () {
      if (this.GET_SICKER) {
        return this.GET_SICKER
      }
    }
  },
  watch: {
    types: function (val) {
      if (val === 'check') {
        this.isAdd = false
        this.prscTit = '历史问诊处方签'
      } else {
        this.isAdd = true
        this.prscTit = '线上问诊处方签'
      }
    }
  },
  data () {
    return {
      prescription: true, // 处方笺页面的显隐
      checkSend: false, // 检查弹窗页面的显隐
      prscTit: '',
      msg: 'chatbox',
      dialogVisible: false,
      innerDialogVisible: false,
      medicalHistory: '海末次综合症',
      isAdd: false,
      prsDate: '2019年8月1日',
      dynamicTags: [],
      tabs: [
        '治疗/药品',
        '中药汤剂'
      ],
      activeName: 'second',
      nowIndex: 0, // 默认第一个tab为激活状态
      gl_input: '',
      options: [
        {value: '每天一次',
          label: '每天一次'},
        {value: '每天二次',
          label: '每天二次'}
      ],
      se_value1: '',
      westernDataOption: {
        'jldw': [{
          value: '毫升',
          label: '毫升'
        },
        {
          value: '毫升',
          label: '毫升'
        }]
      },
      westernData: [
        /* {
          m_name: '***药品',
          m_jx: '液体',
          m_gg: '25毫升/瓶',
          m_gl: '1',
          m_dcjl: '200',
          m_jldw: '毫升',
          m_pc: '每天1次',
          m_yf: '静脉滴注',
          m_lc: '1',
          m_dj: '566',
          m_sl: '2',
          m_ds: '15滴/分',
          m_bzdw: '**!/分',
          m_zje: '688',
          m_bx: '可报销'
        } */
      ],
      tcmData: [

      ],
      nowTcmData: 0,
      c_fs: '',
      c_ff: '',
      c_pc: '',
      c_ycyy: '',
      historyList: [
        {
          date: '2019-4-02 10:41:35',
          text: '感冒-（上呼吸道感染）（临床诊断）'
        },
        {
          date: '2019-4-02 10:41:35',
          text: '感冒-（上呼吸道感染）（临床诊断）'
        }
      ]
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
      console.log(this.tcmData)
    },
    openPanel (type, display) {
      console.log(this.westernData)
      this.$refs.InfoPanel.displayPanel(type, display)
    },
    addItem (type, data) {
      switch (type) {
        case 'zd':
          this.addZd(data)
          return
        case 'xy':
          this.addXy(data)
          return
        case 'yf':
          this.addYf(data)
      }
    },
    addZd (data) {
      this.dynamicTags.push(data)
    },
    addXy (data) {
      let item = {
        link: '', // 关联
        dose: '', // 单次剂量
        doseunitname: '', // 剂量单位名称
        genfreqname: '', // 频次名称
        wayname: '', // 用法名称
        dropspeedname: '', // 滴速名称
        course: '', // 疗程
        amount: '' // 数量
      }
      item.m_name = data.name
      item.m_jx = data.jx
      item.m_gg = data.gg
      item.m_bx = data.bx
      this.westernData.push(item)
    },
    addYf (data) {
      let temp1 = []
      let temp2 = []
      let temp3 = []
      for (let i = 0; i < data.length; i++) {
        if ((i % 3) === 3 || (i % 3) === 0) {
          temp1.push(data[i])
        } else if ((i % 3) === 2) {
          temp3.push(data[i])
        } else if ((i % 3) === 1) {
          temp2.push(data[i])
        }
      }
      this.tcmData = [temp1, temp2, temp3]
    },
    getMax (num1, num2, num3) {
      let max = num1
      if (num1 > num2) {
        max = num1
      } else {
        max = num2
      }
      if (max > num3) {
        return max
      } else {
        return num3
      }
    },
    goPrint () {
      this.prescription = false
      this.checkSend = true
    },
    printHtmlCustomStyle () {
      const style = '@page { margin: 0 } @media print { h1 { color: blue } }'// 直接写样式
      printJS({
        printable: 'prescription', // 要打印内容的id
        type: 'html',
        style: style,
        scanStyles: false
      })
    },
    cancel () {
      this.$emit('closeInnerDialog')
    }
  }

}
</script>
<style scoped lang="less">
.prescription {
  padding: 30px 0 30px 0;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
  .p-tit {
    font-size: 32px;
    font-weight: bold;
  }
  .line {
    width: 100%;
    margin: 40px auto 20px;
    border-bottom: 2px dashed #333333;
  }
  .case-info{
    font-size: 22px;
  }
  &>.main{
    width: 70%;
    min-width: 1000px;
    margin: 0 auto;
    .case-info {
      display: flex;
      justify-content: space-between;
      padding: 30px 0px;
    }
    .text-item {
      margin: 30px 0 0 0 ;
      .tit {
        text-align: right;
        font-size: 22px;
        line-height: 30px;
        margin-right: 10px;
      }
      .tags{
        border:1px solid rgba(210,210,210,1);
        border-radius:3px;
        min-height: 204px;
        text-align: left;
        padding: 15px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        .el-tag {
          background:rgba(238,238,238,1);
          color: #565656;
          margin: 0 20px 20px 0;
          min-width: 135px;
          height: 50px;
          box-sizing: border-box;
          text-align: center;
          line-height: 50px;
          font-size: 18px;
          .el-tag__close {
            color: #999999;
            border: 1px solid #999999;
            border-radius: 50%;
            transition: 0.3s;
            &:hover {
              background:rgba(238,238,238,1);
              transform:rotate(90deg);
              transition: 0.3s;
            }
          }
        }
        .operations{
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .btns {
            text-align: center;
            span{
              display: inline-block;
              width:130px;
              height:50px;
              font-size:20px;
              line-height:50px;
              margin-right: 10px;
              border-radius:3px;
              cursor: pointer;
              &.clear{
                background:rgba(242,242,242,1);
                color:rgba(170,170,170,1);
              }
              &.add {
                background:rgba(67,190,127,1);
                color:#fff;
              }
            }
          }
          .limit {
            color: #AAAAAA;
            font-size:20px;
          }
        }
      }
    }
  }

}
.medical {
  padding: 10px 0;
  .tabs-wrap {
    text-align: left;
    .tabs {
      border-radius: 25px;
      overflow: hidden;
      display: inline-block;
      margin: 10px 0;
      li {
        text-align: center;
        display: inline-block;
        width:150px;
        height:50px;
        line-height: 50px;
        color: #565656;
        background:#fff;
        box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
        cursor: pointer;
        font-size: 22px;
        transition: 0.3s ease-in-out;
        &.active{
          background:rgba(67,190,127,1);
          color: #fff;
          transition: 0.3s ease-in-out;
        }
      }
    }
    .tabs-block{
      box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
      border-radius:3px 3px 0px 0px;
      .divTab {
        .add-item {
          height:70px;
          background:rgba(255,255,255,1);
          font-size:18px;
          color:rgba(67,190,127,1);
          line-height:70px;
          cursor: pointer;
          i {
            margin: 0 5px 0 30px;
          }
        }
        .change{
          color: #fff;
          height:45px;
          line-height: 45px;
          background:rgba(67,190,127,1);
          border-radius:3px;
          width:180px;
          text-align: center;
          margin: 20px auto;
          cursor: pointer;
        }
      }
      .tcmTab {
        display: flex;
        width: 100%;
        /*overflow-x: scroll;*/
        justify-content: space-between;
        flex-wrap: wrap;
        .tcmData{
          margin: 5px;
          box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
        }
      }
      .handleWrite{
        display: flex;
        justify-content: space-between;
        background: #fff;
        padding: 20px 10px;
        box-sizing: border-box;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            display: inline-block;
            min-width: 90px;
          }
        }
      }
    }
  }
}
.history{
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
  padding: 40px 0;
  &>.main{
    width: 70%;
    min-width: 1000px;
    margin: 0 auto;
    .tit {
      font-size: 22px;
      line-height: 50px;
      text-align: right;
    }
    .history-main {
      margin-top: 60px;
      .history-list{
        border:1px solid rgba(210,210,210,1);
        border-radius:3px;
        li {
          height: 66px;
          border-bottom:1px solid rgba(210,210,210,1);
          line-height: 66px;
          text-align: left;
          box-sizing: border-box;
          padding: 0 10px;
          font-size: 22px;
          &:last-child{
            border: 0;
          }
        }
      }
    }
  }
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
    &.o-close{
      color: #fff;
      background:rgba(67,190,127,1);
    }
  }
}
</style>
<style type="text/css">
  .el-table__empty-text{
    font-size: 16px;
  }
  .el-table--enable-row-transition .el-table__body td{
    text-align: center !important;
  }
  .el-table td, .el-table th{
    text-align: center;
  }
  .el-table th{
    background-color: #F6F6F6 !important;
  }
  .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed,
  .el-table td, .el-table th.is-leaf{
    border-color: #DCDCDC !important;
  }
  .el-table td, .el-table th.is-leaf{
    border-bottom: 1px solid #DCDCDC !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background:rgba(67,190,127,1);
  }
   .el-textarea__inner{
    font-size: 20px;
  }
  .el-table .cell{
    font-size: 18px;
  }
  .el-table th>.cell{
    font-size: 18px;
  }
  .el-tag .el-tag__close{
    color: #999;
  }
  .el-tag .el-tag__close:hover {
    color: #FFF;
    background-color: #999;
  }
  .el-input__inner{
    padding: 0 5px;
  }
</style>
