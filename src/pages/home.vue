<template>
  <div class="container">
    <div class="div-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <span v-html="tableData.total"></span>
      <button @click="getData()">点我</button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="batchName"
        label="批次"
        width="150">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="开始时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="finishTime"
        label="结束时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="stage"
        label="状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="henAmount"
        label="蛋鸡数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="lossAmount"
        label="疫损数"
        width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  ready: function () {
    this.getData()
  },
  methods: {
    tableRowClassName (row, index) {
      if (index === 1) {
        return 'info-row'
      } else if (index === 3) {
        return 'positive-row'
      }
      return ''
    },
    getData () {
      let vm = this
      let uri = 'http://localhost:' + 8002 + vm.apiUrl
      vm.$http.get(uri).then((response) => {
        console.log(response)
        if (response.success) vm.$set('tableData', response.body.henBatch)
      })
      .catch((response) => {
        console.log(response)
      })
    },
    closeDialog () {
      this.show = false
    }
  },
  data () {
    return {
      tableData2: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      tableData: [],
      apiUrl: '/api/'
    }
  }
}
</script>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>
