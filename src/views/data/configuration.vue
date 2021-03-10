<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据配置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="searchForm" label-width="60px" size="small">
        <el-row :gutter="10">
          <el-col :span="6"
            ><el-form-item label="表名称">
              <el-input
                v-model="searchForm['表名称']"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" size="small"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-row>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addData"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyData"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteData"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableTitle="tableTitle"
              :tableAmountData="tableAmountData"
              fileName="基础数据配置"
            ></Export>
          </el-col>
          <el-col :span="1">
            <Upload
              class="upload"
              action="https://www.liulongbin.top:8888/api/private/v1"
              title="导入"
              :tableData="tableList"
              style="margin-left: 30px"
            ></Upload>
          </el-col>
        </el-row>
        <el-table
          border
          :data="tableList"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            v-for="(value, key) in tableTitle"
            :prop="value"
            :label="value"
            :key="key"
          >
          </el-table-column>
          <el-table-column align="center" label="操作"
            ><template slot-scope="{ row, $index }"
              ><el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="edit(row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="remove($index)"
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
    </el-card>
    <el-dialog
      title="添加基础数据"
      :visible.sync="addDataDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="addform"
          :model="adddatalist"
          label-width="150px"
          size="small"
        >
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input
              v-model="adddatalist[value]"
              style="width: 90%"
              placeholder=""
            ></el-input
          ></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDataDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改基础数据"
      :visible.sync="editDataDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="editdatalist"
          label-width="150px"
          size="small"
        >
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input
              v-model="editdatalist[value]"
              style="width: 90%"
              placeholder=""
            ></el-input
          ></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDataDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Upload from '@/components/upload.vue'
import Export from '@/components/export.vue'

export default {
  components: { Upload, Export },
  data() {
    return {
      tableTitle: ['表名称', '业务描述', '创建用户', '创建时间', '状态'],
      searchForm: { 表名称: '' },
      tableList: [],
      adddatalist: {
        表名称: '',
        业务描述: '',
        创建用户: '',
        创建时间: '',
        状态: '',
      },
      editdatalist: {
        表名称: '',
        业务描述: '',
        创建用户: '',
        创建时间: '',
        状态: '',
      },
      currentPage: 1,
      addDataDialogVisible: false,
      editDataDialogVisible: false,
      tableAmountData: [],
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        表名称: 'sp_factory',
        业务描述: '工厂主数据',
        创建用户: 'admin',
        创建时间: '2021-1-4',
        状态: '正常',
      },
      {
        表名称: 'sp_factory',
        业务描述: '工厂主数据',
        创建用户: 'admin',
        创建时间: '2021-1-4',
        状态: '正常',
      },
      {
        表名称: 'sp_factory',
        业务描述: '工厂主数据',
        创建用户: 'admin',
        创建时间: '2021-1-4',
        状态: '正常',
      },
      {
        表名称: 'sp_factory',
        业务描述: '工厂主数据',
        创建用户: 'admin',
        创建时间: '2021-1-4',
        状态: '正常',
      },
    ]
  },
  methods: {
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    addData() {
      this.addDataDialogVisible = true
    },
    modifyData() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editdatalist = this.tableAmountData[0]
        console.log(this.editdatalist)
        this.editDataDialogVisible = true
      }
    },
    deleteData() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    edit(data) {
      console.log(data)
      this.editdatalist = data
      console.log(this.editdatalist)
      this.editDataDialogVisible = true
    },
    remove(index) {
      this.tableList.splice(index, 1)
    },

    addSubmit() {
      this.addDataDialogVisible = false
      this.$refs.addform.resetFields()
    },
    editsubmit() {
      this.editDataDialogVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
</style>