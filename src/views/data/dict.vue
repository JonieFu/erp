<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>字典设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="searcDicthRef" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="字典名称" label-width="70px" prop="dictName"
              ><el-input v-model="SearchForm.dictName"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="字典类型" label-width="70px" prop="dictType"
              ><el-input v-model="SearchForm.dictType"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="字典状态" label-width="70px" prop="dictStatus"
              ><el-input
                v-model="SearchForm.dictStatus"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="5"
            ><el-form-item label="创建时间" label-width="70px" prop="dictTime">
              <el-date-picker
                style="width: 240px"
                v-model="SearchForm.dictTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="3">
            <el-button type="primary" size="small" @click="search"
              >搜索</el-button
            >
            <el-button type="warning" size="small" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-row>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addDict"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyDict"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteDict"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableAmountData="tableAmountData"
              :tableTitle="tableTitle"
              fileName="字典"
            ></Export>
          </el-col>
        </el-row>
        <el-table
          :data="tableList"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            prop="dictNum"
            label="字典主键"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="dictName"
            label="字典名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="dictType"
            label="字典类型"
          ></el-table-column>
          <el-table-column align="center" prop="dictStatus" label="状态">
            <template slot-scope="{ row }">
              <el-tag v-if="row.dictStatus === 1"> 正常</el-tag>
              <el-tag v-if="row.dictStatus === 0" type="info"> 不正常</el-tag>
            </template></el-table-column
          >
          <el-table-column
            align="center"
            prop="Note"
            label="备注"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="dictTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="300px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(row, $index)"
                >编辑</el-button
              >
              <el-button
                type="warning"
                icon="el-icon-notebook-1"
                size="mini"
                @click="liebiao(row)"
                >列表
              </el-button>
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
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1"
        >
        </el-pagination>
      </el-card>
    </el-card>
    <el-dialog
      title="添加字典"
      :visible.sync="addDictDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="adddictlist"
          label-width="150px"
          size="small"
        >
          <el-form-item label="字典主键"
            ><el-input
              style="width: 90%"
              v-model="adddictlist.dictNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典名称"
            ><el-input
              style="width: 90%"
              v-model="adddictlist.dictName"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典类型"
            ><el-input
              style="width: 90%"
              v-model="adddictlist.dictType"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态"
            ><el-input
              style="width: 90%"
              v-model="adddictlist.dictStatus"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注"
            ><el-input
              style="width: 90%"
              v-model="adddictlist.Note"
            ></el-input> </el-form-item
          ><el-form-item label="创建时间"
            ><el-input
              style="width: 90%"
              v-model="adddictlist.dictNum"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改字典"
      :visible.sync="editDictDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="editdictlist"
          label-width="150px"
          size="small"
        >
          <el-form-item label="字典主键"
            ><el-input
              style="width: 90%"
              v-model="editdictlist.dictNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典名称"
            ><el-input
              style="width: 90%"
              v-model="editdictlist.dictName"
            ></el-input>
          </el-form-item>
          <el-form-item label="字典类型"
            ><el-input
              style="width: 90%"
              v-model="editdictlist.dictType"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态"
            ><el-input
              style="width: 90%"
              v-model="editdictlist.dictStatus"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注"
            ><el-input
              style="width: 90%"
              v-model="editdictlist.Note"
            ></el-input> </el-form-item
          ><el-form-item label="创建时间"
            ><el-input
              style="width: 90%"
              v-model="editdictlist.dictTime"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Export from '@/components/export.vue'
export default {
  components: { Export },
  data() {
    return {
      SearchForm: {
        dictName: '',
        dictType: '',
        dictStatus: '',
        dictTime: [],
      },
      tableList: [
        {
          dictNum: '1',
          dictName: '用户性别',
          dictType: 'sys_user_sex',
          dictStatus: 1,
          Note: '用户性别列表',
          dictTime: '2020-12-23',
        },
      ],
      tableTitle: [
        { label: '字典主键', prop: 'dictNum' },
        { label: '字典名称', prop: 'dictName' },
        { label: '字典类型', prop: 'dictType' },
        { label: '状态', prop: `dictStatus` },
        { label: '备注', prop: 'Note' },
        { label: '创建时间', prop: 'dictTime' },
      ],
      adddictlist: {
        dictNum: '',
        dictName: '',
        dictType: '',
        dictStatus: '',
        Note: '',
        dictTime: '',
      },
      currentPage: 1,
      addDictDialogVisible: false,
      editDictDialogVisible: false,
      tableAmountData: [],
      editdictlist: {
        dictNum: '',
        dictName: '',
        dictType: '',
        dictStatus: '',
        Note: '',
        dictTime: '',
      },
    }
  },
  created() {},
  methods: {
    liebiao(row) {
      this.$router.push({
        name: 'DictList',
        params: {
          dictName: row.dictName,
          dictStatus: row.dictStatus === 1 ? '正常' : '不正常',
        },
      })
    },
    exportData() {
      if (this.tableAmountData.length === 0) {
        this.$message({
          message: '请选择要导出数据',
          type: 'warning',
        })
        return
      } else {
        let allColumns = this.tableTitle
        var columnNames = []
        var columnValues = []
        for (var i = 0; i < allColumns.length; i++) {
          columnNames[i] = allColumns[i].label
          columnValues[i] = allColumns[i].prop
        }
        require.ensure([], () => {
          const {
            export_json_to_excel,
          } = require('../../vendor/Export2Excel.js')
          const tHeader = columnNames
          const filterVal = columnValues
          const list = this.tableAmountData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '字典设置')
        })
      }
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
    modifyDict() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editdictlist = this.tableAmountData[0]
        this.editDictDialogVisible = true
      }
    },
    deleteDict() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    submit() {},
    edit(data) {
      console.log(data)
      this.editdictlist = data
      console.log(this.editForm)
      this.editDictDialogVisible = true
    },
    remove(index) {
      this.tableList.splice(index, 1)
    },
    addDict() {
      this.addDictDialogVisible = true
    },

    reset() {
      this.$refs.searcDicthRef.resetFields()
    },
    search() {
      console.log(this.SearchForm)
    },
  },
}
</script>
<style lang="scss" scoped>
.list {
  text-decoration: none;
  color: white;
}
</style>