<template>
  <div>
    <div class="chatBox">
      <div class="chatBox-head">
        <p><span style="position: relative;left: -80px">{{name}}</span></p>
        <span class="collapse" v-show="true" @click="closeDialog('collapse')"></span>
        <span class="close" v-show="closeDialog" @click="closeDialog"></span>
      </div>
      <div class="chatBox-main">
        <div class="main-box">
          <im :sicker="sicker" ref="im"></im>
        </div>
        <div class="aside-box">
          <div class="history disabled" @click="openInnerDialog('check')">
            <img src="@/static/img/history.png" alt="">
            <p>查看历史记录</p>
          </div>
          <div class="position" @click="sendAddress">
            <img src="@/static/img/location.png" alt="">
            <p>位置</p>
          </div>
          <div v-if="sicker" class="add" @click="openInnerDialog('add')" :class="{'disabled':sicker.closed===2}">
            <img src="@/static/img/prescription.png" alt="">
            <p>添加处方笺</p>
          </div>
        </div>
      </div>
    </div>
    <div class="innerDialog-wrap" v-show="innerDialogVisible">
        <div class="innerDialog" id="innerDialog">
            <span class="close" @click="closeInnerDialog"></span>
            <prescription @closeInnerDialog = "closeInnerDialog" ref="pres" :types="types"></prescription>
        </div>
    </div>
  </div>

</template>

<script>
import pagination from '@/components/pagination/pagination'
import Im from '@/components/Im/Im'
import prescription from '@/components/Prescription/Prescription'
import { offlineinterrogation, address } from '@/axios/api'
export default {
  components: {
    pagination: pagination,
    prescription: prescription,
    im: Im
  },
  props: {
    sicker: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      msg: 'chatbox',
      dialogVisible: false,
      innerDialogVisible: false,
      types: '', // 处方笺的类型，查看和新增("check" || "add")
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
  computed: {
    name: function () {
      if (this.sicker) {
        return this.sicker.caption
      }
    }
  },
  mounted () {

  },
  methods: {
    closeDialog (val) {
      this.$emit('closeDialog', val)
    },
    openInnerDialog (val) {
      if (val === 'check' || this.sicker.closed === 2) return
      this.types = val
      this.innerDialogVisible = true
      this.$refs.pres.clearData()
    },
    closeInnerDialog () {
      this.innerDialogVisible = false
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    sendAddress () {
      address().then(res => {
        console.log('address', res.data.data.address)
        console.log(this.$refs.im)
        this.$refs.im.sendMessage('haha')
      })
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
        width: 700px;
      }
      .aside-box{
        width: 170px;
        padding-top: 40px;
        box-shadow:0px 0px 13px 0px rgba(223,230,234,0.57);
        &>div{
          margin-bottom: 60px;
          cursor: pointer;
          &.disabled {
            cursor:no-drop;
            /*pointer-events: none;*/
            opacity: 0.7;
          }
          p{
            color:rgba(115,115,115,1);
            line-height: 30px;
          }
        }
      }
    }
  }
  .innerDialog-wrap {
    box-sizing: border-box;
    background: rgba(0,0,0,0.1);
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .innerDialog {
      width: 80%;
      padding: 20px;
      box-sizing: border-box;
      min-width: 1300px;
      height:100%;
      overflow-y: scroll;
      background: #F2F2F2;
      z-index: 20;
      position: relative;
      .close {
        display: inline-block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        background-image: url("../../static/img/close_2.png");
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        top: 40px;
        right: 40px;
        transition: 0.3s;
        &:hover {
           transform:rotate(180deg);
            transition: 0.3s;
        }
      }

    }
  }
</style>
