<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>BOM清单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="searchRef" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col
            :span="4"
            v-for="(value, key, index) in SearchForm"
            :key="index"
            ><el-form-item :label="key" label-width="100px" :prop="key"
              ><el-input v-model="SearchForm[key]"></el-input></el-form-item
          ></el-col>
          <el-col :span="3">
            <el-button type="primary" size="small">搜索</el-button>
            <el-button type="warning" size="mini" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-row :gutter="30">
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addBOM"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="success" size="mini" @click="modifyBOM"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteBOM"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableAmountData="tableAmountData"
              :tableTitle="tableTitle"
              :fileName="'BOM清单'"
            ></Export>
          </el-col>
          <el-col :span="1">
            <Upload
              class="upload"
              :tableData="tableList"
              title="导入"
              style="margin-left: 25px"
              @update:tableData="uploadData"
            ></Upload>
          </el-col>
        </el-row>
        <el-table
          :data="tableList"
          border
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(row, $index)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="remove($index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="aa">总共{{ tableList.length }}条记录</div>
      </el-card>
      <el-dialog
        title="添加BOM清单"
        :visible.sync="addBomDialogVisible"
        width="50%"
      >
        <div class="el-dialog-div">
          <el-form
            ref="addform"
            :model="addForm"
            label-width="150px"
            size="small"
          >
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
          <el-button @click="addBomDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑BOM清单"
        :visible.sync="editBomDialogVisible"
        width="50%"
      >
        <div class="el-dialog-div">
          <el-form :model="editForm" label-width="150px" size="small">
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
          <el-button @click="editBomDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import Upload from '@/components/upload.vue'
import Export from '@/components/export.vue'
export default {
  components: { Export, Upload },
  data() {
    return {
      SearchForm: {
        BOM编号: '',
        销售订单编号: '',
        销售订单名称: '',
        物料名称: '',
        规格型号: '',
      },
      tableTitle: [
        'BOM编号',
        '销售订单编号',
        '销售订单名称',
        '物料名称',
        '规格型号',
        '规格型号',
        '生产用量',
        '计价单位',
      ],

      tableList: [],

      addBomDialogVisible: false,
      editBomDialogVisible: false,
      addForm: {
        BOM编号: '',
        销售订单编号: '',
        销售订单名称: '',
        物料名称: '',
        规格型号: '',
        规格型号: '',
        生产用量: '',
        计价单位: '',
      },
      editForm: {
        BOM编号: '',
        销售订单编号: '',
        销售订单名称: '',
        物料名称: '',
        规格型号: '',
        规格型号: '',
        生产用量: '',
        计价单位: '',
      },
      tableAmountData: [],
    }
  },
  created() {},
  methods: {
    uploadData(value) {
      this.tableList = value
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    modifyBOM() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editForm = this.tableAmountData[0]
        this.editBomDialogVisible = true
      }
    },
    deleteBOM() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    remove(index) {
      this.tableList.splice(index, 1)
    },
    edit(data) {
      console.log(data)
      this.editForm = data
      console.log(this.editForm)
      this.editBomDialogVisible = true
    },
    reset() {
      this.$refs.searchRef.resetFields()
    },
    addBOM() {
      this.addBomDialogVisible = true
    },
    addSubmit() {
      this.addBomDialogVisible = false
      this.$refs.addform.resetFields()
    },
    editSubmit() {
      this.editBomDialogVisible = false
    },
  },
  mounted() {
    this.tableList = [
      {
        BOM编号: '111111',
        销售订单编号: 'djas123',
        销售订单名称: 'asd1234',
        物料名称: '纽扣',
        规格型号: 'bmh25*25',
        生产用量: '1000',
        计价单位: '元',
      },
      {
        BOM编号: '111111',
        销售订单编号: 'djas123',
        销售订单名称: 'asd1234',
        物料名称: '纽扣',
        规格型号: 'bmh25*25',
        生产用量: '1000',
        计价单位: '元',
      },
      {
        BOM编号: '111111',
        销售订单编号: 'djas123',
        销售订单名称: 'asd1234',
        物料名称: '纽扣',
        规格型号: 'bmh25*25',
        生产用量: '1000',
        计价单位: '元',
      },
    ]
  },
}
</script>
<style lang="scss" scoped>
.aa {
  margin-top: 10px;
}
.el-dialog-div {
  height: 500px;
  overflow: auto;
}
</style>