<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <div class="SearchResultTab">
      <el-table :data="devListData" style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="120">
        </el-table-column> 
        <el-table-column align="center" prop="id" label="测量ID">
        </el-table-column>
        <el-table-column align="center" prop="name" label="测量名称"></el-table-column>
        <el-table-column align="center" prop="unit" label="测量单位">
        </el-table-column> 
        </el-table-column>
        <el-table-column
          align="center"
          prop="cTime"
          :formatter="({ cTime }) => formatDate(cTime)"
          label="创建时间"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="cTime"
          :formatter="({ uTime }) => formatDate(uTime)"
          label="更新时间"
        >
        </el-table-column>

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
import { $measurementDel, $measurementList } from "@/api/index";
export default {
  components: { ContentTitle },
  data() {
    return {
      ctInfo: {
       type: "自定义类型",
        text: "测量类型",
        msg: "展示所有自定义的测量类型，提供了添加测量类型、修改测量类型、删除测量类型等功能。",
      },
      devListData: [
        {
          id: "2CF7F17221300055",
          name: "二氧化碳传感器",
          unit: "在线",
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
        path: "/measurement/add",
        query: row,
      });
    },
    del(index, { id }) {
      this.$confirm("确定删除吗?")
        .then((res) => {
          $measurementDel({ id }).then((res) => {
            this.devListData.splice(index, 1);
          });
        })
        .catch((err) => {});
    },
    getList() {
      $measurementList().then((res) => {
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