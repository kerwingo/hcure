<template>
  <div>
    <div class="chatBox">
      <div class="chatBox-head">
        <p>张某某患者</p>
        <span class="collapse" v-show="true"></span>
        <span class="close" v-show="closeDialog" @click="closeDialog"></span>
      </div>
      <div class="chatBox-main">
        <div class="main-box">
          <im></im>
        </div>
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
            <prescription @closeInnerDialog = "closeInnerDialog"></prescription>
        </div>
    </div>
  </div>

</template>

<script>
import pagination from '@/components/pagination/pagination'
import Im from '@/components/Im/Im'
import prescription from '@/components/Prescription/Prescription'
import { offlineinterrogation } from '@/axios/api'
export default {
  components: {
    pagination: pagination,
    prescription: prescription,
    im: Im
  },
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
      justify-content: flex-start;
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
    width: 80%;
    min-width: 1300px;
    height:100%;
    overflow-y: scroll;
    left: 50%;
    top: 50%;
    padding: 30px 0 30px 15px;
    transform: translate(-50%,-50%);//IE8不支持
    .innerDialog {
      position: relative;
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

    }
  }
</style>
