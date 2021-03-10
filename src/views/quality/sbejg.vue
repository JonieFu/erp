<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>质量管理</el-breadcrumb-item>
      <el-breadcrumb-item>瞬变二极管</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item
              label="瞬变二极管ID"
              label-width="100px"
              prop="jtxzqid"
              ><el-input v-model="SearchForm.gdohqid"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="生产订单编号"
              label-width="100px"
              prop="scddbh"
              ><el-input v-model="SearchForm.scddbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="工单编号" label-width="70px" prop="gdbh"
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
            prop="sbejgid"
            label="瞬变二极管ID"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjgfbbh"
            label="采集规范版本号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scddbh"
            label="生产订单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gdbh"
            label="工单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jysjbh"
            label="检验数据编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jysj"
            label="检验时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjsj"
            label="创建时间/抓取时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="yclzzs"
            label="原材料制造商"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ggxh"
            label="规格型号"
          ></el-table-column
          ><el-table-column
            align="center"
            prop="xxz"
            label="下限值"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sxz"
            label="上限值"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxbm"
            label="工序编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ldlscz"
            label="漏电流实测值(μΑ)"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sbejgjcjl"
            label="瞬变二极管检测结论"
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
      title="添加瞬变二极管质量检测单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="140px">
          <el-form-item label="瞬变二极管ID" prop="sbejgid"
            ><el-input
              v-model="addlibraryForm.sbejgid"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="采集规范版本号" prop="cjgfbbh"
            ><el-input
              v-model="addlibraryForm.cjgfbbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="生产订单编号" prop="scddbh"
            ><el-input
              v-model="addlibraryForm.scddbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="工单编号" prop="gdbh"
            ><el-input v-model="addlibraryForm.gdbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="检验数据编号" prop="jysjbh"
            ><el-input
              v-model="addlibraryForm.jysjbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="检验时间" prop="jysj"
            ><el-input v-model="addlibraryForm.jysj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建时间/抓取时间" prop="cjsj"
            ><el-input v-model="addlibraryForm.cjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="原材料制造商" prop="yclzzs"
            ><el-input
              v-model="addlibraryForm.yclzzs"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="规格型号" prop="ggxh"
            ><el-input v-model="addlibraryForm.ggxh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="下限值" prop="xxz"
            ><el-input v-model="addlibraryForm.xxz" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="上限值" prop="sxz"
            ><el-input v-model="addlibraryForm.sxz" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="工序编码" prop="gxbm"
            ><el-input v-model="addlibraryForm.gxbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="漏电流实测值(μΑ)" prop="ldlscz"
            ><el-input
              v-model="addlibraryForm.ldlscz"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="瞬变二极管检测结论" prop="sbejgjcjl"
            ><el-input
              v-model="addlibraryForm.sbejgjcjl"
              placeholder=""
            ></el-input>
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
        sbejgid: '',
        scddbh: '',
        gdbh: '',
      },
      tableList: [
        {
          sbejgid: '',
          cjgfbbh: '',
          scddbh: '',
          gdbh: '',
          jysjbh: '',
          jysj: '',
          cjsj: '',
          yclzzs: '',
          ggxh: '',
          xxz: '',
          sxz: '',
          gxbm: '',
          ldlscz: '',
          sbejgjcjl: '',
        },
      ],
      currentPage: 1,
      href: '',
      addLibraryDialogVisible: false,
      addlibraryForm: {
        jtxzqid: '',
        cjgfbbh: '',
        scddbh: '',
        gdbh: '',
        jysjbh: '',
        jysj: '',
        cjsj: '',
        yclzzs: '',
        ggxh: '',
        xxz: '',
        sxz: '',
        gxbm: '',
        pcscz: '',
        jtxzqjcjl: '',
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