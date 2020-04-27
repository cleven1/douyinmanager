<template>
    <div class="container" v-if="datas.length > 0">
      <el-table :data="datas"  height="100%">
        <el-table-column label="用户头像" prop="avatarUrl" fixed="left">
          <template scope="scope">
            <el-avatar shape="square" :size="80" :src="scope.row.avatarUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column label="用户id" prop="user_id"></el-table-column>
        <el-table-column label="用户名" prop="nickName"></el-table-column>
        <el-table-column label="性别" prop="gender">
          <template scope="scope">
            <p>{{scope.row.gender == 0 ? "男" : "女"}}</p>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" prop="contact"></el-table-column>
        <el-table-column label="意见和建议" prop="note"></el-table-column>
        <el-table-column label="提交时间" prop="create_time"
                         column-key="create_time"
                         :filters="dateFilter"
                         :filter-method="dateFilterHandler">
          <template scope="scope">
            <p>{{time_format(scope.row.create_time)}}</p>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="paginatopm"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :hide-on-single-page="datas.length <= 0"
        :page-size="20"
        :total="count"
        layout="prev, pager, next"
      >
      </el-pagination>
    </div>
  <Empty v-else/>
</template>

<script>
  import {formatDateTime} from '../../utls/TimeFormat'
  import Empty from '../empty/Empty'
    export default {
        name: "Note",
      components: {Empty},
      data(){
          return {
            count: 0,
            datas:[
              {
                "user_id": "123123123",
                "nickName": "我问问",
                "avatar_url": "",
                "gender": "1",
                "create_time": "1587972542",
                "contact": "1231231231",
                "note": "我去额无人区无日期提前问题"
              }
            ]
          }
        },
      computed: {
        dateFilter() {
          const originItems = this.datas
          let items = originItems.map(v => {
            return {'text': this.time_format(v.create_time), value: v.create_time}
          })
          console.log('items == ', items)
          return items
        },
      },
      methods: {
        time_format(value){
          return formatDateTime(value,'YYYY-MM-DD HH:mm:ss')
        },
        dateFilterHandler(value, row, column){
          const property = column['property'];
          return row[property] === value;
        },
        fetchNoteData(page){
          this.$fetch('/note',{"page": page}).then( response => {
            this.datas = response.data
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
          this.fetchNoteData(val)
        }
      },
      mounted(){
        this.fetchNoteData(null)
      },
    }
</script>

<style scoped>
  .container {
    height: 95%;
  }
  .paginatopm {
    width: 100%;
    text-align: center;
  }
</style>
