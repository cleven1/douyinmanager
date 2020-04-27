<template>
    <div class="container">
      <div class="content">
        <div class="account">
          <span>账号:</span>
          <el-input v-model="account" placeholder="请输入账号" clearable></el-input>
        </div>
        <div class="password">
          <span>密码:</span>
          <el-input v-model="password" placeholder="请输入密码" show-password clearable></el-input>
        </div>
        <el-button ref="loginButton" :loading="isLoading" type="primary" class="logIn" @click="loginHandler">登录</el-button>
      </div>
    </div>
</template>

<script>
  import {setLocalStorage,getLocalStorage} from "../utils/auth";
    export default {
        name: "Login",
      data(){
          return {
            account: '',
            password: '',
            isLoading: false
          }
      },
      methods:{
        loginHandler(){
          if (this.account.trim().length <= 0) {
            this.$message.error('请输入账号');
            return
          }
          if (this.password.trim().length <= 0) {
            this.$message.error('请输入密码');
            return
          }
          this.isLoading = true
          let data = {
            "account": this.account,
            "password": this.password
          }
          this.$post(
            '/login',
             data
          ).then((response) => {
            this.isLoading = false
            console.log('userInfo == ',response)
            setLocalStorage('userInfo',response.data)
            this.$router.push('./home')
          }).catch(error=>{
            this.isLoading = false
            console.log('aaaerror == ',error)
            this.$message({message: error.msg, type: 'error'})
          })
        }
      },
      beforeMount(){
        const userInfo = getLocalStorage('userInfo');
        console.log('userInfo',userInfo || "没有用户数据")
        if (userInfo != null && userInfo.toString().length > 0) {
          this.$router.push('./home')
        }
      }
    }
</script>

<style scoped>

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
    background: url('../../assets/unsplash1.jpg') no-repeat;
    background-size: cover;
  }
  .content {
    border: 1px solid #7e8c8d;
    border-radius: 10px;
    /*height: 180px;*/
    padding: 20px;
    text-align: center;
    background-color: rgba(1,1,1, 0.4);
  }
  .account, .password {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .password {
    margin-top: 20px;
  }
  .account > span, .password > span {
    width: 50px;
    text-align: center;
    margin-right: 10px;
    color: deeppink;
  }
  .logIn {
    margin-top: 20px;
    width: 120px;
  }

</style>
