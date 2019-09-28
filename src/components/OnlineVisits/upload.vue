<template>
  <div>
    <el-upload
      :class="{hide:hideUpload}"
      :action="imgUrl"
      list-type="picture-card"
      :file-list="fileList"
      :on-change="handleUploading"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-preview="handlePictureCardPreview">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      width="30%"
      title="图片详情"
      :visible.sync="dialogVisible"
      append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {PICTURE_UPLOAD_ADDRESS, IMGdelete} from '@/axios/config'
export default {
  name: 'upload',
  data () {
    return {
      imgUrl: PICTURE_UPLOAD_ADDRESS,
      dialogVisible: false,
      dialogImageUrl: false,
      hideUpload: false
    }
  },
  props: {
    limitCount: {
      type: Number,
      default: 1
    },
    fileList: {
      type: Array,
      default: null
    }
  },
  created () {
    this.hideUpload = this.fileList.length >= this.limitCount
  },
  methods: {
    handleUploading (file, fileList) { // 上传图片
      this.hideUpload = fileList.length >= this.limitCount
    },
    handleSuccess (file) { // 上传成功图片
      this.$emit('imgPath', file.message)
    },
    handleRemove (file, fileList) { // 删除图片
      if (file.response) {
        IMGdelete(file.response.message).then(res => {
          this.hideUpload = fileList.length >= this.limitCount
        })
      } else {
        this.hideUpload = fileList.length >= this.limitCount
      }
    },
    handlePictureCardPreview (file) { // 放大
      console.log(file)
      if (file.response) {
        this.dialogImageUrl = file.response.message
      } else {
        this.dialogImageUrl = file.url
      }
      this.dialogVisible = true
    }
  }
}
</script>
<style>
  .hide .el-upload--picture-card {
    display: none;
  }
</style>>
