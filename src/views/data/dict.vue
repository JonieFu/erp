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
            ><el-form-item label="字典名称" label-width="70px" prop="字典名称"
              ><el-input
                v-model="SearchForm['字典名称']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="字典类型" label-width="70px" prop="字典类型"
              ><el-input
                v-model="SearchForm['字典类型']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="状态" label-width="70px" prop="状态"
              ><el-input v-model="SearchForm['状态']"></el-input></el-form-item
          ></el-col>
          <el-col :span="5"
            ><el-form-item label="创建时间" label-width="70px" prop="创建时间">
              <el-date-picker
                style="width: 240px"
                v-model="SearchForm['创建时间']"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker> </el-form-item
          ></el-col>
          <el-col :span="3">
            <el-button type="primary" size="mini" @click="search"
              >搜索</el-button
            >
            <el-button type="warning" size="mini" @click="reset"
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
            <el-button type="success" size="mini" @click="modifyDict"
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
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
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
          ref="addform"
          :model="adddictlist"
          label-width="150px"
          size="small"
        >
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input
              style="width: 90%"
              v-model="adddictlist[value]"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDictDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
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
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input
              style="width: 90%"
              v-model="editdictlist.dictNum"
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
      tableTitle: [
        '字典编号',
        '字典名称',
        '字典类型',
        '状态',
        '备注',
        '创建时间',
      ],
      SearchForm: {
        字典名称: '',
        字典类型: '',
        状态: '',
        创建时间: [],
      },
      tableList: [],
      adddictlist: {
        字典编号: '',
        字典名称: '',
        字典类型: '',
        状态: '',
        备注: '',
        创建时间: '',
      },
      currentPage: 1,
      addDictDialogVisible: false,
      editDictDialogVisible: false,
      tableAmountData: [],
      editdictlist: {
        字典编号: '',
        字典名称: '',
        字典类型: '',
        状态: '',
        备注: '',
        创建时间: '',
      },
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        字典编号: '1',
        字典名称: '用户性别',
        字典类型: 'sys_user_sex',
        状态: '正常',
        备注: '用户性别列表',
        创建时间: '2021-03-05 14:10:06',
      },
    ]
  },
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

    handleSelectionChange(val) {
      this.tableAmountData = val
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
    addSubmit() {
      this.addDictDialogVisible = false
      this.$refs.addform.resetFields()
    },
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