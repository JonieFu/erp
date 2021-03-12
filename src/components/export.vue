<template>
  <div class="export">
    <el-button
      style="margin-left: 24px"
      size="mini"
      type="warning"
      @click="exportData"
    >
      导出
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'Export',
  props: {
    tableAmountData: { type: Array },
    tableTitle: { type: Array },
    fileName: { type: String },
  },
  data() {
    return {}
  },
  methods: {
    exportData() {
      if (this.tableAmountData.length === 0) {
        this.$message({
          message: '请选择要导出数据',
          type: 'warning',
        })
        return
      } else {
        let excelTitle = []
        for (let i = 0; i < this.tableTitle.length; i++) {
          let obj = {}
          obj.label = this.tableTitle[i]
          obj.prop = this.tableTitle[i]
          excelTitle.push(obj)
        }
        let allColumns = excelTitle
        var columnNames = []
        var columnValues = []
        for (var i = 0; i < allColumns.length; i++) {
          columnNames[i] = allColumns[i].label
          columnValues[i] = allColumns[i].prop
        }
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel.js')
          const tHeader = columnNames
          const filterVal = columnValues
          const list = this.tableAmountData
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, this.fileName)
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]))
    },
  },
  created() {},
  mounted() {},
}
</script>
<style lang="scss" scoped>
</style>
