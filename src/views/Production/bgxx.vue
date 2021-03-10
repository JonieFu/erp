<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>生产管理</el-breadcrumb-item>
      <el-breadcrumb-item>报工信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="bgxxForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="生产批次号" label-width="90px" prop="scpch"
              ><el-input v-model="SearchForm.scpch"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="生产车间编码"
              label-width="100px"
              prop="sccjbm"
              ><el-input v-model="SearchForm.sccjbm"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="生产车间名称"
              label-width="100px"
              prop="sccjmc"
              ><el-input v-model="SearchForm.sccjmc"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="生产工单编号"
              label-width="100px"
              prop="scgdbh"
              ><el-input v-model="SearchForm.scgdbh"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addbgxx"
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
            prop="scpch"
            label="生产批次号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sccjbm"
            label="生产车间编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cgfzbbm"
            label="采购方总部编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gysbm"
            label="供应商编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scddbh"
            label="总库存数量"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="cpnbid"
            label="产品内部ID号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sccjmc"
            label="生产车间名称"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scgdbh"
            label="生产工单编号"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="gxmc"
            label="工序名称"
          ></el-table-column
          ><el-table-column
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
            prop="gxbm"
            label="工序编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="scgylxbm"
            label="生产工艺路线编码"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sccjid"
            label="生产车间ID"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="swid"
            label="实物id"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjly"
            label="数据来源"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="lysjcjsj"
            label="来源数据创建时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhkssj"
            label="计划开始时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="jhjssj"
            label="计划结束时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjkssj"
            label="实际开始时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjjssj"
            label="实际结束时间"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="ddzt"
            label="订单状态"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="khsssf"
            label="客户所属省份"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="sjyyf"
            label="数据拥有方"
          ></el-table-column>

          <el-table-column
            align="center"
            prop="sjkjf"
            label="数据可见方"
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
      title="添加报工信息单"
      :visible.sync="addbgxxDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="bgxxdialogform" :model="addbgxxForm" label-width="130px">
          <el-form-item label="生产批次号" prop="scpch"
            ><el-input v-model="addbgxxForm.scpch" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产车间编码" prop="sccjbm"
            ><el-input v-model="addbgxxForm.sccjbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="采购方总部编码" prop="cgfzbbm"
            ><el-input v-model="addbgxxForm.cgfzbbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="供应商编码" prop="gysbm"
            ><el-input v-model="addbgxxForm.gysbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="总库存数量" prop="scddbh"
            ><el-input v-model="addbgxxForm.scddbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="产品内部ID号" prop="cpnbid"
            ><el-input v-model="addbgxxForm.cpnbid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产车间名称" prop="sccjmc"
            ><el-input v-model="addbgxxForm.sccjmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产工单编号" prop="scgdbh"
            ><el-input v-model="addbgxxForm.scgdbh" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="工序名称" prop="gxmc"
            ><el-input v-model="addbgxxForm.gxmc" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="品类编码" prop="plbm"
            ><el-input v-model="addbgxxForm.plbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="种类编码" prop="zlbm"
            ><el-input v-model="addbgxxForm.zlbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="工序编码" prop="gxbm"
            ><el-input v-model="addbgxxForm.gxbm" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="生产工艺路线编码" prop="scgylxbm"
            ><el-input v-model="addbgxxForm.scgylxbm" placeholder=""></el-input>
          </el-form-item>

          <el-form-item label="生产车间ID" prop="sccjid"
            ><el-input v-model="addbgxxForm.sccjid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="实物id" prop="swid"
            ><el-input v-model="addbgxxForm.swid" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="数据来源" prop="sjly"
            ><el-input v-model="addbgxxForm.sjly" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="来源数据创建时间" prop="lysjcjsj"
            ><el-input v-model="addbgxxForm.lysjcjsj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="计划开始时间" prop="jhkssj"
            ><el-input v-model="addbgxxForm.jhkssj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="计划结束时间" prop="jhjssj"
            ><el-input v-model="addbgxxForm.jhjssj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="实际开始时间" prop="sjkssj"
            ><el-input v-model="addbgxxForm.sjkssj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="实际结束时间" prop="sjjssj"
            ><el-input v-model="addbgxxForm.sjjssj" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="ddzt"
            ><el-input v-model="addbgxxForm.ddzt" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="客户所属省份" prop="khsssf"
            ><el-input v-model="addbgxxForm.khsssf" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="数据拥有方" prop="sjyyf"
            ><el-input v-model="addbgxxForm.sjyyf" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="数据可见方" prop="sjkjf"
            ><el-input v-model="addbgxxForm.sjkjf" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addbgxxDialogVisible = false">取 消</el-button>
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
        scpch: '',
        sccjbm: '',
        sccjmc: '',
        scgdbh: '',
      },
      tableList: [
        {
          scpch: 'ds',
          sccjbm: 'sdf',
          cgfzbbm: 'sdf',
          gysbm: 'saf',
          scddbh: 'sdf',
          cpnbid: 'jlgk',
          sccjmc: 'dsgz',
          scgdbh: 'fg',
          gxmc: 'zcx',
          plbm: 'dfg',
          zlbm: 'xd',
          gxbm: 'sdf',
          scgylxbm: 'sdf',
          sccjid: 'sdf',
          swid: 'sdf',
          sjly: 'sdfs',
          lysjcjsj: 'sdf',
          jhkssj: 'sdfs',
          jhjssj: 'sdfsd',
          sjkssj: 'sdfs',
          sjjssj: 'sdf',
          ddzt: 'sdfs',
          khsssf: '',
          sjyyf: '',
          sjkjf: '',
        },
      ],
      currentPage: 1,
      href: '',
      addbgxxDialogVisible: false,
      addbgxxForm: {
        scpch: '',
        sccjbm: '',
        cgfzbbm: '',
        gysbm: '',
        scddbh: '',
        cpnbid: '',
        sccjmc: '',
        scgdbh: '',
        gxmc: '',
        plbm: '',
        zlbm: '',
        gxbm: '',
        scgylxbm: '',
        sccjid: '',
        swid: '',
        sjly: '',
        lysjcjsj: '',
        jhkssj: '',
        jhjssj: '',
        sjkssj: '',
        sjjssj: '',
        ddzt: '',
        khsssf: '',
        sjyyf: '',
        sjkjf: '',
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
      this.$refs.bgxxForm.resetFields()
    },
    addbgxx() {
      this.addbgxxDialogVisible = true
    },
    submit() {
      this.addbgxxDialogVisible = false
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