<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/contract' }"
        >合同管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>编辑合同</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="contractMessage" label-width="130px">
        <el-form-item
          v-for="(value, key, index) in contractMessage"
          :label="key + ':'"
          :key="index"
        >
          <el-input :placeholder="value"></el-input></el-form-item
      ></el-form>

      <el-row>
        <el-col :span="1"
          ><router-link
            :to="{
              name: 'Contract',
              params: { data: contractMessage, num: contractIndex },
            }"
            ><el-button type="primary" size="small"
              >保存</el-button
            ></router-link
          ></el-col
        >
        <el-col :span="1"
          ><router-link :to="{ name: 'Contract' }"
            ><el-button type="primary" size="small"
              >返回</el-button
            ></router-link
          ></el-col
        >
        <el-col :span="1"><Upload title="上传附件"></Upload></el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import Upload from '@/components/upload.vue'
export default {
  components: { Upload },
  data() {
    return {
      contractMessage: {
        商务合同编号: '',
        合同编号: '',
        中标批次: '',
        招标单位: '',
        合同甲方单位: '',
        中标时间: '',
        合同签订结束日期: '',
        中标数量: '',
        状态: '',
        附件: '',
      },

      contractIndex: NaN,
    }
  },
  created() {},
  mounted() {
    console.log(this.$route.params)
    this.contractIndex = this.$route.params.contractIndex
    this.contractMessage = this.$route.params.data
  },
  methods: {
    download() {
      console.log('下载合同')
    },
  },
}
</script>
<style lang="scss" scoped>
</style>