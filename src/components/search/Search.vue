<template>
  <div class="container">
    <div class="inputContainer">
      <el-input v-model="input" placeholder="请输入用户id"></el-input>
      <el-button class="searchButton" @click="clickSearchButtonHandler" type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    <div class="searchContainer">
      <el-table v-show="results.length > 0" :data="results" height="100%">
        <el-table-column prop="avatarUrl" label="头像">
          <template scope="scope">
            <el-avatar shape="square" :size="80" :src="scope.row.avatarUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID"></el-table-column>
        <el-table-column prop="pic" label="视频封面">
          <template scope="scope">
            <el-image :src="scope.row.pic" fit="scale-down" style="width: 100px; height: 150px" :preview-src-list="[scope.row.pic]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="playUrl" label="视频播放地址"></el-table-column>
        <el-table-column prop="create_time" label="下载时间">
          <template scope="scope">
            <p>{{time_format(scope.row.create_time)}}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="paginatopm"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="results.length <= 0"
        :page-size='20'
        :total="count"
        layout="prev, pager, next"
      >
      </el-pagination>
    </div>
    <Empty v-show="results.length <= 0" />
  </div>
</template>

<script>
  import Empty from '../empty/Empty'
  import {formatDateTime} from '../../utls/TimeFormat'
    export default {
        name: "Setting",
      data(){
          return {
            input: '',
            results: [],
            count: 0
          }
      },
      components:{
        Empty
      },
      methods:{
          clickSearchButtonHandler(){
            let params = {
              'user_id': this.input
            }
            this.$post('/search',params).then( response => {
              console.log('search === ',response)
              this.results = response.data
              this.count = response.count
            }).catch(error => {
              this.$message(error.msg)
            })
          },
        time_format(value){
          return formatDateTime(value,'YYYY-MM-DD HH:mm:ss')
        },
      }

    }
</script>

<style scoped>
  .container {
    height: 88%;
  }
  .inputContainer {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-left: 10px;
  }
  .searchButton {
    margin-left: 10px;
    margin-right: 20px;
  }
  .searchContainer {
    /*margin: 0 10px;*/
    /*margin-left: 10px;*/
    height: 100%;
  }
  .paginatopm {
    width: 100%;
    text-align: center;
  }

</style>
