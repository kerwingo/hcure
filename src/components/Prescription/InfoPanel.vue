<template>
  <div class="panel-wrap" v-show="panelShow">
      <div class="panel">
          <h3 class="title">临床诊断</h3>
          <span class="close" @click="displayPanel(false)"></span>
          <div class="search-wrap">
            <div class="input-wrap">
              <i class="icon-search"></i>
              <input type="text" :placeholder = "placeholder">
            </div>
            <div class="search-btn">查询</div>
          </div>
        <div class="result-wrap">
            <p class="r-tit">{{resultTips}}</p>
            <div class="ideal" v-show="isResult">

            </div>
            <div class="non-ideal" v-show="!isResult">
              <div>
                <img src="@/static/img/history.png" alt="">
              </div>
              <p class="warn">您对病症的描述不准确  请输入标准描述</p>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'InfoPanel',
  props: {},
  components: {},
  data () {
    return {
      panelShow: false,
      placeholder: '请输入诊断描述',
      resultTips: '搜索结果：',
      isResult: false
    }
  },
  methods: {
    displayPanel (params) {
      this.panelShow = params
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
.panel-wrap {
  box-sizing: border-box;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .panel {
    position: relative;
    width: 1000px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #F6F6F6;
    text-align: left;
    .title {
      font-size:32px;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:55px;
    }
    .search-wrap {
      display: flex;
      margin: 25px 0;
      font-size: 22px;
      justify-content: space-between;
      .input-wrap {
          width: calc(100% - 120px);
          font-size: 20px;
        position: relative;
        .icon-search {
          position: absolute;
          left: 0;
          top: 0;
        }
        input{
          width: 100%;
          height: 50px;
          padding:0 20px 0 55px;
          border: 0;
          box-shadow:0px 0px 16px 0px rgba(212,212,212,0.53);
          border-radius:3px;
        }
      }
      .search-btn {
        width:100px;
        height:50px;
        color: #fff;
        background:rgba(67,190,127,1);
        border-radius:3px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }
    }
    .result-wrap {
      .r-tit{
        color:rgba(170,170,170,1);
        font-size: 22px;
      }
      .non-ideal{
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .warn {
          margin-top: 60px;
          font-size:22px;
          color:rgba(86,86,86,1);
          line-height:30px;
        }
      }
      .ideal{

      }
    }
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
      top: 20px;
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
