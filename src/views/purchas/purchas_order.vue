<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item>采购单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="purchasForm" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="采购单号" label-width="70px" prop="采购单号"
              ><el-input
                v-model="SearchForm['采购单号']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="采购单名称"
              label-width="90px"
              prop="采购单名称"
              ><el-input
                v-model="SearchForm['采购单名称']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="BOM编号" label-width="80px" prop="BOM编号"
              ><el-input
                v-model="SearchForm['BOM编号']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="7">
            <el-form-item label="创建时间" label-width="70px" prop="创建时间"
              ><el-date-picker
                style="width: 200px"
                v-model="SearchForm['创建时间']"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker
            ></el-form-item>
          </el-col>
          <el-col :span="4">
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
        <el-row :gutter="60">
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addPurchasOrder"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyPurchasOrder"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deletePurchasOrder"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableAmountData="tableAmountData"
              :tableTitle="tableTitle"
              fileName="采购单"
            ></Export>
          </el-col>
          <el-col :span="1">
            <Upload
              style="margin-left: 25px"
              title="导入"
              :tableData="tableList"
            ></Upload>
          </el-col>
        </el-row>
        <el-table
          :data="tableList"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
        >
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column
            align="center"
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="150px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                style="width: 50px; padding: 7px 0"
                @click="edit(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                style="width: 50px; padding: 7px 0"
                @click="delet($index)"
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
      title="添加采购单"
      :visible.sync="addPurchasOrderDialogVisble"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="addform"
          :model="addPutchasOrderList"
          label-width="150px"
          size="small"
        >
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input
              v-model="addPutchasOrderList[value]"
              placeholder=""
            ></el-input
          ></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPurchasOrderDialogVisble = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改采购单"
      :visible.sync="editPurchasOrderDialogVisble"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="editPutchasOrderList"
          label-width="150px"
          size="small"
        >
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input
              v-model="editPutchasOrderList[value]"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPurchasOrderDialogVisble = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Upload from '../../components/upload.vue'
import Export from '../../components/export.vue'
export default {
  components: { Upload, Export },
  data() {
    return {
      SearchForm: {
        采购单号: '',
        采购单名称: '',
        BOM编号: '',
        创建时间: '',
      },
      tableList: [],
      tableTitle: [
        '采购单号',
        '采购单名称',
        'BOM编号',
        '物料名称',
        '规格型号',
        '规格单位',
        '数量',
        '需采购数量',
        '供货单位',
        '供货日期',
        '交货日期',
        '供货联系人',
        '供货商联系电话',
        '收货地址',
        '子合同编号',
        '子合同名称',
        '备注',
        '创建时间',
        '创建人',
      ],
      currentPage: 1,
      addPutchasOrderList: {
        采购单号: '',
        采购单名称: '',
        BOM编号: '',
        物料名称: '',
        规格型号: '',
        规格单位: '',
        数量: '',
        需采购数量: '',
        供货单位: '',
        供货日期: '',
        交货日期: '',
        供货联系人: '',
        供货商联系电话: '',
        收货地址: '',
        子合同编号: '',
        子合同名称: '',
        备注: '',
        创建时间: '',
        创建人: '',
      },
      addPurchasOrderDialogVisble: false,
      editPurchasOrderDialogVisble: false,
      editPutchasOrderList: {
        采购单号: '',
        采购单名称: '',
        BOM编号: '',
        物料名称: '',
        规格型号: '',
        规格单位: '',
        数量: '',
        需采购数量: '',
        供货单位: '',
        供货日期: '',
        交货日期: '',
        供货联系人: '',
        供货商联系电话: '',
        收货地址: '',
        子合同编号: '',
        子合同名称: '',
        备注: '',
        创建时间: '',
        创建人: '',
      },
      tableAmountData: [],
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        采购单号: '5300016545',
        采购单名称: '180104328000',
        BOM编号: 'JY0.055.014',
        物料名称: '印制板',
        规格型号: 'GWDX-HT6025-7017',
        规格单位: 'pcs',
        数量: '1',
        需采购数量: '40000',
        供货单位: '爱普科斯电子元器件（珠海保税区）有限公司',
        供货日期: '2020-7-10',
        交货日期: '2020-7-10',
        供货联系人: '王思平',
        供货商联系电话: '13223055947',
        收货地址: '北京市大兴区盛坊路2号北京京仪仪表工业基地3号楼',
        子合同编号: 'SGLNWZ00HTMM2000868',
        子合同名称: '国网福建省电力有限公司物资分公司',
        备注: '',
        创建时间: '',
        创建人: '王林',
      },
    ]
  },
  methods: {
    edit(row) {
      this.editPutchasOrderList = row
      this.editPurchasOrderDialogVisble = true
    },
    delet(index) {
      this.tableList.splice(index, 1)
    },
    addPurchasOrder() {
      this.addPurchasOrderDialogVisble = true
    },
    addSubmit() {
      this.addPurchasOrderDialogVisble = false
      this.$refs.addform.resetFields()
    },
    modifyPurchasOrder() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editPutchasOrderList = this.tableAmountData[0]
        this.editPurchasOrderDialogVisble = true
      }
    },
    editSubmit() {
      this.editPurchasOrderDialogVisble = false
    },
    deletePurchasOrder() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    search() {},
    reset() {
      this.$refs.purchasForm.resetFields()
    },
  },
}
</script>
<style lang="scss" scoped>
.el-dialog-div {
  height: 500px;
  overflow: auto;
  margin: auto;
  .el-input {
    width: 90%;
  }
}
</style>