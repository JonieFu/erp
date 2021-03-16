<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务模块</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/contract' }"
        >合同管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>增加合同</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="addMessage" label-width="130px">
        <el-form-item
          v-for="(value, key, index) in addMessage"
          :label="contractMessage[key] + ':'"
          :key="index"
        >
          <el-input
            v-if="index < 6"
            v-model="addMessage[key]"
            autocomplete="off"
            :placeholder="'请输入' + contractMessage[key]"
            style="width: 232px"
          ></el-input>
          <el-date-picker
            v-else-if="index === 6"
            type="date"
            placeholder="选择日期"
            v-model="addMessage[key]"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
          <el-date-picker
            v-else-if="index === 7"
            type="date"
            placeholder="选择日期"
            v-model="addMessage[key]"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
          <el-input
            v-else-if="index > 7 && index < 13"
            v-model="addMessage[key]"
            autocomplete="off"
            :placeholder="'请输入' + contractMessage[key]"
            style="width: 232px"
          ></el-input>
          <el-select
            v-else
            v-model="addMessage[key]"
            placeholder="请选择状态"
            style="width: 232px"
          >
            <el-option label="待审核" value="待审核"></el-option>
            <el-option label="通过" value="通过"></el-option>
            <el-option label="未通过" value="未通过"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row :gutter="60">
        <el-col :span="1"
          ><router-link
            :to="{
              name: 'Contract',
              params: { addData: addMessage },
            }"
            ><el-button type="primary" size="small"
              >保存</el-button
            ></router-link
          ></el-col
        >
        <el-col :span="1"
          ><router-link
            :to="{
              name: 'Contract',
            }"
            ><el-button type="primary" size="small"
              >返回</el-button
            ></router-link
          ></el-col
        >
        <el-col :span="1"
          ><Upload class="upload" title="上传附件"></Upload
        ></el-col>
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
      addMessage: {
        CONTRACT_NAME: '',
        BUSINESS_CONTRACT_CODE: '',
        CONTRACT_CODE: '',
        BIDDING_POSITION: '',
        BIDDING_PARTY_A: '',
        BIDDING_BATCH: '',
        BIDDING_TIME: '',
        END_TIME: '',
        BIDDING_COUNT: '',
        SOFTWARE_VERSION: '',
        HARDWARE_VERSION: '',
        PRODUCT_DETAIL_CODE: '',
        INTERNAL_CONTROL_CODE: '',
        STATE: '',
      },
      contractMessage: {
        CONTRACT_NAME: '合同名称',
        BUSINESS_CONTRACT_CODE: '商务合同编号',
        CONTRACT_CODE: '合同编号',
        BIDDING_POSITION: '招标单位',
        BIDDING_PARTY_A: '合同甲方单位',
        BIDDING_BATCH: '中标批次',
        BIDDING_TIME: '中标时间',
        END_TIME: '合同签订结束日期',
        BIDDING_COUNT: '中标数量',
        SOFTWARE_VERSION: '研究方案软件版本',
        HARDWARE_VERSION: '研究方案硬件版本',
        PRODUCT_DETAIL_CODE: '产品详细信息编号',
        INTERNAL_CONTROL_CODE: '中标内控订单编号',
        STATE: '状态',
      },
    }
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  border: 1px solid #eeee;
}
::v-deep .upload button {
  height: 32px;
}
</style>