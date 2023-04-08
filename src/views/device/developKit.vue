<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <div class="tools">
      <el-button type="primary" size="small" @click="addClick">
        添加新的群组
        <span class="iconfont icon-Add-1"></span>
      </el-button>
    </div>
    <div class="SearchResultTab">
      <el-table :data="devListData" style="width: 100%">
        <el-table-column type="index"> </el-table-column>

        <el-table-column prop="eui" label="EUI"> </el-table-column>

        <el-table-column prop="name" label="设备名称"> </el-table-column>

        <el-table-column prop="nums" label="通道数量"> </el-table-column>
        <el-table-column prop="devGroup" label="设备群组"> </el-table-column>

        <el-table-column prop="bTime" label="绑定时间"> </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >接入</el-button
            >
            <el-button type="text" size="small">移动</el-button>
            <el-button type="text" size="small">数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { ElMessage } from "element-ui";
import $axios from "@/utils/request";
export default {
  components: { ContentTitle },
  data() {
    return {
      ctInfo: {
        type: "设备",
        text: "开发套件",
        msg: "展示EUI、名称、状态等设备信息，并提供查看设备接入Key、移动群组等功能。",
      },
      devListData: [],
    };
  },
  created() {
    this.getList();
  },

  methods: {
    getList() {
      $axios.get('/developKit/list').then(res=> {
        this.devListData = res.data;
      })
    },
    addClick() {
      // ElMessage.error('对不起你没有操作些功能的权限！');
      ElMessage({
        showClose: true,
        message: "对不起你没有操作些功能的权限！",
        duration: 5000,
        type: "error",
      });
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