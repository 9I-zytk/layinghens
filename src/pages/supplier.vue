<template>
  <div class="container">
    <div class="div-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >基础信息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/supplier' }">供应商管理</el-breadcrumb-item>
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
        label="操作" width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="Origin"
        label="单位名称"
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
        width="80">
        <template scope="scope">
          <el-tag
            :type="scope.row.nature === 0 ? 'primary' : 'success'"
            close-transition>{{scope.row.nature===0 ? '供应商' : '收购商'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="Address"
        label="地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="Remark"
        label="备注"
        width="200">
      </el-table-column>
    </el-table>
    </div>
    <el-dialog :title="title" v-model="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商名称" prop="Origin" required>
              <el-input v-model="ruleForm.Origin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性质" prop="nature">
              <el-select v-model="ruleForm.nature" placeholder="请选择供应商性质" @change='typeChange'>
                <el-option
                  v-for="item in natures"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="Contacts">
              <el-input v-model="ruleForm.Contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone" >
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="联系地址" prop="Address">
              <el-input v-model="ruleForm.Address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="标签" prop="tag">
              <el-input v-model="ruleForm.tag"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="Remark">
              <el-input v-model="ruleForm.Remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.getSupplier()
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
      this.dialogFormVisible = true
      this.opt = 'new'
    },
    typeChange (value) {
    },
    getSupplier () {
      let vm = this
      let uri = 'http://localhost:' + 8002 + vm.apiUrl
      vm.$http.get(uri).then((response) => {
        console.log(response)
        if (response.ok) vm.tableData = response.body.data
      })
      .catch((response) => {
        console.log(response)
      })
    },
    submitForm (formName) {
      let vm = this
      let url = 'create'
      if (this.opt === 'edit') url = 'modify'
      let uri = 'http://localhost:' + 8002 + vm.apiUrl + url
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var promise = vm.$http.post(uri, vm.ruleForm)
          promise.then((response) => {
            if (response.ok) {
              this.$message({showClose: true, message: '操作成功:' + response.statusText, type: 'success'})
              vm.getSupplier()
            }
          })
          .catch((response) => {
            this.$message({showClose: true, message: '操作失败:' + response.statusText, type: 'error'})
          })
          this.dialogFormVisible = false
        } else {
          this.$message({showClose: true, message: '表单验证失败!', type: 'error'})
          return false
        }
      })
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.opt = 'edit'
      this.ruleForm = {
        id: row._id,
        Origin: row.Origin,
        nature: row.nature,
        Contacts: row.Contacts,
        phone: row.phone,
        Address: row.Address,
        Remark: row.Remark,
        tag: row.tag
      }
      this.title = '雏鸡批次维护--修改'
    },
    handleDelete (index, row) {

    },
    closeDialog () {
      this.show = false
    }
  },
  data () {
    return {
      tableData: [],
      title: '供应商维护--新增',
      dialogFormVisible: false,
      ruleForm: {
        Origin: '',
        nature: '',
        typeName: '',
        Contacts: '',
        phone: '',
        Address: '',
        Remark: '',
        tag: ''
      },
      natures: [
        {
          value: '0',
          label: '供应商'
        },
        {
          value: '1',
          label: '收购商'
        }],
      rules: {
        Origin: [
          { type: 'string', required: true, message: '请填写供应商名称', trigger: 'change' }
        ],
        nature: [
          { type: 'string', required: true, message: '请选择供应商性质', trigger: 'change' }
        ]
      },
      apiUrl: '/api/supplier/'
    }
  }
}
</script>

<style>

</style>
