<template>
  <el-main>
    <div style="height: 480px;">
      <el-row style="height: 100%;">
        <!--<el-col :span="4" style="height: 100%;">
          <el-card style="height: 100%; text-align: left">
            <div class="chatting-roster-group-list">
              <span class="title">好友</span>
              <ul>
                <li v-for="(roster, index) in rosterList" :key="index" @click="toChats(roster)">{{roster.name}}</li>
              </ul>
            </div>
          </el-card>
        </el-col>-->
        <!-- 聊天信息 -->
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <el-scrollbar v-on:scroll.native="scrollHandler"  ref="chattingContent" class="chatting-content">
                <div v-for="(item, index) in charts" :key="index">
                  <div v-if="item.from" class="chatting-item clearfix" :class="item.className">
                    <div class="msg-date">
                      {{ item.timeStr }}
                    </div>
                    <!--<div class="msg-from">
                      <span class="msg-author">{{ item.from}}</span>
                      <img src="/static/img/im/kf-default.png" alt="">
                    </div>-->
                    <div class="item-content">
                      <div class="msg-content">
                        <Aplayer
                          v-if="item.objectURL && item.fileType == 'audio'"
                          mini
                          :music="{
                               src: item.objectURL
                              }"
                        ></Aplayer>
                        <Viewer v-if="item.url && item.fileType == 'image'" :images="[item.url]">
                          <img :src="item.url" width="200px"/>
                        </Viewer>
                        <span v-if="item.sourceMsg" v-html="item.sourceMsg"></span>
                      </div>
                      <img src="/static/img/profile_portrait.png" class="sicker" alt="">
                      <img src="/static/img/profile_portrait_1.png" class="doctor" alt="">
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </el-col>
          </el-row>
          <!-- 输入区域 -->
          <el-row class="">
            <el-col :span="24">
              <div class="chatting-input">
                <el-input type="textarea"  @keyup.enter.native="sendMessage" ref="textarea" v-model.trim="txt"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="enterArea">
            <el-col :span="4" style="text-align: center">
              <label class="chatting-btn-file">
                <input :disabled="!imTo.toName" @change="sendImageMessage($event)" ref="imageInput"
                       type="file"
                       multiple="false">
                <el-button :disabled="!imTo.toName" type="success" style="margin-top: 5px;" v-show="false">上传图片</el-button>
              </label>
            </el-col>
            <el-col :span="5" style="text-align: center">
              <el-button type="success" style="margin-top: 5px;" @click="sendMessage" :disabled="!imTo.toName">发送</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </el-main>
</template>

<script>
import Viewer from '@/components/Common/Viewer'
import Easemob from '@/utils/Easemob'
import {mapGetters} from 'vuex'
import {
  doctorIm
} from '@/axios/api'
export default {
  name: 'Im',
  components: {
    Viewer
  },
  props: {
    sicker: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      im: new Easemob(),
      txt: '',
      wrap: null,
      imTo: {
        chatType: '',
        toName: '',
        toId: ''
      },
      fileTrigger: true
    }
  },
  created () {
    // 初始im
    this.initIm()
  },
  mounted () {
    const chatsScrollBar = this.$refs['chatsScrollBar']
    if (chatsScrollBar) {
      this.wrap = chatsScrollBar.$refs['wrap']
      this.wrap.addEventListener('scroll', this.scrollHandler)
    }
  },
  computed: {
    // 用户
    rosterList () {
      console.log('ll', this.GET_IM_CHART_ROSTERLIST)
      return this.GET_IM_CHART_ROSTERLIST || []
    },
    groupList () {
      return this.GET_IM_CHART_GROUPLIST || []
    },
    // 聊天数据
    charts () {
      return this.GET_IM_CHART_DIALOG_GROUP_MESSAGE(this.imTo.toId) || []
    },
    ...mapGetters({
      GET_IM_CHART_ROSTERLIST: 'GET_IM_CHART_ROSTERLIST',
      GET_IM_CHART_GROUPLIST: 'GET_IM_CHART_GROUPLIST',
      GET_IM_CHART_DIALOG_GROUP_MESSAGE: 'GET_IM_CHART_DIALOG_GROUP_MESSAGE',
      GET_IM_CHART_DIALOG_GROUP_ID: 'GET_IM_CHART_DIALOG_GROUP_ID'
    })
  },
  watch: {
    charts (val, oldVal) {
      this.scrollToBottom()
    },
    sicker: {
      handler: function (val, oldVal) {
        this.imTo = {
          chatType: 'single',
          toId: val.userIm,
          toName: val.userIm
        }
        console.log('im', val)
      },
      deep: true
    },
    imId (val) {
      this.imTo = {
        chatType: 'single',
        toId: val,
        toName: val
      }
    }
  },
  methods: {
    initIm () {
      // im 登陆
      this.im.login('user_26010', 'EASEMOB_PASSWORD')

      doctorIm().then(
        res => {
          this.im.login(res.data.data.doctorIm, res.data.data.doctorImPwd)
          // this.im.login('user_26010', 'EASEMOB_PASSWORD')
        }
      )
    },
    // 发送消息
    sendMessage (address) {
      if (this.imTo.chatType === 'single') {
        // 会话
        if (address) {
          this.im.sendTextMessage(address, this.imTo.toId)
        } else {
          this.im.sendTextMessage(this.txt, this.imTo.toId, () => {
            this.txt = ''
          })
        }
      } else {
        // 组
        this.im.sendTextMessageGroup(this.txt, this.imTo.toId, () => {
          this.txt = ''
        })
      }
    },
    // 发送图片消息
    sendImageMessage () {
      if (!this.imTo.toId) {
        alert('发送对象必须')
        return
      }
      this.im.sendGroupImageMessage(this.$refs.imageInput, this.imTo.toId, () => {
        this.fileTrigger = !this.fileTrigger
        this.$nextTick(_ => {
          this.fileTrigger = !this.fileTrigger
        })
      })
    },
    toChats (opt) {
      if (opt.groupid) {
        this.imTo = {
          chatType: 'group',
          toId: opt.groupid,
          toName: opt.groupname
        }
      } else {
        this.imTo = {
          chatType: 'single',
          toId: opt.name,
          toName: opt.name
        }
      }
    },
    scrollHandler () {},
    // 滚动到底
    scrollToBottom () {
      this.$nextTick(_ => {
        this.$refs['chattingContent'].wrap.scrollTop = this.$refs['chattingContent'].wrap.scrollHeight
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #DFE6EA;
    color: #333;
    text-align: center;
    padding: 0;
  }
  .enterArea {
    background: #fff;
    padding: 20px 0 30px 0;
    display: flex;
    justify-content: flex-end;
  }
  .el-button--success {
    background-color: #43BE7F;
    border: 0;
  }

</style>
