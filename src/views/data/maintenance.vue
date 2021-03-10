<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据</el-breadcrumb-item>
      <el-breadcrumb-item>基础数据维护</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-container
        ><el-aside
          width="300px"
          style="padding: 2px; height: 85vh; background: #eeeeee"
        >
          <el-table :data="dataList" border>
            <el-table-column align="center" label="表名称" prop="name">
              <template slot-scope="{ row }"
                ><el-button
                  style="color: black"
                  type="text"
                  @click="showDetails(row)"
                  >{{ row.name }}</el-button
                ></template
              >
            </el-table-column>
            <el-table-column
              align="center"
              label="业务描述"
              prop="description"
            ></el-table-column>
          </el-table>
          <el-pagination
            small
            :current-page="currentPage"
            layout="prev, pager, next"
            :total="29"
          >
          </el-pagination>
        </el-aside>
        <el-main style="height: 85vh">
          <el-form :model="formData" label-width="80px" size="small">
            <el-row :gutter="10">
              <el-col :span="7"
                ><el-form-item label="表名称"
                  ><el-input
                    v-model="formData.name"
                    placeholder=""
                  ></el-input></el-form-item
              ></el-col>
              <el-col :span="3">
                <el-button type="primary" icon="el-icon-search" size="small"
                  >搜索</el-button
                >
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="tableDetails">
            <el-table-column
              align="center"
              label="序号"
              type="index"
            ></el-table-column>
            <el-table-column
              align="center"
              label="工序代码"
              prop="name"
            ></el-table-column>
            <el-table-column
              align="center"
              label="业务描述"
              prop="description"
            ></el-table-column
            ><el-table-column
              align="center"
              label="创建用户"
              prop="user"
            ></el-table-column
            ><el-table-column
              align="center"
              label="创建时间"
              prop="time"
            ></el-table-column>
            <el-table-column align="center" label="状态"
              ><template slot-scope="{ row }">
                {{ row.status === 1 ? '正常' : '非正常' }}</template
              >
            </el-table-column>
            <el-table-column align="center" label="操作"
              ><template
                ><el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                ></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                ></el-button></template
            ></el-table-column>
          </el-table> </el-main
      ></el-container>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dataList: [
        {
          name: 'sp_factory',
          description: '工厂主数据',
          user: 'admin',
          time: '2021-1-4',
          status: 0,
        },
        {
          name: 'op_factory',
          description: '第一批数据',
          user: 'admin',
          time: '2021-1-4',
          status: 0,
        },
        {
          name: 'sp2_factory',
          description: '第二批数据',
          user: 'admin',
          time: '2021-1-4',
          status: 1,
        },
      ],
      formData: {
        name: '',
      },
      tableDetails: [],
      currentPage: 1,
    }
  },
  created() {
    this.tableDetails = [this.dataList[0]]
  },
  methods: {
    showDetails(data) {
      this.tableDetails = [data]
      console.log(data)
    },
  },
}
</script>
<style lang="scss" scoped>
.el-card ::v-deep.el-card__body {
  padding: 0;
}
.el-aside {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
}
</style>