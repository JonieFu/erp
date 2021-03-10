<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item>子合同管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card
      ><el-form ref="salesForm" :model="salesForm" size="small">
        <el-row :gutter="10">
          <el-col :span="6"
            ><el-form-item
              label="采购方总部编码"
              label-width="110px"
              prop="cgfzbbm"
              ><el-input v-model="salesForm.cgfzbbm"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="子合同编号" label-width="90px" prop="zhtbh"
              ><el-input v-model="salesForm.zhtbh"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="供应商编码" label-width="90px" prop="gysbm"
              ><el-input v-model="salesForm.gysbm"></el-input></el-form-item
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
            <el-button type="primary" size="mini" @click="addsales"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifySalesOrder"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteSalesOrder"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableAmountData="tableAmountData"
              :tableTitle="tableTitle"
              fileName="子合同信息"
            ></Export>
          </el-col>
          <el-col :span="2">
            <Upload
              style="margin-left: 30px"
              :title="'导入'"
              :tableData="tableList"
              @update:tableData="updateData"
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
            :prop="value"
            :label="value"
            :key="key"
            :width="value === '来源数据创建时间' ? '120px' : ''"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="150px">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                style="width: 50px; padding: 7px 0"
                @click="edit(row, $index)"
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
      title="添加子合同"
      :visible.sync="addSalesDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="addsaleslist"
          label-width="150px"
          size="small"
        >
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          >
            <el-input
              v-model="addsaleslist[value]"
              placeholder=""
              style="width: 90%"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改子合同"
      :visible.sync="editSalesDialogVisible"
      width="50%"
    >
      <div class="el-dialog-div">
        <el-form
          ref="form"
          :model="editsaleslist"
          label-width="150px"
          size="small"
        >
          <el-form-item
            v-for="(value, key) in tableTitle"
            :label="value"
            :prop="value"
            :key="key"
          >
            <el-input v-model="editsaleslist[value]" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addBomDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Upload from '@/components/upload.vue'
import Export from '@/components/export.vue'
export default {
  components: { Upload, Export },
  data() {
    return {
      tableTitle: [
        '合同编号',
        '子合同编号',
        '供应商编码',
        '子合同状态',
        '物资编码',
        '物资名称',
        '物资单位',
        '物资数量',
        '来源数据创建时间',
        '销售订单状态',
        '子合同名称',
        '合同名称',
      ],
      salesForm: {
        cgfzbbm: '',
        zhtbh: '',
        gysbm: '',
      },
      tableList: [],

      addsaleslist: {
        合同编号: '',
        子合同编号: '',
        供应商编码: '',
        子合同状态: '',
        物资编码: '',
        物资名称: '',
        物资单位: '',
        物资数量: '',
        来源数据创建时间: '',
        销售订单状态: '',
        子合同名称: '',
        合同名称: '',
      },
      currentPage: 1,
      editsaleslist: {
        合同编号: '',
        子合同编号: '',
        供应商编码: '',
        子合同状态: '',
        物资编码: '',
        物资名称: '',
        物资单位: '',
        物资数量: '',
        来源数据创建时间: '',
        销售订单状态: '',
        子合同名称: '',
        合同名称: '',
      },
      addSalesDialogVisible: false,
      editSalesDialogVisible: false,
      tableAmountData: [],
    }
  },
  created() {},
  methods: {
    updateData(value) {
      console.log('子合同', value)
    },
    modifySalesOrder() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        console.log(this.tableAmountData[0])
        this.editsaleslist = this.tableAmountData[0]
        this.editSalesDialogVisible = true
      }
    },
    deleteSalesOrder() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    addsales() {
      this.addSalesDialogVisible = true
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    edit(data) {
      this.editsaleslist = data
      this.editSalesDialogVisible = true
    },
    delet(index) {
      this.tableList.splice(index, 1)
    },
    submit() {
      this.addSalesDialogVisible = false
    },

    search() {},
    reset() {
      this.$refs.purchasForm.resetFields()
    },
  },
}
</script>
<style lang="scss" scoped>
.Upload {
  border: 1px solid red;
}
.export {
  text-decoration: none;
  color: white;
}
.el-dialog-div {
  height: 500px;
  overflow: auto;
}
</style>