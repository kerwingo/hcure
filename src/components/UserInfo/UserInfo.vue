<template>
  <div class="userInfo">
    <div class="info-top">
      <el-row>
        <el-col :span="4" class="profile">
          <img src="@/static/img/doctor.png" alt width="82px" />
        </el-col>
        <el-col :span="20" class="content">
          <el-row>
            <el-col :span="12">
              <div>
                <span>姓名：</span>
                <span>{{baseInfo.doctorsName}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <span>性别：</span>
                <span>{{baseInfo.sex =='1'?"男":"女"}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>
                <span>所属医疗机构：</span>
                <span>{{baseInfo.orgName}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span>科室：</span>
                <span>{{baseInfo.administrativeOffice}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <span>职位：</span>
                <span>{{baseInfo.doctorTitle}}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="info-box">
      <div class="item-box">
        <p class="tit">擅长：</p>
        <div class="text bor" v-show="gifted">{{baseInfos.skills}}</div>
        <el-input
          type="textarea"
          v-show="!gifted"
          :rows="4"
          placeholder="请输入内容"
          v-model="baseInfos.skills"
          autofocus="!gifted"
        ></el-input>
        <p class="change" @click="openEdit('sc')" v-show="gifted">修改</p>
        <p class="change" v-show="!gifted">
          <span @click="changing('sc','cancel')">取消</span>
          <span @click="changing('sc','save')">保存</span>
        </p>
      </div>
      <div class="item-box">
        <p class="tit">个人简介：</p>
        <div class="text bor" v-show="intor">{{baseInfos.intro}}</div>
        <el-input
          type="textarea"
          v-show="!intor"
          :rows="4"
          placeholder="请输入内容"
          v-model="baseInfos.intro"
          autofocus="!intor"
        ></el-input>
        <p class="change" @click="openEdit('jj')" v-show="intor">修改</p>
        <p class="change" v-show="!intor">
          <span @click="changing('jj','cancel')">取消</span>
          <span @click="changing('jj','save')">保存</span>
        </p>
      </div>
      <div class="item-box">
        <p class="tit">手写签名：</p>
        <div class="img">
          <img :src="baseInfos.signature" alt v-show="false" />
          <p>{{baseInfos.signature}}</p>
        </div>
      </div>
      <div class="item-box">
        <p class="tit">标签</p>
        <div class="text">
          <p class="change right" @click="openEdit('bq')">修改</p>
          <el-checkbox-group v-model="checkedLables" :min="1" :max="2">
            <el-checkbox v-for="(tag,index) in lableAll" :label="tag" :key="'tag'+index">{{tag}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  alert,
  doctorInfo,
  adeptInfo,
  doctorLabelAll,
  labelInfo,
  updateAdept,
  updateintroduce
} from '@/axios/api'
import {mapActions} from 'vuex'
export default {
  name: '',
  components: {},
  data () {
    return {
      baseInfo: '',
      baseInfos: '',
      lableAll: [],
      checkedLables: [],
      textarea: '',
      textSc: '',
      textIntro: '',
      dialogVisible: false,
      gifted: true,
      intor: true,
      blurfocus: false
    }
  },
  created () {},
  mounted () {
    this.getInfo()
  },
  methods: {
    ...mapActions(['SET_USER_INFO']),
    // 获取页面展示数据
    getInfo () {
      doctorInfo()
        .then(res1 => {
          this.baseInfo = res1.data.data
          this['SET_USER_INFO'](res1.data.data)
        })
        .then(() => {
          adeptInfo().then(res2 => {
            this.baseInfos = res2.data.data
          })
        })
        .then(() => {
          doctorLabelAll().then(res3 => {
            res3.data.data.map((item, index) => {
              this.lableAll.push(item.labelContent)
            })
          })
        })
        .then(() => {
          labelInfo().then(res4 => {})
        })
    },
    // 打开编辑input
    openEdit (arg) {
      this.dialogVisible = true
      if (arg == 'sc') {
        this.gifted = !this.gifted
        if (this.baseInfos) {
          this.textSc = this.baseInfos.skills
        }
      } else if (arg == 'jj') {
        this.intor = !this.intor
        if (this.baseInfos) {
          this.textIntro = this.baseInfos.intro
        }
      } else if (arg == 'bq') {
      }
    },
    // 取消或保存修改
    changing (item, type) {
      if (item == 'sc') {
        this.gifted = !this.gifted
        if (type == 'save') {
          updateAdept({captionAdept: this.baseInfos.skills}).then(res => {
            alert(res.data.message)
          })
        } else {
          this.baseInfos.skills = this.textSc
        }
      } else if (item == 'jj') {
        this.intor = !this.intor
        if (type == 'save') {
          updateintroduce({introduce: this.baseInfos.intro}).then(res => {
            alert(res.data.message)
          })
        } else {
          this.baseInfos.intro = this.textIntro
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@tit_width: 100px;
.userInfo {
  background: #fff;
  height: 100%;
  box-shadow: 0px 0px 13px 0px rgba(223, 230, 234, 0.57);
  padding: 30px;
  box-sizing: border-box;
  text-align: left;
  .profile {
    background: rgba(238, 238, 238, 1);
    border-radius: 5px;
    width: 130px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
    background: rgba(238, 238, 238, 1);
    text-align: left;
    height: 150px;
    box-sizing: border-box;
    padding: 20px 40px;
    margin-left: 14px;
    .el-row {
      line-height: 55px;
    }
  }
  .info-box {
    padding-top: 65px;
    .item-box {
      margin-bottom: 45px;
      clear: both;
      overflow: hidden;
      .el-textarea {
        width: 50% !important;
      }
      * {
        float: left;
      }
      .tit {
        min-width: @tit_width;
        float: left;
        color: rgba(51, 51, 51, 1);
      }
      .text {
        min-width: 496px;
        min-height: 90px;
        max-width: calc(100% - @tit_width);
        box-sizing: border-box;
        padding: 10px;
        &.bor {
          border: 1px solid rgba(210, 210, 210, 1);
          border-radius: 3px;
        }
        .el-checkbox-group {
          margin-top: 10px;
          .el-checkbox {
            margin-bottom: 10px;
            .el-checkbox__label {
              font-size: 16px;
            }
          }
        }
      }
      .img {
        width: 180px;
        height: 120px;
        border: 1px dashed red;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .change {
        margin-left: 20px;
        color: rgba(170, 170, 170, 1);
        cursor: pointer;
        &.right {
          float: right;
          position: relative;
          top: -10px;
          right: 50px;
        }
        span {
          margin-right: 20px;
        }
      }
    }
  }
  .el-dialog__wrapper {
    .el-textarea__inner {
      min-height: 200px !important;
    }
  }
}
</style>
