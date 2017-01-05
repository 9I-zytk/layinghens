<template>
  <div class="container">
    <div class="div-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >基础信息采集</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/info' }">批次信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="toolBar">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="dialogFormVisible=true"></el-button>
      </el-button-group>
    </div>
    <div class="data-table">
      <el-table
      :data="tableData2"
      border
      style="width: 100%;min-height:500px"
      highlight-current-row
      :row-class-name="tableRowClassName">
      <el-table-column
        label="操作" width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="batchName"
        label="批次"
        width="150">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100">
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
        width="100">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="henAmount"
        label="蛋鸡数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="lossAmount"
        label="疫损数"
        width="100">
      </el-table-column>
    </el-table>
    </div>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="收货地址" v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted: function () {
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
        if (response.ok) {
          vm.tableData = response.body.henBatch
          vm.total = response.body.total
        }
      })
      .catch((response) => {
        console.log(response)
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    batchNew () {

    },
    closeDialog () {
      this.show = false
    }
  },
  data () {
    return {
      tableData2: [{
        createTime: '2016-05-02',
        batchName: '2016年春',
        type: '土鸡',
        stage: '淘汰',
        total: 3500,
        henAmount: 3500,
        lossAmount: 0
      }, {
        createTime: '2016-05-04',
        batchName: '2016年春',
        stage: '育雏',
        type: '土鸡',
        total: 3500,
        henAmount: 3500,
        lossAmount: 0
      }, {
        createTime: '2016-05-01',
        batchName: '2016年春',
        stage: '育雏',
        type: '土鸡',
        total: 3500,
        henAmount: 3500,
        lossAmount: 0
      }, {
        createTime: '2016-05-03',
        batchName: '2016年春',
        stage: '开产',
        type: '土鸡',
        total: 3500,
        henAmount: 3500,
        lossAmount: 0
      }],
      tableData: [],
      total: 0,
      apiUrl: '/api/',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
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
  .div-breadcrumb
  {
   height:45px;
   padding:10px;
  }
</style>
