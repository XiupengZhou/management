<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <div class="SearchResultTab">
      <el-table :data="devListData" style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="120">
        </el-table-column>
        <el-table-column align="center" prop="tag" label="标签"> </el-table-column>
        <el-table-column align="center" prop="id" label="密钥ID"> </el-table-column>
        <el-table-column align="center" prop="authority" label="访问权限"> </el-table-column>
        <el-table-column align="center" prop="online" :formatter="({online})=>online?'使用中':'未使用'" label="密钥状态"> </el-table-column>
        <el-table-column align="center" prop="cTime" :formatter="({cTime})=>formatDate(cTime)" label="创建时间"> </el-table-column>
        <el-table-column align="center" prop="cTime" :formatter="({uTime})=>formatDate(uTime)" label="更新时间"> </el-table-column>

        <el-table-column align="center" label="操作">
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
import { $securityDel, $securityList } from "@/api/index";
export default {
  components: { ContentTitle },
  data() {
    return {
      ctInfo: {
        type: "安全",
        text: "API访问密钥",
        msg: "使用访问密钥向SenseCAP API服务发出安全的REST或HTTP请求",
      },
      devListData: [
        {
          tag: "超级用户",
          id: "2CF7F17221300055",
          authority: "8",
          online: "在线",
          cTime: " 2021-08-14 15:30:55",
        },
      ],
    };
  },

  created() {
    this.getList();
  },

  methods: {
    edit(row) {
      this.$router.push({
        path: "/security/add",
        query: row,
      });
    },
    del(index, { id }) {
      this.$confirm("确定删除吗?")
        .then((res) => {
          $securityDel({ id }).then((res) => {
            this.devListData.splice(index, 1);
          });
        })
        .catch((err) => {});
    },
    getList() {
      $securityList().then((res) => {
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