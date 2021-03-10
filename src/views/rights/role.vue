<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addRole">添加角色</el-button>
      <el-table
        :data="roleList"
        border
        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      >
        <el-table-column type="expand">
          <template slot-scope="{ row }">
            <el-row
              :class="['bottom', i1 === 0 ? 'top' : '', 'vcenter']"
              :key="item1.id"
              v-for="(item1, i1) in row.children"
            >
              <el-col :span="5">
                <el-tag
                  closable
                  :disable-transitions="false"
                  @close="removeTag"
                >
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  :class="[i2 === 0 ? '' : 'top', 'vcenter']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="8">
                    <el-tag
                      @close="removeTag"
                      type="success"
                      closable
                      :disable-transitions="false"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      @close="removeTag"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      :disable-transitions="false"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="角色名称"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          align="center"
          label="角色描述"
          prop="roleDesc"
        ></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="assign(row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="assignDialogVisible" width="50%">
      <el-tree
        :data="permissionData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-expanded-keys="defKeys"
        :default-checked-keys="defKeys"
        accordion
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="assignDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="添加角色"
      :visible.sync="addRoleDialogVisible"
      width="50%"
    >
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="角色名称"
          ><el-input v-model="addForm.name"></el-input
        ></el-form-item>
        <el-form-item label="角色描述"
          ><el-input v-model="addForm.description"></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      roleList: [
        {
          roleName: '管理员',
          id: 1,
          roleDesc: '系统管理员',
          children: [
            {
              authName: '商品管理',
              id: 11,
              children: [
                {
                  authName: '商品分类',
                  id: 111,
                  children: [
                    {
                      id: 1111,
                      authName: '添加分类',
                    },
                  ],
                },
              ],
            },
            {
              authName: '权限管理',
              id: 12,
              children: [
                {
                  authName: '角色列表',
                  id: 12222,
                  children: [
                    {
                      authName: '角色授权',
                      id: 1211,
                    },
                    {
                      id: 1212,
                      authName: '取消角色授权',
                    },
                  ],
                },
                {
                  authName: '角色列表2',
                  id: 1212,
                  children: [
                    {
                      authName: '角色授权2',
                      id: 1212,
                    },
                    {
                      id: 1213,
                      authName: '取消角色授权2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          roleName: '采购员',
          id: 2,
          roleDesc: '负责采购',
          children: [
            {
              authName: '采购管理',
              id: 21,
              children: [
                {
                  authName: '采购单管理',
                  id: 211,
                  children: [
                    {
                      authName: '退货单管理',
                      id: 2111,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      assignDialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      permissionData: [
        {
          id: 11,
          label: '商品管理',
          children: [
            {
              id: 11,
              label: '商品列表',
              children: [
                { id: 110, label: '添加商品' },
                { id: 113, label: '商品修改' },
                { id: 112, label: '商品删除' },
              ],
            },
            {
              id: 1243,
              label: '分类参数',
              children: [
                { id: 121, label: '获取参数列表' },
                { id: 122, label: '创建商品参数' },
                { id: 123, label: '删除商品参数' },
              ],
            },
            {
              id: 111,
              label: '商品分类',
              children: [
                { id: 1111, label: '添加分类' },
                { id: 132, label: '删除分类' },
                { id: 133, label: '获取分类详情' },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '订单管理',
          children: [
            {
              id: 21,
              label: '订单列表',
              children: [
                { id: 210, label: '添加订单' },
                { id: 211, label: '订单更新' },
                { id: 212, label: '获取订单详情' },
              ],
            },
          ],
        },
        {
          id: 12,
          label: '权限管理',
          children: [
            {
              id: 12222,
              label: '角色列表',
              children: [
                { id: 1211, label: '角色授权' },
                { id: 1212, label: '取消角色授权' },
              ],
            },
            {
              id: 1212,
              label: '角色列表2',
              children: [
                { id: 320, label: '角色授权2' },
                { id: 321, label: '取消角色授权2' },
              ],
            },
          ],
        },
      ],
      defKeys: [],
      addRoleDialogVisible: false,
      addForm: {
        name: '',
        description: '',
      },
    }
  },
  created() {},
  methods: {
    async removeTag() {
      const result = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => {
        return err
      })
      console.log(result)
    },
    assign(role) {
      this.assignDialogVisible = true
      this.getKeys(role, this.defKeys)
    },
    getKeys(node, arr) {
      if (!node.children) {
        arr.push(node.id)
      } else {
        node.children.forEach((item) => {
          return this.getKeys(item, arr)
        })
      }
    },
    addRole() {
      this.addRoleDialogVisible = true
    },
  },
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 7px;
}
.bottom {
  border-bottom: 1px solid #eee;
}
.top {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>