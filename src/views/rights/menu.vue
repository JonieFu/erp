<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :model="menuForm" size="small">
        <el-row :gutter="10">
          <el-col :span="6"
            ><el-form-item
              ><el-input
                placeholder="名称"
                v-model="menuForm.name"
              ></el-input></el-form-item
          ></el-col>
          <el-col :span="10">
            <el-button icon="el-icon-search" type="primary" size="small"
              >搜索</el-button
            >
            <el-button
              icon="el-icon-circle-plus-outline"
              type="primary"
              size="small"
              >添加</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <el-row></el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="ID"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          align="center"
          type="index"
          label="ID"
        ></el-table-column>
        <el-table-column align="center" prop="name" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="type" label="类型">
          <template slot-scope="{ row }">
            <el-tag size="mini" v-if="row.type === '0'">目录</el-tag>
            <el-tag size="mini" v-else-if="row.type === '1'" type="success"
              >菜单</el-tag
            >
            <el-tag size="mini" v-else type="info">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="prename" label="上级菜单">
        </el-table-column>
        <el-table-column
          align="center"
          prop="url"
          label="菜单URL"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRow(row)"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="29"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          ID: '1',
          name: '系统管理',
          prename: '',
          url: '/sys/user',
          type: '0',
          children: [
            {
              ID: '2',
              name: '用户管理',
              prename: '系统管理',
              url: '/sys/user',
              type: '1',
              children: [
                {
                  ID: '3',
                  name: '查看',
                  prename: '用户管理',
                  url: '/sys/user',
                  type: '2',
                },
                {
                  ID: '4',
                  name: '新增',
                  prename: '用户管理',
                  url: '/sys/user',
                  type: '2',
                },
                {
                  ID: '5',
                  name: '修改',
                  prename: '用户管理',
                  url: '/sys/user',
                  type: '2',
                },
                {
                  ID: '6',
                  name: '删除',
                  prename: '用户管理',
                  url: '/sys/user',
                  type: '2',
                },
              ],
            },
          ],
        },
      ],
      menuForm: {
        name: '',
      },
      currentPage: 1,
    }
  },
  created() {},
  methods: {
    editRow(row) {
      console.log(row)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>