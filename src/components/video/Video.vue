<template>
  <div class="container" v-if="videos.length > 0">
    <VideoPlayerUtil ref="videoPlayer"/>
    <el-table :data="videos" height="100%">
      <el-table-column prop="user_id" label="用户ID" column-key="user_id" :filters="userFilter" :filter-method="filterHandler"></el-table-column>
      <el-table-column prop="title" label="视频名称"></el-table-column>
      <el-table-column prop="pic" label="视频封面">
        <template scope="scope">
          <el-image :src="scope.row.pic" fit="scale-down" style="width: 100px; height: 150px" :preview-src-list="[scope.row.pic]"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="palyUrl" label="播放地址">
        <template scope="scope">
          <el-link type="primary" :underline="false" @click="clickPlayVideoHandler(scope.row)">{{scope.row.playUrl}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="下载次数" column-key="count" :filters="downloadFilter" :filter-method="filterHandler">
        <template scope="scope">
          <p>下载{{scope.row.count}}次</p>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template scope="scope">
          <p>{{time_format(scope.row.create_time)}}</p>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="paginatopm"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :hide-on-single-page="videos.length <= 0"
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
  import VideoPlayerUtil from '../../utls/VideoPlayerUtil'
  import Empty from '../empty/Empty'
    export default {
        name: "Video",
      data(){
          return {
            videos:[],
            count: 0
          }
      },
      components:{
        VideoPlayerUtil,
        Empty
      },
      methods:{
        time_format(value){
          console.log("时间",value)
          return formatDateTime(value,'YYYY-MM-DD HH:mm:ss')
        },
        clickPlayVideoHandler(item){
          this.$refs.videoPlayer.videoUrl = item.playUrl
          this.$refs.videoPlayer.coverUrl = item.pic
        },
        filterHandler(value, row, column){
          const property = column['property'];
          return row[property] === value;
        },
        fetchVideosData(page){
          this.$fetch('/video',{"page": page})
            .then(response =>{
              this.videos = response.data
              this.count = response.count
            }).catch(error => {
            this.$message(error.msg)
          })
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.fetchVideosData(val)
        }
      },
      computed: {
        userFilter(){
          const originItems = this.videos
          let items = originItems.map(v =>{
            return {'text': v.user_id, value: v.user_id}
          })
          /// 数组去重
          var map = {}
          items.forEach(v => {
            map[v.value] = v
          });
          return Object.entries(map).map(v=>v[1])
        },
        downloadFilter(){
          const originItems = this.videos
          let items = originItems.map(v =>{
            return {'text': '下载'+v.count+'次', value: v.count}
          })
          /// 数组去重
          var map = {}
          items.forEach(v => {
            map[v.value] = v
          });
          return Object.entries(map).map(v=>v[1])
        }
      },
      mounted(){
        this.fetchVideosData(null)
      }
    }
</script>

<style scoped>
  .container {
    height: 95%;
    /*margin-left: 50px;*/
  }
  .paginatopm {
    text-align: center;
  }
</style>
