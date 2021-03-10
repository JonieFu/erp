<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="employeeForm" label-width="80px" size="small">
        <el-row :gutter="30">
          <el-col :span="5"
            ><el-form-item label="员工姓名"
              ><el-input
                clearable
                v-model="employeeForm['员工姓名']"
                placeholder=""
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="5"
            ><el-form-item label="员工账号"
              ><el-input
                clearable
                v-model="employeeForm['员工账号']"
                placeholder=""
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="14">
            <el-button icon="el-icon-search" type="primary" size="small"
              >搜索</el-button
            >
          </el-col>
        </el-row></el-form
      >
      <el-row type="flex" align="center">
        <el-col :span="1">
          <el-button type="primary" size="mini" @click="addEmployee"
            >添加</el-button
          >
        </el-col>
        <el-col :span="1">
          <Export
            :tableAmountData="tableAmountData"
            :tableTitle="tableTitle"
            fileName="员工"
          >
          </Export>
        </el-col>
        <el-col :span="1">
          <Upload
            style="margin-left: 50px"
            :title="'导入'"
            :tableData="tableList"
          ></Upload>
        </el-col>
      </el-row>
      <el-table
        :data="tableList"
        border
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="selection" align="center"> </el-table-column>
        <el-table-column
          align="center"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          v-for="(value, key) in tableTitle"
          :label="value"
          :prop="value"
          :key="key"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="140px">
          <template slot-scope="{ row, $index }">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="edit(row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="removeData($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="29"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加员工"
      :visible.sync="addEmployeeDialogVisible"
      width="50%"
    >
      <div>
        <el-form :model="addForm" ref="employeeAddForm" label-width="70px">
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          >
            <el-input v-model="addForm[value]" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="editEmployeeDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="form" :model="editForm" label-width="150px" size="small">
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          >
            <el-input v-model="editForm[value]" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editEmployeeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Upload from '@/components/upload.vue'
import Export from '@/components/export.vue'
export default {
  components: {
    Upload,
    Export,
  },
  data() {
    return {
      employeeForm: {
        员工姓名: '',
        员工账号: '',
      },
      tableTitle: [
        '姓名',
        '账号',
        '岗位',
        '所属部门',
        '电话',
        '邮箱',
        '住址',
        '入职时间',
        '状态',
      ],
      tableAmountData: [],
      tableList: [],
      addForm: {
        姓名: '',
        账号: '',
        岗位: '',
        所属部门: '',
        电话: '',
        邮箱: '',
        状态: '',
        住址: '',
        入职时间: '',
      },
      editForm: {
        姓名: '',
        账号: '',
        岗位: '',
        所属部门: '',
        电话: '',
        邮箱: '',
        状态: '',
        住址: '',
        入职时间: '',
      },
      addEmployeeDialogVisible: false,
      editEmployeeDialogVisible: false,
      currentPage: 1,
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        姓名: '王小虎',
        账号: '4232423524',
        岗位: '职工',
        所属部门: '项目管理',
        电话: '17866234',
        邮箱: 'wangxiaohu@gmail.com',
        状态: '离职',
        住址: '上海市普陀区金沙江路 1518 弄',
        入职时间: '2020-10-23',
      },
      {
        姓名: '王小虎',
        账号: '4232423524',
        岗位: '职工',
        所属部门: '项目管理',
        电话: '17866234',
        邮箱: 'wangxiaohu@gmail.com',
        状态: '在职',
        住址: '上海市普陀区金沙江路 1518 弄',
        入职时间: '2020-10-23',
      },
    ]
  },
  methods: {
    addEmployee() {
      this.addEmployeeDialogVisible = true
    },
    addSubmit() {
      this.addEmployeeDialogVisible = false
      this.$refs.employeeAddForm.resetFields()
    },
    edit(data) {
      this.editForm = data
      this.editEmployeeDialogVisible = true
    },
    editSubmit() {
      this.editEmployeeDialogVisible = false
    },
    removeData(index) {
      this.tableList.splice(index, 1)
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>