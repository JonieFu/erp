<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>工单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="生产工单编码" label-width="100px" prop="rkdh"
              ><el-input v-model="SearchForm.rkdh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="品类编码" label-width="70px" prop="rkdmc"
              ><el-input v-model="SearchForm.rkdmc"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="种类编码" label-width="70px" prop="cgddbh"
              ><el-input v-model="SearchForm.cgddbh"></el-input></el-form-item
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
            prop="cgfzbbm"
            label="采购方总部编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gysscddbh"
            label="供应商生产订单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gysbm"
            label="供应商编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gysmc"
            label="供应商名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scgdbh"
            label="生产工单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="plbm"
            label="品类编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjwlbm"
            label="厂家物料编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjwlms"
            label="厂家物料描述"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wlpc"
            label="物料批次"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scsl"
            label="生产数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jldw"
            label="计量单位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhkssj"
            label="计划开始时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhwcsj"
            label="计划完成时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjkssj"
            label="实际开始时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjwcsj"
            label="实际完成时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gdzt"
            label="工单状态"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gylxbm"
            label="工艺路线编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjly"
            label="数据来源"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ljsc"
            label="逻辑删除"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cjr"
            label="创建人"
          ></el-table-column
          ><el-table-column
            align="center"
            prop="cjsj"
            label="创建时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxr"
            label="更新人"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxsj"
            label="更新时间"
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
      title="添加工单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="140px">
          <el-form-item label="采购方总部编码" prop="rkdh"
            ><el-input v-model="addlibraryForm.rkdh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供应商生产订单编号" prop="gysmc"
            ><el-input v-model="addlibraryForm.rkdmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供应商编码" prop="rkclmc"
            ><el-input
              v-model="addlibraryForm.rkclmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="供应商名称" prop="bcrkclsl"
            ><el-input
              v-model="addlibraryForm.bcrkclsl"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="生产工单编号" prop="zkcsl"
            ><el-input v-model="addlibraryForm.zkcsl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品类编码" prop="jldw"
            ><el-input v-model="addlibraryForm.jldw" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="厂家物料编码" prop="cgddbh"
            ><el-input
              v-model="addlibraryForm.cgddbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="厂家物料描述" prop="cgddmc"
            ><el-input
              v-model="addlibraryForm.cgddmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="物料批次" prop="bombh"
            ><el-input v-model="addlibraryForm.bombh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产数量" prop="BOMwlmc"
            ><el-input
              v-model="addlibraryForm.BOMwlmc"
              placeholder=""
            ></el-input>
          </el-form-item>

          <el-form-item label="计量单位" prop="ghdw"
            ><el-input
              v-model="addlibraryForm.BOMwlmc"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="计划开始时间" prop="ghrq"
            ><el-input v-model="addlibraryForm.ghrq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="计划完成时间" prop="jhrq"
            ><el-input v-model="addlibraryForm.jhrq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="实际开始时间" prop="ghlxr"
            ><el-input v-model="addlibraryForm.ghlxr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="实际完成时间" prop="ghslxdh"
            ><el-input
              v-model="addlibraryForm.ghslxdh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="工单状态" prop="shdz"
            ><el-input v-model="addlibraryForm.shdz" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="逻辑删除" prop="xsddh"
            ><el-input v-model="addlibraryForm.xsddh" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="创建人" prop="cjr"
            ><el-input v-model="addlibraryForm.cjr" placeholder=""></el-input>
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
        scgdbm: '',
        plbm: '',
        zlbm: '',
      },
      tableList: [
        {
          cgfzbbm: '',
          gysscddbh: '',
          gysbm: '',
          gysmc: '',
          scgdbh: '',
          plbm: '',
          cjwlbm: '',
          cjwlms: '',
          wlpc: '',
          scsl: '',
          jldw: '',
          jhkssj: '',
          jhwcsj: '',
          sjkssj: '',
          sjwcsj: '',
          gdzt: '',
          gylxbm: '',
          sjly: '',
          ljsc: '',
          cjr: '',
          cjsj: '',
          gxr: '',
          gxsj: '',
        },
      ],
      currentPage: 1,
      href: '',
      addLibraryDialogVisible: false,
      addlibraryForm: {
        cgfzbbm: '',
        gysscddbh: '',
        gysbm: '',
        gysmc: '',
        scgdbh: '',
        plbm: '',
        cjwlbm: '',
        cjwlms: '',
        wlpc: '',
        scsl: '',
        jldw: '',
        jhkssj: '',
        jhwcsj: '',
        sjkssj: '',
        sjwcsj: '',
        gdzt: '',
        gylxbm: '',
        sjly: '',
        ljsc: '',
        cjr: '',
        cjsj: '',
        gxr: '',
        gxsj: '',
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