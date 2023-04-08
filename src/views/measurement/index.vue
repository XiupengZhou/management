<template>
  <div>
    <ContentTitle :info="ctInfo" />

    <el-empty
      v-if="roleType === 3"
      description="对不起,你没有操作些功能的权限！"
    ></el-empty>

    <div v-else>
      <div class="tools">
        <el-button type="primary" size="small" @click="addClick">
          添加新的类型
          <span class="iconfont icon-Add-1"></span>
        </el-button>
      </div>

      <div class="SearchResultTab">
        <el-table :data="devListData" style="width: 100%">
          <el-table-column type="index"> </el-table-column>

          <el-table-column prop="id" label="测量类型ID"> </el-table-column>

          <el-table-column prop="name" label="测量类型名称"> </el-table-column>

          <el-table-column prop="unit" label="测量值单位"> </el-table-column>

          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >接入</el-button
              >
              <el-button type="text" size="small" @click="handleClick"
                >移动</el-button
              >
              <el-button type="text" size="small" @click="handleClick"
                >数据</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue"; 
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
  computed: {
    roleType() {
      return this.$store.state.userInfo.type * 1;
    },
  },
  methods: {
    addClick() {
      this.$message("功能开发中...");
    },
    handleClick() {
      this.$message("功能开发中...");
    },
  },
};
</script>

<style lang="less" scoped>
.tools {
  padding: 10px;
  margin: 10px 0;
  background: #fff;
}
</style>