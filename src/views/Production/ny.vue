<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>耐压</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="nyForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item
              label="耐压结论表ID"
              label-width="110px"
              prop="nyjlbid"
              ><el-input v-model="SearchForm.nyjlbid"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="检定任务编号"
              label-width="100px"
              prop="jdrwbh"
              ><el-input v-model="SearchForm.jdrwbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="装置号" label-width="60px" prop="zzh"
              ><el-input v-model="SearchForm.zzh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="表号" label-width="40px" prop="bh"
              ><el-input v-model="SearchForm.bh"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addny"
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
            prop="nyjlbid"
            label="耐压结论表ID"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jdrwbh"
            label="检定任务编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zzh"
            label="装置号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bh"
            label="表号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gwh"
            label="工位号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jl"
            label="结论"
          ></el-table-column>
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
      title="添加耐压检验单"
      :visible.sync="addnyFormDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="nydialogform" :model="addnyForm" label-width="130px">
          <el-form-item label="耐压结论表ID" prop="nyjlbid"
            ><el-input v-model="addnyForm.nyjlbid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="检定任务编号" prop="jdrwbh"
            ><el-input v-model="addnyForm.jdrwbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="装置号" prop="zzh"
            ><el-input v-model="addnyForm.zzh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="表号" prop="bh"
            ><el-input v-model="addnyForm.bh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="工位号" prop="gwh"
            ><el-input v-model="addnyForm.gwh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="结论" prop="jl"
            ><el-input v-model="addnyForm.jl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="不合格原因" prop="bhgyy"
            ><el-input v-model="addnyForm.bhgyy" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="检测日期" prop="jcrq"
            ><el-input v-model="addnyForm.jcrq" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addnyFormDialogVisible = false">取 消</el-button>
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
        nyjlbid: '',
        jdrwbh: '',
        zzh: '',
        bh: '',
      },
      tableList: [
        {
          nyjlbid: '1',
          jdrwbh: '2',
          zzh: '3',
          bh: '4',
          gwh: '4',
          jl: '543',
          bhgyy: '345',
          jcrq: '354',
        },
      ],
      currentPage: 1,
      href: '',
      addnyFormDialogVisible: false,
      addnyForm: {
        nyjlbid: '',
        jdrwbh: '',
        zzh: '',
        bh: '',
        gwh: '',
        jl: '',
        bhgyy: '',
        jcrq: '',
      },
    }
  },
  created() {
    this.href = window.location.href
    console.log(this.href)
  },
  methods: {
    export() {},
    search() {},
    reset() {
      this.$refs.nyForm.resetFields()
    },
    addny() {
      this.addnyFormDialogVisible = true
    },
    submit() {
      this.$refs.nydialogform.resetFields()
      this.addnyFormDialogVisible = false
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