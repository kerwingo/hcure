<template>
  <div>
    <div class="prescription">
      <div class="main">
        <h3>历史问诊处方签</h3>
        <div class="case-info">
          <span>患者姓名：张三</span>
          <span>患者性别：男</span>
          <span>患者年龄：36</span>
          <span>开方日期：2019年8月1日</span>
        </div>
        <el-row class="text-item">
          <el-col :span="6"><div class="tit" ><span style="display: inline-block;color: red;font-weight: bold;font-size: 20px;position: relative;top: 5px;margin-right: 3px;">*</span> 病史、症状及体征：</div></el-col>
          <el-col :span="18">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="medicalHistory"
              :readonly="readonly"
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
              <el-tag
                v-for="(tag,index) in dynamicTags"
                :key="tag+index"
                :closable = "closable"
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{tag}}
              </el-tag>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="medical">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="治疗/药品" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="治疗/药品" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'chatbox',
      dialogVisible: false,
      innerDialogVisible: false,
      medicalHistory: '海末次综合症',
      closable: false,
      readonly: false,
      dynamicTags: [
        '***诊断',
        '***诊断',
        '***诊断',
        '***诊断'
      ],
      activeName: 'second'
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
    }
  }

}
</script>
<style type="text/css" lang="less" scoped="scoped">
  .prescription {
    padding: 20px 0;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
    &>.main{
      width: 70%;
      .case-info {
        display: flex;
        justify-content: space-between;
        padding: 30px 0px;
      }
      .text-item {
        margin: 30px 0 0 0 ;
        .tit {
          text-align: right;
        }
        .tags{
          border:1px solid rgba(210,210,210,1);
          border-radius:3px;
          min-height: 150px;
          text-align: left;
          padding: 15px;
          .el-tag {
            background:rgba(238,238,238,1);
            color: #565656;
            margin: 0 20px 0 0;
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
        }
      }
    }

  }
  .medical {
    padding: 10px 0;
    .el-tabs--border-card {
      box-shadow:none;
      border:0;
      background: #F2F2F2 !important;
    }
    .el-tabs--border-card>.el-tabs__header{
      background-color: #F2F2F2 !important;
      border:0;
      .el-tabs__item.is-active{
        color: #fff;
        background-color:#43BE7F;
        &:hover {
          color: #fff !important;
        }
      }
    }
    .el-tabs__nav-wrap::after{
      background-color: #F2F2F2 !important;
      border:0;
    }
    .el-tabs__nav.is-top {
      border-radius:25px;
      overflow: hidden;
      background: #fff;
      color: #565656;
      border: 0 !important;
      .el-tabs__item.is-top:hover{
        color: #565656;
      }
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item{
      border: 0;
    }
  }
</style>
