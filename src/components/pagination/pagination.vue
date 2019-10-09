<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    background
    :current-page="cp"
    :page-sizes="pageSizes"
    :page-size="pg"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tot">
  </el-pagination>
</template>
<script>
export default{
  props: {
    total: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pagesize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      tot: this.total,
      cp: this.currentPage,
      pg: this.pagesize,
      pageSizes: [this.pagesize, 30, 50]
    }
  },
  watch: {
    total: function (val) {
      this.tot = val
    },
    currentPage: function (val) {
      this.cp = val
    },
    pagesize: function (val) {
      this.pg = val
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pg = val
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
  .el-pagination{
    margin-top: 30px;
  }
</style>
