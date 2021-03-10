<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>复校</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="fjForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="复校ID" label-width="60px" prop="fjid"
              ><el-input v-model="SearchForm.fjid"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="任务号" label-width="60px" prop="rwh"
              ><el-input v-model="SearchForm.rwh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="设备编号" label-width="70px" prop="cgddbh"
              ><el-input v-model="SearchForm.cgddbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="条码" label-width="40px" prop="tm"
              ><el-input v-model="SearchForm.tm"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addlibrary"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini">
              <a class="export" href="" download="haha.html">导出</a>
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableList"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            prop="fjid"
            label="复校ID"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="rwh"
            label="任务号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbbh"
            label="设备编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="tm"
            label="条码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gwh"
            label="工位号"
          ></el-table-column>
          <el-table-column align="center" prop="jl" label="结论">
            <template slot-scope="{ row }">
              <el-tag :type="row.jl === 1 ? '' : 'info'">{{
                row.jl === 1 ? '合格' : '不合格'
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="bhgyy"
            label="不合格原因"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jcrq"
            label="检测日期"
          ></el-table-column>

          <el-table-column align="center" label="操作" width="150px">
            <template slot-scope="">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                style="width: 50px; padding: 7px 0"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                style="width: 50px; padding: 7px 0"
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
      title="添加复校单"
      :visible.sync="addfjDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="fjdialogform" :model="addfjForm" label-width="130px">
          <el-form-item label="复校ID" prop="fjid"
            ><el-input v-model="addfjForm.fjid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="任务号" prop="rwh"
            ><el-input v-model="addfjForm.rwh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="sbbh"
            ><el-input v-model="addfjForm.sbbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="条码" prop="tm"
            ><el-input v-model="addfjForm.tm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="工位号" prop="gwh"
            ><el-input v-model="addfjForm.gwh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="结论" prop="jl"
            ><el-input v-model="addfjForm.jl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="不合格原因" prop="bhgyy"
            ><el-input v-model="addfjForm.bhgyy" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="检测日期" prop="jcrq"
            ><el-input v-model="addfjForm.jcrq" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addfjDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      SearchForm: {
        fjid: '',
        rwh: '',
        sbbh: '',
        tm: '',
      },
      tableList: [
        {
          fjid: '3456789',
          rwh: '32498',
          sbbh: '423432',
          tm: '2345534653',
          gwh: '1',
          jl: 0,
          jcrq: '202020',
          bhgyy: '不好买',
        },
      ],
      currentPage: 1,
      addfjDialogVisible: false,
      addfjForm: {
        fjid: '',
        rwh: '',
        sbbh: '',
        tm: '',
        gwh: '',
        jl: 1,
        bhgyy: '',
        jcrq: '',
      },
    }
  },
  created() {
    // this.href = window.location.href
    // console.log(this.href)
  },
  methods: {
    export() {},
    search() {},
    reset() {
      this.$refs.fjForm.resetFields()
    },
    addlibrary() {
      this.addfjDialogVisible = true
    },
    submit() {
      this.$refs.fjdialogform.resetFields()
      this.addfjDialogVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.export {
  text-decoration: none;
  color: white;
}
.el-dialog-div {
  height: 500px;
  overflow: auto;
  margin: auto;
  .el-input {
    width: 90%;
  }
}
</style>