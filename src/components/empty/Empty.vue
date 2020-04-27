<template>
  <div class="container">
    <img class="emptyImage" src="../../assets/empty.png" alt="">
    <p class="tips">暂无数据</p>
  </div>
</template>

<script>
    export default {
        name: "Empty"
    }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
  }
  .emptyImage {
    width: 40%;
    height: 40%;
  }
  .tips{
    color: deeppink;
    font-size: 30px;
  }

</style>
