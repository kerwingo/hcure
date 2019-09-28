<template>
  <div>
    <div class="chatBox">
      <div class="chatBox-head">
        <p>张某某患者</p>
        <span class="collapse" v-show="true"></span>
        <span class="close" v-show="closeDialog" @click="closeDialog"></span>
      </div>
      <div class="chatBox-main">
        <div class="main-box">消息框</div>
        <div class="aside-box">
          <div class="history" @click="openInnerDialog">
            <img src="@/static/img/history.png" alt="">
            <p>查看历史记录</p>
          </div>
          <div class="position">
            <img src="@/static/img/location.png" alt="">
            <p>位置</p>
          </div>
          <div class="add" @click="openInnerDialog">
            <img src="@/static/img/prescription.png" alt="">
            <p>添加处方笺</p>
          </div>
        </div>
      </div>
    </div>
    <div class="innerDialog-wrap" v-show="innerDialogVisible">
        <div class="innerDialog">
            <span class="close" @click="closeInnerDialog"></span>
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
    </div>
  </div>

</template>

<script>
import pagination from '@/components/pagination/pagination'
import { offlineinterrogation } from '@/axios/api'
export default {
  components: {
    pagination: pagination
  },
  data () {
    return {
      msg: 'chatbox',
      dialogVisible: false,
      innerDialogVisible: false,
      medicalHistory: '海末次综合症',
      closable: true,
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
<style lang="less" scope="scoped">
  .chatBox {
    width: 100%;
    .chatBox-head{
      height: 60px;
      line-height: 60px;
      font-size:20px;
      color: #fff;
      background:rgba(67,190,127,1);
      box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
      position: relative;
      .collapse,.close{
        display: inline-block;
        width: 60px;
        height: 60px;
        position: absolute;
        top: 0;
        right: 0;
        background-repeat: no-repeat;
        background-position: center;
      }
      .collapse {
        right: 60px;
        background-image: url("../../static/img/minimize_the.png");
        &:hover {
          background-color: #4BCC8A;
        }
      }
      .close {
        right: 0;
        background-image: url("../../static/img/close.png");
        &:hover {
          background-color: #4BCC8A;
        }
      }
    }
    .chatBox-main{
      display: flex;
      .main-box{
        width: 800px;
      }
      .aside-box{
        width: 200px;
        padding-top: 40px;
        box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
        &>div{
          margin-bottom: 60px;
          cursor: pointer;
          p{
            color:rgba(115,115,115,1);
          }
        }
      }
    }
  }
  .innerDialog-wrap {
    box-sizing: border-box;
    background: #F2F2F2;
    position: absolute;
    z-index: 10;
    width: 60%;
    height: 85%;
    overflow-y: scroll;
    left: 50%;
    top: 50%;
    padding: 30px 0 30px 15px;
    transform: translate(-50%,-50%);//IE8不支持
    .innerDialog {
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
        top: 40px;
        right: 20px;
        transition: 0.3s;
        &:hover {
           transform:rotate(180deg);
            transition: 0.3s;
        }
      }
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
    }
  }
</style>
