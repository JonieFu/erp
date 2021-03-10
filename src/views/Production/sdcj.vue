<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>上电初检</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="sdcjForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="上电初检ID" label-width="90px" prop="sdcjid"
              ><el-input v-model="SearchForm.sdcjid"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="任务号" label-width="60px" prop="rwh"
              ><el-input v-model="SearchForm.rwh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="设备编号" label-width="70px" prop="sbbh"
              ><el-input v-model="SearchForm.sbbh"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addsdcj"
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
            prop="sdcjid"
            label="上电初检ID"
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
      title="添加上电初检单"
      :visible.sync="addsdcjFormDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="sdcjdialogform" :model="addsdcjForm" label-width="130px">
          <el-form-item label="上电初检ID" prop="sdcjid"
            ><el-input v-model="addsdcjForm.sdcjid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="任务号" prop="rwh"
            ><el-input v-model="addsdcjForm.rwh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="sbbh"
            ><el-input v-model="addsdcjForm.sbbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="条码" prop="tm"
            ><el-input v-model="addsdcjForm.tm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="工位号" prop="gwh"
            ><el-input v-model="addsdcjForm.gwh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="结论" prop="jl"
            ><el-input v-model="addsdcjForm.jl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="不合格原因" prop="bhgyy"
            ><el-input v-model="addsdcjForm.bhgyy" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="检测日期" prop="jcrq"
            ><el-input v-model="addsdcjForm.jcrq" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addsdcjFormDialogVisible = false">取 消</el-button>
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
        sdcjid: '',
        rwh: '',
        sbbh: '',
        tm: '',
      },
      tableList: [
        {
          sdcjid: '1',
          rwh: '2',
          sbbh: '3',
          tm: '4',
          gwh: '4',
          jl: '543',
          bhgyy: '345',
          jcrq: '354',
        },
      ],
      currentPage: 1,
      href: '',
      addsdcjFormDialogVisible: false,
      addsdcjForm: {
        sdcjid: '',
        rwh: '',
        sbbh: '',
        tm: '',
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
      this.$refs.sdcjForm.resetFields()
    },
    addsdcj() {
      this.addsdcjFormDialogVisible = true
    },
    submit() {
      this.$refs.sdcjdialogform.resetFields()
      this.addsdcjFormDialogVisible = false
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