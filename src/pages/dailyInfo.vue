<template>
  <div class="container">
    <div class="div-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item >蛋鸡管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/dailyInfo' }">日产蛋信息</el-breadcrumb-item>
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
        <el-button type="primary" icon="search" @click="getDaily">查询</el-button>
        <!--<el-button type="primary" icon="search" @click="getDailyAll">查询所有</el-button>-->
        <el-button type="primary" icon="plus" @click="optNew">新增</el-button>
        <el-button type="primary" icon="share">产蛋周报表</el-button>
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
          </template>
        </el-table-column>
        <el-table-column
          prop="batchName"
          label="批次"
          min-width="150">
          <template scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>类型: {{ scope.row.batchName.type }}</p>
              <p>蛋鸡数: {{ scope.row.batchName.henAmount }}</p>
              <p>疫损: {{ scope.row.batchName.lossAmount }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.batchName.batchName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          min-width="150">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{formatDate(scope.row.date)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="eggs"
          label="产蛋数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="layingRate"
          label="产蛋率"
          width="100">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="评价"
          width="100">
          <template scope="scope">
            <el-tag
              :type="formatRate(scope.row.layingRate) > 90 ? 'primary' : 'success'"
              close-transition>{{formatRate(scope.row.layingRate) > 90 ? '优秀':'合格'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="Remark"
          label="备注"
          min-width="200">
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
            <el-form-item label="日期" prop="date" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产蛋" prop="eggs" required>
              <el-input-number v-model="ruleForm.eggs" :min="0" :max="100000" :disabled="true"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产蛋率" prop="layingRate">
              <el-input v-model="ruleForm.layingRate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="产蛋" prop="eggs" required>
              <el-input-number v-model="eggNum.pieces" size="small" :min="0" :max="20" @change='piecesChange'></el-input-number>
              <label class="text">件</label>
              <el-input-number v-model="eggNum.tray" size="small" :min="0" :max="11" @change='trayChange'></el-input-number>
              <label class="text">盘</label>
              <el-input-number v-model="eggNum.piece" size="small" :min="0" :max="29" @change='pieceChange'></el-input-number>
              <label class="text">个</label>
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
      this.getDaily()
      this.getBatch()
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
        this.title = '日产蛋记录--新增'
      },
      getDaily () {
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
        console.log(beginDate._i, endDate._i)
        uri = uri + beginDate._i + '/' + endDate._i + '/' + vm.pageNo + '/' + vm.pageSize
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
      getDailyAll () {
        let vm = this
        let uri = vm.apiUrl
        uri = uri + 'all'
        vm.$http.get(uri).then((response) => {
          if (response.ok) vm.tableData = response.body.data
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
      piecesChange (value) {
        const vm = this
        vm.eggNum.pieces = value
        vm.ruleForm.eggs = value * 360 + vm.eggNum.tray * 30 + vm.eggNum.piece
        vm.countRate()
      },
      formatRate (value) {
        return Number(value.replace('%', ''))
      },
      trayChange (value) {
        const vm = this
        vm.eggNum.tray = value
        vm.ruleForm.eggs = vm.eggNum.pieces * 360 + value * 30 + vm.eggNum.piece
        vm.countRate()
      },
      pieceChange (value) {
        const vm = this
        vm.eggNum.piece = value
        vm.ruleForm.eggs = vm.eggNum.pieces * 360 + vm.eggNum.tray * 30 + value
        vm.countRate()
      },
      countRate () {
        let vm = this
        let count = vm.currentBatch.henAmount - vm.currentBatch.lossAmount
        let rate = vm.ruleForm.eggs * 100 / count
        vm.ruleForm.layingRate = rate.toFixed(2) + '%'
      },
      submitForm (formName) {
        let vm = this
        let url = 'create'
        if (this.opt === 'edit') url = 'modify'
        let uri = vm.apiUrl + url
        this.$refs[formName].validate((valid) => {
          if (valid) {
            vm.ruleForm.date = moment(vm.ruleForm.date).format('YYYY-MM-DD')
            const promise = vm.$http.post(uri, vm.ruleForm)
            promise.then((response) => {
              if (response.ok) {
                this.$message({showClose: true, message: '操作成功:' + response.statusText, type: 'success'})
                vm.getDaily()
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
          batchName: row.batchName,
          date: new Date(row.date),
          eggs: row.eggs,
          layingRate: row.layingRate,
          Remark: row.Remark
        }
        this.setEggNum(row.eggs)
        this.title = '日产蛋记录--修改'
      },
      setEggNum (eggs) {
        this.eggNum.pieces = Math.floor(eggs / 360)
        this.eggNum.tray = Math.floor((eggs - this.eggNum.pieces * 360) / 30)
        this.eggNum.piece = eggs - this.eggNum.pieces * 360 - this.eggNum.tray * 30
      },
      formatDate (value) {
        const date = moment(value).format('YYYY-MM-DD')
        return date
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.getDaily()
      },
      handleCurrentChange (val) {
        this.pageNo = val
        this.getDaily()
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
        currentBatch: {},
        title: '日产蛋--新增',
        dialogFormVisible: false,
        eggNum: {
          pieces: 0,
          tray: 0,
          piece: 0
        },
        queryDate: [],
        ruleForm: {
          batchName: '',
          date: new Date(),
          eggs: 0,
          layingRate: 0,
          Remark: ''
        },
        rules: {
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          eggs: [
            { type: 'number', required: true, message: '请填写产蛋总数', trigger: 'blur' }
          ]
        },
        apiUrl: '/api/daily/',
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
<style lang="css">
  label.text{
    display: inline-block;
    text-align: left;
    vertical-align:middle;
    font-size: 14px;
    color: #5e6d82;
    line-height: 1;
    padding: 11px 5px 11px 5PX;
    box-sizing: border-box;
    margin-top: -20px;
}
  .b-pagination
  {
    margin-top: 15px;
    padding-right: 25px;
    float: right;
  }
</style>
