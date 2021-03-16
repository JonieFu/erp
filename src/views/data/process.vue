<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>工艺路线</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="searcDicthRef" :model="SearchForm" size="mini">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="流程代号" label-width="70px" prop="dictName"
              ><el-input
                v-model="SearchForm['流程代号']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="线体描述" label-width="70px" prop="dictType"
              ><el-input
                v-model="SearchForm['线体描述']"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="创建时间" label-width="70px"
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
          <el-col :span="4" style="margin-left: 120px">
            <el-button type="primary" size="mini">搜索</el-button>
            <el-button type="warning" size="mini" @click="reset"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-card>
        <el-row :gutter="60">
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="addProcess"
              >添加</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="modifyProcess"
              >修改</el-button
            >
          </el-col>
          <el-col :span="1">
            <el-button type="danger" size="mini" @click="deleteProcess"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="1">
            <Export
              :tableTitle="tableTitle"
              :tableAmountData="tableAmountData"
              title="工艺路线"
            ></Export>
          </el-col>
          <el-col :span="1">
            <Upload
              style="margin-left: 25px"
              :title="'导入'"
              :tableData="tableList"
              @update:tableData="uploadData"
            ></Upload> </el-col
          >>
        </el-row>
        <el-table
          :data="tableList"
          border
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
          ></el-table-column
          >>
          <el-table-column align="center" label="操作" width="200px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edit(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
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
      title="添加工艺路线管理"
      :visible.sync="processDialogVisible"
      width="50%"
      append-to-body
    >
      <el-form
        :model="addProcessList"
        label-width="90px"
        ref="addprocess"
        style="width: 80%; margin: auto"
      >
        <el-form-item label="流程代号" prop="流程代号"
          ><el-input
            v-model="addProcessList['流程代号']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="线体描述" prop="线体描述"
          ><el-input
            v-model="addProcessList['线体描述']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="流程绘制" prop="流程绘制"
          ><el-input
            v-model="addProcessList['流程绘制']"
            placeholder=""
            clearable
            @clear="clear"
          >
          </el-input>
          <el-checkbox-group v-model="checkList" @change="checkboxChange">
            <el-checkbox label="装配工序"></el-checkbox>
            <el-checkbox label="测试工序"></el-checkbox>
            <el-checkbox label="包装工序"></el-checkbox>
            <el-checkbox label="集成测试工序"></el-checkbox>
            <el-checkbox label="焊接"></el-checkbox>
            <el-checkbox label="封胶工序"></el-checkbox>
            <el-checkbox label="加酸工序"></el-checkbox>
            <el-checkbox label="清洗工序"></el-checkbox>
            <el-checkbox label="入库工序"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="创建人" prop="创建人"
          ><el-input
            v-model="addProcessList['创建人']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="最后更新人" label-width="90px" prop="最后更新人"
          ><el-input
            v-model="addProcessList['最后更新人']"
            placeholder=""
          ></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button type="primary" @click="addSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改工艺路线管理"
      :visible.sync="editprocessDialogVisible"
      width="50%"
      append-to-body
    >
      <el-form
        ref="editForm"
        :model="editProcessList"
        label-width="100px"
        style="width: 80%; margin: auto"
      >
        <el-form-item label="流程代号" prop="流程代号"
          ><el-input
            v-model="editProcessList['流程代号']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="线体描述" prop="线体描述"
          ><el-input
            v-model="editProcessList['线体描述']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="流程绘制" prop="流程绘制"
          ><el-input
            class="haha"
            v-model="editProcessList['流程绘制']"
            placeholder=""
            disabled
            @clear="clear"
          >
          </el-input>
          <el-checkbox-group v-model="checkList" @change="checkboxChange">
            <el-checkbox label="装配工序"></el-checkbox>
            <el-checkbox label="测试工序"></el-checkbox>
            <el-checkbox label="包装工序"></el-checkbox>
            <el-checkbox label="集成测试工序"></el-checkbox>
            <el-checkbox label="焊接"></el-checkbox>
            <el-checkbox label="封胶工序"></el-checkbox>
            <el-checkbox label="加酸工序"></el-checkbox>
            <el-checkbox label="清洗工序"></el-checkbox>
            <el-checkbox label="入库工序"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="创建人" prop="创建人"
          ><el-input
            v-model="editProcessList['创建人']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="创建时间" prop="创建时间"
          ><el-input
            v-model="editProcessList['创建时间']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="最后更新人" prop="最后更新人"
          ><el-input
            v-model="editProcessList['最后更新人']"
            placeholder=""
          ></el-input
        ></el-form-item>
        <el-form-item label="最后更新时间" prop="最后更新时间"
          ><el-input
            v-model="editProcessList['最后更新时间']"
            placeholder=""
          ></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="editprocessDialogVisible = false"
          >确 定</el-button
        >
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
        '流程代号',
        '线体描述',
        '流程绘制',
        '创建时间',
        '创建人',
        '最后更新时间',
        '最后更新人',
      ],
      SearchForm: {
        流程代号: '',
        线体描述: '',
        创建时间: [],
      },
      tableList: [],
      editProcessList: {
        流程代号: '',
        线体描述: '',
        流程绘制: '',
        创建时间: '',
        创建人: '',
        最后更新时间: '',
        最后更新人: '',
      },
      currentPage: 1,
      processDialogVisible: false,
      editprocessDialogVisible: false,
      addProcessList: {
        流程代号: '',
        线体描述: '',
        流程绘制: '',
        创建时间: '',
        创建人: '',
      },
      checkList: [],
      tableAmountData: [],
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        流程代号: '1',
        线体描述: '测试流程',
        流程绘制: '装配工序→测试工序→集成测试工序→焊接',
        创建时间: '2020-12-9',
        创建人: 'admin',
        最后更新时间: '2020-12-23',
        最后更新人: 'admin',
      },
    ]
  },
  methods: {
    uploadData(value) {
      this.tableList = value
    },
    clear() {
      this.checkList = []
    },
    addProcess() {
      this.processDialogVisible = true
    },
    cancelAdd() {
      this.processDialogVisible = false
      this.$refs.addprocess.resetFields()
    },
    handleSelectionChange(val) {
      this.tableAmountData = val
      console.log(this.tableAmountData)
    },
    modifyProcess() {
      if (this.tableAmountData.length === 0) {
        return
      } else {
        this.editProcessList = this.tableAmountData[0]
        this.editprocessDialogVisible = true
        this.checkList = this.editProcessList['流程绘制'].split('→')
      }
    },
    edit(row) {
      this.editProcessList = row
      this.checkList = this.editProcessList['流程绘制'].split('→')
      this.editprocessDialogVisible = true
    },
    cancelEdit() {
      this.editprocessDialogVisible = false
      this.$refs.editForm.resetFields()
    },
    deleteProcess() {
      this.tableList = this.tableList.filter((item) => {
        return this.tableAmountData.indexOf(item) === -1
      })
    },
    delet(index) {
      this.tableList.splice(index, 1)
    },
    addSubmit() {
      this.processDialogVisible = false
      this.$refs.addprocess.resetFields()
      this.checkList = []
    },
    reset() {
      this.$refs.searcDicthRef.resetFields()
    },
    search() {
      console.log('搜索')
    },
    checkboxChange() {
      let str = ''
      if (this.checkList.length === 0) {
        if (this.processDialogVisible === true) {
          this.addProcessList['流程绘制'] = ''
          return
        } else {
          this.editProcessList['流程绘制'] = ''
          return
        }
      }
      this.checkList.forEach((item, index) => {
        if (index === this.checkList.length - 1) {
          str = str + item
          if (this.processDialogVisible === true) {
            this.addProcessList['流程绘制'] = str
            return
          } else {
            this.editProcessList['流程绘制'] = str
            return
          }
        }
        item = item + '→'
        str = str + item
      })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>