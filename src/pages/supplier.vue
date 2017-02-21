<template>
  <div class="container">
    <div class="div-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >基础信息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/supplier' }">批次信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="optNew">新增</el-button>
        <el-button type="primary" icon="share"></el-button>
        <el-button type="primary" icon="delete"></el-button>
      </el-button-group>
    </div>
    <div class="data-table">
      <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="Origin"
        label="单位名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="Contacts"
        label="联系人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="150">
      </el-table-column>
      <el-table-column
        prop="nature"
        label="性质"
        width="100">
      </el-table-column>
      <el-table-column
        prop="Address"
        label="地址"
        width="250">
      </el-table-column>
    </el-table>
    </div>
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
    optNew () {
    },
    getData () {
      let vm = this
      let uri = 'http://localhost:' + 8002 + vm.apiUrl
      vm.$http.get(uri).then((response) => {
        console.log(response)
        if (response.success) vm.tableData = response.body.data
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
      tableData: [],
      apiUrl: '/api/supplier/'
    }
  }
}
</script>

<style>

</style>
