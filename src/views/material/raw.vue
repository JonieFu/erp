<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>物料管理</el-breadcrumb-item>
      <el-breadcrumb-item>重点原材料库存</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="rawForm" :model="SearchForm" size="mini" class="fontSize">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item
              label="原材料编码"
              label-width="75px"
              prop="原材料编码"
              ><el-input
                v-model="SearchForm['原材料编码']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item
              label="原材料名称"
              label-width="75px"
              prop="原材料名称"
              ><el-input
                v-model="SearchForm['原材料名称']"
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
            <el-form-item label="创建时间" label-width="60px" prop="创建时间"
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
            <el-button type="primary" size="mini" @click="addRaw"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyRaw"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteRaw"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableAmountData="tableAmountData"
              :tableTitle="tableTitle"
              fileName="原材料库存单"
            ></Export
          ></el-col>
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
          >
          </el-table-column>
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
      title="添加重点原材料"
      :visible.sync="addRawDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form ref="rawform" :model="addrawForm" label-width="130px">
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          >
            <el-input v-model="addrawForm[value]"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="editRawDialogVisible" width="50%">
      <div class="el-dialog-div">
        <el-form ref="editform" :model="editrawForm" label-width="130px">
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          >
            <el-input v-model="editrawForm[value]"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRawDialogVisible = false">取 消</el-button>
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
        '原材料编码',
        '原材料名称',
        '原材料库存数量',
        '原材料单位',
        '原材料描述',
        '原材料供应商',
        '原材料制造商',
        '预计到货时间',
        '采购数量',
        '实际到货时间',
        '入库时间',
        'BOM编号',
        '物料名称',
        '规格型号',
        '规格单位',
        '生产用量',
        '入库单号',
        '入库单名称',
        '入库材料名称',
        '入库材料数量',
        '计量单位',
        '采购订单编号',
        '采购订单名称',
        '子合同编号',
        '子合同名称',
        '备注',
      ],
      SearchForm: {
        原材料编码: '',
        原材料名称: '',
        采购订单编号: '',
        采购订单名称: '',
      },
      tableList: [],
      currentPage: 1,
      href: '',
      addRawDialogVisible: false,
      editRawDialogVisible: false,
      addrawForm: {
        原材料编码: '',
        原材料名称: '',
        原材料库存数量: '',
        原材料单位: '',
        原材料描述: '',
        原材料供应商: '',
        原材料制造商: '',
        预计到货时间: '',
        采购数量: '',
        实际到货时间: '',
        入库时间: '',
        BOM编号: '',
        物料名称: '',
        规格型号: '',
        规格单位: '',
        生产用量: '',
        入库单号: '',
        入库单名称: '',
        入库材料名称: '',
        入库材料数量: '',
        计量单位: '',
        采购订单编号: '',
        采购订单名称: '',
        子合同编号: '',
        子合同名称: '',
        备注: '',
      },
      editrawForm: {
        原材料编码: '',
        原材料名称: '',
        原材料库存数量: '',
        原材料单位: '',
        原材料描述: '',
        原材料供应商: '',
        原材料制造商: '',
        预计到货时间: '',
        采购数量: '',
        实际到货时间: '',
        入库时间: '',
        BOM编号: '',
        物料名称: '',
        规格型号: '',
        规格单位: '',
        生产用量: '',
        入库单号: '',
        入库单名称: '',
        入库材料名称: '',
        入库材料数量: '',
        计量单位: '',
        采购订单编号: '',
        采购订单名称: '',
        子合同编号: '',
        子合同名称: '',
        备注: '',
      },
      tableAmountData: [],
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        原材料编码: '1010110011',
        原材料名称: '压敏电阻',
        原材料库存数量: '0',
        原材料单位: '件',
        原材料描述: '压敏电阻；S20K420E7/20KDC680V-820V 立式',
        原材料供应商: '爱普科斯电子元器件（珠海保税区）有限公司',
        原材料制造商: '爱普科斯电子元器件（珠海保税区）有限公司',
        预计到货时间: '2020-7-10',
        采购数量: '40000',
        实际到货时间: '2020-7-10',
        入库时间: '2020-7-10',
        BOM编号: 'JY0.055.016',
        物料名称: '压敏电阻',
        规格型号: '压敏电阻；S20K420E7/20KDC680V-820V 立式',
        规格单位: '件',
        生产用量: '40000',
        入库单号: '1.2007.001.40000',
        入库单名称: '国网福建省电力有限公司物资分公司',
        入库材料名称: '压敏电阻',
        入库材料数量: '40000',
        计量单位: '件',
        采购订单编号: '5300016545',
        采购订单名称: '国网福建省电力有限公司物资分公司',
        子合同编号: 'SGLNWZ00HTMM2000868',
        子合同名称: '国网福建省电力有限公司物资分公司',
        备注: '',
      },
    ]
  },
  methods: {
    edit(data) {
      this.editrawForm = data
      this.editRawDialogVisible = true
    },
    remove(index) {
      this.tableList.splice(index, 1)
    },
    deleteRaw() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    modifyRaw() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editrawForm = this.tableAmountData[0]
        this.editRawDialogVisible = true
      }
    },
    editSubmit() {
      this.editRawDialogVisible = false
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    search() {},
    reset() {
      this.$refs.rawForm.resetFields()
    },
    addSubmit() {
      this.addRawDialogVisible = false
      this.$refs.rawform.resetFields()
    },
    addRaw() {
      this.addRawDialogVisible = true
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