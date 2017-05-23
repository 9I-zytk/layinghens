<template>
  <div class="container">
    <div class="div-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >基础信息采集</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/info' }">批次信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tool-bar">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="optNew">新增</el-button>
        <el-button type="primary" icon="share"></el-button>
        <el-button type="primary" icon="delete"></el-button>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" icon="arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
    <div class="data-table">
      <el-table
      :data="tableData"
      border
      style="width: 100%;"
      height=""
      highlight-current-row
      :row-class-name="tableRowClassName">
      <el-table-column
        label="操作" width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">完结</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="batchName"
        label="批次"
        min-width="150">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="80">
        <template scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>供应商: {{ scope.row.type.Origin }}</p>
            <p>联系电话: {{ scope.row.type.phone }}</p>
            <p>联系人: {{ scope.row.type.Contacts }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.type.typeName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdDay"
        label="开始时间"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="finishDay"
        label="结束时间"
        min-width="160">
      </el-table-column>
      <el-table-column
        prop="stage"
        label="状态"
        width="80">
        <template scope="scope">
          <el-tag
            :type="scope.row.stageId === 3 ? 'primary' : 'success'"
            close-transition>{{scope.row.stage.stageName}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        label="总数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="henAmount"
        label="蛋鸡数"
        width="90">
      </el-table-column>
      <el-table-column
        prop="lossAmount"
        label="疫损"
        width="80">
      </el-table-column>
    </el-table>
    </div>
    <el-dialog :title="title" v-model="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="批次名称" prop="batchName">
              <el-input v-model="ruleForm.batchName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择蛋鸡种类" @change='typeChange'>
                <el-option
                  v-for="item in henTypes"
                  :label="item.typeName"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="批次日期" required prop="createTime">
              <el-date-picker type="date" @change='dateChange' placeholder="选择开始日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="阶段" prop="stage">
              <el-select v-model="ruleForm.stage" placeholder="请选择蛋鸡种类">
                <el-option
                  v-for="item in stages"
                  :label="item.stageName"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总数" prop="total" required>
              <el-input-number v-model="ruleForm.total" :min="1" :max="100000"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="蛋鸡数" prop="henAmount" >
              <el-input-number v-model="ruleForm.henAmount" :min="1" :max="100000"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总价格" prop="totalPrice" required>
              <el-input-number v-model="ruleForm.totalPrice" :min="0" :max="100000"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="疫损数" prop="lossAmount" >
              <el-input-number v-model="ruleForm.lossAmount" :disabled="true"></el-input-number>
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
    <el-dialog title="蛋鸡批次维护--淘汰" v-model="dialogFinish">
      <el-form :model="finishForm" :rules="ruleFinish" ref="finishForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="批次名称" prop="batchName">
              <el-input v-model="finishForm.batchName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select v-model="finishForm.type" placeholder="请选择蛋鸡种类" @change='typeChange' :disabled="true">
                <el-option
                  v-for="item in henTypes"
                  :label="item.typeName"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="批次日期" prop="createTime">
              <el-date-picker type="date" @change='dateChange' placeholder="选择开始日期" v-model="finishForm.createTime" style="width: 100%;" :disabled="true"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="淘汰日期" prop="finishTime" required>
              <el-date-picker type="date" placeholder="选择开始日期" v-model="finishForm.finishTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="淘汰总数" prop="sellAmount">
              <el-input-number v-model="finishForm.sellAmount" :min="0" :max="100000"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="淘汰总重" prop="sellTotalWeight" required>
              <el-input-number v-model="finishForm.sellTotalWeight" :min="0" :max="100000"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="淘汰单价" prop="sellPrice" required>
              <el-input-number v-model="finishForm.sellPrice" :min="0" :max="100000"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="淘汰总价" prop="sellTotalPrice" required>
              <el-input-number v-model="finishForm.sellTotalPrice" :min="0" :max="300000"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFinish = false">取 消</el-button>
        <el-button type="primary" @click="submitFinishForm('finishForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  mounted: function () {
    this.getData()
    this.getHenType()
    this.getStage()
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
      let uri = 'http://localhost:' + 8002 + vm.apiUrl + 'info/'
      vm.$http.get(uri).then((response) => {
        if (response.ok) {
          vm.tableData = response.body.henBatch
          vm.total = response.body.total
        }
      })
      .catch((response) => {
        console.log(response)
      })
    },
    getStage () {
      let vm = this
      let uri = 'http://localhost:' + 8002 + vm.apiUrl + 'stage'
      vm.$http.get(uri).then((response) => {
        if (response.ok) {
          vm.stages = response.body.data
        }
      })
      .catch((response) => {
        console.log(response)
      })
    },
    getHenType () {
      let vm = this
      let uri = 'http://localhost:' + 8002 + vm.apiUrl + 'henType/'
      vm.$http.get(uri).then((response) => {
        if (response.ok) {
          vm.henTypes = response.body.data
        }
      })
      .catch((response) => {
        console.log(response)
      })
    },
    handleEdit (index, row) {
      this.dialogFormVisible = true
      this.opt = 'edit'
      this.ruleForm = {
        id: row._id,
        batchName: row.batchName,
        stage: row.stage._id,
        type: row.type._id,
        createTime: new Date(row.createTime),
        finishTime: '',
        total: row.total,
        henAmount: row.henAmount,
        totalPrice: row.totalPrice,
        lossAmount: row.lossAmount,
        createdBy: ''
      }
      this.title = '雏鸡批次维护--修改'
    },
    handleDelete (index, row) {
      this.dialogFinish = true
      this.finishForm = {
        id: row._id,
        batchName: row.batchName,
        stage: '586e68efdd311a2b146f77f1',
        type: row.type._id,
        createTime: new Date(row.createTime),
        finishTime: '',
        total: row.total,
        henAmount: row.henAmount,
        totalPrice: row.totalPrice,
        lossAmount: row.lossAmount,
        sellAmount: 0,
        sellPrice: 0.00,
        sellTotalPrice: 0,
        sellTotalWeight: 0
      }
    },
    optNew () {
      this.dialogFormVisible = true
      this.opt = 'new'
      this.title = '雏鸡批次维护--新增'
      this.ruleForm = {
        batchName: '',
        stage: '',
        type: '',
        createTime: '',
        finishTime: '',
        total: 0,
        henAmount: 0,
        totalPrice: 0,
        lossAmount: 0,
        createdBy: ''
      }
    },
    typeChange (value) {
      if (!this.ruleForm.createTime) return false
      const date = new Date(this.ruleForm.createTime)
      let sType = 'Y'
      if (value && value === '586e6a74093bad1e242ab811') sType = 'T'
      this.ruleForm.batchName = sType + date.getFullYear() + '年' + (date.getMonth() + 1) + '月'
    },
    dateChange (value) {
      const date = new Date(value)
      let sType = 'Y'
      if (this.ruleForm.type && this.ruleForm.type === '586e6a74093bad1e242ab811') sType = 'T'
      this.ruleForm.batchName = sType + date.getFullYear() + '年' + (date.getMonth() + 1) + '月'
    },
    submitFinishForm (formName) {
      let vm = this
      let uri = 'http://localhost:' + 8002 + vm.apiUrl + 'info/modify'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const promise = vm.$http.post(uri, vm.finishForm)
          promise.then((response) => {
            if (response.ok) {
              this.$message({showClose: true, message: '操作成功:' + response.statusText, type: 'success'})
              vm.getData()
            }
          })
          .catch((response) => {
            this.$message({showClose: true, message: '操作失败:' + response.statusText, type: 'error'})
            console.log(response.statusText)
          })
          this.dialogFinish = false
        } else {
          this.$message({showClose: true, message: '表单验证失败!', type: 'error'})
          return false
        }
      })
    },
    submitForm (formName) {
      let vm = this
      let url = 'info/create'
      if (this.opt === 'edit') url = 'info/modify'
      let uri = 'http://localhost:' + 8002 + vm.apiUrl + url
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var promise = vm.$http.post(uri, vm.ruleForm)
          promise.then((response) => {
            if (response.ok) {
              this.$message({showClose: true, message: '操作成功:' + response.statusText, type: 'success'})
              vm.getData()
            }
          })
          .catch((response) => {
            this.$message({showClose: true, message: '操作失败:' + response.statusText, type: 'error'})
            console.log(response.statusText)
          })
          this.dialogFormVisible = false
        } else {
          this.$message({showClose: true, message: '表单验证失败!', type: 'error'})
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  data () {
    return {
      tableData: [],
      total: 0,
      apiUrl: '/api/',
      stages: [],
      henTypes: [],
      dialogFinish: false,
      dialogFormVisible: false,
      finishForm: {},
      ruleForm: {
        batchName: '',
        stage: '',
        type: '',
        createTime: '',
        finishTime: '',
        total: 0,
        henAmount: 0,
        totalPrice: 0.00,
        lossAmount: 0,
        createdBy: ''
      },
      rules: {
        createTime: [
          { type: 'date', required: true, message: '请选择开始日期', trigger: 'change' }
        ],
        type: [
          { type: 'string', required: true, message: '请选择一个类型', trigger: 'change' }
        ],
        total: [
          { type: 'number', required: true, message: '请填写该批次总数', trigger: 'blur' }
        ],
        totalPrice: [
          { type: 'number', required: true, message: '请填写该批次总价格', trigger: 'blur' }
        ]
      },
      ruleFinish: {
        finishTime: [
          { type: 'date', required: true, message: '请选择淘汰日期', trigger: 'change' }
        ],
        sellPrice: [
          { type: 'number', required: true, message: '请填写该批次淘汰单价', trigger: 'blur' }
        ],
        sellTotalPrice: [
          { type: 'number', required: true, message: '请填写该批次淘汰总价', trigger: 'blur' }
        ],
        sellTotalWeight: [
          { type: 'number', required: true, message: '请填写该批次总重量', trigger: 'blur' }
        ]
      },
      title: '雏鸡批次维护--新增'
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
   height:25px;
   margin:15px;
  }
  .tool-bar
  {
    padding:10px;
    margin:5px;
    background-color:white;
  }
</style>
