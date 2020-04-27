<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    width="20%"
    center
    >
    <span v-if="content">{{content}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isShow = false">取 消</el-button>
    <el-button type="primary" @click="handleClose">{{okTitle ? okTitle : "确认"}}</el-button>
  </span>
  </el-dialog>
</template>

<script>
    export default {
        name: "CLDialog",
      props: {
        isShow: Boolean,
        okTitle: String,
        content: String,
        title: String,
        okHandler: Function
      },
      data() {
        return {

        };
      },
      methods: {
        handleClose() {
          this.isShow = false
          this.okHandler();
        }
      },
      computed: {
        //   dialogTitle(){
        //     return this.title
        // }
      }
    }
</script>

<style scoped>

</style>
