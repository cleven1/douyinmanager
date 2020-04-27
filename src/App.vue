<template>
  <div id="app" :style="'height:'+fullHeight+'px;'">
    <Left v-if="this.$route.name !== 'login'" class="left"></Left>
    <keep-alive>
      <router-view class="router_view" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="router_view" v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import Left from './components/left/Left'
  import {getLocalStorage} from "./components/utils/auth";

  export default {
  name: 'App',
  components:{
    Left
  },
    data(){
      return {
        fullHeight: document.documentElement.clientHeight
      }
    },
    watch: {
      fullHeight(val){
        if(!this.timer) {
          this.fullHeight = val
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    mounted () {
      this.get_bodyHeight()
    },
    methods :{
      get_bodyHeight () {//动态获取浏览器高度
        const that = this
        window.onresize = () => {
          return (() => {
            window.fullHeight = document.documentElement.clientHeight
            that.fullHeight = window.fullHeight
          })()
        }
      }
    },
  beforeMount(){
    const userInfo = getLocalStorage('userInfo');
    console.log('userInfo',userInfo || "没有用户数据")
    if (userInfo == null && userInfo.toString().length <= 0) {
      this.$router.push('./login')
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  height: auto;
  /*width: 100%;*/
}
  .left {
    width: 70px;
  }
  .router_view {
    flex-grow: 1;
    /*z-index: 3000;*/
  }
</style>
