<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <div class="SearchResultTab">
      <el-table :data="devListData" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="120"> </el-table-column>
        <el-table-column prop="account" align="center" label="账号"> </el-table-column>
        <el-table-column prop="username" align="center" label="用户名称"> </el-table-column>
        <el-table-column prop="type" align="center" label="类型" :formatter="formatter">
        </el-table-column>
        <el-table-column prop="cTime" align="center" :formatter="(row)=>{return formatDate(row.cTime)}" label="创建时间"> </el-table-column>
        <el-table-column prop="uTime" align="center" :formatter="(row)=>{return formatDate(row.uTime)}" label="更新时间"> </el-table-column>
        <!-- <el-table-column prop="lTime" align="center" label="最近登录时间"> </el-table-column> -->
        <el-table-column prop="desc" align="center" label="描述"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
              circle
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="del(scope.$index, scope.row)"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import {$accountDel,$accountList} from '@/api/index';
export default {
  components: { ContentTitle },
  data() {
    return {
      ctInfo: {
        type: "子账号",
        text: "子账号列表",
        msg: "展示当前组织下的所有子账号，可修改子账号信息或删除子账号。",
      },
      devListData: [],
    };
  },

  created() {
    this.getList();
  },

  methods: {
    edit(row) {
      this.$router.push({
        path:'/account/add',
        query: row
      })
    },
    del(index,{id}) {
      this.$confirm('确定删除吗?').then(res=> {
          $accountDel({id}).then(res=> {
            this.devListData.splice(index,1);
          })
      }).catch(err=> {})
    },
    formatter({ type }) {
      console.log(type);
      let obj = {
        1: "超级管理员",
        2: "观察员",
        3: "管理员",
      };
      return obj[type];
    },
    getList() {
      $accountList().then((res) => {
        this.devListData = res.data;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.SearchResultTab {
  margin-top: 10px;
}
</style>