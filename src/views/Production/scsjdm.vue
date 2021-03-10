<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>生产数据豆码</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="主码" label-width="50px" prop="zm"
              ><el-input v-model="SearchForm.zm"></el-input></el-form-item
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
            prop="zm"
            label="主码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zsjm"
            label="左上角码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ysjm"
            label="右上角码"
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
      title="添加生产数据豆码单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="130px">
          <el-form-item label="主码" prop="zm"
            ><el-input v-model="addlibraryForm.zm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="左上角码" prop="zsjm"
            ><el-input v-model="addlibraryForm.zsjm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="右上角码" prop="ysjm"
            ><el-input v-model="addlibraryForm.ysjm" placeholder=""></el-input>
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
        zm: '',
      },
      tableList: [
        {
          zm: '123',
          zsjm: '43',
          ysjm: '53',
        },
      ],
      currentPage: 1,
      href: '',
      addLibraryDialogVisible: false,
      addlibraryForm: {
        zm: '',
        zsjm: '',
        ysjm: '',
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