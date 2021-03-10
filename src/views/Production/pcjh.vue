<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>排产计划</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="libraryForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="子合同编号" label-width="90px" prop="zhtbh"
              ><el-input v-model="SearchForm.zhtbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="子合同名称" label-width="90px" prop="zhtmc"
              ><el-input v-model="SearchForm.zhtmc"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="排产计划编号"
              label-width="100px"
              prop="pcjhbh"
              ><el-input v-model="SearchForm.pcjhbh"></el-input></el-form-item
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
            prop="zhtbh"
            label="子合同编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zhtmc"
            label="子合同名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ckdmc"
            label="出库单名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ckdh"
            label="出库单号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="pcjhbh"
            label="排产计划编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wlbm"
            label="物料编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="wlms"
            label="物料描述"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="pcsl"
            label="排产数量"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="plbm"
            label="品类编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="zlbm"
            label="种类编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhkssj"
            label="计划开始时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhgq"
            label="计划工期"
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
            prop="sjgq"
            label="实际工期"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjwcsj"
            label="实际完成时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jd"
            label="进度"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jfrq"
            label="交付日期"
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
      title="添加排产计划单"
      :visible.sync="addLibraryDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addlibraryForm" label-width="130px">
          <el-form-item label="子合同编号" prop="zhtbh"
            ><el-input v-model="addlibraryForm.zhtbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="子合同名称" prop="zhtmc"
            ><el-input v-model="addlibraryForm.zhtmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="出库单名称" prop="ckdmc"
            ><el-input v-model="addlibraryForm.ckdmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="出库单号" prop="ckdh"
            ><el-input v-model="addlibraryForm.ckdh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="排产计划编号" prop="pcjhbh"
            ><el-input
              v-model="addlibraryForm.pcjhbh"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="物料编码" prop="wlbm"
            ><el-input v-model="addlibraryForm.wlbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="物料描述" prop="wlms"
            ><el-input v-model="addlibraryForm.wlms" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="排产数量" prop="pcsl"
            ><el-input v-model="addlibraryForm.pcsl" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品类编码" prop="plbm"
            ><el-input v-model="addlibraryForm.plbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="种类编码" prop="zlbm"
            ><el-input v-model="addlibraryForm.zlbm" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="计划开始时间" prop="jhkssj"
            ><el-input
              v-model="addlibraryForm.jhkssj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="计划工期" prop="jhgq"
            ><el-input v-model="addlibraryForm.jhgq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="计划完成时间" prop="jhwcsj"
            ><el-input
              v-model="addlibraryForm.jhwcsj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="实际开始时间" prop="sjkssj"
            ><el-input
              v-model="addlibraryForm.sjkssj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="实际工期" prop="sjgq"
            ><el-input v-model="addlibraryForm.sjgq" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="实际完成时间" prop="sjwcsj"
            ><el-input
              v-model="addlibraryForm.sjwcsj"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item label="进度" prop="jd"
            ><el-input v-model="addlibraryForm.jd" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="交付日期" prop="jfrq"
            ><el-input v-model="addlibraryForm.jfrq" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="创建人" prop="cjr"
            ><el-input v-model="addlibraryForm.cjr" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="cjsj"
            ><el-input v-model="addlibraryForm.cjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="更新人" prop="gxr"
            ><el-input v-model="addlibraryForm.gxr" placeholder=""></el-input>
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
        zhtbh: '',
        zhtmc: '',
        pcjhbh: '',
      },
      tableList: [
        {
          zhtbh: '',
          zhtmc: '',
          ckdmc: '',
          ckdh: '',
          pcjhbh: '',
          wlbm: '',
          pcsl: '',
          plbm: '',
          zlbm: '',
          jhksrq: '',
          jhgq: '',
          jhwcsj: '',
          sjkssj: '',
          sjgq: '',
          sjwcsj: '',
          jd: '',
          jfrq: '',
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
        zhtbh: '',
        zhtmc: '',
        ckdmc: '',
        ckdh: '',
        pcjhbh: '',
        wlbm: '',
        wlms: '',
        pcsl: '',
        plbm: '',
        zlbm: '',
        jhkssj: '',
        jhgq: '',
        jhwcsj: '',
        sjkssj: '',
        sjgq: '',
        sjwcsj: '',
        jd: '',
        jfrq: '',
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