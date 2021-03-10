<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>公司管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="companyForm" label-width="80px" size="small">
        <el-row :gutter="10">
          <el-col :span="5"
            ><el-form-item label="公司名称"
              ><el-input v-model="companyForm['公司名称']"></el-input
            ></el-form-item>
          </el-col>
          <el-col :span="5"
            ><el-form-item label="公司编号"
              ><el-input v-model="companyForm['公司编号']"></el-input
            ></el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button size="small" type="primary" icon="el-icon-search"
              >搜索</el-button
            >
            <el-button
              size="small"
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="add"
              >添加</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableList">
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
        <el-table-column label="操作" align="center">
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
            ></el-button></template
        ></el-table-column>
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
      title="添加公司"
      :visible.sync="addFormDialogVisible"
      width="50%"
    >
      <div>
        <el-form :model="addForm" ref="companyAddForm" label-width="70px">
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
    <el-dialog title="编辑" :visible.sync="editFormDialogVisible" width="50%">
      <div>
        <el-form :model="editForm" label-width="70px">
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
        <el-button @click="addFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      companyForm: { 公司名称: '', 公司编号: '' },
      tableTitle: ['公司名称', '公司编号', '联系电话', '公司地址', '录入时间'],
      tableList: [],
      currentPage: 1,
      addForm: {
        公司名称: '',
        公司编号: '',
        联系电话: '',
        公司地址: '',
        录入时间: '',
      },
      addFormDialogVisible: false,
      editFormDialogVisible: false,
      editForm: {
        公司名称: '',
        公司编号: '',
        联系电话: '',
        公司地址: '',
        录入时间: '',
      },
    }
  },
  methods: {
    add() {
      this.addFormDialogVisible = true
    },
    addSubmit() {
      this.addFormDialogVisible = false
      this.$refs.companyAddForm.resetFields()
    },
    edit(data) {
      this.editForm = data
      this.editFormDialogVisible = true
    },
    editSubmit() {
      this.editFormDialogVisible = false
    },
    removeData(index) {
      this.tableList.splice(index, 1)
    },
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        公司名称: '北京京仪研究总院',
        公司编号: '4',
        公司地址: '北京市大兴区兴业街2号',
        联系电话: 1563565362,
        录入时间: '2020-10-25',
      },
      {
        公司名称: '北京京仪研究总院',
        公司编号: '4',
        公司地址: '北京市大兴区兴业街2号',
        联系电话: 1563565362,
        录入时间: '2020-10-25',
      },
      {
        公司名称: '北京京仪研究总院',
        公司编号: '4',
        公司地址: '北京市大兴区兴业街2号',
        联系电话: 1563565362,
        录入时间: '2020-10-25',
      },
      {
        公司名称: '北京京仪研究总院',
        公司编号: '4',
        公司地址: '北京市大兴区兴业街2号',
        联系电话: 1563565362,
        录入时间: '2020-10-25',
      },
    ]
  },
}
</script>
<style lang="scss" scoped>
</style>