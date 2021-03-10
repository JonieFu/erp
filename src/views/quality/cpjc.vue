<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>质量管理</el-breadcrumb-item>
      <el-breadcrumb-item>成品检测</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="表ID" label-width="50px" prop="dcid"
              ><el-input v-model="SearchForm.dcid"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="成品检测编号"
              label-width="100px"
              prop="scddbh"
              ><el-input v-model="SearchForm.scddbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="成品检测名称" label-width="100px" prop="gdbh"
              ><el-input v-model="SearchForm.gdbh"></el-input></el-form-item
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
            prop="bid"
            label="表ID"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cpjcbh"
            label="成品检测编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cpjcmc"
            label="成品检测名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cpbm"
            label="成品编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cpmc"
            label="成品名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xsddbh"
            label="销售订单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="xsddmc"
            label="销售订单名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="pcdbh"
            label="排产单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="pcdmc"
            label="排产单名称"
          ></el-table-column
          ><el-table-column
            align="center"
            prop="blpyy"
            label="不良品原因"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="bz"
            label="备注"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjsj"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjr"
            label="创建人"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxsj"
            label="更新时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxr"
            label="更新人"
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
      title="添加成品检测单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="140px">
          <el-form-item label="表ID" prop="bid"
            ><el-input v-model="addlibraryForm.bid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="成品检测编号" prop="cpjcbh"
            ><el-input
              v-model="addlibraryForm.cpjcbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="成品检测名称" prop="cpjcmc"
            ><el-input
              v-model="addlibraryForm.cpjcmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="成品编号" prop="cpbm"
            ><el-input v-model="addlibraryForm.cpbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="成品名称" prop="cpmc"
            ><el-input v-model="addlibraryForm.cpmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="销售订单编号" prop="xsddbh"
            ><el-input
              v-model="addlibraryForm.xsddbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="销售订单名称" prop="xsddmc"
            ><el-input
              v-model="addlibraryForm.xsddmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="排产单编号" prop="pcdbh"
            ><el-input v-model="addlibraryForm.pcdbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="排产单名称" prop="pcdmc"
            ><el-input v-model="addlibraryForm.pcdmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="不良品原因" prop="blpyy"
            ><el-input v-model="addlibraryForm.blpyy" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="bz"
            ><el-input v-model="addlibraryForm.bz" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="cjsj"
            ><el-input v-model="addlibraryForm.cjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建人" prop="cjr"
            ><el-input v-model="addlibraryForm.cjr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="更新时间" prop="gxsj"
            ><el-input v-model="addlibraryForm.gxsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="更新人" prop="gxr"
            ><el-input v-model="addlibraryForm.gxr" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLibraryDialogVisible = false">取 消</el-button>
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
        bid: '',
        cpjcbh: '',
        cpjcmc: '',
      },
      tableList: [
        {
          bid: '',
          cpjcbh: '',
          cpjcmc: '',
          cpbm: '',
          cpmc: '',
          xsddbh: '',
          pcdbh: '',
          pcdmc: '',
          blpyy: '',
          bz: '',
          cjsj: '',
          cjr: '',
          gxsj: '',
          gxr: '',
        },
      ],
      currentPage: 1,
      href: '',
      addLibraryDialogVisible: false,
      addlibraryForm: {
        bid: '',
        cpjcbh: '',
        cpjcmc: '',
        cpbm: '',
        cpmc: '',
        xsddbh: '',
        xsddmc: '',
        pcdbh: '',
        pcdmc: '',
        blpyy: '',
        bz: '',
        cjsj: '',
        cjr: '',
        gxsj: '',
        gxr: '',
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
      this.$refs.libraryForm.resetFields()
    },
    addlibrary() {
      this.addLibraryDialogVisible = true
    },
    submit() {
      this.addLibraryDialogVisible = false
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