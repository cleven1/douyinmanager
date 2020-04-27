<template>
  <div class="container" v-if="items.length > 0">
    <el-table :data="items" height="100%">
      <el-table-column label="头像" fixed="left">
        <template scope="scope">
          <el-avatar shape="square" :size="80" :src="scope.row.avatarUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="用户名"></el-table-column>
      <el-table-column prop="gender" label="性别">
        <template scope="scope">
          <p>{{scope.row.gender == 0 ? "男" : "女"}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="user_id" label="用户ID">
        <template scope="scope">
          <p v-if="!scope.row.isModify">{{scope.row.user_id}}</p>
          <el-input v-else :label="scope.row.user_id" v-model="user_id" clearable maxlength="8" ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="openId" label="openID"></el-table-column>
      <el-table-column prop="country" label="国家"></el-table-column>
      <el-table-column prop="province" label="省"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="register_time" label="注册时间"
                       column-key="register_time"
                       :filters="dateFilter"
                       :filter-method="dateFilterHandler"
      >
        <template scope="scope">
          <p>{{time_format(scope.row.register_time)}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="level" label="用户等级"
                       column-key="user_level"
                       :filters="userLevelFilter"
                       :filter-method="dateFilterHandler"
      >
        <template scope="scope">
          <p v-if="!scope.row.isModify">{{user_level_format(scope.row.level)}}</p>
          <el-input v-else :label="scope.row.level" v-model="user_level" clearable maxlength="2"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" v-if="userInfo.level !== '0'">
        <template scope="scope">
          <el-button type="text" size="small" @click="deleteUserHandler(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="modifyUserHandler(scope)">
            {{scope.row.isModify ? "完成" : "修改"}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="paginatopm"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="items.length <= 0"
      :page-size='20'
      :total="count"
      layout="prev, pager, next"
      >
    </el-pagination>
  </div>
  <Empty v-else />
</template>

<script>
  import {formatDateTime} from '../../utls/TimeFormat'
  import Empty from '../empty/Empty'
  import {getLocalStorage} from "../utils/auth";

  export default {
        name: "User",
      components: {
        Empty
      },
      data(){
          return {
            items:[],
            userInfo: getLocalStorage('userInfo'),
            user_id: null,
            user_level: null,
            count: 0
          }
      },
      mounted(){
        this.fetchUserData(null)
      },
      computed:{
        dateFilter(){
          const originItems = this.items
          let items = originItems.map(v =>{
            return {'text': this.time_format(v.register_time), value: v.register_time}
          })
          console.log('items == ',items)
          return items
        },
        userLevelFilter(){
          const originItems = this.items
          let items = originItems.map(v =>{
            return {'text': this.user_level_format(v.level), value: v.level}
          })
          console.log('items == ',items)
          return items
        }
      },
      methods: {
        deleteUserHandler(item){
            this.$message({
              message: '不让删',
              type: 'warning'
            })
        },
        modifyUserHandler(item){
          item.row.isModify = !item.row.isModify
          if (item.row.isModify) {
            this.user_id = item.row.user_id
            this.user_level = item.row.level
            return
          }
          let params = {
            "user_id": this.user_id,
            "level": this.user_level
          }
          console.log('item === ',item)
          this.$post(
            '/modifyuser',
             params
          ).then((response) => {
            console.log('userInfo == ',response)
            const user = this.items[item.$index]
            user.level = params.level
            user.user_id = params.user_id
            this.items[item.$index] = user
          }).catch(error=>{
            this.$message({message: error.msg, type: 'error'})
          })
        },
        time_format(value){
          return formatDateTime(value,'YYYY-MM-DD HH:mm:ss')
        },
        user_level_format(value){
          if (value == 0){
            return '普通用户'
          } else if (value == 1){
            return "开发人员"
          } else {
            return "最高权限"
          }
        },
        dateFilterHandler(value, row, column){
          const property = column['property'];
          return row[property] === value;
        },
        fetchUserData(page){
          this.$fetch('/user',{"page": page})
            .then(response =>{
              let array = []
              this.count = response.count
              response.data.map((item) => {
                array.push(
                  Object.assign({},item, {'isModify': false})
                )
              })
              console.log('response == ',array)
              this.items = array
            }).catch(error => {
            this.$message(error.msg)
          })
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.fetchUserData(val)
        }
      }
    }
</script>

<style scoped>
  .container {
    /*width: 100%;*/
    height: 95%;
  }
  .paginatopm {
    /*height: 40px;*/
    width: 100%;
    text-align: center;
  }

</style>
