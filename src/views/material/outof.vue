<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物料管理</el-breadcrumb-item>
      <el-breadcrumb-item>物料出库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form
        ref="itemOfForm"
        :model="SearchForm"
        size="mini"
        class="fontSize"
      >
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="出库单号" label-width="65px" prop="出库单号"
              ><el-input
                v-model="SearchForm['出库单号']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="出库单名称"
              label-width="75px"
              prop="出库单名称"
              ><el-input
                v-model="SearchForm['出库单名称']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="采购订单编号"
              label-width="85px"
              prop="采购订单编号"
              ><el-input
                v-model="SearchForm['采购订单编号']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="7">
            <el-form-item label="创建时间" label-width="65px" class="fontSize"
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
            <el-button type="primary" size="mini" @click="search"
              >搜索</el-button
            >
            <el-button type="warning" size="mini" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-row :gutter="60">
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addoutof"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyOutOf"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteOutOf"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableAmountData="tableAmountData"
              :tableTitle="tableTitle"
              fileName="出库单"
            ></Export
          ></el-col>
          <el-col :span="1">
            <Upload
              style="margin-left: 25px"
              title="导入"
              :tableData="tableList"
            ></Upload
          ></el-col>
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
                @click="remove($index)"
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
      title="添加出库单"
      :visible.sync="addoutofDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="itemOfForm" :model="additemOfForm" label-width="130px">
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input v-model="additemOfForm[value]" placeholder=""></el-input
          ></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addoutofDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editoutofDialogVisible" width="50%">
      <div class="el-dialog-div">
        <el-form ref="editform" :model="edititemOfForm" label-width="130px">
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
            ><el-input v-model="edititemOfForm[value]" placeholder=""></el-input
          ></el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editoutofDialogVisible = false">取 消</el-button>
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
      tableTitle: [
        '出库单号',
        '出库单名称',
        '出库材料名称',
        '本次出库材料数量',
        '计量单位',
        '采购订单编号',
        '采购订单名称',
        'BOM编号',
        'bom物料名称',
        'bOM规格型号',
        'bom数量',
        '供货单位',
        '预计交货日期',
        '实际交货日期',
        '供货联系人',
        '供货商联系电话',
        '收货地址',
        '子合同编号',
        '子合同名称',
        '入库材料编号',
        '总库存数量',
        '备注',
        '更新人',
        '创建人',
      ],
      SearchForm: {
        出库单号: '',
        出库单名称: '',
        采购订单编号: '',
        采购订单名称: '',
      },
      tableList: [],
      currentPage: 1,
      addoutofDialogVisible: false,
      editoutofDialogVisible: false,
      additemOfForm: {
        出库单号: '',
        出库单名称: '',
        出库材料名称: '',
        本次出库材料数量: '',
        计量单位: '',
        采购订单编号: '',
        采购订单名称: '',
        BOM编号: '',
        bom物料名称: '',
        bOM规格型号: '',
        bom规格单位: '',
        bom数量: '',
        供货单位: '',
        预计交货日期: '',
        实际交货日期: '',
        供货联系人: '',
        供货商联系电话: '',
        收货地址: '',
        子合同编号: '',
        子合同名称: '',
        入库材料编号: '',
        总库存数量: '',
        备注: '',
        更新人: '',
        创建人: '',
      },
      edititemOfForm: {
        出库单号: '',
        出库单名称: '',
        出库材料名称: '',
        本次出库材料数量: '',
        计量单位: '',
        采购订单编号: '',
        采购订单名称: '',
        BOM编号: '',
        bom物料名称: '',
        bOM规格型号: '',
        bom规格单位: '',
        bom数量: '',
        供货单位: '',
        预计交货日期: '',
        实际交货日期: '',
        供货联系人: '',
        供货商联系电话: '',
        收货地址: '',
        子合同编号: '',
        子合同名称: '',
        入库材料编号: '',
        总库存数量: '',
        备注: '',
        更新人: '',
        创建人: '',
      },
      tableAmountData: [],
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        出库单号: '1.2007.001.40000',
        出库单名称: 'FJ-20-压敏电阻',
        出库材料名称: '压敏电阻',
        本次出库材料数量: '40000',
        计量单位: '件',
        采购订单编号: '5300016545',
        采购订单名称: '国网福建省电力有限公司物资分公司',
        BOM编号: 'JY0.055.016',
        bom物料名称: '压敏电阻',
        bOM规格型号: '压敏电阻；S20K420E7/20KDC680V-820V 立式',
        bom规格单位: '件',
        bom数量: '40000',
        供货单位: '国网福建省电力有限公司物资分公司',
        预计交货日期: '2020-7-10',
        实际交货日期: '2020-7-10',
        供货联系人: '王思平',
        供货商联系电话: '13223055947',
        收货地址: '北京市大兴区盛坊路2号北京京仪仪表工业基地3号楼',
        子合同编号: 'SGLNWZ00HTMM2000868',
        子合同名称: '国网福建省电力有限公司物资分公司',
        入库材料编号: '1010110011',
        总库存数量: '40000',
        备注: '',
        更新人: '王林',
        创建人: '王林',
      },
    ]
  },
  methods: {
    search() {},
    remove(index) {
      this.tableList.splice(index, 1)
    },
    edit(data) {
      this.edititemOfForm = data
      this.editoutofDialogVisible = true
    },
    deleteOutOf() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    editSubmit() {
      this.editoutofDialogVisible = false
    },
    modifyOutOf() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.edititemOfForm = this.tableAmountData[0]
        this.editoutofDialogVisible = true
      }
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    reset() {
      this.$refs.itemOfForm.resetFields()
    },
    addoutof() {
      this.addoutofDialogVisible = true
    },
    addsubmit() {
      this.addoutofDialogVisible = false
      this.$refs.itemOfForm.resetFields()
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
.fontSize {
  ::v-deep .el-form-item__label {
    font-size: 12px;
  }
}
</style>