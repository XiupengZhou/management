<template>
  <div>
    <ContentTitle :info="ctInfo" />
    <el-row class="tools flex jc-sb aic">
      <el-col :span="3">
        <span>群组名称:</span>
      </el-col>
      <el-col :span="5">
        <el-input
          v-model="keyword"
          size="small"
          placeholder="群组名称"
          @keypress.native="enterSearch"
        ></el-input>
      </el-col>
      <el-col :span="5" class="ml-10">
        <el-button type="primary" size="small" @click="search">搜索</el-button>
      </el-col>
      <el-col class="searchResult">搜索结果: {{total}}</el-col>
      <el-col class="fg1"></el-col>
      <el-col :span="5">
        <el-button
          type="primary"
          size="small"
          @click="
            dialogVisible = true;
            groupName = '';
          "
        >
          新增群组
          <span class="iconfont icon-Add-1"></span>
        </el-button>
      </el-col>
    </el-row>
    <div class="SearchResultTab">
      <el-table :data="devListData" style="width: 100%">
        <el-table-column type="index"> </el-table-column>

        <el-table-column prop="groupName" label="群组名称"> </el-table-column>

        <el-table-column prop="nodeNums" label="传感器节点数量">
        </el-table-column>

        <!-- <el-table-column prop="devNums" label="设备数量"> </el-table-column> -->

        <el-table-column prop="onlineNums" label="在线设备数量">
        </el-table-column>

        <el-table-column prop="cTime" label="创建时间"> </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              @click="showDialog(scope.$index, scope.row)"
              type="text"
              size="small"
              >重命名</el-button
            >
            <el-button
              @click="delGroup(scope.$index, scope.row)"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose"
    >
      <el-input v-model="groupName" placeholder="群组名称"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            @click="
              dialogVisible = false;
              row = null;
              editIndex = '';
            "
            >取 消</el-button
          >
          <el-button type="primary" @click="okClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <div class="flex jc-c pt-10 bg-fff pb-10">
      <el-pagination
        background
        :hide-on-single-page="true"
        :current-page="currPage"
        @current-change="changePage"
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
      >
      </el-pagination>
    </div>
  </div>
</template>


<script>
import ContentTitle from "@/components/ContentTitle.vue";
import { $groupAdd, $groupList, $groupDel, $groupEdit } from "@/api";
export default {
  components: { ContentTitle },
  data() {
    return {
      row: null,
      editIndex: "",
      keyword: "",
      currPage: 1,
      pageSize: 5,
      keyword: "",
      total: 0,
      groupName: "智慧1组",
      ctInfo: {
        type: "设备",
        text: "节点群组",
        msg: "以分组的形式管理节点设备，提供了搜索、添加新的群组、重命名、移动设备等功能。",
      },
      dialogVisible: false,
      devListData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let query = {
        keyword: this.keyword,
        currPage: this.currPage,
        pageSize: this.pageSize,
      };
      $groupList(query).then((res) => {
        this.devListData = res.data;
        this.total = res.total;
      });
    },

    enterSearch($event) {
      if ($event.keyCode === 13) {
        this.search();
      }
    },
    search() {
      this.getList();
    },

    // 切换页面
    changePage(page) {
      this.currPage = page;
      this.getList();
    },

    // 确定按钮
    okClick() {
      // 有editIndex表明是在编辑
      if (!this.editIndex) {
        this.addGroup();
      } else {
        this.rename();
      }
    },

    addGroup() {
      this.dialogVisible = false;
      $groupAdd({ groupName: this.groupName }).then((res) => {
        this.devListData.push(res.data);
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    showDialog(index, row) {
      this.dialogVisible = true;
      this.groupName = row.groupName;
      this.editIndex = index;
      this.row = row;
    },
    rename(row) {
      this.dialogVisible = false;
      let groupName = this.groupName;
      let { id } = this.row;
      $groupEdit({ id, groupName }).then((res) => {
        this.devListData[this.editIndex].groupName = groupName;
      });
    },
    delGroup(index, row) {
      this.$confirm("确认删除？")
        .then((_) => {
          $groupDel({ id: row.id }).then((res) => {
            this.devListData.splice(index, 1);
          });
        })
        .catch((_) => {});
    },
  },
};
</script>

<style lang="less" scoped>
@import "./group.less";
</style>