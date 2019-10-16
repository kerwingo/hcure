<template>
  <div class="pagination">
    <div class="count">
      共{{pg}}页 第{{cp}}页
    </div>
    <div class="opr">
        <span class="home" @click="handleCurrentChange('home')">回到首页</span>
        <span @click="handleCurrentChange('prev')">上一页</span>
        <span @click="handleCurrentChange('next')">下一页</span>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    pages: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pg: this.pages, // 这里的total实际上
      cp: this.currentPage,
      pageSize: 10,
      pageSizes: [15, 30, 60]
    }
  },
  watch: {
    pages: function (val) {
      this.pg = val
      console.log('tot', this.tot)
    },
    currentPage: function (val) {
      this.cp = val
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (opr) {
      let flag = this.cp
      if (opr === 'home') {
        this.cp = 1
      } else if (opr === 'prev') {
        this.cp = (this.cp - 1) > 0 ? this.cp - 1 : this.cp
      } else if (opr === 'next') {
        this.cp = this.cp < this.pages ? this.cp + 1 : this.cp
      }
      if (flag !== this.cp) {
        console.log(`当前页: ${this.cp}`)
        this.$emit('getCurrentPage', this.cp)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .count{
      color: #565656;
      background:rgba(229,229,229,1);
      border-radius:3px;
      height:40px;
      line-height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .opr {
      display: flex;
      justify-content: center;
      span {
        display: inline-block;
        height:40px;
        line-height: 40px;
        padding: 0 20px;
        box-sizing: border-box;
        color: #565656;
        background:rgba(229,229,229,1);
        border-radius:3px;
        margin-left: 20px;
        cursor: pointer;
        &.home{
          background: #43BE7F;
          color: #fff;
        }
      }
    }
  }
</style>
