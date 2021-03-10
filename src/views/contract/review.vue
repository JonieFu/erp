<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/contract' }"
        >合同管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>审查合同</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="reviewMessage" label-width="130px">
        <el-form-item
          v-for="(value, key, index) in contractMessage"
          :label="key + ':'"
          :key="index"
        >
          <el-input
            :placeholder="value"
            :disabled="true"
          ></el-input></el-form-item
      ></el-form>
      <el-row>
        <el-col :span="1">
          <router-link
            :to="{
              name: 'Contract',
              params: { data: contractMessage, num: contractIndex },
            }"
            ><el-button type="primary" size="small" @click="revamp('通过')"
              >通过</el-button
            ></router-link
          >
        </el-col>
        <el-col :span="1"
          ><router-link
            :to="{
              name: 'Contract',
              params: { data: contractMessage, num: contractIndex },
            }"
            ><el-button type="info" size="small" @click="revamp('未通过')"
              >未通过</el-button
            ></router-link
          ></el-col
        >
        <el-col :span="1">
          <router-link
            :to="{
              name: 'Contract',
              params: { data: contractMessage, num: contractIndex },
            }"
            ><el-button
              type="primary"
              size="small"
              @click="revamp('待审核')"
              style="margin-left: 15px"
              >返回</el-button
            ></router-link
          ></el-col
        >
        <el-col :span="2"
          ><el-button
            type="primary"
            size="small"
            @click="download"
            style="margin-left: 15px"
            >下载附件</el-button
          ></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  components: {},
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
      reviewMessage: {},
      contractIndex: NaN,
    }
  },
  created() {},
  mounted() {
    this.contractIndex = this.$route.params.contractIndex
    this.contractMessage = this.$route.params.data
  },
  methods: {
    download() {
      window.alert('下载附件')
    },
    revamp(state) {
      this.reviewMessage.STATE = state
    },
  },
}
</script>
<style lang="scss" scoped>
</style>