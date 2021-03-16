<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item>合同管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form size="mini" :model="searchInput">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item
              label="商务合同编号"
              label-width="90px"
              class="fontSize"
            >
              <el-input v-model="searchInput['商务合同编号']"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="合同编号" label-width="60px" class="fontSize">
              <el-input v-model="searchInput['合同编号']"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="合同名称" label-width="60px" class="fontSize">
              <el-input
                v-model="searchInput['合同名称']"
                placeholder=""
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="创建时间" label-width="60px" class="fontSize"
              ><el-date-picker
                style="width: 200px"
                v-model="searchInput['创建时间']"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker></el-form-item
          ></el-col>
          <el-col :span="4" style="margin-left: 110px">
            <el-button type="primary" size="mini">搜索</el-button>
            <el-button type="primary" size="mini"
              ><router-link :to="{ name: 'ContractAdd' }" class="add"
                >新增</router-link
              ></el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="tableList"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          v-for="(value, key) in tableTitle"
          :label="value"
          :prop="value"
          :key="key"
        ></el-table-column>
        <el-table-column align="center" label="操作" class="handle">
          <template scope="{$index,row}">
            <el-row>
              <el-col>
                <router-link
                  :to="{
                    name: 'ContractReview',
                    params: { data: reviewMessage, contractIndex: $index },
                  }"
                >
                  <el-button
                    type="priamary"
                    size="mini"
                    @click="review($index, row)"
                  >
                    审查</el-button
                  >
                </router-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <router-link
                  :to="{
                    name: 'ContractEdit',
                    params: { data: reviewMessage, contractIndex: $index },
                  }"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    @click="edit($index, row)"
                    >编辑</el-button
                  >
                </router-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col
                ><el-button
                  size="mini"
                  type="danger"
                  @click="removeRow($index, row)"
                  >删除</el-button
                ></el-col
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      searchInput: {
        商务合同编号: '',
        合同编号: '',
        合同名称: '',
        创建时间: [],
      },
      tableTitle: [
        '商务合同编号',
        '合同编号',
        '招标批次',
        '招标单位',
        '合同甲方单位',
        '中标时间',
        '合同签订结束日期',
        '中标数量',
        '状态',
        '附件',
      ],
      tableList: [],
      tableDataAmount: [],
      visible: false,
      editVisible: false,
      reviewMessage: {},
    }
  },
  created() {},
  mounted() {
    this.tableList = [
      {
        商务合同编号: '235437y',
        合同编号: 'GSD23124',
        中标批次: '1234567',
        招标单位: '京仪研究总院',
        合同甲方单位: '京仪北方',
        中标时间: '2020-1-1',
        合同签订结束日期: '2022-1-1',
        中标数量: '1',
        状态: '已通过',
        附件: '',
      },
      {
        商务合同编号: '235437y',
        合同编号: 'GSD23124',
        中标批次: '1234567',
        招标单位: '京仪研究总院',
        合同甲方单位: '京仪北方',
        中标时间: '2020-1-1',
        合同签订结束日期: '2022-1-1',
        中标数量: '1',
        状态: '待审核',
        附件: '',
      },
      {
        商务合同编号: '235437y',
        合同编号: 'GSD23124',
        中标批次: '1234567',
        招标单位: '京仪研究总院',
        合同甲方单位: '京仪北方',
        中标时间: '2020-1-1',
        合同签订结束日期: '2022-1-1',
        中标数量: '1',
        状态: '未通过',
        附件: '',
      },
      {
        商务合同编号: '235437y',
        合同编号: 'GSD23124',
        中标批次: '1234567',
        招标单位: '京仪研究总院',
        合同甲方单位: '京仪北方',
        中标时间: '2020-1-1',
        合同签订结束日期: '2022-1-1',
        中标数量: '1',
        状态: '待审核',
        附件: '',
      },
    ]
  },
  methods: {
    async removeRow(index, row) {
      const confirmResult = await this.$confirm('是否删除此文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => {
        return err
      })
      if (confirmResult === 'confirm') {
        this.tableList.splice(index, 1)
      } else {
        return
      }
    },
    edit(index) {
      this.reviewMessage = this.tableList[index]
    },
    review(index) {
      this.reviewMessage = this.tableList[index]
    },
    handleSelectionChange(data) {
      this.tableDataAmount = data
    },
  },
}
</script>
<style lang="scss" scoped>
.add {
  text-decoration: none;
  color: white;
}
.fontSize {
  ::v-deep .el-form-item__label {
    font-size: 12px;
  }
}
</style>