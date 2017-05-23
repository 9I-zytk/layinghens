<template>
  <div class="container">
    <div class="div-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >饲料管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/fullPrice' }">全价料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tool-bar">
      <el-date-picker
        v-model="queryDate"
        type="daterange"
        placeholder="选择日期范围"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button-group>
        <el-button type="primary" icon="search" @click="getRecord">查询</el-button>
        <!--<el-button type="primary" icon="search" @click="getRecordAll">查询所有</el-button>-->
        <el-button type="primary" icon="plus" @click="optNew">新增</el-button>
      </el-button-group>
    </div>
    <div class="data-table">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
          type="index"
          width="40">
        </el-table-column>
        <el-table-column
          label="操作" width="75">
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="batchName"
          label="批次"
          min-width="100">
          <template scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>类型: {{ currentBatch.type.typeName }}</p>
              <p>蛋鸡数: {{ scope.row.batchName.henAmount }}</p>
              <p>疫损: {{ scope.row.batchName.lossAmount }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.batchName.batchName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="saleDate"
          label="交易日期"
          min-width="150">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{formatDate(scope.row.saleDate)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="总金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量(KG)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="数量(袋)"
          width="100">
        </el-table-column>
        <el-table-column
          prop="Origin.Origin"
          label="供应商"
          min-width="120">
        </el-table-column>
      </el-table>
    </div>
    <div class="block b-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNo"
        :page-sizes="[25, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="title" v-model="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="批次" prop="batchName">
              <el-select v-model="ruleForm.batchName" placeholder="请选择批次" :disabled="true">
                <el-option
                  v-for="item in batchs"
                  :label="item.batchName"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="saleDate" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.saleDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="供应商" prop="Origin">
              <el-select v-model="ruleForm.Origin" placeholder="请选择供应商">
                <el-option
                  v-for="item in supplierList"
                  :label="item.Origin"
                  :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="数量" prop="quantity" required>
              <el-input-number v-model="ruleForm.quantity" :min="0" :max="100000"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重量" prop="weight">
              <el-input-number v-model="ruleForm.weight" :min="0" :max="100000" :controls='false'></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单价" prop="price" required>
              <el-input-number v-model="ruleForm.price" :min="0" :max="100000" :controls='false'></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总金额" prop="amount" required>
              <el-input-number v-model="ruleForm.amount" :min="0" :max="100000"></el-input-number>
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
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import moment from 'moment'
  export default {
    mounted: function () {
      this.getBatch()
      this.getRecord()
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
        this.title = '全价料--新增'
        this.ruleForm = {
          batchName: this.currentBatch._id,
          saleDate: new Date(),
          price: 0.00,
          weight: 0,
          quantity: 0,
          amount: 0.00,
          Origin: '',
          Remark: ''
        }
      },
      getRecord () {
        let vm = this
        let uri = vm.apiUrl
        let end = moment().add('days', 1).format('YYYY-MM-DD')
        let start = moment().add('days', -6).format('YYYY-MM-DD')
        if (vm.queryDate.length === 2) {
          start = moment(vm.queryDate[0]).format('YYYY-MM-DD')
          end = moment(vm.queryDate[1]).add('days', 1).format('YYYY-MM-DD')
        }
        const beginDate = moment(start, 'yyyy-MM-dd')
        const endDate = moment(end, 'yyyy-MM-dd')
        uri = uri + vm.pageNo + '/' + vm.pageSize + '/' + beginDate._i + '/' + endDate._i
        vm.$http.get(uri).then((response) => {
          if (response.ok) {
            vm.tableData = response.body.data
            vm.total = response.body.total
          }
        })
          .catch((response) => {
            console.log(response)
          })
      },
      getBatch () {
        let vm = this
        let uri = '/api/' + 'info/'
        vm.$http.get(uri).then((response) => {
          if (response.ok) {
            vm.batchs = response.body.henBatch
            vm.currentBatch = vm.batchs[0]
            vm.ruleForm.batchName = vm.currentBatch._id
          }
        })
          .catch((response) => {
            console.log(response)
          })
      },
      getSupplier () {
        let vm = this
        let uri = '/api/supplier/'
        vm.$http.get(uri).then((response) => {
          if (response.ok) vm.supplierList = response.body.data
        })
          .catch((response) => {
            console.log(response)
          })
      },
      submitForm (formName) {
        let vm = this
        let url = 'create'
        if (this.opt === 'edit') url = 'modify'
        let uri = vm.apiUrl + url
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.ruleForm.saleDate = moment(vm.ruleForm.saleDate).format('YYYY-MM-DD')
            const promise = vm.$http.post(uri, vm.ruleForm)
            promise.then((response) => {
              if (response.ok) {
                this.$message({showClose: true, message: '操作成功:' + response.statusText, type: 'success'})
                vm.getRecord()
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
          batchName: row.batchName._id,
          saleDate: new Date(row.saleDate),
          price: row.price,
          quantity: row.quantity,
          weight: row.weight,
          amount: row.amount,
          Origin: row.Origin._id,
          Remark: row.Remark
        }
        this.title = '全价料--修改'
      },
      formatDate (value) {
        return moment(value).format('YYYY-MM-DD')
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.getRecord()
      },
      handleCurrentChange (val) {
        this.pageNo = val
        this.getRecord()
        console.log(`当前页: ${val}`)
      },
      closeDialog () {
        this.show = false
      }
    },
    data () {
      return {
        tableData: [],
        pageNo: 1,
        pageSize: 25,
        batchs: [],
        total: 0,
        supplierList: [],
        currentBatch: {},
        title: '全价料--新增',
        dialogFormVisible: false,
        queryDate: [],
        ruleForm: {
          batchName: '',
          saleDate: new Date(),
          price: 0.00,
          quantity: 0,
          weight: 0,
          amount: 0.00,
          Origin: '',
          Remark: ''
        },
        rules: {
          saleDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          Origin: [
            { type: 'string', required: true, message: '请选择供应商', trigger: 'change' }
          ],
          quantity: [
            { type: 'number', required: true, message: '请填写购买包数', trigger: 'change' }
          ],
          weight: [
            { type: 'number', required: true, message: '请填写重量', trigger: 'change' }
          ],
          amount: [
            { type: 'number', required: true, message: '请填写总金额', trigger: 'change' }
          ]
        },
        apiUrl: '/api/fullFeed/',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    }
  }
</script>
