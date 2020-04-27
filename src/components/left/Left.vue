<template>
    <div class="container">
      <CLDialog ref="dialog"/>
      <ul class="left-nav">
        <li @click="itemHandler(0)">
          <i class="icon iconfont icon-zhuye"></i>
          <div>主页</div>
        </li>
        <li @click="itemHandler(1)">
          <i class="icon iconfont icon-lianxiren"></i>
          <div>用户</div>
        </li>
        <li @click="itemHandler(2)">
          <i class="icon iconfont icon-liebiao"></i>
          <div>视频</div>
        </li>
        <li @click="itemHandler(3)">
          <i class="icon iconfont icon-search"></i>
          <div>搜索</div>
        </li>
        <li @click="itemHandler(4)">
          <i class="icon iconfont icon-tixing"></i>
          <div>建议</div>
        </li>
      </ul>
      <div class="logOut" @click="logOut">
        <i class="icon iconfont icon-tixing"></i>
        <div>登出</div>
      </div>
    </div>
</template>

<script>
  import CLDialog from '../utils/CLDialog'
  import {setLocalStorage} from "../utils/auth";

  export default {
        name: "Left",
      components:{
        CLDialog
      },
      methods: {
        itemHandler(index) {
          // 这里就可以通过 val 的值变更来确定去向
          switch (index) {
            case 0:
              this.$router.replace('/home');
              break;
            case 1:
              this.$router.replace('/user');
              break;
            case 2:
              this.$router.replace('/video');
              break;
            case 3:
              this.$router.replace('/search');
              break;
            case 4:
              this.$router.replace('/note');
              break;
          }
        },
        logOut(){
          const dialog = this.$refs.dialog
          dialog.title = "确认要退出吗?"
          dialog.content = "请仔细斟酌"
          dialog.isShow = true
          dialog.okHandler = () =>{
            setLocalStorage("userInfo",null)
            this.$router.push('./login')
          }
        }
      }
    }
</script>

<style scoped>
  .container {
    z-index: 990;
  }
  .left-nav{
    color: #fff;
    font-size: 10px;
    height: 100%;
    background-color: #1d8ce0;
    float: left;
    width: 70px;
    min-width: 70px;
    position: fixed;
    min-width: 70px;
  }
  .iconfont {
    font-size: 24px;
  }
  .left-nav ul{
    padding: 0px;
    margin: 0px;
  }

  .left-nav li {
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
    transition-duration: 0.5s;
  }
  .left-nav li > div {
    margin-top: 10px;
  }
  .left-nav li:hover {
    cursor: pointer;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  .logOut {
    width: 70px;
    height: 70px;
    position: absolute;
    bottom: 0px;
    text-align: center;
    color: #fff;
    font-size: 10px;
    cursor: pointer;
    border-top: 1px solid #20a0ff;
    transition-duration: 0.5s;
    overflow: hidden;
  }
  .logOut:hover {
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  .logOut i {
    display: inline-block;
    margin: 10px auto;
  }

</style>
