<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备日常维护</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="表id" label-width="50px" prop="bid"
              ><el-input v-model="SearchForm.bid"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="设备编号" label-width="70px" prop="sbbh"
              ><el-input v-model="SearchForm.sbbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="设备名称" label-width="70px" prop="sbmc"
              ><el-input v-model="SearchForm.sbmc"></el-input></el-form-item
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
            label="表id"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbbh"
            label="设备编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbmc"
            label="设备名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbcj"
            label="设备厂家"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbzt"
            label="设备状态"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbkjsj"
            label="设备开机时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbgjsj"
            label="设备关机时间"
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
      title="添加设备故障单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="130px">
          <el-form-item label="表id" prop="bid"
            ><el-input v-model="addlibraryForm.bid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="设备编号" prop="sbbh"
            ><el-input v-model="addlibraryForm.sbbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="设备名称" prop="sbmc"
            ><el-input v-model="addlibraryForm.sbmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="设备厂家" prop="sbcj"
            ><el-input v-model="addlibraryForm.sbcj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="设备状态" prop="sbzt"
            ><el-input v-model="addlibraryForm.sbzt" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="设备开机时间" prop="sbkjsj"
            ><el-input
              v-model="addlibraryForm.sbkjsj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="设备关机时间" prop="sbgjsj"
            ><el-input
              v-model="addlibraryForm.sbgjsj"
              placeholder=""
            ></el-input>
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
        sbbh: '',
        sbmc: '',
      },
      tableList: [
        {
          bid: '',
          sbbh: '',
          sbmc: '',
          sbcj: '',
          sbzt: '',
          sbkjsj: '',
          sbgjsj: '',
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
        sbbh: '',
        sbmc: '',
        sbcj: '',
        sbzt: '',
        sbkjsj: '',
        sbgjsj: '',
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