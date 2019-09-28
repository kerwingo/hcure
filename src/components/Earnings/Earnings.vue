<template>
  <div class="earnings">
    <el-table ref="filterTable" :data="list" style="width: 100%">
      <el-table-column
        prop="buildtime"
        :formatter="dateFormatter"
        label="时间"
        sortable
        width="300"
        column-key="buildtime"
      ></el-table-column>
      <el-table-column
        prop="category"
        label="乐币类型 "
        width="300"
        :formatter="categoryFormatter"
        :filters="[{ text: '金乐币', value: '0' }, { text: '银乐币', value: '1' },{ text: '铜乐币', value: '2' }]"
        :filter-method="filterCategory"
        filter-placement="bottom-end"
      >
      </el-table-column>
      <el-table-column prop="income" label="收支" width="300"></el-table-column>
      <el-table-column prop="balance" label="剩余金额"  width="300"></el-table-column>
      <el-table-column
        prop="Evaluation"
        :formatter="commentFormatter"
        label="评价"
        :filters="[{ text: '好评', value: '2' }, { text: '中等', value: '1' },{ text: '一般', value: '0' },{ text: '超赞', value: '3' }]"
        :filter-method="filterComment"
        filter-placement="bottom-end"
      >
      <!--  <template slot-scope="scope">
          <el-tag
            :type="scope.row.comment === '好评' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.comment}}</el-tag>
        </template>-->
      </el-table-column>
    </el-table>
    <pagination></pagination>
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
      list: [
        {
          buildtime: '1569466840000',
          category: '0',
          income: 1000,
          balance: 1000,
          comment: '0'
        },
        {
          buildtime: '1569468840000',
          category: '1',
          income: 1000,
          balance: 1000,
          comment: '1'
        },
        {
          buildtime: '1569466940000',
          category: '2',
          income: 1000,
          balance: 1000,
          comment: '2'
        },
        {
          buildtime: '1569466850000',
          category: '1',
          income: 1000,
          balance: 1000,
          comment: '3'
        }
      ]
    }
  },
  mounted () {
    this.offlineinterrogation()
  },
  methods: {
    offlineinterrogation () {
      offlineinterrogation().then(res => {
        console.log(res.data.data)
      })
    },
    resetDateFilter () {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    dateFormatter (row, column) {
      let t = new Date(parseInt(row.buildtime)).getTime()
      return this.$moment(t).format('YYYY-MM-DD HH:mm:ss')
    },
    categoryFormatter (row, column) {
      switch (parseInt(row.category)) {
        case 0 :
          return '金乐币'
          break
        case 1 :
          return '银乐币'
          break
        case 2 :
          return '铜乐币'
          break
      }
    },
    commentFormatter (row, column) {
      switch (parseInt(row.comment)) {
        case 0 :
          return '一般'
          break
        case 1 :
          return '中等'
          break
        case 2 :
          return '好评'
          break
        case 3 :
          return '超赞'
          break
      }
    },
    filterComment (value, row) {
      return row.comment === value
    },
    filterCategory (value, row) {
      return row.category === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>
<style lang="less" scope="scoped">
</style>
