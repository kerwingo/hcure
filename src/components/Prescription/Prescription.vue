<template>
  <div>
    <div id="" v-show="prescription">
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
                v-model="symptoms"
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
                  <p class="limit">5个标签以内</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="medical">
        <div class="tabs-wrap">
          <ul class="tabs">
            <li v-for="(tag,index) in tabs" :key="'index'+index" @click="toggleTabs(index)" :class="{'active':index==nowIndex}" v-show="tag.category === doctorCategory || doctorCategory === 2">
              {{tag.text}}
            </li>
          </ul>
          <div class="tabs-block">
            <div class="divTab" v-show="nowIndex===0">
              <el-table
                border
                :data="westernData"
                style="width: 100%">
                <el-table-column label="" width="60">
                  <template slot-scope="scope">
                    <i class="el-icon-delete" @click="deleteRow(scope.$index, westernData)" style="cursor: pointer"></i>
                  </template>
                </el-table-column>
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
                    <el-select v-model="scope.row.doseunit" placeholder="请选择">
                      <el-option
                        v-for="item in options.units"
                        :key="item.value"
                        :label="item.title"
                        :value="item.title">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="频次"
                  width="110">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.genfreq" placeholder="请选择">
                      <el-option
                        v-for="item in options.genfreq"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="用法"
                  width="110">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.way" placeholder="请选择">
                      <el-option
                        v-for="item in options.way"
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
                    <el-input v-model="scope.row.course"></el-input>
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
                    <el-input-number v-model="scope.row.amount" size="mini" @change="handleChange(scope,scope.row.amount)" :min="1" :max="100"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  label="滴速"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.dropspeed" placeholder="请选择">
                      <el-option
                        v-for="item in options.dropspeed"
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
                        {{ scope.row.drugName }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="数量"
                      width="150">
                      <template slot-scope="scope">
                        <el-input-number v-model="scope.row.num" size="mini" @change="handleChange(scope,scope.row.num)" :min="1" :max="100"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="单价"
                      width="">
                      <template slot-scope="scope">
                        {{ scope.row.price }}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="总金额"
                      width="">
                      <template slot-scope="scope">
                        {{ scope.row.totalMoney }}
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="add-item" @click="openPanel('zy',true)" v-show="nowTcmData === index">
                    <i class="el-icon-circle-plus-outline"></i><span>添加项目</span>
                  </div>
                </div>
              </div>
              <div style="text-align: center">
                <p class="change" @click="openPanel('yf',true)" v-show="isAdd">增加/修改药方</p>
              </div>
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
      <div class="history" >
        <div class="main">
          <el-row class="text-item">
            <el-col :span="5"><div class="tit" ><span style="display: inline-block;color: red;font-weight: bold;font-size: 20px;position: relative;top: 5px;margin-right: 3px;">*</span> 医嘱：</div></el-col>
            <el-col :span="19">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="advice"
                :readonly="!isAdd"
                maxlength="1000"
                show-word-limit
              >
              </el-input>
            </el-col>
          </el-row>
          <el-row class="text-item history-main" v-show="false">
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
    <checkSend v-show="checkSend" :cacheData="cacheData" @reWrite="reWrite"></checkSend>
  </div>
</template>
<script>
import pagination from '@/components/pagination/pagination'
import InfoPanel from '@/components/Prescription/InfoPanel'
import checkSend from '@/components/Prescription/checkSend'
import {mapGetters, mapActions} from 'vuex'

import {
  alert,
  notify,
  itemsInfo,
  drugsList,
  drugsInfo,
  archInfo,
  unitsList,
  saveRxs,
  diagdescsNum
} from '@/axios/api'
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
    },
    diagslist: function () {
      let arr = []
      this.dynamicTags.forEach(function (item) {
        arr.push(item.descsId)
      })
      return arr
    },
    tcmList: function () {
      var arr = []
      var new_arr = []
      this.tcmData.forEach(function (items) {
        items.forEach(function (item) {
          arr.push(item)
        })
      })
      new_arr = arr.map(o => {
        return {
          itemid: o.id,
          title: o.drugName,
          amount: o.amount,
          price: o.price,
          total: o.total
        }
      })
      return new_arr
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
      symptoms: '',
      isAdd: false,
      prsDate: this.$moment(new Date()).format('YYYY-MM-DD'),
      dynamicTags: [],
      doctorCategory: 2,
      tabs: [
        {
          text: '治疗/药品',
          category: 0
        },
        {
          text: '中药汤剂',
          category: 1
        }
      ],
      activeName: 'second',
      nowIndex: 0, // 默认第一个tab为激活状态
      options: {
        units: [],
        genfreq: [
          {
            label: '一天一次',
            value: '一天一次'
          },
          {
            label: '一天两次',
            value: '一天两次'
          }
        ],
        way: [
          {
            label: '一次三粒',
            value: '一次三粒'
          },
          {
            label: '一次两粒',
            value: '一次两粒'
          }
        ],
        dropspeed: [
          {
            label: '100/s',
            value: '100/s'
          },
          {
            label: '50/s',
            value: '50/s'
          }
        ]
      },
      westernData: [
      ],
      tcmData: [[], [], []],
      nowTcmData: 0,
      c_fs: '',
      c_ff: '',
      c_pc: '',
      c_ycyy: '',
      advice: '',
      cacheData: null,
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
    this.baseInfo()
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
      this.getMin(...this.tcmData)
      console.log(this.tcmData)
    },
    openPanel (type, display) {
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
          return
        case 'zy':
          this.addZy(data)
      }
    },
    tagUsed (id) {
      diagdescsNum({'id': id}).then(res => {
        console.log('tag使用+1', res.data)
      })
    },
    addZd (data) {
      if (this.dynamicTags.length === 0) {
        this.dynamicTags.push(data)
        notify('标签添加成功', 'success', '成功')
        this.tagUsed(data.descsId)
      } else if (this.dynamicTags.length === 5) {
        notify('添加失败，标签最多添加五个', 'error', '失败')
      } else {
        let dup = false
        for (let i = 0; i < this.dynamicTags.length; i++) {
          if (data.description === this.dynamicTags[i].description) {
            dup = true
          }
        }
        if (dup) {
          notify('添加失败，标签重复', 'error', '失败')
        } else {
          this.dynamicTags.push(data)
          this.tagUsed(data.descsId)
          notify('标签添加成功', 'success', '成功')
        }
      }
    },
    addXy (data) {
      console.log(data)
      let params = {
        'id': data.target,
        'type': data.type
      }
      itemsInfo(params).then(res => {
        this.westernData.push(res.data.data)
        notify('项目添加成功', 'success', '成功')
      })
    },
    addYf (data) {
      if (data.id) {
        let param = {'id': data.id}
        drugsList(param).then(res => {
          let data2 = res.data.data
          if (this.tcmData[0].length === 0 && this.tcmData[1].length === 0 && this.tcmData[2].length === 0) {
            for (let i = 0; i < data2.length; i++) {
              if ((i % 3) === 3 || (i % 3) === 0) {
                this.tcmData[0].push(data2[i])
              } else if ((i % 3) === 2) {
                this.tcmData[2].push(data2[i])
              } else if ((i % 3) === 1) {
                this.tcmData[1].push(data2[i])
              }
            }
            notify('药方添加成功', 'success', '成功')
          } else {
            for (let i = 0; i < data2.length; i++) {
              this.tcmData[this.nowTcmData].push(data2[i])
              notify('药方添加成功', 'success', '成功')
            }
          }
          this.getMin(...this.tcmData)
        })
      }
    },
    addZy (data) {
      if (data.id) {
        let param = {'id': data.id}
        drugsInfo(param).then(res => {
          this.tcmData[this.nowTcmData].push(res.data.data)
          this.getMin(...this.tcmData)
          notify('项目/药品添加成功', 'success', '成功')
        })
      }
    },
    getMin (arr1, arr2, arr3) {
      let arr = [arr1.length, arr2.length, arr3.length]
      this.nowTcmData = arr.indexOf(Math.min.apply(Math, arr))
    },
    baseInfo () {
      archInfo().then(res => {
        if (res.data.data.category !== null) {
          this.doctorCategory = Number(res.data.category)
          if (Number(res.data.category) !== 2) {
            this.nowIndex = res.data.category
          }
        }
        console.log(this.doctorCategory)
      })
      unitsList().then(res => {
        console.log(res.data.data)
        this.options.units = res.data.data
      })
    },
    handleChange (scope, val) {
      if (scope.row.price) {
        if (scope.row.total) {
          scope.row.total = val * scope.row.price
        }
        if (scope.row.totalMoney) {
          scope.row.totalMoney = val * scope.row.price
        }
      }
      console.log(this.westernData)
    },
    goPrint () {
      // rebuild
      this.saveRxs()
    },
    saveRxs () { // 保存处方
      let data = {
        sickid: this.sicker.sickid,
        doctorid: '',
        inquireid: this.sicker.gid,
        content: this.symptoms,
        diagslist: this.diagslist,
        medicineslist: this.nowIndex === 0 ? this.westernData : this.tcmList,
        vice: this.c_fs,
        mea: this.c_ycyy,
        freq: this.c_pc,
        method: this.c_ff,
        advice: this.advice,
        rxstype: this.nowIndex
      }
      saveRxs(data).then(res => {
        console.log('处方缓存成功', res)
        this.cacheData = res.data.data
        this.prescription = false
        this.checkSend = true
      })
    },
    cancel () {
      this.$emit('closeInnerDialog')
    },
    reWrite () {
      this.prescription = true
      this.checkSend = false
    },
    clearData () {
      this.prescription = true
      this.checkSend = false
      this.symptoms = ''
      this.dynamicTags = []
      this.westernData = []
      this.tcmData = [[], [], []]
      this.nowTcmData = 0
      this.c_fs = ''
      this.c_ff = ''
      this.c_pc = ''
      this.c_ycyy = ''
      this.advice = ''
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
    font-size: 20px;
    font-weight: bold;
  }
  .line {
    width: 100%;
    margin: 40px auto 20px;
    border-bottom: 2px dashed #333333;
  }
  .case-info{
    font-size: 18px;
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
        font-size: 16px;
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
          height: 40px;
          box-sizing: border-box;
          text-align: center;
          line-height: 40px;
          font-size: 14px;
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
              height:40px;
              font-size:14px !important;
              line-height:40px;
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
            font-size:14px;
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
        width:120px;
        height:40px;
        line-height: 40px;
        color: #565656;
        background:#fff;
        box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
        cursor: pointer;
        font-size: 16px;
        transition: 0.3s ease-in-out;
        &.active{
          background:rgba(67,190,127,1);
          color: #fff;
          transition: 0.3s ease-in-out;
        }
      }
    }
    .tabs-block{
      //box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
      border-radius:3px 3px 0px 0px;
      .divTab {
        .add-item {
          height:70px;
          background:rgba(255,255,255,1);
          font-size:16px;
          color:rgba(67,190,127,1);
          line-height:70px;
          cursor: pointer;
          i {
            margin: 0 5px 0 22px;
          }
        }
        .change{
          color: #fff;
          height:40px;
          line-height: 40px;
          font-size: 14px;
          background:rgba(67,190,127,1);
          border-radius:3px;
          padding: 0 20px;
          display: inline-block;
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
          width: calc((100% - 30px)/3);
          margin: 5px;
          //box-shadow:0px -1px 9px 0px rgba(234,234,234,1);
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
            min-width: 70px;
            font-size: 14px;
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
      font-size: 16px;
      line-height: 30px;
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
  font-size: 14px;
  span {
    display: inline-block;
    height:50px;
    line-height: 50px;
    text-align: center;
    border-radius:3px;
    min-width: 100px;
    cursor: pointer;
    padding: 0 20px;
    margin: 0 15px;
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
    font-size: 14px;
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
    font-size: 14px !important;
  }
  .el-table .cell{
    font-size: 14px;
  }
  .el-table th>.cell{
    font-size: 14px !important;
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
  .el-input-number--mini{
    width: 93px;
  }
</style>
