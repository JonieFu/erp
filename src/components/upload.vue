<template>
  <div class="container">
    <el-upload
      ref="upload"
      class="upload-demo"
      action="https://www.liulongbin.top:8888/api/private/v1"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :show-file-list="show"
      :on-progress="handleProgress"
      multiple
      accept=".xlsx,.xls"
      :on-exceed="handleExceed"
    >
      <el-button size="mini" type="info">{{ title }}</el-button>
    </el-upload>
  </div>
</template>
<script>
import * as XLSX from 'xlsx'

export default {
  name: 'Upload',
  components: {},
  props: {
    title: {
      type: String,
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return { fileList: [], fileData: '' }
  },
  computed: {
    show: function () {
      if (this.title === '导入') {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    async handleProgress(_, file, fileList) {
      const confirmResult = await this.$confirm('是否导入此文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => {
        return err
      })
      if (confirmResult === 'confirm') {
        console.log(this.fileList)
        this.handleSuccess(_, file, fileList)
      } else {
        this.$refs.upload.clearFiles()
      }
    },
    async handleSuccess(_, file, fileList) {
      if (this.title === '导入') {
        this.fileData = file
        const resolve = await this.readExcel()
        this.uploadTable(resolve)
      } else {
        return
      }
    },
    uploadTable(value) {
      console.log(value)
      this.$emit('update:tableData', value)
    },
    readExcel() {
      const that = this
      const files = this.fileData
      if (!files) {
        return false
      } else if (!/\.(xls|xlsx)$/.test(files.name.toLowerCase())) {
        this.$message('上传格式不正确，请上传xls或者xlsx格式！')
        return false
      } else {
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(files.raw)
        return new Promise((resolve, reject) => {
          let exportData = []
          fileReader.onload = (e) => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'binary' })
            const wsname = workbook.SheetNames[0]
            // 将excel转成json格式
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])
            const name = Object.keys(ws[0])
            for (let i = 0; i < ws.length; i++) {
              let sheetData = {}
              for (let j = 0; j < name.length; j++) {
                sheetData[name[j]] = ws[i][name[j]]
              }
              exportData.push(sheetData)
            }
            that.tableData.push(...exportData)
            resolve(that.tableData)
          }
        })
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleRemove(file, fileList) {
      this.fileList = []
    },
    async handlePreview(file) {
      const confirmResult = await this.$confirm('是否下载此文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => {
        return err
      })
      if (confirmResult === 'confirm') {
        this.handleSuccess(_, file, fileList)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${fileList.length} 个文件`
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.upload-demo ::v-deep {
  position: relative;
  ul {
    position: absolute;
    left: 80px;
    bottom: 1px;
  }
}
</style>