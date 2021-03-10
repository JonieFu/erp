<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/dict' }">字典设置</el-breadcrumb-item>
      <el-breadcrumb-item>列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="searcDicthRef" :model="SearchForm" size="small">
        <el-row :gutter="10">
          <el-col :span="4"
            ><el-form-item label="字典名称" label-width="70px" prop="dictName"
              ><el-input v-model="SearchForm.dictName"></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="字典标签" label-width="70px" prop="dictLable"
              ><el-input
                v-model="SearchForm.dictLable"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="4"
            ><el-form-item label="数据状态" label-width="70px" prop="dictStatus"
              ><el-input
                v-model="SearchForm.dictStatus"
              ></el-input></el-form-item
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
      <el-table
        :data="tableList"
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column
          align="center"
          prop="dictNum"
          label="字典编码"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="dictLable"
          label="字典标签"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="dictKey"
          label="字典键值"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="dictSort"
          label="字典排序"
        ></el-table-column>
        <el-table-column align="center" prop="dictStatus" label="状态">
          <template slot-scope="{ row }">
            <el-tag v-if="row.dictStatus === 1"> 正常</el-tag>
            <el-tag v-if="row.dictStatus === 0" type="info"> 不正常</el-tag>
          </template></el-table-column
        >
        <el-table-column
          align="center"
          prop="Note"
          label="备注"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="dictTmie"
          label="创建时间"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="300px">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="aa">总共{{ tableList.length }}条记录</div>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      SearchForm: {
        dictName: '',
        dictLable: '',
        dictStatus: '',
      },
      tableList: [
        {
          dictNum: '1',
          dictLable: '男',
          dictKey: 0,
          dictSort: 1,
          dictStatus: 1,
          Note: '性别男',
          dictTmie: '2020-12-23',
        },
        {
          dictNum: '2',
          dictLable: '女',
          dictKey: 1,
          dictSort: 1,
          dictStatus: 1,
          Note: '性别女',
          dictTmie: '2020-12-23',
        },
      ],
    }
  },
  created() {},
  mounted() {
    this.SearchForm.dictName = this.$route.params.dictName
    this.SearchForm.dictStatus = this.$route.params.dictStatus
    console.log(this.$route.params)
  },
  methods: {
    reset() {
      this.$refs.searcDicthRef.resetFields()
    },
    search() {
      console.log(this.SearchForm)
    },
  },
}
</script>
<style lang="scss" scoped>
.aa {
  margin-top: 10px;
}
</style>